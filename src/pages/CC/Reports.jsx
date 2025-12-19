import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, AlertTriangle, CheckCircle2, TrendingUp, Info, Calendar } from 'lucide-react';
import { clusterCoordinators } from '../../mockData';
import Modal from '../../components/Modal';
import toast from '../../utils/toast';
import { downloadPDFReport } from '../../utils/downloads';

export default function ClusterReports() {
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [showReportView, setShowReportView] = useState(false);
  const [showImplementation, setShowImplementation] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const myCoordination = clusterCoordinators[0];
  const reports = myCoordination.quarterlyReports;

  const getPerformanceBadge = (performance) => {
    switch (performance) {
      case 'high': return 'badge-success';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-error';
      default: return 'badge-default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quarterly Reports</h1>
          <p className="text-gray-600">Gap Identification & Recommendations (CC-FLOW-004, 005)</p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => setShowCreateReport(true)}
        >
          <Plus className="w-5 h-5" />
          Create New Report
        </button>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Quarterly Reporting Process</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Gap Analysis:</span> Review monthly matrix analysis, identify coverage gaps &rarr; 
              <span className="font-medium"> Performance Review:</span> Assess cluster OTC performance, budget utilization &rarr; 
              <span className="font-medium"> Recommendations:</span> Budget adjustments, support actions, training needs &rarr; 
              <span className="font-medium"> Submit to NCTC:</span> Quarterly report with actionable recommendations
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reports</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{reports.length}</p>
              <p className="text-xs text-gray-500 mt-1">Quarterly submissions</p>
            </div>
            <FileText className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gaps Identified</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {reports.reduce((sum, r) => sum + r.gapsIdentified, 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">This year</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Support Actions</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {reports.reduce((sum, r) => sum + r.supportActionsRecommended, 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Recommended</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Budget Adjustments</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {reports.reduce((sum, r) => sum + r.budgetAdjustments, 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Approved</p>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report, idx) => (
          <div key={idx} className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{report.quarter} Report</h3>
                <p className="text-sm text-gray-600">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Submitted: {report.submissionDate}
                </p>
              </div>
              <div className="text-right">
                <span className={`badge ${getPerformanceBadge(report.clusterPerformance)} mb-2`}>
                  {report.clusterPerformance} performance
                </span>
                <p className="text-sm text-gray-600">Status: <span className="font-medium text-green-600">{report.status}</span></p>
              </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{report.gapsIdentified}</p>
                <p className="text-xs text-gray-600">Gaps Identified</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{report.supportActionsRecommended}</p>
                <p className="text-xs text-gray-600">Support Actions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{report.budgetAdjustments}</p>
                <p className="text-xs text-gray-600">Budget Adjustments</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 capitalize">{report.clusterPerformance}</p>
                <p className="text-xs text-gray-600">Overall Rating</p>
              </div>
            </div>

            {/* Report Sections */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mr-1" />
                  Highlights ({report.highlights.length})
                </h4>
                <ul className="space-y-1">
                  {report.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-gray-600 pl-4">• {highlight}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mr-1" />
                  Challenges ({report.challenges.length})
                </h4>
                <ul className="space-y-1">
                  {report.challenges.map((challenge, i) => (
                    <li key={i} className="text-sm text-gray-600 pl-4">• {challenge}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                  Recommendations ({report.recommendations.length})
                </h4>
                <ul className="space-y-1">
                  {report.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-gray-600 pl-4">• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
              <button 
                onClick={() => {
                  setSelectedReport(report);
                  setShowReportView(true);
                }}
                className="btn-outline text-sm"
              >
                View Full Report
              </button>
              <button 
                onClick={() => {
                  toast.info('Generating PDF...');
                  setTimeout(() => {
                    const content = `Quarterly Report ${report.quarter}\n\nGaps Identified: ${report.gapsIdentified}\nSupport Actions: ${report.supportActionsRecommended}\nBudget Adjustments: ${report.budgetAdjustments}`;
                    downloadPDFReport(`Quarterly Report ${report.quarter}`, content, `cluster-report-${report.quarter}.pdf`);
                    toast.success('PDF downloaded successfully!');
                  }, 500);
                }}
                className="btn-outline text-sm"
              >
                Download PDF
              </button>
              <button 
                onClick={() => {
                  setSelectedReport(report);
                  setShowImplementation(true);
                }}
                className="btn-outline text-sm"
              >
                Implementation Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Template */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Quarterly Report Template</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700 mb-2">Required Sections:</p>
            <ul className="space-y-1 text-gray-600">
              <li>• Executive Summary</li>
              <li>• Cluster Performance Overview</li>
              <li>• Gap Analysis (Matrix Coverage)</li>
              <li>• OTC Performance Comparison</li>
              <li>• Budget Utilization Review</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-2">Recommendations Format:</p>
            <ul className="space-y-1 text-gray-600">
              <li>• Gap identification with priority</li>
              <li>• Proposed support actions</li>
              <li>• Budget adjustment needs</li>
              <li>• Training requirements</li>
              <li>• Timeline and milestones</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Create Report Modal */}
      <Modal isOpen={showCreateReport} onClose={() => setShowCreateReport(false)} title="Create Quarterly Report" size="lg">
        <form onSubmit={(e) => {
          e.preventDefault();
          toast.info('Creating report...');
          setTimeout(() => {
            toast.success('Quarterly report created successfully!');
            setShowCreateReport(false);
          }, 1000);
        }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quarter</label>
              <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option>Q1 2025</option>
                <option>Q2 2025</option>
                <option>Q3 2025</option>
                <option>Q4 2025</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Submission Date</label>
              <input type="date" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Executive Summary</label>
            <textarea rows="3" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gaps Identified</label>
            <input type="number" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t">
            <button type="button" onClick={() => setShowCreateReport(false)} className="btn-outline px-4 py-2">Cancel</button>
            <button type="submit" className="btn-primary px-4 py-2">Create Report</button>
          </div>
        </form>
      </Modal>

      {/* View Report Modal */}
      {selectedReport && (
        <Modal isOpen={showReportView} onClose={() => setShowReportView(false)} title={`Report ${selectedReport.quarter}`} size="lg">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded-lg p-3">
                <p className="text-sm text-gray-600">Gaps Identified</p>
                <p className="text-2xl font-bold">{selectedReport.gapsIdentified}</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm text-gray-600">Support Actions</p>
                <p className="text-2xl font-bold">{selectedReport.supportActionsRecommended}</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm text-gray-600">Budget Adjustments</p>
                <p className="text-2xl font-bold">{selectedReport.budgetAdjustments}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Performance Overview</h4>
              <p className="text-sm text-gray-600">Detailed cluster performance analysis and recommendations...</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Implementation Status Modal */}
      {selectedReport && (
        <Modal isOpen={showImplementation} onClose={() => setShowImplementation(false)} title="Implementation Status" size="md">
          <div className="space-y-3">
            {[
              {action: 'Training Program', status: 'Completed', progress: 100},
              {action: 'Budget Reallocation', status: 'In Progress', progress: 65},
              {action: 'Gap Support Actions', status: 'Planned', progress: 20}
            ].map((item, idx) => (
              <div key={idx} className="border rounded-lg p-3">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-sm">{item.action}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>{item.status}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: `${item.progress}%`}} />
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
