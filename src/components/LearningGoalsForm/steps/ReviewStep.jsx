import './ReviewStep.css';

const ReviewStep = ({ formData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatArray = (arr) => {
    if (!arr || arr.length === 0) return 'None selected';
    return arr.join(', ');
  };

  // const formatObject = (obj) => {
  //   if (!obj || Object.keys(obj).length === 0) return 'None specified';
  //   return Object.entries(obj)
  //     .map(([key, value]) => `${key}: ${value}`)
  //     .join(', ');
  // };

  return (
    <div className="review-step">
      <div className="step-intro">
        <h2>Review Your Learning Profile</h2>
        <p>Please review all the information you've provided. You can go back to any step to make changes before submitting.</p>
      </div>

      <div className="review-sections">
        <div className="review-section">
          <h3>Personal Information</h3>
          <div className="review-grid">
            <div className="review-item">
              <span className="label">Name:</span>
              <span className="value">{formData.name || 'Not provided'}</span>
            </div>
            <div className="review-item">
              <span className="label">Email:</span>
              <span className="value">{formData.email || 'Not provided'}</span>
            </div>
            <div className="review-item">
              <span className="label">Age Range:</span>
              <span className="value">{formData.ageRange || 'Not provided'}</span>
            </div>
            <div className="review-item">
              <span className="label">Location:</span>
              <span className="value">{formData.location || 'Not provided'}</span>
            </div>
            <div className="review-item">
              <span className="label">Learning Domains:</span>
              <span className="value">{formatArray(formData.learningDomains)}</span>
            </div>
          </div>
        </div>

        <div className="review-section">
          <h3>Skill Assessment</h3>
          <div className="skill-levels">
            {formData.skillLevels && Object.keys(formData.skillLevels).length > 0 ? (
              Object.entries(formData.skillLevels).map(([skill, level]) => (
                <div key={skill} className="skill-item">
                  <span className="skill-name">{skill.replace('_', ' ').toUpperCase()}</span>
                  <div className="skill-level">
                    <div className="level-bars">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div
                          key={i}
                          className={`level-bar ${i <= level ? 'filled' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="level-number">{level}/5</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No skill levels assessed</p>
            )}
          </div>
        </div>

        <div className="review-section">
          <h3>Learning Goals</h3>
          <div className="goals-list">
            {formData.learningGoals && formData.learningGoals.length > 0 ? (
              formData.learningGoals.map((goal, index) => (
                <div key={goal.id || index} className="goal-item">
                  <div className="goal-description">
                    <strong>Goal {index + 1}:</strong> {goal.description}
                  </div>
                  <div className="goal-date">
                    <strong>Target Date:</strong> {formatDate(goal.targetDate)}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No learning goals defined</p>
            )}
          </div>
        </div>

        <div className="review-section">
          <h3>Learning Preferences</h3>
          <div className="review-grid">
            <div className="review-item">
              <span className="label">Learning Style:</span>
              <span className="value">{formData.learningStyle || 'Not specified'}</span>
            </div>
            <div className="review-item">
              <span className="label">Resource Preferences:</span>
              <span className="value">{formatArray(formData.resourcePreferences)}</span>
            </div>
            <div className="review-item">
              <span className="label">Hours per Week:</span>
              <span className="value">{formData.hoursPerWeek || 'Not specified'} hours</span>
            </div>
            <div className="review-item">
              <span className="label">Preferred Study Times:</span>
              <span className="value">{formData.preferredStudyTimes || 'Not specified'}</span>
            </div>
            <div className="review-item">
              <span className="label">Duration Preference:</span>
              <span className="value">{formData.durationPreference || 'Not specified'}</span>
            </div>
          </div>
        </div>

        <div className="review-section">
          <h3>Motivation & Experience</h3>
          <div className="review-grid">
            <div className="review-item">
              <span className="label">Motivation Factors:</span>
              <span className="value">{formatArray(formData.motivationFactors)}</span>
            </div>
            <div className="review-item">
              <span className="label">Previous Experience:</span>
              <span className="value">{formData.previousExperience || 'Not specified'}</span>
            </div>
            <div className="review-item">
              <span className="label">Learning Challenges:</span>
              <span className="value">{formatArray(formData.learningChallenges)}</span>
            </div>
            <div className="review-item">
              <span className="label">Support Systems:</span>
              <span className="value">{formData.supportSystems || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {formData.additionalConstraints && (
          <div className="review-section">
            <h3>Additional Information</h3>
            <div className="additional-info">
              <p>{formData.additionalConstraints}</p>
            </div>
          </div>
        )}
      </div>

      <div className="review-actions">
        <p className="review-note">
          <strong>Ready to submit?</strong> Once you submit, our AI will analyze your responses and create a personalized learning plan for you.
        </p>
      </div>
    </div>
  );
};

export default ReviewStep;
