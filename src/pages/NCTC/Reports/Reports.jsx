import { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, DollarSign, Award, Users, BarChart3, PieChart, Activity, Filter, Clock } from 'lucide-react';
import { ecosystemStats } from '../../../mockData';
import ReportGeneratorModal from '../../../components/ReportGeneratorModal';
import SchedulerModal from '../../../components/SchedulerModal';
import Modal from '../../../components/Modal';
import toast from '../../../utils/toast';
import { downloadPDFReport, downloadExcel, downloadCSV } from '../../../utils/downloads';

export default function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState('year-2024');
  const [reportType, setReportType] = useState('all');
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showArchives, setShowArchives] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState(null);

  // Mock report types
  const reportTypes = [
    { id: 'executive', name: 'Executive Summary', icon: FileText, description: 'High-level overview for leadership' },
    { id: 'performance', name: 'Network Performance', icon: TrendingUp, description: 'OTC performance metrics and trends' },
    { id: 'funding', name: 'Funding Utilization', icon: DollarSign, description: 'Financial allocation and expenditure' },
    { id: 'portfolio', name: 'Technology Portfolio', icon: Award, description: 'IP, projects, and commercialization' },
    { id: 'gaps', name: 'Gap Analysis', icon: BarChart3, description: 'Matrix coverage and capability gaps' }
  ];

  // Mock scheduled reports
  const scheduledReports = [
    { id: 1, name: 'Monthly Executive Summary', frequency: 'Monthly', nextRun: '2025-01-01', recipients: 15, status: 'active' },
    { id: 2, name: 'Quarterly Performance Report', frequency: 'Quarterly', nextRun: '2025-01-15', recipients: 8, status: 'active' },
    { id: 3, name: 'Annual Impact Report', frequency: 'Yearly', nextRun: '2025-12-31', recipients: 25, status: 'active' }
  ];

  // Mock recent reports
  const recentReports = [
    { id: 1, name: 'Q4 2024 Executive Summary', type: 'Executive', date: '2024-12-01', size: '2.4 MB', format: 'PDF' },
    { id: 2, name: 'November 2024 Performance', type: 'Performance', date: '2024-12-05', size: '5.1 MB', format: 'PDF' },
    { id: 3, name: 'Funding Utilization H2 2024', type: 'Funding', date: '2024-12-10', size: '3.2 MB', format: 'Excel' },
    { id: 4, name: 'Technology Portfolio 2024', type: 'Portfolio', date: '2024-12-12', size: '8.7 MB', format: 'PDF' },
    { id: 5, name: 'Annual Gap Analysis 2024', type: 'Gaps', date: '2024-12-15', size: '4.5 MB', format: 'PDF' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Ecosystem-wide reporting and analytics dashboard</p>
        </div>
        <button onClick={() => setShowReportGenerator(true)} className="btn btn-primary flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Generate Report
        </button>
      </div>

      {/* Ecosystem Stats Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Ecosystem Overview</h2>
        <div className="grid md:grid-cols-5 gap-6">
          <div>
            <p className="text-3xl font-bold mb-1">{ecosystemStats.totalOTCs}</p>
            <p className="text-blue-100 text-sm">Active OTCs</p>
          </div>
          <div>
            <p className="text-3xl font-bold mb-1">{ecosystemStats.totalDisclosures}</p>
            <p className="text-blue-100 text-sm">Total Disclosures</p>
          </div>
          <div>
            <p className="text-3xl font-bold mb-1">{ecosystemStats.patents}</p>
            <p className="text-blue-100 text-sm">Patents Filed</p>
          </div>
          <div>
            <p className="text-3xl font-bold mb-1">{ecosystemStats.spinoffs}</p>
            <p className="text-blue-100 text-sm">Spin-offs Created</p>
          </div>
          <div>
            <p className="text-3xl font-bold mb-1">EGP {(ecosystemStats.totalRevenue / 1000000).toFixed(1)}M</p>
            <p className="text-blue-100 text-sm">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Reporting Period:</span>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="month-current">Current Month</option>
              <option value="quarter-q4">Q4 2024</option>
              <option value="year-2024">Year 2024</option>
              <option value="year-2023">Year 2023</option>
              <option value="all-time">All Time</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(true)}
              className="btn btn-secondary text-sm"
            >
              <Filter className="w-4 h-4 inline mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Report Types</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              >
                <Icon className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedReportType(type);
                    setShowReportGenerator(true);
                  }}
                  className="mt-3 text-sm text-blue-600 font-medium group-hover:underline"
                >
                  Generate →
                </button>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Analytics Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Performance Trends
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Disclosure Growth</span>
                <span className="font-semibold text-green-600">+18%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Patent Filings</span>
                <span className="font-semibold text-blue-600">+12%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '76%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Revenue Generation</span>
                <span className="font-semibold text-purple-600">+24%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Spin-off Creation</span>
                <span className="font-semibold text-orange-600">+8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Cluster Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-600" />
            Activity by Cluster
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Engineering & Technology', value: 28, color: 'bg-blue-500' },
              { name: 'ICT & Digital', value: 24, color: 'bg-purple-500' },
              { name: 'Life Sciences', value: 18, color: 'bg-green-500' },
              { name: 'Health Sciences', value: 15, color: 'bg-pink-500' },
              { name: 'Environmental', value: 10, color: 'bg-teal-500' },
              { name: 'Physical Sciences', value: 5, color: 'bg-red-500' }
            ].map((cluster, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{cluster.name}</span>
                  <span className="font-semibold">{cluster.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${cluster.color} h-2 rounded-full`} style={{ width: `${cluster.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Scheduled Reports</h2>
          <button 
            onClick={() => setShowScheduler(true)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Manage Schedule
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {scheduledReports.map(report => (
            <div key={report.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">{report.name}</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  {report.status}
                </span>
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{report.frequency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>Next: {report.nextRun}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  <span>{report.recipients} recipients</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports Archive */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
          <button 
            onClick={() => setShowArchives(true)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Archives
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Report Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date Generated</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Size</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Format</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map(report => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900 text-sm">{report.name}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                      {report.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{report.size}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {report.format}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => {
                        toast.info('Preparing download...');
                        setTimeout(() => {
                          const content = `Report: ${report.name}\nType: ${report.type}\nGenerated: ${report.date}\nSize: ${report.size}`;
                          if (report.format === 'PDF') {
                            downloadPDFReport(report.name, content, `${report.name.replace(/\s+/g, '-')}.pdf`);
                          } else if (report.format === 'Excel') {
                            downloadExcel([{Report: report.name, Type: report.type, Date: report.date}], `${report.name.replace(/\s+/g, '-')}.xlsx`);
                          }
                          toast.success('Report downloaded successfully!');
                        }, 500);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Generator Modal */}
      <ReportGeneratorModal
        isOpen={showReportGenerator}
        onClose={() => {
          setShowReportGenerator(false);
          setSelectedReportType(null);
        }}
        reportTypes={reportTypes}
        context={selectedReportType ? selectedReportType.id : 'general'}
      />

      {/* Filters Modal */}
      <Modal isOpen={showFilters} onClose={() => setShowFilters(false)} title="Advanced Filters" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="all">All Report Types</option>
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">OTC Selection</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="all">All OTCs</option>
              <option value="active">Active OTCs Only</option>
              <option value="inactive">Inactive OTCs Only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-3">
              <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button onClick={() => setShowFilters(false)} className="btn-outline px-4 py-2">
              Cancel
            </button>
            <button onClick={() => {
              toast.success('Filters applied successfully!');
              setShowFilters(false);
            }} className="btn-primary px-4 py-2">
              Apply Filters
            </button>
          </div>
        </div>
      </Modal>

      {/* Scheduler Modal */}
      <SchedulerModal
        isOpen={showScheduler}
        onClose={() => setShowScheduler(false)}
        title="Schedule Report"
        eventType="report"
      />

      {/* Archives Modal */}
      <Modal isOpen={showArchives} onClose={() => setShowArchives(false)} title="Report Archives" size="lg">
        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search reports..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Types</option>
              <option>Executive</option>
              <option>Performance</option>
              <option>Funding</option>
            </select>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Report Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map(report => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{report.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{report.date}</td>
                    <td className="py-3 px-4">
                      <button onClick={() => {
                        toast.info('Preparing report download...');
                        downloadPDFReport(
                          `${report.name.replace(/\s+/g, '_')}_${report.date}`,
                          `Archived Report\nName: ${report.name}\nDate: ${report.date}\nGenerated by: NCTC Platform`
                        );
                      }} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
}
