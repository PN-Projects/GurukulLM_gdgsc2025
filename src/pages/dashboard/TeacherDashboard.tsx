
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AssignmentGrader from "@/components/ai/AssignmentGrader";
import QuizGenerator from "@/components/ai/QuizGenerator";

const TeacherDashboard = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample data - would come from backend in a real implementation
  const recentAssignments = [
    { id: 1, title: "Essay: Climate Change", dueDate: "2025-04-15", submissions: 12, totalStudents: 28 },
    { id: 2, title: "Math Quiz: Calculus Basics", dueDate: "2025-04-10", submissions: 25, totalStudents: 28 },
    { id: 3, title: "Research Paper: Literature Review", dueDate: "2025-04-20", submissions: 5, totalStudents: 28 },
  ];
  
  const pendingFeedback = [
    { id: 1, title: "Essay: Climate Change", student: "Alex Johnson", submittedDate: "2025-04-03" },
    { id: 2, title: "Essay: Climate Change", student: "Samantha Lee", submittedDate: "2025-04-03" },
    { id: 3, title: "Essay: Climate Change", student: "Michael Brown", submittedDate: "2025-04-03" },
    { id: 4, title: "Math Quiz: Calculus Basics", student: "Emma Wilson", submittedDate: "2025-04-02" },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {userData?.displayName || "Teacher"}</h1>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{pendingFeedback.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  From 3 different assignments
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">28</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all your courses
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <p className="text-xs text-muted-foreground mt-1">
                  In the next 7 days
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Assignments</CardTitle>
                <CardDescription>
                  Monitor submission status of your recent assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{assignment.submissions}/{assignment.totalStudents}</p>
                        <p className="text-sm text-muted-foreground">Submissions</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/assignments")}
                  >
                    View All Assignments
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pending Feedback</CardTitle>
                <CardDescription>
                  Student submissions waiting for your feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingFeedback.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                      <div>
                        <p className="font-medium">{item.student}</p>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Date(item.submittedDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Submitted</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/assignments")}
                  >
                    Grade with AI Assistant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  onClick={() => setActiveTab("assignments")}
                >
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
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M9 13h6" />
                    <path d="M9 17h3" />
                  </svg>
                  Create Assignment
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  onClick={() => setActiveTab("ai-tools")}
                >
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
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                  Grade Assignments
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  onClick={() => setActiveTab("ai-tools")}
                >
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
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  Generate Quiz
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  onClick={() => navigate("/ai-assistant")}
                >
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
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  Get AI Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Manage Assignments</h2>
            <Button>Create Assignment</Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Current Assignments</CardTitle>
              <CardDescription>
                View and manage all your assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button size="sm">Grade</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pending Submissions</CardTitle>
              <CardDescription>
                Student submissions waiting for your feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingFeedback.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{item.student}</p>
                      <p className="text-sm text-muted-foreground">{item.title}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-muted-foreground">
                        Submitted: {new Date(item.submittedDate).toLocaleDateString()}
                      </p>
                      <Button size="sm">Grade with AI</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-tools" className="space-y-6">
          <h2 className="text-2xl font-bold">AI Tools for Teachers</h2>
          
          <Tabs defaultValue="grader">
            <TabsList className="mb-6">
              <TabsTrigger value="grader">Assignment Grader</TabsTrigger>
              <TabsTrigger value="quiz">Quiz Generator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grader">
              <AssignmentGrader />
            </TabsContent>
            
            <TabsContent value="quiz">
              <QuizGenerator />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
