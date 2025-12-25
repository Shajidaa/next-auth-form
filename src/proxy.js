import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/profile", "/secret"];
const adminRoutes = ["/dashboard"];
export async function proxy(req) {
  console.log(req);

  const token = await getToken({ req });
  const reqPath = req.nextUrl.pathname;

  const isAuthenticated = Boolean(token);

  const isUser = token?.role === "user";
  const isAdmin = token?.role === "admin";

  const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));
  const isAdminRoutes = adminRoutes.some((route) => reqPath.startsWith(route));
  //logic for private route
  if (!isAuthenticated && isPrivate) {
    // const loginUrl = new URL("/login", req.url);
    const loginUrl = new URL("/api/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }

  //admin
  if (isAuthenticated && !isAdmin && isAdminRoutes) {
    // return NextResponse.redirect(new URL("/forbidden", req.url));
    return NextResponse.rewrite(new URL("/forbidden", req.url));
  }

  //   return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/secret"],
};
// http://localhost:3000/login?callbackUrl=%2Fprofile
