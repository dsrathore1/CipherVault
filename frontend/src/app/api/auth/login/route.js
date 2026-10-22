import { NextResponse } from "next/server";
import {
    createMetricsSession,
    metricsSessionCookie,
    verifyLoginCredentials,
} from "@/lib/metrics-auth";

// export const runtime = "nodejs";

export async function POST(request) {
    try {
        const body = await request.json();
        const username = body?.username;
        const password = body?.password;

        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            !username ||
            !password ||
            username.length > 128 ||
            password.length > 1024
        ) {
            return NextResponse.json(
                { error: "Enter a valid username and password." },
                { status: 400 },
            );
        }

        if (!verifyLoginCredentials(username, password)) {
            return NextResponse.json(
                { error: "Invalid username or password." },
                { status: 401 },
            );
        }

        const session = createMetricsSession();
        const response = NextResponse.json({ success: true });

        response.cookies.set(metricsSessionCookie, session.value, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: session.maxAge,
        });

        return response;
    } catch (error) {
        if (
            error instanceof SyntaxError
        ) {
            return NextResponse.json(
                { error: "Invalid request body." },
                { status: 400 },
            );
        }

        console.error("Metrics login configuration error.");

        return NextResponse.json(
            { error: "Metrics login is temporarily unavailable." },
            { status: 503 },
        );
    }
}