import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import BeersTable from '../components/Tables/BeersTable';
import TableHeader from '../components/Tables/TableHeader';
import { BeerData, BeersStatusEnum, BeersStylesEnum } from '../types/beers';
import { IoAddOutline } from 'react-icons/io5';
import { getAllBeers } from './api/services';
import toast from 'react-hot-toast';

interface BeerPageProps {
    beersList?: BeerData[],
    isLoading?: boolean,
    error?: any;
}

export const getStaticProps: GetStaticProps<BeerPageProps> = async (context) => {
    // const [isLoading, setIsLoading] = useState(true);
    const env = process.env.NODE_ENV;
    console.log("🚀 ~ file: dashboard.tsx:21 ~ constgetStaticProps:GetStaticProps<BeerPageProps>= ~ env", env);
    console.log('entering getstaic props');
    try {
        // setIsLoading(true);
        const beerRes = await getAllBeers();
        // console.log("🚀 ~ file: dashboard.tsx:25 ~ fetchAllBeers ~ beerRes", beerRes);
        const beersList = beerRes.data;
        // if (beerRes.data) {
        //     // setBeersList(beerRes.data);
        //     // setIsLoading(false);
        // }
        return {
            props: {
                beersList,
                // isLoading
            },
            revalidate: 60
        };
    } catch (error: any) {
        // console.log("🚀 ~ file: dashboard.tsx:35 ~ fetchAllBeers ~ error", error);
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

const Page = ({ beersList, isLoading, error }: InferGetStaticPropsType<typeof getStaticProps>) => {

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
            buttonPath={'/beers/new'}
            buttonText={'Create New'}
            buttonIcon={<IoAddOutline
                style={{
                    fontSize: '19px',
                    position: 'relative',
                    top: '4px'
                }}
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
                    />
                }
                {/* TODO: Add a spinner when loading state */}

            </Dashboard>
            {/* <h2><Link href="/">Back to home</Link></h2> */}
        </>
    );
};

export default Page;