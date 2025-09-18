import './LearningStyleStep.css';
import ValidationMessage from '../ValidationMessage';

const LearningStyleStep = ({ formData, updateFormData, errors }) => {
  const learningStyles = [
    { 
      id: 'visual', 
      label: 'Visual', 
      description: 'I learn best through images, diagrams, charts, and visual aids',
      icon: '👁️'
    },
    { 
      id: 'auditory', 
      label: 'Auditory', 
      description: 'I learn best through listening, discussions, and verbal explanations',
      icon: '👂'
    },
    { 
      id: 'kinesthetic', 
      label: 'Hands-on', 
      description: 'I learn best through doing, practicing, and physical activities',
      icon: '✋'
    },
    { 
      id: 'reading-writing', 
      label: 'Reading/Writing', 
      description: 'I learn best through reading texts, taking notes, and writing',
      icon: '📚'
    }
  ];

  const resourceTypes = [
    { id: 'videos', label: 'Videos & Tutorials', description: 'YouTube, online courses, video lectures' },
    { id: 'articles', label: 'Articles & Blogs', description: 'Written content, documentation, guides' },
    { id: 'interactive', label: 'Interactive Content', description: 'Coding exercises, simulations, quizzes' },
    { id: 'group', label: 'Group Learning', description: 'Study groups, forums, peer discussions' },
    { id: 'books', label: 'Books & eBooks', description: 'Traditional and digital books' },
    { id: 'podcasts', label: 'Podcasts & Audio', description: 'Audio content, lectures, interviews' }
  ];

  const handleLearningStyleChange = (styleId) => {
    updateFormData({ learningStyle: styleId });
  };

  const handleResourcePreferenceChange = (resourceId, isSelected) => {
    const currentPreferences = formData.resourcePreferences || [];
    if (isSelected) {
      updateFormData({
        resourcePreferences: [...currentPreferences, resourceId]
      });
    } else {
      updateFormData({
        resourcePreferences: currentPreferences.filter(id => id !== resourceId)
      });
    }
  };

  const getFieldError = (field) => {
    return errors[field] || '';
  };

  return (
    <div className="learning-style-step">
      <div className="step-intro">
        <p>Understanding your learning preferences helps us recommend the most effective resources and study methods for you.</p>
      </div>

      <div className="learning-style-section">
        <h3>How do you learn best?</h3>
        <div className="learning-styles-grid">
          {learningStyles.map(style => (
            <label
              key={style.id}
              className={`learning-style-card ${formData.learningStyle === style.id ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="learningStyle"
                value={style.id}
                checked={formData.learningStyle === style.id}
                onChange={() => handleLearningStyleChange(style.id)}
              />
              <div className="style-content">
                <div className="style-icon">{style.icon}</div>
                <h4>{style.label}</h4>
                <p>{style.description}</p>
              </div>
            </label>
          ))}
        </div>
        <ValidationMessage message={getFieldError('learningStyle')} />
      </div>

      <div className="resource-preferences-section">
        <h3>What types of resources do you prefer?</h3>
        <p className="section-description">Select all that apply - you can choose multiple options</p>
        <div className="resource-types-grid">
          {resourceTypes.map(resource => (
            <label
              key={resource.id}
              className={`resource-card ${(formData.resourcePreferences || []).includes(resource.id) ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                value={resource.id}
                checked={(formData.resourcePreferences || []).includes(resource.id)}
                onChange={(e) => handleResourcePreferenceChange(resource.id, e.target.checked)}
              />
              <div className="resource-content">
                <h4>{resource.label}</h4>
                <p>{resource.description}</p>
              </div>
            </label>
          ))}
        </div>
        <ValidationMessage message={getFieldError('resourcePreferences')} />
      </div>
    </div>
  );
};

export default LearningStyleStep;
