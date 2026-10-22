import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
    metricsSessionCookie,
    verifyMetricsSession,
} from "@/lib/metrics-auth";

// export const runtime = "nodejs";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(metricsSessionCookie)?.value;

        if (!verifyMetricsSession(session)) {
            return NextResponse.json(
                { authenticated: false },
                { status: 401 },
            );
        }

        return NextResponse.json({ authenticated: true });
    } catch {
        return NextResponse.json(
            { error: "Session verification is unavailable." },
            { status: 503 },
        );
    }
}