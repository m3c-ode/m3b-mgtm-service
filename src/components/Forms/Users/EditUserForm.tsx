import { Form, Divider, Checkbox, Button } from 'antd';
import router from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { updateUserInfo } from '../../../pages/api/services/users';
import { UserData, UserRolesEnum } from '../../../types/users';
import Dashboard from '../../Dashboard';
import UserInfoFields from './UserInfoFields';
import styles from '../styles.module.scss';
import CreateAddressFields from '../Clients/CreateAddressFields';
import { parsePhoneNumber } from '../../../../lib/functions';

type Props = {
    data: UserData;
};

const EditUserForm = ({ data: userData }: Props) => {
    const [editForm] = Form.useForm();

    const [isFormDisabled, setIsFormDisabled] = useState(true);

    // extract data
    const { _id, name, domain, email, role, address: { street1, street2, city, zip, country, state, phone, notes } = {} } = userData;

    const switchMode = ({ disabled }: { disabled: boolean; }) => {
        setIsFormDisabled(disabled);
    };

    const onFinish = async (values: any) => {
        const data: UserData = {
            _id: _id,
            name: values.name,
            email: values.email,
            domain: values?.domain,
            role: values?.role,
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
            router.push('/dashboard/users');

        } catch (error) {
            console.log("🚀 ~ file: EditUserForm.tsx:66 ~ onFinish ~ edit error", error);
            toast.error('User update failed');

        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };

    return (
        <>
            <div className={styles.preFormHeader}>
                <h2>User details</h2>
                <Divider />
                <Checkbox
                    className={styles.checkBox}
                    checked={!isFormDisabled}
                    onChange={(e) => setIsFormDisabled(!e.target.checked)}
                >
                    Edit mode
                </Checkbox>
            </div>
            <Form
                form={editForm}
                name="editUserForm"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                initialValues={{
                    name, domain, email, role, street1, street2, city, zip, country, state, phone, notes
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles.createBeerForm}
                onValuesChange={switchMode}
                disabled={isFormDisabled}
            // layout="vertical"
            >
                <UserInfoFields data={userData} form={editForm} admin />
                {role === UserRolesEnum.BOwner &&
                    <CreateAddressFields data={userData?.address} form={editForm} />
                }
                <Form.Item
                    style={{ textAlign: 'center' }}
                    wrapperCol={{ offset: 0, span: 24 }}
                >
                    <Button
                        type="primary"
                        htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default EditUserForm;