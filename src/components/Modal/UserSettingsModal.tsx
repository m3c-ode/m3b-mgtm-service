import { Modal } from 'antd';
import { stat } from 'fs';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { fetchUserInfo } from '../../pages/api/services';
import { useUserStore } from '../../stores/user';
import { UserData } from '../../types/users';
import EditUserForm from '../Forms/Users/EditUserForm';

type Props = {
    isVisible: boolean;
    setIsVisible: (bool: boolean) => void;
};

const UserSettingsModal = ({ isVisible, setIsVisible }: Props) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const { userInfo, setUserInfo } = useUserStore((state) => ({ userInfo: state.userInfo, setUserInfo: state.setUserInfo }));
    // console.log("🚀 ~ file: UserSettingsModal.tsx:18 ~ UserSettingsModal ~ userInfo:", userInfo);

    const { status, data } = useSession();
    const getUserInfo = async (id: string) => {
        try {
            const user = await fetchUserInfo(id);
            console.log("🚀 ~ file: UserSettingsModal.tsx:29 ~ useEffect ~ user:", user);
        } catch (error) {

        }

    };

    // if (status === 'authenticated') {
    //     const user = await getUserInfo(data?.user?.id!)
    // }

    const [userData, setUserData] = useState<UserData | null>(userInfo);

    // useEffect(() => {
    //     //   fetch user info if it comes in null
    //     const getUserInfo = async () => {
    //         try {
    //             const user = await fetchUserInfo(data?.user?.id!);
    //             console.log("🚀 ~ file: UserSettingsModal.tsx:29 ~ useEffect ~ user:", user);
    //         } catch (error) {

    //         }

    //     };
    //     if (!userInfo) {
    //         getUserInfo();
    //     };

    // }, [data]);


    const handleOk = () => {
        setIsVisible(false);
    };

    const handleCancel = () => {
        setIsVisible(false);
    };
    return (
        <Modal title="User Settings" open={isVisible} onOk={handleOk} onCancel={handleCancel}>
            <EditUserForm data={userInfo!} />
        </Modal>
    );
};

export default UserSettingsModal;