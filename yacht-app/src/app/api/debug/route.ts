import { NextResponse } from "next/server";

export async function GET() {
    const url = process.env.DATABASE_URL ?? "(not set)";
    return NextResponse.json({
        url_prefix: url.substring(0, 90),
        has_url: !!url,
    });
}
