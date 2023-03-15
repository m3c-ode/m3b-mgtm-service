import { Button, Form, Radio, RadioChangeEvent, Select } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import UserDataContext from '../../../context/user';
import { createEmailUser, createMerchant, createSmsUser } from '../../../pages/api/services';
import { useUserStore } from '../../../stores/user';
import { CreateMerchantInput } from '../../../types';
import { CreateUserInput } from '../../../types/user';
import { handleRole } from '../../../utils';
import CreateMerchantFields from './CreateMerchantFields';
import CreateSmsUserFields from './CreateSmsUserField';
import CreateEmailUserFields from './CreateUserFields';
import styles from './styles.module.scss';
const { Option } = Select;

type Props = {};

function CreateUserForm({ }: Props) {
    // const { userRole } = useContext(UserDataContext);

    const userInfo = useUserStore((state) => state.userInfo)!;
    const { role: userRole } = userInfo;

    const roles = [
        {
            value: 'BusinessOwner',
            label: 'Business Owner',
            isHidden: userRole !== 'PlatformManager',
        },
        {
            value: 'BusinessUser',
            label: 'Business User',
            isHidden: userRole !== 'BusinessOwner',
        },
        {
            value: 'Customer',
            label: 'Customer',
            isHidden: userRole === 'PlatformManager',
        },
    ];

    const [newBusiness, setNewBusiness] = useState({});

    const [newUser, setNewUser] = useState({});

    const [newUserRole, setNewUserRole] = useState('');
    const [signupMethod, setSignupMethod] = useState<'email' | 'sms'>('email');

    let { businessId } = useContext(UserDataContext);

    const router = useRouter();

    const [form] = Form.useForm();
    const formRef = useRef<any>(null);

    const onRoleChange = (role: string) => {
        setNewUserRole(role);
    };

    const onSignupMethodChange = (e: RadioChangeEvent) => {
        console.log('methode chosen', e.target.value);
        setSignupMethod(e.target.value);
    };

    const onSubmit = async (values: any) => {
        const newBusinessData: CreateBusinessInput = {
            company: values.company,
            domain: values.domain,
            urls: values.urls,
            ownerId: values.ownerId,
            currency: values.currency,
            unit: values.unit,
        };

        const newUserData: CreateUserInput = {
            email: values?.email,
            password: values?.password,
            firstname: values.firstname,
            lastname: values.lastname,
            phone: values.phone,
            role: handleRole(values.role),
        };

        try {
            // Manage creation roles depending on role and Permissions on both aut0 and backend
            // Only Platform manager can populate the businesss DB and send request to create a business. They also create a MO user.
            if (userRole === 'PlatformManager') {
                console.log('business data', newBusinessData);
                const businessRes = await createBusiness(newBusinessData);
                console.log('create merch res', businessRes);
                if (!businessRes.data.result) {
                    toast.error(businessRes.data.message as string);
                    return;
                }
                toast.success('Business domain succesfully created');
                setNewBusiness(businessRes.data.result);
                console.log('new business', businessRes.data.result);
                console.log('current context business id', businessId);

                //retrieve businessId from newly created business then inject in the User creation
                if (!businessId) {
                    businessId = businessRes.data.result.id;
                    console.log('updated business id with new business', businessId);
                }
                newUserData.businessId = businessId;
                console.log('new user from PM', newUserData);
                const userRes = await createEmailUser(newUserData);
                console.log('user result', userRes);
                if (!userRes.data.result) {
                    toast.error(userRes.data.message as string);
                    return;
                }
                toast.success('Business user succesfully created');
                setNewUser(userRes.data.result);
                return;
            }

            // Businesss can only create Users
            if (userRole === 'BusinessOwner' || userRole === 'BusinessUser') {
                newUserData.businessId = businessId;
                console.log('user data to be sent', newUserData);
                let userRes: any = {};
                if (signupMethod === 'email') userRes = await createEmailUser(newUserData);
                if (signupMethod === 'sms') userRes = await createSmsUser(newUserData);

                console.log('user result', userRes);
                if (!userRes.data.result) {
                    toast.error(userRes.data.message as string);
                    // throw new Error(userRes.data.result.error);
                    return;
                }
                toast.success('User succesfully created');
                setNewUser(userRes.data.result);
            }
        } catch (error: any) {
            console.error('error creating user', error);
            toast.error(JSON.parse(error.request.responseText).message as string);
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
        <div>
            <Form
                ref={formRef}
                name="createUser"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className={styles.createUserForm}
                layout="vertical">
                <h2 className={styles.createUserTitle}>Create a New User</h2>
                <Form.Item
                    label="Role: "
                    labelAlign="right"
                    name="role"
                    rules={[{ required: true, message: 'Please choose the role!' }]}>
                    <Select
                        placeholder="Select a Role for this User"
                        onChange={onRoleChange}
                        allowClear>
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
                    </Select>
                </Form.Item>
                {newUserRole === 'BusinessUser' && (
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
                )}
                {newUserRole && newUserRole === 'BusinessOwner' && <CreateBusinessFields />}
                {signupMethod === 'sms' && newUserRole === 'BusinessUser' ? <CreateSmsUserFields /> : <CreateEmailUserFields />}
                <Form.Item
                    // wrapperCol={{ offset: 4, span: 24 }}
                    style={{ textAlign: 'center' }}>
                    <Button
                        type="primary"
                        htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateUserForm;
