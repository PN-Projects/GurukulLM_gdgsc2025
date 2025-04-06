
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-6">
            AI-Powered Education Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            GurukulLM helps teachers provide personalized feedback and automates grading, 
            giving them more time to focus on what matters most - teaching.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gurukul-primary hover:bg-gurukul-primary/90"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gurukul-primary text-gurukul-primary hover:bg-gurukul-primary/10"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How GurukulLM Helps</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 rounded-full bg-gurukul-primary/10 text-gurukul-primary flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Grading</h3>
              <p className="text-gray-600">
                AI-powered grading that saves teachers hours of work while providing consistent and objective evaluations.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 rounded-full bg-gurukul-secondary/10 text-gurukul-secondary flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Feedback</h3>
              <p className="text-gray-600">
                Detailed, constructive feedback tailored to each student's work, highlighting strengths and areas for improvement.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 rounded-full bg-gurukul-accent/10 text-gurukul-accent flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Learning Assistant</h3>
              <p className="text-gray-600">
                24/7 AI tutor that answers questions, explains concepts, and provides additional learning resources to students.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold">Benefits for Teachers</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1 text-gurukul-primary">
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900">Save Time</strong>
                    <p className="text-gray-600">
                      Reduce grading time by up to 70%, giving you more time for lesson preparation and student engagement.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-gurukul-primary">
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900">Consistent Grading</strong>
                    <p className="text-gray-600">
                      Ensure fair and objective evaluations with standardized grading criteria applied consistently across all student work.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-gurukul-primary">
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900">Generate Resources</strong>
                    <p className="text-gray-600">
                      Create quizzes, lesson plans, and educational materials in seconds with our AI content generator.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold">Benefits for Students</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1 text-gurukul-secondary">
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900">Immediate Feedback</strong>
                    <p className="text-gray-600">
                      Receive detailed feedback on assignments instantly, without waiting days or weeks for manual grading.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-gurukul-secondary">
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900">24/7 Learning Support</strong>
                    <p className="text-gray-600">
                      Get help whenever you need it with our AI learning assistant, capable of answering questions and explaining concepts.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 text-gurukul-secondary">
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-gray-900">Personalized Learning</strong>
                    <p className="text-gray-600">
                      Access learning materials tailored to your learning style, pace, and needs for better comprehension and retention.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gurukul-primary to-gurukul-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Teaching Experience?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
            Join thousands of educators who are saving time and providing better feedback with GurukulLM.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-gurukul-primary"
            onClick={() => navigate("/signup")}
          >
            Sign Up for Free
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
