
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChatAssistant from "@/components/ai/ChatAssistant";
import AssignmentGrader from "@/components/ai/AssignmentGrader";
import QuizGenerator from "@/components/ai/QuizGenerator";
import LearningContentGenerator from "@/components/ai/LearningContentGenerator";

const AIAssistant = () => {
  const { userData } = useAuth();
  
  const isTeacher = userData?.role === "teacher";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-gray-600 mt-1">
            Your AI-powered personal assistant for {isTeacher ? "teaching" : "learning"}
          </p>
        </div>

        <Tabs defaultValue="chat">
          <TabsList className="mb-6">
            <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
            {isTeacher ? (
              <>
                <TabsTrigger value="grader">Assignment Grader</TabsTrigger>
                <TabsTrigger value="quiz">Quiz Generator</TabsTrigger>
                <TabsTrigger value="content">Content Generator</TabsTrigger>
              </>
            ) : (
              <TabsTrigger value="learning">Learning Assistant</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="chat">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>{isTeacher ? "Teacher Assistant" : "Learning Assistant"}</CardTitle>
                  <CardDescription>
                    {isTeacher 
                      ? "Get help with lesson planning, concept explanations, and teaching strategies"
                      : "Get help with understanding concepts, solving problems, and finding resources"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChatAssistant userRole={userData?.role || "student"} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Popular Prompts</CardTitle>
                  <CardDescription>
                    Try these example prompts to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {isTeacher ? (
                      <>
                        <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                          "Create a lesson plan on photosynthesis for 8th grade students"
                        </p>
                        <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                          "What are effective strategies for teaching algebraic expressions?"
                        </p>
                        <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                          "How can I help students who are struggling with writing essays?"
                        </p>
                        <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                          "Generate discussion questions about Romeo and Juliet"
                        </p>
                        <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                          "What are some creative assessment methods for history class?"
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                          "Explain the concept of natural selection"
                        </p>
                        <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                          "Help me solve this math problem: 3x + 4 = 19"
                        </p>
                        <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                          "What are the key themes in To Kill a Mockingbird?"
                        </p>
                        <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                          "Can you summarize the causes of World War II?"
                        </p>
                        <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                          "What's the difference between mitosis and meiosis?"
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Teacher-specific tabs */}
          {isTeacher && (
            <>
              <TabsContent value="grader">
                <AssignmentGrader />
              </TabsContent>
              
              <TabsContent value="quiz">
                <QuizGenerator />
              </TabsContent>
              
              <TabsContent value="content">
                <LearningContentGenerator />
              </TabsContent>
            </>
          )}
          
          {/* Student-specific tab */}
          {!isTeacher && (
            <TabsContent value="learning">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Study Helper</CardTitle>
                    <CardDescription>
                      Get personalized study materials and explanations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">
                      Our AI can create study guides, explain difficult concepts, and help you prepare for exams.
                    </p>
                    <div className="space-y-2">
                      <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                        "Create a study guide for photosynthesis"
                      </p>
                      <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                        "Help me understand Newton's laws of motion"
                      </p>
                      <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                        "What are the key events of the American Revolution?"
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment Helper</CardTitle>
                    <CardDescription>
                      Get guidance on assignments and projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">
                      Our AI can help you brainstorm ideas, structure your work, and provide feedback on your assignments.
                    </p>
                    <div className="space-y-2">
                      <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                        "How do I structure a research essay?"
                      </p>
                      <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                        "Give me ideas for a science project on renewable energy"
                      </p>
                      <p className="p-3 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                        "What should I include in my presentation on Ancient Egypt?"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;
