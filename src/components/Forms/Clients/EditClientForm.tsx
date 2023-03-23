import { Form, Divider, Checkbox } from 'antd';
import router from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { updateClientInfo } from '../../../pages/api/services/clients';
import type { ClientData } from '../../../types/clients';
import Dashboard from '../../Dashboard';
import ClientInfoFields from './ClientInfoFields';
import styles from './styles.module.scss';

type Props = {
    data: ClientData;
};

const EditClientForm = ({ data: clientData }: Props) => {
    const [editForm] = Form.useForm();

    const [isFormDisabled, setIsFormDisabled] = useState(true);

    // extract data
    const { _id, name, type, email, address: { street1, street2, city, zip, country, state, phone, notes } } = clientData;

    const switchMode = ({ disabled }: { disabled: boolean; }) => {
        setIsFormDisabled(disabled);
    };

    const onFinish = async (values: any) => {
        const data: ClientData = {
            // _id: _id,
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
            },
            // updatedOn: new Date()
        };
        // DB change
        try {
            const clientUpdateRes = await updateClientInfo(_id!, data);
            // const clientUpdateRes = await dbUpdateClient(_id, data);
            toast.success('Client updated successfully');
            router.push('/dashboard/clients');

        } catch (error) {
            console.log("🚀 ~ file: EditClientForm.tsx:66 ~ onFinish ~ edit error", error);
            toast.error('Client update failed');

        }
        // if (clientUpdateRes) {
        // }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };

    return (
        <Dashboard>
            <div className={styles.preFormHeader}>
                <h2>Client details</h2>
                <Divider />
                <Checkbox
                    className={styles.checkBox}
                    checked={!isFormDisabled}
                    onChange={(e) => setIsFormDisabled(!e.target.checked)}
                >
                    Edit mode
                </Checkbox>
            </div>
            <Form
                form={editForm}
                name="editClientForm"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                initialValues={{
                    name, type, email, street1, street2, city, zip, country, state, phone, notes
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles.createBeerForm}
                onValuesChange={switchMode}
                disabled={isFormDisabled}
            // layout="vertical"
            >
                <ClientInfoFields data={clientData} form={editForm} />
            </Form>
        </Dashboard>
    );
};

export default EditClientForm;