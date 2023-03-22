import { Button, Form, Input, Select, FormInstance } from 'antd';
import form from 'antd/es/form';
import { useSession } from 'next-auth/react';
import React from 'react';
import { ClientData, ClientTypeEnum } from '../../../types/clients';
import { UserRolesEnum } from '../../../types/users';
import SelectDomainField from '../Select/SelectDomainField';
import CreateAddressFields from './CreateAddressFields';

type Props = {
    form: FormInstance<any>;
    data?: ClientData;
};

const ClientInfoFields = ({ form, data }: Props) => {
    const { data: sessionData, status }: { data: any, status: string; } = useSession();
    const userRole = sessionData?.user?.role;

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
            {userRole === UserRolesEnum.Admin &&
                <SelectDomainField />
            }
            <Form.Item
                label="Type: "
                name="type"
                rules={[{ required: true, message: 'Please input your type!' }]}>
                <Select
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={Object.values(ClientTypeEnum).map((value, index) => ({ value, label: value, key: index }))}
                />
            </Form.Item>
            <CreateAddressFields data={data?.address} form={form} />
            <Form.Item
                style={{ textAlign: 'center' }}
            // wrapperCol={{ offset: 4, span: 16 }}
            >
                <Button
                    type="primary"
                    htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </>
    );
};

export default ClientInfoFields;