import { NextResponse } from "next/server";

const ELEVENLABS_API_KEY = "sk_13e091c117a7de7736d0c2bae8ac4d633552c11205443014";
const AGENT_ID = "agent_0001kjaafapqerbazn0jrnqyrm0h";
// Real internal phone number ID — fetched once from GET /v1/convai/phone-numbers
const AGENT_PHONE_NUMBER_ID = "phnum_4801kja9ye7meknbr2wbf7w4ff7t";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const to_number: string = body.to_number;

        if (!to_number) {
            return NextResponse.json({ error: "to_number is required" }, { status: 400 });
        }

        // Initiate outbound call directly using the correct internal phone number ID
        const callRes = await fetch(
            "https://api.elevenlabs.io/v1/convai/twilio/outbound-call",
            {
                method: "POST",
                headers: {
                    "xi-api-key": ELEVENLABS_API_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    agent_id: AGENT_ID,
                    agent_phone_number_id: AGENT_PHONE_NUMBER_ID,
                    to_number,
                }),
            }
        );

        const callData = await callRes.json();

        if (!callRes.ok) {
            console.error("ElevenLabs outbound call error:", callData);
            return NextResponse.json(
                { error: "Call initiation failed", detail: callData },
                { status: callRes.status }
            );
        }

        return NextResponse.json({ success: true, data: callData });
    } catch (err: any) {
        console.error("elevenlabs-call route error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
