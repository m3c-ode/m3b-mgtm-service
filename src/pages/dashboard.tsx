import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import Dashboard from '../components/Dashboard';
import BeersTable from '../components/Tables/BeersTable';
import TableHeader from '../components/Tables/TableHeader';
import { BeerData, BeersStatusEnum, BeersStylesEnum } from '../types/beers';
import { IoAddOutline } from 'react-icons/io5';



type Props = {};

const Page: NextPage = (props: Props) => {

    const beerData: BeerData[] = [
        {
            id: '1',
            style: BeersStylesEnum.Lager,
            brewedOn: '2020-01-01',
            availableOn: '2020-01-14',
            status: BeersStatusEnum.Ready,
            qty: {
                total: 1000
            }
        },
        {
            id: '2',
            style: BeersStylesEnum.PaleAle,
            brewedOn: '2020-01-01',
            availableOn: '2020-01-14',
            status: BeersStatusEnum.Fermenting,
            qty: {
                total: 2000
            }
        },
        {
            id: '3',
            style: BeersStylesEnum.Stout,
            brewedOn: '2020-01-01',
            availableOn: '2020-01-14',
            status: BeersStatusEnum.Conditioning,
            qty: {
                total: 1000
            }
        },
    ];

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