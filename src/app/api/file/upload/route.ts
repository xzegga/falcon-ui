import { createClient } from "@/lib/supabase/edge";
import { SUPABASE_CONSTANTS } from "@/lib/supabase/constants";
import { NextResponse } from "next/server";
import { RequestCookies } from "@edge-runtime/cookies";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;//http://localhost:3000

export async function POST(request: Request) {
  const cookies = new RequestCookies(request.headers);

  const supabase = createClient(cookies);

  const formData = await request.formData();
  const file = formData.get("file");
  const id = formData.get("id");
  const type = formData.get("type");

  // Depending on the file type, we'll upload to a different folder

  let folder = "others";
  let format = "wav";
  if (type === "video") {
    folder = "videos";
    format = "mp4";
  }
  if (type === "audio") {
    folder = "audios";
    format = "wav";
  }

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.storage
      .from(SUPABASE_CONSTANTS.NEXT_PUBLIC_STORAGE_BUCKET)
      .upload(`videos/${id}.${format}`, file);

    if (error) throw error;

    if (type == "audio") {
      fetch(`${apiBaseUrl}/api/file/process/transcript/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folder: "videos", format: format }),
      });
    }

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
