
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AssignmentGrader from "@/components/ai/AssignmentGrader";

const Assignments = () => {
  const { userData } = useAuth();
  const isTeacher = userData?.role === "teacher";

  // Sample data - would come from backend in a real implementation
  const assignments = [
    { id: 1, title: "Essay: Climate Change", dueDate: "2025-04-15", status: isTeacher ? "Active" : "Not Started", courseTitle: "Environmental Science", submissions: 12, totalStudents: 28 },
    { id: 2, title: "Math Quiz: Calculus Basics", dueDate: "2025-04-10", status: isTeacher ? "Active" : "In Progress", courseTitle: "Mathematics 101", submissions: 25, totalStudents: 28 },
    { id: 3, title: "Research Paper: Literature Review", dueDate: "2025-04-20", status: isTeacher ? "Draft" : "Not Started", courseTitle: "English Literature", submissions: 0, totalStudents: 28 },
    { id: 4, title: "History Essay: Ancient Rome", dueDate: "2025-04-05", status: isTeacher ? "Closed" : "Submitted", courseTitle: "World History", submissions: 28, totalStudents: 28 },
  ];

  const pendingGrading = [
    { id: 1, title: "Essay: Climate Change", student: "Alex Johnson", submittedDate: "2025-04-03" },
    { id: 2, title: "Essay: Climate Change", student: "Samantha Lee", submittedDate: "2025-04-03" },
    { id: 3, title: "Essay: Climate Change", student: "Michael Brown", submittedDate: "2025-04-03" },
    { id: 4, title: "Math Quiz: Calculus Basics", student: "Emma Wilson", submittedDate: "2025-04-02" },
  ];
  
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);
  const [showGrader, setShowGrader] = useState(false);
  
  const handleGradeClick = () => {
    setShowGrader(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Assignments</h1>
            <p className="text-gray-600 mt-1">
              {isTeacher 
                ? "Manage and grade your class assignments" 
                : "View and submit your assignments"}
            </p>
          </div>
          
          {isTeacher && (
            <Button>Create Assignment</Button>
          )}
        </div>

        <Tabs defaultValue={isTeacher ? "all" : "upcoming"}>
          <TabsList>
            {isTeacher ? (
              <>
                <TabsTrigger value="all">All Assignments</TabsTrigger>
                <TabsTrigger value="grading">Pending Grading</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="graded">Graded</TabsTrigger>
              </>
            )}
          </TabsList>

          {isTeacher ? (
            <>
              {/* Teacher tabs */}
              <TabsContent value="all" className="space-y-4">
                {showGrader ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold">AI Assignment Grader</h2>
                      <Button variant="outline" onClick={() => setShowGrader(false)}>
                        Back to Assignments
                      </Button>
                    </div>
                    <AssignmentGrader />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assignments.map((assignment) => (
                      <Card key={assignment.id} 
                        className={`${selectedAssignment === assignment.id ? 'border-gurukul-primary' : ''}`}
                        onClick={() => setSelectedAssignment(assignment.id)}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{assignment.title}</CardTitle>
                              <CardDescription>{assignment.courseTitle}</CardDescription>
                            </div>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              assignment.status === "Active" 
                                ? "bg-green-100 text-green-800" 
                                : assignment.status === "Draft" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {assignment.status}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                            <span className="font-medium">{assignment.submissions}/{assignment.totalStudents} Submissions</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button size="sm" disabled={assignment.submissions === 0} onClick={handleGradeClick}>
                            Grade
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="grading" className="space-y-4">
                {showGrader ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold">AI Assignment Grader</h2>
                      <Button variant="outline" onClick={() => setShowGrader(false)}>
                        Back to Assignments
                      </Button>
                    </div>
                    <AssignmentGrader />
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Grading</CardTitle>
                      <CardDescription>Student submissions that need your feedback</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingGrading.map((submission) => (
                          <div key={submission.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                            <div>
                              <p className="font-medium">{submission.student}</p>
                              <p className="text-sm text-muted-foreground">{submission.title}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="text-sm text-muted-foreground">
                                Submitted: {new Date(submission.submittedDate).toLocaleDateString()}
                              </p>
                              <Button size="sm" onClick={handleGradeClick}>Grade with AI</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="drafts">
                <Card>
                  <CardHeader>
                    <CardTitle>Draft Assignments</CardTitle>
                    <CardDescription>Assignments you're still working on</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.filter(a => a.status === "Draft").map((assignment) => (
                        <div key={assignment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <p className="text-sm text-muted-foreground">{assignment.courseTitle}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button size="sm">Publish</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          ) : (
            <>
              {/* Student tabs */}
              <TabsContent value="upcoming" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assignments.filter(a => a.status !== "Submitted").map((assignment) => (
                    <Card key={assignment.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{assignment.title}</CardTitle>
                            <CardDescription>{assignment.courseTitle}</CardDescription>
                          </div>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            assignment.status === "In Progress" 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {assignment.status}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button size="sm">
                          {assignment.status === "In Progress" ? "Continue" : "Start"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="submitted">
                <Card>
                  <CardHeader>
                    <CardTitle>Submitted Assignments</CardTitle>
                    <CardDescription>Assignments you've completed and submitted</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.filter(a => a.status === "Submitted").map((assignment) => (
                        <div key={assignment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <p className="text-sm text-muted-foreground">{assignment.courseTitle}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              Submitted: {new Date(assignment.dueDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-green-600">On time</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="graded">
                <Card>
                  <CardHeader>
                    <CardTitle>Graded Assignments</CardTitle>
                    <CardDescription>Assignments that have been graded by your teachers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Sample graded assignment */}
                      <div className="flex justify-between items-center border-b pb-3">
                        <div>
                          <p className="font-medium">History Essay: Ancient Rome</p>
                          <p className="text-sm text-muted-foreground">World History</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gurukul-primary">Grade: 85/100</p>
                          <p className="text-sm text-muted-foreground">Graded on: April 1, 2025</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Literature Quiz: Shakespeare</p>
                          <p className="text-sm text-muted-foreground">English Literature</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gurukul-primary">Grade: 92/100</p>
                          <p className="text-sm text-muted-foreground">Graded on: March 28, 2025</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Assignments;
