import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { logs } = await req.json();

    const prompt = `
You are an expert cybersecurity analyst.

Analyze the following security logs.

Return ONLY valid JSON in this format:

{
  "threat": "",
  "severity": "",
  "confidence": 0,
  "summary": "",
  "prediction": "",
  "actions": []
}

Logs:
${logs.join("\n")}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    let text = response.text ?? "";

    // Remove markdown code fences if Gemini adds them
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const result = JSON.parse(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Gemini Error:", error);

return NextResponse.json(
  {
    error:
      error instanceof Error ? error.message : String(error),
  },
  { status: 500 }
);
  }
}