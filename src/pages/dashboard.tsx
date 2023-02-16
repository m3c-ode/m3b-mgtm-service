import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import BeersTable from '../components/Tables/BeersTable';
import TableHeader from '../components/Tables/TableHeader';
import { BeerData, BeersStatusEnum, BeersStylesEnum } from '../types/beers';
import { IoAddOutline } from 'react-icons/io5';
// import { beerData } from '../seed';
import axios from 'axios';
import { getAllBeers } from './api/services';



type Props = {};

const Page: NextPage = (props: Props) => {

    // console.log("🚀 ~ file: dashboard.tsx:10 ~ beerData", beerData);
    const [beerList, setBeerList] = useState<BeerData[] | null>(null);

    useEffect(() => {
        const fetchAllBeers = async () => {
            try {
                const beerRes = await getAllBeers();
                console.log("🚀 ~ file: dashboard.tsx:25 ~ fetchAllBeers ~ beerRes", beerRes);
                setBeerList(beerRes.data);
            } catch (error) {

            }
        };
        fetchAllBeers();
    }, []);


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
                {beerList &&
                    <BeersTable
                        data={beerList}
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