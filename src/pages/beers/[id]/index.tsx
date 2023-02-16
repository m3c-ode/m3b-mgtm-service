import { Form } from 'antd';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { getBeerData, getDbBeersId } from '../../../../lib/beers';
import EditBeerForm from '../../../components/Forms/Beer/EditBeerForm';
import type { BeerData } from '../../../types/beers';

// Generates `/beers/1` and `/beers/2`
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getDbBeersId();
    return {
        paths,
        // TODO: double check this

        fallback: false,

    };
};

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps<{ beerData: BeerData; }> = async (context) => {
    console.log("🚀 ~ file: [id].tsx:18 ~ context", context);
    const beerId = context.params!.id as string;;
    const beerData = await getBeerData(beerId);
    return {
        // Passed to the page component as props
        props: { beerData },
    };
};

type Props = {
    beerData: BeerData,
};

const Beer = ({ beerData }: Props) => {
    console.log("🚀 ~ file: index.tsx:36 ~ Beer ~ beerData", beerData);

    // const [form] = Form.useForm();
    // const router = useRouter();
    // console.log('router query', router.query);

    // extract data

    // console.log("🚀 ~ file: [id].tsx:19 ~ Beer ~ params", params);

    // const onFinish = (values:any) => {
    // };

    // const onFinishFailed = (errorInfo:any ) => {
    // };

    return (
        <>
            <EditBeerForm
                data={beerData}
            />
        </>
    );
};

export default Beer;