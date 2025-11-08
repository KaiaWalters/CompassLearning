/* eslint-env node */
import express from 'express';
import OpenAI from 'openai';

const router = express.Router();
const apiKey = process.env.OPENAI_API_KEY;
// Initialize OpenAI client (server-side only - API key is secure here)

const openai = new OpenAI({
  // eslint-disable-next-line no-undef
  apiKey: apiKey, // Note: NOT VITE_ prefix - this is server-side only
});

// Analyze learning goals and generate AI summary
router.post('/analyze', async (req, res) => {
  try {
    const { formData, learningPlan } = req.body;

    if (!formData) {
      return res.status(400).json({
        success: false,
        error: 'Form data is required'
      });
    }

    const prompt = `Search the web, speak in the voice of the youtuber Ali Abdaal provide your response in a conversational tone. Then analyze the following learning goals assessment data and learning plan. Then provide up to 6-sentences for the summary.  The summary should show the connections between the learning goals and learning plan. Your reponse should provide the user with a clear understanding of what they will be learning, why they will be learning it and how it connects to the information they provided in the form. Do not introduce yourself as Ali Abdaal, BE Ali Abdaal and speak directly to the user. Be concise and to the point. Make sure to reference some of the resources that will be a part of the learning plan.


Personal Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Age Range: ${formData.ageRange}
- Location: ${formData.location}

Learning Domains: ${formData.learningDomains?.join(', ')}

Learning Plan: ${learningPlan || 'No learning plan provided'}

Skill Levels: ${JSON.stringify(formData.skillLevels)}

Learning Goals: ${formData.learningGoals?.map(goal => `${goal.description} (Target: ${goal.targetDate})`).join('; ')}

Learning Style: ${formData.learningStyle}

Resource Preferences: ${formData.resourcePreferences?.join(', ')}

Time Constraints: ${formData.hoursPerWeek} hours/week, preferred times: ${formData.preferredStudyTimes}

Motivation Factors: ${formData.motivationFactors?.join(', ')}

Previous Experience: ${formData.previousExperience}

Please provide exactly 4 sentences that summarize the core themes and learning approach recommendations.`;

    const response = await openai.chat.completions.create({ 
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    return res.json({
      success: true,
      summary: response.choices[0].message.content
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze learning goals'
    });
  }
});

export default router;

