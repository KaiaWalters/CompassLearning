import './AISummaryStep.css';
import { useNavigate } from 'react-router-dom';

const AISummaryStep = ({ summary, isGenerating, error, onRetry, onStartOver }) => {
  const navigate = useNavigate();

  const handleViewLearningPlan = () => {
    // Save AI summary to session storage
    sessionStorage.setItem('learning_goals_ai_summary', summary);
    // Navigate to learning plan page
    navigate('/learning-plan');
  };
  if (error) {
    return (
      <div className="ai-summary-step error-state">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>We encountered an issue while generating your learning plan. Don't worry, your data is safe!</p>
          <div className="error-actions">
            <button onClick={onRetry} className="btn-primary">
              Try Again
            </button>
            <button onClick={onStartOver} className="btn-secondary">
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }
 
  if (isGenerating) {
    return (
      <div className="ai-summary-step generating-state">
        <div className="generating-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <h2>Creating Your Learning Plan</h2>
          <p>Our AI is analyzing your responses and crafting a personalized learning journey just for you...</p>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-summary-step success-state">
      <div className="summary-content">
        <div className="success-header">
          <div className="success-icon">🎉</div>
          <h2>Your Personalized Learning Plan is Ready!</h2>
          <p>Based on your responses, here's what our AI recommends for your learning journey:</p>
        </div>

        <div className="ai-summary">
          <div className="summary-card">
            <h3>📋 Learning Plan Summary</h3>
            <div className="summary-text">
              {summary ? (
                <p>{summary}</p>
              ) : (
                <p>Your personalized learning plan will appear here once generated.</p>
              )}
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Review Your Plan</h4>
                <p>Take time to review the recommendations and adjust as needed</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Start Learning</h4>
                <p>Begin with the first recommended resources and activities</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Track Progress</h4>
                <p>Monitor your progress and adjust your plan as you grow</p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={onStartOver} className="btn-secondary">
            Create New Plan
          </button>
          <button onClick={handleViewLearningPlan} className="btn-primary">
            View Learning Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISummaryStep;
