import { Link } from 'react-router-dom';
import { Plus, Users, Target, DollarSign, Calendar, AlertCircle, CheckCircle2, Info, FileText } from 'lucide-react';
import { collaborationAgreements } from '../../../mockData';
import { handleProposeCollaboration } from '../../../utils/quickActions';

export default function CollaborationHub() {
  const totalCollaborations = collaborationAgreements.length;
  const activeCollaborations = collaborationAgreements.filter(c => c.status === 'active').length;
  const totalBudget = collaborationAgreements.reduce((sum, c) => sum + c.budget.total, 0);
  const collaborationsWithConflicts = collaborationAgreements.filter(c => c.conflicts.length > 0).length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'completed': return 'badge-info';
      case 'on-hold': return 'badge-warning';
      default: return 'badge-default';
    }
  };

  const getMilestoneBadge = (status) => {
    switch (status) {
      case 'completed': return 'badge-success';
      case 'in-progress': return 'badge-info';
      case 'not-started': return 'badge-default';
      default: return 'badge-default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Multi-OTC Collaboration Hub</h1>
          <p className="text-gray-600">Joint Projects & Partnerships (COLLAB-FLOW-001, 002)</p>
        </div>
        <button 
          className="btn btn-primary flex items-center gap-2"
          onClick={handleProposeCollaboration}
        >
          <Plus className="w-5 h-5" />
          Propose Collaboration
        </button>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Multi-OTC Collaboration Process</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Initiation:</span> OTC proposes collaboration, identifies partners &rarr; 
              <span className="font-medium"> MOA Negotiation:</span> IP ownership, revenue sharing, decision-making &rarr; 
              <span className="font-medium"> Lead OTC:</span> Project coordination, reporting, conflict resolution &rarr; 
              <span className="font-medium"> NCTC Mediation:</span> Escalate unresolved conflicts for arbitration
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Collaborations</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{activeCollaborations}</p>
              <p className="text-xs text-gray-500 mt-1">of {totalCollaborations} total</p>
            </div>
            <Users className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{(totalBudget/1000000).toFixed(1)}M</p>
              <p className="text-xs text-gray-500 mt-1">EGP across all projects</p>
            </div>
            <DollarSign className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Milestones Complete</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {collaborationAgreements.reduce((sum, c) => 
                  sum + c.milestones.filter(m => m.status === 'completed').length, 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Across all projects</p>
            </div>
            <Target className="w-10 h-10 text-purple-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Conflicts</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{collaborationsWithConflicts}</p>
              <p className="text-xs text-gray-500 mt-1">Requiring attention</p>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Collaboration Projects */}
      <div className="space-y-4">
        {collaborationAgreements.map(collab => (
          <div key={collab.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{collab.title}</h3>
                  <span className={`badge ${getStatusBadge(collab.status)}`}>
                    {collab.status}
                  </span>
                  {collab.conflicts.length > 0 && (
                    <span className="badge badge-warning">
                      {collab.conflicts.length} conflict(s)
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{collab.id}</p>
                <p className="text-sm text-gray-700">{collab.description}</p>
              </div>
            </div>

            {/* Lead & Partners */}
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-2">Lead OTC</p>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{collab.leadOTCName}</p>
                      <p className="text-xs text-gray-600">Coordinator: {collab.leadCoordinator}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-2">Participating OTCs ({collab.participatingOTCs.length})</p>
                  <div className="space-y-1">
                    {collab.participatingOTCs.map((otc, idx) => (
                      <div key={idx} className="text-xs text-gray-700">
                        • {otc.otcName} - {otc.role}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline & Budget */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-start">
                <Calendar className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-medium text-gray-900">{collab.startDate} to {collab.endDate}</p>
                  <p className="text-xs text-gray-600">{collab.expectedDuration}</p>
                </div>
              </div>
              <div className="flex items-start">
                <DollarSign className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Total Budget</p>
                  <p className="text-sm font-medium text-gray-900">
                    {collab.budget.total.toLocaleString()} {collab.budget.currency}
                  </p>
                  <p className="text-xs text-gray-600">{collab.fundingModel}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">MOA Status</p>
                  <p className="text-sm font-medium text-green-600 capitalize">{collab.moaStatus}</p>
                  <p className="text-xs text-gray-600">{collab.moaDate}</p>
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Milestones ({collab.milestones.length})</p>
              <div className="space-y-2">
                {collab.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{milestone.milestone}</p>
                      <p className="text-xs text-gray-600">Deadline: {milestone.deadline}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {milestone.completionDate && (
                        <p className="text-xs text-green-600">Completed: {milestone.completionDate}</p>
                      )}
                      <span className={`badge ${getMilestoneBadge(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conflicts (if any) */}
            {collab.conflicts.length > 0 && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-semibold text-yellow-900 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Conflicts Requiring Resolution
                </p>
                {collab.conflicts.map((conflict, idx) => (
                  <div key={idx} className="mb-2 last:mb-0">
                    <p className="text-sm text-gray-900 font-medium">{conflict.issue}</p>
                    <p className="text-xs text-gray-700 mt-1">{conflict.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`badge ${conflict.status === 'resolved' ? 'badge-success' : 'badge-warning'}`}>
                        {conflict.status}
                      </span>
                      {conflict.resolution && (
                        <p className="text-xs text-gray-600">Resolution: {conflict.resolution}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* IP & Commercialization */}
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium text-gray-700 mb-1">IP Ownership</p>
                <p className="text-gray-600">{collab.ipOwnership}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="font-medium text-gray-700 mb-1">Revenue Sharing</p>
                <p className="text-gray-600">{collab.revenueSharing}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
              <button className="btn-outline text-sm">View Details</button>
              <button className="btn-outline text-sm">Meeting Minutes</button>
              <button className="btn-outline text-sm">Documents</button>
              {collab.conflicts.length > 0 && (
                <button className="btn-primary text-sm">Escalate to NCTC</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Decision Points */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Decision Points (COLLAB-FLOW-001, 002)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D1:</span>
            <span className="text-gray-600">Lead OTC resolves conflict within 30 days? (Yes &rarr; Continue project / No &rarr; Escalate to NCTC mediation)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D2:</span>
            <span className="text-gray-600">NCTC mediation successful? (Yes &rarr; Resume project / No &rarr; Project suspension or termination)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
