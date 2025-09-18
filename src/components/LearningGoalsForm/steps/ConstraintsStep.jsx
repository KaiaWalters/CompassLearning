import './ConstraintsStep.css';
import ValidationMessage from '../ValidationMessage';

const ConstraintsStep = ({ formData, updateFormData, errors }) => {
  const timeSlots = [
    { id: 'morning', label: 'Morning (6 AM - 12 PM)', description: 'Early bird learner' },
    { id: 'afternoon', label: 'Afternoon (12 PM - 6 PM)', description: 'Midday focus' },
    { id: 'evening', label: 'Evening (6 PM - 10 PM)', description: 'After work/school' },
    { id: 'night', label: 'Night (10 PM - 2 AM)', description: 'Night owl' },
    { id: 'flexible', label: 'Flexible', description: 'Varies by day' }
  ];

  const durationOptions = [
    { id: 'short', label: 'Short sessions (15-30 min)', description: 'Quick daily practice' },
    { id: 'medium', label: 'Medium sessions (1-2 hours)', description: 'Focused learning blocks' },
    { id: 'long', label: 'Long sessions (3+ hours)', description: 'Deep dive sessions' },
    { id: 'mixed', label: 'Mixed approach', description: 'Combination of session lengths' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const getFieldError = (field) => {
    return errors[field] || '';
  };

  return (
    <div className="constraints-step">
      <div className="step-intro">
        <p>Help us understand your schedule and preferences so we can create a realistic learning plan that fits your lifestyle.</p>
      </div>

      <div className="constraints-grid">
        <div className="constraint-section">
          <h3>Time Availability</h3>
          <div className="form-group">
            <label htmlFor="hoursPerWeek">How many hours per week can you dedicate to learning? *</label>
            <div className="hours-input-container">
              <input
                type="number"
                id="hoursPerWeek"
                min="1"
                max="168"
                value={formData.hoursPerWeek || ''}
                onChange={(e) => handleInputChange('hoursPerWeek', parseInt(e.target.value))}
                className={getFieldError('hoursPerWeek') ? 'error' : ''}
                placeholder="Enter hours per week"
              />
              <span className="input-suffix">hours/week</span>
            </div>
            <ValidationMessage message={getFieldError('hoursPerWeek')} />
          </div>
        </div>

        <div className="constraint-section">
          <h3>Preferred Study Times</h3>
          <div className="time-slots">
            {timeSlots.map(slot => (
              <label
                key={slot.id}
                className={`time-slot-card ${formData.preferredStudyTimes === slot.id ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="preferredStudyTimes"
                  value={slot.id}
                  checked={formData.preferredStudyTimes === slot.id}
                  onChange={(e) => handleInputChange('preferredStudyTimes', e.target.value)}
                />
                <div className="slot-content">
                  <h4>{slot.label}</h4>
                  <p>{slot.description}</p>
                </div>
              </label>
            ))}
          </div>
          <ValidationMessage message={getFieldError('preferredStudyTimes')} />
        </div>

        <div className="constraint-section">
          <h3>Session Duration Preference</h3>
          <div className="duration-options">
            {durationOptions.map(option => (
              <label
                key={option.id}
                className={`duration-card ${formData.durationPreference === option.id ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="durationPreference"
                  value={option.id}
                  checked={formData.durationPreference === option.id}
                  onChange={(e) => handleInputChange('durationPreference', e.target.value)}
                />
                <div className="duration-content">
                  <h4>{option.label}</h4>
                  <p>{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="constraint-section">
          <h3>Additional Constraints</h3>
          <div className="form-group">
            <label htmlFor="additionalConstraints">Any other constraints or preferences? (Optional)</label>
            <textarea
              id="additionalConstraints"
              value={formData.additionalConstraints || ''}
              onChange={(e) => handleInputChange('additionalConstraints', e.target.value)}
              placeholder="e.g., I can only study on weekends, I prefer group learning, I have limited internet access..."
              rows="3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstraintsStep;
