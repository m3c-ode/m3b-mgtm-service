import { Form } from 'antd';
import React from 'react';
import Dashboard from '../../Dashboard';
import styles from './styles.module.scss';

type Props = {};

const BeerForm = (props: Props) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('on finish', values);

    };

    const onReset = () => {
        form.resetFields();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Dashboard>
            <Form
                form={form}
                name="createBeerForm"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles.createBeerForm}
                layout="vertical">
                
                
            >

            </Form>


        </Dashboard>
    );
};

export default BeerForm;