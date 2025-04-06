
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateQuizQuestions } from "@/lib/gemini";

const QuizGenerator = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [generatedQuiz, setGeneratedQuiz] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQuiz = async () => {
    if (!topic) return;
    
    setIsLoading(true);
    setGeneratedQuiz("");
    
    try {
      const result = await generateQuizQuestions(topic, difficulty, numberOfQuestions);
      setGeneratedQuiz(result);
    } catch (error) {
      console.error("Error generating quiz:", error);
      setGeneratedQuiz("Error generating quiz questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Quiz Generator</CardTitle>
          <CardDescription>
            Create quizzes on any topic with AI-generated questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Quiz Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Photosynthesis, World War II, Linear Algebra"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select
              value={difficulty}
              onValueChange={setDifficulty}
            >
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="questions">Number of Questions</Label>
            <Select
              value={numberOfQuestions.toString()}
              onValueChange={(value) => setNumberOfQuestions(parseInt(value))}
            >
              <SelectTrigger id="questions">
                <SelectValue placeholder="Select number of questions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Questions</SelectItem>
                <SelectItem value="5">5 Questions</SelectItem>
                <SelectItem value="10">10 Questions</SelectItem>
                <SelectItem value="15">15 Questions</SelectItem>
                <SelectItem value="20">20 Questions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateQuiz} 
            disabled={!topic || isLoading}
            className="w-full bg-gurukul-secondary hover:bg-gurukul-secondary/90"
          >
            {isLoading ? "Generating..." : "Generate Quiz"}
          </Button>
        </CardFooter>
      </Card>

      {generatedQuiz && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans p-4 bg-gray-50 rounded-md">
                {generatedQuiz}
              </pre>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Copy Quiz</Button>
            <Button variant="default">Save Quiz</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default QuizGenerator;
