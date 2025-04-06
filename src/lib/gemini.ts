import { useState } from "react";

// Temporarily hardcode the API key for testing
const API_KEY = "AIzaSyDXX12pSC76NVSXfwJCqVZ8h8C0iOTLvSk";
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export type GeminiResponse = {
  text: string;
  loading: boolean;
  error: string | null;
};

export const useGeminiChat = () => {
  const [response, setResponse] = useState<GeminiResponse>({
    text: "",
    loading: false,
    error: null,
  });

  const generateContent = async (prompt: string) => {
    setResponse({
      text: "",
      loading: true,
      error: null,
    });

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the response text
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "Sorry, I couldn't generate a response. Please try again.";

      setResponse({
        text: generatedText,
        loading: false,
        error: null,
      });

      return generatedText;
    } catch (error) {
      console.error("Error generating content:", error);
      setResponse({
        text: "",
        loading: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      });
      return null;
    }
  };

  return {
    response,
    generateContent,
  };
};

// Create a specialized assistant for assignment grading
export const gradeAssignment = async (assignmentType: string, studentSubmission: string, rubric?: string) => {
  const prompt = `
    As an AI-powered grading assistant, please evaluate the following ${assignmentType} submission:
    
    ${studentSubmission}
    
    ${rubric ? `Please use the following rubric for grading: ${rubric}` : ''}
    
    Provide:
    1. A numerical score (out of 100)
    2. Detailed feedback highlighting strengths
    3. Areas for improvement
    4. Specific suggestions for enhancement
    5. A brief summary of the evaluation
    
    Format the response clearly with sections for each component of the feedback.
  `;
  
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error grading assignment:", error);
    return "Error grading assignment. Please try again later.";
  }
};

// Create a specialized assistant for generating personalized learning content
export const generateLearningContent = async (topic: string, studentLevel: string, learningStyle: string) => {
  const prompt = `
    Create personalized learning content about "${topic}" for a student at ${studentLevel} level who learns best through ${learningStyle}.
    
    Include:
    1. A brief introduction to the topic
    2. Key concepts explained in a way that matches the student's learning style
    3. 2-3 engaging examples or exercises
    4. A summary of the most important points to remember
    
    Format the content in a clear, structured way that's easy to follow.
  `;
  
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Sorry, I couldn't generate learning content. Please try again.";
  } catch (error) {
    console.error("Error generating learning content:", error);
    return "Error generating learning content. Please try again later.";
  }
};

// Function for teachers to generate quiz questions
export const generateQuizQuestions = async (topic: string, difficulty: string, numberOfQuestions: number) => {
  const prompt = `
    Generate ${numberOfQuestions} multiple-choice quiz questions about "${topic}" at ${difficulty} difficulty level.
    
    For each question:
    1. Provide a clear question
    2. Include 4 possible answers (labeled A, B, C, D)
    3. Mark the correct answer
    4. Add a brief explanation of why the answer is correct
    
    Format each question as a standalone section with clear separation.
  `;
  
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Sorry, I couldn't generate quiz questions. Please try again.";
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    return "Error generating quiz questions. Please try again later.";
  }
};
