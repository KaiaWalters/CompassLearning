# Product Requirements Document: Learning Plan Generator

## Introduction/Overview

The Learning Plan Generator is an AI-powered feature that transforms survey results and AI-generated summaries into actionable, personalized learning plans. This feature addresses the gap between learning goal identification and practical implementation by providing users with structured daily tasks, curated free resources, and progress tracking capabilities. The system serves both individual learners seeking structured learning paths and educators who can provide feedback and guidance on learning plans.

## Goals

1. **Transform survey data into actionable learning plans** - Convert user survey responses into structured, daily learning tasks with clear objectives
2. **Provide resource curation** - Use AI to find and recommend relevant free online resources (articles, videos, tutorials) for each learning task
3. **Enable progress tracking** - Allow users to view their learning journey through both calendar and table views
4. **Support educator feedback** - Enable educators to review and provide feedback on learner-generated plans
5. **Facilitate plan export** - Allow users to export detailed learning plans as markdown or PDF files

## User Stories

### Individual Learners
- **As a learner**, I want to see my learning plan in a calendar view so that I can visualize my daily tasks and weekly/monthly goals
- **As a learner**, I want to see my learning plan in a table view so that I can quickly scan all tasks and resources
- **As a learner**, I want to export my learning plan so that I can save it offline or share it with others
- **As a learner**, I want to customize my learning plan so that I can adjust it to my changing schedule and preferences
- **As a learner**, I want to see the AI summary of my survey responses so that I can understand the reasoning behind my learning plan

### Educators
- **As an educator**, I want to review a learner's plan so that I can provide targeted feedback
- **As an educator**, I want to see the learner's original survey responses so that I can understand their learning context
- **As an educator**, I want to suggest improvements to learning plans so that I can help optimize the learning experience

## Functional Requirements

### Core Learning Plan Generation
1. The system must generate a learning plan using the completed survey data and AI summary
2. The system must create daily learning tasks with time estimates (15-60 minutes per task)
3. The system must tag each task with relevant learning goals (e.g., "Data Structures and Algorithms" for LeetCode practice)
4. The system must organize tasks into weekly and monthly milestones
5. The system must curate 2-3 free resources per learning task using AI knowledge and web search

### Display Views
6. The system must provide a calendar view showing daily tasks with weekly/monthly goal tags
7. The system must provide a table view showing all tasks with columns for: Task, Resources, Time Estimate, Learning Goal Tags, Status
8. The system must display the AI summary in a collapsible section at the top of both views
9. The system must allow users to switch between calendar and table views

### Customization Features
10. The system must allow users to mark tasks as completed/in-progress/not started
11. The system must allow users to reorder tasks within the same day/week
12. The system must allow users to remove tasks they don't want to complete
13. The system must allow users to add custom tasks to their learning plan

### Export Functionality
14. The system must export learning plans as markdown files with task details and resource links
15. The system must export learning plans as PDF files with formatted tables and calendar layouts
16. The system must include the AI summary in exported files

### Integration
17. The system must be accessible as a separate page after form completion
18. The system must preserve and display the original survey responses
19. The system must maintain the AI-generated summary from the survey

## Non-Goals (Out of Scope)

- Paid resource recommendations
- Real-time collaboration features
- Advanced analytics and progress tracking
- Integration with external learning platforms (Coursera, Udemy, etc.)
- Mobile app development
- Offline functionality
- User authentication and accounts
- Social sharing features

## Design Considerations

- **Calendar View**: Use a monthly calendar layout with daily task cards showing task name, time estimate, and learning goal tags
- **Table View**: Use a responsive table with sortable columns and filtering options
- **AI Summary**: Collapsible section with clear visual hierarchy
- **Export Buttons**: Prominent export options in both views
- **Responsive Design**: Ensure both views work on desktop and tablet devices
- **Color Coding**: Use consistent colors for different learning goal tags and task statuses

## Technical Considerations

- **AI Integration**: Extend existing OpenAI service to generate learning plans and curate resources
- **Web Search**: Integrate with a web search API for finding current resources
- **PDF Generation**: Use a client-side PDF library (e.g., jsPDF, Puppeteer) for export functionality
- **State Management**: Extend existing form state management to include learning plan data
- **Routing**: Add new route for learning plan page
- **Data Structure**: Design learning plan data structure to support both calendar and table views

## Success Metrics

- **User Engagement**: Time spent viewing and interacting with learning plans
- **Task Completion**: Percentage of daily tasks marked as completed
- **Export Usage**: Number of learning plans exported per user
- **User Satisfaction**: Feedback on plan quality and usefulness
- **Educator Feedback**: Quality and frequency of educator input on learning plans

## Open Questions

1. What specific web search API should we use for resource curation?
2. Should we implement any caching for generated learning plans?
3. How should we handle cases where no relevant free resources are found for a task?
4. What's the maximum number of daily tasks we should recommend?
5. Should we include any gamification elements (badges, streaks) in the MVP?

## Implementation Priority (MVP - 1 Hour)

### Phase 1 (30 minutes)
- Create learning plan data structure
- Extend OpenAI service for plan generation
- Build basic table view component
- Add export to markdown functionality

### Phase 2 (30 minutes)
- Create calendar view component
- Add task customization features
- Implement PDF export
- Add AI summary collapsible section
- Connect to existing form flow

## Dependencies

- Existing LearningGoalsForm component
- OpenAI API integration
- Web search API (to be determined)
- PDF generation library
- React calendar component library (optional)
