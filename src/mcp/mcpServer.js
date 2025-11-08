
import { analyzeLearningGoals } from "../utils/openaiService.js";
import {McpServer}  from '@modelcontextprotocol/sdk/server/mcp.js'

const server = new McpServer({
  name: "learning-goals-mcp",
  version: "1.0.0"
});

server.tool(
  "analyzeLearningGoals",
  {
    description: "Analyzes a user's learning goals form and produces a personalized Ali Abdaal-style learning summary.",
    input: {
      type: "object",
      properties: {
        formData: { type: "object" }
      },
      required: ["formData"]
    },
    output: {
      type: "object"
    }
  },

  async ({ formData }) => {
    return await analyzeLearningGoals(formData);
  }
);

server.start();

//how will the client use this tool 