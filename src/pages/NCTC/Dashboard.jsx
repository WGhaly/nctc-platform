import { Link } from 'react-router-dom';
import {
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  Users,
  BarChart3,
  Clock
} from 'lucide-react';
import { otcs, applications, ecosystemStats, notifications } from '../../mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function NCTCDashboard() {
  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  
  const recentApplications = applications.slice(0, 3);
  const pendingReviews = otcs.filter(o => o.performance === 'needs-improvement').length;
  const upcomingTraining = 2;

  const performanceData = [
    { name: 'Exceeds', count: otcs.filter(o => o.performance === 'exceeds').length },
    { name: 'Meets', count: otcs.filter(o => o.performance === 'meets').length },
    { name: 'Needs Improvement', count: otcs.filter(o => o.performance === 'needs-improvement').length },
  ];

  const clusterData = [
    { name: 'Engineering', otcs: 12 },
    { name: 'ICT', otcs: 15 },
    { name: 'Life Sciences', otcs: 8 },
    { name: 'Physical Sci.', otcs: 6 },
    { name: 'Health', otcs: 10 },
    { name: 'Environmental', otcs: 7 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">NCTC Dashboard</h1>
        <p className="text-gray-600">Ecosystem overview and key metrics</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-600 to-blue-500 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Active OTCs</p>
              <p className="text-4xl font-bold">{ecosystemStats.activeOTCs}</p>
              <p className="text-blue-100 text-sm mt-2">All operational</p>
            </div>
            <Building2 className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-600 to-green-500 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Active Projects</p>
              <p className="text-4xl font-bold">{ecosystemStats.activeProjects}</p>
              <p className="text-green-100 text-sm mt-2">In progress</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-600 to-yellow-500 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-yellow-100 text-sm mb-1">Pending Reviews</p>
              <p className="text-4xl font-bold">{pendingReviews}</p>
              <p className="text-yellow-100 text-sm mt-2">Require attention</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-yellow-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-600 to-purple-500 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Total Revenue</p>
              <p className="text-4xl font-bold">{(ecosystemStats.totalRevenue / 1000000).toFixed(1)}M</p>
              <p className="text-purple-100 text-sm mt-2">EGP generated</p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Performance Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">OTC Performance Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">OTCs by Cluster</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clusterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="otcs" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Applications */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Recent Applications</h3>
              <Link to="/nctc/otc-management/applications" className="text-sm text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm text-gray-900">{app.institution}</p>
                  <p className="text-xs text-gray-500">{app.city}</p>
                  <span className={`badge mt-2 ${
                    app.status === 'accepted' ? 'badge-success' :
                    app.status === 'under-review' ? 'badge-warning' : 'badge-info'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/nctc/otc-management/applications" className="btn btn-primary w-full">
                Review Applications
              </Link>
              <Link to="/nctc/performance/reviews" className="btn btn-outline w-full">
                Performance Reviews
              </Link>
              <Link to="/nctc/training" className="btn btn-secondary w-full">
                Training Programs
              </Link>
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notif) => (
                <div key={notif.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notif.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing OTCs */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing OTCs</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">OTC</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Director</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disclosures</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {otcs.filter(o => o.performance === 'exceeds').map((otc) => (
                <tr key={otc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{otc.name}</div>
                    <div className="text-sm text-gray-500">{otc.institution}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{otc.director}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{otc.city}</td>
                  <td className="px-4 py-3">
                    <span className="badge badge-success">Exceeds</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{otc.kpis.disclosures}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {(otc.kpis.revenue / 1000).toFixed(0)}K EGP
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/nctc/performance/reviews/${otc.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
