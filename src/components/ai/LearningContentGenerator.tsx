
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
import { generateLearningContent } from "@/lib/gemini";

const LearningContentGenerator = () => {
  const [topic, setTopic] = useState("");
  const [studentLevel, setStudentLevel] = useState("high-school");
  const [learningStyle, setLearningStyle] = useState("visual");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateContent = async () => {
    if (!topic) return;
    
    setIsLoading(true);
    setGeneratedContent("");
    
    try {
      const result = await generateLearningContent(topic, studentLevel, learningStyle);
      setGeneratedContent(result);
    } catch (error) {
      console.error("Error generating learning content:", error);
      setGeneratedContent("Error generating learning content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Learning Content Generator</CardTitle>
          <CardDescription>
            Create customized learning materials for students based on their preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Quadratic Equations, Shakespeare, Chemical Bonding"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Student Level</Label>
            <Select
              value={studentLevel}
              onValueChange={setStudentLevel}
            >
              <SelectTrigger id="level">
                <SelectValue placeholder="Select student level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="elementary">Elementary School</SelectItem>
                <SelectItem value="middle-school">Middle School</SelectItem>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">Learning Style</Label>
            <Select
              value={learningStyle}
              onValueChange={setLearningStyle}
            >
              <SelectTrigger id="style">
                <SelectValue placeholder="Select learning style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visual">Visual</SelectItem>
                <SelectItem value="auditory">Auditory</SelectItem>
                <SelectItem value="reading-writing">Reading/Writing</SelectItem>
                <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                <SelectItem value="multimodal">Multimodal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateContent} 
            disabled={!topic || isLoading}
            className="w-full bg-gurukul-secondary hover:bg-gurukul-secondary/90"
          >
            {isLoading ? "Generating..." : "Generate Content"}
          </Button>
        </CardFooter>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Learning Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans p-4 bg-gray-50 rounded-md">
                {generatedContent}
              </pre>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Copy Content</Button>
            <Button variant="default">Save Content</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default LearningContentGenerator;
