import { useState } from 'react';
import { Users, Activity, HardDrive, Shield, FileText, Settings, Database, Zap, AlertTriangle, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import Modal from '../../../components/Modal';
import ConfirmDialog from '../../../components/ConfirmDialog';
import toast from '../../../utils/toast';
import { downloadCSV, generateAuditLogReport } from '../../../utils/downloads';

export default function PlatformAdministration() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Mock audit log entries
  const auditLogs = [
    { timestamp: '2024-12-18 14:32:15', user: 'Ahmed Hassan', action: 'Updated OTC funding', resource: 'Cairo University TTO', status: 'success' },
    { timestamp: '2024-12-18 14:15:42', user: 'Dr. Fatma El-Sayed', action: 'Approved disclosure', resource: 'DISC-2024-003', status: 'success' },
    { timestamp: '2024-12-18 13:58:21', user: 'System', action: 'Automated backup', resource: 'Database', status: 'success' },
    { timestamp: '2024-12-18 13:45:10', user: 'Mohamed Ali', action: 'Failed login attempt', resource: 'Admin Panel', status: 'warning' },
    { timestamp: '2024-12-18 13:22:05', user: 'Ahmed Hassan', action: 'Created new user', resource: 'user@otc.eg', status: 'success' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Administration</h1>
          <p className="text-gray-600">System management and configuration</p>
        </div>
        <button 
          onClick={() => {
            setModalType('settings');
            setShowModal(true);
          }} 
          className="btn btn-primary flex items-center gap-2"
        >
          <Settings className="w-5 h-5" />
          System Settings
        </button>
      </div>

      {/* System Health Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-green-600" />
            <span className="text-xs text-green-600 font-medium">Online</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">99.8%</p>
          <p className="text-sm text-gray-600">System Uptime</p>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">+5 today</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">234</p>
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-xs text-gray-500 mt-1">42 active now</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <HardDrive className="w-8 h-8 text-purple-600" />
            <span className="text-xs text-purple-600 font-medium">72% used</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">1.8TB</p>
          <p className="text-sm text-gray-600">Storage Used</p>
          <p className="text-xs text-gray-500 mt-1">2.5TB total</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-8 h-8 text-yellow-600" />
            <span className="text-xs text-yellow-600 font-medium">Good</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">245ms</p>
          <p className="text-sm text-gray-600">Avg Response</p>
          <p className="text-xs text-gray-500 mt-1">API latency</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex gap-1 p-2">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'audit', label: 'Audit Logs', icon: FileText }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Performance Metrics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">API Requests (24h)</span>
                      <span className="font-semibold">52,341</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">Database Queries</span>
                      <span className="font-semibold">284,932</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">Active Sessions</span>
                      <span className="font-semibold">42</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">Error Rate</span>
                      <span className="font-semibold text-green-600">0.02%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-purple-600" />
                    Backup Status
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-green-900">Last Backup</span>
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-sm text-green-700">Today at 02:00 AM</p>
                      <p className="text-xs text-green-600 mt-1">Size: 45.2 GB • Duration: 12 min</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-blue-900">Next Scheduled</span>
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-blue-700">Tomorrow at 02:00 AM</p>
                      <p className="text-xs text-blue-600 mt-1">Automated daily backup</p>
                    </div>
                    <button 
                      onClick={() => {
                        setConfirmAction(() => () => {
                          toast.info('Backup initiated - this may take several minutes...');
                          setTimeout(() => {
                            toast.success('System backup completed successfully!');
                          }, 3000);
                          setShowConfirm(false);
                        });
                        setShowConfirm(true);
                      }}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 text-sm"
                    >
                      Run Manual Backup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">User Management</h3>
                <button 
                  onClick={() => {
                    setModalType('addUser');
                    setShowModal(true);
                  }} 
                  className="btn btn-sm btn-primary"
                >
                  Add New User
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-900">234</p>
                  <p className="text-sm text-blue-700">Total Users</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-900">42</p>
                  <p className="text-sm text-green-700">Active Sessions</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-900">15</p>
                  <p className="text-sm text-purple-700">New This Month</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Active</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-100">
                      <td className="py-3 px-4 text-sm">Ahmed Hassan</td>
                      <td className="py-3 px-4 text-sm">ahmed.hassan@nctc.gov.eg</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">NCTC Admin</span></td>
                      <td className="py-3 px-4 text-sm text-gray-600">5 min ago</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Active</span></td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="py-3 px-4 text-sm">Dr. Fatma El-Sayed</td>
                      <td className="py-3 px-4 text-sm">tto@cu.edu.eg</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">OTC Director</span></td>
                      <td className="py-3 px-4 text-sm text-gray-600">2 hours ago</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'security' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">Security Monitoring</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-green-900">Security Status</h4>
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-green-700">All systems secure</p>
                  <p className="text-xs text-green-600 mt-1">Last security scan: 2 hours ago</p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-yellow-900">Security Alerts</h4>
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-sm text-yellow-700">3 failed login attempts</p>
                  <p className="text-xs text-yellow-600 mt-1">In the last 24 hours</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Access Control</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                    <span className="text-sm font-semibold text-green-600">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Session Timeout</span>
                    <span className="text-sm font-semibold">30 minutes</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Password Policy</span>
                    <span className="text-sm font-semibold text-green-600">Strong</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Audit Logs</h3>
                <button 
                  onClick={() => {
                    const reportData = generateAuditLogReport(auditLogs);
                    downloadCSV(reportData, `audit-logs-${new Date().toISOString().split('T')[0]}.csv`);
                    toast.success('Audit logs exported successfully!');
                  }} 
                  className="btn btn-sm btn-secondary"
                >
                  Export Logs
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Timestamp</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">User</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Resource</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log, idx) => (
                      <tr key={idx} className="border-t border-gray-100">
                        <td className="py-3 px-4 text-xs text-gray-600">{log.timestamp}</td>
                        <td className="py-3 px-4 text-sm">{log.user}</td>
                        <td className="py-3 px-4 text-sm">{log.action}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{log.resource}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            log.status === 'success' ? 'bg-green-100 text-green-800' :
                            log.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setSelectedTab('users')} 
            className="btn btn-sm btn-primary"
          >
            Manage Users
          </button>
          <button 
            onClick={() => setSelectedTab('audit')} 
            className="btn btn-sm btn-primary"
          >
            View Logs
          </button>
          <button 
            onClick={() => {
              setModalType('settings');
              setShowModal(true);
            }} 
            className="btn btn-sm btn-secondary"
          >
            System Settings
          </button>
          <button 
            onClick={() => {
              setConfirmAction(() => () => {
                toast.info('Backup initiated - this may take several minutes...');
                setTimeout(() => {
                  toast.success('System backup completed successfully!');
                }, 3000);
                setShowConfirm(false);
              });
              setShowConfirm(true);
            }} 
            className="btn btn-sm btn-success"
          >
            Run Backup
          </button>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'addUser' ? 'Add New User' : 'System Settings'}
        size="md"
      >
        {modalType === 'addUser' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            toast.success(`User ${formData.get('name')} added successfully!`);
            setShowModal(false);
            e.target.reset();
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ahmed Hassan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="user@otc.gov.eg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Role</option>
                  <option value="nctc-admin">NCTC Admin</option>
                  <option value="otc-director">OTC Director</option>
                  <option value="otc-staff">OTC Staff</option>
                  <option value="cluster-coordinator">Cluster Coordinator</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OTC Affiliation (if applicable)</label>
                <input
                  type="text"
                  name="otc"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Cairo University TTO"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-outline px-4 py-2"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary px-4 py-2">
                  Create User
                </button>
              </div>
            </div>
          </form>
        )}
        
        {modalType === 'settings' && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Platform Configuration</h4>
              <p className="text-sm text-blue-700">Configure system-wide settings and preferences</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Maintenance Mode</span>
                <button className="px-3 py-1 bg-gray-200 rounded text-sm">Disabled</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Auto Backup</span>
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">Enabled</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Email Notifications</span>
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">Enabled</button>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  toast.success('Settings saved successfully!');
                  setShowModal(false);
                }}
                className="btn-primary px-4 py-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmAction}
        title="Run System Backup?"
        message="This will create a complete backup of the database. The process may take several minutes. Continue?"
        confirmText="Start Backup"
        type="info"
      />
    </div>
  );
}
