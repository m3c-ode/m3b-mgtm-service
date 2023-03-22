import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { getUserDataFromId } from '../../../../../lib/users';
import EditUserForm from '../../../../components/Forms/Users/EditUserForm';
import type { UserData } from '../../../../types/users';

interface EditUserPageProps {
    userData?: UserData;
}

export const getServerSideProps: GetServerSideProps<EditUserPageProps> = async (context) => {
    try {
        // console.log("🚀 ~ file: [id].tsx:18 ~ context", context);
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
            {userData &&
                <EditUserForm
                    data={userData}
                />
            }
        </>
    );
};

export default User;