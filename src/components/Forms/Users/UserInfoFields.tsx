import { Checkbox, Form, FormInstance, Input } from 'antd';
import React, { useState } from 'react';
import { UserData } from '../../../types/users';

type Props = {
    form: FormInstance<any>;
    data?: UserData;
    admin?: boolean;
    askPwd?: boolean;
};

const UserInfoFields = ({ form, data, admin, askPwd }: Props) => {

    const [pwdFields, setPwdFields] = useState(!askPwd);

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
                />
            </Form.Item>
            {askPwd &&
                <Checkbox
                    // className={styles.checkBox}
                    style={{ paddingLeft: '5%', fontSize: '1rem', paddingBottom: '10px' }}
                    checked={pwdFields}
                    onChange={(e) => setPwdFields(e.target.checked)}
                >
                    Change Password?
                </Checkbox>

            }
            {!admin && pwdFields &&
                <>
                    <Form.Item
                        label="Password: "
                        name="password"
                        rules={[{ required: true, message: 'Please input a valid password!' }]}
                        hasFeedback
                    >
                        <Input.Password
                            type='password'
                        />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password: "
                        name="confirmPwd"
                        dependencies={['password']}
                        hasFeedback
                        rules={[{ required: true, message: 'Both password do not match!' },
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
                        />
                    </Form.Item>
                </>
            }
        </>
    );
};

export default UserInfoFields;