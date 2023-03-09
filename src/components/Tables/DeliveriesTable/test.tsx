import { Table } from 'antd';

interface Delivery {
    id: number;
    fromAddress: string;
    toAddress: string;
    products?: DeliveryInput[];
}

interface DeliveryInput {
    beer: {
        label: string;
        value: string;
    };
    qty: BeerVolumes;
}

interface BeerVolumes {
    '355ml'?: number;
    '473ml'?: number;
    '650ml'?: number;
    '19Lkegs'?: number;
    '38Lkegs'?: number;
    '57Lkegs'?: number;
    total?: number;
}

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'From Address',
        dataIndex: 'fromAddress',
    },
    {
        title: 'To Address',
        dataIndex: 'toAddress',
    },
    {
        title: 'Products',
        dataIndex: 'products',
        render: (products: DeliveryInput[]) => {
            const productColumns = [
                {
                    title: 'Beer',
                    dataIndex: 'beer.label',
                },
                {
                    title: '355ml',
                    dataIndex: 'qty.355ml',
                },
                {
                    title: '473ml',
                    dataIndex: 'qty.473ml',
                },
                {
                    title: '650ml',
                    dataIndex: 'qty.650ml',
                },
                {
                    title: '19Lkegs',
                    dataIndex: 'qty.19Lkegs',
                },
                {
                    title: '38Lkegs',
                    dataIndex: 'qty.38Lkegs',
                },
                {
                    title: '57Lkegs',
                    dataIndex: 'qty.57Lkegs',
                },
                {
                    title: 'Total',
                    dataIndex: 'qty.total',
                },
            ];

            const productData = products?.map((product) => {
                return {
                    key: product.beer.value,
                    beer: product.beer,
                    qty: product.qty,
                };
            });

            return (
                <Table
                    dataSource={productData}
                    columns={productColumns}
                    pagination={false}
                />
            );
        },
    },
];

const data: Delivery[] = [
    {
        id: 1,
        fromAddress: '123 Main St',
        toAddress: '456 Maple Ave',
        products: [
            {
                beer: {
                    label: 'IPA',
                    value: 'ipa',
                },
                qty: {
                    '355ml': 24,
                    '473ml': 12,
                    '650ml': 0,
                    '19Lkegs': 1,
                    '38Lkegs': 0,
                    '57Lkegs': 0,
                    total: 48,
                },
            },
            {
                beer: {
                    label: 'Stout',
                    value: 'stout',
                },
                qty: {
                    '355ml': 12,
                    '473ml': 0,
                    '650ml': 6,
                    '19Lkegs': 0,
                    '38Lkegs': 1,
                    '57Lkegs': 0,
                    total: 30,
                },
            },
        ],
    },
    {
        id: 2,
        fromAddress: '789 Oak St',
        toAddress: '012 Pine Rd',
        products: [
            {
                beer: {
                    label: 'Pilsner',
                    value: 'pilsner',
                },
                qty: {
                    '355ml': 36,
                    '473ml': 0,
                    '650ml': 0,
                    '19Lkegs': 0,
                    '38Lkegs': 2,
                    '57Lkegs': 0,
                    total: 72,
                },
            },
        ],
    },
];

const DeliveryTable = () => {
    return <Table dataSource={data} columns={columns} expandable={{ expandedRowRender: record => <p>{record.id}</p> }} />;
};

export default DeliveryTable;
