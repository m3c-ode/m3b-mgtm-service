import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import Dashboard from '../components/Dashboard';

type Props = {};

const Page: NextPage = (props: Props) => {
    return (
        <>
            <Dashboard />
            {/* <h2><Link href="/">Back to home</Link></h2> */}
        </>
    );
};

export default Page;