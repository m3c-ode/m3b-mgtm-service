import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles.module.scss';
import { ObjectId } from 'mongodb';
import toast from 'react-hot-toast';
import { ClientData, ClientsTableProps } from '../../../types/clients';

const ClientsTable: React.FC<ClientsTableProps> = ({ data, isLoading, title }) => {

    const [currentData, setCurrentData] = useState(data);


    const handleDeleteDb = async (id: string | ObjectId) => {
        // try {
        //     const delRes = await deleteBeer(id);

        //     const res = await getAllBeers();
        //     const beerData = res.data;
        //     setCurrentData(beerData);

        // } catch (error: any) {
        //     console.log("🚀 ~ file: ClientsTable.tsx:43 ~ handleDeleteDb ~ error", error);
        //     toast.error('Error deleting beer');

        //     throw new Error(error).message;
        // }
    };

    const columns: ColumnsType<ClientData> = [
        /*         {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                }, */
        {
            title: 'Client Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
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
        // {
        //     title: 'Brewed On',
        //     dataIndex: 'brewedOn',
        //     key: 'brewedOn',
        //     render: (value, record) => {
        //         if (typeof value === 'string') {
        //             if (value.includes("T")) {
        //                 return value.split("T")[0];
        //             } else return value;
        //         } else {
        //             return new Date(value).toISOString().split('T')[0];
        //         }
        //     }
        // },
        // {
        //     title: 'Available On',
        //     dataIndex: 'availableOn',
        //     key: 'availableOn',
        //     render: (value, record) => {
        //         if (typeof value === 'string') {
        //             if (value.includes("T")) {
        //                 return value.split("T")[0];
        //             } else return value;
        //         } else {
        //             return new Date(value).toISOString().split('T')[0];
        //         }
        //     },
        //     sorter: (a, b) => new Date(b.beer.availableOn).valueOf() - new Date(a.beer.availableOn).valueOf(),

        // },
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
                            href={`/client/${record._id}`}>Update Info</Link>

                    </Button>
                    <Button
                        type="text"
                        className={styles.updateButton}
                    >
                        <Link
                            className={styles.tableButton}
                            href={`/deliveries/${record._id}`}>Create Delivery</Link>

                    </Button>
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDeleteDb(record._id)}>
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
            columns={columns}
            className={styles.tableContainer}
            dataSource={currentData}
            title={title}
        />
    );
};

export default ClientsTable;