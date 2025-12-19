import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, X, Eye, Calendar, MapPin, Mail, User, FileCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { detailedApplications, clusters, pillars } from '../../../mockData';

export default function ApplicationDetail() {
  const { id } = useParams();
  const application = detailedApplications.find(a => a.id === id) || detailedApplications[0];

  const handleApprove = () => {
    alert('Application approved! OTC will be onboarded.');
  };

  const handleReject = () => {
    alert('Application rejected. Feedback will be sent to applicant.');
  };

  return (
    <div className="space-y-6">
      <Link to="/nctc/otc-management/applications" className="inline-flex items-center text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Applications
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{application.institution}</h1>
          <p className="text-gray-600">{application.id}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={handleReject} className="btn-secondary text-red-600 border-red-600 hover:bg-red-50">
            <X className="w-5 h-5 mr-2" />
            Reject
          </button>
          <button onClick={handleApprove} className="btn-primary">
            <Check className="w-5 h-5 mr-2" />
            Approve
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Application Info */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Application Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Institution Name</label>
                <p className="text-gray-900 font-medium mt-1">{application.institution}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">City/Location</label>
                <p className="text-gray-900 font-medium mt-1">{application.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Primary Contact</label>
                <p className="text-gray-900 font-medium mt-1">{application.applicant}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900 font-medium mt-1">{application.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Submission Date</label>
                <p className="text-gray-900 font-medium mt-1">{application.submissionDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Assessment Score</label>
                <p className="text-gray-900 font-medium mt-1">
                  {application.assessmentScore ? `${application.assessmentScore}/10` : 'Pending'}
                </p>
              </div>
            </div>
          </div>

          {/* Capability Assessment Matrix */}
          {application.capabilityAssessment && (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                6×6 Capability Assessment
                <span className="ml-3 text-2xl font-bold text-blue-600">
                  Overall: {application.overallScore}/10
                </span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 bg-gray-100 p-2 text-left font-medium">Cluster / Pillar</th>
                      {pillars.map(pillar => (
                        <th key={pillar.id} className="border border-gray-300 bg-blue-50 p-2 text-center font-medium">
                          {pillar.name.split(' ')[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {clusters.map(cluster => (
                      <tr key={cluster.id}>
                        <td className="border border-gray-300 bg-gray-50 p-2 font-medium">
                          {cluster.name.split(' ')[0]}
                        </td>
                        {pillars.map(pillar => {
                          const score = application.capabilityAssessment[cluster.id]?.[pillar.id];
                          const bgColor = score >= 8 ? 'bg-green-100' : 
                                        score >= 6 ? 'bg-yellow-100' : 
                                        score ? 'bg-red-100' : 'bg-gray-50';
                          return (
                            <td key={pillar.id} className={`border border-gray-300 p-2 text-center font-semibold ${bgColor}`}>
                              {score !== undefined ? score : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-4 text-xs">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-100 border border-gray-300 mr-1"></div>
                  <span>Strong (8-10)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-100 border border-gray-300 mr-1"></div>
                  <span>Moderate (6-7.9)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-100 border border-gray-300 mr-1"></div>
                  <span>Weak (&lt;6)</span>
                </div>
              </div>
            </div>
          )}

          {/* Assessment Details */}
          {application.visitReport && (
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Institutional Visit Report
                {application.visitScheduled && (
                  <span className="ml-3 text-sm font-normal text-gray-600">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {application.visitScheduled}
                  </span>
                )}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Strengths Observed</label>
                  <ul className="list-disc list-inside space-y-1 text-gray-900">
                    {application.visitReport.strengths?.map((strength, idx) => (
                      <li key={idx} className="text-sm">{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Areas of Concern</label>
                  <ul className="list-disc list-inside space-y-1 text-gray-900">
                    {application.visitReport.concerns?.map((concern, idx) => (
                      <li key={idx} className="text-sm">{concern}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Recommendations</label>
                  <ul className="list-disc list-inside space-y-1 text-gray-900">
                    {application.visitReport.recommendations?.map((rec, idx) => (
                      <li key={idx} className="text-sm">{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Submitted Documents</h2>
            <div className="space-y-2">
              {application.documents?.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center flex-1">
                    {doc.verified ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                    )}
                    <span className="text-gray-900 text-sm">{doc.name}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    <Eye className="w-4 h-4 inline mr-1" />
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Decision and Feedback */}
          {application.decision && (
            <div className={`card ${
              application.decision === 'accepted' ? 'bg-green-50 border border-green-200' :
              application.decision === 'rejected' ? 'bg-red-50 border border-red-200' :
              'bg-gray-50'
            }`}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Decision: <span className={`${
                  application.decision === 'accepted' ? 'text-green-600' :
                  application.decision === 'rejected' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {application.decision.toUpperCase()}
                </span>
              </h2>
              {application.feedback && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Feedback</label>
                  <p className="text-gray-900">{application.feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">Status</h3>
            <span className={`badge ${
              application.status === 'accepted' ? 'badge-success' :
              application.status === 'under-review' ? 'badge-warning' : 'badge-info'
            }`}>
              {application.status}
            </span>
            <p className="text-sm text-gray-600 mt-3">{application.stage}</p>
          </div>

          {/* Timeline */}
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                  <p className="text-xs text-gray-500">{application.submissionDate}</p>
                </div>
              </div>
              {application.visitDate && (
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Institutional Visit</p>
                    <p className="text-xs text-gray-500">{application.visitDate}</p>
                  </div>
                </div>
              )}
              {application.decisionDate && (
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Decision Made</p>
                    <p className="text-xs text-gray-500">{application.decisionDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-2">
              <button className="btn-outline w-full">Schedule Visit</button>
              <button className="btn-secondary w-full">Request More Info</button>
              <button className="btn-secondary w-full">Generate Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
