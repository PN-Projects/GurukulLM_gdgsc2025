
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/contexts/AuthContext";

interface RoleSelectorProps {
  selectedRole: UserRole | null;
  onChange: (role: UserRole) => void;
}

const RoleSelector = ({ selectedRole, onChange }: RoleSelectorProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="space-y-4 flex flex-col items-center w-full">
      <h3 className="text-lg font-medium text-center">I am a:</h3>
      <div className={`flex flex-col sm:flex-row gap-4 w-full max-w-md transition-all duration-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Button
          variant={selectedRole === "teacher" ? "default" : "outline"}
          className={`h-28 flex-1 flex flex-col items-center justify-center gap-3 ${selectedRole === "teacher" ? 'border-2 border-gurukul-primary' : ''}`}
          onClick={() => onChange("teacher")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            <circle cx="12" cy="10" r="2" />
            <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z" />
          </svg>
          <span className="font-medium">Teacher</span>
        </Button>
        
        <Button
          variant={selectedRole === "student" ? "default" : "outline"}
          className={`h-28 flex-1 flex flex-col items-center justify-center gap-3 ${selectedRole === "student" ? 'border-2 border-gurukul-primary' : ''}`}
          onClick={() => onChange("student")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
            <path d="M8 14.5c-1.58.87-3 2.14-3 3.75V20h14v-1.75c0-1.61-1.42-2.88-3-3.75v-1a3 3 0 0 0-8 0v1Z" />
            <path d="M22 9h-2.5a1.5 1.5 0 0 0 0 3H22" />
          </svg>
          <span className="font-medium">Student</span>
        </Button>
      </div>
    </div>
  );
};

export default RoleSelector;
