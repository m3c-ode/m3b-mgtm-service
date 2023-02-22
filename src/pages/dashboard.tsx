import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import BeersTable from '../components/Tables/BeersTable';
import TableHeader from '../components/Tables/TableHeader';
import type { BeerData } from '../types/beers';
import { IoAddOutline } from 'react-icons/io5';
import { getAllBeers } from './api/services';
import toast from 'react-hot-toast';
import { getBeersAsync } from '../../lib/beers';
import clientPromise from '../../lib/mongodb';
// import { getDbCollection } from './api/services/beers';

interface BeerPageProps {
    beersList?: BeerData[],
    isLoading?: boolean,
    error?: any;
}

export const getServerSideProps: GetServerSideProps<BeerPageProps> = async (context) => {

    // }

    // TODO: Try getStatic with a short revalidate?
    // export const getStaticProps: GetStaticProps<BeerPageProps> = async (context) => {
    // console.log("🚀 ~ file: dashboard.tsx:20 ~ constgetStaticProps:GetStaticProps<BeerPageProps>= ~ context", context);
    // const [isLoading, setIsLoading] = useState(true);
    // const env = process.env.NODE_ENV;
    // console.log("🚀 ~ file: dashboard.tsx:21 ~ constgetStaticProps:GetStaticProps<BeerPageProps>= ~ env", env);
    console.log('entering getstatic props');
    try {
        // setIsLoading(true);
        // const beerRes = await getAllBeers();
        // console.log("🚀 ~ file: dashboard.tsx:25 ~ fetchAllBeers ~ beerRes", beerRes);

        const beersList = await getBeersAsync();
        // console.log("🚀 ~ file: dashboard.tsx:31 ~ constgetStaticProps:GetStaticProps<BeerPageProps>= ~ beersList", beersList);

        // const beersList = beerRes.data;
        // if (beerRes.data) {
        //     // setBeersList(beerRes.data);
        //     // setIsLoading(false);
        // }

        // const client = await clientPromise;
        // // creates and use a db called "test"
        // const db = client.db();
        // const collection = db.collection('beers');
        // // const collection = await getDbCollection('beers');
        // const beersList = await collection.find({}).toArray() as unknown as BeerData[];


        return {
            props: {
                beersList: JSON.parse(JSON.stringify(beersList)),
                // isLoading
            },
            revalidate: 5
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

// const Page = ({ beersList, isLoading, error }: InferGetStaticPropsType<typeof getStaticProps>) => {
const Page = ({ beersList, isLoading, error }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log("🚀 ~ file: dashboard.tsx:76 ~ Page ~ beersList:", beersList);

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