import React from 'react';
import { Dropdown, Layout, Menu, MenuProps } from 'antd';
import Image from 'next/image';
import styles from './styles.module.scss';
import { AiOutlineMenu, AiOutlineSetting, AiOutlineBell, AiOutlineUserSwitch, AiOutlineUser } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';



const { Header } = Layout;

type Props = {};

const menuItems: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const topRightItems: MenuProps['items'] = [
    {
        key: '1',
        icon: <AiOutlineUser />,
        label: 'Profile',
    },
    {
        key: '2',
        icon: <AiOutlineUserSwitch />,
        label: 'Switch Accounts',
    },
    {
        key: '3',
        icon: <MdLogout />,
        label: 'Logout',
    },
];

const CustomHeader = (props: Props) => {
    return (
        <Header className={styles.header}>
            <div className={styles.topLeft}>

                {/* <div className={styles.logo} /> */}
                {/* <Image src="images/logom3b" /> */}
                <Image
                    className={styles.logo}
                    src={'/../public/images/logom3b.png'}
                    alt='comp. logo'
                    width={40}
                    height={40}
                />
                {/* TODO: Button with a modal pop-up? */}
                <AiOutlineSetting
                    style={{
                        fontSize: '2rem',
                        color: 'white',
                        padding: '5px',
                        cursor: 'pointer',
                    }}
                />
            </div>
            <div className={styles.topRight}>
                {/* TODO: add a search bar? */}
                <div className={styles.userName}>
                    user@example.ca
                </div>
                <AiOutlineBell
                    style={{
                        color: 'white',
                        fontSize: '2rem',
                        padding: '5px',
                        cursor: 'pointer',
                    }}
                />
                <Menu
                    style={{ display: 'flex', flexDirection: 'row', maxWidth: '40px' }}

                    overflowedIndicator={<AiOutlineMenu style={{
                        fontSize: '1.5rem',
                        top: '5px',
                        position: 'relative',
                    }} />}
                    theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={topRightItems} />
            </div>
        </Header>
    );
};

export default CustomHeader;