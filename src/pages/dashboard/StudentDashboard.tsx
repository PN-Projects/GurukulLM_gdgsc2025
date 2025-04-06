
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const StudentDashboard = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();

  // Sample data - would come from backend in a real implementation
  const assignments = [
    { id: 1, title: "Essay: Climate Change", dueDate: "2025-04-15", status: "Not Started", courseTitle: "Environmental Science" },
    { id: 2, title: "Math Quiz: Calculus Basics", dueDate: "2025-04-10", status: "In Progress", courseTitle: "Mathematics 101" },
    { id: 3, title: "Research Paper: Literature Review", dueDate: "2025-04-20", status: "Submitted", courseTitle: "English Literature" },
  ];
  
  const courseProgress = [
    { id: 1, title: "Mathematics 101", progress: 65, completed: 13, total: 20 },
    { id: 2, title: "English Literature", progress: 40, completed: 8, total: 20 },
    { id: 3, title: "Environmental Science", progress: 25, completed: 5, total: 20 },
  ];
  
  const feedbacks = [
    { id: 1, title: "Project Proposal", grade: "85/100", teacher: "Ms. Johnson", date: "2025-03-30" },
    { id: 2, title: "Midterm Exam", grade: "92/100", teacher: "Mr. Smith", date: "2025-03-25" },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Welcome, {userData?.displayName || "Student"}</h1>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Due Soon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Assignments due this week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active courses
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Grade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">88.5%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all courses
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Assignments</CardTitle>
                <CardDescription>
                  Assignments due in the next few weeks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.filter(a => a.status !== "Submitted").map((assignment) => (
                    <div key={assignment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">{assignment.courseTitle}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Due Date</p>
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
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>
                  Your latest assignment and assessment feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                      <div>
                        <p className="font-medium">{feedback.title}</p>
                        <p className="text-sm text-muted-foreground">From: {feedback.teacher}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gurukul-primary">{feedback.grade}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(feedback.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                  >
                    View All Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>
                Track your progress in each course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courseProgress.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-muted-foreground">{course.completed}/{course.total} modules</p>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  onClick={() => navigate("/assignments")}
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
                  </svg>
                  Submit Assignment
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                  onClick={() => navigate("/courses")}
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
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                  View Course Materials
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
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  Ask AI Assistant
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center justify-center gap-2"
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
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  Study Materials
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>All courses you're currently enrolled in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courseProgress.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">Teacher: Prof. Anderson</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{course.progress}% Complete</p>
                        <p className="text-sm text-muted-foreground">
                          {course.completed} of {course.total} modules
                        </p>
                      </div>
                    </div>
                    <Progress value={course.progress} className="h-2 mt-3" />
                    <div className="mt-4">
                      <Button variant="outline" size="sm">Go to Course</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Assignments</CardTitle>
              <CardDescription>Your assignments from all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.courseTitle}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          assignment.status === "Submitted" 
                            ? "bg-green-100 text-green-800" 
                            : assignment.status === "In Progress" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {assignment.status}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      {assignment.status !== "Submitted" && (
                        <Button size="sm">
                          {assignment.status === "In Progress" ? "Continue" : "Start"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default StudentDashboard;
