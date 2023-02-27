import React from 'react';
import Dashboard from '../../../components/Dashboard';
import ClientsTable from '../../../components/Tables/ClientsTable';
import TableHeader from '../../../components/Tables/TableHeader';
import { ClientData, ClientTypeEnum } from '../../../types/clients';
import { IoAddOutline } from 'react-icons/io5';


type Props = {};

const clientData: ClientData[] = [
    {
        _id: '1',
        name: 'John Doe',
        address: '123 Main St, Vancouver, BC',
        type: ClientTypeEnum.Restau,
        email: 'kenaa@example.com',

    },
    {
        _id: '2',
        name: 'John Doe',
        address: '123 Main St, Calgary, AB',
        type: ClientTypeEnum.LStore,
        email: 'kenaa@example.com',

    },
];

const Products = (props: Props) => {
    const TableTitle = () =>
        <TableHeader
            title={'Clients'}
            buttonText="New Client"
            buttonIcon={<IoAddOutline
                style={{
                    fontSize: '19px',
                    position: 'relative',
                    top: '4px'
                }}
            />}
            buttonPath={'/clients/new'}
        />;
    return (
        <Dashboard>
            <ClientsTable
                data={clientData}
                title={TableTitle}
                isLoading={false}
            />
        </Dashboard>
    );
};

export default Products;