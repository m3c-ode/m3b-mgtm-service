import { Divider, Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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

    const BASE_DASHBOARD_PATH = "/dashboard";

    const navigationItems: MenuProps['items'] = [
        {
            key: `${BASE_DASHBOARD_PATH}/beers`,
            label: (<Link href={`${BASE_DASHBOARD_PATH}/beers`}>Beers</Link>),
            // icon: <IoBeerOutline />,
            icon: React.createElement(IoBeerOutline),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/recipes`,
            label: (<Link href={`${BASE_DASHBOARD_PATH}/recipes`}>Recipes</Link>),
            // icon: <IoBeerOutline />,
            icon: React.createElement(AiOutlineProfile),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/products`,
            label: (<Link href={`${BASE_DASHBOARD_PATH}/products`}>Ingredients/Products</Link>),
            icon: React.createElement(GiHops),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/clients`,
            // label: (<Link href={`${BASE_DASHBOARD_PATH}/clients`}>Clients</Link>),
            label: 'Clients',
            icon: React.createElement(IoPeopleOutline),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/deliveries`,
            label: 'Deliveries',
            // label: (<Link href={`${BASE_DASHBOARD_PATH}/deliveries`}>Deliveries</Link>),
            icon: React.createElement(TbTruckDelivery),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/orders`,
            label: 'Orders',
            // label: (<Link href={`${BASE_DASHBOARD_PATH}/orders`}>Orders</Link>),
            icon: React.createElement(MdOutlineProductionQuantityLimits),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/invoices`,
            // label: (<Link href={`${BASE_DASHBOARD_PATH}/invoices`}>Invoices</Link>),
            label: 'Invoices',
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
                defaultSelectedKeys={[pathname]}
                style={{ height: '100%', borderRight: 0 }}
                items={navigationItems}
            />
        </div>
    );
};

export default CustomNavigation;