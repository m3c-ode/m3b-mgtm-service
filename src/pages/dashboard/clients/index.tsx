import React from 'react';
import Dashboard from '../../../components/Dashboard';
import ClientsTable from '../../../components/Tables/ClientsTable';
import TableHeader from '../../../components/Tables/TableHeader';
import { ClientData, ClientTypeEnum, NewClientInput } from '../../../types/clients';
import { IoAddOutline } from 'react-icons/io5';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import toast from 'react-hot-toast';
import { getAllClientsAsync, insertClients } from '../../../../lib/clients';


interface ClientPageProps {
    clientsList?: ClientData[];
    isLoading?: boolean;
    error?: any;
};

// const clientData: ClientData[] = [
//     {
//         _id: '1',
//         name: 'John Doe',
//         address: '123 Main St, Vancouver, BC',
//         type: ClientTypeEnum.Restau,
//         email: 'kenaa@example.com',

//     },
//     {
//         _id: '2',
//         name: 'John Doe',
//         address: '123 Main St, Calgary, AB',
//         type: ClientTypeEnum.LStore,
//         email: 'kenaa@example.com',

//     },
// ];

// const clients: NewClientInput[] = [
//     {
//         name: "John Smith",
//         email: "john.smith@example.com",
//         type: ClientTypeEnum.Restau,
//         address: {
//             street1: "123 Main St",
//             street2: "",
//             city: "Anytown",
//             state: "CA",
//             zip: "12345",
//             country: "USA",
//             phone: "555-555-1234",
//         },
//     },
//     {
//         name: "Jane Doe",
//         email: "jane.doe@example.com",
//         type: ClientTypeEnum.LStore,
//         address: {
//             street1: "456 Elm St",
//             street2: "Apt 5",
//             city: "Sometown",
//             state: "NY",
//             zip: "67890",
//             country: "USA",
//             phone: "555-555-5678",
//         },
//     },
//     {
//         name: 'Mary Smith',
//         email: 'mary.smith@example.com',
//         type: ClientTypeEnum.Restau,

//         address: {
//             street1: '123 Main St',
//             street2: '',
//             city: 'Los Angeles',
//             zip: '90001',
//             state: 'CA',
//             country: 'USA',
//             phone: '555-555-5555',
//         }
//     },
//     {
//         name: 'John Johnson',
//         email: 'john.johnson@example.com',
//         type: ClientTypeEnum.LStore,

//         address: {
//             street1: '456 Elm St',
//             street2: '',
//             city: 'New York',
//             zip: '10001',
//             state: 'NY',
//             country: 'USA',
//             phone: '555-555-5555',
//         }
//     },
//     {
//         name: 'Alice Lee',
//         email: 'alice.lee@example.com',
//         type: ClientTypeEnum.Restau,
//         address: {
//             street1: '789 Oak St',
//             street2: '',
//             city: 'San Francisco',
//             zip: '94101',
//             state: 'CA',
//             country: 'USA',
//             phone: '555-555-5555',
//         }
//     }
//     // Add more entries here as needed
// ];

// async function createMockData(data: NewClientInput[]) {
//     insertClients(data);
// }

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