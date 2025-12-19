import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Settings } from 'lucide-react';
import { notifications } from '../../mockData';

export default function Header({ user }) {
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-blue-900 font-bold text-xl">N</span>
          </div>
          <div className="text-white">
            <h1 className="text-xl font-bold">NCTC Platform</h1>
            <p className="text-xs text-blue-200">Technology Transfer Ecosystem</p>
          </div>
        </Link>

        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative text-white hover:text-blue-200 transition-colors">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3 border-l border-blue-600 pl-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div className="text-white">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-blue-200">{user.institution}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-white hover:text-blue-200 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
