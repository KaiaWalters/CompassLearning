import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LearningPlan from '../components/LearningPlan/LearningPlan';

const LearningPlanPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load form data and AI summary from session storage
    const savedFormData = sessionStorage.getItem('learning_goals_form_data');
    const savedAiSummary = sessionStorage.getItem('learning_goals_ai_summary');

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    if (savedAiSummary) {
      setAiSummary(savedAiSummary);
    }

    setIsLoading(false);
  }, []);

  const handleBack = () => {
    navigate('/learning-goals');
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #e3f2fd',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>Loading your learning plan...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (!formData || !aiSummary) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '20px' }}>
          <h2 style={{ color: '#e74c3c', marginBottom: '16px' }}>No Learning Plan Data Found</h2>
          <p style={{ color: '#6c757d', marginBottom: '24px' }}>
            It looks like you haven't completed the learning goals assessment yet. 
            Please complete the form first to generate your personalized learning plan.
          </p>
          <button 
            onClick={() => navigate('/learning-goals')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Complete Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <LearningPlan 
      formData={formData}
      aiSummary={aiSummary}
      onBack={handleBack}
    />
  );
};

export default LearningPlanPage;
