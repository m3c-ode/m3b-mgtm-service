import { Divider, Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { IoBeerOutline, IoPeopleOutline } from 'react-icons/io5';
import { TbTruckDelivery, TbFileInvoice } from 'react-icons/tb';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { GiHops } from 'react-icons/gi';
import { AiOutlineProfile } from 'react-icons/ai';
import styles from './styles.module.scss';
import Link from 'next/link';


type Props = {};

const CustomNavigation = (props: Props) => {
    const router = useRouter();
    const { pathname } = router;
    console.log("🚀 ~ file: CustomNavigation.tsx:15 ~ CustomNavigation ~ pathname", pathname);

    const navigationItems: MenuProps['items'] = [
        {
            key: 1,
            label: (<Link href={`/dashboard`}>Beers</Link>),
            // icon: <IoBeerOutline />,
            icon: React.createElement(IoBeerOutline),
        },
        {
            key: 7,
            label: (<Link href={`/dashboard`}>Recipes</Link>),
            // icon: <IoBeerOutline />,
            icon: React.createElement(AiOutlineProfile),
        },
        {
            key: 4,
            label: (<Link href={`/products`}>Ingredients/Products</Link>),
            icon: React.createElement(GiHops),
        },
        {
            key: 6,
            label: (<Link href={`/clients`}>Clients</Link>),
            icon: React.createElement(IoPeopleOutline),
        },
        {
            key: 2,
            // label: 'Deliveries',
            label: (<Link href={`/deliveries`}>Deliveries</Link>),
            icon: React.createElement(TbTruckDelivery),
        },
        {
            key: 3,
            label: (<Link href={`/orders`}>Orders</Link>),
            icon: React.createElement(MdOutlineProductionQuantityLimits),
        },
        {
            key: 5,
            label: (<Link href={`/invoices`}>Invoices</Link>),
            icon: React.createElement(TbFileInvoice),
        },

    ];
    // TODO: adjust items with pathname/queryparam?
    return (
        <div className={styles.sideNav}>
            <p className={styles.sideNavTitle}>Navigation</p>
            <Divider style={{
                width: '80%', minWidth: '80%',
                margin: '12px auto',

            }} />
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                items={navigationItems}
            />
        </div>
    );
};

export default CustomNavigation;