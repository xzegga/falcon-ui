import { NextRequest } from "next/server";
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';


export const GET = async (req: NextRequest) => {
    const supabaseClient = createClient('https://tmilqubytvbtzbohphiq.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaWxxdWJ5dHZidHpib2hwaGlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNTQ0ODUzMSwiZXhwIjoyMDIxMDI0NTMxfQ.2UbzTtlIxndhVbF_97o0PF8VokDrw5ORTVVsT158-OA');
    const { data } = await supabaseClient.from("survey").select();
    console.log('MyData',data);
    return new Response("GET", {
        status: 200
    })
};

export const POST = async (req: NextRequest) => {
    const data1 = await req.json()
    const survey_id = uuidv4()
    const created_at = new Date()
    const newData ={...data1, survey_id, created_at}
    console.log(newData)
    const supabaseClient = createClient('https://tmilqubytvbtzbohphiq.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaWxxdWJ5dHZidHpib2hwaGlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNTQ0ODUzMSwiZXhwIjoyMDIxMDI0NTMxfQ.2UbzTtlIxndhVbF_97o0PF8VokDrw5ORTVVsT158-OA');
    const insertResult = await supabaseClient.from("survey").insert(newData);
    const result = insertResult?.error ? new Response(`row not inserted ${insertResult?.error?.message}` , {
        status: insertResult.status
    }) : new Response("row inserted", {
        status: insertResult.status
    })
    console.log(insertResult)
    return result
};