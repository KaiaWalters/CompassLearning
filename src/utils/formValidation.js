// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Date validation - must be future date
export const validateFutureDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
};

// Range validation for skill assessments (1-5 scale)
export const validateSkillLevel = (level) => {
  return typeof level === 'number' && level >= 1 && level <= 5;
};

// Text length validation
export const validateTextLength = (text, minLength = 10, maxLength = 500) => {
  if (!text || typeof text !== 'string') return false;
  return text.length >= minLength && text.length <= maxLength;
};

// Required field validation
export const validateRequired = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined && value !== '';
};

// Phone number validation (if needed)
export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// URL validation (if needed)
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Age range validation
export const validateAgeRange = (ageRange) => {
  const validRanges = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
  return validRanges.includes(ageRange);
};

// Learning domain validation
export const validateLearningDomains = (domains) => {
  const validDomains = ['academic', 'professional', 'personal', 'technical-certifications'];
  return Array.isArray(domains) && 
         domains.length > 0 && 
         domains.every(domain => validDomains.includes(domain));
};

// Learning style validation
export const validateLearningStyle = (style) => {
  const validStyles = ['visual', 'auditory', 'kinesthetic', 'reading-writing'];
  return validStyles.includes(style);
};

// Hours per week validation
export const validateHoursPerWeek = (hours) => {
  const num = parseInt(hours);
  return !isNaN(num) && num >= 1 && num <= 168; // 1 hour to 24/7
};

// Comprehensive form validation
export const validateFormStep = (step, formData) => {
  const errors = {};

  switch (step) {
    case 1: // Personal Information
      if (!validateRequired(formData.name)) {
        errors.name = 'Name is required';
      }
      if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!validateAgeRange(formData.ageRange)) {
        errors.ageRange = 'Please select a valid age range';
      }
      if (!validateRequired(formData.location)) {
        errors.location = 'Location is required';
      }
      if (!validateLearningDomains(formData.learningDomains)) {
        errors.learningDomains = 'Please select at least one learning domain';
      }
      break;

    case 2: // Skill Assessment
      if (!formData.skillLevels || Object.keys(formData.skillLevels).length === 0) {
        errors.skillLevels = 'Please assess at least one skill area';
      } else {
        Object.entries(formData.skillLevels).forEach(([skill, level]) => {
          if (!validateSkillLevel(level)) {
            errors[`skill_${skill}`] = 'Please provide a valid skill level (1-5)';
          }
        });
      }
      break;

    case 3: // Learning Goals
      if (!formData.learningGoals || formData.learningGoals.length === 0) {
        errors.learningGoals = 'Please add at least one learning goal';
      } else {
        formData.learningGoals.forEach((goal, index) => {
          if (!validateTextLength(goal.description, 10, 500)) {
            errors[`goal_${index}_description`] = 'Goal description must be 10-500 characters';
          }
          if (!validateFutureDate(goal.targetDate)) {
            errors[`goal_${index}_date`] = 'Target date must be in the future';
          }
        });
      }
      break;

    case 4: // Learning Style
      if (!validateLearningStyle(formData.learningStyle)) {
        errors.learningStyle = 'Please select a learning style';
      }
      if (!formData.resourcePreferences || formData.resourcePreferences.length === 0) {
        errors.resourcePreferences = 'Please select at least one resource preference';
      }
      break;

    case 5: // Constraints
      if (!validateHoursPerWeek(formData.hoursPerWeek)) {
        errors.hoursPerWeek = 'Please enter a valid number of hours (1-168)';
      }
      if (!validateRequired(formData.preferredStudyTimes)) {
        errors.preferredStudyTimes = 'Please select preferred study times';
      }
      break;

    case 6: // Motivation
      if (!formData.motivationFactors || formData.motivationFactors.length === 0) {
        errors.motivationFactors = 'Please select at least one motivation factor';
      }
      break;

    default:
      break;
  }

  return errors;
};
