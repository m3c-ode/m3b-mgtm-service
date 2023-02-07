import { Divider, Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { IoBeerOutline } from 'react-icons/io5';
import { TbTruckDelivery, TbFileInvoice } from 'react-icons/tb';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { GiHops } from 'react-icons/gi';
import styles from './styles.module.scss';

type Props = {};

const CustomNavigation = (props: Props) => {
    const router = useRouter();
    const { pathname } = router;
    console.log("🚀 ~ file: CustomNavigation.tsx:15 ~ CustomNavigation ~ pathname", pathname);

    const navigationItems: MenuProps['items'] = [
        {
            key: 1,
            label: 'Beers',
            // icon: <IoBeerOutline />,
            icon: React.createElement(IoBeerOutline),
        },
        {
            key: 2,
            label: 'Delivery',
            // icon: <IoBeerOutline />,
            icon: React.createElement(TbTruckDelivery),
        },
        {
            key: 3,
            label: 'Orders',
            // icon: <IoBeerOutline />,
            icon: React.createElement(MdOutlineProductionQuantityLimits),
        },
        {
            key: 4,
            label: 'Ingredients/Products',
            // icon: <IoBeerOutline />,
            icon: React.createElement(GiHops),
        },
        {
            key: 5,
            label: 'Invoices',
            // icon: <IoBeerOutline />,
            icon: React.createElement(TbFileInvoice),
        },

    ];

    return (
        <div>
            <p className={styles.NavTitle}>Navigation</p>
            <Divider style={{
                width: '80%', minWidth: '80%', textAlign: 'center', justifyContent: 'center', alignItems: 'center',
                justifyItems: 'center',
                justifySelf: 'center',
                alignSelf: 'center',
                alignContent: 'center',
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