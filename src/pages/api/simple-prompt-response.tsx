import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain";

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

// Initalize the wrapper
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

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
    const response = await model.call(prompt);
    console.log("noah - generate-response.tsx - response: ", response);
    res.status(200).json({
      result: response || null,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      result: null,
      error: {
        message: "An error occurred during your request.",
      },
    });
  }
}
