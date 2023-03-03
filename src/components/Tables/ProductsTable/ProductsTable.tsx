import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles.module.scss';
import { deleteBeer, getAllBeers } from '../../../pages/api/services';
import { ObjectId } from 'mongodb';
import toast from 'react-hot-toast';
import type { ProductData, ProductsTableProps } from '../../../types/products';
import { HtmlProps } from 'next/dist/shared/lib/html-context';

interface Grain {
    key: string;
    name: string;
    quantity: number;
    receivedOn: string;
}

interface Hop {
    key: string;
    name: string;
    quantity: number;
    receivedOn: string;
    type: 'Pellets' | 'Leafs';
    acidProfile: string;
}

interface OtherProduct {
    key: string;
    name: string;
    quantity: number;
    receivedOn: string;
}


interface ProductType {
    key: string;
    name: string;
}

interface Actions {
    key: string;
    actions: JSX.Element;

}

type ProductColumnType = ColumnsType<ProductType>;

const grains: Grain[] = [
    { key: '1', name: '2-Row Malt', quantity: 50, receivedOn: '2022-01-01' },
    { key: '2', name: 'Crystal Malt', quantity: 25, receivedOn: '2022-01-02' },
    { key: '3', name: 'Wheat Malt', quantity: 10, receivedOn: '2022-01-03' },
];

const hops: Hop[] = [
    { key: '1', name: 'Cascade', quantity: 5, receivedOn: '2022-01-01', type: 'Pellets', acidProfile: '5.5%' },
    { key: '2', name: 'Centennial', quantity: 2, receivedOn: '2022-01-01', type: 'Leafs', acidProfile: '10.5%' },
    { key: '3', name: 'Chinook', quantity: 3, receivedOn: '2022-01-01', type: 'Pellets', acidProfile: '11%' },
];

const other: OtherProduct[] = [
    { key: '1', name: 'Yeast', quantity: 1, receivedOn: '2022-01-05' },
    { key: '2', name: 'Irish Moss', quantity: 1, receivedOn: '2022-01-06' },
    { key: '3', name: 'Gypsum', quantity: 1, receivedOn: '2022-01-07' },
];


const productType: ProductType[] = [
    { key: '1', name: 'Grains' },
    { key: '2', name: 'Hops' },
    { key: '3', name: 'Other' },
];

const actions: ProductColumnType = [
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <Space size="middle">
                {/* <Button
                        type="text"
                        className={styles.updateButton}
                    >
                        <Link
                            className={styles.tableButton}
                            href={`/beers/${record._id}`}>Update Info</Link>

                    </Button> */}
                {/* <Popconfirm title="Are you sure?" onConfirm={() => handleDeleteDb(record._id)}>
                        <Button
                            type="primary"
                            danger
                        >
                            Delete
                        </Button>
                    </Popconfirm> */}
            </Space>
        )
    },
];

const columns: ProductColumnType = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Received On',
        dataIndex: 'receivedOn',
        key: 'receivedOn',
        // render: (value, record) => {
        //     if (typeof value === 'string') {
        //         if (value.includes("T")) {
        //             return value.split("T")[0];
        //         } else return value;
        //     } else {
        //         return new Date(value).toISOString().split('T')[0];
        //     }
        // }
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Acid Profile',
        dataIndex: 'acidProfile',
        key: 'acidProfile',
    },
];



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

    const expandedRowRender = (record: ProductType) => {
        const childrenColumns = record.name === 'Hops' ? columns.concat(actions) : columns.slice(0, 3).concat(actions);
        return (
            <Table
                columns={childrenColumns}
                dataSource={record.name === 'Grains' ? grains : record.name === 'Hops' ? hops : other}
                // dataSource={record.children}
                pagination={false}
            />
        );
    };

    return (
        <Table
            columns={columns.slice(0, 1)}
            dataSource={productType}
            pagination={false}
            expandable={{ expandedRowRender }}
            title={title}
        />
    );
};

export default ProductsTable;