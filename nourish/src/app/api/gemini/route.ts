import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { ALL_TAGS } from "@/lib/tags";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro",
    tools: [
      {
        functionDeclarations: [
          {
            name: "getAllTags",
            description: "Gets all recipe tags used in the website",
            parameters: {
              type: SchemaType.OBJECT,
              properties: {},
            },
          },
        ],
      },
    ],
  });

  // Step 1: Ask Gemini
  const resp1 = await model.generateContent(prompt);
  const candidate = resp1.response.candidates?.[0];
  const part = candidate?.content.parts[0];

  if (part?.functionCall) {
    // Step 2: Run the tool manually
    const { name, args } = part.functionCall;
    // const toolRun = await model.
    let toolResult: any;

    // if (name === "reverseString") {
    //   toolResult = { reversed: args.text.split("").reverse().join("") };
    // }
    if (name === "getAllTags") {
      // RUN tool that gets called
      // toolResult = "[\"Healthy\", \"Spicy\", \"Chinese\"]";
      toolResult = {allTags : ALL_TAGS}
    }
    console.log(toolResult)
    // Step 3: Send tool result back
    const resp2 = await model.generateContent({contents: [
      { role: "user", parts: [{ text: prompt }] },
      {
        role: "function",
        parts: [
          {
            functionResponse: {
              name : name,
              response: toolResult,
            },
          },
        ],
      },
    ]});
    return NextResponse.json({ text: resp2.response.text() });
  }

  // If no tool was used, just return text
  return NextResponse.json({ text: resp1.response.text() });
}
