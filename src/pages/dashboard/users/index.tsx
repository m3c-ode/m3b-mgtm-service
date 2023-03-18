import React, { Props } from 'react';
import Dashboard from '../../../components/Dashboard';
import UsersTable from '../../../components/Tables/UsersTable';
import TableHeader from '../../../components/Tables/TableHeader';
import toast from 'react-hot-toast';
import { GetServerSideProps, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { getAllUsersAsync, getDomainsList, getDomainUsers } from '../../../../lib/users';
import { UserData, UserRolesEnum } from '../../../types/users';
import { IoAddOutline } from 'react-icons/io5';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';

interface UserPageProps {
    usersList?: UserData[];
    domainsList?: any[];
    isLoading?: boolean;
    error?: any;
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (context) => {
    // IF user is admin - get all users and create the domain array
    // otherwise, get domain users
    const session = await getServerSession(context.req, context.res, authOptions);
    const { role: userRole, domain } = session?.user ?? {};
    if (!session || userRole === UserRolesEnum.BUser) {
        return {
            redirect: {
                destination: '/dashboard/beers',
                permanent: false
            }
        };
    }
    try {
        if (userRole === UserRolesEnum.Admin) {
            const usersList = await getAllUsersAsync();
            const domainsList = await getDomainsList();
            return {
                props: {
                    // usersList: JSON.parse(JSON.stringify(usersList)),
                    usersList,
                    domainsList
                    // isLoading
                },
            };
        }
        // (userRole === UserRolesEnum.BOwner) {
        // if (userRole === UserRolesEnum.BOwner) {
        const usersList = await getDomainUsers(domain!);
        return {
            props: {
                usersList: JSON.parse(JSON.stringify(usersList)),
                // isLoading
            },
        };

        // }
        // }
    } catch (error: any) {
        console.log("🚀 ~ file: index.tsx:56 ~ constgetServerSideProps:GetServerSideProps<UserPageProps>= ~ error:", error);
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

const Users = ({ usersList, isLoading, error, domainsList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log("🚀 ~ file: index.tsx:68 ~ Users ~ error:", error);
    if (error) {
        toast.error(error);
    }
    console.log("🚀 ~ file: index.tsx:64 ~ Users ~ usersList:", usersList);
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
            {console.log('users list in component', usersList)}
            {usersList &&
                <UsersTable
                    title={TableTitle}
                    isLoading={false}
                    data={usersList}
                    domains={domainsList}
                />
            }
        </Dashboard>
    );
};

export default Users;