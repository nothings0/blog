import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    raw: true,
  });

  const { pathname } = request.nextUrl;

  if (token || pathname.includes("/api/auth") || pathname.includes("/_next")) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }
  if (!token && pathname === "/create") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};
