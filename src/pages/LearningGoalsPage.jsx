import React from 'react';
import LearningGoalsForm from '../components/LearningGoalsForm/LearningGoalsForm';
import './LearningGoalsPage.css';

const LearningGoalsPage = () => {
  return (
    <div className="learning-goals-page">
      <div className="page-header">
        <div className="container">
          <h1>Create Your Learning Plan</h1>
          <p>Answer a few questions to get a personalized learning journey tailored just for you</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <LearningGoalsForm />
        </div>
      </div>
    </div>
  );
};

export default LearningGoalsPage;
