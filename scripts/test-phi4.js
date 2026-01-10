const { default: ModelClient, isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

// Configuration
const TOKEN = process.env.GITHUB_TOKEN;
const ENDPOINT = "https://models.github.ai/inference";
const MODEL_NAME = "microsoft/Phi-4-multimodal-instruct";

async function main() {
  console.log('🚀 Starting Phi-4 Connection Test (JS)...');

  if (!TOKEN) {
    console.error('❌ Error: GITHUB_TOKEN environment variable is not set.');
    console.error('Please run: export GITHUB_TOKEN=your_token_here');
    process.exit(1);
  }

  try {
    const client = new ModelClient(ENDPOINT, new AzureKeyCredential(TOKEN));

    // 1. Test Simple Chat
    console.log('\n🧪 Testing Connection (Question: "What is the capital of France?")...');
    
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "user", content: "What is the capital of France?" }
        ],
        model: MODEL_NAME,
        temperature: 0.7,
        max_tokens: 1000
      }
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    console.log('✅ Response received:', response.body.choices[0].message.content);
    console.log('\n🎉 Phi-4 connection verified successfully!');

  } catch (error) {
    console.error('\n❌ Test Failed:', error);
    // Print detailed error if available
    if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Body:', error.response.body);
    }
    process.exit(1);
  }
}

main();
