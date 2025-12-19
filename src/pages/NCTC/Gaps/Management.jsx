import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, AlertTriangle, CheckCircle2, Clock, TrendingUp, Info, Target, Users, Wrench } from 'lucide-react';
import { gapRegister, clusters, pillars } from '../../../mockData';
import Modal from '../../../components/Modal';
import ConfirmDialog from '../../../components/ConfirmDialog';
import toast from '../../../utils/toast';

export default function GapManagement() {
  const [showRegisterGap, setShowRegisterGap] = useState(false);
  const [showUpdateProgress, setShowUpdateProgress] = useState(false);
  const [showAddAction, setShowAddAction] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [selectedGap, setSelectedGap] = useState(null);
  // Calculate statistics
  const totalGaps = gapRegister.length;
  const activeGaps = gapRegister.filter(g => g.status === 'active').length;
  const improvingGaps = gapRegister.filter(g => g.status === 'improving').length;
  const highPriority = gapRegister.filter(g => g.priority === 'high').length;
  
  // Calculate average progress for active gaps
  const activeGapsWithActions = gapRegister.filter(g => g.status === 'active');
  const totalProgress = activeGapsWithActions.reduce((sum, gap) => {
    const avgProgress = gap.supportActions.reduce((s, a, _, arr) => s + a.progress / arr.length, 0);
    return sum + avgProgress;
  }, 0);
  const avgProgress = activeGapsWithActions.length > 0 ? Math.round(totalProgress / activeGapsWithActions.length) : 0;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'badge-error';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-info';
      default: return 'badge-default';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return 'badge-warning';
      case 'improving': return 'badge-info';
      case 'closed': return 'badge-success';
      default: return 'badge-default';
    }
  };

  const getActionStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'planned': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gap Identification & Management</h1>
          <p className="text-gray-600">Matrix Coverage Gap Analysis & Support (NCTC-FLOW-006)</p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => setShowRegisterGap(true)}
        >
          <Plus className="w-5 h-5" />
          Register New Gap
        </button>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Gap Management Process</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Identification:</span> Monthly matrix analysis + Quarterly CC reports &rarr; 
              <span className="font-medium"> Prioritization:</span> Impact assessment (High/Medium/Low) &rarr; 
              <span className="font-medium"> Support Actions:</span> Training, resources, mentoring, external expertise &rarr; 
              <span className="font-medium"> Monitoring:</span> Track progress, adjust support, close when gap filled
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Gaps</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalGaps}</p>
              <p className="text-xs text-gray-500 mt-1">{activeGaps} active</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-gray-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{highPriority}</p>
              <p className="text-xs text-gray-500 mt-1">Need urgent attention</p>
            </div>
            <Target className="w-10 h-10 text-red-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Improving</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{improvingGaps}</p>
              <p className="text-xs text-gray-500 mt-1">Support in progress</p>
            </div>
            <TrendingUp className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Progress</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{avgProgress}%</p>
              <p className="text-xs text-gray-500 mt-1">Active gaps</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-600" />
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
                placeholder="Search gaps..."
                className="input pl-10 w-full"
              />
            </div>
          </div>
          <select className="input">
            <option value="">All Clusters</option>
            {clusters.map(cluster => (
              <option key={cluster.id} value={cluster.id}>{cluster.name.split(' ')[0]}</option>
            ))}
          </select>
          <select className="input">
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select className="input">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="improving">Improving</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Gap Register */}
      <div className="space-y-4">
        {gapRegister.map(gap => (
          <div key={gap.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {gap.clusterName.split(' ')[0]} / {gap.pillarName}
                  </h3>
                  <span className={`badge ${getPriorityBadge(gap.priority)}`}>
                    {gap.priority} priority
                  </span>
                  <span className={`badge ${getStatusBadge(gap.status)}`}>
                    {gap.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{gap.id} • Identified: {gap.identifiedDate}</p>
                <p className="text-xs text-gray-500">Source: {gap.source}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Target Closure</p>
                <p className="text-sm text-gray-600">{gap.targetClosureDate}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
              <p className="text-sm text-gray-900 mb-3">{gap.description}</p>
              <p className="text-sm font-medium text-gray-700 mb-1">Impact</p>
              <p className="text-sm text-gray-900">{gap.impact}</p>
            </div>

            {/* Current & Potential OTCs */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Current OTCs</p>
                {gap.currentOTCs.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {gap.currentOTCs.map(otcId => (
                      <span key={otcId} className="badge badge-info">{otcId}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No OTCs currently assigned</p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Potential OTCs</p>
                {gap.potentialOTCs.length > 0 ? (
                  <div className="space-y-1">
                    {gap.potentialOTCNames.map((name, idx) => (
                      <div key={idx} className="text-sm text-gray-900">
                        <Users className="w-3 h-3 inline mr-1" />
                        {name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Identifying potential OTCs</p>
                )}
              </div>
            </div>

            {/* Support Actions */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Wrench className="w-4 h-4 mr-2" />
                Support Actions ({gap.supportActions.length})
              </p>
              <div className="space-y-3">
                {gap.supportActions.map((action, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{action.action}</span>
                          <span className={`text-xs font-medium ${getActionStatusColor(action.status)}`}>
                            {action.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm font-medium text-gray-900">{action.progress}%</p>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${action.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Assigned: {action.assignedTo}</span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Due: {action.deadline}
                      </span>
                    </div>
                    {action.completedDate && (
                      <div className="mt-1 text-xs text-green-600 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Completed: {action.completedDate}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Coordinator */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Cluster Coordinator:</span> {gap.clusterCoordinator}
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  setSelectedGap(gap);
                  setShowUpdateProgress(true);
                }} className="btn-outline text-sm">Update Progress</button>
                <button onClick={() => {
                  setSelectedGap(gap);
                  setShowAddAction(true);
                }} className="btn-outline text-sm">Add Action</button>
                {gap.status === 'improving' && (
                  <button onClick={() => {
                    setSelectedGap(gap);
                    setShowCloseConfirm(true);
                  }} className="btn-primary text-sm">Close Gap</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decision Points */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Decision Points (NCTC-FLOW-006)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D1:</span>
            <span className="text-gray-600">Gap identified with high impact? (Yes &rarr; Priority = High + immediate support actions / Medium/Low &rarr; Regular support schedule)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D2:</span>
            <span className="text-gray-600">Support actions successful? (Yes &rarr; Close gap / No &rarr; Escalate + revise support plan)</span>
          </div>
        </div>
      </div>

      {/* Register New Gap Modal */}
      <Modal isOpen={showRegisterGap} onClose={() => setShowRegisterGap(false)} title="Register New Gap" size="md">
        <form onSubmit={(e) => {
          e.preventDefault();
          toast.info('Registering gap...');
          setTimeout(() => {
            toast.success('Gap registered successfully!');
            setShowRegisterGap(false);
          }, 1000);
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gap Title</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the gap"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cluster</label>
            <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Select Cluster</option>
              {clusters.map(cluster => (
                <option key={cluster.id} value={cluster.id}>{cluster.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pillar</label>
            <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Select Pillar</option>
              {pillars.map(pillar => (
                <option key={pillar.id} value={pillar.id}>{pillar.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Select Priority</option>
              <option value="high">High - Urgent attention needed</option>
              <option value="medium">Medium - Standard timeline</option>
              <option value="low">Low - Can be addressed later</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows="3"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed description of the gap and its impact"
            />
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button type="button" onClick={() => setShowRegisterGap(false)} className="btn-outline px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-4 py-2">
              Register Gap
            </button>
          </div>
        </form>
      </Modal>

      {/* Update Progress Modal */}
      {selectedGap && (
        <Modal isOpen={showUpdateProgress} onClose={() => setShowUpdateProgress(false)} title="Update Gap Progress" size="md">
          <form onSubmit={(e) => {
            e.preventDefault();
            toast.info('Updating progress...');
            setTimeout(() => {
              toast.success('Progress updated successfully!');
              setShowUpdateProgress(false);
            }, 1000);
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gap</label>
              <input
                type="text"
                value={selectedGap.title}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overall Progress (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Update Notes</label>
              <textarea
                rows="3"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the progress made and any challenges"
              />
            </div>
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button type="button" onClick={() => setShowUpdateProgress(false)} className="btn-outline px-4 py-2">
                Cancel
              </button>
              <button type="submit" className="btn-primary px-4 py-2">
                Update Progress
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Action Modal */}
      {selectedGap && (
        <Modal isOpen={showAddAction} onClose={() => setShowAddAction(false)} title="Add Remediation Action" size="md">
          <form onSubmit={(e) => {
            e.preventDefault();
            toast.info('Adding action...');
            setTimeout(() => {
              toast.success('Action added successfully!');
              setShowAddAction(false);
            }, 1000);
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gap</label>
              <input
                type="text"
                value={selectedGap.title}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action Title</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the action"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
              <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Type</option>
                <option value="training">Training</option>
                <option value="resources">Resources Provision</option>
                <option value="mentoring">Mentoring</option>
                <option value="external">External Expertise</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows="3"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed description of the action"
              />
            </div>
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button type="button" onClick={() => setShowAddAction(false)} className="btn-outline px-4 py-2">
                Cancel
              </button>
              <button type="submit" className="btn-primary px-4 py-2">
                Add Action
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Close Gap Confirmation */}
      {selectedGap && (
        <ConfirmDialog
          isOpen={showCloseConfirm}
          onClose={() => setShowCloseConfirm(false)}
          onConfirm={() => {
            toast.info('Closing gap...');
            setTimeout(() => {
              toast.success(`Gap "${selectedGap.title}" marked as closed!`);
              setShowCloseConfirm(false);
            }, 1000);
          }}
          title="Close Gap"
          message={`Are you sure you want to close the gap "${selectedGap.title}"? This indicates that the gap has been successfully filled and verified.`}
          confirmText="Close Gap"
          type="success"
        />
      )}
    </div>
  );
}
