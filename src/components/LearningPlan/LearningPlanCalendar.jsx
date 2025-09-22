import { useState } from 'react';
import './LearningPlanCalendar.css';

const LearningPlanCalendar = ({ plan, aiSummary, formData, onUpdatePlan }) => {
  const [showSummary, setShowSummary] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(1);

  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedPlan = {
      ...plan,
      dailyTasks: plan.dailyTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    };
    onUpdatePlan(updatedPlan);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in_progress': return '#FF9800';
      case 'not_started': return '#9E9E9E';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in_progress': return '🔄';
      case 'not_started': return '⏳';
      default: return '⏳';
    }
  };

  const getWeekTasks = (week) => {
    return plan.dailyTasks.filter(task => task.week === week);
  };

  const getDayTasks = (week, day) => {
    return getWeekTasks(week).filter(task => task.day === day);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="learning-plan-calendar">
      {/* AI Summary Section */}
      <div className="ai-summary-section">
        <button 
          className="summary-toggle"
          onClick={() => setShowSummary(!showSummary)}
        >
          <span className="toggle-icon">{showSummary ? '▼' : '▶'}</span>
          AI Analysis Summary
        </button>
        {showSummary && (
          <div className="summary-content">
            <p>{aiSummary}</p>
          </div>
        )}
      </div>

      {/* Week Navigation */}
      <div className="week-navigation">
        <h2>Week {currentWeek}</h2>
        <div className="week-controls">
          <button 
            onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
            disabled={currentWeek === 1}
            className="week-btn"
          >
            ← Previous
          </button>
          <span className="week-indicator">
            {currentWeek} of {plan.metadata.totalWeeks}
          </span>
          <button 
            onClick={() => setCurrentWeek(Math.min(plan.metadata.totalWeeks, currentWeek + 1))}
            disabled={currentWeek === plan.metadata.totalWeeks}
            className="week-btn"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Weekly Goal */}
      <div className="weekly-goal">
        <h3>Week {currentWeek} Goal</h3>
        <p>{plan.weeklyGoals.find(goal => goal.week === currentWeek)?.description || 'No goal set for this week'}</p>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {days.map(day => {
          const dayTasks = getDayTasks(currentWeek, day);
          return (
            <div key={day} className="calendar-day">
              <div className="day-header">
                <h4>{day}</h4>
                <span className="task-count">{dayTasks.length} tasks</span>
              </div>
              <div className="day-tasks">
                {dayTasks.length === 0 ? (
                  <div className="no-tasks">No tasks scheduled</div>
                ) : (
                  dayTasks.map(task => (
                    <div key={task.id} className={`task-card status-${task.status}`}>
                      <div className="task-header">
                        <h5>{task.title}</h5>
                        <select
                          value={task.status}
                          onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                          className="status-select"
                          style={{ color: getStatusColor(task.status) }}
                        >
                          <option value="not_started">Not Started</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <p className="task-description">{task.description}</p>
                      <div className="task-meta">
                        <span className="task-time">{task.timeEstimate} min</span>
                        <div className="task-tags">
                          {task.learningGoalTags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                      {task.resources && task.resources.length > 0 && (
                        <div className="task-resources">
                          {task.resources.map((resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="resource-link"
                            >
                              {resource.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPlanCalendar;
