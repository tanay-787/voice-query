import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

export async function POST(req: Request) {
  try {
    const { question, summary, history } = await req.json();

    // v1 Rules:
    // 1. Derived from summary
    // 2. No external knowledge
    // 3. Short, clear, spoken-language friendly

    const qnaModel = 'gemini-2.5-flash-lite-preview-09-2025';
    const ttsModel = 'gemini-2.5-flash-preview-tts';

    const systemInstruction = `You are a conversational agent grounded strictly in the provided document summary.
Rules:
- Answers MUST be derived ONLY from the stored summary.
- No external knowledge is allowed.
- No guessing or inference beyond the document.
- If the answer is missing, say: "I don’t see that in this document."
- Keep responses short, clear, and friendly for spoken audio.

Document Summary Context:
${summary}`;

    // 1. Q&A Call
    const qnaResult = await ai.models.generateContent({
      model: qnaModel,
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...history.map((h: any) => ({
          role: h.role === 'ai' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: question }] }
      ]
    });

    const answerText = qnaResult.text || "I don’t see that in this document.";

    // 2. TTS Call
    // We use generateContent with the TTS model to get audio output
    const ttsResult = await ai.models.generateContent({
      model: ttsModel,
      contents: [{ role: 'user', parts: [{ text: answerText }] }],
      config: {
        responseModalities: ["AUDIO"]
      }
    });

    // Extract audio data from the response
    const audioPart = ttsResult.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    const audioBase64 = audioPart?.inlineData?.data;

    return new Response(JSON.stringify({
      answer: answerText,
      audio: audioBase64
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate response' }), { status: 500 });
  }
}
