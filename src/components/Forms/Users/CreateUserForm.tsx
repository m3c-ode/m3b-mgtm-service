import { Button, Form, Input, Radio, RadioChangeEvent, Select } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
// import UserDataContext from '../../../context/user';
// import { createEmailUser, createMerchant, createSmsUser } from '../../../pages/api/services';
import { useUserStore } from '../../../stores/user';
// import { CreateMerchantInput } from '../../../types';
// import { CreateUserInput } from '../../../types/user';
import { CreateUserInput, UserRolesEnum } from '../../../types/users';
import CreateUserFields from './CreateUserFields';
// import { handleRole } from '../../../utils';
// import CreateMerchantFields from './CreateMerchantFields';
// import CreateSmsUserFields from './CreateSmsUserField';
// import CreateEmailUserFields from './CreateUserFields';
import formStyles from '../styles.module.scss';
import { useSession } from 'next-auth/react';
import Dashboard from '../../Dashboard';
import { createUser } from '../../../pages/api/services/users';
const { Option } = Select;

type Props = {};

function CreateUserForm({ }: Props) {
    // const { userRole } = useContext(UserDataContext);

    // const userInfo = useUserStore((state) => state.userInfo)!;
    // console.log("🚀 ~ file: CreateUserForm.tsx:25 ~ CreateUserForm ~ userInfo:", userInfo);
    // const { role: userRole, domain } = userInfo;

    const { data: sessionData, status }: { data: any, status: string; } = useSession();
    console.log("🚀 ~ file: CreateUserForm.tsx:31 ~ CreateUserForm ~ sessionData:", sessionData);
    let userRole: string = '';
    if (sessionData) {
        userRole = sessionData?.user?.role;
    };
    // const userRole = sessionData?.user?.role;
    console.log("🚀 ~ file: CreateUserForm.tsx:33 ~ CreateUserForm ~ userRole:", userRole);

    const roles = [
        {
            value: UserRolesEnum.BOwner,
            label: 'Business Owner',
            isHidden: userRole !== UserRolesEnum.Admin,
        },
        {
            value: UserRolesEnum.BUser,
            label: 'Business User',
            isHidden: userRole !== UserRolesEnum.BOwner,
        },
        // {
        //     value: UserRolesEnum.Admin,
        //     label: 'Administrator',
        //     isHidden: userRole === UserRolesEnum.Admin,
        // },
    ];

    const [newBusiness, setNewBusiness] = useState({});

    const [newUser, setNewUser] = useState({});

    const [newUserRole, setNewUserRole] = useState('');
    const [signupMethod, setSignupMethod] = useState<'email' | 'sms'>('email');

    const router = useRouter();

    const [form] = Form.useForm();
    const formRef = useRef<any>(null);

    const onRoleChange = (role: string) => {
        console.log("🚀 ~ file: CreateUserForm.tsx:70 ~ onRoleChange ~ role:", role);
        setNewUserRole(role);
    };

    const onSignupMethodChange = (e: RadioChangeEvent) => {
        console.log('methode chosen', e.target.value);
        setSignupMethod(e.target.value);
    };

    const onSubmit = async (values: any) => {
        console.log("🚀 ~ file: CreateUserForm.tsx:66 ~ onSubmit ~ values:", values);

        const newUserData: CreateUserInput = {
            name: values.name,
            email: values?.email.toLowerCase(),
            domain: values?.domain ? values.domain.toLowerCase() : sessionData.user.domain.toLowerCase(),
            pwd: values?.password,
            role: values.role,
        };
        console.log("🚀 ~ file: CreateUserForm.tsx:85 ~ onSubmit ~ newUserData:", newUserData);

        try {

            // TODO: check is email and domain already exists.

            if (userRole === UserRolesEnum.Admin) {

            }

            const res = await createUser(newUserData);
            console.log("🚀 ~ file: CreateUserForm.tsx:111 ~ onSubmit ~ res:", res);

            if (res.status === 201) {
                toast.success("User creation successful");
                router.push('/dashboard/users');
            }

            // Manage creation roles depending on role and Permissions on both aut0 and backend
            // Only Platform manager can populate the businesss DB and send request to create a business. They also create a MO user.
            // if (userRole === 'admin') {
            // console.log('business data', newBusinessData);
            // const businessRes = await createBusiness(newBusinessData);
            // console.log('create merch res', businessRes);
            // if (!businessRes.data.result) {
            //     toast.error(businessRes.data.message as string);
            //     return;
            // }
            // toast.success('Business domain succesfully created');
            // setNewBusiness(businessRes.data.result);
            // console.log('new business', businessRes.data.result);
            // console.log('current context business id', businessId);

            // //retrieve businessId from newly created business then inject in the User creation
            // if (!businessId) {
            //     businessId = businessRes.data.result.id;
            //     console.log('updated business id with new business', businessId);
            // }
            //     newUserData.domain = domain;
            //     console.log('new user from PM', newUserData);
            //     const userRes = await createEmailUser(newUserData);
            //     console.log('user result', userRes);
            //     if (!userRes.data.result) {
            //         toast.error(userRes.data.message as string);
            //         return;
            //     }
            //     toast.success('Business user succesfully created');
            //     setNewUser(userRes.data.result);
            //     return;
            // }

            // Businesss can only create Users
            // if (userRole === UserRolesEnum.BOwner || userRole === UserRolesEnum.BUser) {
            //     newUserData.businessId = businessId;
            //     console.log('user data to be sent', newUserData);
            //     let userRes: any = {};
            //     if (signupMethod === 'email') userRes = await createEmailUser(newUserData);
            //     if (signupMethod === 'sms') userRes = await createSmsUser(newUserData);

            //     console.log('user result', userRes);
            //     if (!userRes.data.result) {
            //         toast.error(userRes.data.message as string);
            //         // throw new Error(userRes.data.result.error);
            //         return;
            //     }
            //     toast.success('User succesfully created');
            //     setNewUser(userRes.data.result);
            // }
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
                    {/* >
                            {roles.map(
                                (role, index) =>
                                    !role.isHidden && (
                                        <Option
                                            key={index}
                                            value={role.value}>
                                            {role.label}
                                        </Option>
                                    )
                            )}
                        </Select> */}
                </Form.Item>
                {/* {newUserRole === 'BusinessUser' && (
                    <Form.Item
                    label="Sign up method: "
                    labelAlign="right"
                    name="method"
                    rules={[{ required: true, message: 'Please choose the signup method!' }]}>
                    <Radio.Group
                    defaultValue={'email'}
                    value={signupMethod}
                    onChange={onSignupMethodChange}
                    // allowClear
                    >
                    <Radio value="sms">Warehouse User</Radio>
                    <Radio
                    defaultChecked={true}
                    value="email">
                    Admin Panel User
                    </Radio>
                    </Radio.Group>
                    </Form.Item>
                )} */}
                {userRole === UserRolesEnum.Admin && (
                    <Form.Item
                        label="Domain: "
                        name="domain"
                        rules={[{ required: true, message: 'Please input your domain!' }]}>
                        <Input />
                    </Form.Item>
                )}
                <CreateUserFields form={form} />
                {/* {newUserRole && newUserRole === 'BusinessOwner' && <CreateBusinessFields />}
                {signupMethod === 'sms' && newUserRole === 'BusinessUser' ? <CreateSmsUserFields /> : <CreateEmailUserFields />} */}
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
