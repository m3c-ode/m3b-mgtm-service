import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        id: string;
        role: string;
        domain: string;
    }

    interface User {
        id: string;
        role: string;
        domain: string;

    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
        domain: string;

    }
}

// import { DefaultUser } from 'next-auth';
// declare module 'next-auth' {
//     interface Session {
//         user?: DefaultUser & { role: string; domain: string; };
//     }
//     interface User extends DefaultUser {
//         role: string;
//         domain: string;
//     }
// }
