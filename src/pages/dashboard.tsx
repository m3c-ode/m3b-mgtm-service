import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import Dashboard from '../components/Dashboard';
import BeersTable from '../components/Tables/BeersTable';
import TableHeader from '../components/Tables/TableHeader';
import { BeerData, BeersStatusEnum, BeersStylesEnum } from '../types/beers';
import { IoAddOutline } from 'react-icons/io5';
import { beerData } from '../seed';



type Props = {};

const Page: NextPage = (props: Props) => {


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
                <BeersTable
                    data={beerData}
                    title={TableTitle}
                    isLoading={false}
                />

            </Dashboard>
            {/* <h2><Link href="/">Back to home</Link></h2> */}
        </>
    );
};

export default Page;