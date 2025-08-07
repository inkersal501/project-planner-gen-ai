import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const idea = "AI-powered project planner";
const techStack = "React, Node.js, OpenAI API";

const prompt = `
You are a software architect AI. 
Based on the following idea and tech stack, generate a short MVP plan with key features, suggested architecture, and timeline.

Idea: ${idea}
Tech Stack: ${techStack || 'Latest Tech Stack'}

Respond in structured JSON format with:
{
  "mvpFeatures": [...],
  "suggestedArchitecture": "...",
  "estimatedTimeline": "...",
  "nextSteps": [...]
}
`;

async function listAndTestModels() {
  try {
    const modelsRes = await openai.models.list();
    const models = modelsRes.data;

    const testableModels = models
      .map((m) => m.id)
      .filter((id) => id.startsWith('gpt') || id.startsWith('ft:gpt'));

    for (const model of testableModels) {
      try {
        console.log(`\n🔍 Trying model: ${model}`);
        const completion = await openai.chat.completions.create({
          model,
          messages: [{ role: 'user', content: prompt }],
        });

        const output = completion.choices[0]?.message?.content;
        console.log(`Success for model: ${model}`);
        console.log(`Response:\n${output}\n`);
      } catch (err) {
        console.error(`Failed for model: ${model}`);
        console.error("");
      }
    }
  } catch (error) {
    console.error("Error fetching model list:", error);
  }
}

listAndTestModels();