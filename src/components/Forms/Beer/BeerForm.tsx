import { Form } from 'antd';
import React from 'react';
import Dashboard from '../../Dashboard';
import BeerInfoFields from './BeerInfoFields';
import styles from './styles.module.scss';

type Props = {};

const BeerForm = (props: Props) => {
    const [form] = Form.useForm();

    // status will be automatically filled on creation
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
                layout="vertical"
            >
                <h2>Create New Beer</h2>
                {/* Step form
                1-  General Info
                2 - Recipe info
                 */}
                <div className={styles.formWrapper}>
                    <div className={styles.progressBar}>

                    </div>
                    <div className={styles.formContent}>
                        <BeerInfoFields />
                    </div>
                    <div className={styles.navButtons}>
                    </div>
                </div>

            </Form>


        </Dashboard>
    );
};

export default BeerForm;