import { useState } from 'react';
import './LearningPlanTable.css';

const LearningPlanTable = ({ plan, aiSummary, formData, onUpdatePlan }) => {
  const [showSummary, setShowSummary] = useState(true);
  const [sortBy, setSortBy] = useState('week');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedPlan = {
      ...plan,
      dailyTasks: plan.dailyTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    };
    onUpdatePlan(updatedPlan);
  };

  const handleRemoveTask = (taskId) => {
    const updatedPlan = {
      ...plan,
      dailyTasks: plan.dailyTasks.filter(task => task.id !== taskId),
      metadata: {
        ...plan.metadata,
        totalTasks: plan.dailyTasks.length - 1
      }
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

  // Filter and sort tasks
  const filteredTasks = plan.dailyTasks
    .filter(task => filterStatus === 'all' || task.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'week') {
        return a.week - b.week || a.day.localeCompare(b.day);
      } else if (sortBy === 'day') {
        const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
      } else if (sortBy === 'time') {
        return a.timeEstimate - b.timeEstimate;
      }
      return 0;
    });

  return (
    <div className="learning-plan-table">
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

      {/* Plan Overview */}
      <div className="plan-overview">
        <h2>Your Learning Plan</h2>
        <div className="overview-stats">
          <div className="stat">
            <span className="stat-number">{plan.metadata.totalWeeks}</span>
            <span className="stat-label">Weeks</span>
          </div>
          <div className="stat">
            <span className="stat-number">{plan.metadata.totalTasks}</span>
            <span className="stat-label">Tasks</span>
          </div>
          <div className="stat">
            <span className="stat-number">{plan.metadata.estimatedHoursPerWeek}</span>
            <span className="stat-label">Hours/Week</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="table-controls">
        <div className="control-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="week">Week</option>
            <option value="day">Day</option>
            <option value="time">Time</option>
          </select>
        </div>
        <div className="control-group">
          <label>Filter:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Tasks</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="learning-tasks-table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Day</th>
              <th>Task</th>
              <th>Time</th>
              <th>Tags</th>
              <th>Status</th>
              <th>Resources</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className={`task-row status-${task.status}`}>
                <td>Week {task.week}</td>
                <td>{task.day}</td>
                <td>
                  <div className="task-title">{task.title}</div>
                  <div className="task-description">{task.description}</div>
                </td>
                <td>{task.timeEstimate} min</td>
                <td>
                  <div className="tags">
                    {task.learningGoalTags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </td>
                <td>
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
                </td>
                <td>
                  <div className="resources">
                    {task.resources && task.resources.map((resource, index) => (
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
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveTask(task.id)}
                    className="remove-btn"
                    title="Remove task"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTasks.length === 0 && (
        <div className="no-tasks">
          <p>No tasks match your current filter.</p>
        </div>
      )}
    </div>
  );
};

export default LearningPlanTable;
