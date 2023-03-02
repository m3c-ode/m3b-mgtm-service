import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { getClientData } from '../../../../../lib/clients';
import EditClientForm from '../../../../components/Forms/Clients/EditClientForm';
import type { ClientData } from '../../../../types/clients';

interface EditClientPageProps {
    clientData?: ClientData;
}

export const getServerSideProps: GetServerSideProps<EditClientPageProps> = async (context) => {
    try {
        console.log("🚀 ~ file: [id].tsx:18 ~ context", context);
        const clientId = context.params!.id as string;;
        const clientData = await getClientData(clientId);
        return {
            // Passed to the page component as props
            props: { clientData },
        };

    } catch (error) {
        console.log('error fetching in clients/id', error);
        return {
            props: {
                clientData: undefined,
                error: 'Error fetching in clients/id'
            },

        };
    }
};

type Props = {
    clientData?: ClientData,
};

const Client = ({ clientData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log("🚀 ~ file: index.tsx:36 ~ Client ~ clientData", clientData);

    return (
        <>
            {clientData &&
                <EditClientForm
                    data={clientData}
                />
            }
        </>
    );
};

export default Client;