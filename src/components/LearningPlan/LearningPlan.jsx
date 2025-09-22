import { useState, useEffect } from 'react';
import LearningPlanTable from './LearningPlanTable';
import LearningPlanCalendar from './LearningPlanCalendar';
import { generateLearningPlan, exportToMarkdown, exportToPDF } from '../../utils/learningPlanService';
import './LearningPlan.css';

const LearningPlan = ({ formData, aiSummary, onBack }) => {
  const [plan, setPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('table'); // 'table' or 'calendar'

  useEffect(() => {
    generatePlan();
  }, [formData, aiSummary]);

  const generatePlan = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateLearningPlan(formData, aiSummary);
      
      if (result.success) {
        setPlan(result.plan);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to generate learning plan. Please try again.');
      console.error('Plan generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdatePlan = (updatedPlan) => {
    setPlan(updatedPlan);
  };

  const handleExportMarkdown = () => {
    if (!plan) return;

    const markdown = exportToMarkdown(plan, aiSummary, formData);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning-plan-${formData.name.replace(/\s+/g, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    if (!plan) return;

    const doc = exportToPDF(plan, aiSummary, formData);
    doc.save(`learning-plan-${formData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  };

  if (isGenerating) {
    return (
      <div className="learning-plan-container">
        <div className="generating-state">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <h2>Creating Your Learning Plan</h2>
          <p>Our AI is analyzing your responses and crafting a personalized learning journey...</p>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="learning-plan-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={generatePlan} className="btn-primary">
              Try Again
            </button>
            <button onClick={onBack} className="btn-secondary">
              Back to Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="learning-plan-container">
        <div className="error-state">
          <div className="error-icon">❌</div>
          <h2>No Learning Plan Available</h2>
          <p>Unable to generate a learning plan. Please try again.</p>
          <button onClick={onBack} className="btn-primary">
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="learning-plan-container">
      {/* Header */}
      <div className="plan-header">
        <div className="header-content">
          <h1>Your Personalized Learning Plan</h1>
          <p>Based on your learning goals and preferences</p>
        </div>
        <div className="header-actions">
          <button onClick={onBack} className="btn-secondary">
            ← Back to Form
          </button>
        </div>
      </div>

      {/* View Controls */}
      <div className="view-controls">
        <div className="view-tabs">
          <button
            className={`view-tab ${currentView === 'table' ? 'active' : ''}`}
            onClick={() => setCurrentView('table')}
          >
            📋 Table View
          </button>
          <button
            className={`view-tab ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => setCurrentView('calendar')}
          >
            📅 Calendar View
          </button>
        </div>
        
        <div className="export-actions">
          <button onClick={handleExportMarkdown} className="btn-export">
            📄 Export Markdown
          </button>
          <button onClick={handleExportPDF} className="btn-export">
            📑 Export PDF
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="plan-content">
        {currentView === 'table' ? (
          <LearningPlanTable
            plan={plan}
            aiSummary={aiSummary}
            formData={formData}
            onUpdatePlan={handleUpdatePlan}
          />
        ) : (
          <LearningPlanCalendar
            plan={plan}
            aiSummary={aiSummary}
            formData={formData}
            onUpdatePlan={handleUpdatePlan}
          />
        )}
      </div>
    </div>
  );
};

export default LearningPlan;
