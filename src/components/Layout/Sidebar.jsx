import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  BarChart3,
  GraduationCap,
  Users,
  AlertTriangle,
  Settings,
  Shield,
  FileText,
  FileInput,
  Scale,
  Briefcase,
  Handshake,
  MessageSquare,
  BookOpen,
  Grid3x3,
  TrendingUp
} from 'lucide-react';

const nctcMenuItems = [
  { path: '/nctc/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { 
    label: 'OTC Management',
    icon: Building2,
    subItems: [
      { path: '/nctc/otc-management/applications', label: 'Applications' },
      { path: '/nctc/otc-management/matrix-assignments', label: 'Matrix Assignments' },
      { path: '/nctc/otc-management/funding', label: 'Funding' },
    ]
  },
  {
    label: 'Performance',
    icon: BarChart3,
    subItems: [
      { path: '/nctc/performance/dashboard', label: 'Dashboard' },
      { path: '/nctc/performance/reviews', label: 'Reviews' },
    ]
  },
  { path: '/nctc/training', icon: GraduationCap, label: 'Training' },
  { path: '/nctc/clusters', icon: Users, label: 'Clusters' },
  { path: '/nctc/gaps', icon: AlertTriangle, label: 'Gap Management' },
  { path: '/nctc/platform-admin', icon: Settings, label: 'Platform Admin' },
  { path: '/nctc/quality', icon: Shield, label: 'Quality & Compliance' },
  { path: '/nctc/reports', icon: FileText, label: 'Reports' },
];

const otcMenuItems = [
  { path: '/otc/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/otc/disclosures', icon: FileInput, label: 'Disclosures' },
  { path: '/otc/ip-management', icon: Scale, label: 'IP Management' },
  { path: '/otc/projects', icon: Briefcase, label: 'Projects' },
  { path: '/otc/services', icon: Handshake, label: 'Services' },
  { path: '/otc/reporting', icon: FileText, label: 'Reporting' },
  { path: '/otc/collaboration', icon: MessageSquare, label: 'Collaboration' },
  { path: '/otc/resources', icon: BookOpen, label: 'Resources' },
  { path: '/otc/matrix', icon: Grid3x3, label: 'Matrix Positions' },
];

const ccMenuItems = [
  { path: '/cc/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/cc/cluster-management', icon: TrendingUp, label: 'Cluster Management' },
  { path: '/cc/reports', icon: FileText, label: 'Reports' },
];

export default function Sidebar({ role }) {
  const location = useLocation();
  
  let menuItems = [];
  if (role === 'nctc') menuItems = nctcMenuItems;
  else if (role === 'otc') menuItems = otcMenuItems;
  else if (role === 'cc') menuItems = ccMenuItems;

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              <div>
                <div className="flex items-center space-x-3 px-4 py-3 text-gray-700 font-medium text-sm">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                <div className="ml-4 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                        isActive(subItem.path)
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
