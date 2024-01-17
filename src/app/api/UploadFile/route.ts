import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_CONSTANTS } from "@/lib/supabase/constants";

export const POST = async (req: any, res: any) => {
  //tipar
  const supabase = createClient(
    SUPABASE_CONSTANTS.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_CONSTANTS.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    }
  );

  const formData = await req.formData();
  const file = formData.get("file");

  console.log(file);
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.storage
      .from(SUPABASE_CONSTANTS.NEXT_PUBLIC_STORAGE_BUCKET)
      .upload(/**/ `recordings/_id`, file);
    if (error) throw error;

    console.log("data");

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};