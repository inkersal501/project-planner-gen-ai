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

    // const chatCompletion = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: [{ role: 'user', content: prompt }],
    // });
    // const response = chatCompletion.choices[0]?.message?.content;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

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
