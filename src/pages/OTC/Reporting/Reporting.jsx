import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Calendar, TrendingUp, Users, Lightbulb, DollarSign, Award, Info, BarChart3, FileSpreadsheet } from 'lucide-react';
import { clusters } from '../../../mockData';

export default function Reporting() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedCluster, setSelectedCluster] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportType, setReportType] = useState('');

  // Mock KPI data
  const monthlyKPIs = {
    disclosuresReceived: 8,
    disclosuresTarget: 6,
    evaluationsCompleted: 7,
    evaluationsTarget: 8,
    projectsInitiated: 2,
    projectsTarget: 2,
    licensingAgreements: 1,
    licensingTarget: 1,
    spinoffsCreated: 0,
    spinoffsTarget: 0,
    revenueGenerated: 125000,
    revenueTarget: 100000,
    collaborationsProvided: 5,
    collaborationsTarget: 4,
    servicesReceived: 3,
    servicesTarget: 3,
    trainingParticipation: 12,
    trainingTarget: 10,
    gapClosureProgress: 65,
    gapClosureTarget: 60
  };

  const quarterlyKPIs = {
    disclosuresReceived: 24,
    evaluationsCompleted: 22,
    projectsInitiated: 5,
    licensingAgreements: 3,
    spinoffsCreated: 1,
    revenueGenerated: 450000,
    collaborationsProvided: 15,
    servicesReceived: 8,
    trainingParticipation: 36,
    gapClosureProgress: 68
  };

  const annualKPIs = {
    disclosuresReceived: 92,
    evaluationsCompleted: 88,
    projectsInitiated: 18,
    licensingAgreements: 12,
    spinoffsCreated: 3,
    revenueGenerated: 1850000,
    collaborationsProvided: 58,
    servicesReceived: 32,
    trainingParticipation: 142,
    gapClosureProgress: 72
  };

  // Mock report history
  const reportHistory = [
    {
      id: 'RPT-2024-12',
      type: 'Monthly Activity',
      period: 'December 2024',
      submittedDate: '2024-12-05',
      status: 'Submitted',
      reviewer: 'NCTC Staff'
    },
    {
      id: 'RPT-2024-11',
      type: 'Monthly Activity',
      period: 'November 2024',
      submittedDate: '2024-11-08',
      status: 'Approved',
      reviewer: 'NCTC Staff'
    },
    {
      id: 'RPT-2024-H2',
      type: '6-Month Performance',
      period: 'July-Dec 2024',
      submittedDate: '2024-12-10',
      status: 'Under Review',
      reviewer: 'NCTC Leadership'
    },
    {
      id: 'RPT-2024-10',
      type: 'Monthly Activity',
      period: 'October 2024',
      submittedDate: '2024-10-12',
      status: 'Approved',
      reviewer: 'NCTC Staff'
    },
    {
      id: 'RPT-2024-H1',
      type: '6-Month Performance',
      period: 'Jan-June 2024',
      submittedDate: '2024-07-05',
      status: 'Approved',
      reviewer: 'NCTC Leadership'
    },
  ];

  // Cluster performance breakdown
  const clusterPerformance = [
    { cluster: 'eng', disclosures: 28, projects: 6, revenue: 650000 },
    { cluster: 'ict', disclosures: 42, projects: 8, revenue: 850000 },
    { cluster: 'life', disclosures: 12, projects: 2, revenue: 180000 },
    { cluster: 'health', disclosures: 10, projects: 2, revenue: 170000 },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Submitted': return 'badge-info';
      case 'Under Review': return 'badge-warning';
      case 'Approved': return 'badge-success';
      case 'Revision Required': return 'badge-error';
      default: return 'badge-default';
    }
  };

  const calculatePerformance = (actual, target) => {
    const percentage = (actual / target) * 100;
    if (percentage >= 100) return { status: 'Exceeds', color: 'green' };
    if (percentage >= 80) return { status: 'Meets', color: 'blue' };
    return { status: 'Below', color: 'red' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Reporting</h1>
          <p className="text-gray-600">Track KPIs and submit reports to NCTC (NCTC-FLOW-004)</p>
        </div>
        <button onClick={() => setShowReportForm(true)} className="btn-primary rounded-xl">
          <FileText className="w-5 h-5 mr-2" />
          Generate Report
        </button>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Reporting Requirements</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Monthly:</span> Activity reports due by 5th of following month &rarr; 
              <span className="font-medium"> 6-Month:</span> Performance review required &rarr; 
              <span className="font-medium"> 2-Year:</span> Comprehensive assessment for continued funding
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Metrics</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">95%</p>
              <p className="text-xs text-gray-500 mt-1">Target achievement</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Quarterly Performance</p>
              <p className="text-3xl font-bold text-green-600 mt-1">102%</p>
              <p className="text-xs text-gray-500 mt-1">Above target</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Annual Progress</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">98%</p>
              <p className="text-xs text-gray-500 mt-1">On track</p>
            </div>
            <Award className="w-10 h-10 text-purple-600" />
          </div>
        </div>
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Deadline</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">5</p>
              <p className="text-xs text-gray-500 mt-1">Days remaining</p>
            </div>
            <Calendar className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="card rounded-xl">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mr-3">View Period:</label>
            <div className="inline-flex gap-2 mt-2">
              <button
                onClick={() => setSelectedPeriod('monthly')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedPeriod === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPeriod('quarterly')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedPeriod === 'quarterly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setSelectedPeriod('annual')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedPeriod === 'annual'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Annual
              </button>
            </div>
          </div>
          <select 
            className="input rounded-xl"
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
          >
            <option value="">All Clusters</option>
            {clusters.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Tracking Table */}
      <div className="card rounded-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Key Performance Indicators</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Target</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actual</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Progress</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {selectedPeriod === 'monthly' && (
                <>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Disclosures Received</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{monthlyKPIs.disclosuresTarget}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">{monthlyKPIs.disclosuresReceived}</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((monthlyKPIs.disclosuresReceived / monthlyKPIs.disclosuresTarget) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`badge badge-${calculatePerformance(monthlyKPIs.disclosuresReceived, monthlyKPIs.disclosuresTarget).color === 'green' ? 'success' : 'info'}`}>
                        {calculatePerformance(monthlyKPIs.disclosuresReceived, monthlyKPIs.disclosuresTarget).status}
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Evaluations Completed</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{monthlyKPIs.evaluationsTarget}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">{monthlyKPIs.evaluationsCompleted}</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((monthlyKPIs.evaluationsCompleted / monthlyKPIs.evaluationsTarget) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`badge badge-${calculatePerformance(monthlyKPIs.evaluationsCompleted, monthlyKPIs.evaluationsTarget).color === 'green' ? 'success' : 'info'}`}>
                        {calculatePerformance(monthlyKPIs.evaluationsCompleted, monthlyKPIs.evaluationsTarget).status}
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Projects Initiated</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{monthlyKPIs.projectsTarget}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">{monthlyKPIs.projectsInitiated}</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((monthlyKPIs.projectsInitiated / monthlyKPIs.projectsTarget) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge badge-success">
                        {calculatePerformance(monthlyKPIs.projectsInitiated, monthlyKPIs.projectsTarget).status}
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Licensing Agreements</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{monthlyKPIs.licensingTarget}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">{monthlyKPIs.licensingAgreements}</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((monthlyKPIs.licensingAgreements / monthlyKPIs.licensingTarget) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge badge-success">Meets</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Revenue Generated (EGP)</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{(monthlyKPIs.revenueTarget / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">{(monthlyKPIs.revenueGenerated / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((monthlyKPIs.revenueGenerated / monthlyKPIs.revenueTarget) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge badge-success">Exceeds</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Collaboration Services Provided</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{monthlyKPIs.collaborationsTarget}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">{monthlyKPIs.collaborationsProvided}</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((monthlyKPIs.collaborationsProvided / monthlyKPIs.collaborationsTarget) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge badge-success">Exceeds</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Training Participation</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{monthlyKPIs.trainingTarget}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">{monthlyKPIs.trainingParticipation}</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((monthlyKPIs.trainingParticipation / monthlyKPIs.trainingTarget) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge badge-success">Exceeds</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Gap Closure Progress (%)</td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{monthlyKPIs.gapClosureTarget}%</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">{monthlyKPIs.gapClosureProgress}%</td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${monthlyKPIs.gapClosureProgress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="badge badge-success">Exceeds</span>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card rounded-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Trend Over Time
          </h3>
          <div className="h-64 flex items-end justify-around gap-2 border-b border-l border-gray-200 p-4">
            {[85, 92, 88, 95, 97, 102, 98, 95, 100, 103, 105, 98].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600"
                  style={{ height: `${value}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">Monthly Performance (%)</div>
        </div>

        <div className="card rounded-xl">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Cluster Distribution</h3>
          <div className="space-y-3">
            {clusterPerformance.map(item => {
              const cluster = clusters.find(c => c.id === item.cluster);
              return (
                <div key={item.cluster} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{cluster?.name}</div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                      <span>{item.disclosures} disclosures</span>
                      <span>{item.projects} projects</span>
                      <span>{(item.revenue / 1000).toFixed(0)}K EGP</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Report History */}
      <div className="card rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Report Submission History</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Export Excel
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reviewer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportHistory.map(report => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-blue-600">{report.id}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{report.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{report.period}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{report.submittedDate}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${getStatusBadge(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{report.reviewer}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Generation Modal */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Generate Performance Report</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Type
                  </label>
                  <select 
                    className="input rounded-xl w-full"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="">Select report type...</option>
                    <option value="monthly">Monthly Activity Report</option>
                    <option value="6month">6-Month Performance Review</option>
                    <option value="2year">2-Year Assessment</option>
                    <option value="custom">Custom Report</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input type="date" className="input rounded-xl w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input type="date" className="input rounded-xl w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Include Clusters
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {clusters.map(c => (
                      <label key={c.id} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm text-gray-700">{c.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea 
                    className="input rounded-xl w-full h-24"
                    placeholder="Add any context or highlights for this report..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Export Format
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="format" value="pdf" defaultChecked />
                      <span className="text-sm text-gray-700">PDF</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="format" value="excel" />
                      <span className="text-sm text-gray-700">Excel</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="format" value="csv" />
                      <span className="text-sm text-gray-700">CSV</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowReportForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Generate & Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
