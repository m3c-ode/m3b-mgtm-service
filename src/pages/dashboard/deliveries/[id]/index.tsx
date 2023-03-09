import { Form } from 'antd';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import React from 'react';
import { getBeersAsync } from '../../../../../lib/beers';
import { getClientData } from '../../../../../lib/clients';
import { ClientData } from '../../../../types/clients';
import type { BeerData } from '../../../../types/beers';
import EditDeliveryForm from '../../../../components/Forms/Delivery/EditDeliveryForm';
import { DeliveryData, DeliveryStatusEnums } from '../../../../types/deliveries';
import { getDeliveryData } from '../../../../../lib/deliveries';

interface EditDeliveryPageProps {
    userInfo?: string;
    clientData?: ClientData;
    beersData?: BeerData[];
    deliveryData?: DeliveryData;
    canEdit?: boolean;
}

// Generates `/beers/1` and `/beers/2` - used only with SSG
// export const getStaticPaths: GetStaticPaths = async () => {
//     const paths = await getDbBeersId();
//     return {
//         paths,
//         // TODO: double check this
//         fallback: true,
//     };
// };

// `getStaticPaths` requires using `getStaticProps`
export const getServerSideProps: GetServerSideProps<EditDeliveryPageProps> = async (context) => {
    try {
        // console.log("🚀 ~ file: [id].tsx:18 ~ context", context);   
        const { clientId, id: deliveryId } = context.query;
        // const deliveryId = context.params!.id as string;
        const deliveryData = await getDeliveryData(deliveryId as string);
        let canEdit = false;

        if (deliveryData.status === DeliveryStatusEnums.Pending) canEdit = true;

        // const clientId = context.params!.clientId as string;
        const clientData = await getClientData(clientId as string);
        // console.log("🚀 ~ file: index.tsx:32 ~ constgetServerSideProps:GetServerSideProps<NewDeliveryPageProps>= ~ clientData:", clientData);

        // TODO: Get user info, for address...
        const userInfo = 'test';


        const beersData = await getBeersAsync();
        // console.log("🚀 ~ file: index.tsx:39 ~ constgetServerSideProps:GetServerSideProps<NewDeliveryPageProps>= ~ beersData:", beersData);
        return {
            // Passed to the page component as props
            props: { deliveryData, beersData, userInfo, clientData, canEdit },

        };

    } catch (error) {
        console.log('error fetching in beers/id', error);
        return {
            props: {
                beersData: undefined,
                deliveryData: undefined,
                clientData: undefined,
                error: 'Error fetching in information for delivery'
            },

        };
    }
};

const NewDelivery = ({ deliveryData, beersData, clientData, userInfo, canEdit }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            {deliveryData && beersData &&
                <EditDeliveryForm
                    userInfo={userInfo}
                    clientData={clientData}
                    beersData={beersData}
                    deliveryData={deliveryData}
                    canEdit={canEdit}
                />
            }
        </>
    );
};

export default NewDelivery;