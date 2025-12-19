import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2, Info, BarChart3, Target } from 'lucide-react';
import { fundingCycles, otcs } from '../../../mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function PerformanceDashboard() {
  // Calculate performance statistics from funding cycles
  const exceeds = fundingCycles.filter(c => c.performanceRating === 'exceeds').length;
  const meets = fundingCycles.filter(c => c.performanceRating === 'meets').length;
  const needsImprovement = fundingCycles.filter(c => c.performanceRating === 'needs-improvement').length;
  const fails = fundingCycles.filter(c => c.performanceRating === 'fails').length;
  const total = fundingCycles.length;

  // Performance distribution for pie chart
  const performanceDistribution = [
    { name: 'Exceeds', value: exceeds, color: '#10b981' },
    { name: 'Meets', value: meets, color: '#3b82f6' },
    { name: 'Needs Improvement', value: needsImprovement, color: '#f59e0b' },
    { name: 'Fails', value: fails, color: '#ef4444' }
  ];

  // Average KPI scores by OTC
  const kpiData = fundingCycles.map(cycle => {
    const otc = otcs.find(o => o.id === cycle.otcId);
    const avgKPI = cycle.installments
      .filter(i => i.kpiScore)
      .reduce((sum, i, _, arr) => sum + i.kpiScore / arr.length, 0);
    
    return {
      name: otc?.institution.split(' ')[0] || 'Unknown',
      kpi: Math.round(avgKPI)
    };
  });

  const getPerformanceIcon = (rating) => {
    switch (rating) {
      case 'exceeds': return <TrendingUp className="w-5 h-5" />;
      case 'meets': return <CheckCircle2 className="w-5 h-5" />;
      case 'needs-improvement': return <AlertTriangle className="w-5 h-5" />;
      case 'fails': return <TrendingDown className="w-5 h-5" />;
      default: return <Minus className="w-5 h-5" />;
    }
  };

  const getPerformanceColor = (rating) => {
    switch (rating) {
      case 'exceeds': return 'text-green-600 bg-green-50';
      case 'meets': return 'text-blue-600 bg-blue-50';
      case 'needs-improvement': return 'text-orange-600 bg-orange-50';
      case 'fails': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Monitoring Dashboard</h1>
        <p className="text-gray-600">OTC Ecosystem Performance Tracking (NCTC-FLOW-004)</p>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Performance Review Process</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">6-Month Review:</span> Mid-cycle KPI assessment (data collection, trend analysis, feedback) &rarr; 
              <span className="font-medium"> 2-Year Review:</span> Comprehensive evaluation (all KPIs, impact, feedback, strategic plans) &rarr; 
              <span className="font-medium"> Ratings:</span> Exceeds (&gt;85) / Meets (70-85) / Needs Improvement (55-69) / Fails (&lt;55) &rarr; 
              <span className="font-medium"> Action:</span> Fails triggers intervention plan (training, resources, timeline)
            </p>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Exceeds Standards</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{exceeds}</p>
              <p className="text-xs text-gray-500 mt-1">{total > 0 ? Math.round((exceeds/total)*100) : 0}% of OTCs</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Meets Standards</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{meets}</p>
              <p className="text-xs text-gray-500 mt-1">{total > 0 ? Math.round((meets/total)*100) : 0}% of OTCs</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Needs Improvement</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{needsImprovement}</p>
              <p className="text-xs text-gray-500 mt-1">{total > 0 ? Math.round((needsImprovement/total)*100) : 0}% of OTCs</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-orange-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fails Standards</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{fails}</p>
              <p className="text-xs text-gray-500 mt-1">Intervention required</p>
            </div>
            <TrendingDown className="w-10 h-10 text-red-600" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* KPI Scores by OTC */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Average KPI Scores by OTC</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kpiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="kpi" fill="#3b82f6" name="KPI Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Rating Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {performanceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* OTC Performance Table */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">OTC Performance Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">OTC</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Cycle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg KPI Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Cycle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fundingCycles.map(cycle => {
                const otc = otcs.find(o => o.id === cycle.otcId);
                const avgKPI = cycle.installments
                  .filter(i => i.kpiScore)
                  .reduce((sum, i, _, arr) => sum + i.kpiScore / arr.length, 0);
                
                return (
                  <tr key={cycle.cycleId} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{otc?.institution || 'Unknown'}</div>
                      <div className="text-xs text-gray-500">{otc?.city || ''}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{cycle.cycleId}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900 mr-2">{Math.round(avgKPI)}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              avgKPI >= 85 ? 'bg-green-600' :
                              avgKPI >= 70 ? 'bg-blue-600' :
                              avgKPI >= 55 ? 'bg-orange-600' :
                              'bg-red-600'
                            }`}
                            style={{ width: `${avgKPI}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full ${getPerformanceColor(cycle.performanceRating)}`}>
                        {getPerformanceIcon(cycle.performanceRating)}
                        <span className="ml-2 text-sm font-medium capitalize">
                          {cycle.performanceRating.replace('-', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${cycle.nextCycleEligibility ? 'badge-success' : 'badge-error'}`}>
                        {cycle.nextCycleEligibility ? 'Eligible' : 'Not Eligible'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link 
                        to={`/nctc/performance/otc/${cycle.otcId}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decision Points */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Decision Points (NCTC-FLOW-004)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D1:</span>
            <span className="text-gray-600">6-Month review shows declining trend? (Yes &rarr; Provide feedback + support / No &rarr; Continue normal monitoring)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D2:</span>
            <span className="text-gray-600">2-Year review rating = Fails? (Yes &rarr; Trigger intervention plan (training, resources, 6-month timeline) / No &rarr; Continue to next cycle)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D3:</span>
            <span className="text-gray-600">Intervention plan fails after 6 months? (Yes &rarr; Consider removing matrix positions or termination / No &rarr; Restore normal status)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
