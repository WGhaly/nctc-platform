import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { handleScheduleReview, handleProvideFeedback, handleAdjustFunding } from '../../../utils/quickActions';
import { 
  Building2, Calendar, TrendingUp, DollarSign, FileText, Award, 
  AlertCircle, Users, ExternalLink, MessageSquare, BarChart3, 
  CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, Target
} from 'lucide-react';
import { otcs, clusters, pillars } from '../../../mockData';

export default function OTCPerformanceDetail() {
  const { id } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState('6-months');

  // Get OTC data (using first OTC if no ID provided)
  const otcId = id || '1';
  const otc = otcs.find(o => o.id === otcId) || otcs[0];

  // Mock performance history (6 months)
  const performanceHistory = [
    { month: 'Jul 2024', disclosures: 3, patents: 1, licenses: 0, revenue: 35000, score: 82 },
    { month: 'Aug 2024', disclosures: 4, patents: 0, licenses: 1, revenue: 42000, score: 85 },
    { month: 'Sep 2024', disclosures: 5, patents: 1, licenses: 0, revenue: 38000, score: 88 },
    { month: 'Oct 2024', disclosures: 3, patents: 2, licenses: 1, revenue: 65000, score: 90 },
    { month: 'Nov 2024', disclosures: 5, patents: 2, licenses: 0, revenue: 48000, score: 87 },
    { month: 'Dec 2024', disclosures: 4, patents: 2, licenses: 1, revenue: 72000, score: 92 }
  ];

  // Mock review history
  const reviewHistory = [
    {
      date: '2024-07-15',
      period: 'H1 2024',
      type: '6-month',
      score: 89,
      rating: 'Exceeds Expectations',
      feedback: 'Strong performance across all KPIs. Excellent commercialization results.',
      reviewer: 'Ahmed Hassan'
    },
    {
      date: '2024-01-15',
      period: 'H2 2023',
      type: '6-month',
      score: 85,
      rating: 'Meets Expectations',
      feedback: 'Good progress on disclosure intake. Licensing pipeline developing well.',
      reviewer: 'Ahmed Hassan'
    },
    {
      date: '2023-07-15',
      period: 'H1 2023',
      type: '6-month',
      score: 78,
      rating: 'Meets Expectations',
      feedback: 'Solid start. Continue focus on industry engagement.',
      reviewer: 'Dr. Fatma El-Sayed'
    }
  ];

  // Mock funding history
  const fundingHistory = [
    { date: '2024-07-15', installment: 4, amount: 750000, status: 'Released', condition: '18-month review', kpiScore: 85 },
    { date: '2024-01-15', installment: 3, amount: 750000, status: 'Released', condition: '12-month review', kpiScore: 89 },
    { date: '2023-07-18', installment: 2, amount: 750000, status: 'Released', condition: '6-month review', kpiScore: 92 },
    { date: '2023-01-15', installment: 1, amount: 750000, status: 'Released', condition: 'Contract execution', kpiScore: null }
  ];

  // Mock intervention history (if any)
  const interventionHistory = otc.performance === 'needs-improvement' ? [
    {
      date: '2024-08-01',
      type: 'Performance Support',
      description: 'Intensive mentoring program initiated',
      status: 'In Progress',
      outcome: 'Showing improvement in disclosure intake'
    }
  ] : [];

  const getPerformanceBadge = (performance) => {
    const badges = {
      'exceeds': { bg: 'bg-green-100', text: 'text-green-800', label: 'Exceeds Expectations', icon: ArrowUpRight },
      'meets': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Meets Expectations', icon: CheckCircle2 },
      'needs-improvement': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Needs Improvement', icon: AlertCircle },
      'underperforming': { bg: 'bg-red-100', text: 'text-red-800', label: 'Underperforming', icon: ArrowDownRight }
    };
    return badges[performance] || badges.meets;
  };

  const badge = getPerformanceBadge(otc.performance);
  const BadgeIcon = badge.icon;

  // Get cluster and pillar names
  const otcClusters = otc.clusters.map(cId => clusters.find(c => c.id === cId)?.name || cId);
  const otcPillars = otc.pillars.map(pId => pillars.find(p => p.id === pId)?.name || pId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{otc.name}</h1>
              <p className="text-gray-600">{otc.institution} • {otc.city}</p>
              <p className="text-sm text-gray-500 mt-1">Member since {new Date(otc.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 ${badge.bg} ${badge.text}`}>
              <BadgeIcon className="w-5 h-5" />
              {badge.label}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-600 mb-1">Matrix Positions</p>
            <p className="font-semibold text-gray-900">{otcClusters.join(', ')}</p>
            <p className="text-xs text-gray-500 mt-1">{otcPillars.join(', ')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Director</p>
            <p className="font-semibold text-gray-900">{otc.director}</p>
            <p className="text-xs text-gray-500 mt-1">{otc.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Funding Cycle</p>
            <p className="font-semibold text-gray-900">Cycle {otc.fundingCycle}</p>
            <p className="text-xs text-gray-500 mt-1">EGP {otc.fundingReceived.toLocaleString()} / {otc.fundingTotal.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Key Performance Indicators</h2>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="6-months">Last 6 Months</option>
            <option value="12-months">Last 12 Months</option>
            <option value="all-time">All Time</option>
          </select>
        </div>

        <div className="grid md:grid-cols-5 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">↑ 15%</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{otc.kpis.disclosures}</p>
            <p className="text-sm text-blue-700">Disclosures</p>
            <p className="text-xs text-blue-600 mt-1">Target: 15</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-6 h-6 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">↑ 8%</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{otc.kpis.patents}</p>
            <p className="text-sm text-purple-700">Patents</p>
            <p className="text-xs text-purple-600 mt-1">Target: 5</p>
          </div>

          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span className="text-xs text-green-600 font-medium">↑ 12%</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{otc.kpis.licenses}</p>
            <p className="text-sm text-green-700">Licenses</p>
            <p className="text-xs text-green-600 mt-1">Target: 2</p>
          </div>

          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-6 h-6 text-orange-600" />
              <span className="text-xs text-orange-600 font-medium">→ 0%</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">{otc.kpis.spinoffs}</p>
            <p className="text-sm text-orange-700">Spin-offs</p>
            <p className="text-xs text-orange-600 mt-1">Target: 1</p>
          </div>

          <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-6 h-6 text-teal-600" />
              <span className="text-xs text-teal-600 font-medium">↑ 22%</span>
            </div>
            <p className="text-2xl font-bold text-teal-900">{(otc.kpis.revenue / 1000).toFixed(0)}K</p>
            <p className="text-sm text-teal-700">Revenue (EGP)</p>
            <p className="text-xs text-teal-600 mt-1">Target: 200K</p>
          </div>
        </div>

        {/* Performance Trend Chart */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Performance Trends</h3>
          <div className="space-y-2">
            {performanceHistory.map((month, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-xs text-gray-600 w-20">{month.month}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all"
                      style={{ width: `${month.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12">{month.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Review History</h2>
        <div className="space-y-4">
          {reviewHistory.map((review, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{review.period} - {review.type} Review</h3>
                  <p className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    review.score >= 85 ? 'bg-green-100 text-green-800' :
                    review.score >= 70 ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {review.rating}
                  </span>
                  <p className="text-lg font-bold text-gray-900 mt-1">Score: {review.score}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{review.feedback}</p>
              <p className="text-xs text-gray-500">Reviewer: {review.reviewer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Funding History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Funding Allocation & Disbursement</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Installment</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Condition</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">KPI Score</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {fundingHistory.map((funding, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm">{new Date(funding.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-sm">Installment {funding.installment}</td>
                  <td className="py-3 px-4 text-sm font-semibold">EGP {funding.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{funding.condition}</td>
                  <td className="py-3 px-4 text-sm">
                    {funding.kpiScore ? <span className="font-semibold">{funding.kpiScore}%</span> : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      funding.status === 'Released' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {funding.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intervention History (if applicable) */}
      {interventionHistory.length > 0 && (
        <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            Intervention History
          </h2>
          <div className="space-y-3">
            {interventionHistory.map((intervention, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{intervention.type}</h3>
                    <p className="text-sm text-gray-600">{new Date(intervention.date).toLocaleDateString()}</p>
                  </div>
                  <span className="px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800">
                    {intervention.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{intervention.description}</p>
                <p className="text-xs text-gray-600 italic">{intervention.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button onClick={() => handleScheduleReview(otc.name)} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />
          Schedule Review
        </button>
        <button onClick={() => handleProvideFeedback(otc.name)} className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center justify-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Provide Feedback
        </button>
        <button onClick={() => handleAdjustFunding(otc.name)} className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 flex items-center justify-center gap-2">
          <DollarSign className="w-5 h-5" />
          Adjust Funding
        </button>
        <Link 
          to={`/otc/dashboard`}
          className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-800 flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-5 h-5" />
          OTC Portal
        </Link>
      </div>
    </div>
  );
}
