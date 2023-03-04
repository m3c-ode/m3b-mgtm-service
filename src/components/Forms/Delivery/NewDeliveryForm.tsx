import { Form, Divider, Input } from 'antd';
import form from 'antd/es/form';
import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import { BeerData } from '../../../types/beers';
import { ClientData } from '../../../types/clients';
import { NewDeliveryInput } from '../../../types/deliveries';
import Dashboard from '../../Dashboard';
import formStyles from '../styles.module.scss';

type Props = {
    clientData?: ClientData;
    beersData?: BeerData[];
};

const NewDeliveryForm = (props: Props) => {
    const [form] = Form.useForm();

    const formRef = useRef<any>(null);

    const onFinish = async (values: any) => {
        console.log("🚀 ~ file: NewDeliveryForm.tsx:12 ~ onFinish ~ values:", values);
        const formData = form.getFieldsValue(true);
        console.log("🚀 ~ file: NewDeliveryForm.tsx:14 ~ onFinish ~ formData:", formData);
        const newDeliveryData: NewDeliveryInput = {
            // clientId: customerId,
            // businessId: merchantId,
            fromAddress: values.fromAddress,
            toAddress: values.toAddress,
            products: values.products,


        };
        console.log("🚀 ~ file: NewDeliveryForm.tsx:31 ~ onFinish ~ newDeliveryData:", newDeliveryData);

        // try {
        //     const res = await createDelivery(newDeliveryData);
        //     console.log("🚀 ~ file: NewDeliveryForm.tsx:56 ~ onFinish ~ res:", res);

        //     if (res.status === 201) toast.success("Delivery creation successful");

        // } catch (error: any) {
        //     // toast.error(JSON.parse(error.request.responseText).message as string);
        //     toast.error(error.response.data.message);
        //     console.log(error.response);
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
                name="newDeliveryForm"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 22 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="createForm"
                layout="horizontal"
            >
                <h2>Create a New Delivery</h2>
                <Divider />
                {/* <DeliveryInfoFields form={form} /> */}
                <Form.Item
                    label="Name: "
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Dashboard >
    );
};

export default NewDeliveryForm;