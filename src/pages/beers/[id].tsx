import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
    params: any;
};

const Beer = ({ params }: Props) => {
    const router = useRouter();

    console.log('router query', router.query);

    console.log("🚀 ~ file: [id].tsx:19 ~ Beer ~ params", params);
    return (
        <div>Beer {params}</div>
    );
};

export default Beer;