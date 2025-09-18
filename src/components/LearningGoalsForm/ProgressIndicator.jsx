import './ProgressIndicator.css';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-indicator">
      <div className="progress-header">
        <h3>Learning Goals Assessment</h3>
        <span className="step-counter">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="progress-labels">
        <span className="progress-label">Personal Info</span>
        <span className="progress-label">Skills</span>
        <span className="progress-label">Goals</span>
        <span className="progress-label">Style</span>
        <span className="progress-label">Constraints</span>
        <span className="progress-label">Motivation</span>
        <span className="progress-label">Review</span>
        <span className="progress-label">Summary</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
