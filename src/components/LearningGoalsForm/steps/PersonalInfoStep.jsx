import './PersonalInfoStep.css';
import ValidationMessage from '../ValidationMessage';
import { validateEmail, validateRequired, validateLearningDomains } from '../../../utils/formValidation';

const PersonalInfoStep = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const getFieldError = (field) => {
    return errors[field] || '';
  };

  const getFieldValidation = (field, value) => {
    switch (field) {
      case 'email':
        if (value && !validateEmail(value)) {
          return 'Please enter a valid email address';
        }
        return null;
      case 'name':
      case 'location':
        if (value && !validateRequired(value)) {
          return 'This field is required';
        }
        return null;
      case 'learningDomains':
        if (value && !validateLearningDomains(value)) {
          return 'Please select at least one learning domain';
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="personal-info-step">
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={getFieldError('name') ? 'error' : ''}
          placeholder="Enter your full name"
        />
        <ValidationMessage message={getFieldError('name')} />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={getFieldError('email') ? 'error' : ''}
          placeholder="Enter your email address"
        />
        <ValidationMessage message={getFieldError('email')} />
      </div>

      <div className="form-group">
        <label htmlFor="ageRange">Age Range *</label>
        <select
          id="ageRange"
          value={formData.ageRange || ''}
          onChange={(e) => handleInputChange('ageRange', e.target.value)}
          className={getFieldError('ageRange') ? 'error' : ''}
        >
          <option value="">Select your age range</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46-55">46-55</option>
          <option value="56-65">56-65</option>
          <option value="65+">65+</option>
        </select>
        <ValidationMessage message={getFieldError('ageRange')} />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location *</label>
        <input
          type="text"
          id="location"
          value={formData.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className={getFieldError('location') ? 'error' : ''}
          placeholder="City, Country"
        />
        <ValidationMessage message={getFieldError('location')} />
      </div>

      <div className="form-group">
        <label>Learning Domains *</label>
        <div className="checkbox-group">
          {[
            { value: 'academic', label: 'Academic Subjects' },
            { value: 'professional', label: 'Professional Skills' },
            { value: 'personal', label: 'Personal Development' },
            { value: 'technical-certifications', label: 'Technical Certifications' }
          ].map(domain => (
            <label key={domain.value} className="checkbox-label">
              <input
                type="checkbox"
                value={domain.value}
                checked={formData.learningDomains?.includes(domain.value) || false}
                onChange={(e) => {
                  const current = formData.learningDomains || [];
                  if (e.target.checked) {
                    handleInputChange('learningDomains', [...current, domain.value]);
                  } else {
                    handleInputChange('learningDomains', current.filter(d => d !== domain.value));
                  }
                }}
              />
              <span className="checkmark"></span>
              {domain.label}
            </label>
          ))}
        </div>
        <ValidationMessage message={getFieldError('learningDomains')} />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
