import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/edge";
import { RequestCookies } from "@edge-runtime/cookies";


export const GET = async (request: NextRequest) => {
    const cookies = new RequestCookies(request.headers);

    const supabase = createClient(cookies);

    const { data } = await supabase.from("survey").select();
    return new Response("GET", {
        status: 200
    })
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