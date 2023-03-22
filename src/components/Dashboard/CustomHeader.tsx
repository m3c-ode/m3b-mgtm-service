import React from 'react';
import { Button, Dropdown, Layout, Menu, MenuProps, Tooltip } from 'antd';
import Image from 'next/image';
import styles from './styles.module.scss';
import { AiOutlineMenu, AiOutlineSetting, AiOutlineBell, AiOutlineUserSwitch, AiOutlineUser } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { signOut, useSession } from 'next-auth/react';



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
        onClick: () => signOut(
            {
                callbackUrl: '/api/auth/signin?callbackUrl=/dashboard/beers'
                // callbackUrl: `http://localhost:3000/api/auth/signin`
                // callbackUrl: `${window.location.origin}`
                // callbackUrl: 'credentials'
            }

        )
    },
];

const CustomHeader = (props: Props) => {

    // const { data: { user: { email } = {} } = {} } = useSession() || {};
    // const { data: { user: { email } = {} } = {} } = useSession() || {};

    const { data } = useSession();
    // if (session.data) {
    //     const { user: { email } = {} } = session?.data ?? {}
    // }

    const email = data?.user?.email;

    return (
        <Header className={styles.header}>
            <div className={styles.topLeft}>
                <Image
                    className={styles.logo}
                    src={'/images/logom3b.png'}
                    alt='comp. logo'
                    width={40}
                    height={40}
                />
                {/* TODO: Button with a modal pop-up for settings edit */}
                <Tooltip
                    color={'blue'}
                    title="Will pop-up a modal with current settings"
                >
                    <AiOutlineSetting
                        style={{
                            fontSize: '2rem',
                            color: 'white',
                            padding: '5px',
                            cursor: 'pointer',
                        }}
                    />
                </Tooltip>
            </div>
            <div className={styles.topRight}>
                {/* TODO: add a search bar feature? */}
                <div className={styles.userName}>
                    {email}
                </div>
                <Tooltip
                    title='Shows notifications'
                    color={'blue'}
                >

                    <AiOutlineBell
                        style={{
                            color: 'white',
                            fontSize: '2rem',
                            padding: '5px',
                            cursor: 'pointer',
                        }}
                    />
                </Tooltip>
                {/* <Menu
                    style={{ display: 'flex', flexDirection: 'row', maxWidth: '40px' }}
                    overflowedIndicator={<AiOutlineMenu style={{
                        fontSize: '1.5rem',
                        top: '5px',
                        position: 'relative',
                    }} />}
                    theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={topRightItems}
                /> */}
                {/* Replacing Menu for the logout button for now */}
                <Button
                    icon={<MdLogout />}
                    type={'primary'}
                    onClick={() => signOut(
                        {
                            callbackUrl: '/api/auth/signin?callbackUrl=/dashboard/beers'
                        })}
                >
                    Logout
                </Button>
            </div>
        </Header>
    );
};

export default CustomHeader;