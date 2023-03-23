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
import { AddressData } from '../../../../types/addresses';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]';
import { getDomainAddress } from '../../../../../lib/users';

interface EditDeliveryPageProps {
    userInfo?: string;
    clientData?: ClientData;
    beersData?: BeerData[];
    deliveryData?: DeliveryData;
    canEdit?: boolean;
    domainAddress?: string | AddressData;
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
        const { clientId, id: deliveryId } = context.query;
        const deliveryData = await getDeliveryData(deliveryId as string);
        let canEdit = false;

        if (deliveryData.status === DeliveryStatusEnums.Pending) canEdit = true;

        const clientData = await getClientData(clientId as string);
        const domainAddress = await getDomainAddress(clientData.domain);

        // TODO: Get user info, for address...
        const userInfo = 'test';


        const beersData = await getBeersAsync();
        return {
            // Passed to the page component as props
            props: { deliveryData, beersData, userInfo, clientData, domainAddress, canEdit },

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

const NewDelivery = ({ deliveryData, beersData, clientData, domainAddress, userInfo, canEdit }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            {deliveryData && beersData &&
                <EditDeliveryForm
                    userInfo={userInfo}
                    clientData={clientData}
                    beersData={beersData}
                    deliveryData={deliveryData}
                    canEdit={canEdit}
                    domainAddress={domainAddress}
                />
            }
        </>
    );
};

export default NewDelivery;