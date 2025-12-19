import { Link } from 'react-router-dom';
import { Plus, Search, CheckCircle2, AlertCircle, XCircle, Clock, Info } from 'lucide-react';
import { matrixPositions, clusters, pillars, otcs, expansionRequests } from '../../../mockData';

export default function MatrixAssignments() {
  // Calculate statistics
  const totalPositions = clusters.length * pillars.length; // 6 × 6 = 36
  const filledPositions = Object.values(matrixPositions).reduce((total, clusterData) => {
    return total + Object.values(clusterData).filter(pos => pos.otcs.length > 0).length;
  }, 0);
  const gapPositions = Object.values(matrixPositions).reduce((total, clusterData) => {
    return total + Object.values(clusterData).filter(pos => pos.gap).length;
  }, 0);
  const wellCovered = Object.values(matrixPositions).reduce((total, clusterData) => {
    return total + Object.values(clusterData).filter(pos => pos.coverage === 'good').length;
  }, 0);

  const getCoverageColor = (coverage) => {
    switch (coverage) {
      case 'good': return 'bg-green-100 border-green-300 text-green-800';
      case 'moderate': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'weak': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'none': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getCoverageIcon = (coverage) => {
    switch (coverage) {
      case 'good': return <CheckCircle2 className="w-4 h-4" />;
      case 'moderate': return <Clock className="w-4 h-4" />;
      case 'weak': return <AlertCircle className="w-4 h-4" />;
      case 'none': return <XCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getOTCName = (otcId) => {
    const otc = otcs.find(o => o.id === otcId);
    return otc ? otc.name : 'Unknown OTC';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Matrix Position Assignments</h1>
        <p className="text-gray-600">6 Clusters × 6 Pillars Matrix Management (NCTC-FLOW-002)</p>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Matrix Position Management Process</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Initial Assignment:</span> At OTC acceptance based on capability assessment (min 1 cluster + 1 pillar) &rarr; 
              <span className="font-medium"> Expansion:</span> Quarterly review of OTC requests &rarr; 
              <span className="font-medium"> Annual Review:</span> Add positions where capabilities grown, remove for consistent underperformance (30-day advance notice)
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Positions</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalPositions}</p>
              <p className="text-xs text-gray-500 mt-1">6 clusters × 6 pillars</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Filled Positions</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{filledPositions}</p>
              <p className="text-xs text-gray-500 mt-1">{Math.round((filledPositions/totalPositions)*100)}% coverage</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Well Covered</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{wellCovered}</p>
              <p className="text-xs text-gray-500 mt-1">2+ OTCs assigned</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">✓✓</span>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gap Positions</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{gapPositions}</p>
              <p className="text-xs text-gray-500 mt-1">Need coverage</p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
      </div>

      {/* Matrix Visualization */}
      <div className="card overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">6×6 Matrix Visualization</h2>
        <div className="min-w-[900px]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-2 text-left text-sm font-medium text-gray-700 w-40">
                  Cluster / Pillar
                </th>
                {pillars.map(pillar => (
                  <th key={pillar.id} className="border border-gray-300 bg-blue-50 p-2 text-center text-xs font-medium text-gray-700">
                    <div className="flex flex-col">
                      <span className="font-bold">{pillar.name.split(' ')[0]}</span>
                      <span className="text-xs text-gray-500 mt-1">{pillar.name.split(' ').slice(1).join(' ')}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clusters.map(cluster => (
                <tr key={cluster.id}>
                  <td className="border border-gray-300 bg-gray-50 p-2 font-medium text-sm">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full bg-${cluster.color}-500 mr-2`}></span>
                      <span className="font-semibold">{cluster.name.split(' &')[0]}</span>
                    </div>
                  </td>
                  {pillars.map(pillar => {
                    const position = matrixPositions[cluster.id]?.[pillar.id];
                    return (
                      <td 
                        key={`${cluster.id}-${pillar.id}`}
                        className={`border border-gray-300 p-2 text-center text-xs ${
                          position ? getCoverageColor(position.coverage) : 'bg-gray-50'
                        }`}
                      >
                        {position && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-center mb-1">
                              {getCoverageIcon(position.coverage)}
                              <span className="ml-1 font-semibold">{position.otcs.length}</span>
                            </div>
                            {position.otcs.length > 0 && (
                              <div className="text-xs space-y-0.5">
                                {position.otcs.map(otcId => {
                                  const otc = otcs.find(o => o.id === otcId);
                                  return (
                                    <div key={otcId} className="truncate" title={otc?.institution}>
                                      {otc?.institution.split(' ').slice(0, 2).join(' ')}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            {position.gap && position.otcs.length === 0 && (
                              <div className="text-xs font-semibold">GAP</div>
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
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-gray-700">Good (2+ OTCs)</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-yellow-600 mr-1" />
            <span className="text-gray-700">Moderate (1 OTC)</span>
          </div>
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-orange-600 mr-1" />
            <span className="text-gray-700">Weak (underperforming)</span>
          </div>
          <div className="flex items-center">
            <XCircle className="w-4 h-4 text-red-600 mr-1" />
            <span className="text-gray-700">Gap (no coverage)</span>
          </div>
        </div>
      </div>

      {/* Expansion Requests */}
      {expansionRequests && expansionRequests.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Pending Expansion Requests</h2>
            <span className="badge badge-warning">{expansionRequests.filter(r => r.currentStatus === 'pending-review').length} Pending</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">OTC</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requested Position</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expansionRequests.map(request => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono text-blue-600">{request.id}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{request.otcName}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">
                        <span className="font-medium">{clusters.find(c => c.id === request.requestedCluster)?.name.split(' ')[0]}</span>
                        {' / '}
                        <span className="font-medium">{pillars.find(p => p.id === request.requestedPillar)?.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{request.submissionDate}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${
                        request.currentStatus === 'approved' ? 'badge-success' :
                        request.currentStatus === 'pending-review' ? 'badge-warning' :
                        'badge-error'
                      }`}>
                        {request.currentStatus.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {request.currentStatus === 'pending-review' && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleApproveRequest(`${request.otcName} - ${request.positionsRequested} positions`)}
                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleDenyRequest('Matrix expansion request')}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Deny
                          </button>
                        </div>
                      )}
                      {request.currentStatus === 'approved' && (
                        <span className="text-sm text-gray-500">Approved {request.approvalDate}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Decision Points */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Decision Points (NCTC-FLOW-002)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D1:</span>
            <span className="text-gray-600">Meets capability threshold for requested position? (Score &ge; 7.0 &rarr; Approve / Score &lt; 7.0 &rarr; Deny with development recommendations)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D2:</span>
            <span className="text-gray-600">Consistent underperformance in assigned position? (Yes after 2 consecutive poor reviews &rarr; Remove position with 30-day notice / No &rarr; Retain position)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
