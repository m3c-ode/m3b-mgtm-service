import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import toast from 'react-hot-toast';
import { getBeersAsync } from '../../../../../../lib/beers';
import { getClientData } from '../../../../../../lib/clients';
import { getDeliveryData } from '../../../../../../lib/deliveries';
import DeliveryMap from '../../../../../components/Delivery/DeliveryMap';
import { ClientData } from '../../../../../types/clients';
import { DeliveryData, DeliveryStatusEnums } from '../../../../../types/deliveries';


interface DeliveryMapPageProps {
    clientData?: ClientData;
    deliveryData?: DeliveryData;
    error?: any,
}

export const getServerSideProps: GetServerSideProps<DeliveryMapPageProps> = async (context) => {
    try {
        const deliveryId = context.params!.id;
        const deliveryData = await getDeliveryData(deliveryId as string);


        const clientData = await getClientData(deliveryData.clientId);

        return {
            // Passed to the page component as props
            props: { deliveryData, clientData },

        };
    } catch (error) {
        console.log('error fetching in delivery information', error);
        return {
            props: {
                deliveryData: undefined,
                clientData: undefined,
                userInfo: undefined,
                error: 'Error fetching in information for delivery'
            },

        };
    }
};


const DeliveryMapPage = ({ deliveryData, clientData, error }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    if (error) {
        console.log("🚀 ~ file: index.tsx:60 ~ Clients ~ error:", error);
        toast.error('There was an error fetching the clients data');
    }

    return (
        <>
            {deliveryData && clientData &&
                <DeliveryMap
                    deliveryData={deliveryData}
                    clientData={clientData}
                />
            }
        </>
    );
};

export default DeliveryMapPage;