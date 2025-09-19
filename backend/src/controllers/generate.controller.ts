import { Request, Response } from 'express';
import { IdeaRequest } from '../types/ideaRequest';
// import { openai } from '../utils/openai';
import { genAI } from '../utils/gemini';

export const handleGenerate = async (req: Request<{}, {}, IdeaRequest>, res: Response) => {
  const { idea, techStack } = req.body;

  if (!idea) {
    return res.status(400).json({ error: 'Project idea is required.' });
  }

  try {
    const prompt = `
      You are a software architect AI. 
      Based on the following idea and tech stack, generate a short MVP plan.

      Idea: ${idea}
      Tech Stack: ${techStack || 'Latest Tech Stack'}

     Important: 
      Always respond ONLY in valid JSON.
      Do not include markdown formatting, no \`\`\`json blocks, no extra text.

      Use exactly this schema:
      {
        "mvpFeatures": [
          "string", "string", "string"
        ],
        "suggestedArchitecture": "string",
        "estimatedTimeline": "string",
        "nextSteps": [
          "string", "string", "string"
        ]
      }
      `;

    // const chatCompletion = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: [{ role: 'user', content: prompt }],
    // });
    // const response = chatCompletion.choices[0]?.message?.content;

    const result = await genAI.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt  }); 
    let response : string = result.text || ""; 
    response  = JSON.parse(response);
    res.json({
      message: 'AI Response generated successfully',
      data: {
        idea,
        techStack,
        response,
      },
    });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to generate AI response.' });
  }
}
