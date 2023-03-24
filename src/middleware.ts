import { withAuth } from "next-auth/middleware";


export default withAuth(
    async function middleware(req, res) {
    },
    {
        callbacks: {
            authorized: async ({ token, req }) => {
                if (token) { return true; }
                return false;
                // return true;
            },
        }
    }

);
export const config = { matcher: ["/dashboard", "/dashboard/:path*"] };