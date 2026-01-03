const TO_MARKDOWN_ENDPOINT = 'https://www.urltoany.com/api/function/to-markdown';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ error: 'A valid url is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const upstreamResponse = await fetch(TO_MARKDOWN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const contentType = upstreamResponse.headers.get('content-type') ?? 'text/plain';
    const body = await upstreamResponse.text();

    return new Response(body, {
      status: upstreamResponse.status,
      headers: { 'Content-Type': contentType }
    });
  } catch (error: any) {
    console.error('to-markdown error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch markdown.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
