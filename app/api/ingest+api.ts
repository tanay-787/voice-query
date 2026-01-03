import { GoogleGenAI } from '@google/genai';
import * as pdf from 'pdf-parse';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let text = '';
    let source = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      // @ts-ignore - TypeScript confuses RN FormData (no get) with Web FormData (has get)
      const file = (formData as any).get('file');
      if (!file || !(file instanceof Blob)) return new Response('No file provided', { status: 400 });

      const buffer = Buffer.from(await file.arrayBuffer());
      // @ts-ignore - pdf-parse typing can be tricky in ESM
      const data = await (pdf.default || pdf)(buffer);
      
      // Hard limits: 20 pages, 30k chars
      if (data.numpages > 20) {
        return new Response(JSON.stringify({ error: "This PDF is too large for v1. Please upload a smaller document." }), { status: 400 });
      }
      if (data.text.length > 30000) {
        return new Response(JSON.stringify({ error: "This PDF is too large for v1. Please upload a smaller document." }), { status: 400 });
      }

      text = data.text;
      source = 'pdf';
    } else {
      const { url } = await req.json();
      if (!url) return new Response('No URL provided', { status: 400 });

      const toMarkdownUrl = new URL('/api/to-markdown', req.url);
      const markdownResponse = await fetch(toMarkdownUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!markdownResponse.ok) {
        const errorBody = await markdownResponse.text();
        return new Response(errorBody || JSON.stringify({ error: "Failed to convert webpage to markdown." }), {
          status: markdownResponse.status
        });
      }

      const markdown = (await markdownResponse.text()).trim();
      if (!markdown) {
        return new Response(JSON.stringify({ error: "Empty or unreadable content." }), { status: 400 });
      }

      if (markdown.length > 15000) {
        return new Response(JSON.stringify({ error: "This webpage is too large or complex for v1." }), { status: 400 });
      }

      text = markdown;
      source = 'url';
    }

    if (!text || text.length < 50) {
      return new Response(JSON.stringify({ error: "Empty or unreadable content." }), { status: 400 });
    }

    // Summarize
    const model = 'gemini-2.5-flash-lite-preview-02-05';
    const prompt = `You are summarizing a document for conversational use.
Produce:
- A short overview
- 5–10 key points
- Important definitions or concepts (if any)

Keep it concise, factual, and neutral.

Document Content:
${text}`;

    const summaryResult = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const summaryText = summaryResult.text || '';
    
    // Attempt to structure it as JSON for storage
    // v1 spec: overview, key_points, definitions
    // We'll ask the model to format it or we parse it. For v1, let's just save the summary text
    // and use it as context.
    
    return new Response(JSON.stringify({
      source,
      summary: summaryText,
      fullText: text // We keep full text for better Q&A if needed, or just summary per spec
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Ingestion error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to process document' }), { status: 500 });
  }
}
