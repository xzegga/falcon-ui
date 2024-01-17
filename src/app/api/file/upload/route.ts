import { createClient } from "@/lib/supabase/edge";
import { RequestCookies } from "@edge-runtime/cookies";

export async function POST(request: Request) {
    const body = await request.json();
    let file = body.file;
    let title = body.title;
    if (!file) return new Response("No file", { status: 400 });
    if (!title) return new Response("No title", { status: 400 });
    const cookies = new RequestCookies(request.headers);
    const supabase = createClient(cookies);
    // Depending on the file type, we'll upload to a different folder
    let folder = "others";
    if (file.type.startsWith("video/")) folder = "videos";
    if (file.type.startsWith("audio/")) folder = "audios";
    // If the file is a video, we'll also separate the audio and video tracks

}