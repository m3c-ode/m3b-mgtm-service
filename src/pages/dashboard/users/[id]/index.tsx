import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';

import { getUserDataFromId } from '../../../../../lib/users';
import Dashboard from '../../../../components/Dashboard';
import EditUserForm from '../../../../components/Forms/Users/EditUserForm';
import type { UserData } from '../../../../types/users';
import { authOptions } from '../../../api/auth/[...nextauth]';

interface EditUserPageProps {
    userData?: UserData;
}

export const getServerSideProps: GetServerSideProps<EditUserPageProps> = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    const { role: userRole, domain, email } = session?.user ?? {};
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
    try {
        const userId = context.params!.id as string;;
        const userData = await getUserDataFromId(userId);
        return {
            // Passed to the page component as props
            props: { userData },
        };

    } catch (error) {
        console.log('error fetching in users/id', error);
        return {
            props: {
                userData: undefined,
                error: 'Error fetching in users/id'
            },

        };
    }
};

type Props = {
    userData?: UserData,
};

const User = ({ userData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log("🚀 ~ file: index.tsx:36 ~ User ~ userData", userData);

    return (
        <>
            <Dashboard>
                {userData &&
                    <EditUserForm
                        data={userData}
                    />
                }
            </Dashboard>
        </>
    );
};

export default User;