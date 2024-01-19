import { createClient } from "@/lib/supabase/edge";
import { RequestCookies } from "@edge-runtime/cookies";
import { type Uploadable } from "openai/core";
import { toFile } from "openai";
import OpenAI from "openai";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let folder = "videos";
  let format = "wav";
  try {
    const body = await request.json();
    folder = body.folder;
    format = body.format;
  } catch (e) {
    console.log("Error occured ", "Mo body found");
  }

  console.log("folder:", folder, "name", id, "format:", format);

  const cookies = new RequestCookies(request.headers);
  const supabase = createClient(cookies);

  const file = await supabase.storage
    .from("recordings")
    .download(`${folder}/${id}.${format}`);
  if (!file.data) return new Response("Not found", { status: 404 });

  console.log("file:", file);

  const openai = new OpenAI();
  const audio_file: Uploadable = await toFile(file.data, `${id}.${format}`);
  const transcript = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file: audio_file,
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `The user provides a transcript of a Dialogue between a Customer and an Agent. Using the transcript, separate the different speakers (if any) into different paragraphs. Use the context to determine who is the Customer and who is the Agent.
            Example 1:
            Input: Hello, this is Ryan Bartos. May I speak with Natalie Jones, please? One moment, please. I'll put you through. Mr. Bartos, I'm sorry, Natalie's in a meeting at the moment. Would you like to leave a message?
            Output:
            Customer: Hello, this is Ryan Bartos. May I speak with Natalie Jones, please?
            Agent: One moment, please. I'll put you through.
            Agent: Mr. Bartos, I'm sorry, Natalie's in a meeting at the moment. Would you like to leave a message?

            Example 2:
            Input: My agent was pretty helpful. I was able to get my issue resolved quickly.
            Output:
            Customer: My agent was pretty helpful. I was able to get my issue resolved quickly.`,
      },
      { role: "user", content: transcript.text },
    ],
    model: "gpt-4-1106-preview",
  });

  const response = completion.choices[0].message.content;
  const dialogutranscripteArray = parseDialogue(response || "");

  const updateResult = id
    ? await supabase
        .from("survey")
        .update({ transcript: dialogutranscripteArray, status: "pending" })
        .eq("survey_id", id)
        .select()
    : null;

  const result = updateResult?.error
    ? new Response(`Survey not updated ${updateResult?.error?.message}`, {
        status: updateResult?.status,
      })
    : new Response("Surver was updated", {
        status: updateResult?.status,
      });
  return result;
}

function parseDialogue(text: string) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const dialogueArray: any[] = [];

  const regex = /^(Agent|Customer): (.+)$/;

  lines.forEach((line) => {
    const match = line.match(regex);
    if (match) {
      const dialogueObject = {
        role: match[1],
        content: match[2],
      };
      dialogueArray.push(dialogueObject);
    }
  });

  return dialogueArray;
}
