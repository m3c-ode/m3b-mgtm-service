import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles.module.scss';
import toast from 'react-hot-toast';
import type { UserData, UsersTableProps } from '../../../types/users';
import type { AddressData } from '../../../types/addresses';
import { deleteUser, fetchAllUsers } from '../../../pages/api/services/users';
import { addressParser } from '../../../../lib/functions';

const UsersTable: React.FC<UsersTableProps> = ({ data, isLoading, title, domains }) => {

    const [currentData, setCurrentData] = useState(data);


    const handleDeleteDb = async (id: string) => {
        try {
            const delRes = await deleteUser(id);
            if (delRes.data.deletedCount === 0) {
                return toast.error("Error deleting user");
            }
            toast.success("User entry deleted");
            const res = await fetchAllUsers();
            const userData = res.data;
            setCurrentData(userData);

        } catch (error: any) {
            console.log("🚀 ~ file: UsersTable.tsx:43 ~ handleDeleteDb ~ error", error);
            toast.error('Error deleting user');
            throw new Error(error).message;
        }
    };

    const columns: ColumnsType<UserData> = [
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     key: 'address',
        //     render(value: AddressData, record, index) {
        //         // TODO: check if works
        //         // const { street1, street2, city, state, zip, country } = value;
        //         // return `${street2 ? street2 + ', ' : ''}${street1}, ${city}, ${state}`;
        //         return addressParser(value);
        //     },
        // },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
                            href={`/dashboard/users/${record._id}`}>Update Info</Link>

                    </Button>
                    {/* <Button
                        type="text"
                        className={styles.updateButton}
                    >
                        <Link
                            className={styles.tableButton}
                            href={`/dashboard/deliveries/new/${record._id}`}>Create Delivery</Link>

                    </Button> */}
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDeleteDb(record._id! as string)}>
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
            rowKey={(record, index) => (record._id! as string)}
            columns={columns}
            className={styles.tableContainer + 'ant-table ant-table-default !important'}
            dataSource={currentData}
            title={title}

        />
    );
};

export default UsersTable;