import React, { Props } from 'react';
import Dashboard from '../../../components/Dashboard';
import UsersTable from '../../../components/Tables/UsersTable';
import TableHeader from '../../../components/Tables/TableHeader';
import toast from 'react-hot-toast';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getAllUsersAsync, getDomainUsers } from '../../../../lib/users';
import { UserData, UserRolesEnum } from '../../../types/users';
import { IoAddOutline } from 'react-icons/io5';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';

interface UserPageProps {
    usersList?: UserData[];
    isLoading?: boolean;
    error?: any;
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (context) => {
    // IF user is admin - get all users and create the domain array
    // otherwise, get domain users
    const session = await getServerSession(context.req, context.res, authOptions);
    console.log("🚀 ~ file: index.tsx:23 ~ constgetServerSideProps:GetServerSideProps<UserPageProps>= ~ session:", session);
    const { role: userRole, domain } = session?.user ?? {};
    try {
        if (userRole === UserRolesEnum.Admin) {

            const usersList = await getAllUsersAsync();
            return {
                props: {
                    usersList: JSON.parse(JSON.stringify(usersList)),
                    // isLoading
                },
            };
        }
        // (userRole === UserRolesEnum.BOwner) {
        else {
            const usersList = await getDomainUsers(domain!);
            return {
                props: {
                    usersList: JSON.parse(JSON.stringify(usersList)),
                    // isLoading
                },
            };

        }
        // }
    } catch (error: any) {
        toast.error('Error fetching user data');
        // setIsLoading(false);
        return {
            props: {
                error: 'Error getting user data'
            }
        };
        // throw new Error(error).message;
    }
};

const Users = ({ usersList, isLoading, error }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const TableTitle = () =>
        <TableHeader
            title={'Users'}
            buttonText="New User"
            buttonIcon={<IoAddOutline
                style={{
                    fontSize: '19px',
                    position: 'relative',
                    top: '4px'
                }}
            />}
            buttonPath={'/dashboard/users/new'}
        />;
    return (
        <Dashboard>
            {usersList &&
                <UsersTable
                    title={TableTitle}
                    isLoading={false}
                    data={usersList}
                />
            }
        </Dashboard>
    );
};

export default Users;