import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { createClient } from '@supabase/supabase-js'

export const POST = async (req, res) => {
    const formData = await req.formData();

    const file = formData.get("file");
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    try {
        
        );
        return NextResponse.json({ Message: "Success", status: 201 });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
    }
    const supabase = createClient("https://xyzcompany.supabase.co", "public-anon-key", {
    auth: {
        storage: new LargeSecureStore(),
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
    });
};