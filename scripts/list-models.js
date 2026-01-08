const { GoogleGenAI } = require('@google/genai');

async function main() {
  const apiKey = 'AIzaSyDo1-2L0NfaI6MiCoXYVUSi1iIDrWuOdZg';
  if (!apiKey) {
    console.error('Please set GOOGLE_GENERATIVE_AI_API_KEY environment variable.');
    console.error('Usage: GOOGLE_GENERATIVE_AI_API_KEY=your_key node scripts/list-models.js');
    process.exit(1);
  }

  console.log('Initializing GoogleGenAI...');
  const ai = new GoogleGenAI({ apiKey, vertexai: false });
  
  console.log('Fetching available models...');
  try {
    const response = await ai.models.list();
    
    // The SDK returns a list response which might be an array or an object with 'models' property
    // Logging the full structure to be safe, but formatted
    console.log(JSON.stringify(response, null, 2));

  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

main();
