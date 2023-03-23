// export { default } from "next-auth/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { getCsrfToken, getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { authOptions } from "./pages/api/auth/[...nextauth]";


export default withAuth(
    async function middleware(req, res) {
        // console.log("🚀 ~ file: middleware.ts:9 ~ middleware ~ req:", req);
        // // return Nextreponse
        // console.log('middleware nextauth token', req.nextauth.token);
        // // return NextResponse.rewrite(new URL('/dashboard', req.url));
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
                // const testToken = await getToken({ req });
                // console.log("🚀 ~ file: middleware.ts:48 ~ authorized: ~ texttoken:", testToken);
                // console.log("🚀 ~ file: middleware.ts:16 ~ req.cookies:", req);
                // const cookie = req.cookies.get("next-auth.csrf-token");
                // console.log("🚀 ~ file: middleware.ts:17 ~ cookie:", cookie);
                console.log("🚀 ~ file: middleware.ts:17 ~ token:", token);
                if (token) { return true; }
                return false;
            },
        }
    }

);
export const config = { matcher: ["/dashboard", "/dashboard/:path*"] };