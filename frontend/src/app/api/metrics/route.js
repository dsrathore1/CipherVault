import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
    metricsSessionCookie,
    verifyMetricsSession,
} from "@/lib/metrics-auth";

// export const runtime = "nodejs";

export async function GET() {
    const cookieStore = await cookies();
    const sessionValue = cookieStore.get(metricsSessionCookie)?.value;

    if (!verifyMetricsSession(sessionValue)) {
        return NextResponse.json(
            { error: "Authentication required." },
            { status: 401 },
        );
    }

    const backendUrl =
        process.env.BACKEND_URL ||
        "https://ciphervault-backend.fastapicloud.dev";

    try {
        const backendResponse = await fetch(`${backendUrl}/metrics`, {
            cache: "no-store",
            headers: { Accept: "text/plain" },
        });

        if (!backendResponse.ok) {
            return NextResponse.json(
                { error: "Unable to retrieve backend metrics." },
                { status: 502 },
            );
        }

        return new Response(await backendResponse.text(), {
            status: 200,
            headers: {
                "Content-Type":
                    backendResponse.headers.get("content-type") ||
                    "text/plain; version=0.0.4; charset=utf-8",
                "Cache-Control": "no-store",
                "X-Content-Type-Options": "nosniff",
            },
        });
    } catch {
        return NextResponse.json(
            { error: "Metrics backend is unavailable." },
            { status: 502 },
        );
    }
}