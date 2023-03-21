import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles.module.scss';
import toast from 'react-hot-toast';
import type { ClientData, ClientsTableProps } from '../../../types/clients';
import type { AddressData } from '../../../types/addresses';
import { deleteClient, fetchAllClients } from '../../../pages/api/services/clients';
import { addressParser } from '../../../../lib/functions';

const ClientsTable: React.FC<ClientsTableProps> = ({ data, isLoading, title, domains }) => {

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

    const domainsColumn: ColumnsType<string> = [
        {
            title: 'Domains',
            dataIndex: '_id',
            key: '_id',
            // render: (domain, record) => domain
        }
    ];

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
                // TODO: check if works
                // const { street1, street2, city, state, zip, country } = value;
                // return `${street2 ? street2 + ', ' : ''}${street1}, ${city}, ${state}`;
                return addressParser(value);
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
                            href={`/dashboard/deliveries/new/${record._id}`}>Create Delivery</Link>

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

    const expandedRowRender = (record: any, index: number) => {
        return (

            <Table
                rowKey={(record, index) => (record._id! as string)}
                columns={columns}
                className={styles.tableContainer + 'ant-table ant-table-default !important'}
                dataSource={currentData?.filter((client) => client.domain === record._id)}
            />
        );
    };

    return (
        <Table
            rowKey={(record, index) => (record._id!)}
            columns={domains ? domainsColumn : columns}
            className={styles.tableContainer + 'ant-table ant-table-default !important'}
            dataSource={domains ? domains : currentData}
            title={title}
            // expandable={{expandedRowRender}}
            expandable={domains ? { expandedRowRender } : undefined}

        />
    );
};

export default ClientsTable;