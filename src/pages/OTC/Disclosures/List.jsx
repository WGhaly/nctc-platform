import { Link } from 'react-router-dom';
import { Plus, Search, Clock, CheckCircle2, XCircle, AlertCircle, Info, FileText, TrendingUp } from 'lucide-react';
import { detailedDisclosures } from '../../../mockData';

export default function DisclosuresList() {
  // Calculate statistics
  const totalDisclosures = detailedDisclosures.length;
  const underEvaluation = detailedDisclosures.filter(d => d.status === 'under-evaluation').length;
  const goDecisions = detailedDisclosures.filter(d => d.commercializationDecision === 'go').length;
  const noGoDecisions = detailedDisclosures.filter(d => d.commercializationDecision === 'no-go').length;
  
  // Calculate timeline adherence
  const timelyClosure = detailedDisclosures.filter(d => {
    if (d.status !== 'completed') return false;
    const submitted = new Date(d.submissionDate);
    const completed = new Date(d.evaluationDetails?.technical?.date || d.submissionDate);
    const daysDiff = (completed - submitted) / (1000 * 60 * 60 * 24);
    return daysDiff <= 45;
  }).length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'submitted': return 'badge-info';
      case 'under-evaluation': return 'badge-warning';
      case 'completed': return 'badge-success';
      case 'archived': return 'badge-default';
      default: return 'badge-default';
    }
  };

  const getDecisionBadge = (decision) => {
    switch (decision) {
      case 'go': return 'badge-success';
      case 'no-go': return 'badge-error';
      case 'hold': return 'badge-warning';
      default: return 'badge-default';
    }
  };

  const getDaysRemaining = (submissionDate) => {
    const submitted = new Date(submissionDate);
    const deadline = new Date(submitted);
    deadline.setDate(deadline.getDate() + 45);
    const today = new Date();
    const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return daysRemaining;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Invention Disclosures</h1>
          <p className="text-gray-600">45-Day Evaluation Process (OTC-FLOW-001)</p>
        </div>
        <Link to="/otc/disclosures/new" className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          New Disclosure
        </Link>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Disclosure Evaluation Process</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Submission:</span> Faculty/researcher submits disclosure &rarr; 
              <span className="font-medium"> Assessment (45 days):</span> Technical evaluation (OTC staff + external experts if needed) &rarr; Market potential assessment &rarr; IP evaluation &rarr; 
              <span className="font-medium"> Decision:</span> Go (proceed to project) / No-Go (inform researcher) / Hold (more info needed)
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Disclosures</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalDisclosures}</p>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </div>
            <FileText className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Under Evaluation</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{underEvaluation}</p>
              <p className="text-xs text-gray-500 mt-1">In progress</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">GO Decisions</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{goDecisions}</p>
              <p className="text-xs text-gray-500 mt-1">Commercialized</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Timeline Adherence</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {totalDisclosures > 0 ? Math.round((timelyClosure / totalDisclosures) * 100) : 0}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Within 45 days</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-blue-600" />
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
                placeholder="Search disclosures..."
                className="input pl-10 w-full"
              />
            </div>
          </div>
          <select className="input">
            <option value="">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="under-evaluation">Under Evaluation</option>
            <option value="completed">Completed</option>
          </select>
          <select className="input">
            <option value="">All Decisions</option>
            <option value="go">GO</option>
            <option value="no-go">NO-GO</option>
            <option value="hold">HOLD</option>
          </select>
          <select className="input">
            <option value="">All Categories</option>
            <option value="software">Software</option>
            <option value="hardware">Hardware</option>
            <option value="biotech">Biotech</option>
            <option value="materials">Materials</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Disclosures Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inventors</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timeline</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Decision</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {detailedDisclosures.map(disclosure => {
              const daysRemaining = getDaysRemaining(disclosure.submissionDate);
              const isUrgent = daysRemaining < 10 && disclosure.status === 'under-evaluation';
              return (
                <tr key={disclosure.id} className={`hover:bg-gray-50 ${isUrgent ? 'bg-red-50' : ''}`}>
                  <td className="px-4 py-3">
                    <Link 
                      to={`/otc/disclosures/${disclosure.id}`}
                      className="text-sm font-mono text-blue-600 hover:text-blue-700"
                    >
                      {disclosure.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{disclosure.title}</div>
                    <div className="text-xs text-gray-500">{disclosure.category}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{disclosure.inventor || disclosure.inventors?.[0]?.name || 'N/A'}</div>
                    {disclosure.inventors && disclosure.inventors.length > 1 && (
                      <div className="text-xs text-gray-500">+{disclosure.inventors.length - 1} more</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{disclosure.submissionDate}</td>
                  <td className="px-4 py-3">
                    {disclosure.status === 'under-evaluation' ? (
                      <div className="text-sm">
                        <span className={`font-medium ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                          {daysRemaining > 0 ? `${daysRemaining} days left` : `${Math.abs(daysRemaining)} days overdue`}
                        </span>
                        {isUrgent && <AlertCircle className="w-4 h-4 inline ml-1 text-red-600" />}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Completed</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${getStatusBadge(disclosure.status)}`}>
                      {disclosure.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {disclosure.commercializationDecision ? (
                      <span className={`badge ${getDecisionBadge(disclosure.commercializationDecision)}`}>
                        {disclosure.commercializationDecision.toUpperCase()}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link 
                      to={`/otc/disclosures/${disclosure.id}`}
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

      {/* Decision Points */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Decision Points (OTC-FLOW-001)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D1:</span>
            <span className="text-gray-600">Technical evaluation positive & market potential exists & IP protectable? (Yes &rarr; GO / No &rarr; NO-GO / Uncertain &rarr; HOLD for more info)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D2:</span>
            <span className="text-gray-600">Exceeding 45-day timeline? (Yes &rarr; Escalate to OTC Director / No &rarr; Continue evaluation)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
