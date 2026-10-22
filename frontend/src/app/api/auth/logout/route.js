import { NextResponse } from "next/server";
import { metricsSessionCookie } from "@/lib/metrics-auth";

export async function POST() {
    const response = NextResponse.json({ success: true });

    response.cookies.set(metricsSessionCookie, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 0,
    });

    return response;
}