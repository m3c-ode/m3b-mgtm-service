import React from 'react';
import Dashboard from '../../../components/Dashboard';
import UsersTable from '../../../components/Tables/UsersTable';
import TableHeader from '../../../components/Tables/TableHeader';

type Props = {};

const Users = (props: Props) => {
    const TableTitle = () =>
        <TableHeader
            title={'Users'}
        />;
    return (
        <Dashboard>
            <UsersTable
                title={TableTitle}
                isLoading={false}
            />
        </Dashboard>
    );
};

export default Users;