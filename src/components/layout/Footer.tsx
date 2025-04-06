
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <img src="/favicon.svg" alt="GurukulLM Logo" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-gurukul-primary">
                GurukulLM
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              AI-powered learning management system that provides automated grading and personalized feedback.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/features" className="text-sm text-gray-600 hover:text-gurukul-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-600 hover:text-gurukul-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-sm text-gray-600 hover:text-gurukul-primary">
                  Request Demo
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-gurukul-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-gurukul-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-sm text-gray-600 hover:text-gurukul-primary">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-gurukul-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-gurukul-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-gurukul-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-gurukul-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} GurukulLM. All rights reserved. Created for Google Developer Student Club Solution Challenge.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
