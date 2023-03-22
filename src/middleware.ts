// export { default } from "next-auth/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { getCsrfToken, getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { authOptions } from "./pages/api/auth/[...nextauth]";


export default withAuth(
    // console.log("session:", session);
    // console.log("token:", token);

    // if (!session) {
    //     res.status(401);
    //     return res.end();
    // }

    // const tokentest = await getToken({req})
    // console.log("🚀 ~ file: middleware.ts:19 ~ withAuth ~ tokentest:", tokentest)

    // return await NextResponse.next();
    async function middleware(req, res) {
        console.log("🚀 ~ file: middleware.ts:9 ~ middleware ~ req:", req);
        // console.log("🚀 ~ file: middleware.ts:7 ~ middleware ~ req:", req);
        // // return Nextreponse
        // console.log('middleware nextauth token', req.nextauth.token);
        // // return NextResponse.rewrite(new URL('/dashboard', req.url));
        // const session = await getServerSession(req, res, authOptions);
        // const session = await getServerSession(req);
        // console.log("🚀 ~ file: middleware.ts:7 ~ middleware ~ session:", session);
        // if (session) {
        //     // console.log("User token:", session.accessToken);
        //     // Your middleware logic goes here
        //     return NextResponse.next();
        // } else {
        //     return NextResponse.redirect("/api/auth/signin");
        // }
    },
    {
        callbacks: {
            authorized: async ({ token, req }) => {
                const session = await getSession();
                console.log("🚀 ~ file: middleware.ts:29 ~ authorized: ~ session:", session);
                // const serversesh = await getServerSession(req, authOptions);
                // console.log("🚀 ~ file: middleware.ts:46 ~ authorized: ~ serversesh:", serversesh);
                // const test = await getCsrfToken();
                // console.log("🚀 ~ file: middleware.ts:17 ~ test:", test);
                const texttoken = await getToken({ req });
                console.log("🚀 ~ file: middleware.ts:48 ~ authorized: ~ texttoken:", texttoken);
                console.log("🚀 ~ file: middleware.ts:16 ~ req.cookies:", req);
                const cookie = req.cookies.get("next-auth.csrf-token");
                console.log("🚀 ~ file: middleware.ts:17 ~ cookie:", cookie);
                // console.log("🚀 ~ file: middleware.ts:17 ~ token:", token);
                if (token) { return true; }
                // return !!session;
                // else 
                // if (req.cookies) return true;
                return false;
            },
        }
    }

);
export const config = { matcher: ["/dashboard", "/dashboard/:path*"] };