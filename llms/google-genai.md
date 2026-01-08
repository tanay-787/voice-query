Published Time: Mon, 05 Jan 2026 20:34:29 GMT

@google/genai
===============

*   Preparing search index...
*   The search index is not available

[@google/genai](https://googleapis.github.io/js-genai/release_docs/index.html)

[](https://googleapis.github.io/js-genai/release_docs/index.html#)

@google/genai
=============

[](https://googleapis.github.io/js-genai/release_docs/index.html)
Google Gen AI SDK for TypeScript and JavaScript[](https://googleapis.github.io/js-genai/release_docs/index.html#google-gen-ai-sdk-for-typescript-and-javascript)
================================================================================================================================================================

[![Image 1: NPM Downloads](https://img.shields.io/npm/dw/%40google%2Fgenai)](https://www.npmjs.com/package/@google/genai)[![Image 2: Node Current](https://img.shields.io/node/v/%40google%2Fgenai)](https://www.npmjs.com/package/@google/genai)

* * *

**Documentation:**[https://googleapis.github.io/js-genai/](https://googleapis.github.io/js-genai/)

* * *

The Google Gen AI JavaScript SDK is designed for TypeScript and JavaScript developers to build applications powered by Gemini. The SDK supports both the [Gemini Developer API](https://ai.google.dev/gemini-api/docs) and [Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview).

The Google Gen AI SDK is designed to work with Gemini 2.0+ features.

Caution

**API Key Security:** Avoid exposing API keys in client-side code. Use server-side implementations in production environments.

[](https://googleapis.github.io/js-genai/release_docs/index.html)
Code Generation[](https://googleapis.github.io/js-genai/release_docs/index.html#code-generation)
------------------------------------------------------------------------------------------------

Generative models are often unaware of recent API and SDK updates and may suggest outdated or legacy code.

We recommend using our Code Generation instructions [`codegen_instructions.md`](https://raw.githubusercontent.com/googleapis/js-genai/refs/heads/main/codegen_instructions.md) when generating Google Gen AI SDK code to guide your model towards using the more recent SDK features. Copy and paste the instructions into your development environment to provide the model with the necessary context.

[](https://googleapis.github.io/js-genai/release_docs/index.html)
Prerequisites[](https://googleapis.github.io/js-genai/release_docs/index.html#prerequisites)
--------------------------------------------------------------------------------------------

1.   Node.js version 20 or later

[](https://googleapis.github.io/js-genai/release_docs/index.html)
### The following are required for Vertex AI users (excluding Vertex AI Studio)[](https://googleapis.github.io/js-genai/release_docs/index.html#the-following-are-required-for-vertex-ai-users-excluding-vertex-ai-studio)

1.   [Select](https://console.cloud.google.com/project) or [create](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project) a Google Cloud project.

2.   [Enable billing for your project](https://cloud.google.com/billing/docs/how-to/modify-project).

3.   [Enable the Vertex AI API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com).

4.   [Configure authentication](https://cloud.google.com/docs/authentication) for your project.

    *   [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install).
    *   [Initialize the gcloud CLI](https://cloud.google.com/sdk/docs/initializing).
    *   Create local authentication credentials for your user account:

```
gcloud auth application-default login
```
Copy

A list of accepted authentication options are listed in [GoogleAuthOptions](https://github.com/googleapis/google-auth-library-nodejs/blob/3ae120d0a45c95e36c59c9ac8286483938781f30/src/auth/googleauth.ts#L87) interface of google-auth-library-node.js GitHub repo.

[](https://googleapis.github.io/js-genai/release_docs/index.html)
Installation[](https://googleapis.github.io/js-genai/release_docs/index.html#installation)
------------------------------------------------------------------------------------------

To install the SDK, run the following command:

```
npm install @google/genai
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
Quickstart[](https://googleapis.github.io/js-genai/release_docs/index.html#quickstart)
--------------------------------------------------------------------------------------

The simplest way to get started is to use an API key from [Google AI Studio](https://aistudio.google.com/apikey):

```
import {GoogleGenAI} from '@google/genai';const GEMINI_API_KEY = process.env.GEMINI_API_KEY;const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});async function main() {  const response = await ai.models.generateContent({    model: 'gemini-2.5-flash',    contents: 'Why is the sky blue?',  });  console.log(response.text);}main();
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
Initialization[](https://googleapis.github.io/js-genai/release_docs/index.html#initialization)
----------------------------------------------------------------------------------------------

The Google Gen AI SDK provides support for both the [Google AI Studio](https://ai.google.dev/gemini-api/docs) and [Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview) implementations of the Gemini API.

[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Gemini Developer API[](https://googleapis.github.io/js-genai/release_docs/index.html#gemini-developer-api)

For server-side applications, initialize using an API key, which can be acquired from [Google AI Studio](https://aistudio.google.com/apikey):

```
import { GoogleGenAI } from '@google/genai';const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
#### Browser[](https://googleapis.github.io/js-genai/release_docs/index.html#browser)

Caution

**API Key Security:** Avoid exposing API keys in client-side code. Use server-side implementations in production environments.

In the browser the initialization code is identical:

```
import { GoogleGenAI } from '@google/genai';const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Vertex AI[](https://googleapis.github.io/js-genai/release_docs/index.html#vertex-ai)

Sample code for VertexAI initialization:

```
import { GoogleGenAI } from '@google/genai';const ai = new GoogleGenAI({    vertexai: true,    project: 'your_project',    location: 'your_location',});
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
### (Optional) (NodeJS only) Using environment variables:[](https://googleapis.github.io/js-genai/release_docs/index.html#optional-nodejs-only-using-environment-variables)

For NodeJS environments, you can create a client by configuring the necessary environment variables. Configuration setup instructions depends on whether you're using the Gemini Developer API or the Gemini API in Vertex AI.

**Gemini Developer API:** Set `GOOGLE_API_KEY` as shown below:

```
export GOOGLE_API_KEY='your-api-key'
```
Copy
**Gemini API on Vertex AI:** Set `GOOGLE_GENAI_USE_VERTEXAI`, `GOOGLE_CLOUD_PROJECT` and `GOOGLE_CLOUD_LOCATION`, as shown below:

```
export GOOGLE_GENAI_USE_VERTEXAI=trueexport GOOGLE_CLOUD_PROJECT='your-project-id'export GOOGLE_CLOUD_LOCATION='us-central1'
```
Copy
```
import {GoogleGenAI} from '@google/genai';const ai = new GoogleGenAI();
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
API Selection[](https://googleapis.github.io/js-genai/release_docs/index.html#api-selection)
--------------------------------------------------------------------------------------------

By default, the SDK uses the beta API endpoints provided by Google to support preview features in the APIs. The stable API endpoints can be selected by setting the API version to `v1`.

To set the API version use `apiVersion`. For example, to set the API version to `v1` for Vertex AI:

```
const ai = new GoogleGenAI({    vertexai: true,    project: 'your_project',    location: 'your_location',    apiVersion: 'v1'});
```
Copy
To set the API version to `v1alpha` for the Gemini Developer API:

```
const ai = new GoogleGenAI({    apiKey: 'GEMINI_API_KEY',    apiVersion: 'v1alpha'});
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
GoogleGenAI overview[](https://googleapis.github.io/js-genai/release_docs/index.html#googlegenai-overview)
----------------------------------------------------------------------------------------------------------

All API features are accessed through an instance of the `GoogleGenAI` classes. The submodules bundle together related API methods:

*   [`ai.models`](https://googleapis.github.io/js-genai/release_docs/classes/models.Models.html): Use `models` to query models (`generateContent`, `generateImages`, ...), or examine their metadata.
*   [`ai.caches`](https://googleapis.github.io/js-genai/release_docs/classes/caches.Caches.html): Create and manage `caches` to reduce costs when repeatedly using the same large prompt prefix.
*   [`ai.chats`](https://googleapis.github.io/js-genai/release_docs/classes/chats.Chats.html): Create local stateful `chat` objects to simplify multi turn interactions.
*   [`ai.files`](https://googleapis.github.io/js-genai/release_docs/classes/files.Files.html): Upload `files` to the API and reference them in your prompts. This reduces bandwidth if you use a file many times, and handles files too large to fit inline with your prompt.
*   [`ai.live`](https://googleapis.github.io/js-genai/release_docs/classes/live.Live.html): Start a `live` session for real time interaction, allows text + audio + video input, and text or audio output.

[](https://googleapis.github.io/js-genai/release_docs/index.html)
Samples[](https://googleapis.github.io/js-genai/release_docs/index.html#samples)
--------------------------------------------------------------------------------

More samples can be found in the [github samples directory](https://github.com/googleapis/js-genai/tree/main/sdk-samples).

[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Streaming[](https://googleapis.github.io/js-genai/release_docs/index.html#streaming)

For quicker, more responsive API interactions use the `generateContentStream` method which yields chunks as they're generated:

```
import {GoogleGenAI} from '@google/genai';const GEMINI_API_KEY = process.env.GEMINI_API_KEY;const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});async function main() {  const response = await ai.models.generateContentStream({    model: 'gemini-2.5-flash',    contents: 'Write a 100-word poem.',  });  for await (const chunk of response) {    console.log(chunk.text);  }}main();
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Function Calling[](https://googleapis.github.io/js-genai/release_docs/index.html#function-calling)

To let Gemini to interact with external systems, you can provide `functionDeclaration` objects as `tools`. To use these tools it's a 4 step

1.   **Declare the function name, description, and parametersJsonSchema**
2.   **Call `generateContent` with function calling enabled**
3.   **Use the returned `FunctionCall` parameters to call your actual function**
4.   **Send the result back to the model (with history, easier in `ai.chat`) as a `FunctionResponse`**

```
import {GoogleGenAI, FunctionCallingConfigMode, FunctionDeclaration, Type} from '@google/genai';const GEMINI_API_KEY = process.env.GEMINI_API_KEY;async function main() {  const controlLightDeclaration: FunctionDeclaration = {    name: 'controlLight',    parametersJsonSchema: {      type: 'object',      properties:{        brightness: {          type:'number',        },        colorTemperature: {          type:'string',        },      },      required: ['brightness', 'colorTemperature'],    },  };  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});  const response = await ai.models.generateContent({    model: 'gemini-2.5-flash',    contents: 'Dim the lights so the room feels cozy and warm.',    config: {      toolConfig: {        functionCallingConfig: {          // Force it to call any function          mode: FunctionCallingConfigMode.ANY,          allowedFunctionNames: ['controlLight'],        }      },      tools: [{functionDeclarations: [controlLightDeclaration]}]    }  });  console.log(response.functionCalls);}main();
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
#### Model Context Protocol (MCP) support (experimental)[](https://googleapis.github.io/js-genai/release_docs/index.html#model-context-protocol-mcp-support-experimental)

Built-in [MCP](https://modelcontextprotocol.io/introduction) support is an experimental feature. You can pass a local MCP server as a tool directly.

```
import { GoogleGenAI, FunctionCallingConfigMode , mcpToTool} from '@google/genai';import { Client } from "@modelcontextprotocol/sdk/client/index.js";import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";// Create server parameters for stdio connectionconst serverParams = new StdioClientTransport({  command: "npx", // Executable  args: ["-y", "@philschmid/weather-mcp"] // MCP Server});const client = new Client(  {    name: "example-client",    version: "1.0.0"  });// Configure the clientconst ai = new GoogleGenAI({});// Initialize the connection between client and serverawait client.connect(serverParams);// Send request to the model with MCP toolsconst response = await ai.models.generateContent({  model: "gemini-2.5-flash",  contents: `What is the weather in London in ${new Date().toLocaleDateString()}?`,  config: {    tools: [mcpToTool(client)],  // uses the session, will automatically call the tool using automatic function calling  },});console.log(response.text);// Close the connectionawait client.close();
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Generate Content[](https://googleapis.github.io/js-genai/release_docs/index.html#generate-content)

[](https://googleapis.github.io/js-genai/release_docs/index.html)
#### How to structure `contents` argument for `generateContent`[](https://googleapis.github.io/js-genai/release_docs/index.html#how-to-structure-contents-argument-for-generatecontent)

The SDK allows you to specify the following types in the `contents` parameter:

[](https://googleapis.github.io/js-genai/release_docs/index.html)
#### Content[](https://googleapis.github.io/js-genai/release_docs/index.html#content)

*   `Content`: The SDK will wrap the singular `Content` instance in an array which contains only the given content instance
*   `Content[]`: No transformation happens

[](https://googleapis.github.io/js-genai/release_docs/index.html)
#### Part[](https://googleapis.github.io/js-genai/release_docs/index.html#part)

Parts will be aggregated on a singular Content, with role 'user'.

*   `Part | string`: The SDK will wrap the `string` or `Part` in a `Content` instance with role 'user'.
*   `Part[] | string[]`: The SDK will wrap the full provided list into a single `Content` with role 'user'.

**_NOTE:_** This doesn't apply to `FunctionCall` and `FunctionResponse` parts, if you are specifying those, you need to explicitly provide the full `Content[]` structure making it explicit which Parts are 'spoken' by the model, or the user. The SDK will throw an exception if you try this.

[](https://googleapis.github.io/js-genai/release_docs/index.html)
Error Handling[](https://googleapis.github.io/js-genai/release_docs/index.html#error-handling)
----------------------------------------------------------------------------------------------

To handle errors raised by the API, the SDK provides this [ApiError](https://github.com/googleapis/js-genai/blob/main/src/errors.ts) class.

```
import {GoogleGenAI} from '@google/genai';const GEMINI_API_KEY = process.env.GEMINI_API_KEY;const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});async function main() {  await ai.models.generateContent({    model: 'non-existent-model',    contents: 'Write a 100-word poem.',  }).catch((e) => {    console.error('error name: ', e.name);    console.error('error message: ', e.message);    console.error('error status: ', e.status);  });}main();
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
Interactions (Preview)[](https://googleapis.github.io/js-genai/release_docs/index.html#interactions-preview)
------------------------------------------------------------------------------------------------------------

> **Warning:** The Interactions API is in **Beta**. This is a preview of an experimental feature. Features and schemas are subject to **breaking changes**.

The Interactions API is a unified interface for interacting with Gemini models and agents. It simplifies state management, tool orchestration, and long-running tasks.

See the [documentation site](https://ai.google.dev/gemini-api/docs/interactions) for more details.

[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Basic Interaction[](https://googleapis.github.io/js-genai/release_docs/index.html#basic-interaction)

```
const interaction = await ai.interactions.create({    model: 'gemini-2.5-flash',    input: 'Hello, how are you?',});console.debug(interaction);
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Stateful Conversation[](https://googleapis.github.io/js-genai/release_docs/index.html#stateful-conversation)

The Interactions API supports server-side state management. You can continue a conversation by referencing the `previous_interaction_id`.

```
// 1. First turnconst interaction1 = await ai.interactions.create({    model: 'gemini-2.5-flash',    input: 'Hi, my name is Amir.',});console.debug(interaction1);// 2. Second turn (passing previous_interaction_id)const interaction2 = await ai.interactions.create({  model: 'gemini-2.5-flash',  input: 'What is my name?',  previous_interaction_id: interaction1.id,});console.debug(interaction2);
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Agents (Deep Research)[](https://googleapis.github.io/js-genai/release_docs/index.html#agents-deep-research)

You can use specialized agents like `deep-research-pro-preview-12-2025` for complex tasks.

```
function sleep(ms: number): Promise<void> {  return new Promise(resolve => setTimeout(resolve, ms));}// 1. Start the Deep Research Agentconst initialInteraction = await ai.interactions.create({  input:      'Research the history of the Google TPUs with a focus on 2025 and 2026.',  agent: 'deep-research-pro-preview-12-2025',  background: true,});console.log(`Research started. Interaction ID: ${initialInteraction.id}`);// 2. Poll for resultswhile (true) {  const interaction = await ai.interactions.get(initialInteraction.id);  console.log(`Status: ${interaction.status}`);  if (interaction.status === 'completed') {    console.debug('\nFinal Report:\n', interaction.outputs);    break;  } else if (['failed', 'cancelled'].includes(interaction.status)) {    console.log(`Failed with status: ${interaction.status}`);    break;  }  await sleep(10000);  // Sleep for 10 seconds}
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Multimodal Input[](https://googleapis.github.io/js-genai/release_docs/index.html#multimodal-input)

You can provide multimodal data (text, images, audio, etc.) in the input list.

```
import base64// Assuming you have a base64 string// const base64Image = ...;const interaction = await ai.interactions.create({  model: 'gemini-2.5-flash',  input: [    { type: 'text', text: 'Describe the image.' },    { type: 'image', data: base64Image, mime_type: 'image/png' },  ],});console.debug(interaction);
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Function Calling[](https://googleapis.github.io/js-genai/release_docs/index.html#function-calling-1)

You can define custom functions for the model to use. The Interactions API handles the tool selection, and you provide the execution result back to the model.

```
// 1. Define the toolconst getWeather = (location: string) => {  /* Gets the weather for a given location. */  return `The weather in ${location} is sunny.`;};// 2. Send the request with toolslet interaction = await ai.interactions.create({  model: 'gemini-2.5-flash',  input: 'What is the weather in Mountain View, CA?',  tools: [    {      type: 'function',      name: 'get_weather',      description: 'Gets the weather for a given location.',      parameters: {        type: 'object',        properties: {          location: {            type: 'string',            description: 'The city and state, e.g. San Francisco, CA',          },        },        required: ['location'],      },    },  ],});// 3. Handle the tool callfor (const output of interaction.outputs!) {  if (output.type === 'function_call') {    console.log(        `Tool Call: ${output.name}(${JSON.stringify(output.arguments)})`);    // Execute your actual function here    // Note: ensure arguments match your function signature    const result = getWeather(JSON.stringify(output.arguments.location));    // Send result back to the model    interaction = await ai.interactions.create({      model: 'gemini-2.5-flash',      previous_interaction_id: interaction.id,      input: [        {          type: 'function_result',          name: output.name,          call_id: output.id,          result: result,        },      ],    });    console.debug(`Response: ${JSON.stringify(interaction)}`);  }}
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Built-in Tools[](https://googleapis.github.io/js-genai/release_docs/index.html#built-in-tools)

You can also use Google's built-in tools, such as **Google Search** or **Code Execution**.

[](https://googleapis.github.io/js-genai/release_docs/index.html)
#### Grounding with Google Search[](https://googleapis.github.io/js-genai/release_docs/index.html#grounding-with-google-search)

```
const interaction = await ai.interactions.create({  model: 'gemini-2.5-flash',  input: 'Who won the last Super Bowl',  tools: [{ type: 'google_search' }],});console.debug(interaction);
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
#### Code Execution[](https://googleapis.github.io/js-genai/release_docs/index.html#code-execution)

```
const interaction = await ai.interactions.create({  model: 'gemini-2.5-flash',  input: 'Calculate the 50th Fibonacci number.',  tools: [{ type: 'code_execution' }],});console.debug(interaction);
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
### Multimodal Output[](https://googleapis.github.io/js-genai/release_docs/index.html#multimodal-output)

The Interactions API can generate multimodal outputs, such as images. You must specify the `response_modalities`.

```
import * as fs from 'fs';const interaction = await ai.interactions.create({  model: 'gemini-3-pro-image-preview',  input: 'Generate an image of a futuristic city.',  response_modalities: ['image'],});for (const output of interaction.outputs!) {  if (output.type === 'image') {    console.log(`Generated image with mime_type: ${output.mime_type}`);    // Save the image    fs.writeFileSync(        'generated_city.png', Buffer.from(output.data!, 'base64'));  }}
```
Copy[](https://googleapis.github.io/js-genai/release_docs/index.html)
How is this different from the other Google AI SDKs[](https://googleapis.github.io/js-genai/release_docs/index.html#how-is-this-different-from-the-other-google-ai-sdks)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

This SDK (`@google/genai`) is Google Deepmind’s "vanilla" SDK for its generative AI offerings, and is where Google Deepmind adds new AI features.

Models hosted either on the [Vertex AI platform](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview) or the [Gemini Developer platform](https://ai.google.dev/gemini-api/docs) are accessible through this SDK.

Other SDKs may be offering additional AI frameworks on top of this SDK, or may be targeting specific project environments (like Firebase).

The `@google/generative_language` and `@google-cloud/vertexai` SDKs are previous iterations of this SDK and are no longer receiving new Gemini 2.0+ features.

### Settings

Theme 

### On This Page

[Google Gen AI SDK for Type Script and Java Script](https://googleapis.github.io/js-genai/release_docs/index.html#google-gen-ai-sdk-for-typescript-and-javascript)
*   [Code Generation](https://googleapis.github.io/js-genai/release_docs/index.html#code-generation)
*   [Prerequisites](https://googleapis.github.io/js-genai/release_docs/index.html#prerequisites)
*       *   [The following are required for Vertex AI users (excluding Vertex AI Studio)](https://googleapis.github.io/js-genai/release_docs/index.html#the-following-are-required-for-vertex-ai-users-excluding-vertex-ai-studio)

*   [Installation](https://googleapis.github.io/js-genai/release_docs/index.html#installation)
*   [Quickstart](https://googleapis.github.io/js-genai/release_docs/index.html#quickstart)
*   [Initialization](https://googleapis.github.io/js-genai/release_docs/index.html#initialization)
*       *   [Gemini Developer API](https://googleapis.github.io/js-genai/release_docs/index.html#gemini-developer-api)
    *           *   [Browser](https://googleapis.github.io/js-genai/release_docs/index.html#browser)

    *   [Vertex AI](https://googleapis.github.io/js-genai/release_docs/index.html#vertex-ai)
    *   [(Optional) (NodeJS only) Using environment variables:](https://googleapis.github.io/js-genai/release_docs/index.html#optional-nodejs-only-using-environment-variables)

*   [API Selection](https://googleapis.github.io/js-genai/release_docs/index.html#api-selection)
*   [Google GenAI overview](https://googleapis.github.io/js-genai/release_docs/index.html#googlegenai-overview)
*   [Samples](https://googleapis.github.io/js-genai/release_docs/index.html#samples)
*       *   [Streaming](https://googleapis.github.io/js-genai/release_docs/index.html#streaming)
    *   [Function Calling](https://googleapis.github.io/js-genai/release_docs/index.html#function-calling)
    *           *   [Model Context Protocol (MCP) support (experimental)](https://googleapis.github.io/js-genai/release_docs/index.html#model-context-protocol-mcp-support-experimental)

    *   [Generate Content](https://googleapis.github.io/js-genai/release_docs/index.html#generate-content)
    *           *   [How to structure contents argument for generate Content](https://googleapis.github.io/js-genai/release_docs/index.html#how-to-structure-contents-argument-for-generatecontent)
        *   [Content](https://googleapis.github.io/js-genai/release_docs/index.html#content)
        *   [Part](https://googleapis.github.io/js-genai/release_docs/index.html#part)

*   [Error Handling](https://googleapis.github.io/js-genai/release_docs/index.html#error-handling)
*   [Interactions (Preview)](https://googleapis.github.io/js-genai/release_docs/index.html#interactions-preview)
*       *   [Basic Interaction](https://googleapis.github.io/js-genai/release_docs/index.html#basic-interaction)
    *   [Stateful Conversation](https://googleapis.github.io/js-genai/release_docs/index.html#stateful-conversation)
    *   [Agents (Deep Research)](https://googleapis.github.io/js-genai/release_docs/index.html#agents-deep-research)
    *   [Multimodal Input](https://googleapis.github.io/js-genai/release_docs/index.html#multimodal-input)
    *   [Function Calling](https://googleapis.github.io/js-genai/release_docs/index.html#function-calling-1)
    *   [Built-in Tools](https://googleapis.github.io/js-genai/release_docs/index.html#built-in-tools)
    *           *   [Grounding with Google Search](https://googleapis.github.io/js-genai/release_docs/index.html#grounding-with-google-search)
        *   [Code Execution](https://googleapis.github.io/js-genai/release_docs/index.html#code-execution)

    *   [Multimodal Output](https://googleapis.github.io/js-genai/release_docs/index.html#multimodal-output)

*   [How is this different from the other Google AI SDKs](https://googleapis.github.io/js-genai/release_docs/index.html#how-is-this-different-from-the-other-google-ai-sdks)

[@google/genai](https://googleapis.github.io/js-genai/release_docs/modules.html)
*   
[batches](https://googleapis.github.io/js-genai/release_docs/modules/batches.html)

    *   [Batches](https://googleapis.github.io/js-genai/release_docs/classes/batches.Batches.html)

*   
[caches](https://googleapis.github.io/js-genai/release_docs/modules/caches.html)

    *   [Caches](https://googleapis.github.io/js-genai/release_docs/classes/caches.Caches.html)

*   
[chats](https://googleapis.github.io/js-genai/release_docs/modules/chats.html)

    *   [Chat](https://googleapis.github.io/js-genai/release_docs/classes/chats.Chat.html)
    *   [Chats](https://googleapis.github.io/js-genai/release_docs/classes/chats.Chats.html)

*   
[client](https://googleapis.github.io/js-genai/release_docs/modules/client.html)

    *   [GoogleGenAI](https://googleapis.github.io/js-genai/release_docs/classes/client.GoogleGenAI.html)
    *   [GoogleGenAIOptions](https://googleapis.github.io/js-genai/release_docs/interfaces/client.GoogleGenAIOptions.html)

*   
[documents](https://googleapis.github.io/js-genai/release_docs/modules/documents.html)

    *   [Documents](https://googleapis.github.io/js-genai/release_docs/classes/documents.Documents.html)

*   
[errors](https://googleapis.github.io/js-genai/release_docs/modules/errors.html)

    *   [ApiError](https://googleapis.github.io/js-genai/release_docs/classes/errors.ApiError.html)
    *   [ApiErrorInfo](https://googleapis.github.io/js-genai/release_docs/interfaces/errors.ApiErrorInfo.html)

*   
[files](https://googleapis.github.io/js-genai/release_docs/modules/files.html)

    *   [Files](https://googleapis.github.io/js-genai/release_docs/classes/files.Files.html)

*   
[filesearchstores](https://googleapis.github.io/js-genai/release_docs/modules/filesearchstores.html)

    *   [FileSearchStores](https://googleapis.github.io/js-genai/release_docs/classes/filesearchstores.FileSearchStores.html)

*   
[interactions](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html)

    *   [APIConnectionError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#apiconnectionerror)
    *   [APIConnectionTimeoutError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#apiconnectiontimeouterror)
    *   [APIError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#apierror)
    *   [APIPromise](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#apipromise)
    *   [APIUserAbortError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#apiuseraborterror)
    *   [AuthenticationError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#authenticationerror)
    *   [BadRequestError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#badrequesterror)
    *   [BaseGeminiNextGenAPIClient](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#basegemininextgenapiclient)
    *   [BlobLikePart](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#bloblikepart)
    *   [ClientOptions](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#clientoptions)
    *   [ConflictError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#conflicterror)
    *   [default](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#default)
    *   [GeminiNextGenAPIClient](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#gemininextgenapiclient)
    *   [GeminiNextGenAPIClientError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#gemininextgenapiclienterror)
    *   [InternalServerError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#internalservererror)
    *   [NotFoundError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#notfounderror)
    *   [PermissionDeniedError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#permissiondeniederror)
    *   [RateLimitError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#ratelimiterror)
    *   [toFile](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#tofile)
    *   [UnprocessableEntityError](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#unprocessableentityerror)
    *   [Uploadable](https://googleapis.github.io/js-genai/release_docs/modules/interactions.html#uploadable)
    *   
[api-promise](https://googleapis.github.io/js-genai/release_docs/modules/interactions_api-promise.html)

        *   [APIPromise](https://googleapis.github.io/js-genai/release_docs/modules/interactions_api-promise.html#apipromise)

    *   
[client](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.html)

        *   
[GeminiNextGenAPIClient](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html)

            *   
[Interactions](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.html)

                *   
[ContentDelta](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.html)

                    *   
[FileSearchResultDelta](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.FileSearchResultDelta.html)

                        *   [Result](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.FileSearchResultDelta.Result.html)

                    *   
[FunctionResultDelta](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.FunctionResultDelta.html)

                        *   [Items](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.FunctionResultDelta.Items.html)

                    *   
[MCPServerToolResultDelta](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.MCPServerToolResultDelta.html)

                        *   [Items](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.MCPServerToolResultDelta.Items.html)

                    *   [AudioDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.AudioDelta.html)
                    *   [CodeExecutionCallDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.CodeExecutionCallDelta.html)
                    *   [CodeExecutionResultDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.CodeExecutionResultDelta.html)
                    *   [DocumentDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.DocumentDelta.html)
                    *   [FileSearchResultDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.FileSearchResultDelta-1.html)
                    *   [FunctionCallDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.FunctionCallDelta.html)
                    *   [FunctionResultDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.FunctionResultDelta-1.html)
                    *   [GoogleSearchCallDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.GoogleSearchCallDelta.html)
                    *   [GoogleSearchResultDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.GoogleSearchResultDelta.html)
                    *   [ImageDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.ImageDelta.html)
                    *   [MCPServerToolCallDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.MCPServerToolCallDelta.html)
                    *   [MCPServerToolResultDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.MCPServerToolResultDelta-1.html)
                    *   [TextDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.TextDelta.html)
                    *   [ThoughtSignatureDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.ThoughtSignatureDelta.html)
                    *   [ThoughtSummaryDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.ThoughtSummaryDelta.html)
                    *   [URLContextCallDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.URLContextCallDelta.html)
                    *   [URLContextResultDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.URLContextResultDelta.html)
                    *   [VideoDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta.VideoDelta.html)

                *   
[ErrorEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.ErrorEvent.html)

                    *   [Error](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ErrorEvent.Error.html)

                *   
[FileSearchResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.FileSearchResultContent.html)

                    *   [Result](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.FileSearchResultContent.Result.html)

                *   
[FunctionResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.FunctionResultContent.html)

                    *   [Items](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.FunctionResultContent.Items.html)

                *   
[InteractionGetParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionGetParams.html)

                    *   [InteractionGetParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionGetParams.InteractionGetParamsNonStreaming.html)
                    *   [InteractionGetParamsStreaming](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionGetParams.InteractionGetParamsStreaming.html)

                *   
[MCPServerToolResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.MCPServerToolResultContent.html)

                    *   [Items](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.MCPServerToolResultContent.Items.html)

                *   
[Tool](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.Tool.html)

                    *   [CodeExecution](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Tool.CodeExecution.html)
                    *   [ComputerUse](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Tool.ComputerUse.html)
                    *   [FileSearch](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Tool.FileSearch.html)
                    *   [GoogleSearch](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Tool.GoogleSearch.html)
                    *   [MCPServer](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Tool.MCPServer.html)
                    *   [URLContext](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Tool.URLContext.html)

                *   
[Usage](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.Interactions.Usage.html)

                    *   [CachedTokensByModality](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Usage.CachedTokensByModality.html)
                    *   [InputTokensByModality](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Usage.InputTokensByModality.html)
                    *   [OutputTokensByModality](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Usage.OutputTokensByModality.html)
                    *   [ToolUseTokensByModality](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Usage.ToolUseTokensByModality.html)

                *   [AllowedTools](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.AllowedTools.html)
                *   [Annotation](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Annotation.html)
                *   [AudioContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.AudioContent.html)
                *   [CodeExecutionCallArguments](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.CodeExecutionCallArguments.html)
                *   [CodeExecutionCallContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.CodeExecutionCallContent.html)
                *   [CodeExecutionResultContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.CodeExecutionResultContent.html)
                *   [ContentDelta](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentDelta-1.html)
                *   [ContentStart](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentStart.html)
                *   [ContentStop](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ContentStop.html)
                *   [CreateAgentInteractionParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.CreateAgentInteractionParamsNonStreaming.html)
                *   [CreateAgentInteractionParamsStreaming](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.CreateAgentInteractionParamsStreaming.html)
                *   [CreateModelInteractionParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.CreateModelInteractionParamsNonStreaming.html)
                *   [CreateModelInteractionParamsStreaming](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.CreateModelInteractionParamsStreaming.html)
                *   [DeepResearchAgentConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.DeepResearchAgentConfig.html)
                *   [DocumentContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.DocumentContent.html)
                *   [DynamicAgentConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.DynamicAgentConfig.html)
                *   [ErrorEvent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ErrorEvent-1.html)
                *   [FileSearchResultContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.FileSearchResultContent-1.html)
                *   [Function](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Function.html)
                *   [FunctionCallContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.FunctionCallContent.html)
                *   [FunctionResultContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.FunctionResultContent-1.html)
                *   [GenerationConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.GenerationConfig.html)
                *   [GoogleSearchCallArguments](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.GoogleSearchCallArguments.html)
                *   [GoogleSearchCallContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.GoogleSearchCallContent.html)
                *   [GoogleSearchResult](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.GoogleSearchResult.html)
                *   [GoogleSearchResultContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.GoogleSearchResultContent.html)
                *   [ImageContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ImageContent.html)
                *   [Interaction](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Interaction.html)
                *   [InteractionCancelParams](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionCancelParams.html)
                *   [InteractionDeleteParams](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionDeleteParams.html)
                *   [InteractionEvent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionEvent.html)
                *   [InteractionGetParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionGetParamsNonStreaming.html)
                *   [InteractionGetParamsStreaming](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionGetParamsStreaming.html)
                *   [InteractionStatusUpdate](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionStatusUpdate.html)
                *   [MCPServerToolCallContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.MCPServerToolCallContent.html)
                *   [MCPServerToolResultContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.MCPServerToolResultContent-1.html)
                *   [SpeechConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.SpeechConfig.html)
                *   [TextContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.TextContent.html)
                *   [ThoughtContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ThoughtContent.html)
                *   [ToolChoiceConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.ToolChoiceConfig.html)
                *   [Turn](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Turn.html)
                *   [URLContextCallArguments](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.URLContextCallArguments.html)
                *   [URLContextCallContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.URLContextCallContent.html)
                *   [URLContextResult](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.URLContextResult.html)
                *   [URLContextResultContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.URLContextResultContent.html)
                *   [Usage](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.Usage-1.html)
                *   [VideoContent](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.GeminiNextGenAPIClient.Interactions.VideoContent.html)
                *   [AudioMimeType](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.AudioMimeType.html)
                *   [DocumentMimeType](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.DocumentMimeType.html)
                *   [ImageMimeType](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.ImageMimeType.html)
                *   [InteractionCreateParams](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionCreateParams.html)
                *   [InteractionDeleteResponse](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionDeleteResponse.html)
                *   [InteractionGetParams](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionGetParams-1.html)
                *   [InteractionSSEEvent](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.InteractionSSEEvent.html)
                *   [Model](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.Model.html)
                *   [ThinkingLevel](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.ThinkingLevel.html)
                *   [Tool](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.Tool-1.html)
                *   [ToolChoice](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.ToolChoice.html)
                *   [ToolChoiceType](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.ToolChoiceType.html)
                *   [VideoMimeType](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.Interactions.VideoMimeType.html)

            *   [Interactions](https://googleapis.github.io/js-genai/release_docs/classes/interactions_client.GeminiNextGenAPIClient.Interactions-1.html)
            *   [RequestOptions](https://googleapis.github.io/js-genai/release_docs/types/interactions_client.GeminiNextGenAPIClient.RequestOptions.html)
            *   [AllowedTools](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#allowedtools)
            *   [Annotation](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#annotation)
            *   [AudioContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#audiocontent)
            *   [AudioMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#audiomimetype)
            *   [CodeExecutionCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#codeexecutioncallarguments)
            *   [CodeExecutionCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#codeexecutioncallcontent)
            *   [CodeExecutionResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#codeexecutionresultcontent)
            *   [ContentDelta](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#contentdelta)
            *   [ContentStart](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#contentstart)
            *   [ContentStop](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#contentstop)
            *   [CreateAgentInteractionParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#createagentinteractionparamsnonstreaming)
            *   [CreateAgentInteractionParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#createagentinteractionparamsstreaming)
            *   [CreateModelInteractionParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#createmodelinteractionparamsnonstreaming)
            *   [CreateModelInteractionParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#createmodelinteractionparamsstreaming)
            *   [DeepResearchAgentConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#deepresearchagentconfig)
            *   [DocumentContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#documentcontent)
            *   [DocumentMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#documentmimetype)
            *   [DynamicAgentConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#dynamicagentconfig)
            *   [ErrorEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#errorevent)
            *   [FileSearchResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#filesearchresultcontent)
            *   [Function](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#function)
            *   [FunctionCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#functioncallcontent)
            *   [FunctionResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#functionresultcontent)
            *   [GenerationConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#generationconfig)
            *   [GoogleSearchCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#googlesearchcallarguments)
            *   [GoogleSearchCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#googlesearchcallcontent)
            *   [GoogleSearchResult](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#googlesearchresult)
            *   [GoogleSearchResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#googlesearchresultcontent)
            *   [ImageContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#imagecontent)
            *   [ImageMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#imagemimetype)
            *   [Interaction](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#interaction)
            *   [InteractionCancelParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#interactioncancelparams)
            *   [InteractionCreateParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#interactioncreateparams)
            *   [InteractionDeleteParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#interactiondeleteparams)
            *   [InteractionDeleteResponse](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#interactiondeleteresponse)
            *   [InteractionEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#interactionevent)
            *   [InteractionGetParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#interactiongetparams)
            *   [InteractionGetParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#interactiongetparamsnonstreaming)
            *   [InteractionGetParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#interactiongetparamsstreaming)
            *   [InteractionSSEEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#interactionsseevent)
            *   [InteractionStatusUpdate](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#interactionstatusupdate)
            *   [MCPServerToolCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#mcpservertoolcallcontent)
            *   [MCPServerToolResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#mcpservertoolresultcontent)
            *   [Model](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#model)
            *   [SpeechConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#speechconfig)
            *   [TextContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#textcontent)
            *   [ThinkingLevel](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#thinkinglevel)
            *   [ThoughtContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#thoughtcontent)
            *   [Tool](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#tool)
            *   [ToolChoice](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#toolchoice)
            *   [ToolChoiceConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#toolchoiceconfig)
            *   [ToolChoiceType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#toolchoicetype)
            *   [Turn](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#turn)
            *   [URLContextCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#urlcontextcallarguments)
            *   [URLContextCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#urlcontextcallcontent)
            *   [URLContextResult](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#urlcontextresult)
            *   [URLContextResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#urlcontextresultcontent)
            *   [Usage](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#usage)
            *   [VideoContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#videocontent)
            *   [VideoMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.GeminiNextGenAPIClient.html#videomimetype)

        *   [BaseGeminiNextGenAPIClient](https://googleapis.github.io/js-genai/release_docs/classes/interactions_client.BaseGeminiNextGenAPIClient.html)
        *   [GeminiNextGenAPIClient](https://googleapis.github.io/js-genai/release_docs/classes/interactions_client.GeminiNextGenAPIClient-1.html)
        *   [ClientOptions](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client.ClientOptions.html)
        *   [Logger](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.html#logger)
        *   [LogLevel](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client.html#loglevel)

    *   
[client-adapter](https://googleapis.github.io/js-genai/release_docs/modules/interactions_client-adapter.html)

        *   [GeminiNextGenAPIClientAdapter](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_client-adapter.GeminiNextGenAPIClientAdapter.html)

    *   
core

        *   
[api-promise](https://googleapis.github.io/js-genai/release_docs/modules/interactions_core_api-promise.html)

            *   [APIPromise](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_api-promise.APIPromise.html)

        *   
[error](https://googleapis.github.io/js-genai/release_docs/modules/interactions_core_error.html)

            *   [APIConnectionError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.APIConnectionError.html)
            *   [APIConnectionTimeoutError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.APIConnectionTimeoutError.html)
            *   [APIError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.APIError.html)
            *   [APIUserAbortError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.APIUserAbortError.html)
            *   [AuthenticationError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.AuthenticationError.html)
            *   [BadRequestError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.BadRequestError.html)
            *   [ConflictError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.ConflictError.html)
            *   [GeminiNextGenAPIClientError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.GeminiNextGenAPIClientError.html)
            *   [InternalServerError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.InternalServerError.html)
            *   [NotFoundError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.NotFoundError.html)
            *   [PermissionDeniedError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.PermissionDeniedError.html)
            *   [RateLimitError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.RateLimitError.html)
            *   [UnprocessableEntityError](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_error.UnprocessableEntityError.html)

        *   
[resource](https://googleapis.github.io/js-genai/release_docs/modules/interactions_core_resource.html)

            *   [APIResource](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_resource.APIResource.html)

        *   
[streaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_core_streaming.html)

            *   [Stream](https://googleapis.github.io/js-genai/release_docs/classes/interactions_core_streaming.Stream.html)
            *   [ServerSentEvent](https://googleapis.github.io/js-genai/release_docs/types/interactions_core_streaming.ServerSentEvent.html)
            *   [_iterSSEMessages](https://googleapis.github.io/js-genai/release_docs/functions/interactions_core_streaming._iterSSEMessages.html)

        *   
[uploads](https://googleapis.github.io/js-genai/release_docs/modules/interactions_core_uploads.html)

            *   [BlobLikePart](https://googleapis.github.io/js-genai/release_docs/modules/interactions_core_uploads.html#bloblikepart)
            *   [toFile](https://googleapis.github.io/js-genai/release_docs/modules/interactions_core_uploads.html#tofile)
            *   [ToFileInput](https://googleapis.github.io/js-genai/release_docs/modules/interactions_core_uploads.html#tofileinput)
            *   [Uploadable](https://googleapis.github.io/js-genai/release_docs/modules/interactions_core_uploads.html#uploadable)

    *   
[error](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html)

        *   [APIConnectionError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#apiconnectionerror)
        *   [APIConnectionTimeoutError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#apiconnectiontimeouterror)
        *   [APIError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#apierror)
        *   [APIUserAbortError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#apiuseraborterror)
        *   [AuthenticationError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#authenticationerror)
        *   [BadRequestError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#badrequesterror)
        *   [ConflictError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#conflicterror)
        *   [GeminiNextGenAPIClientError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#gemininextgenapiclienterror)
        *   [InternalServerError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#internalservererror)
        *   [NotFoundError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#notfounderror)
        *   [PermissionDeniedError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#permissiondeniederror)
        *   [RateLimitError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#ratelimiterror)
        *   [UnprocessableEntityError](https://googleapis.github.io/js-genai/release_docs/modules/interactions_error.html#unprocessableentityerror)

    *   
internal

        *   
[builtin-types](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_builtin-types.html)

            *   [BlobPropertyBag](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_internal_builtin-types.BlobPropertyBag.html)
            *   [FilePropertyBag](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_internal_builtin-types.FilePropertyBag.html)
            *   [Array](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_builtin-types.Array.html)
            *   [BodyInit](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_builtin-types.BodyInit.html)
            *   [Fetch](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_builtin-types.Fetch.html)
            *   [HeadersInit](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_builtin-types.HeadersInit.html)
            *   [Record](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_builtin-types.Record.html)
            *   [RequestInfo](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_builtin-types.RequestInfo.html)
            *   [RequestInit](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_builtin-types.RequestInit.html)
            *   [Response](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_builtin-types.Response.html)

        *   
[decoders/line](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_decoders_line.html)

            *   [LineDecoder](https://googleapis.github.io/js-genai/release_docs/classes/interactions_internal_decoders_line.LineDecoder.html)
            *   [Bytes](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_decoders_line.Bytes.html)
            *   [findDoubleNewlineIndex](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_decoders_line.findDoubleNewlineIndex.html)

        *   
[detect-platform](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_detect-platform.html)

            *   [getPlatformHeaders](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_detect-platform.getPlatformHeaders.html)
            *   [isRunningInBrowser](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_detect-platform.isRunningInBrowser.html)

        *   
[errors](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_errors.html)

            *   [castToError](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_errors.castToError.html)
            *   [isAbortError](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_errors.isAbortError.html)

        *   
[headers](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_headers.html)

            *   [HeadersLike](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_headers.HeadersLike.html)
            *   [buildHeaders](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_headers.buildHeaders.html)
            *   [isEmptyHeaders](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_headers.isEmptyHeaders.html)

        *   
[parse](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_parse.html)

            *   [APIResponseProps](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_parse.APIResponseProps.html)
            *   [defaultParseResponse](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_parse.defaultParseResponse.html)

        *   
[request-options](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_request-options.html)

            *   [EncodedContent](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_request-options.EncodedContent.html)
            *   [FinalRequestOptions](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_request-options.FinalRequestOptions.html)
            *   [RequestEncoder](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_request-options.RequestEncoder.html)
            *   [RequestOptions](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_request-options.RequestOptions.html)
            *   [FallbackEncoder](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_request-options.FallbackEncoder.html)

        *   
[shim-types](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_shim-types.html)

            *   [ReadableStream](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_shim-types.ReadableStream.html)

        *   
[shims](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_shims.html)

            *   [CancelReadableStream](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_shims.CancelReadableStream.html)
            *   [getDefaultFetch](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_shims.getDefaultFetch.html)
            *   [makeReadableStream](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_shims.makeReadableStream.html)
            *   [ReadableStreamFrom](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_shims.ReadableStreamFrom.html)
            *   [ReadableStreamToAsyncIterable](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_shims.ReadableStreamToAsyncIterable.html)

        *   
[to-file](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_to-file.html)

            *   [BlobLike](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_internal_to-file.BlobLike.html)
            *   [ResponseLike](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_internal_to-file.ResponseLike.html)
            *   [BlobLikePart](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_to-file.BlobLikePart.html)
            *   [ToFileInput](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_to-file.ToFileInput.html)
            *   [toFile](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_to-file.toFile.html)

        *   
[types](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_types.html)

            *   [FinalizedRequestInit](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_types.FinalizedRequestInit.html)
            *   [HTTPMethod](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_types.HTTPMethod.html)
            *   [KeysEnum](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_types.KeysEnum.html)
            *   [MergedRequestInit](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_types.MergedRequestInit.html)
            *   [PromiseOrValue](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_types.PromiseOrValue.html)

        *   
[uploads](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_uploads.html)

            *   [BlobPart](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_uploads.BlobPart.html)
            *   [Uploadable](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_uploads.Uploadable.html)
            *   [checkFileSupport](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_uploads.checkFileSupport.html)
            *   [createForm](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_uploads.createForm.html)
            *   [getName](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_uploads.getName.html)
            *   [isAsyncIterable](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_uploads.isAsyncIterable.html)
            *   [makeFile](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_uploads.makeFile.html)
            *   [maybeMultipartFormRequestOptions](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_uploads.maybeMultipartFormRequestOptions.html)
            *   [multipartFormRequestOptions](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_uploads.multipartFormRequestOptions.html)

        *   
[utils](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html)

            *   [coerceBoolean](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#coerceboolean)
            *   [coerceFloat](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#coercefloat)
            *   [coerceInteger](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#coerceinteger)
            *   [ensurePresent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#ensurepresent)
            *   [formatRequestDetails](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#formatrequestdetails)
            *   [fromBase64](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#frombase64)
            *   [hasOwn](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#hasown)
            *   [isAbsoluteURL](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#isabsoluteurl)
            *   [isArray](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#isarray)
            *   [isEmptyObj](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#isemptyobj)
            *   [isObj](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#isobj)
            *   [isReadonlyArray](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#isreadonlyarray)
            *   [Logger](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#logger)
            *   [loggerFor](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#loggerfor)
            *   [LogLevel](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#loglevel)
            *   [maybeCoerceBoolean](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#maybecoerceboolean)
            *   [maybeCoerceFloat](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#maybecoercefloat)
            *   [maybeCoerceInteger](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#maybecoerceinteger)
            *   [maybeObj](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#maybeobj)
            *   [parseLogLevel](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#parseloglevel)
            *   [readEnv](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#readenv)
            *   [safeJSON](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#safejson)
            *   [sleep](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#sleep)
            *   [toBase64](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#tobase64)
            *   [uuid4](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#uuid4)
            *   [validatePositiveInteger](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils.html#validatepositiveinteger)
            *   
[base64](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils_base64.html)

                *   [fromBase64](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_base64.fromBase64.html)
                *   [toBase64](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_base64.toBase64.html)

            *   
[bytes](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils_bytes.html)

                *   [concatBytes](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_bytes.concatBytes.html)
                *   [decodeUTF8](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_bytes.decodeUTF8.html)
                *   [encodeUTF8](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_bytes.encodeUTF8.html)

            *   
[env](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils_env.html)

                *   [readEnv](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_env.readEnv.html)

            *   
[log](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils_log.html)

                *   [Logger](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_utils_log.Logger.html)
                *   [LogLevel](https://googleapis.github.io/js-genai/release_docs/types/interactions_internal_utils_log.LogLevel.html)
                *   [formatRequestDetails](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_log.formatRequestDetails.html)
                *   [loggerFor](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_log.loggerFor.html)
                *   [parseLogLevel](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_log.parseLogLevel.html)

            *   
[path](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils_path.html)

                *   [createPathTagFunction](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_path.createPathTagFunction.html)
                *   [encodeURIPath](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_path.encodeURIPath.html)
                *   [path](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_path.path.html)

            *   
[sleep](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils_sleep.html)

                *   [sleep](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_sleep.sleep.html)

            *   
[uuid](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils_uuid.html)

                *   [uuid4](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_uuid.uuid4.html)

            *   
[values](https://googleapis.github.io/js-genai/release_docs/modules/interactions_internal_utils_values.html)

                *   [coerceBoolean](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.coerceBoolean.html)
                *   [coerceFloat](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.coerceFloat.html)
                *   [coerceInteger](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.coerceInteger.html)
                *   [ensurePresent](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.ensurePresent.html)
                *   [hasOwn](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.hasOwn.html)
                *   [isAbsoluteURL](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.isAbsoluteURL.html)
                *   [isArray](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.isArray.html)
                *   [isEmptyObj](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.isEmptyObj.html)
                *   [isObj](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.isObj.html)
                *   [isReadonlyArray](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.isReadonlyArray.html)
                *   [maybeCoerceBoolean](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.maybeCoerceBoolean.html)
                *   [maybeCoerceFloat](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.maybeCoerceFloat.html)
                *   [maybeCoerceInteger](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.maybeCoerceInteger.html)
                *   [maybeObj](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.maybeObj.html)
                *   [safeJSON](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.safeJSON.html)
                *   [validatePositiveInteger](https://googleapis.github.io/js-genai/release_docs/functions/interactions_internal_utils_values.validatePositiveInteger.html)

    *   
[resource](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resource.html)

        *   [APIResource](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resource.html#apiresource)

    *   
[resources](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html)

        *   [AllowedTools](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#allowedtools)
        *   [Annotation](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#annotation)
        *   [AudioContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#audiocontent)
        *   [AudioMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#audiomimetype)
        *   [BaseInteractions](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#baseinteractions)
        *   [CodeExecutionCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#codeexecutioncallarguments)
        *   [CodeExecutionCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#codeexecutioncallcontent)
        *   [CodeExecutionResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#codeexecutionresultcontent)
        *   [ContentDelta](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#contentdelta)
        *   [ContentStart](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#contentstart)
        *   [ContentStop](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#contentstop)
        *   [CreateAgentInteractionParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#createagentinteractionparamsnonstreaming)
        *   [CreateAgentInteractionParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#createagentinteractionparamsstreaming)
        *   [CreateModelInteractionParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#createmodelinteractionparamsnonstreaming)
        *   [CreateModelInteractionParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#createmodelinteractionparamsstreaming)
        *   [DeepResearchAgentConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#deepresearchagentconfig)
        *   [DocumentContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#documentcontent)
        *   [DocumentMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#documentmimetype)
        *   [DynamicAgentConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#dynamicagentconfig)
        *   [ErrorEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#errorevent)
        *   [FileSearchResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#filesearchresultcontent)
        *   [Function](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#function)
        *   [FunctionCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#functioncallcontent)
        *   [FunctionResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#functionresultcontent)
        *   [GenerationConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#generationconfig)
        *   [GoogleSearchCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#googlesearchcallarguments)
        *   [GoogleSearchCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#googlesearchcallcontent)
        *   [GoogleSearchResult](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#googlesearchresult)
        *   [GoogleSearchResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#googlesearchresultcontent)
        *   [ImageContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#imagecontent)
        *   [ImageMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#imagemimetype)
        *   [Interaction](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interaction)
        *   [InteractionCancelParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interactioncancelparams)
        *   [InteractionCreateParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interactioncreateparams)
        *   [InteractionDeleteParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interactiondeleteparams)
        *   [InteractionDeleteResponse](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interactiondeleteresponse)
        *   [InteractionEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interactionevent)
        *   [InteractionGetParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interactiongetparams)
        *   [InteractionGetParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interactiongetparamsnonstreaming)
        *   [InteractionGetParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interactiongetparamsstreaming)
        *   [Interactions](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interactions)
        *   [InteractionSSEEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interactionsseevent)
        *   [InteractionStatusUpdate](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#interactionstatusupdate)
        *   [MCPServerToolCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#mcpservertoolcallcontent)
        *   [MCPServerToolResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#mcpservertoolresultcontent)
        *   [Model](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#model)
        *   [SpeechConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#speechconfig)
        *   [TextContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#textcontent)
        *   [ThinkingLevel](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#thinkinglevel)
        *   [ThoughtContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#thoughtcontent)
        *   [Tool](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#tool)
        *   [ToolChoice](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#toolchoice)
        *   [ToolChoiceConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#toolchoiceconfig)
        *   [ToolChoiceType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#toolchoicetype)
        *   [Turn](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#turn)
        *   [URLContextCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#urlcontextcallarguments)
        *   [URLContextCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#urlcontextcallcontent)
        *   [URLContextResult](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#urlcontextresult)
        *   [URLContextResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#urlcontextresultcontent)
        *   [Usage](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#usage)
        *   [VideoContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#videocontent)
        *   [VideoMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources.html#videomimetype)
        *   
[interactions](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html)

            *   [BaseInteractions](https://googleapis.github.io/js-genai/release_docs/classes/interactions_resources_interactions.BaseInteractions.html)
            *   [BaseCreateAgentInteractionParams](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_resources_interactions.BaseCreateAgentInteractionParams.html)
            *   [BaseCreateModelInteractionParams](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_resources_interactions.BaseCreateModelInteractionParams.html)
            *   [InteractionGetParamsBase](https://googleapis.github.io/js-genai/release_docs/interfaces/interactions_resources_interactions.InteractionGetParamsBase.html)
            *   [AllowedTools](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#allowedtools)
            *   [Annotation](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#annotation)
            *   [AudioContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#audiocontent)
            *   [AudioMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#audiomimetype)
            *   [CodeExecutionCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#codeexecutioncallarguments)
            *   [CodeExecutionCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#codeexecutioncallcontent)
            *   [CodeExecutionResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#codeexecutionresultcontent)
            *   [ContentDelta](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#contentdelta)
            *   [ContentStart](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#contentstart)
            *   [ContentStop](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#contentstop)
            *   [CreateAgentInteractionParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#createagentinteractionparamsnonstreaming)
            *   [CreateAgentInteractionParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#createagentinteractionparamsstreaming)
            *   [CreateModelInteractionParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#createmodelinteractionparamsnonstreaming)
            *   [CreateModelInteractionParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#createmodelinteractionparamsstreaming)
            *   [DeepResearchAgentConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#deepresearchagentconfig)
            *   [DocumentContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#documentcontent)
            *   [DocumentMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#documentmimetype)
            *   [DynamicAgentConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#dynamicagentconfig)
            *   [ErrorEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#errorevent)
            *   [FileSearchResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#filesearchresultcontent)
            *   [Function](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#function)
            *   [FunctionCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#functioncallcontent)
            *   [FunctionResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#functionresultcontent)
            *   [GenerationConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#generationconfig)
            *   [GoogleSearchCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#googlesearchcallarguments)
            *   [GoogleSearchCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#googlesearchcallcontent)
            *   [GoogleSearchResult](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#googlesearchresult)
            *   [GoogleSearchResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#googlesearchresultcontent)
            *   [ImageContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#imagecontent)
            *   [ImageMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#imagemimetype)
            *   [Interaction](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interaction)
            *   [InteractionCancelParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interactioncancelparams)
            *   [InteractionCreateParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interactioncreateparams)
            *   [InteractionDeleteParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interactiondeleteparams)
            *   [InteractionDeleteResponse](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interactiondeleteresponse)
            *   [InteractionEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interactionevent)
            *   [InteractionGetParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interactiongetparams)
            *   [InteractionGetParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interactiongetparamsnonstreaming)
            *   [InteractionGetParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interactiongetparamsstreaming)
            *   [Interactions](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interactions)
            *   [InteractionSSEEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interactionsseevent)
            *   [InteractionStatusUpdate](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#interactionstatusupdate)
            *   [MCPServerToolCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#mcpservertoolcallcontent)
            *   [MCPServerToolResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#mcpservertoolresultcontent)
            *   [Model](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#model)
            *   [SpeechConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#speechconfig)
            *   [TextContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#textcontent)
            *   [ThinkingLevel](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#thinkinglevel)
            *   [ThoughtContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#thoughtcontent)
            *   [Tool](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#tool)
            *   [ToolChoice](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#toolchoice)
            *   [ToolChoiceConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#toolchoiceconfig)
            *   [ToolChoiceType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#toolchoicetype)
            *   [Turn](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#turn)
            *   [URLContextCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#urlcontextcallarguments)
            *   [URLContextCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#urlcontextcallcontent)
            *   [URLContextResult](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#urlcontextresult)
            *   [URLContextResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#urlcontextresultcontent)
            *   [Usage](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#usage)
            *   [VideoContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#videocontent)
            *   [VideoMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources_interactions.html#videomimetype)

    *   
[resources](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html)

        *   [AllowedTools](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#allowedtools)
        *   [Annotation](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#annotation)
        *   [AudioContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#audiocontent)
        *   [AudioMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#audiomimetype)
        *   [BaseInteractions](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#baseinteractions)
        *   [CodeExecutionCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#codeexecutioncallarguments)
        *   [CodeExecutionCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#codeexecutioncallcontent)
        *   [CodeExecutionResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#codeexecutionresultcontent)
        *   [ContentDelta](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#contentdelta)
        *   [ContentStart](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#contentstart)
        *   [ContentStop](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#contentstop)
        *   [CreateAgentInteractionParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#createagentinteractionparamsnonstreaming)
        *   [CreateAgentInteractionParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#createagentinteractionparamsstreaming)
        *   [CreateModelInteractionParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#createmodelinteractionparamsnonstreaming)
        *   [CreateModelInteractionParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#createmodelinteractionparamsstreaming)
        *   [DeepResearchAgentConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#deepresearchagentconfig)
        *   [DocumentContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#documentcontent)
        *   [DocumentMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#documentmimetype)
        *   [DynamicAgentConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#dynamicagentconfig)
        *   [ErrorEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#errorevent)
        *   [FileSearchResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#filesearchresultcontent)
        *   [Function](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#function)
        *   [FunctionCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#functioncallcontent)
        *   [FunctionResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#functionresultcontent)
        *   [GenerationConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#generationconfig)
        *   [GoogleSearchCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#googlesearchcallarguments)
        *   [GoogleSearchCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#googlesearchcallcontent)
        *   [GoogleSearchResult](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#googlesearchresult)
        *   [GoogleSearchResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#googlesearchresultcontent)
        *   [ImageContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#imagecontent)
        *   [ImageMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#imagemimetype)
        *   [Interaction](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interaction)
        *   [InteractionCancelParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interactioncancelparams)
        *   [InteractionCreateParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interactioncreateparams)
        *   [InteractionDeleteParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interactiondeleteparams)
        *   [InteractionDeleteResponse](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interactiondeleteresponse)
        *   [InteractionEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interactionevent)
        *   [InteractionGetParams](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interactiongetparams)
        *   [InteractionGetParamsNonStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interactiongetparamsnonstreaming)
        *   [InteractionGetParamsStreaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interactiongetparamsstreaming)
        *   [Interactions](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interactions)
        *   [InteractionSSEEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interactionsseevent)
        *   [InteractionStatusUpdate](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#interactionstatusupdate)
        *   [MCPServerToolCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#mcpservertoolcallcontent)
        *   [MCPServerToolResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#mcpservertoolresultcontent)
        *   [Model](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#model)
        *   [SpeechConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#speechconfig)
        *   [TextContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#textcontent)
        *   [ThinkingLevel](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#thinkinglevel)
        *   [ThoughtContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#thoughtcontent)
        *   [Tool](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#tool)
        *   [ToolChoice](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#toolchoice)
        *   [ToolChoiceConfig](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#toolchoiceconfig)
        *   [ToolChoiceType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#toolchoicetype)
        *   [Turn](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#turn)
        *   [URLContextCallArguments](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#urlcontextcallarguments)
        *   [URLContextCallContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#urlcontextcallcontent)
        *   [URLContextResult](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#urlcontextresult)
        *   [URLContextResultContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#urlcontextresultcontent)
        *   [Usage](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#usage)
        *   [VideoContent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#videocontent)
        *   [VideoMimeType](https://googleapis.github.io/js-genai/release_docs/modules/interactions_resources-1.html#videomimetype)

    *   
[streaming](https://googleapis.github.io/js-genai/release_docs/modules/interactions_streaming.html)

        *   [_iterSSEMessages](https://googleapis.github.io/js-genai/release_docs/modules/interactions_streaming.html#_iterssemessages)
        *   [ServerSentEvent](https://googleapis.github.io/js-genai/release_docs/modules/interactions_streaming.html#serversentevent)
        *   [Stream](https://googleapis.github.io/js-genai/release_docs/modules/interactions_streaming.html#stream)

    *   
[tree-shakable](https://googleapis.github.io/js-genai/release_docs/modules/interactions_tree-shakable.html)

        *   [PartialGeminiNextGenAPIClient](https://googleapis.github.io/js-genai/release_docs/types/interactions_tree-shakable.PartialGeminiNextGenAPIClient.html)
        *   [createClient](https://googleapis.github.io/js-genai/release_docs/functions/interactions_tree-shakable.createClient.html)

    *   
[uploads](https://googleapis.github.io/js-genai/release_docs/modules/interactions_uploads.html)

        *   [BlobLikePart](https://googleapis.github.io/js-genai/release_docs/modules/interactions_uploads.html#bloblikepart)
        *   [toFile](https://googleapis.github.io/js-genai/release_docs/modules/interactions_uploads.html#tofile)
        *   [ToFileInput](https://googleapis.github.io/js-genai/release_docs/modules/interactions_uploads.html#tofileinput)
        *   [Uploadable](https://googleapis.github.io/js-genai/release_docs/modules/interactions_uploads.html#uploadable)

    *   
[version](https://googleapis.github.io/js-genai/release_docs/modules/interactions_version.html)

        *   [VERSION](https://googleapis.github.io/js-genai/release_docs/variables/interactions_version.VERSION.html)

*   
[live](https://googleapis.github.io/js-genai/release_docs/modules/live.html)

    *   [Live](https://googleapis.github.io/js-genai/release_docs/classes/live.Live.html)
    *   [Session](https://googleapis.github.io/js-genai/release_docs/classes/live.Session.html)

*   
[models](https://googleapis.github.io/js-genai/release_docs/modules/models.html)

    *   [Models](https://googleapis.github.io/js-genai/release_docs/classes/models.Models.html)

*   
[music](https://googleapis.github.io/js-genai/release_docs/modules/music.html)

    *   [LiveMusic](https://googleapis.github.io/js-genai/release_docs/classes/music.LiveMusic.html)
    *   [LiveMusicSession](https://googleapis.github.io/js-genai/release_docs/classes/music.LiveMusicSession.html)

*   
[operations](https://googleapis.github.io/js-genai/release_docs/modules/operations.html)

    *   [Operations](https://googleapis.github.io/js-genai/release_docs/classes/operations.Operations.html)

*   
[pagers](https://googleapis.github.io/js-genai/release_docs/modules/pagers.html)

    *   [PagedItem](https://googleapis.github.io/js-genai/release_docs/enums/pagers.PagedItem.html)
    *   [Pager](https://googleapis.github.io/js-genai/release_docs/classes/pagers.Pager.html)
    *   [PagedItemConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/pagers.PagedItemConfig.html)

*   
[tokens](https://googleapis.github.io/js-genai/release_docs/modules/tokens.html)

    *   [Tokens](https://googleapis.github.io/js-genai/release_docs/classes/tokens.Tokens.html)

*   
[tunings](https://googleapis.github.io/js-genai/release_docs/modules/tunings.html)

    *   [Tunings](https://googleapis.github.io/js-genai/release_docs/classes/tunings.Tunings.html)

*   
[types](https://googleapis.github.io/js-genai/release_docs/modules/types.html)

    *   [ActivityHandling](https://googleapis.github.io/js-genai/release_docs/enums/types.ActivityHandling.html)
    *   [AdapterSize](https://googleapis.github.io/js-genai/release_docs/enums/types.AdapterSize.html)
    *   [ApiSpec](https://googleapis.github.io/js-genai/release_docs/enums/types.ApiSpec.html)
    *   [AuthType](https://googleapis.github.io/js-genai/release_docs/enums/types.AuthType.html)
    *   [Behavior](https://googleapis.github.io/js-genai/release_docs/enums/types.Behavior.html)
    *   [BlockedReason](https://googleapis.github.io/js-genai/release_docs/enums/types.BlockedReason.html)
    *   [ControlReferenceType](https://googleapis.github.io/js-genai/release_docs/enums/types.ControlReferenceType.html)
    *   [DocumentState](https://googleapis.github.io/js-genai/release_docs/enums/types.DocumentState.html)
    *   [DynamicRetrievalConfigMode](https://googleapis.github.io/js-genai/release_docs/enums/types.DynamicRetrievalConfigMode.html)
    *   [EditMode](https://googleapis.github.io/js-genai/release_docs/enums/types.EditMode.html)
    *   [EndSensitivity](https://googleapis.github.io/js-genai/release_docs/enums/types.EndSensitivity.html)
    *   [Environment](https://googleapis.github.io/js-genai/release_docs/enums/types.Environment.html)
    *   [FeatureSelectionPreference](https://googleapis.github.io/js-genai/release_docs/enums/types.FeatureSelectionPreference.html)
    *   [FileSource](https://googleapis.github.io/js-genai/release_docs/enums/types.FileSource.html)
    *   [FileState](https://googleapis.github.io/js-genai/release_docs/enums/types.FileState.html)
    *   [FinishReason](https://googleapis.github.io/js-genai/release_docs/enums/types.FinishReason.html)
    *   [FunctionCallingConfigMode](https://googleapis.github.io/js-genai/release_docs/enums/types.FunctionCallingConfigMode.html)
    *   [FunctionResponseScheduling](https://googleapis.github.io/js-genai/release_docs/enums/types.FunctionResponseScheduling.html)
    *   [HarmBlockMethod](https://googleapis.github.io/js-genai/release_docs/enums/types.HarmBlockMethod.html)
    *   [HarmBlockThreshold](https://googleapis.github.io/js-genai/release_docs/enums/types.HarmBlockThreshold.html)
    *   [HarmCategory](https://googleapis.github.io/js-genai/release_docs/enums/types.HarmCategory.html)
    *   [HarmProbability](https://googleapis.github.io/js-genai/release_docs/enums/types.HarmProbability.html)
    *   [HarmSeverity](https://googleapis.github.io/js-genai/release_docs/enums/types.HarmSeverity.html)
    *   [HttpElementLocation](https://googleapis.github.io/js-genai/release_docs/enums/types.HttpElementLocation.html)
    *   [ImagePromptLanguage](https://googleapis.github.io/js-genai/release_docs/enums/types.ImagePromptLanguage.html)
    *   [JobState](https://googleapis.github.io/js-genai/release_docs/enums/types.JobState.html)
    *   [Language](https://googleapis.github.io/js-genai/release_docs/enums/types.Language.html)
    *   [LiveMusicPlaybackControl](https://googleapis.github.io/js-genai/release_docs/enums/types.LiveMusicPlaybackControl.html)
    *   [MaskReferenceMode](https://googleapis.github.io/js-genai/release_docs/enums/types.MaskReferenceMode.html)
    *   [MediaModality](https://googleapis.github.io/js-genai/release_docs/enums/types.MediaModality.html)
    *   [MediaResolution](https://googleapis.github.io/js-genai/release_docs/enums/types.MediaResolution.html)
    *   [Modality](https://googleapis.github.io/js-genai/release_docs/enums/types.Modality.html)
    *   [Mode](https://googleapis.github.io/js-genai/release_docs/enums/types.Mode.html)
    *   [MusicGenerationMode](https://googleapis.github.io/js-genai/release_docs/enums/types.MusicGenerationMode.html)
    *   [Outcome](https://googleapis.github.io/js-genai/release_docs/enums/types.Outcome.html)
    *   [PartMediaResolutionLevel](https://googleapis.github.io/js-genai/release_docs/enums/types.PartMediaResolutionLevel.html)
    *   [PersonGeneration](https://googleapis.github.io/js-genai/release_docs/enums/types.PersonGeneration.html)
    *   [PhishBlockThreshold](https://googleapis.github.io/js-genai/release_docs/enums/types.PhishBlockThreshold.html)
    *   [SafetyFilterLevel](https://googleapis.github.io/js-genai/release_docs/enums/types.SafetyFilterLevel.html)
    *   [Scale](https://googleapis.github.io/js-genai/release_docs/enums/types.Scale.html)
    *   [SegmentMode](https://googleapis.github.io/js-genai/release_docs/enums/types.SegmentMode.html)
    *   [StartSensitivity](https://googleapis.github.io/js-genai/release_docs/enums/types.StartSensitivity.html)
    *   [SubjectReferenceType](https://googleapis.github.io/js-genai/release_docs/enums/types.SubjectReferenceType.html)
    *   [ThinkingLevel](https://googleapis.github.io/js-genai/release_docs/enums/types.ThinkingLevel.html)
    *   [TrafficType](https://googleapis.github.io/js-genai/release_docs/enums/types.TrafficType.html)
    *   [TuningMethod](https://googleapis.github.io/js-genai/release_docs/enums/types.TuningMethod.html)
    *   [TuningMode](https://googleapis.github.io/js-genai/release_docs/enums/types.TuningMode.html)
    *   [TuningTask](https://googleapis.github.io/js-genai/release_docs/enums/types.TuningTask.html)
    *   [TurnCompleteReason](https://googleapis.github.io/js-genai/release_docs/enums/types.TurnCompleteReason.html)
    *   [TurnCoverage](https://googleapis.github.io/js-genai/release_docs/enums/types.TurnCoverage.html)
    *   [Type](https://googleapis.github.io/js-genai/release_docs/enums/types.Type.html)
    *   [UrlRetrievalStatus](https://googleapis.github.io/js-genai/release_docs/enums/types.UrlRetrievalStatus.html)
    *   [VadSignalType](https://googleapis.github.io/js-genai/release_docs/enums/types.VadSignalType.html)
    *   [VideoCompressionQuality](https://googleapis.github.io/js-genai/release_docs/enums/types.VideoCompressionQuality.html)
    *   [VideoGenerationMaskMode](https://googleapis.github.io/js-genai/release_docs/enums/types.VideoGenerationMaskMode.html)
    *   [VideoGenerationReferenceType](https://googleapis.github.io/js-genai/release_docs/enums/types.VideoGenerationReferenceType.html)
    *   [CancelTuningJobResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.CancelTuningJobResponse.html)
    *   [ComputeTokensResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.ComputeTokensResponse.html)
    *   [ContentReferenceImage](https://googleapis.github.io/js-genai/release_docs/classes/types.ContentReferenceImage.html)
    *   [ControlReferenceImage](https://googleapis.github.io/js-genai/release_docs/classes/types.ControlReferenceImage.html)
    *   [CountTokensResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.CountTokensResponse.html)
    *   [CreateFileResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.CreateFileResponse.html)
    *   [DeleteCachedContentResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.DeleteCachedContentResponse.html)
    *   [DeleteFileResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.DeleteFileResponse.html)
    *   [DeleteModelResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.DeleteModelResponse.html)
    *   [EditImageResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.EditImageResponse.html)
    *   [EmbedContentResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.EmbedContentResponse.html)
    *   [FunctionResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.FunctionResponse.html)
    *   [FunctionResponseBlob](https://googleapis.github.io/js-genai/release_docs/classes/types.FunctionResponseBlob.html)
    *   [FunctionResponseFileData](https://googleapis.github.io/js-genai/release_docs/classes/types.FunctionResponseFileData.html)
    *   [FunctionResponsePart](https://googleapis.github.io/js-genai/release_docs/classes/types.FunctionResponsePart.html)
    *   [GenerateContentResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.GenerateContentResponse.html)
    *   [GenerateContentResponsePromptFeedback](https://googleapis.github.io/js-genai/release_docs/classes/types.GenerateContentResponsePromptFeedback.html)
    *   [GenerateContentResponseUsageMetadata](https://googleapis.github.io/js-genai/release_docs/classes/types.GenerateContentResponseUsageMetadata.html)
    *   [GenerateImagesResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.GenerateImagesResponse.html)
    *   [GenerateVideosOperation](https://googleapis.github.io/js-genai/release_docs/classes/types.GenerateVideosOperation.html)
    *   [GenerateVideosResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.GenerateVideosResponse.html)
    *   [HttpResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.HttpResponse.html)
    *   [ImportFileOperation](https://googleapis.github.io/js-genai/release_docs/classes/types.ImportFileOperation.html)
    *   [ImportFileResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.ImportFileResponse.html)
    *   [InlinedEmbedContentResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.InlinedEmbedContentResponse.html)
    *   [InlinedResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.InlinedResponse.html)
    *   [ListBatchJobsResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.ListBatchJobsResponse.html)
    *   [ListCachedContentsResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.ListCachedContentsResponse.html)
    *   [ListDocumentsResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.ListDocumentsResponse.html)
    *   [ListFileSearchStoresResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.ListFileSearchStoresResponse.html)
    *   [ListFilesResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.ListFilesResponse.html)
    *   [ListModelsResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.ListModelsResponse.html)
    *   [ListTuningJobsResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.ListTuningJobsResponse.html)
    *   [LiveClientToolResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.LiveClientToolResponse.html)
    *   [LiveMusicServerMessage](https://googleapis.github.io/js-genai/release_docs/classes/types.LiveMusicServerMessage.html)
    *   [LiveSendToolResponseParameters](https://googleapis.github.io/js-genai/release_docs/classes/types.LiveSendToolResponseParameters.html)
    *   [LiveServerMessage](https://googleapis.github.io/js-genai/release_docs/classes/types.LiveServerMessage.html)
    *   [MaskReferenceImage](https://googleapis.github.io/js-genai/release_docs/classes/types.MaskReferenceImage.html)
    *   [RawReferenceImage](https://googleapis.github.io/js-genai/release_docs/classes/types.RawReferenceImage.html)
    *   [RecontextImageResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.RecontextImageResponse.html)
    *   [ReplayResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.ReplayResponse.html)
    *   [SegmentImageResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.SegmentImageResponse.html)
    *   [SingleEmbedContentResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.SingleEmbedContentResponse.html)
    *   [StyleReferenceImage](https://googleapis.github.io/js-genai/release_docs/classes/types.StyleReferenceImage.html)
    *   [SubjectReferenceImage](https://googleapis.github.io/js-genai/release_docs/classes/types.SubjectReferenceImage.html)
    *   [UploadToFileSearchStoreOperation](https://googleapis.github.io/js-genai/release_docs/classes/types.UploadToFileSearchStoreOperation.html)
    *   [UploadToFileSearchStoreResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.UploadToFileSearchStoreResponse.html)
    *   [UploadToFileSearchStoreResumableResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.UploadToFileSearchStoreResumableResponse.html)
    *   [UpscaleImageResponse](https://googleapis.github.io/js-genai/release_docs/classes/types.UpscaleImageResponse.html)
    *   [ActivityEnd](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ActivityEnd.html)
    *   [ActivityStart](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ActivityStart.html)
    *   [ApiAuth](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ApiAuth.html)
    *   [ApiAuthApiKeyConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ApiAuthApiKeyConfig.html)
    *   [ApiKeyConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ApiKeyConfig.html)
    *   [AudioChunk](https://googleapis.github.io/js-genai/release_docs/interfaces/types.AudioChunk.html)
    *   [AudioTranscriptionConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.AudioTranscriptionConfig.html)
    *   [AuthConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.AuthConfig.html)
    *   [AuthConfigGoogleServiceAccountConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.AuthConfigGoogleServiceAccountConfig.html)
    *   [AuthConfigHttpBasicAuthConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.AuthConfigHttpBasicAuthConfig.html)
    *   [AuthConfigOauthConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.AuthConfigOauthConfig.html)
    *   [AuthConfigOidcConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.AuthConfigOidcConfig.html)
    *   [AuthToken](https://googleapis.github.io/js-genai/release_docs/interfaces/types.AuthToken.html)
    *   [AutomaticActivityDetection](https://googleapis.github.io/js-genai/release_docs/interfaces/types.AutomaticActivityDetection.html)
    *   [AutomaticFunctionCallingConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.AutomaticFunctionCallingConfig.html)
    *   [BatchJob](https://googleapis.github.io/js-genai/release_docs/interfaces/types.BatchJob.html)
    *   [BatchJobDestination](https://googleapis.github.io/js-genai/release_docs/interfaces/types.BatchJobDestination.html)
    *   [BatchJobSource](https://googleapis.github.io/js-genai/release_docs/interfaces/types.BatchJobSource.html)
    *   [Blob](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Blob.html)
    *   [CachedContent](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CachedContent.html)
    *   [CachedContentUsageMetadata](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CachedContentUsageMetadata.html)
    *   [CallableTool](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CallableTool.html)
    *   [CallableToolConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CallableToolConfig.html)
    *   [CancelBatchJobConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CancelBatchJobConfig.html)
    *   [CancelBatchJobParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CancelBatchJobParameters.html)
    *   [CancelTuningJobConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CancelTuningJobConfig.html)
    *   [CancelTuningJobParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CancelTuningJobParameters.html)
    *   [Candidate](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Candidate.html)
    *   [Checkpoint](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Checkpoint.html)
    *   [ChunkingConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ChunkingConfig.html)
    *   [Citation](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Citation.html)
    *   [CitationMetadata](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CitationMetadata.html)
    *   [CodeExecutionResult](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CodeExecutionResult.html)
    *   [CompletionStats](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CompletionStats.html)
    *   [ComputerUse](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ComputerUse.html)
    *   [ComputeTokensConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ComputeTokensConfig.html)
    *   [ComputeTokensParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ComputeTokensParameters.html)
    *   [Content](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Content.html)
    *   [ContentEmbedding](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ContentEmbedding.html)
    *   [ContentEmbeddingStatistics](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ContentEmbeddingStatistics.html)
    *   [ContextWindowCompressionConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ContextWindowCompressionConfig.html)
    *   [ControlReferenceConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ControlReferenceConfig.html)
    *   [CountTokensConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CountTokensConfig.html)
    *   [CountTokensParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CountTokensParameters.html)
    *   [CreateAuthTokenConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateAuthTokenConfig.html)
    *   [CreateAuthTokenParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateAuthTokenParameters.html)
    *   [CreateBatchJobConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateBatchJobConfig.html)
    *   [CreateBatchJobParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateBatchJobParameters.html)
    *   [CreateCachedContentConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateCachedContentConfig.html)
    *   [CreateCachedContentParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateCachedContentParameters.html)
    *   [CreateChatParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateChatParameters.html)
    *   [CreateEmbeddingsBatchJobConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateEmbeddingsBatchJobConfig.html)
    *   [CreateEmbeddingsBatchJobParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateEmbeddingsBatchJobParameters.html)
    *   [CreateFileConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateFileConfig.html)
    *   [CreateFileParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateFileParameters.html)
    *   [CreateFileSearchStoreConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateFileSearchStoreConfig.html)
    *   [CreateFileSearchStoreParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateFileSearchStoreParameters.html)
    *   [CreateTuningJobConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateTuningJobConfig.html)
    *   [CreateTuningJobParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateTuningJobParameters.html)
    *   [CreateTuningJobParametersPrivate](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CreateTuningJobParametersPrivate.html)
    *   [CustomMetadata](https://googleapis.github.io/js-genai/release_docs/interfaces/types.CustomMetadata.html)
    *   [DatasetDistribution](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DatasetDistribution.html)
    *   [DatasetDistributionDistributionBucket](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DatasetDistributionDistributionBucket.html)
    *   [DatasetStats](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DatasetStats.html)
    *   [DeleteBatchJobConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteBatchJobConfig.html)
    *   [DeleteBatchJobParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteBatchJobParameters.html)
    *   [DeleteCachedContentConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteCachedContentConfig.html)
    *   [DeleteCachedContentParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteCachedContentParameters.html)
    *   [DeleteDocumentConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteDocumentConfig.html)
    *   [DeleteDocumentParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteDocumentParameters.html)
    *   [DeleteFileConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteFileConfig.html)
    *   [DeleteFileParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteFileParameters.html)
    *   [DeleteFileSearchStoreConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteFileSearchStoreConfig.html)
    *   [DeleteFileSearchStoreParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteFileSearchStoreParameters.html)
    *   [DeleteModelConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteModelConfig.html)
    *   [DeleteModelParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteModelParameters.html)
    *   [DeleteResourceJob](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DeleteResourceJob.html)
    *   [DistillationDataStats](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DistillationDataStats.html)
    *   [Document](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Document.html)
    *   [DownloadFileConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DownloadFileConfig.html)
    *   [DownloadFileParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DownloadFileParameters.html)
    *   [DynamicRetrievalConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.DynamicRetrievalConfig.html)
    *   [EditImageConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.EditImageConfig.html)
    *   [EditImageParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.EditImageParameters.html)
    *   [EmbedContentBatch](https://googleapis.github.io/js-genai/release_docs/interfaces/types.EmbedContentBatch.html)
    *   [EmbedContentConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.EmbedContentConfig.html)
    *   [EmbedContentMetadata](https://googleapis.github.io/js-genai/release_docs/interfaces/types.EmbedContentMetadata.html)
    *   [EmbedContentParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.EmbedContentParameters.html)
    *   [EmbeddingsBatchJobSource](https://googleapis.github.io/js-genai/release_docs/interfaces/types.EmbeddingsBatchJobSource.html)
    *   [EncryptionSpec](https://googleapis.github.io/js-genai/release_docs/interfaces/types.EncryptionSpec.html)
    *   [Endpoint](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Endpoint.html)
    *   [EnterpriseWebSearch](https://googleapis.github.io/js-genai/release_docs/interfaces/types.EnterpriseWebSearch.html)
    *   [EntityLabel](https://googleapis.github.io/js-genai/release_docs/interfaces/types.EntityLabel.html)
    *   [ExecutableCode](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ExecutableCode.html)
    *   [ExternalApi](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ExternalApi.html)
    *   [ExternalApiElasticSearchParams](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ExternalApiElasticSearchParams.html)
    *   [ExternalApiSimpleSearchParams](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ExternalApiSimpleSearchParams.html)
    *   [FetchPredictOperationConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.FetchPredictOperationConfig.html)
    *   [FetchPredictOperationParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.FetchPredictOperationParameters.html)
    *   [File](https://googleapis.github.io/js-genai/release_docs/interfaces/types.File.html)
    *   [FileData](https://googleapis.github.io/js-genai/release_docs/interfaces/types.FileData.html)
    *   [FileSearch](https://googleapis.github.io/js-genai/release_docs/interfaces/types.FileSearch.html)
    *   [FileSearchStore](https://googleapis.github.io/js-genai/release_docs/interfaces/types.FileSearchStore.html)
    *   [FileStatus](https://googleapis.github.io/js-genai/release_docs/interfaces/types.FileStatus.html)
    *   [FunctionCall](https://googleapis.github.io/js-genai/release_docs/interfaces/types.FunctionCall.html)
    *   [FunctionCallingConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.FunctionCallingConfig.html)
    *   [FunctionDeclaration](https://googleapis.github.io/js-genai/release_docs/interfaces/types.FunctionDeclaration.html)
    *   [GeminiPreferenceExample](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GeminiPreferenceExample.html)
    *   [GeminiPreferenceExampleCompletion](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GeminiPreferenceExampleCompletion.html)
    *   [GenerateContentConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerateContentConfig.html)
    *   [GenerateContentParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerateContentParameters.html)
    *   [GeneratedImage](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GeneratedImage.html)
    *   [GeneratedImageMask](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GeneratedImageMask.html)
    *   [GeneratedVideo](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GeneratedVideo.html)
    *   [GenerateImagesConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerateImagesConfig.html)
    *   [GenerateImagesParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerateImagesParameters.html)
    *   [GenerateVideosConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerateVideosConfig.html)
    *   [GenerateVideosParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerateVideosParameters.html)
    *   [GenerateVideosSource](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerateVideosSource.html)
    *   [GenerationConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerationConfig.html)
    *   [GenerationConfigRoutingConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerationConfigRoutingConfig.html)
    *   [GenerationConfigRoutingConfigAutoRoutingMode](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerationConfigRoutingConfigAutoRoutingMode.html)
    *   [GenerationConfigRoutingConfigManualRoutingMode](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerationConfigRoutingConfigManualRoutingMode.html)
    *   [GenerationConfigThinkingConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerationConfigThinkingConfig.html)
    *   [GetBatchJobConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetBatchJobConfig.html)
    *   [GetBatchJobParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetBatchJobParameters.html)
    *   [GetCachedContentConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetCachedContentConfig.html)
    *   [GetCachedContentParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetCachedContentParameters.html)
    *   [GetDocumentConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetDocumentConfig.html)
    *   [GetDocumentParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetDocumentParameters.html)
    *   [GetFileConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetFileConfig.html)
    *   [GetFileParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetFileParameters.html)
    *   [GetFileSearchStoreConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetFileSearchStoreConfig.html)
    *   [GetFileSearchStoreParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetFileSearchStoreParameters.html)
    *   [GetModelConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetModelConfig.html)
    *   [GetModelParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetModelParameters.html)
    *   [GetOperationConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetOperationConfig.html)
    *   [GetOperationParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetOperationParameters.html)
    *   [GetTuningJobConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetTuningJobConfig.html)
    *   [GetTuningJobParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GetTuningJobParameters.html)
    *   [GoogleMaps](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GoogleMaps.html)
    *   [GoogleRpcStatus](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GoogleRpcStatus.html)
    *   [GoogleSearch](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GoogleSearch.html)
    *   [GoogleSearchRetrieval](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GoogleSearchRetrieval.html)
    *   [GoogleTypeDate](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GoogleTypeDate.html)
    *   [GroundingChunk](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GroundingChunk.html)
    *   [GroundingChunkMaps](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GroundingChunkMaps.html)
    *   [GroundingChunkMapsPlaceAnswerSources](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GroundingChunkMapsPlaceAnswerSources.html)
    *   [GroundingChunkMapsPlaceAnswerSourcesAuthorAttribution](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GroundingChunkMapsPlaceAnswerSourcesAuthorAttribution.html)
    *   [GroundingChunkMapsPlaceAnswerSourcesReviewSnippet](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GroundingChunkMapsPlaceAnswerSourcesReviewSnippet.html)
    *   [GroundingChunkRetrievedContext](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GroundingChunkRetrievedContext.html)
    *   [GroundingChunkWeb](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GroundingChunkWeb.html)
    *   [GroundingMetadata](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GroundingMetadata.html)
    *   [GroundingMetadataSourceFlaggingUri](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GroundingMetadataSourceFlaggingUri.html)
    *   [GroundingSupport](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GroundingSupport.html)
    *   [HttpOptions](https://googleapis.github.io/js-genai/release_docs/interfaces/types.HttpOptions.html)
    *   [Image](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Image.html)
    *   [ImageConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ImageConfig.html)
    *   [ImportFileConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ImportFileConfig.html)
    *   [ImportFileParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ImportFileParameters.html)
    *   [InlinedRequest](https://googleapis.github.io/js-genai/release_docs/interfaces/types.InlinedRequest.html)
    *   [Interval](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Interval.html)
    *   [JobError](https://googleapis.github.io/js-genai/release_docs/interfaces/types.JobError.html)
    *   [LatLng](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LatLng.html)
    *   [ListBatchJobsConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListBatchJobsConfig.html)
    *   [ListBatchJobsParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListBatchJobsParameters.html)
    *   [ListCachedContentsConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListCachedContentsConfig.html)
    *   [ListCachedContentsParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListCachedContentsParameters.html)
    *   [ListDocumentsConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListDocumentsConfig.html)
    *   [ListDocumentsParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListDocumentsParameters.html)
    *   [ListFilesConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListFilesConfig.html)
    *   [ListFileSearchStoresConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListFileSearchStoresConfig.html)
    *   [ListFileSearchStoresParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListFileSearchStoresParameters.html)
    *   [ListFilesParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListFilesParameters.html)
    *   [ListModelsConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListModelsConfig.html)
    *   [ListModelsParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListModelsParameters.html)
    *   [ListTuningJobsConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListTuningJobsConfig.html)
    *   [ListTuningJobsParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ListTuningJobsParameters.html)
    *   [LiveCallbacks](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveCallbacks.html)
    *   [LiveClientContent](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveClientContent.html)
    *   [LiveClientMessage](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveClientMessage.html)
    *   [LiveClientRealtimeInput](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveClientRealtimeInput.html)
    *   [LiveClientSetup](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveClientSetup.html)
    *   [LiveConnectConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveConnectConfig.html)
    *   [LiveConnectConstraints](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveConnectConstraints.html)
    *   [LiveConnectParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveConnectParameters.html)
    *   [LiveMusicCallbacks](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicCallbacks.html)
    *   [LiveMusicClientContent](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicClientContent.html)
    *   [LiveMusicClientMessage](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicClientMessage.html)
    *   [LiveMusicClientSetup](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicClientSetup.html)
    *   [LiveMusicConnectParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicConnectParameters.html)
    *   [LiveMusicFilteredPrompt](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicFilteredPrompt.html)
    *   [LiveMusicGenerationConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicGenerationConfig.html)
    *   [LiveMusicServerContent](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicServerContent.html)
    *   [LiveMusicServerSetupComplete](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicServerSetupComplete.html)
    *   [LiveMusicSetConfigParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicSetConfigParameters.html)
    *   [LiveMusicSetWeightedPromptsParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicSetWeightedPromptsParameters.html)
    *   [LiveMusicSourceMetadata](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveMusicSourceMetadata.html)
    *   [LiveSendClientContentParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveSendClientContentParameters.html)
    *   [LiveSendRealtimeInputParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveSendRealtimeInputParameters.html)
    *   [LiveServerContent](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveServerContent.html)
    *   [LiveServerGoAway](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveServerGoAway.html)
    *   [LiveServerSessionResumptionUpdate](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveServerSessionResumptionUpdate.html)
    *   [LiveServerSetupComplete](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveServerSetupComplete.html)
    *   [LiveServerToolCall](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveServerToolCall.html)
    *   [LiveServerToolCallCancellation](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LiveServerToolCallCancellation.html)
    *   [LogprobsResult](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LogprobsResult.html)
    *   [LogprobsResultCandidate](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LogprobsResultCandidate.html)
    *   [LogprobsResultTopCandidates](https://googleapis.github.io/js-genai/release_docs/interfaces/types.LogprobsResultTopCandidates.html)
    *   [MaskReferenceConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.MaskReferenceConfig.html)
    *   [ModalityTokenCount](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ModalityTokenCount.html)
    *   [Model](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Model.html)
    *   [ModelSelectionConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ModelSelectionConfig.html)
    *   [MultiSpeakerVoiceConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.MultiSpeakerVoiceConfig.html)
    *   [Operation](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Operation.html)
    *   [OperationFromAPIResponseParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.OperationFromAPIResponseParameters.html)
    *   [OperationGetParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.OperationGetParameters.html)
    *   [Part](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Part.html)
    *   [PartialArg](https://googleapis.github.io/js-genai/release_docs/interfaces/types.PartialArg.html)
    *   [PartMediaResolution](https://googleapis.github.io/js-genai/release_docs/interfaces/types.PartMediaResolution.html)
    *   [PartnerModelTuningSpec](https://googleapis.github.io/js-genai/release_docs/interfaces/types.PartnerModelTuningSpec.html)
    *   [PrebuiltVoiceConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.PrebuiltVoiceConfig.html)
    *   [PreferenceOptimizationDataStats](https://googleapis.github.io/js-genai/release_docs/interfaces/types.PreferenceOptimizationDataStats.html)
    *   [PreferenceOptimizationHyperParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.PreferenceOptimizationHyperParameters.html)
    *   [PreferenceOptimizationSpec](https://googleapis.github.io/js-genai/release_docs/interfaces/types.PreferenceOptimizationSpec.html)
    *   [PreTunedModel](https://googleapis.github.io/js-genai/release_docs/interfaces/types.PreTunedModel.html)
    *   [ProactivityConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ProactivityConfig.html)
    *   [ProductImage](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ProductImage.html)
    *   [RagChunk](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RagChunk.html)
    *   [RagChunkPageSpan](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RagChunkPageSpan.html)
    *   [RagRetrievalConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RagRetrievalConfig.html)
    *   [RagRetrievalConfigFilter](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RagRetrievalConfigFilter.html)
    *   [RagRetrievalConfigHybridSearch](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RagRetrievalConfigHybridSearch.html)
    *   [RagRetrievalConfigRanking](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RagRetrievalConfigRanking.html)
    *   [RagRetrievalConfigRankingLlmRanker](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RagRetrievalConfigRankingLlmRanker.html)
    *   [RagRetrievalConfigRankingRankService](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RagRetrievalConfigRankingRankService.html)
    *   [RealtimeInputConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RealtimeInputConfig.html)
    *   [RecontextImageConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RecontextImageConfig.html)
    *   [RecontextImageParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RecontextImageParameters.html)
    *   [RecontextImageSource](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RecontextImageSource.html)
    *   [ReplayFile](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ReplayFile.html)
    *   [ReplayInteraction](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ReplayInteraction.html)
    *   [ReplayRequest](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ReplayRequest.html)
    *   [ReplicatedVoiceConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ReplicatedVoiceConfig.html)
    *   [Retrieval](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Retrieval.html)
    *   [RetrievalConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RetrievalConfig.html)
    *   [RetrievalMetadata](https://googleapis.github.io/js-genai/release_docs/interfaces/types.RetrievalMetadata.html)
    *   [SafetyAttributes](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SafetyAttributes.html)
    *   [SafetyRating](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SafetyRating.html)
    *   [SafetySetting](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SafetySetting.html)
    *   [Schema](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Schema.html)
    *   [ScribbleImage](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ScribbleImage.html)
    *   [SearchEntryPoint](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SearchEntryPoint.html)
    *   [Segment](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Segment.html)
    *   [SegmentImageConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SegmentImageConfig.html)
    *   [SegmentImageParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SegmentImageParameters.html)
    *   [SegmentImageSource](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SegmentImageSource.html)
    *   [SendMessageParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SendMessageParameters.html)
    *   [SessionResumptionConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SessionResumptionConfig.html)
    *   [SlidingWindow](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SlidingWindow.html)
    *   [SpeakerVoiceConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SpeakerVoiceConfig.html)
    *   [SpeechConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SpeechConfig.html)
    *   [StringList](https://googleapis.github.io/js-genai/release_docs/interfaces/types.StringList.html)
    *   [StyleReferenceConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.StyleReferenceConfig.html)
    *   [SubjectReferenceConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SubjectReferenceConfig.html)
    *   [SupervisedHyperParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SupervisedHyperParameters.html)
    *   [SupervisedTuningDatasetDistribution](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SupervisedTuningDatasetDistribution.html)
    *   [SupervisedTuningDatasetDistributionDatasetBucket](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SupervisedTuningDatasetDistributionDatasetBucket.html)
    *   [SupervisedTuningDataStats](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SupervisedTuningDataStats.html)
    *   [SupervisedTuningSpec](https://googleapis.github.io/js-genai/release_docs/interfaces/types.SupervisedTuningSpec.html)
    *   [TestTableFile](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TestTableFile.html)
    *   [TestTableItem](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TestTableItem.html)
    *   [ThinkingConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ThinkingConfig.html)
    *   [TokensInfo](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TokensInfo.html)
    *   [Tool](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Tool.html)
    *   [ToolCodeExecution](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ToolCodeExecution.html)
    *   [ToolConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.ToolConfig.html)
    *   [Transcription](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Transcription.html)
    *   [TunedModel](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TunedModel.html)
    *   [TunedModelCheckpoint](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TunedModelCheckpoint.html)
    *   [TunedModelInfo](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TunedModelInfo.html)
    *   [TuningDataset](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TuningDataset.html)
    *   [TuningDataStats](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TuningDataStats.html)
    *   [TuningExample](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TuningExample.html)
    *   [TuningJob](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TuningJob.html)
    *   [TuningOperation](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TuningOperation.html)
    *   [TuningValidationDataset](https://googleapis.github.io/js-genai/release_docs/interfaces/types.TuningValidationDataset.html)
    *   [UpdateCachedContentConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UpdateCachedContentConfig.html)
    *   [UpdateCachedContentParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UpdateCachedContentParameters.html)
    *   [UpdateModelConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UpdateModelConfig.html)
    *   [UpdateModelParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UpdateModelParameters.html)
    *   [UploadFileConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UploadFileConfig.html)
    *   [UploadFileParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UploadFileParameters.html)
    *   [UploadToFileSearchStoreConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UploadToFileSearchStoreConfig.html)
    *   [UploadToFileSearchStoreParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UploadToFileSearchStoreParameters.html)
    *   [UpscaleImageConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UpscaleImageConfig.html)
    *   [UpscaleImageParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UpscaleImageParameters.html)
    *   [UrlContext](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UrlContext.html)
    *   [UrlContextMetadata](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UrlContextMetadata.html)
    *   [UrlMetadata](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UrlMetadata.html)
    *   [UsageMetadata](https://googleapis.github.io/js-genai/release_docs/interfaces/types.UsageMetadata.html)
    *   [VeoHyperParameters](https://googleapis.github.io/js-genai/release_docs/interfaces/types.VeoHyperParameters.html)
    *   [VeoTuningSpec](https://googleapis.github.io/js-genai/release_docs/interfaces/types.VeoTuningSpec.html)
    *   [VertexAISearch](https://googleapis.github.io/js-genai/release_docs/interfaces/types.VertexAISearch.html)
    *   [VertexAISearchDataStoreSpec](https://googleapis.github.io/js-genai/release_docs/interfaces/types.VertexAISearchDataStoreSpec.html)
    *   [VertexRagStore](https://googleapis.github.io/js-genai/release_docs/interfaces/types.VertexRagStore.html)
    *   [VertexRagStoreRagResource](https://googleapis.github.io/js-genai/release_docs/interfaces/types.VertexRagStoreRagResource.html)
    *   [Video](https://googleapis.github.io/js-genai/release_docs/interfaces/types.Video.html)
    *   [VideoGenerationMask](https://googleapis.github.io/js-genai/release_docs/interfaces/types.VideoGenerationMask.html)
    *   [VideoGenerationReferenceImage](https://googleapis.github.io/js-genai/release_docs/interfaces/types.VideoGenerationReferenceImage.html)
    *   [VideoMetadata](https://googleapis.github.io/js-genai/release_docs/interfaces/types.VideoMetadata.html)
    *   [VoiceActivityDetectionSignal](https://googleapis.github.io/js-genai/release_docs/interfaces/types.VoiceActivityDetectionSignal.html)
    *   [VoiceConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.VoiceConfig.html)
    *   [WeightedPrompt](https://googleapis.github.io/js-genai/release_docs/interfaces/types.WeightedPrompt.html)
    *   [WhiteSpaceConfig](https://googleapis.github.io/js-genai/release_docs/interfaces/types.WhiteSpaceConfig.html)
    *   [BatchJobDestinationUnion](https://googleapis.github.io/js-genai/release_docs/types/types.BatchJobDestinationUnion.html)
    *   [BatchJobSourceUnion](https://googleapis.github.io/js-genai/release_docs/types/types.BatchJobSourceUnion.html)
    *   [BlobImageUnion](https://googleapis.github.io/js-genai/release_docs/types/types.BlobImageUnion.html)
    *   [ContentListUnion](https://googleapis.github.io/js-genai/release_docs/types/types.ContentListUnion.html)
    *   [ContentUnion](https://googleapis.github.io/js-genai/release_docs/types/types.ContentUnion.html)
    *   [DownloadableFileUnion](https://googleapis.github.io/js-genai/release_docs/types/types.DownloadableFileUnion.html)
    *   [PartListUnion](https://googleapis.github.io/js-genai/release_docs/types/types.PartListUnion.html)
    *   [PartUnion](https://googleapis.github.io/js-genai/release_docs/types/types.PartUnion.html)
    *   [ReferenceImage](https://googleapis.github.io/js-genai/release_docs/types/types.ReferenceImage.html)
    *   [SchemaUnion](https://googleapis.github.io/js-genai/release_docs/types/types.SchemaUnion.html)
    *   [SpeechConfigUnion](https://googleapis.github.io/js-genai/release_docs/types/types.SpeechConfigUnion.html)
    *   [ToolListUnion](https://googleapis.github.io/js-genai/release_docs/types/types.ToolListUnion.html)
    *   [ToolUnion](https://googleapis.github.io/js-genai/release_docs/types/types.ToolUnion.html)
    *   [createFunctionResponsePartFromBase64](https://googleapis.github.io/js-genai/release_docs/functions/types.createFunctionResponsePartFromBase64.html)
    *   [createFunctionResponsePartFromUri](https://googleapis.github.io/js-genai/release_docs/functions/types.createFunctionResponsePartFromUri.html)
    *   [createModelContent](https://googleapis.github.io/js-genai/release_docs/functions/types.createModelContent.html)
    *   [createPartFromBase64](https://googleapis.github.io/js-genai/release_docs/functions/types.createPartFromBase64.html)
    *   [createPartFromCodeExecutionResult](https://googleapis.github.io/js-genai/release_docs/functions/types.createPartFromCodeExecutionResult.html)
    *   [createPartFromExecutableCode](https://googleapis.github.io/js-genai/release_docs/functions/types.createPartFromExecutableCode.html)
    *   [createPartFromFunctionCall](https://googleapis.github.io/js-genai/release_docs/functions/types.createPartFromFunctionCall.html)
    *   [createPartFromFunctionResponse](https://googleapis.github.io/js-genai/release_docs/functions/types.createPartFromFunctionResponse.html)
    *   [createPartFromText](https://googleapis.github.io/js-genai/release_docs/functions/types.createPartFromText.html)
    *   [createPartFromUri](https://googleapis.github.io/js-genai/release_docs/functions/types.createPartFromUri.html)
    *   [createUserContent](https://googleapis.github.io/js-genai/release_docs/functions/types.createUserContent.html)

Generated using [TypeDoc](https://typedoc.org/)
