import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "./utils/common";
import jwt from "@tsndr/cloudflare-worker-jwt";

const isAdminRoute = (pathname) => {
  return pathname.startsWith("/api/admin");
};

const isUserRoute = (pathname) => {
  return pathname.startsWith("/api/users");
};
export function middleware(req) {
  if (typeof req.headers.get("Authorization") !== "string") {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
    // return;
  }
  const tokenBearer = req.headers.get("Authorization");
  const token = tokenBearer?.split(" ")[1];
  const { payload } = jwt?.decode(token);
  console.log("tokenBearer", tokenBearer);
  console.log("token", token);
  console.log("decode", payload.roles);
  const roles = payload.roles;
  const { pathname } = req.nextUrl;
  console.log("nextUrl", req.nextUrl);
  console.log("pathname", pathname);
  console.log("url", req.url);
  if (isUserRoute(pathname) && !roles.includes("ROLE_USER")) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }

  console.log("not admin", !roles.includes("ROLE_ADMIN"));
  if (isAdminRoute(pathname) && !roles.includes("ROLE_ADMIN")) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }
  console.log("next ...");
  return NextResponse.next();
}
export const config = {
  matcher: ["/api/users/:path*", "/api/admin/:path*"],
};
