import OpenAI from 'openai';
import jsPDF from 'jspdf';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Learning Plan Data Structure
export const createLearningPlanStructure = () => ({
  id: Date.now(),
  createdAt: new Date().toISOString(),
  summary: '',
  weeklyGoals: [],
  dailyTasks: [],
  resources: [],
  metadata: {
    totalWeeks: 0,
    totalTasks: 0,
    estimatedHoursPerWeek: 0
  }
});

// Generate learning plan using OpenAI
export const generateLearningPlan = async (formData, aiSummary) => {
  try {
    const prompt = `Based on the following learning goals assessment and AI summary, create a detailed 4-week learning plan with daily tasks, weekly goals, and free online resources.

FORM DATA:
- Name: ${formData.name}
- Learning Domains: ${formData.learningDomains?.join(', ')}
- Skill Levels: ${JSON.stringify(formData.skillLevels)}
- Learning Goals: ${formData.learningGoals?.map(goal => `${goal.description} (Target: ${goal.targetDate})`).join('; ')}
- Learning Style: ${formData.learningStyle}
- Resource Preferences: ${formData.resourcePreferences?.join(', ')}
- Time Constraints: ${formData.hoursPerWeek} hours/week
- Preferred Study Times: ${formData.preferredStudyTimes}

AI SUMMARY: ${aiSummary}

Please generate a structured learning plan with:
1. 4 weekly goals (one for each week)
2. 5-7 daily tasks per week (Monday-Friday, 15-60 minutes each)
3. Each task should be tagged with relevant learning goals
4. 2-3 free online resources per task (articles, videos, tutorials)
5. Time estimates for each task

Return the response as a JSON object with this exact structure:
{
  "weeklyGoals": [
    {
      "week": 1,
      "title": "Week 1 Goal Title",
      "description": "Detailed description of what to achieve this week",
      "learningGoalTags": ["tag1", "tag2"]
    }
  ],
  "dailyTasks": [
    {
      "id": "task_1",
      "week": 1,
      "day": "Monday",
      "title": "Task Title",
      "description": "Detailed task description",
      "timeEstimate": 30,
      "learningGoalTags": ["tag1"],
      "status": "not_started",
      "resources": [
        {
          "title": "Resource Title",
          "url": "https://example.com",
          "type": "article|video|tutorial",
          "description": "Brief description"
        }
      ]
    }
  ],
  "metadata": {
    "totalWeeks": 4,
    "totalTasks": 20,
    "estimatedHoursPerWeek": 5
  }
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    
    // Try to parse JSON from the response
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const planData = JSON.parse(jsonMatch[0]);
        return {
          success: true,
          plan: planData
        };
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
    }

    // Fallback: return a structured response even if JSON parsing fails
    return {
      success: true,
      plan: {
        weeklyGoals: [
          {
            week: 1,
            title: "Foundation Building",
            description: "Establish fundamental concepts and skills",
            learningGoalTags: formData.learningDomains || ["General Learning"]
          }
        ],
        dailyTasks: [
          {
            id: "task_1",
            week: 1,
            day: "Monday",
            title: "Introduction to Core Concepts",
            description: "Begin with foundational concepts and terminology",
            timeEstimate: 30,
            learningGoalTags: formData.learningDomains || ["General Learning"],
            status: "not_started",
            resources: [
              {
                title: "Getting Started Guide",
                url: "https://example.com",
                type: "article",
                description: "Comprehensive introduction to the topic"
              }
            ]
          }
        ],
        metadata: {
          totalWeeks: 4,
          totalTasks: 1,
          estimatedHoursPerWeek: 2.5
        }
      }
    };

  } catch (error) {
    console.error('Learning Plan Generation Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate learning plan'
    };
  }
};

// Export learning plan to markdown
export const exportToMarkdown = (plan, aiSummary, formData) => {
  const { weeklyGoals, dailyTasks, metadata } = plan;
  
  let markdown = `# Learning Plan for ${formData.name}\n\n`;
  markdown += `**Generated on:** ${new Date().toLocaleDateString()}\n\n`;
  
  // AI Summary section
  markdown += `## AI Analysis Summary\n\n${aiSummary}\n\n`;
  
  // Overview
  markdown += `## Plan Overview\n\n`;
  markdown += `- **Duration:** ${metadata.totalWeeks} weeks\n`;
  markdown += `- **Total Tasks:** ${metadata.totalTasks}\n`;
  markdown += `- **Estimated Hours per Week:** ${metadata.estimatedHoursPerWeek}\n\n`;
  
  // Weekly Goals
  markdown += `## Weekly Goals\n\n`;
  weeklyGoals.forEach(goal => {
    markdown += `### Week ${goal.week}: ${goal.title}\n`;
    markdown += `${goal.description}\n\n`;
  });
  
  // Daily Tasks
  markdown += `## Daily Tasks\n\n`;
  for (let week = 1; week <= metadata.totalWeeks; week++) {
    const weekTasks = dailyTasks.filter(task => task.week === week);
    if (weekTasks.length > 0) {
      markdown += `### Week ${week}\n\n`;
      weekTasks.forEach(task => {
        markdown += `#### ${task.day}: ${task.title}\n`;
        markdown += `**Time:** ${task.timeEstimate} minutes\n`;
        markdown += `**Description:** ${task.description}\n`;
        markdown += `**Tags:** ${task.learningGoalTags.join(', ')}\n\n`;
        
        if (task.resources && task.resources.length > 0) {
          markdown += `**Resources:**\n`;
          task.resources.forEach(resource => {
            markdown += `- [${resource.title}](${resource.url}) (${resource.type})\n`;
            markdown += `  - ${resource.description}\n`;
          });
          markdown += `\n`;
        }
      });
    }
  }
  
  return markdown;
};

// Update task status
export const updateTaskStatus = (plan, taskId, newStatus) => {
  const updatedPlan = { ...plan };
  const taskIndex = updatedPlan.dailyTasks.findIndex(task => task.id === taskId);
  
  if (taskIndex !== -1) {
    updatedPlan.dailyTasks[taskIndex].status = newStatus;
  }
  
  return updatedPlan;
};

// Reorder tasks within the same day
export const reorderTasks = (plan, week, day, newOrder) => {
  const updatedPlan = { ...plan };
  const dayTasks = updatedPlan.dailyTasks.filter(task => task.week === week && task.day === day);
  
  newOrder.forEach((taskId, index) => {
    const task = dayTasks.find(t => t.id === taskId);
    if (task) {
      const taskIndex = updatedPlan.dailyTasks.findIndex(t => t.id === taskId);
      updatedPlan.dailyTasks[taskIndex].order = index;
    }
  });
  
  return updatedPlan;
};

// Remove task
export const removeTask = (plan, taskId) => {
  const updatedPlan = { ...plan };
  updatedPlan.dailyTasks = updatedPlan.dailyTasks.filter(task => task.id !== taskId);
  updatedPlan.metadata.totalTasks = updatedPlan.dailyTasks.length;
  
  return updatedPlan;
};

// Export learning plan to PDF
export const exportToPDF = (plan, aiSummary, formData) => {
  const { weeklyGoals, dailyTasks, metadata } = plan;
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let yPosition = 20;
  
  // Helper function to add text with word wrap
  const addText = (text, x, y, maxWidth = pageWidth - 40) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * 6);
  };
  
  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace = 20) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };
  
  // Title
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  yPosition = addText(`Learning Plan for ${formData.name}`, 20, yPosition);
  yPosition += 10;
  
  // Generated date
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  yPosition = addText(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition);
  yPosition += 15;
  
  // AI Summary
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  yPosition = addText('AI Analysis Summary', 20, yPosition);
  yPosition += 5;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  yPosition = addText(aiSummary, 20, yPosition);
  yPosition += 15;
  
  // Plan Overview
  checkNewPage();
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  yPosition = addText('Plan Overview', 20, yPosition);
  yPosition += 5;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  yPosition = addText(`Duration: ${metadata.totalWeeks} weeks`, 20, yPosition);
  yPosition = addText(`Total Tasks: ${metadata.totalTasks}`, 20, yPosition);
  yPosition = addText(`Estimated Hours per Week: ${metadata.estimatedHoursPerWeek}`, 20, yPosition);
  yPosition += 15;
  
  // Weekly Goals
  checkNewPage();
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  yPosition = addText('Weekly Goals', 20, yPosition);
  yPosition += 5;
  
  weeklyGoals.forEach(goal => {
    checkNewPage(30);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    yPosition = addText(`Week ${goal.week}: ${goal.title}`, 20, yPosition);
    yPosition += 3;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    yPosition = addText(goal.description, 20, yPosition);
    yPosition += 10;
  });
  
  // Daily Tasks
  checkNewPage();
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  yPosition = addText('Daily Tasks', 20, yPosition);
  yPosition += 5;
  
  for (let week = 1; week <= metadata.totalWeeks; week++) {
    const weekTasks = dailyTasks.filter(task => task.week === week);
    if (weekTasks.length > 0) {
      checkNewPage(40);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      yPosition = addText(`Week ${week}`, 20, yPosition);
      yPosition += 5;
      
      weekTasks.forEach(task => {
        checkNewPage(25);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        yPosition = addText(`${task.day}: ${task.title}`, 20, yPosition);
        yPosition += 3;
        
        doc.setFont(undefined, 'normal');
        yPosition = addText(`Time: ${task.timeEstimate} minutes`, 20, yPosition);
        yPosition = addText(`Description: ${task.description}`, 20, yPosition);
        yPosition = addText(`Tags: ${task.learningGoalTags.join(', ')}`, 20, yPosition);
        
        if (task.resources && task.resources.length > 0) {
          yPosition += 3;
          doc.setFont(undefined, 'bold');
          yPosition = addText('Resources:', 20, yPosition);
          doc.setFont(undefined, 'normal');
          task.resources.forEach(resource => {
            yPosition = addText(`• ${resource.title} (${resource.type})`, 25, yPosition);
            yPosition = addText(`  ${resource.description}`, 25, yPosition);
          });
        }
        yPosition += 8;
      });
    }
  }
  
  return doc;
};
