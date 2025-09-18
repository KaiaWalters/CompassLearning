import './FormStep.css';

const FormStep = ({ 
  children, 
  title, 
  description, 
  onNext, 
  onPrevious, 
  canGoNext, 
  canGoPrevious, 
  isLastStep = false,
  isSubmitting = false 
}) => {
  return (
    <div className="form-step">
      <div className="step-header">
        <h2>{title}</h2>
        {description && <p className="step-description">{description}</p>}
      </div>
      
      <div className="step-content">
        {children}
      </div>
      
      <div className="step-navigation">
        <button 
          type="button"
          className="btn-secondary"
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          Previous
        </button>
        
        <button 
          type="button"
          className="btn-primary"
          onClick={onNext}
          disabled={!canGoNext || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : isLastStep ? (
            'Generate My Learning Plan'
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );
};

export default FormStep;
