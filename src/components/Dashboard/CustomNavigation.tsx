import { Divider, Menu, Tooltip } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IoBeerOutline, IoPeopleOutline } from 'react-icons/io5';
import { TbTruckDelivery, TbFileInvoice } from 'react-icons/tb';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { GiHops } from 'react-icons/gi';
import { AiOutlineProfile, AiOutlineUser } from 'react-icons/ai';
import styles from './styles.module.scss';
import Link from 'next/link';
import { ItemType, MenuItemGroupType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { IconBaseProps } from 'react-icons';
import { useSession } from 'next-auth/react';
import { UserRolesEnum } from '../../types/users';


type Props = {};

// interface CustomMenuItems /* extends MenuItemType */ {
//     key: string;
//     label: JSX.Element | string,
//     icon: React.FunctionComponentElement<IconBaseProps>,
//     ishidden?: boolean;
// }

// interface CustomMenuItemsMap {
//     [key: string]: CustomMenuItems;
// }

interface MenuItemWithHidden extends MenuProps {
    ishidden: string;
}

type ItemTypeWithHidden = ItemType & { ishidden?: string; };

const CustomNavigation = (props: Props) => {
    const router = useRouter();
    const { pathname } = router;
    // console.log("🚀 ~ file: CustomNavigation.tsx:15 ~ CustomNavigation ~ pathname", pathname);

    const { data } = useSession();
    const userRole = data?.user?.role;

    const BASE_DASHBOARD_PATH = "/dashboard";

    // const navigationItems: CustomMenuItemsMap = [
    const navigationItems: ItemTypeWithHidden[] = [
        {
            key: `${BASE_DASHBOARD_PATH}/beers`,
            label: (<Link href={`${BASE_DASHBOARD_PATH}/beers`}>Beers</Link>),
            // icon: <IoBeerOutline />,
            icon: React.createElement(IoBeerOutline),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/products`,
            label: (<Link href={`${BASE_DASHBOARD_PATH}/products`}>Ingredients/Products</Link>),
            icon: React.createElement(GiHops),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/clients`,
            label: (<Link href={`${BASE_DASHBOARD_PATH}/clients`}>Clients</Link>),
            // label: 'Clients',
            icon: React.createElement(IoPeopleOutline),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/deliveries`,
            // label: 'Deliveries',
            label: (<Link href={`${BASE_DASHBOARD_PATH}/deliveries`}>Deliveries</Link>),
            icon: React.createElement(TbTruckDelivery),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/users`,
            label: (<Link href={`${BASE_DASHBOARD_PATH}/users`}>Users</Link>),
            // icon: <IoBeerOutline />,
            icon: React.createElement(AiOutlineUser),
            ishidden: userRole === UserRolesEnum.BUser ? 'true' : undefined,
        },
        {
            key: `${BASE_DASHBOARD_PATH}/recipes`,
            label: (<Tooltip color={'blue'} title='Coming soon!' placement='right'>
                <Link href={`${BASE_DASHBOARD_PATH}/recipes`}>Recipes</Link>
            </Tooltip>),
            // icon: <IoBeerOutline />,
            icon: React.createElement(AiOutlineProfile),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/orders`,
            label: (<Tooltip color={'blue'} title='Coming soon!' placement='right'>Orders</Tooltip>),
            // label: (<Link href={`${BASE_DASHBOARD_PATH}/orders`}>Orders</Link>),
            icon: React.createElement(MdOutlineProductionQuantityLimits),
        },
        {
            key: `${BASE_DASHBOARD_PATH}/invoices`,
            // label: (<Link href={`${BASE_DASHBOARD_PATH}/invoices`}>Invoices</Link>),
            label: (<Tooltip color={'blue'} title='Coming soon!' placement='right'>Invoices</Tooltip>),
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
                items={navigationItems.filter((item, index) => item.ishidden === undefined)}
            />
        </div>
    );
};

export default CustomNavigation;