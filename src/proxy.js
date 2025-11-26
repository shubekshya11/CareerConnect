import { NextResponse } from "next/server";
import { getUserFromRequest, getAdminFromRequest } from "./auth.js";

/**
 * Simple route access configuration
 */
const ADMIN_PROTECTED_API_PREFIXES = [
  "/api/blogPortal",
  "/api/upload-image",
  "/api/delete-image",
  "/api/get-image",
];

const USER_PROTECTED_API_PREFIXES = ["/api/jobPortal"];

function isAuthenticated(user) {
  return user && user.id;
}

function isAdminAuthenticated(adminUser) {
  return adminUser && adminUser.id && adminUser.role === "admin";
}

function matchesAnyPrefix(path, prefixes) {
  return prefixes.some((prefix) => path.startsWith(prefix));
}

export async function proxy(req) {
  const { pathname } = req.nextUrl;
  const user = await getUserFromRequest(req);
  let shouldDisableCache = false;

  if (pathname.startsWith("/admin")) {
    const adminUser = await getAdminFromRequest(req);
    if (!isAdminAuthenticated(adminUser)) {
      return NextResponse.redirect(new URL("/sk-admin", req.url));
    }
    shouldDisableCache = true;
  }

  if (pathname.startsWith("/job-portal")) {
    if (!isAuthenticated(user)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    shouldDisableCache = true;
  }

  if (matchesAnyPrefix(pathname, ADMIN_PROTECTED_API_PREFIXES)) {
    const adminUser = await getAdminFromRequest(req);
    if (!isAdminAuthenticated(adminUser)) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
  }

  if (matchesAnyPrefix(pathname, USER_PROTECTED_API_PREFIXES)) {
    if (!isAuthenticated(user)) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }
  }

  const response = NextResponse.next();
  if (shouldDisableCache) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/job-portal/:path*",
    "/login",
    "/sk-admin",
    "/api/:path*",
  ],
};

