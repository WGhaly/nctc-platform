import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, FolderKanban, AlertTriangle, Calendar, FileText, TrendingUp, Mail, Phone, DollarSign, Award } from 'lucide-react';
import { clusters, otcs } from '../../../mockData';
import Modal from '../../../components/Modal';
import SchedulerModal from '../../../components/SchedulerModal';
import ReportGeneratorModal from '../../../components/ReportGeneratorModal';
import toast from '../../../utils/toast';

export default function ClusterManagement() {
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [showScheduleMeeting, setShowScheduleMeeting] = useState(false);
  const [showAssignCC, setShowAssignCC] = useState(false);
  const [showClusterMeeting, setShowClusterMeeting] = useState(false);
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const [selectedClusterForAction, setSelectedClusterForAction] = useState(null);

  // Get cluster coordinators
  const clusterCoordinators = clusters.map(cluster => {
    const coordinator = otcs.find(otc => otc.isClusterCoordinator && otc.coordinatorFor === cluster.id);
    const memberOTCs = otcs.filter(otc => otc.clusters.includes(cluster.id));
    const totalProjects = memberOTCs.reduce((sum, otc) => sum + (otc.kpis?.disclosures || 0), 0);
    const totalFunding = memberOTCs.reduce((sum, otc) => sum + (otc.fundingReceived || 0), 0);
    
    // Calculate gaps for this cluster
    const gaps = memberOTCs.filter(otc => otc.performance === 'needs-improvement' || otc.performance === 'underperforming').length;
    
    return {
      ...cluster,
      coordinator: coordinator || null,
      memberCount: memberOTCs.length,
      activeProjects: totalProjects,
      gaps,
      totalFunding,
      members: memberOTCs
    };
  });

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900',
      green: 'bg-green-50 border-green-200 text-green-900',
      red: 'bg-red-50 border-red-200 text-red-900',
      pink: 'bg-pink-50 border-pink-200 text-pink-900',
      teal: 'bg-teal-50 border-teal-200 text-teal-900'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cluster Management</h1>
          <p className="text-gray-600">Oversee innovation cluster operations and coordination (CC-FLOW-001-005)</p>
        </div>
        <button onClick={() => setShowScheduleMeeting(true)} className="btn btn-primary flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Schedule Meeting
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">6</span>
          </div>
          <p className="text-sm text-gray-600">Active Clusters</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{otcs.length}</span>
          </div>
          <p className="text-sm text-gray-600">Member OTCs</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <FolderKanban className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">342</span>
          </div>
          <p className="text-sm text-gray-600">Active Projects</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <p className="text-sm text-gray-600">Identified Gaps</p>
        </div>
      </div>

      {/* Cluster Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {clusterCoordinators.map((cluster) => (
          <div key={cluster.id} className={`border-2 rounded-xl p-6 ${getColorClasses(cluster.color)}`}>
            {/* Cluster Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{cluster.name}</h3>
                <span className="px-3 py-1 bg-white rounded-lg text-sm font-medium">
                  {cluster.memberCount} OTCs
                </span>
              </div>
            </div>

            {/* Coordinator Info */}
            <div className="bg-white bg-opacity-70 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-700">Cluster Coordinator</p>
                {!cluster.coordinator && (
                  <button 
                    onClick={() => {
                      setSelectedClusterForAction(cluster);
                      setShowAssignCC(true);
                    }}
                    className="text-xs px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Assign CC
                  </button>
                )}
              </div>
              {cluster.coordinator ? (
                <div>
                  <p className="font-semibold text-gray-900">{cluster.coordinator.name}</p>
                  <p className="text-sm text-gray-600">{cluster.coordinator.institution}</p>
                  <p className="text-sm text-gray-600">Dir: {cluster.coordinator.director}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {cluster.coordinator.email}
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Enhanced Funding:</span>
                      <span className="font-semibold text-green-700">
                        EGP {(cluster.coordinator.fundingReceived * 1.2).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No coordinator assigned</p>
              )}
            </div>

            {/* Cluster Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{cluster.activeProjects}</div>
                <div className="text-xs text-gray-600">Projects</div>
              </div>
              <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{cluster.gaps}</div>
                <div className="text-xs text-gray-600">Gaps</div>
              </div>
              <div className="bg-white bg-opacity-70 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{cluster.memberCount}</div>
                <div className="text-xs text-gray-600">Members</div>
              </div>
            </div>

            {/* Performance Dashboard */}
            <div className="bg-white bg-opacity-70 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-gray-700" />
                <p className="text-sm font-semibold text-gray-700">Performance Overview</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Total Funding Allocated</span>
                  <span className="font-semibold">EGP {cluster.totalFunding.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Avg Performance</span>
                  <span className="font-semibold text-green-700">85%</span>
                </div>
              </div>
            </div>

            {/* Member OTCs */}
            <button
              onClick={() => setSelectedCluster(selectedCluster === cluster.id ? null : cluster.id)}
              className="w-full bg-white bg-opacity-70 rounded-lg px-4 py-2 text-sm font-medium hover:bg-opacity-100 transition-all mb-4"
            >
              {selectedCluster === cluster.id ? 'Hide' : 'View'} Member OTCs ({cluster.memberCount})
            </button>

            {selectedCluster === cluster.id && (
              <div className="bg-white rounded-xl p-4 mb-4 space-y-2">
                {cluster.members.map(otc => (
                  <div key={otc.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{otc.name}</p>
                      <p className="text-xs text-gray-600">{otc.director}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-lg ${
                        otc.performance === 'exceeds' ? 'bg-green-100 text-green-800' :
                        otc.performance === 'meets' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {otc.performance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setSelectedClusterForAction(cluster);
                  setShowClusterMeeting(true);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Convene Meeting
              </button>
              <button 
                onClick={() => {
                  setSelectedClusterForAction(cluster);
                  setShowReportGenerator(true);
                }}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 text-sm flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule General Meeting Modal */}
      <SchedulerModal
        isOpen={showScheduleMeeting}
        onClose={() => setShowScheduleMeeting(false)}
        title="Schedule Cluster Coordination Meeting"
        eventType="meeting"
      />

      {/* Cluster-Specific Meeting Modal */}
      {selectedClusterForAction && (
        <SchedulerModal
          isOpen={showClusterMeeting}
          onClose={() => setShowClusterMeeting(false)}
          title={`Convene ${selectedClusterForAction.name} Meeting`}
          eventType="meeting"
        />
      )}

      {/* Assign Cluster Coordinator Modal */}
      {selectedClusterForAction && (
        <Modal isOpen={showAssignCC} onClose={() => setShowAssignCC(false)} title="Assign Cluster Coordinator" size="md">
          <form onSubmit={(e) => {
            e.preventDefault();
            toast.info('Assigning cluster coordinator...');
            setTimeout(() => {
              toast.success(`Cluster coordinator assigned to ${selectedClusterForAction.name}!`);
              setShowAssignCC(false);
            }, 1000);
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cluster</label>
              <input
                type="text"
                value={selectedClusterForAction.name}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select OTC as Coordinator</label>
              <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Choose OTC</option>
                {otcs.filter(otc => otc.clusters.includes(selectedClusterForAction.id)).map(otc => (
                  <option key={otc.id} value={otc.id}>{otc.name} - {otc.institution}</option>
                ))}
              </select>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                <strong>Benefits:</strong> Cluster coordinators receive 20% enhanced funding and lead coordination activities.
              </p>
            </div>
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button type="button" onClick={() => setShowAssignCC(false)} className="btn-outline px-4 py-2">
                Cancel
              </button>
              <button type="submit" className="btn-primary px-4 py-2">
                Assign Coordinator
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Cluster Report Generator */}
      {selectedClusterForAction && (
        <ReportGeneratorModal
          isOpen={showReportGenerator}
          onClose={() => setShowReportGenerator(false)}
          reportTypes={[
            {id: 'cluster-performance', name: `${selectedClusterForAction.name} Performance Report`},
            {id: 'cluster-gaps', name: `${selectedClusterForAction.name} Gap Analysis`},
            {id: 'cluster-funding', name: `${selectedClusterForAction.name} Funding Report`}
          ]}
          context="cluster"
        />
      )}
    </div>
  );
}
