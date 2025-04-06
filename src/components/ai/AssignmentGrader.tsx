
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gradeAssignment } from "@/lib/gemini";

const AssignmentGrader = () => {
  const [assignmentType, setAssignmentType] = useState("essay");
  const [rubric, setRubric] = useState("");
  const [submission, setSubmission] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGrading = async () => {
    if (!submission) return;
    
    setIsLoading(true);
    setFeedback("");
    
    try {
      const result = await gradeAssignment(assignmentType, submission, rubric);
      setFeedback(result);
    } catch (error) {
      console.error("Error grading assignment:", error);
      setFeedback("Error processing the assignment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Assignment Grader</CardTitle>
          <CardDescription>
            Upload student assignments and get AI-generated feedback and grades
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="assignment-type">Assignment Type</Label>
            <Select
              value={assignmentType}
              onValueChange={setAssignmentType}
            >
              <SelectTrigger id="assignment-type">
                <SelectValue placeholder="Select assignment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="essay">Essay</SelectItem>
                <SelectItem value="short-answer">Short Answer</SelectItem>
                <SelectItem value="research-paper">Research Paper</SelectItem>
                <SelectItem value="project-report">Project Report</SelectItem>
                <SelectItem value="code-submission">Code Submission</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rubric">Grading Rubric (optional)</Label>
            <Textarea
              id="rubric"
              placeholder="Enter grading criteria or rubric points..."
              value={rubric}
              onChange={(e) => setRubric(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="submission">Student Submission</Label>
            <Textarea
              id="submission"
              placeholder="Paste student submission here..."
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file-upload">Or Upload Document</Label>
            <Input id="file-upload" type="file" className="cursor-pointer" />
            <p className="text-xs text-muted-foreground mt-1">
              Supported formats: .txt, .pdf, .doc, .docx (max 10MB)
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGrading} 
            disabled={!submission || isLoading}
            className="w-full bg-gurukul-secondary hover:bg-gurukul-secondary/90"
          >
            {isLoading ? "Analyzing..." : "Grade Assignment"}
          </Button>
        </CardFooter>
      </Card>

      {feedback && (
        <Card>
          <CardHeader>
            <CardTitle>Grading Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans p-4 bg-gray-50 rounded-md">
                {feedback}
              </pre>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Copy Feedback</Button>
            <Button variant="default">Save to Student Record</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AssignmentGrader;
