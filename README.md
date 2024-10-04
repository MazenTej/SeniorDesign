# Vanguard AI Chatbot - Senior Design Project

## Overview
This project involves developing an **AI-powered chatbot** for **Vanguard** that enhances user interaction by inferring user intent instead of relying on traditional keyword matches. The chatbot is designed to understand user queries in natural language, providing more relevant and accurate responses. This solution improves the user experience by answering complex queries based on intent recognition.

The system is deployed using **AWS Lambda** for serverless computing and **Amazon EC2** for handling backend services.

## Features

- **Intent Recognition**: The chatbot leverages machine learning models to infer user intent from natural language inputs, enabling it to respond to more complex queries.
- **Contextual Understanding**: The bot provides more accurate answers by understanding the context of user questions.
- **Responsive Design**: The chatbot can respond quickly and efficiently to user queries using AWS Lambda for scalable, serverless compute resources.
- **Deployment**:
  - **AWS Lambda**: Handles the serverless backend execution.
  - **EC2 Instances**: Used to support more complex backend processes.
  
## User Features

- **Ask Vanguard Queries**: Users can ask a variety of queries, such as how to transfer money or guidance on financial planning.
- **Examples**:
  - "How do I transfer money into Vanguard?"
  - "What are my next steps for retirement planning?"

## Tech Stack

### Frontend:
- **React.js**: JavaScript library used for building the user interface.
- **Material UI**: Component library for styling and UI components.
- **React Router**: Manages routing and navigation in the application.

### Backend:
- **Flask**: Backend framework for handling API requests and server-side logic.
- **AWS Lambda**: Serverless compute service used to handle requests without provisioning or managing servers.
- **Amazon EC2**: Used for more complex backend processing.
- **SQLite**: Database used for storing user and application data.
- **Flask-CORS**: Middleware for handling cross-origin requests between the frontend and backend.

## Deployment

- **Frontend**: Deployed on **Netlify** or **Vercel**.
- **Backend**: Deployed using **AWS Lambda** and **EC2** for enhanced scalability and performance.

## How to Run

1. Clone the repository.
2. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm start
