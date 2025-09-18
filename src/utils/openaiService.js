import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for client-side usage
});

export const analyzeLearningGoals = async (formData) => {
  try {
    const prompt = `Analyze the following learning goals assessment data and provide a 4-sentence summary highlighting core themes, learning style alignment, and how constraints/preferences will influence the learning path:

Personal Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Age Range: ${formData.ageRange}
- Location: ${formData.location}

Learning Domains: ${formData.learningDomains?.join(', ')}

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
