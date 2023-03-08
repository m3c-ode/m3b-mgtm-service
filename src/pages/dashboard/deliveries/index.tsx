import React from 'react';
import Dashboard from '../../../components/Dashboard';
import DeliveriesTable from '../../../components/Tables/DeliveriesTable';
import TableHeader from '../../../components/Tables/TableHeader';
import type { DeliveryData } from '../../../types/deliveries';
import { IoAddOutline } from 'react-icons/io5';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import toast from 'react-hot-toast';
import { getAllDeliveriesAsync } from '../../../../lib/deliveries';
import { ClientData } from '../../../types/clients';
import { getAllClientsAsync } from '../../../../lib/clients';


interface DeliveryPageProps {
    deliveriesList?: DeliveryData[];
    clientsList?: ClientData[],
    isLoading?: boolean;
    error?: any;
};

export const getServerSideProps: GetServerSideProps<DeliveryPageProps> = async (context) => {
    try {
        const clientsList = await getAllClientsAsync();
        const deliveriesList = await getAllDeliveriesAsync();
        return {
            props: {
                deliveriesList,
                clientsList,
                // deliveriesList: JSON.parse(JSON.stringify(deliveriesList)),
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

const DeliveriesPage = ({ deliveriesList, clientsList, isLoading, error }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // console.log("🚀 ~ file: index.tsx:47 ~ DeliveriesPage ~ clientsList:", clientsList);
    // console.log("🚀 ~ file: index.tsx:47 ~ DeliveriesPage ~ deliveriesList:", deliveriesList);

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
            {deliveriesList && clientsList &&
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