import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles.module.scss';
import { ObjectId } from 'mongodb';
import toast from 'react-hot-toast';
import type { RecipeData, RecipesTableProps } from '../../../types/recipes';

const RecipesTable: React.FC<RecipesTableProps> = ({ data, isLoading, title }) => {

    const [currentData, setCurrentData] = useState(data);


    const handleDeleteDb = async (id: string | ObjectId) => {
        // try {
        //     const delRes = await deleteBeer(id);

        //     const res = await getAllBeers();
        //     const beerData = res.data;
        //     setCurrentData(beerData);

        // } catch (error: any) {
        //     console.log("🚀 ~ file: RecipesTable.tsx:43 ~ handleDeleteDb ~ error", error);
        //     toast.error('Error deleting beer');

        //     throw new Error(error).message;
        // }
    };

    const columns: ColumnsType<RecipeData> = [
        /*         {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                }, */
        {
            title: 'Beer Name',
            dataIndex: 'beer',
            key: 'beer',
        },
        {
            title: 'Grains',
            dataIndex: 'grains',
            key: 'grains',
        },
        {
            title: 'Hops',
            dataIndex: 'hops',
            key: 'hops',
        },
        {
            title: 'Brewed On',
            dataIndex: 'brewedOn',
            key: 'brewedOn',
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
            title: 'Available On',
            dataIndex: 'availableOn',
            key: 'availableOn',
            render: (value, record) => {
                if (typeof value === 'string') {
                    if (value.includes("T")) {
                        return value.split("T")[0];
                    } else return value;
                } else {
                    return new Date(value).toISOString().split('T')[0];
                }
            },
            sorter: (a, b) => new Date(b.beer.availableOn).valueOf() - new Date(a.beer.availableOn).valueOf(),

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
            columns={columns}
            className={styles.tableContainer}
            dataSource={currentData}
            title={title}
        />
    );
};

export default RecipesTable;