import { Link } from 'react-router-dom';
import { 
  FileText, Calendar, AlertCircle, CheckCircle2, Clock, TrendingUp, 
  DollarSign, Award, Users, Bell, FolderKanban, ArrowRight, Star,
  MessageSquare, Activity, Target, Megaphone
} from 'lucide-react';
import { mockUser } from '../../mockData';

export default function OTCDashboard() {
  // Mock OTC data (would come from logged-in user context)
  const otcData = {
    name: 'Cairo University TTO',
    institution: 'Cairo University',
    performance: 'Exceeds Expectations',
    performanceBadge: 'exceeds'
  };

  // Mock quick stats
  const stats = {
    activeProjects: 12,
    pendingDisclosures: 3,
    upcomingDeadlines: 5,
    pendingTasks: 8
  };

  // Mock KPI summary
  const kpis = {
    disclosures: { current: 24, target: 15, percentage: 160 },
    patents: { current: 8, target: 5, percentage: 160 },
    licenses: { current: 3, target: 2, percentage: 150 },
    revenue: { current: 450000, target: 200000, percentage: 225 }
  };

  // Mock recent activity
  const recentActivity = [
    { id: 1, type: 'disclosure', title: 'New disclosure submitted', description: 'AI Water Quality System by Dr. Khaled', time: '2 hours ago', icon: FileText, color: 'blue' },
    { id: 2, type: 'evaluation', title: 'Evaluation completed', description: 'Cancer Nanoparticles - GO decision', time: '5 hours ago', icon: CheckCircle2, color: 'green' },
    { id: 3, type: 'meeting', title: 'Cluster coordination meeting', description: 'Engineering cluster monthly sync', time: '1 day ago', icon: Users, color: 'purple' },
    { id: 4, type: 'funding', title: 'Funding installment released', description: 'EGP 750,000 disbursed', time: '2 days ago', icon: DollarSign, color: 'teal' },
    { id: 5, type: 'training', title: 'Training completed', description: 'Advanced Licensing Workshop', time: '3 days ago', icon: Award, color: 'orange' }
  ];

  // Mock action items
  const actionItems = [
    { id: 1, title: 'Complete 6-month performance report', due: '2024-12-31', priority: 'high', category: 'Reporting' },
    { id: 2, title: 'Review disclosure DISC-2024-003', due: '2024-12-20', priority: 'high', category: 'Evaluation' },
    { id: 3, title: 'Submit funding expenditure report', due: '2024-12-25', priority: 'medium', category: 'Financial' },
    { id: 4, title: 'Schedule inventor meetings', due: '2024-12-22', priority: 'medium', category: 'Engagement' }
  ];

  // Mock upcoming events
  const upcomingEvents = [
    { date: 'Dec 20', title: 'NCTC Performance Review', time: '10:00 AM' },
    { date: 'Dec 22', title: 'Inventor Meeting - Smart Grid Project', time: '2:00 PM' },
    { date: 'Dec 25', title: 'Cluster Coordinator Call', time: '11:00 AM' },
    { date: 'Jan 15', title: 'Advanced Licensing Workshop', time: '9:00 AM' }
  ];

  // Mock news/announcements
  const announcements = [
    { id: 1, title: 'New Patent Filing Support Program', date: '2024-12-15', type: 'program' },
    { id: 2, title: 'Q4 Performance Reports Due Dec 31', date: '2024-12-10', type: 'deadline' },
    { id: 3, title: 'Updated IP Policy Guidelines Available', date: '2024-12-05', type: 'policy' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name}!</h1>
            <p className="text-blue-100 text-lg">{otcData.name}</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-xl text-sm font-medium">
                {otcData.institution}
              </span>
              <span className="px-4 py-2 bg-green-500 bg-opacity-80 rounded-xl text-sm font-medium flex items-center gap-2">
                <Star className="w-4 h-4" />
                {otcData.performance}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100 mb-1">Today</p>
            <p className="text-2xl font-bold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Link to="/otc/projects" className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <FolderKanban className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.activeProjects}</span>
          </div>
          <p className="text-sm text-gray-600">Active Projects</p>
          <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </p>
        </Link>

        <Link to="/otc/disclosures" className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.pendingDisclosures}</span>
          </div>
          <p className="text-sm text-gray-600">Pending Disclosures</p>
          <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
            Review now <ArrowRight className="w-3 h-3" />
          </p>
        </Link>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.upcomingDeadlines}</span>
          </div>
          <p className="text-sm text-gray-600">Upcoming Deadlines</p>
          <p className="text-xs text-orange-600 mt-2">Next 7 days</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</span>
          </div>
          <p className="text-sm text-gray-600">Pending Tasks</p>
          <p className="text-xs text-green-600 mt-2">Action required</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* KPI Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Performance Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-700 font-medium">Disclosures</span>
                  <span className="text-xs text-green-600 font-semibold">+60%</span>
                </div>
                <p className="text-3xl font-bold text-blue-900 mb-1">{kpis.disclosures.current}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-600">Target: {kpis.disclosures.target}</span>
                  <span className="text-blue-700 font-semibold">{kpis.disclosures.percentage}%</span>
                </div>
                <div className="mt-2 w-full bg-blue-200 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-700 font-medium">Patents</span>
                  <span className="text-xs text-green-600 font-semibold">+60%</span>
                </div>
                <p className="text-3xl font-bold text-purple-900 mb-1">{kpis.patents.current}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-600">Target: {kpis.patents.target}</span>
                  <span className="text-purple-700 font-semibold">{kpis.patents.percentage}%</span>
                </div>
                <div className="mt-2 w-full bg-purple-200 rounded-full h-1.5">
                  <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-700 font-medium">Licenses</span>
                  <span className="text-xs text-green-600 font-semibold">+50%</span>
                </div>
                <p className="text-3xl font-bold text-green-900 mb-1">{kpis.licenses.current}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-600">Target: {kpis.licenses.target}</span>
                  <span className="text-green-700 font-semibold">{kpis.licenses.percentage}%</span>
                </div>
                <div className="mt-2 w-full bg-green-200 rounded-full h-1.5">
                  <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-teal-700 font-medium">Revenue</span>
                  <span className="text-xs text-green-600 font-semibold">+125%</span>
                </div>
                <p className="text-3xl font-bold text-teal-900 mb-1">EGP {(kpis.revenue.current / 1000).toFixed(0)}K</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-teal-600">Target: {(kpis.revenue.target / 1000).toFixed(0)}K</span>
                  <span className="text-teal-700 font-semibold">{kpis.revenue.percentage}%</span>
                </div>
                <div className="mt-2 w-full bg-teal-200 rounded-full h-1.5">
                  <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              Action Items
            </h2>
            <div className="space-y-3">
              {actionItems.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">Due: {item.due}</span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">{item.category}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.priority === 'high' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6 text-purple-600" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map(activity => {
                const Icon = activity.icon;
                const colorClasses = {
                  blue: 'bg-blue-100 text-blue-600',
                  green: 'bg-green-100 text-green-600',
                  purple: 'bg-purple-100 text-purple-600',
                  teal: 'bg-teal-100 text-teal-600',
                  orange: 'bg-orange-100 text-orange-600'
                };
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${colorClasses[activity.color]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{activity.title}</h3>
                      <p className="text-xs text-gray-600 mt-0.5">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Notifications
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-900">New Training Available</p>
                <p className="text-xs text-blue-700 mt-1">Advanced Licensing Workshop</p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm font-medium text-orange-900">Deadline Reminder</p>
                <p className="text-xs text-orange-700 mt-1">6-month report due Dec 31</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-900">Funding Released</p>
                <p className="text-xs text-green-700 mt-1">Installment 4 disbursed</p>
              </div>
            </div>
          </div>

          {/* Calendar/Upcoming */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-gray-500">{event.date}</p>
                  </div>
                  <div className="flex-1 border-l-2 border-purple-300 pl-3">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News & Announcements */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-orange-600" />
              Announcements
            </h3>
            <div className="space-y-3">
              {announcements.map(announcement => (
                <div key={announcement.id} className="pb-3 border-b border-gray-100 last:border-0">
                  <p className="text-sm font-medium text-gray-900">{announcement.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(announcement.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/otc/disclosures/new" className="block text-sm text-blue-600 hover:text-blue-800 font-medium">
                → Submit New Disclosure
              </Link>
              <Link to="/otc/services/request" className="block text-sm text-blue-600 hover:text-blue-800 font-medium">
                → Request Service
              </Link>
              <Link to="/otc/resources" className="block text-sm text-blue-600 hover:text-blue-800 font-medium">
                → Browse Resources
              </Link>
              <Link to="/otc/reporting" className="block text-sm text-blue-600 hover:text-blue-800 font-medium">
                → Submit Report
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
