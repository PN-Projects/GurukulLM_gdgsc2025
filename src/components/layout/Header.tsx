
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { currentUser, userData, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <img src="/favicon.svg" alt="GurukulLM Logo" className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold text-gurukul-primary">
              GurukulLM
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {currentUser && userData ? (
            <>
              {userData.role === "teacher" ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-gurukul-primary">
                    Dashboard
                  </Link>
                  <Link to="/assignments" className="text-gray-700 hover:text-gurukul-primary">
                    Assignments
                  </Link>
                  <Link to="/students" className="text-gray-700 hover:text-gurukul-primary">
                    Students
                  </Link>
                  <Link to="/ai-assistant" className="text-gray-700 hover:text-gurukul-primary">
                    AI Assistant
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-gurukul-primary">
                    Dashboard
                  </Link>
                  <Link to="/courses" className="text-gray-700 hover:text-gurukul-primary">
                    Courses
                  </Link>
                  <Link to="/assignments" className="text-gray-700 hover:text-gurukul-primary">
                    Assignments
                  </Link>
                  <Link to="/ai-assistant" className="text-gray-700 hover:text-gurukul-primary">
                    AI Assistant
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/about" className="text-gray-700 hover:text-gurukul-primary">
                About
              </Link>
              <Link to="/features" className="text-gray-700 hover:text-gurukul-primary">
                Features
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-gurukul-primary">
                Contact
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {currentUser && userData ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 p-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.photoURL || undefined} />
                      <AvatarFallback>
                        {currentUser.displayName?.[0] || currentUser.email?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {userData.displayName || currentUser.email}
                    <p className="text-xs text-muted-foreground mt-1 capitalize">
                      {userData.role}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logOut()} className="cursor-pointer text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 animate-fade-in">
          <nav className="flex flex-col gap-3">
            {currentUser && userData ? (
              <>
                {userData.role === "teacher" ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="px-3 py-2 rounded-md hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/assignments" 
                      className="px-3 py-2 rounded-md hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Assignments
                    </Link>
                    <Link 
                      to="/students" 
                      className="px-3 py-2 rounded-md hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Students
                    </Link>
                    <Link 
                      to="/ai-assistant" 
                      className="px-3 py-2 rounded-md hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      AI Assistant
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="px-3 py-2 rounded-md hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/courses" 
                      className="px-3 py-2 rounded-md hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Courses
                    </Link>
                    <Link 
                      to="/assignments" 
                      className="px-3 py-2 rounded-md hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Assignments
                    </Link>
                    <Link 
                      to="/ai-assistant" 
                      className="px-3 py-2 rounded-md hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      AI Assistant
                    </Link>
                  </>
                )}
                <div className="border-t border-gray-200 my-2 pt-2">
                  <button 
                    onClick={() => {
                      logOut();
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 w-full text-left rounded-md text-red-500 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/about" 
                  className="px-3 py-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/features" 
                  className="px-3 py-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  to="/contact" 
                  className="px-3 py-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="border-t border-gray-200 my-2 pt-2 flex flex-col gap-2">
                  <Link 
                    to="/login" 
                    className="px-3 py-2 rounded-md hover:bg-muted text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link 
                    to="/signup" 
                    className="px-3 py-2 rounded-md bg-gurukul-primary text-white hover:bg-gurukul-primary/90 text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
