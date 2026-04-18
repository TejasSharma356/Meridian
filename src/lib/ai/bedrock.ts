import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function invokeClaude(
  prompt: string,
  systemPrompt: string = "You are a specialized career assistant. Output ONLY valid JSON.",
  maxTokens: number = 4096
) {
  const modelId = "anthropic.claude-3-5-sonnet-20240620-v1:0";

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
  };

  try {
    const command = new InvokeModelCommand({
      modelId,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const result = JSON.parse(new TextDecoder().decode(response.body));
    
    // Extract the text content from Claude's response
    const text = result.content[0].text;
    
    const cleaned = extractJsonBlock(text);
    try {
      return JSON.parse(cleaned);
    } catch (e) {
      console.warn("Bedrock response was not valid JSON, returning raw text.");
      return text;
    }
  } catch (error) {
    console.error("Bedrock invocation failed:", error);
    throw error;
  }
}

/** Strip optional ```json fences from model output */
function extractJsonBlock(text: string): string {
  const t = text.trim();
  const m = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (m) return m[1].trim();
  return t;
}
