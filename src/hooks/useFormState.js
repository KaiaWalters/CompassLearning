import { useState, useEffect } from 'react';
import { validateFormStep } from '../utils/formValidation';

const FORM_STORAGE_KEY = 'learning_goals_form_data';

export const useFormState = (initialState = {}) => {
  const [formData, setFormData] = useState(() => {
    // Load from sessionStorage on initialization
    const saved = sessionStorage.getItem(FORM_STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialState;
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Save to sessionStorage whenever formData changes
  useEffect(() => {
    sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (stepData) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
    
    // Clear errors for updated fields
    const updatedFields = Object.keys(stepData);
    updatedFields.forEach(field => {
      clearFieldError(field);
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 8));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    setCurrentStep(Math.max(1, Math.min(step, 8)));
  };

  const setFieldError = (field, error) => {
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const clearFieldError = (field) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  const resetForm = () => {
    setFormData(initialState);
    setCurrentStep(1);
    setErrors({});
    setIsSubmitting(false);
    sessionStorage.removeItem(FORM_STORAGE_KEY);
  };

  const isStepValid = (step) => {
    try {
      const stepErrors = validateFormStep(step, formData);
      return Object.keys(stepErrors).length === 0;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  };

  return {
    formData,
    currentStep,
    isSubmitting,
    errors,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    resetForm,
    isStepValid,
    setIsSubmitting
  };
};
