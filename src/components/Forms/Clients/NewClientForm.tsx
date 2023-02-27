import { Form, Button } from 'antd';
import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import { NewAddressInput } from '../../../types/addresses';
import Dashboard from '../../Dashboard';
import CreateAddressFields from './CreateAddressFields';
import styles from './styles.module.scss';


type Props = {};

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

    // TODO: Fix the reset button
    const onReset = () => {
        console.log('hello');
        console.log(formRef);
    };

    return (
        <Dashboard>
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
                layout="horizontal">
                <h2 className={styles.createAddressTitle}>Create a New Client</h2>
                <CreateAddressFields />
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