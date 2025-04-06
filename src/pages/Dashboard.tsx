
import { useAuth } from "@/contexts/AuthContext";
import TeacherDashboard from "./dashboard/TeacherDashboard";
import StudentDashboard from "./dashboard/StudentDashboard";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { userData, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gurukul-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!userData) {
    return <Navigate to="/login" />;
  }
  
  return userData.role === "teacher" ? <TeacherDashboard /> : <StudentDashboard />;
};

export default Dashboard;
