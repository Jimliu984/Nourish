import { AiMessage } from "@/lib/types";
import { redirect } from "next/navigation";

export async function askGemini(prompt: string, history: AiMessage[]) {
  const res = await fetch("/api/gemini-chat", {
    method: "POST",
    body: JSON.stringify({ prompt, history }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.redirected) {
    return redirect(res.url);
  }
  const data = await res.json();
  // console.log("Gemini:", data.text);
  return data.text;
}