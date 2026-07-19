import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const isUserAuthenticated = false;

    if (isUserAuthenticated) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/authentication/login", request.url));
}

export const config = {
    matcher: "/",
};
