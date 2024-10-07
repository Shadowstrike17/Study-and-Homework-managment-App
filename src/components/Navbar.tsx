import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Calendar, BarChart2, Library, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">StudyBuddy</Link>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/" className="hover:text-accent"><BookOpen size={24} /></Link>
                <Link to="/tasks" className="hover:text-accent"><Calendar size={24} /></Link>
                <Link to="/analytics" className="hover:text-accent"><BarChart2 size={24} /></Link>
                <Link to="/resources" className="hover:text-accent"><Library size={24} /></Link>
                <Link to="/profile" className="hover:text-accent"><User size={24} /></Link>
                <button onClick={logout} className="btn-primary">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary">Log In</Link>
                <Link to="/register" className="btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;