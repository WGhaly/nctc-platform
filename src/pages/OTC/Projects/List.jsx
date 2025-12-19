import { Link } from 'react-router-dom';
import { Plus, Search, Briefcase, Rocket, DollarSign, Users, Info, TrendingUp, Building2 } from 'lucide-react';
import { detailedProjects } from '../../../mockData';

export default function Projects() {
  // Calculate statistics
  const totalProjects = detailedProjects.length;
  const licensingProjects = detailedProjects.filter(p => p.pathway === 'licensing').length;
  const spinoffProjects = detailedProjects.filter(p => p.pathway === 'spin-off').length;
  const activeProjects = detailedProjects.filter(p => 
    p.status === 'active' || p.status === 'in-progress'
  ).length;
  
  // Calculate total revenue
  const totalRevenue = detailedProjects.reduce((sum, p) => {
    if (p.pathway === 'licensing' && p.revenue?.received) {
      return sum + p.revenue.received;
    }
    return sum;
  }, 0);

  const getPathwayIcon = (pathway) => {
    switch (pathway) {
      case 'licensing': return <Briefcase className="w-5 h-5" />;
      case 'spin-off': return <Rocket className="w-5 h-5" />;
      case 'sponsored-research': return <Building2 className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  const getPathwayColor = (pathway) => {
    switch (pathway) {
      case 'licensing': return 'badge-info';
      case 'spin-off': return 'badge-success';
      case 'sponsored-research': return 'badge-warning';
      default: return 'badge-default';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
      case 'in-progress': return 'badge-success';
      case 'negotiation': return 'badge-warning';
      case 'completed': return 'badge-info';
      case 'on-hold': return 'badge-error';
      default: return 'badge-default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Commercialization Projects</h1>
          <p className="text-gray-600">Technology Transfer Projects (OTC-FLOW-004, 005, 006)</p>
        </div>
        <Link to="/otc/projects/new" className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          New Project
        </Link>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Project Pathways</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Licensing (OTC-FLOW-005):</span> Identify licensees &rarr; Due diligence &rarr; Negotiate terms &rarr; Execute agreement &rarr; Monitor performance &rarr; 
              <span className="font-medium"> Spin-off (OTC-FLOW-006):</span> Business plan &rarr; Founding team &rarr; Fundraising &rarr; University equity &rarr; License terms &rarr; Conflict mgmt &rarr; 
              <span className="font-medium"> Multi-OTC:</span> Lead OTC coordinates, others as service providers
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalProjects}</p>
              <p className="text-xs text-gray-500 mt-1">{activeProjects} active</p>
            </div>
            <Briefcase className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Licensing Projects</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{licensingProjects}</p>
              <p className="text-xs text-gray-500 mt-1">Technology licenses</p>
            </div>
            <Building2 className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Spin-off Companies</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{spinoffProjects}</p>
              <p className="text-xs text-gray-500 mt-1">University startups</p>
            </div>
            <Rocket className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue Generated</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {(totalRevenue / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-gray-500 mt-1">EGP from licensing</p>
            </div>
            <DollarSign className="w-10 h-10 text-purple-600" />
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
                placeholder="Search projects..."
                className="input pl-10 w-full"
              />
            </div>
          </div>
          <select className="input">
            <option value="">All Pathways</option>
            <option value="licensing">Licensing</option>
            <option value="spin-off">Spin-off</option>
            <option value="sponsored-research">Sponsored Research</option>
          </select>
          <select className="input">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="negotiation">Negotiation</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Technology</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pathway</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partner/Company</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {detailedProjects.map(project => (
              <tr key={project.projectId} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link 
                    to={`/otc/projects/${project.projectId}`}
                    className="text-sm font-mono text-blue-600 hover:text-blue-700"
                  >
                    {project.projectId}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-900">{project.technologyTitle}</div>
                  <div className="text-xs text-gray-500">
                    {project.inventors?.slice(0, 2).map(inv => inv.name).join(', ')}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`badge ${getPathwayColor(project.pathway)} flex items-center w-fit`}>
                    {getPathwayIcon(project.pathway)}
                    <span className="ml-1">{project.pathway}</span>
                  </span>
                </td>
                <td className="px-4 py-3">
                  {project.pathway === 'licensing' && (
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {project.licensingDetails?.licenseeProfile?.companyName || 'TBD'}
                      </div>
                      {project.licensingDetails?.licenseeProfile?.industry && (
                        <div className="text-xs text-gray-500">
                          {project.licensingDetails.licenseeProfile.industry}
                        </div>
                      )}
                    </div>
                  )}
                  {project.pathway === 'spin-off' && (
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{project.companyName || 'TBD'}</div>
                      {project.foundingTeam && (
                        <div className="text-xs text-gray-500">
                          <Users className="w-3 h-3 inline mr-1" />
                          {project.foundingTeam.length} founders
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${project.progressPercentage || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {project.progressPercentage || 0}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{project.currentStage}</div>
                </td>
                <td className="px-4 py-3 text-sm">
                  {project.pathway === 'licensing' && project.licensingDetails?.proposedTerms?.upfrontPayment && (
                    <div>
                      <div className="font-medium text-gray-900">
                        {(project.licensingDetails.proposedTerms.upfrontPayment / 1000).toFixed(0)}K EGP
                      </div>
                      <div className="text-xs text-gray-500">
                        +{project.licensingDetails.proposedTerms.royaltyRate}% royalty
                      </div>
                    </div>
                  )}
                  {project.pathway === 'spin-off' && project.universityEquity && (
                    <div>
                      <div className="font-medium text-gray-900">
                        {project.universityEquity.percentage}% equity
                      </div>
                      {project.fundraising?.raisedAmount && (
                        <div className="text-xs text-gray-500">
                          {(project.fundraising.raisedAmount / 1000000).toFixed(1)}M raised
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`badge ${getStatusBadge(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link 
                    to={`/otc/projects/${project.projectId}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decision Points */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Decision Points (Project Flows)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[80px]">Licensing D1:</span>
            <span className="text-gray-600">Due diligence satisfactory & terms acceptable? (Yes &rarr; Execute agreement / No &rarr; Renegotiate or terminate)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[80px]">Spin-off D1:</span>
            <span className="text-gray-600">Business plan viable & team capable & conflicts managed? (Yes &rarr; Proceed to incorporation / No &rarr; Defer or redesign)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[80px]">Spin-off D2:</span>
            <span className="text-gray-600">Fundraising milestone met? (Yes &rarr; Release next equity tranche / No &rarr; Support fundraising or reassess)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
