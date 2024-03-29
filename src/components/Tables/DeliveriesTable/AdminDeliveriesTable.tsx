import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles.module.scss';
import toast from 'react-hot-toast';
import { DeliveryData, DeliveriesTableProps, DeliveryProducts, DeliveryStatusEnums } from '../../../types/deliveries';
import type { AddressData } from '../../../types/addresses';
import { deleteDelivery, fetchAllDeliveries } from '../../../pages/api/services/deliveries';
import { addressParser, dateTableParser } from '../../../../lib/functions';
import { ClientData } from '../../../types/clients';

type Props = {};

const AdminDeliveriesTable: React.FC<DeliveriesTableProps> = ({ deliveriesData, clientsData, domains, isLoading, title }) => {

    const [currentData, setCurrentData] = useState(deliveriesData);

    const clientWithDeliveryInfo = (clientId: string) => {
        return deliveriesData?.some((delivery) => delivery.clientId === clientId);
    };

    const filteredClientsData = clientsData?.filter((client) => clientWithDeliveryInfo(client._id!));

    const handleDeleteDb = async (id: string) => {
        try {
            const delRes = await deleteDelivery(id);
            if (delRes.data.deletedCount === 0) {
                return toast.error("Error deleting delivery");
            }
            toast.success("Delivery entry deleted");
            const res = await fetchAllDeliveries();
            const deliveryData = res.data;
            setCurrentData(deliveryData);

        } catch (error: any) {
            console.log("🚀 ~ file: DeliveriesTable.tsx:43 ~ handleDeleteDb ~ error", error);
            toast.error('Error deleting delivery');
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

    const parentColumns: ColumnsType<ClientData> = [{
        title: 'Client Name',
        dataIndex: 'name',
        key: 'name',

    }];

    const productsColumns: ColumnsType<DeliveryProducts> = [
        {
            title: 'Beer Name',
            key: 'beerName',
            dataIndex: 'beer.label',
            render: (text, record) => record.beer.label
        },
        {
            title: 'Quantities',
            key: 'qties',
            dataIndex: 'qty',
            children: [
                {
                    title: '355 ml',
                    key: '355ml',
                    dataIndex: 'qty.355ml',
                    render: (text, record) => record.qty['355ml']
                },
                {
                    title: '473 ml',
                    dataIndex: 'qty.473ml',
                    render: (text, record) => record.qty['473ml']
                },
                {
                    title: '650 ml',
                    dataIndex: 'qty.650ml',
                    key: '650ml',
                    render: (text, record) => record.qty['650ml']
                },
                {
                    title: '19L Keg',
                    dataIndex: 'qty.19Lkegs',
                    key: '19Lkegs',
                    render: (text, record) => record.qty['19Lkegs']
                },
                {
                    title: '38L Keg',
                    dataIndex: 'qty.38Lkegs',
                    key: '38Lkegs',
                    render: (text, record) => record.qty['38Lkegs']
                },
                {
                    title: '57L Keg',
                    dataIndex: 'qty.57Lkegs',
                    key: '57Lkegs',
                    render: (text, record) => record.qty['57Lkegs']
                }

            ]
        },

    ];

    const deliveryInfocolumns: ColumnsType<DeliveryData> = [
        {
            title: 'From',
            dataIndex: 'fromAddress',
            key: 'fromAddress',
        },
        {
            title: 'To',
            dataIndex: 'toAddress',
            key: 'toAddress',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Created On',
            dataIndex: 'createdOn',
            key: 'createdOn',
            render: (value) => dateTableParser(value)
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
                            href={`/dashboard/deliveries/${record._id}?clientId=${record.clientId}`}
                        >
                            {record.status === DeliveryStatusEnums.Pending ? 'Update Info' : 'Details'}
                            {/* Details */}
                        </Link>

                    </Button>
                    {record.status === DeliveryStatusEnums.Pending &&
                        <Button
                            type="text"
                            className={styles.updateButton}
                        >
                            <Link
                                className={styles.tableButton}
                                href={`/dashboard/deliveries/map/${record._id}`}>Start Delivery</Link>

                        </Button>
                    }
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

    const expandedRowRender = (record: any) => {


        const expandedRowRender = (record: ClientData) => {

            const expandedRowRender = (record: DeliveryData) => {
                return (
                    <Table
                        columns={productsColumns}
                        dataSource={record.products}
                        pagination={false}
                    />
                );
            };
            return (
                <Table
                    columns={deliveryInfocolumns}
                    dataSource={currentData?.filter((delivery) => delivery.clientId === record._id)}
                    expandable={{ expandedRowRender }}
                    pagination={false}
                />
            );
        };

        return (
            <Table
                rowKey={(record, index) => (record._id! as string)}
                columns={parentColumns}
                dataSource={filteredClientsData?.filter(client => client.domain === record._id)}
                className={styles.tableContainer + 'ant-table ant-table-default !important'}
                expandable={{ expandedRowRender }}
            />
        );

    };
    return (
        <Table
            rowKey={(record, index) => (record._id!)}
            columns={domains ? domainsColumn : parentColumns}
            className={styles.tableContainer + 'ant-table ant-table-default !important'}
            dataSource={domains ? domains : filteredClientsData}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ['m3beer'] }}
            // expandable={domains ? { expandedRowRender, defaultExpandedRowKeys: ['m3beer'] } : undefined}
            title={title}

        />
    );
};

export default AdminDeliveriesTable;