import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Dashboard from '../../../components/Dashboard';
import BeersTable from '../../../components/Tables/BeersTable';
import TableHeader from '../../../components/Tables/TableHeader';
import type { BeerData } from '../../../types/beers';
import { IoAddOutline } from 'react-icons/io5';
import { getAllBeers } from '../../api/services';
import toast from 'react-hot-toast';
import { getBeersAsync, getDomainBeers, updateBeersDomain } from '../../../../lib/beers';
import clientPromise from '../../../../lib/mongodb';
import { useSession } from 'next-auth/react';
import getDbCollection from '../../../../lib/getCollection';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import { UserRolesEnum } from '../../../types/users';
import { getDomainsList } from '../../../../lib/users';
// import { getDbCollection } from './api/services/beers';

interface BeerPageProps {
    beersList?: BeerData[],
    isLoading?: boolean,
    error?: any;
    domainsList?: any[];
}

export const getServerSideProps: GetServerSideProps<BeerPageProps> = async (context) => {
    // console.log("🚀 ~ file: index.tsx:23 ~ constgetServerSideProps:GetServerSideProps<BeerPageProps>= ~ context:", context);

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
        if (userRole === UserRolesEnum.Admin) {
            const domainsList = await getDomainsList();
            const beersList = await getBeersAsync();
            return {
                props: {
                    beersList: JSON.parse(JSON.stringify(beersList)),
                    domainsList
                },
            };
        }
        const beersList = await getDomainBeers(domain!);
        return {
            props: {
                beersList,
                // isLoading
            },
        };
    } catch (error: any) {
        toast.error('Error fetching beer data');
        // setIsLoading(false);
        return {
            props: {
                error: 'Error getting beer data'
            }
        };
        // throw new Error(error).message;
    }
};

type Props = {};

const Page = ({ beersList, isLoading, error, domainsList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // console.log("🚀 ~ file: dashboard.tsx:76 ~ Page ~ beersList:", beersList);

    const session = useSession();
    console.log("🚀 ~ file: index.tsx:49 ~ Page ~ session:", session);

    //  Client Side data fetching
    // const [beersList, setBeersList] = useState<BeerData[] | null>(null);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const fetchAllBeers = async () => {
    //         try {
    //             // setIsLoading(true);
    //             const beerRes = await getAllBeers();
    //             console.log("🚀 ~ file: dashboard.tsx:25 ~ fetchAllBeers ~ beerRes", beerRes);
    //             if (beerRes.data) {
    //                 setBeersList(beerRes.data);
    //                 // setIsLoading(false);
    //             }
    //         } catch (error: any) {
    //             console.log("🚀 ~ file: dashboard.tsx:35 ~ fetchAllBeers ~ error", error);
    //             toast.error('Error fetching beer data');
    //             // setIsLoading(false);
    //             throw new Error(error).message;
    //         }
    //     };
    //     fetchAllBeers();
    // }, []);

    if (error) {
        console.log("🚀 ~ file: dashboard.tsx:79 ~ Page ~ error", error);
        toast.error('There was an error fetching the beer data');
    }


    const TableTitle = () =>
        <TableHeader
            title={'Beers'}
            buttonPath={'/dashboard/beers/new'}
            buttonText={'Create New'}
            buttonIcon={<IoAddOutline
                style={{
                    fontSize: '19px',
                    position: 'relative',
                    top: '4px'
                }}
            // If bootstrap globally
            // style={{
            //     fontSize: '19px',
            //     position: 'relative',
            //     bottom: '.8px'
            // }}
            />}
        />;

    return (
        <>
            {/* TODO: Authentication: if logged in, show dashboard, otherwise, home/login page */}
            <Dashboard>
                {beersList &&
                    <BeersTable
                        data={beersList}
                        title={TableTitle}
                        isLoading={false}
                        domains={domainsList}
                    />
                }
                {/* TODO: Add a spinner when loading state */}

            </Dashboard>
            {/* <h2><Link href="/">Back to home</Link></h2> */}
        </>
    );
};

export default Page;