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
    const dataInsert = await request.json()
    const created_at = new Date()
    const newData ={...dataInsert, created_at}
    const cookies = new RequestCookies(request.headers);
    const supabase = createClient(cookies);

    const insertResult = await supabase.from("survey").insert(newData);

    const result = insertResult?.error ? new Response(`survey not inserted ${insertResult?.error?.message}` , {
        status: insertResult.status
    }) : new Response("survey inserted", {
        status: insertResult.status
    })
    return result
};

export const PUT = async (request: NextRequest) => {
    const dataUpdate = await request.json()
    const cookies = new RequestCookies(request.headers);
    const url = new URL(request.url)
    const id = url.searchParams.get("id")
    const supabase = createClient(cookies);

    const updateResult = id ? await supabase.from("survey").update(dataUpdate).eq('survey_id',id) : null;

    const result = updateResult?.error ? new Response(`survey not updated ${updateResult?.error?.message}` , {
        status: updateResult?.status
    }) : new Response(null, {
        status: updateResult?.status
    })
    return result
};

export const DELETE = async (request: NextRequest) => {
    const cookies = new RequestCookies(request.headers);
    const url = new URL(request.url)
    const id = url.searchParams.get("id")
    const supabase = createClient(cookies);

    const deleteResult = id ? await supabase.from("survey").delete().eq('survey_id',id) : null;

    return NextResponse.json(deleteResult);
};