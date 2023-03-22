import { Form, FormInstance, Input } from 'antd';
import React from 'react';
import { UserData } from '../../../types/users';

type Props = {
    form: FormInstance<any>;
    data?: UserData;
    admin?: boolean;
};

const UserInfoFields = ({ form, data, admin }: Props) => {
    return (
        <>
            <Form.Item
                label="Name: "
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Email: "
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                <Input
                    type='email'
                // onBlur={}
                />
                {/* <EmailInput /> */}
            </Form.Item>
            {!admin &&
                <>
                    <Form.Item
                        label="Password: "
                        name="password"
                        rules={[{ required: true, message: 'Please input a valid password!' }]}
                        hasFeedback
                    >
                        <Input.Password
                            type='password'
                        // onBlur={}
                        />
                        {/* <EmailInput /> */}
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password: "
                        name="confirmPwd"
                        dependencies={['password']}
                        hasFeedback
                        rules={[{ required: true, message: 'Please input a valid email!' },
                        ({ getFieldValue }) => ({
                            validator(rule, value, callback) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords entered do not match'));
                            },
                        })
                        ]}>
                        <Input.Password
                            type='email'
                        // onBlur={}
                        />
                        {/* <EmailInput /> */}
                    </Form.Item>
                </>
            }
        </>
    );
};

export default UserInfoFields;