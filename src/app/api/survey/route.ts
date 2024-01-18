import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/edge";
import { RequestCookies } from "@edge-runtime/cookies";


export const GET = async (request: NextRequest) => {
    const cookies = new RequestCookies(request.headers);
    const url = new URL(request.url)
    const id = url.searchParams.get("id")
    const supabase = createClient(cookies);

    const { data } = id ? await supabase.from("survey").select().eq('survey_id',id) : await supabase.from("survey").select();
    return NextResponse.json(data);
};

export const POST = async (request: NextRequest) => {
    const data1 = await request.json()
    const created_at = new Date()
    const newData ={...data1, created_at}
    const cookies = new RequestCookies(request.headers);
    const supabase = createClient(cookies);
    const insertResult = await supabase.from("survey").insert(newData);
    const result = insertResult?.error ? new Response(`row not inserted ${insertResult?.error?.message}` , {
        status: insertResult.status
    }) : new Response("row inserted", {
        status: insertResult.status
    })
    return result
};