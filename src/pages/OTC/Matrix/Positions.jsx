import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Info, TrendingUp, Award, Calendar, AlertTriangle, CheckCircle2, Minus } from 'lucide-react';
import { clusters, pillars, otcs } from '../../../mockData';

export default function MatrixPositions() {
  const [showExpansionForm, setShowExpansionForm] = useState(false);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Mock current OTC data
  const currentOTC = otcs[0]; // Cairo University TTO
  
  // Mock matrix position assignments
  const matrixPositions = [
    { 
      id: 1, 
      cluster: 'eng', 
      pillar: 'academic', 
      otcId: '1', 
      otcName: 'Cairo University TTO',
      assignedDate: '2023-01-15',
      capabilityScore: 8.5,
      performanceMetrics: {
        disclosures: 12,
        projects: 5,
        collaborations: 8
      }
    },
    { 
      id: 2, 
      cluster: 'eng', 
      pillar: 'lab', 
      otcId: '1', 
      otcName: 'Cairo University TTO',
      assignedDate: '2023-01-15',
      capabilityScore: 7.8,
      performanceMetrics: {
        disclosures: 8,
        projects: 3,
        collaborations: 6
      }
    },
    { 
      id: 3, 
      cluster: 'ict', 
      pillar: 'academic', 
      otcId: '1', 
      otcName: 'Cairo University TTO',
      assignedDate: '2023-06-10',
      capabilityScore: 9.0,
      performanceMetrics: {
        disclosures: 15,
        projects: 7,
        collaborations: 10
      }
    },
    { 
      id: 4, 
      cluster: 'ict', 
      pillar: 'commercial', 
      otcId: '3', 
      otcName: 'Ain Shams Innovation Hub',
      assignedDate: '2023-03-10',
      capabilityScore: 8.2,
      performanceMetrics: {
        disclosures: 10,
        projects: 4,
        collaborations: 7
      }
    },
    { 
      id: 5, 
      cluster: 'life', 
      pillar: 'academic', 
      otcId: '2', 
      otcName: 'Alexandria University OTC',
      assignedDate: '2023-02-01',
      capabilityScore: 8.8,
      performanceMetrics: {
        disclosures: 14,
        projects: 6,
        collaborations: 9
      }
    },
    { 
      id: 6, 
      cluster: 'life', 
      pillar: 'lab', 
      otcId: '2', 
      otcName: 'Alexandria University OTC',
      assignedDate: '2023-02-01',
      capabilityScore: 7.5,
      performanceMetrics: {
        disclosures: 9,
        projects: 3,
        collaborations: 5
      }
    },
    { 
      id: 7, 
      cluster: 'health', 
      pillar: 'academic', 
      otcId: '5', 
      otcName: 'Mansoura University Innovation Office',
      assignedDate: '2023-01-25',
      capabilityScore: 9.2,
      performanceMetrics: {
        disclosures: 16,
        projects: 8,
        collaborations: 11
      }
    },
  ];

  // Current OTC positions
  const myPositions = matrixPositions.filter(p => p.otcId === currentOTC.id);
  const otherPositions = matrixPositions.filter(p => p.otcId !== currentOTC.id);

  // Get position for a cluster-pillar combo
  const getPosition = (clusterId, pillarId) => {
    return matrixPositions.find(p => p.cluster === clusterId && p.pillar === pillarId);
  };

  // Position timeline
  const positionHistory = [
    { date: '2023-01-15', event: 'Initial Assignment', positions: 'Engineering (Academic, Lab)' },
    { date: '2023-06-10', event: 'Expansion Approved', positions: 'ICT (Academic)' },
    { date: '2024-03-20', event: 'Capability Assessment', score: 8.4 },
    { date: '2024-09-15', event: 'Capability Assessment', score: 8.7 },
  ];

  const handleExpansionRequest = () => {
    setShowExpansionForm(true);
  };

  const handleAssessment = (position) => {
    setSelectedPosition(position);
    setShowAssessmentForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Matrix Positions</h1>
          <p className="text-gray-600">Your assigned cluster and pillar positions (NCTC-FLOW-002)</p>
        </div>
        <button onClick={handleExpansionRequest} className="btn-primary rounded-xl">
          <Plus className="w-5 h-5 mr-2" />
          Request Expansion
        </button>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Matrix Position Requirements</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Minimum:</span> Each OTC must hold at least 1 cluster + 1 pillar position &rarr; 
              <span className="font-medium"> Assessment:</span> Quarterly capability self-assessments required &rarr; 
              <span className="font-medium"> Expansion:</span> Request additional positions with justification based on demonstrated capability
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Positions</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{myPositions.length}</p>
              <p className="text-xs text-gray-500 mt-1">Out of 36 total</p>
            </div>
            <Award className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Capability</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {(myPositions.reduce((sum, p) => sum + p.capabilityScore, 0) / myPositions.length).toFixed(1)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Out of 10.0</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Clusters Covered</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {new Set(myPositions.map(p => p.cluster)).size}
              </p>
              <p className="text-xs text-gray-500 mt-1">Of 6 total</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-purple-600" />
          </div>
        </div>
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Assessment</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">15</p>
              <p className="text-xs text-gray-500 mt-1">Days remaining</p>
            </div>
            <Calendar className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* 6x6 Matrix Visualization */}
      <div className="card rounded-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">36-Position Matrix Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-3 bg-gray-100 text-sm font-medium text-gray-700">
                  Cluster / Pillar
                </th>
                {pillars.map(pillar => (
                  <th key={pillar.id} className="border border-gray-300 p-3 bg-gray-100 text-xs font-medium text-gray-700">
                    {pillar.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clusters.map(cluster => (
                <tr key={cluster.id}>
                  <td className="border border-gray-300 p-3 bg-gray-50 font-medium text-sm text-gray-700">
                    {cluster.name}
                  </td>
                  {pillars.map(pillar => {
                    const position = getPosition(cluster.id, pillar.id);
                    const isMyPosition = position && position.otcId === currentOTC.id;
                    const isEmpty = !position;
                    
                    return (
                      <td 
                        key={`${cluster.id}-${pillar.id}`}
                        className={`border border-gray-300 p-2 text-center text-xs ${
                          isMyPosition 
                            ? 'bg-green-100 hover:bg-green-200 cursor-pointer' 
                            : isEmpty 
                            ? 'bg-yellow-50 hover:bg-yellow-100' 
                            : 'bg-blue-50 hover:bg-blue-100'
                        }`}
                        onClick={() => isMyPosition && handleAssessment(position)}
                      >
                        {isEmpty ? (
                          <div className="flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          </div>
                        ) : (
                          <div>
                            <div className="font-semibold text-gray-900">
                              {isMyPosition ? 'YOU' : position.otcName.split(' ')[0]}
                            </div>
                            {isMyPosition && (
                              <div className="text-xs text-gray-600 mt-1">
                                Score: {position.capabilityScore}
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-gray-300 rounded"></div>
              <span className="text-gray-600">Your Positions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-50 border border-gray-300 rounded"></div>
              <span className="text-gray-600">Other OTCs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-50 border border-gray-300 rounded"></div>
              <span className="text-gray-600">Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* My Position Cards */}
      <div className="card rounded-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Position Details</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myPositions.map(position => {
            const cluster = clusters.find(c => c.id === position.cluster);
            const pillar = pillars.find(p => p.id === position.pillar);
            
            return (
              <div key={position.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cluster?.name}</h3>
                    <p className="text-sm text-gray-600">{pillar?.name}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    position.capabilityScore >= 8.5 ? 'bg-green-100 text-green-800' :
                    position.capabilityScore >= 7.0 ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {position.capabilityScore.toFixed(1)}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned:</span>
                    <span className="font-medium text-gray-900">{position.assignedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Disclosures:</span>
                    <span className="font-medium text-gray-900">{position.performanceMetrics.disclosures}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projects:</span>
                    <span className="font-medium text-gray-900">{position.performanceMetrics.projects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Collaborations:</span>
                    <span className="font-medium text-gray-900">{position.performanceMetrics.collaborations}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleAssessment(position)}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Update Assessment
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Position Assignment Timeline */}
      <div className="card rounded-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Position Assignment History</h2>
        <div className="space-y-4">
          {positionHistory.map((entry, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
              <div className="flex-shrink-0 w-24 text-sm text-gray-500">{entry.date}</div>
              <div className="flex-shrink-0">
                <div className="w-3 h-3 bg-blue-600 rounded-full mt-1"></div>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{entry.event}</div>
                {entry.positions && (
                  <div className="text-sm text-gray-600 mt-1">{entry.positions}</div>
                )}
                {entry.score && (
                  <div className="text-sm text-gray-600 mt-1">Capability Score: {entry.score}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expansion Request Modal */}
      {showExpansionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Position Expansion</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requested Cluster
                  </label>
                  <select className="input rounded-xl w-full">
                    <option value="">Select cluster...</option>
                    {clusters.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requested Pillar
                  </label>
                  <select className="input rounded-xl w-full">
                    <option value="">Select pillar...</option>
                    {pillars.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Justification
                  </label>
                  <textarea 
                    className="input rounded-xl w-full h-32"
                    placeholder="Explain your capability and readiness for this position..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Evidence
                  </label>
                  <textarea 
                    className="input rounded-xl w-full h-24"
                    placeholder="List relevant resources, expertise, past performance..."
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowExpansionForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Form Modal */}
      {showAssessmentForm && selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Capability Self-Assessment</h2>
              <p className="text-gray-600 mb-6">
                {clusters.find(c => c.id === selectedPosition.cluster)?.name} - {' '}
                {pillars.find(p => p.id === selectedPosition.pillar)?.name}
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Capability (1-10)
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    step="0.1"
                    defaultValue={selectedPosition.capabilityScore}
                    className="input rounded-xl w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technical Resources
                  </label>
                  <input type="number" min="1" max="10" step="0.1" className="input rounded-xl w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Staff Expertise
                  </label>
                  <input type="number" min="1" max="10" step="0.1" className="input rounded-xl w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Network Strength
                  </label>
                  <input type="number" min="1" max="10" step="0.1" className="input rounded-xl w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes / Improvements
                  </label>
                  <textarea 
                    className="input rounded-xl w-full h-24"
                    placeholder="What improvements have been made? What challenges remain?"
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAssessmentForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Submit Assessment
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
