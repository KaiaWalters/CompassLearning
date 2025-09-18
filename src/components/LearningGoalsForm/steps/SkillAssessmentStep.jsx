import './SkillAssessmentStep.css';
import ValidationMessage from '../ValidationMessage';

const SkillAssessmentStep = ({ formData, updateFormData, errors }) => {
  const skillCategories = [
    { id: 'programming', label: 'Programming & Development', description: 'Coding, software development, technical skills' },
    { id: 'design', label: 'Design & UX', description: 'Visual design, user experience, creative skills' },
    { id: 'data', label: 'Data & Analytics', description: 'Data analysis, statistics, research methods' },
    { id: 'business', label: 'Business & Management', description: 'Leadership, project management, strategy' },
    { id: 'communication', label: 'Communication', description: 'Writing, speaking, presentation skills' },
    { id: 'languages', label: 'Languages', description: 'Foreign languages, linguistics' }
  ];

  const handleSkillChange = (skillId, level) => {
    const currentSkills = formData.skillLevels || {};
    updateFormData({
      skillLevels: {
        ...currentSkills,
        [skillId]: level
      }
    });
  };

  const getFieldError = (field) => {
    return errors[field] || '';
  };

  return (
    <div className="skill-assessment-step">
      <div className="step-intro">
        <p>Rate your current skill level in each area. This helps us understand your starting point and tailor recommendations accordingly.</p>
      </div>

      <div className="skill-categories">
        {skillCategories.map(skill => (
          <div key={skill.id} className="skill-category">
            <div className="skill-header">
              <h4>{skill.label}</h4>
              <p className="skill-description">{skill.description}</p>
            </div>
            
            <div className="skill-rating">
              <div className="rating-labels">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
              
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    type="button"
                    className={`rating-btn ${(formData.skillLevels?.[skill.id] || 0) === level ? 'active' : ''}`}
                    onClick={() => handleSkillChange(skill.id, level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
              
              <div className="rating-description">
                {formData.skillLevels?.[skill.id] && (
                  <span className="current-level">
                    Level {formData.skillLevels[skill.id]}: {
                      formData.skillLevels[skill.id] === 1 ? 'Complete beginner' :
                      formData.skillLevels[skill.id] === 2 ? 'Some experience' :
                      formData.skillLevels[skill.id] === 3 ? 'Intermediate' :
                      formData.skillLevels[skill.id] === 4 ? 'Advanced' :
                      'Expert level'
                    }
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ValidationMessage message={getFieldError('skillLevels')} />
    </div>
  );
};

export default SkillAssessmentStep;
