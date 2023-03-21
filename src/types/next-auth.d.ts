// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//     interface Session {
//         id: string;
//         role: string;
//         domain?: string;
//     }

//     interface User {
//         id: string;
//         role: string;
//         domain?: string;

//     }
// }

// declare module "next-auth/jwt" {
//     interface JWT {
//         id: string;
//         role: string;
//         domain?: string;

//     }
// }

import { DefaultSession, DefaultUser, DefaultJWT } from 'next-auth';
declare module 'next-auth' {
    interface Session {
        user?: DefaultSession & { role: string; domain?: string; email?: string; };
    }
    interface User extends DefaultUser {
        role: string;
        domain?: string;
        email?: string;
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