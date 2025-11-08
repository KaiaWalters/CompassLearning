// API base URL - defaults to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Analyze learning goals using server API (OpenAI calls are now server-side)
export const analyzeLearningGoals = async (formData, learningPlan = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData,
        learningPlan
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze learning goals. Make sure the server is running.'
    };
  }
};

// Note: API key validation is no longer needed client-side since API calls are server-side
export const validateApiKey = () => {
  // This function is kept for backward compatibility but always returns true
  // since API key validation happens server-side
  return true;
};
