import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/edge";
import { SUPABASE_CONSTANTS } from "@/lib/supabase/constants";
import { RequestCookies } from "@edge-runtime/cookies";

export const POST = async (request: Request) => {
  const cookies = new RequestCookies(request.headers);

  const supabase = createClient(cookies);

  const formData = await request.formData();
  const file = formData.get("file");
  const id = formData.get("id");

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.storage
      .from(SUPABASE_CONSTANTS.NEXT_PUBLIC_STORAGE_BUCKET)
      .upload(/**/ `recordings/${id}`, file);
    if (error) throw error;

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
