import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function ProtectedRoute({ user, requiredRole }) {
  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const currentUser = user;
  
  // Check if user has required role
  if (requiredRole && currentUser.role !== requiredRole && requiredRole !== 'otc') {
    // Redirect to correct portal based on user role
    if (currentUser.role === 'otc' || currentUser.role === 'cc') {
      return <Navigate to="/otc/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  
  // CC role includes OTC access
  if (requiredRole === 'otc' && !['otc', 'cc'].includes(currentUser.role)) {
    // Redirect to correct portal based on user role
    if (currentUser.role === 'nctc') {
      return <Navigate to="/nctc/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} />
      <div className="flex">
        <Sidebar role={currentUser.role} />
        <main className="flex-1 ml-64 mt-16 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
