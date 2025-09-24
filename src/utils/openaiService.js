import OpenAI from 'openai';
import { generateLearningPlan } from './learningPlanService';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for client-side usage
});



export const analyzeLearningGoals = async (formData) => {
  const learningPlan = generateLearningPlan(formData);
  try {
    const prompt = `Search the web, speak in the voice of Ali Abdaal provide your response in a conversational tone. Then analyze the following learning goals assessment data and learning plan. Then provide a 6-sentence summary the connections between the learnign goals and learning plan. Your reponse should provide the user with a clear understanding of what they will be learning, why they will be learning it and how it connects to the information they provided in the form. 


Personal Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Age Range: ${formData.ageRange}
- Location: ${formData.location}

Learning Domains: ${formData.learningDomains?.join(', ')}

Learning Plan: ${learningPlan}

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

    return {
      success: true,
      summary: response.choices[0].message.content
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze learning goals'
    };
  }
};

export const validateApiKey = () => {
  return !!import.meta.env.VITE_OPENAI_API_KEY;
};
