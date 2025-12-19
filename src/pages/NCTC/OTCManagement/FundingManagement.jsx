import { Link } from 'react-router-dom';
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle2, Clock, XCircle, Info, Calendar, FileText } from 'lucide-react';
import { fundingCycles, otcs } from '../../../mockData';

export default function FundingManagement() {
  // Calculate statistics
  const totalAllocation = fundingCycles.reduce((sum, cycle) => sum + cycle.totalAllocation, 0);
  const releasedAmount = fundingCycles.reduce((sum, cycle) => {
    return sum + cycle.installments.filter(i => i.status === 'released').reduce((s, i) => s + i.amount, 0);
  }, 0);
  const withheldCount = fundingCycles.reduce((count, cycle) => {
    return count + cycle.installments.filter(i => i.status === 'withheld').length;
  }, 0);
  const onTrackCount = fundingCycles.filter(cycle => 
    cycle.performanceRating === 'exceeds' || cycle.performanceRating === 'meets'
  ).length;

  const getPerformanceColor = (rating) => {
    switch (rating) {
      case 'exceeds': return 'text-green-600 bg-green-50';
      case 'meets': return 'text-blue-600 bg-blue-50';
      case 'needs-improvement': return 'text-orange-600 bg-orange-50';
      case 'fails': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'released': return 'badge-success';
      case 'withheld': return 'badge-error';
      case 'scheduled': return 'badge-warning';
      case 'pending-review': return 'badge-info';
      default: return 'badge-default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Funding Management</h1>
        <p className="text-gray-600">2-Year Funding Cycles with KPI-Based Disbursement (NCTC-FLOW-003)</p>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Funding Disbursement Process</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Cycle:</span> 2 years, 4 installments (every 6 months) &rarr; 
              <span className="font-medium"> Review:</span> 30 days before each installment, assess KPI achievement &rarr; 
              <span className="font-medium"> Release:</span> If KPIs met &rarr; Installment released / If KPIs failed &rarr; Withheld + intervention plan &rarr; 
              <span className="font-medium"> Monitoring:</span> Monthly expenditure reports, variance &gt;20% triggers audit
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Allocated</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {(totalAllocation / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-gray-500 mt-1">EGP across all cycles</p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Released Amount</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {(releasedAmount / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-gray-500 mt-1">{Math.round((releasedAmount/totalAllocation)*100)}% disbursed</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Track OTCs</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{onTrackCount}</p>
              <p className="text-xs text-gray-500 mt-1">Meeting/exceeding KPIs</p>
            </div>
            <TrendingUp className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Withheld Installments</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{withheldCount}</p>
              <p className="text-xs text-gray-500 mt-1">Require intervention</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>
      </div>

      {/* Funding Cycles */}
      <div className="space-y-6">
        {fundingCycles.map(cycle => {
          const otc = otcs.find(o => o.id === cycle.otcId);
          return (
            <div key={cycle.cycleId} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{otc?.institution || 'Unknown OTC'}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Cycle {cycle.cycleId} • {cycle.cycleStartDate} - {cycle.cycleEndDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {(cycle.totalAllocation / 1000000).toFixed(1)}M EGP
                  </p>
                  <span className={`badge ${getPerformanceColor(cycle.performanceRating)} mt-2`}>
                    {cycle.performanceRating.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Installments */}
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                {cycle.installments.map((installment, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${
                    installment.status === 'released' ? 'bg-green-50 border-green-300' :
                    installment.status === 'withheld' ? 'bg-red-50 border-red-300' :
                    installment.status === 'scheduled' ? 'bg-yellow-50 border-yellow-300' :
                    'bg-gray-50 border-gray-300'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">INSTALLMENT {index + 1}</span>
                      {installment.status === 'released' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                      {installment.status === 'withheld' && <XCircle className="w-4 h-4 text-red-600" />}
                      {installment.status === 'scheduled' && <Clock className="w-4 h-4 text-yellow-600" />}
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {(installment.amount / 1000).toFixed(0)}K EGP
                    </p>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Due: {installment.dueDate}</span>
                      </div>
                      {installment.releaseDate && (
                        <div className="text-green-700 font-medium">Released: {installment.releaseDate}</div>
                      )}
                      {installment.condition && (
                        <div className="text-gray-600 mt-1">
                          <span className="font-medium">Condition:</span> {installment.condition}
                        </div>
                      )}
                      {installment.kpiResult && (
                        <div className={`font-medium mt-1 ${
                          installment.kpiResult === 'pass' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          KPI: {installment.kpiScore} - {installment.kpiResult.toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Expenditure Reports */}
              {cycle.expenditureReports && cycle.expenditureReports.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Expenditure Reports</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Month</th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Budget</th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Spent</th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Variance</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {cycle.expenditureReports.slice(-3).map((report, idx) => {
                          const variance = ((report.actualSpent - report.budgetedAmount) / report.budgetedAmount) * 100;
                          const isOver = variance > 20;
                          return (
                            <tr key={idx} className={isOver ? 'bg-red-50' : ''}>
                              <td className="px-3 py-2 font-medium">{report.month}</td>
                              <td className="px-3 py-2 text-right">{(report.budgetedAmount / 1000).toFixed(0)}K</td>
                              <td className="px-3 py-2 text-right">{(report.actualSpent / 1000).toFixed(0)}K</td>
                              <td className={`px-3 py-2 text-right font-medium ${
                                variance > 0 ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                              </td>
                              <td className="px-3 py-2">
                                {isOver ? (
                                  <span className="text-xs font-medium text-red-600 flex items-center">
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    Audit Required
                                  </span>
                                ) : (
                                  <span className="text-xs text-gray-600">Normal</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Next Cycle Eligibility */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next Cycle Eligibility:</span>
                  <span className={`badge ${cycle.nextCycleEligibility ? 'badge-success' : 'badge-error'}`}>
                    {cycle.nextCycleEligibility ? 'Eligible' : 'Not Eligible'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decision Points */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Decision Points (NCTC-FLOW-003)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D1:</span>
            <span className="text-gray-600">KPIs met for installment release? (Yes &rarr; Release installment / No &rarr; Withhold + intervention plan)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D2:</span>
            <span className="text-gray-600">Budget variance &gt;20%? (Yes &rarr; Trigger audit + request justification / No &rarr; Continue normal monitoring)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D3:</span>
            <span className="text-gray-600">Eligible for next 2-year cycle? (Performance rating &ge; Meets + compliance record &rarr; Eligible / Below standard &rarr; Ineligible)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
