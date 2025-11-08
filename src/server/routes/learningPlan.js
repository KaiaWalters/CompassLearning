/* eslint-env node */
import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
const router = express.Router();

// Initialize OpenAI client (server-side only - API key is secure here)
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not set');
}

const openai = new OpenAI({
  // eslint-disable-next-line no-undef
  apiKey: apiKey, // Note: NOT VITE_ prefix - this is server-side only
});

// Generate learning plan using OpenAI
router.post('/generate', async (req, res) => {
  try {
    const { formData, aiSummary } = req.body;

    if (!formData) {
      return res.status(400).json({
        success: false,
        error: 'Form data is required'
      });
    }

    const prompt = `Based on the following learning goals assessment and AI summary, create a detailed 4-week learning plan with daily tasks, weekly goals, and free online resources.

FORM DATA:
- Name: ${formData.name}
- Learning Domains: ${formData.learningDomains?.join(', ')}
- Skill Levels: ${JSON.stringify(formData.skillLevels)}
- Learning Goals: ${formData.learningGoals?.map(goal => `${goal.description} (Target: ${goal.targetDate})`).join('; ')}
- Learning Style: ${formData.learningStyle}
- Resource Preferences: ${formData.resourcePreferences?.join(', ')}
- Time Constraints: ${formData.hoursPerWeek} hours/week
- Preferred Study Times: ${formData.preferredStudyTimes}

AI SUMMARY: ${aiSummary || 'No summary provided'}

Please generate a structured learning plan with:
1. 4 weekly goals (one for each week)
2. 5-7 daily tasks per week (Monday-Friday, 15-60 minutes each)
3. Each task should be tagged with relevant learning goals
4. 2-3 free online resources per task (articles, videos, tutorials)
5. Time estimates for each task

Return the response as a JSON object with this exact structure:
{
  "weeklyGoals": [
    {
      "week": 1,
      "title": "Week 1 Goal Title",
      "description": "Detailed description of what to achieve this week",
      "learningGoalTags": ["tag1", "tag2"]
    }
  ],
  "dailyTasks": [
    {
      "id": "task_1",
      "week": 1,
      "day": "Monday",
      "title": "Task Title",
      "description": "Detailed task description",
      "timeEstimate": 30,
      "learningGoalTags": ["tag1"],
      "status": "not_started",
      "resources": [
        {
          "title": "Resource Title",
          "url": "https://example.com",
          "type": "article|video|tutorial",
          "description": "Brief description"
        }
      ]
    }
  ],
  "metadata": {
    "totalWeeks": 4,
    "totalTasks": 20,
    "estimatedHoursPerWeek": 5
  }
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    
    // Try to parse JSON from the response
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const planData = JSON.parse(jsonMatch[0]);
        return res.json({
          success: true,
          plan: planData
        });
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
    }

    // Fallback: return a structured response even if JSON parsing fails
    return res.json({
      success: true,
      plan: {
        weeklyGoals: [
          {
            week: 1,
            title: "Foundation Building",
            description: "Establish fundamental concepts and skills",
            learningGoalTags: formData.learningDomains || ["General Learning"]
          }
        ],
        dailyTasks: [
          {
            id: "task_1",
            week: 1,
            day: "Monday",
            title: "Introduction to Core Concepts",
            description: "Begin with foundational concepts and terminology",
            timeEstimate: 30,
            learningGoalTags: formData.learningDomains || ["General Learning"],
            status: "not_started",
            resources: [
              {
                title: "Getting Started Guide",
                url: "https://example.com",
                type: "article",
                description: "Comprehensive introduction to the topic"
              }
            ]
          }
        ],
        metadata: {
          totalWeeks: 4,
          totalTasks: 1,
          estimatedHoursPerWeek: 2.5
        }
      }
    });

  } catch (error) {
    console.error('Learning Plan Generation Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate learning plan'
    });
  }
});

export default router;

