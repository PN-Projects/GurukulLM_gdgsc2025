
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { UserRole } from "@/contexts/AuthContext";
import { useGeminiChat } from "@/lib/gemini";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatAssistantProps {
  userRole: UserRole;
}

const ChatAssistant = ({ userRole }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { response, generateContent } = useGeminiChat();
  
  // Initialize chat with a welcome message
  useEffect(() => {
    const welcomeMessage = userRole === "teacher" 
      ? "Hello teacher! I'm your AI assistant. I can help you with grading assignments, creating lesson plans, generating quiz questions, or providing teaching resources. How can I assist you today?"
      : "Hello student! I'm your AI assistant. I can help you with understanding concepts, solving problems, finding resources, or preparing for exams. How can I help you today?";
    
    setMessages([
      {
        id: "welcome",
        content: welcomeMessage,
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
  }, [userRole]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle response changes
  useEffect(() => {
    if (response.text && !response.loading) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          content: response.text,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, [response.text, response.loading]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: `user-${Date.now()}`,
      content: input,
      role: "user" as const,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Create context for the AI based on user role
    let prompt = userRole === "teacher" 
      ? `You are an AI assistant for a teacher. Answer the following question professionally and helpfully: ${input}`
      : `You are an AI assistant for a student. Answer the following question in an educational and supportive way: ${input}`;
    
    await generateContent(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[600px] w-full shadow-md border-gurukul-secondary/20">
      <CardHeader className="bg-gradient-to-r from-gurukul-primary to-gurukul-secondary py-4">
        <CardTitle className="text-white flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-white/20 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m16 10-4 4-4-4" />
            </svg>
          </div>
          {userRole === "teacher" ? "Teacher Assistant" : "Learning Assistant"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-0">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3 max-w-[80%]", {
                "ml-auto": message.role === "user",
                "mr-auto": message.role === "assistant",
              })}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/favicon.svg" />
                  <AvatarFallback className="bg-gurukul-primary text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn("rounded-lg px-4 py-2 text-sm", {
                  "bg-gurukul-primary text-white": message.role === "user",
                  "bg-gray-100": message.role === "assistant",
                })}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gurukul-accent text-white">
                    You
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {response.loading && (
            <div className="flex gap-3 max-w-[80%] mr-auto">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/favicon.svg" />
                <AvatarFallback className="bg-gurukul-primary text-white">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-4 py-2 text-sm bg-gray-100">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow"
              disabled={response.loading}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!input.trim() || response.loading}
              className="bg-gurukul-secondary hover:bg-gurukul-secondary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAssistant;
