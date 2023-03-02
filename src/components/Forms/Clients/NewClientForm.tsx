import { Form, Divider, Select } from 'antd';
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { createClient } from '../../../pages/api/services';
import type { NewClientInput } from '../../../types/clients';
import Dashboard from '../../Dashboard';
import ClientInfoFields from './ClientInfoFields';
import styles from './styles.module.scss';

const { Option } = Select;

type Props = {};

const PLACES_API_KEY = process.env.NEXT_PUBLIC_PLACES_API_KEY;
const LOC_PLACES_API_KEY = process.env.PLACES_API_KEY;

const NewClientForm = (props: Props) => {
    const [form] = Form.useForm();

    const formRef = useRef<any>(null);

    const onFinish = async (values: any) => {
        const newClientData: NewClientInput = {
            // clientId: customerId,
            // businessId: merchantId,
            name: values.name,
            email: values.email,
            type: values?.type,
            address: {
                company: values.company,
                street1: values.street1.toUpperCase(),
                street2: values.street2?.toUpperCase(),
                city: values.city.toUpperCase(),
                state: values.state.toUpperCase(),
                zip: values.zip.toUpperCase(),
                country: values.country.toUpperCase(),
                phone: values.phone,
                notes: values.notes,

            }
        };
        console.log("🚀 ~ file: NewClientForm.tsx:31 ~ onFinish ~ newClientData:", newClientData);

        try {
            const res = await createClient(newClientData);
            console.log("🚀 ~ file: NewClientForm.tsx:56 ~ onFinish ~ res:", res);

            if (res.status === 201) toast.success("Client creation successful");

        } catch (error: any) {
            // toast.error(JSON.parse(error.request.responseText).message as string);
            toast.error(error.response.data.message);
            console.log(error.response);
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

    useEffect(() => {
        console.log('form values in useEffect', form.getFieldValue('city'));

    }, [form]);

    console.log('form values', form.getFieldValue('city'));

    // TODO: Fix the reset button
    const onReset = () => {
        console.log('hello');
        console.log(formRef);
    };

    return (
        <Dashboard>
            {/* <Script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA1oJiPasx6wn42mLLf-NdhqE3bQAMwU8Y&libraries=places&callback=Function.prototype`} defer async /> */}

            <Form
                ref={formRef}
                form={form}
                name="newClientForm"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 22 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles.createClientForm}
                layout="horizontal"
            >
                <h2>Create a New Client</h2>
                <Divider />
                <ClientInfoFields form={form} />
            </Form>
        </Dashboard >
    );
};

export default NewClientForm;