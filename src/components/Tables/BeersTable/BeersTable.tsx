import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import type { BeersTableProps, BeerData } from '../../../types/beers';
import styles from '../styles.module.scss';
import { deleteBeer, getAllBeers } from '../../../pages/api/services';
import { ObjectId } from 'mongodb';
import toast from 'react-hot-toast';


// type BeersTableProps = {}

const BeersTable: React.FC<BeersTableProps> = ({ data, isLoading, title }) => {

    const [currentData, setCurrentData] = useState(data);

    const handleDeleteDb = async (id: string | ObjectId) => {
        try {
            const delRes = await deleteBeer(id);

            // reloads the window
            // window.location.reload();

            // try with updating state data
            const res = await getAllBeers();
            const beerData = res.data;
            setCurrentData(beerData);

        } catch (error: any) {
            console.log("🚀 ~ file: BeersTable.tsx:43 ~ handleDeleteDb ~ error", error);
            toast.error('Error deleting beer');

            throw new Error(error).message;
        }
    };

    const columns: ColumnsType<BeerData> = [
        /*         {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                }, */
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Style',
            dataIndex: 'style',
            key: 'style',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Brewed On',
            dataIndex: 'brewedOn',
            key: 'brewedOn',
            render: (value, record) => {
                // console.log("🚀 ~ file: BeersTable.tsx:36 ~ value", value);
                // console.log('type of available', typeof value);
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
                // console.log("🚀 ~ file: BeersTable.tsx:47 ~ value", value);
                // console.log('type of available', typeof value);
                if (typeof value === 'string') {
                    if (value.includes("T")) {
                        return value.split("T")[0];
                    } else return value;
                } else {
                    return new Date(value).toISOString().split('T')[0];
                }
            },
            sorter: (a, b) => new Date(b.availableOn).valueOf() - new Date(a.availableOn).valueOf(),
            defaultSortOrder: 'descend'

        },
        {
            title: 'Tot. Quantity',
            dataIndex: 'qty',
            key: 'qty',
            render: (_, record) => record.qty.total,
            // children: [
            //     {
            //         title: '12oz',
            //         dataIndex: 'qty.12oz',
            //         key: 'qty.12oz',
            //     },
            //     {
            //         title: '24oz',
            //         dataIndex: 'qty.24oz',
            //         key: 'qty.24oz',
            //     },
            //     {
            //         title: '5Galkegs',
            //         dataIndex: 'qty.5Galkegs',
            //         key: 'qty.5Galkegs',
            //     },
            //     {
            //         title: '10Galkegs',
            //         dataIndex: 'qty.10Galkegs',
            //         key: 'qty.10Galkegs',
            //     },
            //     {
            //         title: '15Galkegs',
            //         dataIndex: 'qty.15Galkegs',
            //         key: 'qty.15Galkegs',
            //     },
            // ]
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
                    {/* <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(parseInt(record.id) - 1)}> */}
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDeleteDb(record._id)}>
                        <Button
                            type="primary"
                            danger
                        // onClick={() => handleDelete(parseInt(record.id) - 1)}
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
            rowKey={record => record._id}
            className={styles.tableContainer}
            columns={columns}
            dataSource={currentData}
            loading={isLoading}
            title={title}
        />
    );
};

export default BeersTable;