import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserData } from '../types/users';

interface UsersState {
    userInfo: UserData | null;
    setUserInfo: (data: UserData) => void;
}

export const useUserStore = create<UsersState>()(
    persist(
        set => ({
            userInfo: null,
            setUserInfo: data => set(() => ({ userInfo: data })),
        }),
        {
            name: 'userData',
            getStorage: () => sessionStorage,
        }
    )
);