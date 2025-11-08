# Server Setup Guide

This project has been refactored to move OpenAI API calls to a secure server-side implementation.

## Security Improvements

✅ **API keys are now server-side only** - No more exposed keys in client bundles
✅ **Cost control** - Rate limiting and usage tracking can be added
✅ **Better error handling** - Centralized error management

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install the new server dependencies:
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

### 2. Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
PORT=3001
OPENAI_API_KEY=your_actual_openai_api_key_here
```

**Important:** 
- Use `OPENAI_API_KEY` (NOT `VITE_OPENAI_API_KEY`)
- The `VITE_` prefix is for client-side variables and will expose your key
- Never commit your `.env` file to version control

### 3. Run the Server

In one terminal, start the Express server:

```bash
npm run dev:server
```

The server will run on `http://localhost:3001`

### 4. Run the Client

In another terminal, start the Vite dev server:

```bash
npm run dev
```

The client will run on `http://localhost:3000` and will automatically connect to the API server.

## API Endpoints

### POST `/api/learning-plan/generate`
Generates a learning plan using OpenAI.

**Request Body:**
```json
{
  "formData": { ... },
  "aiSummary": "AI-generated summary"
}
```

**Response:**
```json
{
  "success": true,
  "plan": { ... }
}
```

### POST `/api/ai/analyze`
Analyzes learning goals and generates an AI summary.

**Request Body:**
```json
{
  "formData": { ... },
  "learningPlan": "Optional learning plan string"
}
```

**Response:**
```json
{
  "success": true,
  "summary": "AI-generated summary"
}
```

### GET `/health`
Health check endpoint to verify server is running.

## Production Deployment

For production, you'll need to:

1. Set `VITE_API_BASE_URL` environment variable to your production API URL
2. Deploy the server separately (e.g., on Heroku, Railway, or AWS)
3. Ensure the server has access to `OPENAI_API_KEY` environment variable
4. Update CORS settings if needed for your domain

## Troubleshooting

**Error: "Failed to generate learning plan. Make sure the server is running."**
- Ensure the server is running on port 3001
- Check that `OPENAI_API_KEY` is set in your `.env` file
- Verify the API key is valid

**CORS errors:**
- The server includes CORS middleware, but if you see CORS errors, check that the client URL is allowed

**Port conflicts:**
- If port 3001 is in use, change `PORT` in your `.env` file
- Update `VITE_API_BASE_URL` in your client `.env` if you change the port

