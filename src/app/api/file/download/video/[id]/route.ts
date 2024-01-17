import { createClient } from "@/lib/supabase/edge";
import { RequestCookies } from "@edge-runtime/cookies";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const id = params.id;
    const cookies = new RequestCookies(request.headers);
    const supabase = createClient(cookies);
    const file = await supabase.storage.from("recordings").download(`videos/${id}`)
    if (!file.data) return new Response("Not found", { status: 404 });
    const contentType = file.data?.type;
    console.log("content type:", contentType);
    return new Response(file.data, {
      headers: {
        "content-type": contentType||"",
      },
    });
  }