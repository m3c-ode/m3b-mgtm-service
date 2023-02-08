import { Button, Space, Table } from 'antd';
import Item from 'antd/es/list/Item';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React from 'react';
import type { BeersTableProps, BeerData } from '../../../types/beers';
import Dashboard from '../../Dashboard';
import styles from '../styles.module.scss';
import utilStyles from '../utilStyle.module.css';


// type BeersTableProps = {}

const BeersTable: React.FC<BeersTableProps> = ({ data, isLoading, title }) => {
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
        },
        {
            title: 'Available On',
            dataIndex: 'availableOn',
            key: 'availableOn',
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
                    <Button
                        type="primary"
                        danger
                    >
                        Delete
                    </Button>
                </Space>
            )
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            title={title}
        />
    );
};

export default BeersTable;