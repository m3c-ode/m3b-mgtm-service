import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
// import { UsersTableData } from '../components/Tables/UsersTable/types';
import { UserData } from '../types/users';

interface DomainState {
    // usersList: UsersTableData[];
    domainsList: string[] | null;
    setDomainsList: (data: string[]) => void;
}

export const useDomainStore = create<DomainState>()(
    persist(
        set => ({
            domainsList: null,
            setDomainsList: data => set(() => ({ domainsList: data })),
        }),
        {
            name: 'domainsList',
            // getStorage: () => sessionStorage,
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);