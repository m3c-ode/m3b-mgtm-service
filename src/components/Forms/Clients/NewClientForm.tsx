import { Form, Button, Divider } from 'antd';
import Script from 'next/script';
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { NewAddressInput } from '../../../types/addresses';
import Dashboard from '../../Dashboard';
import CreateAddressFields from './CreateAddressFields';
import styles from './styles.module.scss';

type Props = {};

const PLACES_API_KEY = process.env.NEXT_PUBLIC_PLACES_API_KEY;
console.log("🚀 ~ file: NewClientForm.tsx:13 ~ PLACES_API_KEY:", PLACES_API_KEY);
const LOC_PLACES_API_KEY = process.env.PLACES_API_KEY;
console.log("🚀 ~ file: NewClientForm.tsx:15 ~ LOC_PLACES_API_KEY:", LOC_PLACES_API_KEY);

const NewClientForm = (props: Props) => {
    const [form] = Form.useForm();

    const formRef = useRef<any>(null);

    const onFinish = async (values: any) => {
        const newAddressData: NewAddressInput = {
            // clientId: customerId,
            // businessId: merchantId,
            name: values.name?.toUpperCase(),
            company: values.company?.toUpperCase(),
            street1: values.street1.toUpperCase(),
            street2: values.street2?.toUpperCase(),
            city: values.city.toUpperCase(),
            state: values.state.toUpperCase(),
            zip: values.zip.toUpperCase(),
            country: values.country.toUpperCase(),
            phone: values.phone,
            notes: values.notes,
        };
        console.log("🚀 ~ file: NewClientForm.tsx:31 ~ onFinish ~ newAddressData:", newAddressData);

        // try {
        //     console.log('customerID sent in form', customerId);

        //     console.log('new address data: ', newAddressData);
        //     const addressRes = await createAddress(newAddressData);
        //     console.log('address res: ', addressRes);
        //     if (!addressRes.data.result) {
        //         if (addressRes.data.message) {
        //             addressRes.data.result.details.map((error: any) => toast.error(error.message));
        //             toast.error(addressRes.data.result.message + '. Please verify details again');
        //             return;
        //         }
        //         toast.error(addressRes.data.message as string);
        //         // throw new Error(addressRes.data.error);
        //         return;
        //     }
        //     toast.success('Address created succesfully');
        //     setNewAddress(addressRes.data.result);
        // } catch (error: any) {
        //     // toast.error(JSON.parse(error.request.responseText).message as string);
        //     toast.error(error.response.data.message);
        //     console.log(error);
        // }
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
                onValuesChange={(changed, all) => console.log('values change', changed, all)}
                onFieldsChange={(first, second) => console.log('fields change', first, second)}
                fields={[
                    {
                        name: 'city',
                        value: form.getFieldValue('city')
                    }
                ]}
            >
                <h2>Create a New Client</h2>
                <Divider />
                <CreateAddressFields form={form} />
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
            </Form>
        </Dashboard>
    );
};

export default NewClientForm;