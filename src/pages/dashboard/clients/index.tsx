import React from 'react';
import Dashboard from '../../../components/Dashboard';
import ClientsTable from '../../../components/Tables/ClientsTable';
import TableHeader from '../../../components/Tables/TableHeader';
import type { ClientData } from '../../../types/clients';
import { IoAddOutline } from 'react-icons/io5';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import toast from 'react-hot-toast';
import { getAllClientsAsync } from '../../../../lib/clients';


interface ClientPageProps {
    clientsList?: ClientData[];
    isLoading?: boolean;
    error?: any;
};

export const getServerSideProps: GetServerSideProps<ClientPageProps> = async (context) => {
    try {
        const clientsList = await getAllClientsAsync();
        return {
            props: {
                clientsList: JSON.parse(JSON.stringify(clientsList)),
                // isLoading
            },
        };
    } catch (error: any) {
        toast.error('Error fetching client data');
        // setIsLoading(false);
        return {
            props: {
                error: 'Error getting client data'
            }
        };
        // throw new Error(error).message;
    }
};

const Clients = ({ clientsList, isLoading, error }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    if (error) {
        console.log("🚀 ~ file: index.tsx:60 ~ Clients ~ error:", error);
        toast.error('There was an error fetching the clients data');
    }

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
            buttonPath={'/dashboard/clients/new'}
        />;
    return (
        <Dashboard>
            {clientsList &&
                <ClientsTable
                    data={clientsList}
                    title={TableTitle}
                    isLoading={false}
                />
            }
        </Dashboard>
    );
};

export default Clients;