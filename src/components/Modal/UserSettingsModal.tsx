import { Checkbox, Divider, Form, Modal } from 'antd';
import { stat } from 'fs';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { parsePhoneNumber } from '../../../lib/functions';
import { updateUserInfo } from '../../pages/api/services';
import { useUserStore } from '../../stores/user';
import { UserData, UserRolesEnum } from '../../types/users';
import CreateAddressFields from '../Forms/Clients/CreateAddressFields';
import UserInfoFields from '../Forms/Users/UserInfoFields';

type Props = {
    isVisible: boolean;
    setIsVisible: (bool: boolean) => void;
};

const UserSettingsModal = ({ isVisible, setIsVisible }: Props) => {
    const [editForm] = Form.useForm();

    const [isFormDisabled, setIsFormDisabled] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { userInfo, setUserInfo } = useUserStore((state) => ({ userInfo: state.userInfo, setUserInfo: state.setUserInfo }));
    // console.log("🚀 ~ file: UserSettingsModal.tsx:18 ~ UserSettingsModal ~ userInfo:", userInfo);
    const { _id, name, domain, email, role, address: { street1 = '', street2 = '', city = '', zip = '', country = '', state = '', phone = '', notes = '' } = {} } = userInfo ?? {};

    const switchMode = ({ disabled }: { disabled: boolean; }) => {
        setIsFormDisabled(disabled);
    };
    const { status, data } = useSession();

    const [userData, setUserData] = useState<UserData | null>(userInfo);

    const handleOk = async () => {
        if (!editForm) return;

        setConfirmLoading(true);

        try {
            const res = await editForm.validateFields();
            // console.log("🚀 ~ file: UserSettingsModal.tsx:60 ~ handleOk ~ res:", res);
            editForm.submit();

            setConfirmLoading(false);
            setIsVisible(false);
        } catch (error: any) {
            console.error('error in modal settings', error);
            // setIsVisible(false);
            if (error.errorFields.length > 0) {
                error.errorFields.map((field: { errors: string[]; }, index: any) => {
                    toast.error(field.errors[0] as string);
                });
            }
            setConfirmLoading(false);
        }
    };

    const handleCancel = () => {
        setIsVisible(false);
    };

    const onFormSubmit = async (values: any) => {
        console.log("🚀 ~ file: UserSettingsModal.tsx:82 ~ onFormSubmit ~ values:", values);
        const data: UserData = {
            _id: _id!,
            name: values.name,
            email: values.email,
            domain: domain,
            role: role!,
            pwd: values.password && values.password,
            address: {
                company: values.company,
                street1: values.street1.toUpperCase(),
                street2: values.street2?.toUpperCase(),
                city: values.city.toUpperCase(),
                state: values.state.toUpperCase(),
                zip: values.zip.toUpperCase(),
                country: values.country.toUpperCase(),
                phone: values?.phone ? parsePhoneNumber(values.phone) : undefined,
                notes: values.notes,
            },
        };
        // DB change
        try {
            await updateUserInfo(_id!, data);
            toast.success('User updated successfully');
            // router.push('/dashboard/users');
            // setIsVisible(false);

        } catch (error) {
            console.log("🚀 ~ file: EditUserForm.tsx:66 ~ onFinish ~ edit error", error);
            toast.error('User update failed');
            // setIsVisible(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('modal form finish failed', errorInfo);
    };
    return (
        <Modal width={'50%'}
            title={<h2>User Settings</h2>}
            open={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
        >
            <Divider />
            <Checkbox
                // className={styles.checkBox}
                style={{ paddingLeft: '5%', fontSize: '1rem', paddingBottom: '20px' }}
                checked={!isFormDisabled}
                onChange={(e) => setIsFormDisabled(!e.target.checked)}
            >
                Edit mode
            </Checkbox>
            {userInfo &&
                <Form
                    form={editForm}
                    name="editUserForm"
                    initialValues={{
                        name, domain, email, role, street1, street2, city, zip, country, state, phone, notes
                    }}
                    onFinish={onFormSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    // className={styles.createBeerForm}
                    onValuesChange={switchMode}
                    disabled={isFormDisabled}
                    layout="vertical"
                >
                    <UserInfoFields data={userInfo} form={editForm} askPwd />
                    {role === UserRolesEnum.BOwner &&
                        <CreateAddressFields data={userData?.address} form={editForm} />
                    }
                </Form>
            }
        </Modal>
    );
};

export default UserSettingsModal;