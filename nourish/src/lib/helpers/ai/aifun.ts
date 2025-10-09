

export async function talkToGemini(prompt : string) {
  const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
  const body = {
    "contents": [
      {
        "parts": [
          {
            "text": `In 100 words and in plain text (i.e. same font, no bold, italics and paragraphs), please respond to the following prompt: ${prompt}`                                                         
          }
        ]
      }
    ]
  }
  const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( body )
    })

  return res.json();
}

export async function askGemini(prompt: string) {
  const res = await fetch("/api/gemini-chat", {
    method: "POST",
    body: JSON.stringify({ prompt }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  // console.log("Gemini:", data.text);
  return data.text;
}