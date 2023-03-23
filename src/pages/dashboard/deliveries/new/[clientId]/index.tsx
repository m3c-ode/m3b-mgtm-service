import { Form } from 'antd';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import React from 'react';
import { getBeersAsync } from '../../../../../../lib/beers';
import { getClientData } from '../../../../../../lib/clients';
import { ClientData } from '../../../../../types/clients';
import type { BeerData } from '../../../../../types/beers';
import NewDeliveryForm from '../../../../../components/Forms/Delivery/NewDeliveryForm';
import { UserRolesEnum } from '../../../../../types/users';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../api/auth/[...nextauth]';
import { getAllDomainsAddresses, getDomainAddress, getDomainsList } from '../../../../../../lib/users';
import { AddressData } from '../../../../../types/addresses';

interface NewDeliveryPageProps {
    clientData?: ClientData;
    domainAddress?: string | AddressData;
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

    // when admin, fetch domains and addresses
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
        const clientId = context.params!.clientId as string;;
        const clientData = await getClientData(clientId);
        const domainAddress = await getDomainAddress(clientData.domain);

        const beersData = await getBeersAsync();
        // console.log("🚀 ~ file: index.tsx:39 ~ constgetServerSideProps:GetServerSideProps<NewDeliveryPageProps>= ~ beersData:", beersData);
        return {
            // Passed to the page component as props
            props: { clientData, beersData, domainAddress },

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

const NewDelivery = ({ clientData, beersData, domainAddress }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            {clientData && beersData &&
                <NewDeliveryForm
                    clientData={clientData}
                    beersData={beersData}
                    domainAddress={domainAddress}
                />
            }
        </>
    );
};

export default NewDelivery;