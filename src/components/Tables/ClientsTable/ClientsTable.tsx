import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles.module.scss';
import { ObjectId } from 'mongodb';
import toast from 'react-hot-toast';
import type { ClientData, ClientsTableProps } from '../../../types/clients';
import type { AddressData } from '../../../types/addresses';
import { deleteClient, fetchAllClients } from '../../../pages/api/services/clients';

const ClientsTable: React.FC<ClientsTableProps> = ({ data, isLoading, title }) => {

    const [currentData, setCurrentData] = useState(data);


    const handleDeleteDb = async (id: string) => {
        try {
            const delRes = await deleteClient(id);
            if (delRes.data.deletedCount === 0) {
                return toast.error("Error deleting client");
            }
            toast.success("Client entry deleted");
            const res = await fetchAllClients();
            const clientData = res.data;
            setCurrentData(clientData);

        } catch (error: any) {
            console.log("🚀 ~ file: ClientsTable.tsx:43 ~ handleDeleteDb ~ error", error);
            toast.error('Error deleting client');
            throw new Error(error).message;
        }
    };

    const columns: ColumnsType<ClientData> = [
        {
            title: 'Client Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render(value: AddressData, record, index) {
                const { street1, street2, city, state, zip, country } = value;
                return `${street2 ? street2 + ', ' : ''}${street1}, ${city}, ${state}`;
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        className={styles.updateButton}
                    >
                        <Link
                            className={styles.tableButton}
                            href={`/dashboard/clients/${record._id}`}>Update Info</Link>

                    </Button>
                    <Button
                        type="text"
                        className={styles.updateButton}
                    >
                        <Link
                            className={styles.tableButton}
                            href={`/dashboard/deliveries/${record._id}`}>Create Delivery</Link>

                    </Button>
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDeleteDb(record._id!)}>
                        <Button
                            type="primary"
                            danger
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    return (
        <Table
            rowKey={(record, index) => (record._id!)}
            columns={columns}
            className={styles.tableContainer + 'ant-table ant-table-default !important'}
            dataSource={currentData}
            title={title}

        />
    );
};

export default ClientsTable;