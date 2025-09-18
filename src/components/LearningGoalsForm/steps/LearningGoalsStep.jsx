import './LearningGoalsStep.css';
import ValidationMessage from '../ValidationMessage';
import { useState } from 'react';

const LearningGoalsStep = ({ formData, updateFormData, errors }) => {
  const [newGoal, setNewGoal] = useState({ description: '', targetDate: '' });

  const handleAddGoal = () => {
    if (newGoal.description.trim() && newGoal.targetDate) {
      const currentGoals = formData.learningGoals || [];
      updateFormData({
        learningGoals: [...currentGoals, { ...newGoal, id: Date.now() }]
      });
      setNewGoal({ description: '', targetDate: '' });
    }
  };

  const handleRemoveGoal = (goalId) => {
    const currentGoals = formData.learningGoals || [];
    updateFormData({
      learningGoals: currentGoals.filter(goal => goal.id !== goalId)
    });
  };

  const handleUpdateGoal = (goalId, field, value) => {
    const currentGoals = formData.learningGoals || [];
    updateFormData({
      learningGoals: currentGoals.map(goal => 
        goal.id === goalId ? { ...goal, [field]: value } : goal
      )
    });
  };

  const getFieldError = (field) => {
    return errors[field] || '';
  };

  return (
    <div className="learning-goals-step">
      <div className="step-intro">
        <p>Define your specific learning goals. Be as detailed as possible - this helps our AI create a more personalized learning plan.</p>
      </div>

      <div className="goals-list">
        {(formData.learningGoals || []).map((goal, index) => (
          <div key={goal.id || index} className="goal-item">
            <div className="goal-content">
              <div className="form-group">
                <label>Goal Description</label>
                <textarea
                  value={goal.description}
                  onChange={(e) => handleUpdateGoal(goal.id, 'description', e.target.value)}
                  placeholder="Describe what you want to learn..."
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Target Completion Date</label>
                <input
                  type="date"
                  value={goal.targetDate}
                  onChange={(e) => handleUpdateGoal(goal.id, 'targetDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <button
              type="button"
              className="remove-goal-btn"
              onClick={() => handleRemoveGoal(goal.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="add-goal-form">
        <h4>Add New Goal</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Goal Description</label>
            <textarea
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              placeholder="What do you want to learn?"
              rows="2"
            />
          </div>
          <div className="form-group">
            <label>Target Date</label>
            <input
              type="date"
              value={newGoal.targetDate}
              onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={handleAddGoal}
          disabled={!newGoal.description.trim() || !newGoal.targetDate}
        >
          Add Goal
        </button>
      </div>

      <ValidationMessage message={getFieldError('learningGoals')} />
    </div>
  );
};

export default LearningGoalsStep;
