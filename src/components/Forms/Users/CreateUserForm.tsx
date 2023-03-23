import { Button, Divider, Form, Input, Radio, RadioChangeEvent, Select } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useUserStore } from '../../../stores/user';
import { CreateUserInput, UserData, UserRolesEnum } from '../../../types/users';
import UserInfoFields from './UserInfoFields';
import formStyles from '../styles.module.scss';
import { useSession } from 'next-auth/react';
import Dashboard from '../../Dashboard';
import { createUser } from '../../../pages/api/services/users';
import CreateAddressFields from '../Clients/CreateAddressFields';
import SelectDomainField from '../Select/SelectDomainField';
const { Option } = Select;

type Props = {
    data?: UserData;
};

function CreateUserForm({ data }: Props) {

    const { data: sessionData, status }: { data: any, status: string; } = useSession();
    const userData = useUserStore(state => state.userInfo);
    let userRole: string = '';
    if (sessionData) {
        userRole = sessionData?.user?.role;
    };

    const roles = [
        {
            value: UserRolesEnum.BOwner,
            label: 'Business Owner',
            isHidden: userRole !== UserRolesEnum.Admin,
        },
        {
            value: UserRolesEnum.BUser,
            label: 'Business User',
            isHidden: userRole !== UserRolesEnum.BOwner && userRole !== UserRolesEnum.Admin,
        },
    ];
    const [newUserRole, setNewUserRole] = useState('');

    const router = useRouter();

    const [form] = Form.useForm();
    const formRef = useRef<any>(null);

    const onRoleChange = (role: string) => {
        setNewUserRole(role);
    };

    const onSubmit = async (values: any) => {

        const newUserData: CreateUserInput = {
            name: values.name,
            email: values?.email.toLowerCase(),
            domain: values?.domain ? values.domain.toLowerCase() : sessionData.user.domain.toLowerCase(),
            address: {
                // company: values?.company ? values?.company : userData?.address?.company,
                street1: values?.street1 ? values?.street1.toUpperCase() : userData?.address?.street1,
                street2: values?.street2 ? values?.street2.toUpperCase() : userData?.address?.street2,
                city: values?.city ? values?.city.toUpperCase() : userData?.address?.city,
                state: values?.state ? values?.state.toUpperCase() : userData?.address?.state,
                zip: values?.zip ? values?.zip.toUpperCase() : userData?.address?.zip,
                country: values?.country ? values?.country.toUpperCase() : userData?.address?.country,
                phone: values?.phone ? values?.phone : userData?.address?.phone,
                notes: values?.notes ? values?.notes : userData?.address?.notes,

            },
            pwd: values?.password,
            role: values.role,
        };

        try {

            // TODO: check is email and domain already exists.

            if (userRole === UserRolesEnum.Admin) {

            }

            const res = await createUser(newUserData);

            if (res.status === 201) {
                toast.success("User creation successful");
                router.push('/dashboard/users');
            }

        } catch (error: any) {
            console.error('error creating user', error);
            toast.error(error.response.data.message);
            // toast.error(JSON.parse(error.request.responseText).message as string);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        if (errorInfo.errorFields.length > 0) {
            errorInfo.errorFields.map((field: { errors: string[]; }, index: any) => {
                toast.error(field.errors[0] as string);
            });
        }
    };

    // const onReset = () => {
    //     console.log(formRef.current);
    //     if (!formRef.current) return;
    //     formRef.current.reset();
    // };

    return (
        // TODO: Form responsiveness
        <Dashboard>
            <Form
                ref={formRef}
                form={form}
                name="createUser"
                initialValues={{}}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                className={formStyles.createForm}
                labelWrap
                layout="horizontal">
                <h2>Create a New User</h2>
                <Divider />
                <h3>User Info</h3>
                <Form.Item
                    label="Role: "
                    labelAlign="right"
                    name="role"
                    rules={[{ required: true, message: 'Please choose the role!' }]}>
                    <Select
                        placeholder="Select a Role for this User"
                        onChange={onRoleChange}
                        allowClear
                        options={roles.filter(
                            (role, index) => {
                                if (!role.isHidden) return { value: role.value, label: role.label, key: index };
                            })
                        }
                    />
                </Form.Item>
                {userRole === UserRolesEnum.Admin && newUserRole === UserRolesEnum.BOwner && (
                    <Form.Item
                        label="Domain: "
                        name="domain"
                        rules={[{ required: true, message: 'Please input your domain!' }]}>
                        <Input />
                    </Form.Item>
                )}
                {userRole === UserRolesEnum.Admin && newUserRole === UserRolesEnum.BUser && (
                    <SelectDomainField />
                )}
                <UserInfoFields form={form} />
                {userRole === UserRolesEnum.Admin && newUserRole === UserRolesEnum.BOwner &&
                    <>
                        <Divider />
                        <h3>Business Address Info</h3>
                        <CreateAddressFields data={data?.address} form={form} />
                    </>
                }
                <Form.Item
                    wrapperCol={{ span: 24 }}
                    style={{ textAlign: 'center' }}
                >
                    <Button
                        type="primary"
                        htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Dashboard>
    );
}

export default CreateUserForm;
