import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, List, Filter, Download, CheckCircle2, Clock, AlertCircle, Plus, Search, FileText, Bell } from 'lucide-react';
import { otcs, clusters } from '../../../mockData';
import Modal from '../../../components/Modal';
import SchedulerModal from '../../../components/SchedulerModal';
import ConfirmDialog from '../../../components/ConfirmDialog';
import toast from '../../../utils/toast';
import { downloadCSV, downloadExcel } from '../../../utils/downloads';

export default function PerformanceReviews() {
  const [viewMode, setViewMode] = useState('list'); // 'calendar' or 'list'
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCluster, setFilterCluster] = useState('all');
  const [showScheduler, setShowScheduler] = useState(false);
  const [showBulkScheduler, setShowBulkScheduler] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showRemindersConfirm, setShowRemindersConfirm] = useState(false);

  // Mock review schedule
  const reviews = [
    {
      id: 'REV-2024-H2-001',
      otc: otcs[0],
      type: '6-month',
      cycle: 'H2 2024',
      scheduledDate: '2024-12-20',
      dueDate: '2024-12-31',
      status: 'scheduled',
      reviewer: 'Ahmed Hassan',
      checklist: ['KPI Review', 'Financial Report', 'Project Updates']
    },
    {
      id: 'REV-2024-H2-002',
      otc: otcs[1],
      type: '6-month',
      cycle: 'H2 2024',
      scheduledDate: '2024-12-22',
      dueDate: '2024-12-31',
      status: 'scheduled',
      reviewer: 'Dr. Fatma El-Sayed',
      checklist: ['KPI Review', 'Financial Report', 'Project Updates']
    },
    {
      id: 'REV-2024-2Y-001',
      otc: otcs[0],
      type: '2-year',
      cycle: '2023-2025',
      scheduledDate: '2025-01-15',
      dueDate: '2025-01-31',
      status: 'scheduled',
      reviewer: 'NCTC Board',
      checklist: ['Comprehensive Assessment', 'Impact Analysis', 'Renewal Decision']
    },
    {
      id: 'REV-2024-H1-003',
      otc: otcs[2],
      type: '6-month',
      cycle: 'H1 2024',
      scheduledDate: '2024-07-15',
      dueDate: '2024-07-31',
      status: 'completed',
      completedDate: '2024-07-18',
      reviewer: 'Ahmed Hassan',
      score: 88,
      outcome: 'Meets Expectations'
    },
    {
      id: 'REV-2024-H1-004',
      otc: otcs[3],
      type: '6-month',
      cycle: 'H1 2024',
      scheduledDate: '2024-07-20',
      dueDate: '2024-07-31',
      status: 'in-progress',
      reviewer: 'Prof. Mohamed Rashad',
      progress: 65
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      'scheduled': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Calendar, label: 'Scheduled' },
      'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'In Progress' },
      'completed': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle2, label: 'Completed' },
      'overdue': { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle, label: 'Overdue' }
    };
    return badges[status] || badges.scheduled;
  };

  const filteredReviews = reviews.filter(review => {
    if (filterType !== 'all' && review.type !== filterType) return false;
    if (filterStatus !== 'all' && review.status !== filterStatus) return false;
    if (filterCluster !== 'all' && !review.otc.clusters.includes(filterCluster)) return false;
    return true;
  });

  const upcomingCount = reviews.filter(r => r.status === 'scheduled').length;
  const inProgressCount = reviews.filter(r => r.status === 'in-progress').length;
  const completedCount = reviews.filter(r => r.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Reviews</h1>
          <p className="text-gray-600">OTC performance review management (NCTC-FLOW-004)</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowNotifications(true)} className="btn btn-secondary flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </button>
          <button onClick={() => setShowScheduler(true)} className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Schedule Review
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{upcomingCount}</span>
          </div>
          <p className="text-sm text-gray-600">Scheduled</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-600" />
            <span className="text-2xl font-bold text-gray-900">{inProgressCount}</span>
          </div>
          <p className="text-sm text-gray-600">In Progress</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{completedCount}</span>
          </div>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">{reviews.length}</span>
          </div>
          <p className="text-sm text-gray-600">Total Reviews</p>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Types</option>
              <option value="6-month">6-Month Reviews</option>
              <option value="2-year">2-Year Assessments</option>
            </select>

            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select 
              value={filterCluster} 
              onChange={(e) => setFilterCluster(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Clusters</option>
              {clusters.map(cluster => (
                <option key={cluster.id} value={cluster.id}>{cluster.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <List className="w-5 h-5" />
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === 'calendar' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Calendar
            </button>
            <button onClick={() => {
              toast.info('Exporting review data...');
              setTimeout(() => {
                const data = filteredReviews.map(r => ({
                  'Review ID': r.id,
                  'OTC': r.otc.name,
                  'Type': r.type,
                  'Cycle': r.cycle,
                  'Date': r.scheduledDate,
                  'Status': r.status,
                  'Reviewer': r.reviewer
                }));
                downloadCSV(data, 'performance-reviews.csv');
                toast.success('Review data exported successfully!');
              }, 500);
            }} className="btn btn-secondary flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List/Calendar */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">OTC</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Cycle</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Scheduled Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Reviewer</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => {
                  const badge = getStatusBadge(review.status);
                  const StatusIcon = badge.icon;
                  return (
                    <tr key={review.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900">{review.otc.name}</p>
                          <p className="text-xs text-gray-500">{review.otc.institution}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-lg text-xs font-medium">
                          {review.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm">{review.cycle}</td>
                      <td className="py-4 px-6 text-sm">{new Date(review.scheduledDate).toLocaleDateString()}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 w-fit ${badge.bg} ${badge.text}`}>
                          <StatusIcon className="w-4 h-4" />
                          {badge.label}
                        </span>
                        {review.status === 'in-progress' && review.progress && (
                          <div className="mt-2 w-24">
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-500 rounded-full"
                                style={{ width: `${review.progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{review.progress}%</p>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{review.reviewer}</td>
                      <td className="py-4 px-6">
                        <Link 
                          to={`/nctc/performance/otc/${review.otc.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar View</h3>
            <p className="text-gray-600">Calendar visualization would be displayed here</p>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Bulk Actions</h3>
        <div className="flex gap-3">
          <button onClick={() => setShowBulkScheduler(true)} className="btn btn-sm btn-primary">
            Bulk Schedule Reviews
          </button>
          <button onClick={() => setShowRemindersConfirm(true)} className="btn btn-sm btn-primary">
            Send Reminders
          </button>
          <button onClick={() => setShowTemplates(true)} className="btn btn-sm btn-secondary">
            View Templates
          </button>
        </div>
      </div>

      {/* Schedule Review Modal */}
      <SchedulerModal
        isOpen={showScheduler}
        onClose={() => setShowScheduler(false)}
        title="Schedule Performance Review"
        eventType="review"
      />

      {/* Bulk Scheduler Modal */}
      <Modal isOpen={showBulkScheduler} onClose={() => setShowBulkScheduler(false)} title="Bulk Schedule Reviews" size="md">
        <form onSubmit={(e) => {
          e.preventDefault();
          toast.info('Scheduling reviews...');
          setTimeout(() => {
            toast.success('Reviews scheduled successfully for selected OTCs!');
            setShowBulkScheduler(false);
          }, 1000);
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select OTCs</label>
            <select multiple className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" size="5">
              {otcs.map(otc => (
                <option key={otc.id} value={otc.id}>{otc.name}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Review Type</label>
            <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="6-month">6-Month Review</option>
              <option value="2-year">2-Year Assessment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Review Date</label>
            <input type="date" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button type="button" onClick={() => setShowBulkScheduler(false)} className="btn-outline px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-4 py-2">
              Schedule All
            </button>
          </div>
        </form>
      </Modal>

      {/* Notifications Modal */}
      <Modal isOpen={showNotifications} onClose={() => setShowNotifications(false)} title="Review Notifications" size="md">
        <div className="space-y-3">
          {[
            {text: 'Review scheduled for AUC TTO on Dec 20, 2024', type: 'info', time: '2 hours ago'},
            {text: 'Review completed for GUC TTO - Score: 88', type: 'success', time: '1 day ago'},
            {text: 'Reminder: Review due for MSA TTO by Dec 31', type: 'warning', time: '3 days ago'}
          ].map((notif, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${
              notif.type === 'success' ? 'bg-green-50 border-green-200' :
              notif.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <p className="text-sm text-gray-900">{notif.text}</p>
              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Templates Modal */}
      <Modal isOpen={showTemplates} onClose={() => setShowTemplates(false)} title="Review Templates" size="md">
        <div className="space-y-3">
          {[
            {name: '6-Month Review Template', items: 12, status: 'Active'},
            {name: '2-Year Assessment Template', items: 25, status: 'Active'},
            {name: 'Quick Performance Check', items: 8, status: 'Active'}
          ].map((template, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.items} checklist items</p>
                </div>
                <button onClick={() => {
                  toast.success(`Template "${template.name}" downloaded!`);
                }} className="btn-outline px-3 py-1 text-sm">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Send Reminders Confirmation */}
      <ConfirmDialog
        isOpen={showRemindersConfirm}
        onClose={() => setShowRemindersConfirm(false)}
        onConfirm={() => {
          const pendingCount = reviews.filter(r => r.status === 'scheduled' || r.status === 'in-progress').length;
          toast.info('Sending reminders...');
          setTimeout(() => {
            toast.success(`Reminders sent to ${pendingCount} OTCs with pending reviews!`);
            setShowRemindersConfirm(false);
          }, 1000);
        }}
        title="Send Review Reminders"
        message={`Send reminder notifications to all OTCs with pending reviews? This will notify ${reviews.filter(r => r.status === 'scheduled' || r.status === 'in-progress').length} OTCs.`}
        confirmText="Send Reminders"
        type="info"
      />
    </div>
  );
}
