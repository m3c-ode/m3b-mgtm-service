import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { getBeerData, getLocalBeersId } from '../../../../lib/beers';
import { BeerData } from '../../../types/beers';

// Generates `/posts/1` and `/posts/2`
export const getStaticPaths: GetStaticPaths = () => {
    const paths = getLocalBeersId();
    return {
        paths,
        // TODO: double check this

        fallback: false,

    };
};

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps<{ beerData: BeerData; }> = (context) => {
    console.log("🚀 ~ file: [id].tsx:18 ~ context", context);
    const beerId = context.params!.id as string;;
    const beerData = getBeerData(beerId);
    return {
        // Passed to the page component as props
        props: { beerData },
    };
};

type Props = {
    beerData: BeerData,
};

const Beer = ({ beerData }: Props) => {
    // const router = useRouter();
    // console.log('router query', router.query);

    // console.log("🚀 ~ file: [id].tsx:19 ~ Beer ~ params", params);
    return (
        <div>Beer</div>
    );
};

export default Beer;