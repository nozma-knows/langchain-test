import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms";
import { initializeAgentExecutor } from "langchain/agents";
import { SerpAPI, Calculator } from "langchain/tools";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { BaseLLM } from "langchain/llms";
import { AgentExecutor } from "langchain/agents";

type ResponseError = {
  message: string;
};

type ResponseData = {
  result: string | null;
  error: ResponseError | null;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

class AgentLLM extends BaseLLM {
  private readonly executor: AgentExecutor;

  constructor(executor: AgentExecutor) {
    super();
    this.executor = executor;
  }

  async generate(
    prompts: string[],
    stop?: string[] | undefined
  ): Promise<string> {
    const response = await this.executor.call({
      input: prompt,
      memory: memory,
    });
    return response.output;
  }
}

// Initalize the wrapper
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});
const tools = [new SerpAPI()];
const executor = await initializeAgentExecutor(
  tools,
  model,
  "zero-shot-react-description"
);

const memory = new BufferMemory();
const llm = new ConversationChain({ llm: executor, memory: memory });

console.log("Loaded agent.");

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Grab prompt from request body
  const prompt = req.body.prompt;

  // If prompt is missing or empty string, return error
  if (!prompt || prompt === "") {
    res.status(400).json({
      result: null,
      error: {
        message: "No prompt given",
      },
    });
  }

  try {
    const result = await chain.call({ input: prompt });
    res.status(200).json({
      result: result.response || null,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      result: null,
      error: {
        message: `An error occurred during your request. - ${error}`,
      },
    });
  }
}
