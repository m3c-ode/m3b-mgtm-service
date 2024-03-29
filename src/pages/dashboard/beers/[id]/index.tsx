import { Form } from 'antd';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import React from 'react';
import { getBeerData, getDbBeersId } from '../../../../../lib/beers';
import EditBeerForm from '../../../../components/Forms/Beer/EditBeerForm';
import type { BeerData } from '../../../../types/beers';

interface EditBeerPageProps {
    beerData?: BeerData;
}

// Generates `/beers/1` and `/beers/2` - used only with SSG
// export const getStaticPaths: GetStaticPaths = async () => {
//     const paths = await getDbBeersId();
//     return {
//         paths,
//         // TODO: double check this
//         fallback: true,
//     };
// };

// `getStaticPaths` requires using `getStaticProps`
export const getServerSideProps: GetServerSideProps<EditBeerPageProps> = async (context) => {
    try {
        // console.log("🚀 ~ file: [id].tsx:18 ~ context", context);
        const beerId = context.params!.id as string;;
        const beerData = await getBeerData(beerId);
        return {
            // Passed to the page component as props
            props: { beerData },
        };

    } catch (error) {
        console.log('error fetching in beers/id', error);
        return {
            props: {
                beerData: undefined,
                error: 'Error fetching in beers/id'
            },

        };
    }
};

type Props = {
    beerData?: BeerData,
};

const Beer = ({ beerData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            {beerData &&
                <EditBeerForm
                    data={beerData}
                />
            }
        </>
    );
};

export default Beer;