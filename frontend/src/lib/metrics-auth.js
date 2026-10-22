import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE = "cv_metrics_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 2;

function getSessionSecret() {
    const secret = process.env.METRICS_SESSION_SECRET;

    if (!secret || secret.length < 32) {
        throw new Error(
            "METRICS_SESSION_SECRET must contain at least 32 characters.",
        );
    }

    return secret;
}

function sign(value) {
    return createHmac("sha256", getSessionSecret())
        .update(value)
        .digest("base64url");
}

export function verifyLoginCredentials(username, password) {
    const expectedUsername = process.env.METRICS_USERNAME;
    const expectedPassword = process.env.METRICS_PASSWORD;

    if (!expectedUsername || !expectedPassword) {
        throw new Error("Metrics login credentials are not configured.");
    }

    const suppliedUsername = Buffer.from(username);
    const configuredUsername = Buffer.from(expectedUsername);
    const suppliedPassword = Buffer.from(password);
    const configuredPassword = Buffer.from(expectedPassword);

    const usernameMatches =
        suppliedUsername.length === configuredUsername.length &&
        timingSafeEqual(suppliedUsername, configuredUsername);

    const passwordMatches =
        suppliedPassword.length === configuredPassword.length &&
        timingSafeEqual(suppliedPassword, configuredPassword);

    return usernameMatches && passwordMatches;
}

export function createMetricsSession() {
    const expiresAt = Math.floor(Date.now() / 1000) +
        SESSION_DURATION_SECONDS;

    const payload = Buffer.from(
        JSON.stringify({ expiresAt }),
    ).toString("base64url");

    return {
        value: `${payload}.${sign(payload)}`,
        maxAge: SESSION_DURATION_SECONDS,
    };
}

export function verifyMetricsSession(value) {
    if (!value || typeof value !== "string") return false;

    const parts = value.split(".");
    if (parts.length !== 2) return false;

    const [payload, suppliedSignature] = parts;

    try {
        const expectedSignature = sign(payload);
        const supplied = Buffer.from(suppliedSignature);
        const expected = Buffer.from(expectedSignature);

        if (
            supplied.length !== expected.length ||
            !timingSafeEqual(supplied, expected)
        ) {
            return false;
        }

        const session = JSON.parse(
            Buffer.from(payload, "base64url").toString("utf8"),
        );

        return (
            Number.isInteger(session.expiresAt) &&
            session.expiresAt > Math.floor(Date.now() / 1000)
        );
    } catch {
        return false;
    }
}

export const metricsSessionCookie = SESSION_COOKIE;