import { Button, Popconfirm, Space, Table } from 'antd';
import Item from 'antd/es/list/Item';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import type { BeersTableProps, BeerData } from '../../../types/beers';
import Dashboard from '../../Dashboard';
import styles from '../styles.module.scss';
import utilStyles from '../utilStyle.module.css';
import { beerData } from '../../../seed';


// type BeersTableProps = {}

const BeersTable: React.FC<BeersTableProps> = ({ data, isLoading, title }) => {

    const [currentData, setCurrentData] = useState(data);

    // const handleDelete = (index: number) => {
    const handleDelete = (id: string) => {
        console.log("🚀 ~ file: BeersTable.tsx:21 ~ handleDelete ~ id", id);
        // console.log("🚀 ~ file: BeersTable.tsx:17 ~ handleDelete ~ id", index);
        console.log("🚀 ~ file: BeersTable.tsx:22 ~ handleDelete ~ data", data);
        console.log("before splice", beerData);
        // data.splice(index, 1);
        // beerData.splice(index, 1);
        console.log("🚀 after splice", beerData);
        // setCurrentData(data);

        // const newData = currentData.splice(index, 1);
        const newData = beerData.filter((item) => item.id !== id);

        setCurrentData(newData);
    };

    const columns: ColumnsType<BeerData> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
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
                console.log("🚀 ~ file: BeersTable.tsx:36 ~ value", value);
                console.log('type of available', typeof value);
                if (typeof value === 'string') {
                    return value;
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
                console.log("🚀 ~ file: BeersTable.tsx:47 ~ value", value);
                console.log('type of available', typeof value);
                if (typeof value === 'string') {
                    return value;
                } else {
                    return new Date(value).toISOString().split('T')[0];
                }
            }
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
                            href={`/beers/${record.id}`}>Update Info</Link>

                    </Button>
                    {/* <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(parseInt(record.id) - 1)}> */}
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
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
            columns={columns}
            dataSource={currentData}
            title={title}
        />
    );
};

export default BeersTable;