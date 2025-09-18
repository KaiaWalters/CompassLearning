import './MotivationStep.css';
import ValidationMessage from '../ValidationMessage';

const MotivationStep = ({ formData, updateFormData, errors }) => {
  const motivationFactors = [
    { id: 'career', label: 'Career Advancement', description: 'Getting promoted, changing jobs, or advancing in my field' },
    { id: 'personal', label: 'Personal Growth', description: 'Self-improvement and personal development' },
    { id: 'financial', label: 'Financial Gain', description: 'Increasing earning potential or financial security' },
    { id: 'passion', label: 'Passion & Interest', description: 'Learning something I\'m genuinely interested in' },
    { id: 'social', label: 'Social Recognition', description: 'Gaining respect or recognition from others' },
    { id: 'challenge', label: 'Challenge & Achievement', description: 'Overcoming challenges and achieving goals' }
  ];

  const experienceLevels = [
    { id: 'none', label: 'Complete Beginner', description: 'No prior experience in this area' },
    { id: 'some', label: 'Some Experience', description: 'Basic knowledge or limited exposure' },
    { id: 'intermediate', label: 'Intermediate', description: 'Moderate experience and understanding' },
    { id: 'advanced', label: 'Advanced', description: 'Significant experience and expertise' }
  ];

  const challengeTypes = [
    { id: 'time', label: 'Time Management', description: 'Finding time to study consistently' },
    { id: 'focus', label: 'Focus & Concentration', description: 'Staying focused during study sessions' },
    { id: 'motivation', label: 'Staying Motivated', description: 'Maintaining motivation over time' },
    { id: 'resources', label: 'Finding Resources', description: 'Knowing what resources to use' },
    { id: 'understanding', label: 'Understanding Concepts', description: 'Grasping complex or abstract concepts' },
    { id: 'practice', label: 'Getting Practice', description: 'Finding opportunities to practice skills' }
  ];

  const handleMotivationChange = (factorId, isSelected) => {
    const currentFactors = formData.motivationFactors || [];
    if (isSelected) {
      updateFormData({
        motivationFactors: [...currentFactors, factorId]
      });
    } else {
      updateFormData({
        motivationFactors: currentFactors.filter(id => id !== factorId)
      });
    }
  };

  const handleChallengeChange = (challengeId, isSelected) => {
    const currentChallenges = formData.learningChallenges || [];
    if (isSelected) {
      updateFormData({
        learningChallenges: [...currentChallenges, challengeId]
      });
    } else {
      updateFormData({
        learningChallenges: currentChallenges.filter(id => id !== challengeId)
      });
    }
  };

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const getFieldError = (field) => {
    return errors[field] || '';
  };

  return (
    <div className="motivation-step">
      <div className="step-intro">
        <p>Understanding your motivation and previous experience helps us create a learning plan that builds on your strengths and addresses your challenges.</p>
      </div>

      <div className="motivation-sections">
        <div className="motivation-section">
          <h3>What motivates you to learn? *</h3>
          <p className="section-description">Select all that apply</p>
          <div className="motivation-grid">
            {motivationFactors.map(factor => (
              <label
                key={factor.id}
                className={`motivation-card ${(formData.motivationFactors || []).includes(factor.id) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  value={factor.id}
                  checked={(formData.motivationFactors || []).includes(factor.id)}
                  onChange={(e) => handleMotivationChange(factor.id, e.target.checked)}
                />
                <div className="motivation-content">
                  <h4>{factor.label}</h4>
                  <p>{factor.description}</p>
                </div>
              </label>
            ))}
          </div>
          <ValidationMessage message={getFieldError('motivationFactors')} />
        </div>

        <div className="motivation-section">
          <h3>What's your previous experience level? *</h3>
          <div className="experience-options">
            {experienceLevels.map(level => (
              <label
                key={level.id}
                className={`experience-card ${formData.previousExperience === level.id ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="previousExperience"
                  value={level.id}
                  checked={formData.previousExperience === level.id}
                  onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                />
                <div className="experience-content">
                  <h4>{level.label}</h4>
                  <p>{level.description}</p>
                </div>
              </label>
            ))}
          </div>
          <ValidationMessage message={getFieldError('previousExperience')} />
        </div>

        <div className="motivation-section">
          <h3>What learning challenges do you face? *</h3>
          <p className="section-description">Select all that apply - this helps us provide better support</p>
          <div className="challenges-grid">
            {challengeTypes.map(challenge => (
              <label
                key={challenge.id}
                className={`challenge-card ${(formData.learningChallenges || []).includes(challenge.id) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  value={challenge.id}
                  checked={(formData.learningChallenges || []).includes(challenge.id)}
                  onChange={(e) => handleChallengeChange(challenge.id, e.target.checked)}
                />
                <div className="challenge-content">
                  <h4>{challenge.label}</h4>
                  <p>{challenge.description}</p>
                </div>
              </label>
            ))}
          </div>
          <ValidationMessage message={getFieldError('learningChallenges')} />
        </div>

        <div className="motivation-section">
          <h3>Support Systems</h3>
          <div className="form-group">
            <label htmlFor="supportSystems">What support do you have for learning? (Optional)</label>
            <textarea
              id="supportSystems"
              value={formData.supportSystems || ''}
              onChange={(e) => handleInputChange('supportSystems', e.target.value)}
              placeholder="e.g., Study group, mentor, family support, online community, learning partner..."
              rows="3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationStep;
