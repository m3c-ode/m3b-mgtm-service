import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import getDbCollection from "../../../../lib/getCollection";
import { UserData, UserRolesEnum } from "../../../types/users";
import { useUserStore } from "../../../stores/user";
import { JWT } from "next-auth/jwt";
import { redirect } from "next/dist/server/api-utils";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    // Maybe include other authentication providers
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "user@example.ca" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // We will check against the DB see if the user's exist.
                const collection = await getDbCollection("users");
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                // HASH password case - do not do it if admin
                try {
                    // const user = await collection.findOne({ $and: [{ email: credentials?.email }, { pwd: credentials?.password }] }) as unknown as UserData;
                    const user = await collection.findOne({ email: credentials?.email }) as unknown as UserData;
                    console.log("🚀 ~ file: [...nextauth].ts:38 ~ authorize ~ user:", user);

                    if (!user) {
                        // Retuning null will display an error to the user. Can also return an Error.
                        throw new Error("Invalid Login - No user found with this email");
                        // return null;
                    }

                    if (user.role === UserRolesEnum.Admin || user.domain === 'm3beer') {
                        if (credentials?.password === user.pwd) {
                            return {
                                id: user?._id as string,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                domain: user.domain
                            };
                        }
                        else return null;
                    }

                    const checkedPwd = compare(credentials?.password!, user.pwd!);

                    if (!checkedPwd) {
                        throw new Error("Invalid Login - Password does not match. Please contact your administrator");
                        // return null;
                    }
                    return {
                        id: user?._id as string,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        domain: user.domain
                        // ...user
                    };

                } catch (error) {
                    console.log("🚀 ~ file: [...nextauth].ts:58 ~ authorize ~ error:", error);
                    // throw new Error("Invalid Login");
                    return null;
                }
            },
        })
    ],
    session: {
        strategy: 'jwt'
    },
    jwt: {
        maxAge: 60 * 60 * 24, //1 day, 24h
    },
    callbacks: {
        async jwt({ token, user }/* : { token: JWT, user?: any | UserData; } */) {
            // update token
            if (user?.role) {
                token.role = user.role;
            }
            if (user?.domain) {
                token.domain = user.domain;
            }
            // return final token
            return token;
        },
        async session({ session, token, user }/* : { session: any, token: JWT, user: any; } */) {
            // session.user = session.user ?? {};
            if (token.role && session.user) (session.user.role = token.role);
            if (token.domain && session.user) session.user.domain = token.domain;
            if (token.sub && session.user) session.user.id = token.sub;
            return session;
        },

        // async redirect({ url, baseUrl }) {
        //     return baseUrl + '/dashboard/beers';
        // },
    },
    secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
