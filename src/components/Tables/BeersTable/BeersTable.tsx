import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import type { BeersTableProps, BeerData } from '../../../types/beers';
import styles from '../styles.module.scss';
import { deleteBeer, getAllBeers as fetchBeersList } from '../../../pages/api/services';
import { ObjectId } from 'mongodb';
import toast from 'react-hot-toast';
import { dateTableParser } from '../../../../lib/functions';


// type BeersTableProps = {}

const BeersTable: React.FC<BeersTableProps> = ({ data, isLoading, title, domains }) => {

    const [currentData, setCurrentData] = useState(data);

    const handleDeleteDb = async (id: string | ObjectId) => {
        try {
            const delRes = await deleteBeer(id);
            toast.success("Beer Successfully Deleted");
            const res = await fetchBeersList();
            const beerData = res.data;
            setCurrentData(beerData);

        } catch (error: any) {
            console.log("🚀 ~ file: BeersTable.tsx:43 ~ handleDeleteDb ~ error", error);
            toast.error('Error deleting beer');

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

    const columns: ColumnsType<BeerData> = [
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
            render: (value, record) => dateTableParser(value)
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
                            href={`beers/${record._id}`}>Update Info</Link>

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

    const expandedRowRender = (record: any, index: number) => {
        return (

            <Table
                rowKey={(record, index) => (record._id! as string)}
                columns={columns}
                className={styles.tableContainer + 'ant-table ant-table-default !important'}
                dataSource={currentData?.filter((beer) => beer.domain === record._id)}
            />
        );
    };

    return (
        <Table
            rowKey={record => record._id}
            className={styles.tableContainer}
            columns={domains ? domainsColumn : columns}
            dataSource={domains ? domains : currentData}
            title={title}
            // expandable={{expandedRowRender}}
            expandable={domains ? { expandedRowRender, defaultExpandedRowKeys: ['m3beer'] } : undefined}
            loading={isLoading}
        />
    );
};

export default BeersTable;