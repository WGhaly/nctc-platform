import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Eye, CheckCircle, XCircle, Clock, AlertTriangle, Calendar, FileText } from 'lucide-react';
import { detailedApplications, clusters } from '../../../mockData';
import { handleAnnounceCall } from '../../../utils/quickActions';

export default function OTCApplications() {
  // Use detailed applications if available, fallback to regular applications
  const applications = detailedApplications || [];
  
  const stats = {
    total: applications.length,
    underReview: applications.filter(a => a.status === 'under-review').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">OTC Applications</h1>
          <p className="text-gray-600">Review and assess applications from institutions seeking OTC designation (NCTC-FLOW-001)</p>
        </div>
        <button 
          className="btn btn-primary flex items-center gap-2"
          onClick={handleAnnounceCall}
        >
          <Plus className="w-5 h-5" />
          Announce Call
        </button>
      </div>

      {/* Process Timeline Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Application Process Timeline (NCTC-FLOW-001)</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Step 1:</span> Call Announcement (min 60 days) &rarr; 
              <span className="font-medium"> Step 2:</span> Application Submission &rarr; 
              <span className="font-medium"> Step 3:</span> Initial Screening &rarr; 
              <span className="font-medium"> Step 4:</span> Capability Assessment (6×6 Matrix) &rarr; 
              <span className="font-medium"> Step 5:</span> Institutional Visit (shortlisted) &rarr; 
              <span className="font-medium"> Step 6:</span> Acceptance Decision &rarr; 
              <span className="font-medium"> Step 7:</span> Notification with Feedback
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FileText className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Under Review</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.underReview}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Accepted</p>
              <p className="text-3xl font-bold text-green-600">{stats.accepted}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Rejected</p>
              <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by institution, city, or applicant..."
                className="input pl-10"
              />
            </div>
          </div>
          <select className="input w-auto">
            <option value="">All Statuses</option>
            <option value="under-review">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="input w-auto">
            <option value="">All Clusters</option>
            {clusters && clusters.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select className="input w-auto">
            <option value="">Score Range</option>
            <option value="8-10">8.0 - 10.0 (Strong)</option>
            <option value="6-8">6.0 - 7.9 (Moderate)</option>
            <option value="0-6">Below 6.0 (Weak)</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Institution</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assessment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm font-medium text-blue-600">{app.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{app.institution}</div>
                    <div className="text-xs text-gray-500">{app.institutionType || 'University'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{app.city}</div>
                    <div className="text-xs text-gray-500">{app.governorate || app.city}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{app.applicant}</div>
                    <div className="text-xs text-gray-500">{app.title || app.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div>{app.submissionDate}</div>
                    {app.visitScheduled && (
                      <div className="text-xs text-blue-600 mt-1 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Visit: {app.visitScheduled}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {app.overallScore || app.assessmentScore ? (
                      <div className="flex items-center">
                        <span className={`font-bold text-lg ${
                          (app.overallScore || app.assessmentScore) >= 8 ? 'text-green-600' :
                          (app.overallScore || app.assessmentScore) >= 6 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {app.overallScore || app.assessmentScore}
                        </span>
                        <span className="text-gray-400 text-sm ml-1">/10</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded whitespace-nowrap">
                      {app.stage ? app.stage.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Initial Review'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${
                      app.status === 'accepted' ? 'badge-success' :
                      app.status === 'under-review' ? 'badge-warning' :
                      app.status === 'rejected' ? 'badge-error' : 'badge-info'
                    }`}>
                      {app.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/nctc/otc-management/applications/${app.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
                    >
                      View Details &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decision Points Reference */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Decision Points (NCTC-FLOW-001)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D1:</span>
            <span className="text-gray-600">Shortlist for institutional visit? (Score &ge; 6.5 &rarr; Yes / Score &lt; 6.5 &rarr; Reject with feedback)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D2:</span>
            <span className="text-gray-600">Accept application? (Yes &rarr; Acceptance + Matrix Position Assignment / No &rarr; Rejection with detailed feedback and development recommendations)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
