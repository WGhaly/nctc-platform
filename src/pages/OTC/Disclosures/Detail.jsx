import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, XCircle, AlertCircle, Calendar, User, FileText, MessageSquare, Paperclip, ExternalLink, Users, TrendingUp } from 'lucide-react';
import { detailedDisclosures } from '../../../mockData';

export default function DisclosureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find disclosure by ID
  const disclosure = detailedDisclosures.find(d => d.id === id) || detailedDisclosures[0];
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'intake': return 'badge-info';
      case 'evaluation': return 'badge-warning';
      case 'approved': return 'badge-success';
      case 'rejected': return 'badge-error';
      default: return 'badge-default';
    }
  };

  const getEvaluationStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'badge-info';
      case 'technical-complete': return 'badge-warning';
      case 'complete': return 'badge-success';
      default: return 'badge-default';
    }
  };

  // Calculate days remaining in 45-day process
  const calculateDaysRemaining = () => {
    const received = new Date(disclosure.timeline.received);
    const deadline = new Date(received);
    deadline.setDate(deadline.getDate() + 45);
    const today = new Date();
    const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return daysRemaining;
  };

  const daysRemaining = calculateDaysRemaining();
  const progressPercentage = Math.min(100, ((45 - daysRemaining) / 45) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/otc/disclosures')} className="btn-secondary mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Disclosures
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{disclosure.id}</h1>
              <span className={`badge ${getStatusBadge(disclosure.status)}`}>
                {disclosure.status.toUpperCase()}
              </span>
              <span className={`badge ${getEvaluationStatusBadge(disclosure.evaluationStatus)}`}>
                {disclosure.evaluationStatus.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl text-gray-700 mb-2">{disclosure.title}</h2>
            <p className="text-sm text-gray-500">Process Flow: OTC-FLOW-001 • 45-Day Evaluation</p>
          </div>
          
          <div className="flex gap-2">
            <button className="btn-secondary">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Meeting
            </button>
            <button className="btn-secondary">
              <ExternalLink className="w-5 h-5 mr-2" />
              Request External Evaluation
            </button>
            {disclosure.status === 'evaluation' && (
              <button className="btn-primary">
                Make Decision
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Progress */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">45-Day Evaluation Timeline</h3>
            <p className="text-sm text-gray-600 mt-1">
              {daysRemaining > 0 ? (
                <span className="text-blue-600 font-medium">{daysRemaining} days remaining</span>
              ) : (
                <span className="text-red-600 font-medium">Deadline passed {Math.abs(daysRemaining)} days ago</span>
              )}
            </p>
          </div>
          <Clock className={`w-6 h-6 ${daysRemaining > 7 ? 'text-green-600' : daysRemaining > 0 ? 'text-yellow-600' : 'text-red-600'}`} />
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full transition-all ${daysRemaining > 7 ? 'bg-green-500' : daysRemaining > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Timeline stages */}
        <div className="grid grid-cols-5 gap-2 text-xs">
          <div className={`text-center p-2 rounded-xl ${disclosure.timeline.received ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}>
            <CheckCircle2 className="w-4 h-4 mx-auto mb-1" />
            <div className="font-medium">Intake</div>
            <div>{disclosure.timeline.received || '-'}</div>
          </div>
          <div className={`text-center p-2 rounded-xl ${disclosure.timeline.acknowledged ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}>
            <CheckCircle2 className="w-4 h-4 mx-auto mb-1" />
            <div className="font-medium">Acknowledged</div>
            <div>{disclosure.timeline.acknowledged || '-'}</div>
          </div>
          <div className={`text-center p-2 rounded-xl ${disclosure.evaluationDetails?.technical?.date ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            <AlertCircle className="w-4 h-4 mx-auto mb-1" />
            <div className="font-medium">Technical Eval</div>
            <div>{disclosure.evaluationDetails?.technical?.date || 'Pending'}</div>
          </div>
          <div className={`text-center p-2 rounded-xl ${disclosure.evaluationDetails?.market?.date ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}>
            <AlertCircle className="w-4 h-4 mx-auto mb-1" />
            <div className="font-medium">Market/IP Eval</div>
            <div>{disclosure.evaluationDetails?.market?.date || '-'}</div>
          </div>
          <div className={`text-center p-2 rounded-xl ${disclosure.decision ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'}`}>
            {disclosure.decision ? <CheckCircle2 className="w-4 h-4 mx-auto mb-1" /> : <Clock className="w-4 h-4 mx-auto mb-1" />}
            <div className="font-medium">Decision</div>
            <div>{disclosure.timeline.decisionDate || 'Pending'}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Disclosure Information */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Disclosure Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="label">Title</label>
                <p className="text-gray-900">{disclosure.title}</p>
              </div>
              
              <div>
                <label className="label">Description</label>
                <p className="text-gray-700 leading-relaxed">{disclosure.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Submission Date</label>
                  <p className="text-gray-900">{new Date(disclosure.submissionDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="label">Cluster</label>
                  <span className="badge badge-info">{disclosure.cluster.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inventor Details */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Inventor Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                <User className="w-10 h-10 p-2 bg-blue-100 text-blue-600 rounded-full mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">{disclosure.inventor}</p>
                  <p className="text-sm text-gray-600">{disclosure.inventorEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Evaluation Results */}
          {disclosure.evaluationDetails && (
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Evaluation Results
              </h3>
              
              <div className="space-y-4">
                {/* Technical Evaluation */}
                {disclosure.evaluationDetails.technical && disclosure.evaluationDetails.technical.score && (
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Technical Evaluation</h4>
                      <span className="text-2xl font-bold text-blue-600">{disclosure.evaluationDetails.technical.score}/10</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Evaluator:</span> {disclosure.evaluationDetails.technical.evaluator}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Date:</span> {disclosure.evaluationDetails.technical.date}
                    </p>
                    {disclosure.evaluationDetails.technical.strengths && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Strengths:</p>
                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                          {disclosure.evaluationDetails.technical.strengths.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Recommendation:</span>{' '}
                      <span className="text-gray-600">{disclosure.evaluationDetails.technical.recommendation}</span>
                    </p>
                  </div>
                )}

                {/* Market Evaluation */}
                {disclosure.evaluationDetails.market && disclosure.evaluationDetails.market.score && (
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Market Evaluation</h4>
                      <span className="text-2xl font-bold text-green-600">{disclosure.evaluationDetails.market.score}/10</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Evaluator:</span> {disclosure.evaluationDetails.market.evaluator}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Recommendation:</span>{' '}
                      <span className="text-gray-600">{disclosure.evaluationDetails.market.recommendation}</span>
                    </p>
                  </div>
                )}

                {/* IP Evaluation */}
                {disclosure.evaluationDetails.ip && disclosure.evaluationDetails.ip.score && (
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">IP Evaluation</h4>
                      <span className="text-2xl font-bold text-purple-600">{disclosure.evaluationDetails.ip.score}/10</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Evaluator:</span> {disclosure.evaluationDetails.ip.evaluator}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">Recommendation:</span>{' '}
                      <span className="text-gray-600">{disclosure.evaluationDetails.ip.recommendation}</span>
                    </p>
                  </div>
                )}

                {/* Pending Evaluations */}
                {disclosure.evaluationDetails.market && disclosure.evaluationDetails.market.status === 'pending' && (
                  <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-4">
                    <p className="text-sm text-yellow-800">
                      <AlertCircle className="w-4 h-4 inline mr-2" />
                      Market evaluation pending • Due: {disclosure.evaluationDetails.market.dueDate}
                    </p>
                  </div>
                )}
              </div>

              {/* Final Decision */}
              {disclosure.decision && (
                <div className={`mt-4 p-4 rounded-xl border-2 ${
                  disclosure.decision === 'go' ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                }`}>
                  <div className="flex items-center">
                    {disclosure.decision === 'go' ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600 mr-3" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 mr-3" />
                    )}
                    <div>
                      <p className={`font-bold text-lg ${disclosure.decision === 'go' ? 'text-green-900' : 'text-red-900'}`}>
                        {disclosure.decision === 'go' ? 'GO - Proceed to Project' : 'NO-GO - Not Proceeding'}
                      </p>
                      <p className="text-sm text-gray-600">Decision date: {disclosure.timeline.decisionDate}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Comments & Notes */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
              Comments & Notes
            </h3>
            
            <div className="space-y-3 mb-4">
              {disclosure.meetings && disclosure.meetings.map((meeting, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-3 bg-gray-50">
                  <p className="text-sm font-medium text-gray-900 mb-1">{meeting.purpose}</p>
                  <p className="text-xs text-gray-600 mb-2">{meeting.date} • {meeting.participants.join(', ')}</p>
                  {meeting.outcome && <p className="text-sm text-gray-700">{meeting.outcome}</p>}
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="input flex-1"
              />
              <button className="btn-primary">Post</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Days in Process:</span>
                <span className="font-semibold">{45 - daysRemaining}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">OTC:</span>
                <span className="font-semibold">{disclosure.otcName}</span>
              </div>
              {disclosure.technicalScore && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Technical Score:</span>
                  <span className="font-semibold text-blue-600">{disclosure.technicalScore}/10</span>
                </div>
              )}
              {disclosure.commercialPathway && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Pathway:</span>
                  <span className="badge badge-success text-xs">{disclosure.commercialPathway}</span>
                </div>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Paperclip className="w-5 h-5 mr-2 text-blue-600" />
              Attachments
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-xl text-sm hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-gray-600 mr-2" />
                  <span>disclosure-form.pdf</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-xl text-sm hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-gray-600 mr-2" />
                  <span>technical-specs.pdf</span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <button className="btn-secondary w-full mt-3">
              <Paperclip className="w-4 h-4 mr-2" />
              Add Document
            </button>
          </div>

          {/* Actions */}
          <div className="card bg-blue-50 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
            <div className="space-y-2">
              <Link to={`/otc/disclosures/${disclosure.id}/evaluate`} className="btn-primary w-full">
                Evaluate Disclosure
              </Link>
              <button className="btn-secondary w-full">
                Generate Report
              </button>
              <button className="btn-secondary w-full">
                Export Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
