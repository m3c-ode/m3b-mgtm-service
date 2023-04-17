import { DefaultSession, DefaultUser, DefaultJWT } from 'next-auth';
declare module 'next-auth' {
    interface Session {
        user?: DefaultSession & { role: string; domain?: string; email?: string; id?: string; };
    }
    interface User extends DefaultUser {
        role: string;
        domain?: string;
        email?: string;
        id?: string;
    }

    // interface JWT /* extends DefaultJWT */ {
    //     role: string | null;
    //     domain?: string | null;
    // }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        role: string;
        domain?: string;
    }
}