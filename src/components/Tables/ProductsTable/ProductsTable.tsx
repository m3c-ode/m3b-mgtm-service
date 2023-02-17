import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles.module.scss';
import { deleteBeer, getAllBeers } from '../../../pages/api/services';
import { ObjectId } from 'mongodb';
import toast from 'react-hot-toast';
import type { ProductData, ProductsTableProps } from '../../../types/products';

const ProductsTable: React.FC<ProductsTableProps> = ({ data, isLoading, title }) => {

    const [currentData, setCurrentData] = useState(data);


    const handleDeleteDb = async (id: string | ObjectId) => {
        // try {
        //     const delRes = await deleteBeer(id);

        //     const res = await getAllBeers();
        //     const beerData = res.data;
        //     setCurrentData(beerData);

        // } catch (error: any) {
        //     console.log("🚀 ~ file: ProductsTable.tsx:43 ~ handleDeleteDb ~ error", error);
        //     toast.error('Error deleting beer');

        //     throw new Error(error).message;
        // }
    };

    const columns: ColumnsType<ProductData> = [
        /*         {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                }, */
        {
            title: 'Product Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            key: 'Quantity',
        },
        {
            title: 'Received On',
            dataIndex: 'receivedOn',
            key: 'receivedOn',
            render: (value, record) => {
                if (typeof value === 'string') {
                    if (value.includes("T")) {
                        return value.split("T")[0];
                    } else return value;
                } else {
                    return new Date(value).toISOString().split('T')[0];
                }
            }
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
                            href={`/beers/${record._id}`}>Update Info</Link>

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
            className={styles.tableContainer}
            columns={columns}
            dataSource={currentData}
            title={title}
        />
    );
};

export default ProductsTable;