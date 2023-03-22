import React from 'react';
import Dashboard from '../../../components/Dashboard';
import DeliveriesTable from '../../../components/Tables/DeliveriesTable';
import TableHeader from '../../../components/Tables/TableHeader';
import type { DeliveryData } from '../../../types/deliveries';
import { IoAddOutline } from 'react-icons/io5';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import toast from 'react-hot-toast';
import { getAllDeliveriesAsync, getDomainDeliveries } from '../../../../lib/deliveries';
import { ClientData } from '../../../types/clients';
import { getAllClientsAsync, getDomainClients } from '../../../../lib/clients';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import { UserRolesEnum } from '../../../types/users';
import { getDomainsList } from '../../../../lib/users';
import { getSession, useSession } from 'next-auth/react';
import AdminDeliveriesTable from '../../../components/Tables/DeliveriesTable/AdminDeliveriesTable';


interface DeliveryPageProps {
    deliveriesList?: DeliveryData[];
    clientsList?: ClientData[],
    isLoading?: boolean;
    domainsList?: any[];
    error?: any;
};

export const getServerSideProps: GetServerSideProps<DeliveryPageProps> = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    const { role: userRole, domain } = session?.user ?? {};
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
    try {
        if (userRole === UserRolesEnum.Admin) {
            const domainsList = await getDomainsList();
            const clientsList = await getAllClientsAsync();
            const deliveriesList = await getAllDeliveriesAsync();
            return {
                props: {
                    deliveriesList,
                    clientsList,
                    domainsList
                    // deliveriesList: JSON.parse(JSON.stringify(deliveriesList)),
                    // isLoading
                },
            };
        }
        const clientsList = await getDomainClients(domain!);
        const deliveriesList = await getDomainDeliveries(domain!);
        return {
            props: {
                deliveriesList,
                clientsList,
                // isLoading
            },
        };
    } catch (error: any) {
        toast.error('Error fetching delivery table data');
        // setIsLoading(false);
        return {
            props: {
                error: 'Error getting delivery table data'
            }
        };
        // throw new Error(error).message;
    }
};
type Props = {};

const DeliveriesPage = ({ deliveriesList, clientsList, isLoading, error, domainsList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // console.log("🚀 ~ file: index.tsx:47 ~ DeliveriesPage ~ clientsList:", clientsList);
    // console.log("🚀 ~ file: index.tsx:47 ~ DeliveriesPage ~ deliveriesList:", deliveriesList);

    const { data } = useSession();
    console.log("🚀 ~ file: index.tsx:80 ~ DeliveriesPage ~ data:", data);
    const userRole = data?.user?.role;

    if (error) {
        console.log("🚀 ~ file: index.tsx:60 ~ Deliveries ~ error:", error);
        toast.error('There was an error fetching the deliveries table data');
    }

    const TableTitle = () =>
        <TableHeader
            title={'Deliveries'}
        // buttonText="New Delivery"
        // buttonIcon={<IoAddOutline
        //     style={{
        //         fontSize: '19px',
        //         position: 'relative',
        //         top: '4px'
        //     }}
        // />}
        // buttonPath={'/dashboard/deliveries/new'}
        />;
    return (
        <Dashboard>
            {deliveriesList && clientsList && userRole === UserRolesEnum.Admin ?
                <AdminDeliveriesTable
                    deliveriesData={deliveriesList}
                    clientsData={clientsList}
                    title={TableTitle}
                    isLoading={false}
                    domains={domainsList}
                />
                :
                <DeliveriesTable
                    deliveriesData={deliveriesList}
                    clientsData={clientsList}
                    title={TableTitle}
                    isLoading={false}
                />
            }
        </Dashboard>
    );
};

export default DeliveriesPage;