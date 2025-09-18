import { useState } from 'react';
import { useFormState } from '../../hooks/useFormState';
import { analyzeLearningGoals } from '../../utils/openaiService';
import ProgressIndicator from './ProgressIndicator';
import FormStep from './FormStep';
import './LearningGoalsForm.css';

// Import step components (we'll create these next)
import PersonalInfoStep from './steps/PersonalInfoStep';
import SkillAssessmentStep from './steps/SkillAssessmentStep';
import LearningGoalsStep from './steps/LearningGoalsStep';
import LearningStyleStep from './steps/LearningStyleStep';
import ConstraintsStep from './steps/ConstraintsStep';
import MotivationStep from './steps/MotivationStep';
import ReviewStep from './steps/ReviewStep';
import AISummaryStep from './steps/AISummaryStep';

const LearningGoalsForm = () => {
  const {
    formData,
    currentStep,
    isSubmitting,
    errors,
    updateFormData,
    nextStep,
    prevStep,
    isStepValid,
    setIsSubmitting,
    clearAllErrors
  } = useFormState();

  const [aiSummary, setAiSummary] = useState(null);
  const [hasError, setHasError] = useState(false);

  const totalSteps = 8;

  const stepTitles = [
    'Personal Information',
    'Skill Assessment', 
    'Learning Goals',
    'Learning Style',
    'Time & Constraints',
    'Motivation & Experience',
    'Review & Submit',
    'Your Learning Plan'
  ];

  const stepDescriptions = [
    'Tell us about yourself and what you want to learn',
    'Assess your current skill levels',
    'Define your learning goals and timeline',
    'Discover your learning preferences',
    'Set your availability and constraints',
    'Share your motivation and past experiences',
    'Review your responses before submission',
    'Your personalized learning plan is ready!'
  ];

  const handleNext = async () => {
    if (currentStep === 7) {
      // Submit form
      await handleSubmit();
    } else {
      nextStep();
    }
  };

  const handlePrevious = () => {
    prevStep();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    clearAllErrors();
    setHasError(false);

    try {
      const result = await analyzeLearningGoals(formData);
      
      if (result.success) {
        setAiSummary(result.summary);
        nextStep();
      } else {
        setHasError(true);
        console.error('AI Analysis Error:', result.error);
      }
    } catch (error) {
      setHasError(true);
      console.error('Submission Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      errors
    };

    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...stepProps} />;
      case 2:
        return <SkillAssessmentStep {...stepProps} />;
      case 3:
        return <LearningGoalsStep {...stepProps} />;
      case 4:
        return <LearningStyleStep {...stepProps} />;
      case 5:
        return <ConstraintsStep {...stepProps} />;
      case 6:
        return <MotivationStep {...stepProps} />;
      case 7:
        return <ReviewStep {...stepProps} />;
      case 8:
        return <AISummaryStep summary={aiSummary} />;
      default:
        return <PersonalInfoStep {...stepProps} />;
    }
  };

  if (hasError) {
    return (
      <div className="form-container">
        <div className="error-state">
          <h2>Oops! Something went wrong</h2>
          <p>We couldn't process your learning goals assessment. Please try again.</p>
          <button 
            className="btn-primary"
            onClick={() => {
              setHasError(false);
              clearAllErrors();
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <ProgressIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
      />
      
      <FormStep
        title={stepTitles[currentStep - 1]}
        description={stepDescriptions[currentStep - 1]}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={isStepValid(currentStep)}
        canGoPrevious={currentStep > 1}
        isLastStep={currentStep === 7}
        isSubmitting={isSubmitting}
      >
        {renderCurrentStep()}
      </FormStep>
    </div>
  );
};

export default LearningGoalsForm;
