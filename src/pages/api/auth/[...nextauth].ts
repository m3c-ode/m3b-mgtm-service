import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import getDbCollection from "../../../../lib/getCollection";
import { UserData } from "../../../types/users";
import { useUserStore } from "../../../stores/user";
import { JWT } from "next-auth/jwt";
import { redirect } from "next/dist/server/api-utils";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // ...add more providers here
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "user@example.ca" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // const setUserInfo = useUserStore(state => state.setUserInfo);
                console.log("🚀 ~ file: [...nextauth].ts:25 ~ authorize ~ credentials:", credentials);

                // Add logic here to look up the user from the credentials supplied. We will check against the DB see if the user's exist.
                const collection = await getDbCollection("users");
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                try {
                    const user = await collection.findOne({ $and: [{ email: credentials?.email }, { pwd: credentials?.password }] }) as UserData;
                    console.log("🚀 ~ file: [...nextauth].ts:38 ~ authorize ~ user:", user);

                    if (!user
                        // || user.pwd !== credentials?.password
                    ) {
                        // If you return null then an error will be displayed advising the user to check their details.
                        throw new Error("Invalid Login");
                        // return null;
                    }
                    // else {
                    // Maybe not needed with session info
                    // setUserInfo(user);
                    // Any object returned will be saved in `user` property of the JWT
                    return {
                        id: user?._id as string,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        domain: user.domain
                        // ...user
                    };

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    // }
                } catch (error) {
                    console.log("🚀 ~ file: [...nextauth].ts:58 ~ authorize ~ error:", error);
                    // throw new Error("Invalid Login");
                    return null;
                }
            },
        })
    ],
    // TODO: try without?
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT, user?: any | UserData; }) {
            // console.log("🚀 ~ file: [...nextauth].ts:78 ~ jwt ~ token:", token);
            // console.log("🚀 ~ file: [...nextauth].ts:78 ~ jwt ~ user:", user);
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
        async session({ session, token, user }: { session: any, token: JWT, user: any; }) {
            if (token.role) (session.user.role = token.role);
            if (token.domain) session.user.domain = token.domain;
            return session;
        },

        // async redirect({ url, baseUrl }) {
        //     return baseUrl + '/dashboard/beers';
        // },
    },
};

export default NextAuth(authOptions);
