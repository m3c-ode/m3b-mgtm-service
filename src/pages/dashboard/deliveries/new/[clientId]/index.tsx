import { Form } from 'antd';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import React from 'react';
import { getBeersAsync } from '../../../../../../lib/beers';
import { getClientData } from '../../../../../../lib/clients';
import { ClientData } from '../../../../../types/clients';
import type { BeerData } from '../../../../../types/beers';
import NewDeliveryForm from '../../../../../components/Forms/Delivery/NewDeliveryForm';

interface NewDeliveryPageProps {
    userInfo?: string;
    clientData?: ClientData;
    beersData?: BeerData[];
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
export const getServerSideProps: GetServerSideProps<NewDeliveryPageProps> = async (context) => {
    try {
        // console.log("🚀 ~ file: [id].tsx:18 ~ context", context);
        const clientId = context.params!.clientId as string;;
        const clientData = await getClientData(clientId);
        console.log("🚀 ~ file: index.tsx:32 ~ constgetServerSideProps:GetServerSideProps<NewDeliveryPageProps>= ~ clientData:", clientData);

        // TODO: Get user info, for address...
        const userInfo = 'test';


        const beersData = await getBeersAsync();
        console.log("🚀 ~ file: index.tsx:39 ~ constgetServerSideProps:GetServerSideProps<NewDeliveryPageProps>= ~ beersData:", beersData);
        return {
            // Passed to the page component as props
            props: { clientData, beersData, userInfo },

        };

    } catch (error) {
        console.log('error fetching in beers/id', error);
        return {
            props: {
                beersData: undefined,
                clientData: undefined,
                error: 'Error fetching in beers/id'
            },

        };
    }
};

const NewDelivery = ({ clientData, beersData, userInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            {clientData && beersData &&
                <NewDeliveryForm
                    userInfo={userInfo}
                    clientData={clientData}
                    beersData={beersData}

                />
            }
        </>
    );
};

export default NewDelivery;