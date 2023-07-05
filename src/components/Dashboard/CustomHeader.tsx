import React, { useState } from 'react';
import { Button, Dropdown, Layout, Menu, MenuProps, Modal, Tooltip, Grid } from 'antd';
import Image from 'next/image';
import styles from './styles.module.scss';
import { AiOutlineMenu, AiOutlineSetting, AiOutlineBell, AiOutlineUserSwitch, AiOutlineUser } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { signOut, useSession } from 'next-auth/react';
import { useUserStore } from '../../stores/user';
import UserSettingsModal from '../Modal';
import { fetchUserInfo } from '../../pages/api/services';


const { Header } = Layout;
const { useBreakpoint } = Grid;

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
            }

        )
    },
];

const CustomHeader = (props: Props) => {

    const { userInfo, setUserInfo } = useUserStore((state) => ({ userInfo: state.userInfo, setUserInfo: state.setUserInfo }));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data } = useSession();
    // if (session.data) {
    //     const { user: { email } = {} } = session?.data ?? {}
    // }

    const { sm } = useBreakpoint();

    const showModal = async (props: Props) => {
        // if (!userInfo) {
        try {
            const userRes = await fetchUserInfo(data?.user?.id!);
            if (userRes.status === 200) {
                setUserInfo(userRes.data);
            }
            return setIsModalOpen(true);
        } catch (error) {
            console.log("🚀 ~ file: CustomHeader.tsx:71 ~ showModal ~ error:", error);
            return setIsModalOpen(true);
        }
        // }
        // setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const email = data?.user?.email;

    const emailDisplay = sm ? (
        // Render email text directly on larger screens
        <div className={styles.emailText}>{email}</div>
    ) : (
        // Render email text on small screens
        <Tooltip title={email} color="blue">
            <div className={styles.emailText}>{email}</div>
        </Tooltip>
    );

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
                <Tooltip
                    color={'blue'}
                    title="Check your user settings"
                >
                    <AiOutlineSetting
                        style={{
                            fontSize: '2rem',
                            color: 'white',
                            padding: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={showModal}
                    />
                </Tooltip>
            </div>
            <div className={styles.topRight}>
                {/* TODO: add a search bar feature? */}
                <div className={styles.emailContainer}>
                    {emailDisplay}
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
                    {sm ? 'Logout' : ''}
                </Button>
            </div>
            <UserSettingsModal isVisible={isModalOpen} setIsVisible={setIsModalOpen} />
        </Header>
    );
};

export default CustomHeader;