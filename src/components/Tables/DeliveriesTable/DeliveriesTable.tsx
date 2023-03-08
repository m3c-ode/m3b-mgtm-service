import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles.module.scss';
import toast from 'react-hot-toast';
import type { DeliveryData, DeliveriesTableProps } from '../../../types/deliveries';
import type { AddressData } from '../../../types/addresses';
import { deleteDelivery, fetchAllDeliveries } from '../../../pages/api/services/deliveries';
import { addressParser } from '../../../../lib/functions';
import { ClientData } from '../../../types/clients';

type Props = {};

const DeliveriesTable: React.FC<DeliveriesTableProps> = ({ deliveriesData, clientsData, isLoading, title }) => {
    console.log("🚀 ~ file: DeliveriesTable.tsx:16 ~ deliveriesData:", deliveriesData);

    const [currentData, setCurrentData] = useState(deliveriesData);

    const clientWithDeliveryInfo = (clientId: string) => {
        return deliveriesData?.some((delivery) => delivery.clientId === clientId);
    };

    const filteredClientsData = clientsData?.filter((client) => clientWithDeliveryInfo(client._id!));
    console.log("🚀 ~ file: DeliveriesTable.tsx:25 ~ filteredClientsData:", filteredClientsData);


    const handleDeleteDb = async (id: string) => {
        // try {
        //     const delRes = await deleteDelivery(id);
        //     if (delRes.data.deletedCount === 0) {
        //         return toast.error("Error deleting delivery");
        //     }
        //     toast.success("Delivery entry deleted");
        //     const res = await fetchAllDeliveries();
        //     const deliveryData = res.data;
        //     setCurrentData(deliveryData);

        // } catch (error: any) {
        //     console.log("🚀 ~ file: DeliveriesTable.tsx:43 ~ handleDeleteDb ~ error", error);
        //     toast.error('Error deleting delivery');
        //     throw new Error(error).message;
        // }
    };

    const parentColumns: ColumnsType<ClientData> = [{
        title: 'Client Name',
        dataIndex: 'name',
        key: 'name',

    }];

    const deliveryInfocolumns: ColumnsType<DeliveryData> = [

        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'From',
            dataIndex: 'fromAddress',
            key: 'fromAddress',
            // render(value: AddressData, record, index) {
            //     // TODO: check if works
            //     // const { street1, street2, city, state, zip, country } = value;
            //     // return `${street2 ? street2 + ', ' : ''}${street1}, ${city}, ${state}`;
            //     return addressParser(value);
            // },
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
        // {
        //     title: 'Products',
        //     dataIndex: 'products',
        //     key: 'products',
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
                            href={`/dashboard/deliveries/${record._id}`}>Update Info</Link>

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

    const expandedRowRender = (record: ClientData) => {
        // const childrenColumns = record.name === 'Hops' ? columns.concat(actions) : columns.slice(0, 3).concat(actions);
        return (
            <Table
                columns={deliveryInfocolumns}
                dataSource={currentData?.filter((delivery) => delivery.clientId === record._id)}
                // dataSource={record.children}
                pagination={false}
            />
        );
    };

    return (
        <Table
            rowKey={(record, index) => (record._id!)}
            columns={parentColumns}
            className={styles.tableContainer + 'ant-table ant-table-default !important'}
            dataSource={filteredClientsData}
            expandable={{ expandedRowRender }}
            title={title}

        />
    );
};

export default DeliveriesTable;