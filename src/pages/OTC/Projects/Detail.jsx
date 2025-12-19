import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Shield, TrendingUp, Calendar, Users, DollarSign, FileText, Plus, Settings, CheckCircle2, Building2, Scale, Target } from 'lucide-react';
import { detailedProjects, clusters } from '../../../mockData';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find project by ID
  const project = detailedProjects.find(p => p.id === id) || detailedProjects[0];
  
  // Tab state
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'negotiation': return 'badge-warning';
      case 'completed': return 'badge-info';
      default: return 'badge-default';
    }
  };

  const getPathwayIcon = (pathway) => {
    switch (pathway) {
      case 'licensing': return <Scale className="w-5 h-5" />;
      case 'spinoff': return <Building2 className="w-5 h-5" />;
      case 'sponsored-research': return <Target className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  const TabButton = ({ tab, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-4 py-2 font-medium rounded-xl transition-all ${
        activeTab === tab
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/otc/projects')} className="btn-secondary mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{project.id}</h1>
              <span className={`badge ${getStatusBadge(project.status)}`}>
                {project.status.toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl text-gray-700 mb-2">{project.title}</h2>
            <p className="text-sm text-gray-500">
              Process Flows: OTC-FLOW-004 (Licensing), OTC-FLOW-005 (Spin-off), OTC-FLOW-006 (Commercialization)
            </p>
          </div>
          
          <div className="flex gap-2">
            <button className="btn-secondary">
              <Plus className="w-5 h-5 mr-2" />
              Request Service
            </button>
            <button className="btn-secondary">
              <Settings className="w-5 h-5 mr-2" />
              Update Status
            </button>
            <button className="btn-primary">
              Schedule Review
            </button>
          </div>
        </div>
      </div>

      {/* Project Header Card */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Focal Point OTC</p>
            <p className="font-semibold text-gray-900">{project.otcName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Cluster</p>
            <span className="badge badge-info">{project.cluster.toUpperCase()}</span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Commercialization Pathway</p>
            <div className="flex items-center gap-2">
              {getPathwayIcon(project.pathway)}
              <span className="font-semibold capitalize">{project.pathway}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Progress</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="font-semibold text-sm">{project.progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl shadow-sm">
        <TabButton tab="overview" label="Overview" icon={Briefcase} />
        <TabButton tab="ip" label="IP Protection" icon={Shield} />
        <TabButton tab="commercialization" label="Commercialization" icon={TrendingUp} />
        <TabButton tab="timeline" label="Timeline" icon={Calendar} />
        <TabButton tab="team" label="Team" icon={Users} />
        <TabButton tab="budget" label="Budget" icon={DollarSign} />
      </div>

      {/* Tab Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h3>
                <div className="space-y-4">
                  <div>
                    <label className="label">Technology Description</label>
                    <p className="text-gray-700 leading-relaxed">{project.technologyDescription}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Start Date</label>
                      <p className="text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="label">Last Update</label>
                      <p className="text-gray-900">{new Date(project.lastUpdate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <label className="label">Current Stage</label>
                    <span className="badge badge-warning">{project.stage.replace(/-/g, ' ').toUpperCase()}</span>
                  </div>

                  <div>
                    <label className="label">Next Milestone</label>
                    <div className="flex items-center p-3 bg-blue-50 rounded-xl">
                      <Target className="w-5 h-5 text-blue-600 mr-3" />
                      <p className="text-gray-900">{project.nextMilestone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventors */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Inventors</h3>
                <div className="space-y-3">
                  {project.inventors.map((inventor, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3">
                          {inventor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{inventor.name}</p>
                          <p className="text-sm text-gray-600">{inventor.email}</p>
                          {inventor.roleInSpinoff && (
                            <p className="text-xs text-blue-600 mt-1">{inventor.roleInSpinoff}</p>
                          )}
                        </div>
                      </div>
                      {inventor.share && (
                        <span className="badge badge-info">{inventor.share}% Share</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* IP Protection Tab (OTC-FLOW-002) */}
          {activeTab === 'ip' && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  IP Protection Status
                </h3>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Protection Type</label>
                      <span className="badge badge-info">{project.ipStatus.type.toUpperCase()}</span>
                    </div>
                    <div>
                      <label className="label">Status</label>
                      <span className={`badge ${
                        project.ipStatus.status === 'registered' ? 'badge-success' :
                        project.ipStatus.status === 'pending' ? 'badge-warning' :
                        'badge-info'
                      }`}>{project.ipStatus.status.toUpperCase()}</span>
                    </div>
                  </div>

                  {project.ipStatus.filingDate && (
                    <div>
                      <label className="label">Filing Date</label>
                      <p className="text-gray-900">{new Date(project.ipStatus.filingDate).toLocaleDateString()}</p>
                    </div>
                  )}

                  {project.ipStatus.applicationNumber && (
                    <div>
                      <label className="label">Application Number</label>
                      <p className="text-gray-900 font-mono">{project.ipStatus.applicationNumber}</p>
                    </div>
                  )}

                  {project.ipStatus.registrationNumber && (
                    <div>
                      <label className="label">Registration Number</label>
                      <p className="text-gray-900 font-mono">{project.ipStatus.registrationNumber}</p>
                    </div>
                  )}

                  {project.ipStatus.attorney && (
                    <div>
                      <label className="label">Patent Attorney</label>
                      <p className="text-gray-900">{project.ipStatus.attorney}</p>
                    </div>
                  )}

                  {project.ipStatus.costs && (
                    <div>
                      <label className="label">IP Protection Costs</label>
                      <p className="text-2xl font-bold text-blue-600">
                        {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(project.ipStatus.costs)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="card bg-blue-50 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">IP Management Process (OTC-FLOW-002)</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Disclosure → Prior Art Search → Patentability Assessment → Filing Decision → 
                  Application Preparation → Filing → Prosecution → Grant/Registration → Maintenance
                </p>
              </div>
            </div>
          )}

          {/* Commercialization Tab */}
          {activeTab === 'commercialization' && (
            <div className="space-y-6">
              {project.pathway === 'licensing' && project.licensingDetails && (
                <>
                  <div className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Licensing Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="label">Licensee</label>
                        <p className="text-lg font-semibold text-gray-900">
                          {project.licensingDetails.licenseeProfile?.name || project.licensingDetails.potentialLicensee || project.licensingDetails.licensee}
                        </p>
                      </div>

                      {project.licensingDetails.licenseeProfile && (
                        <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="text-sm text-gray-600">Type</p>
                            <p className="font-medium">{project.licensingDetails.licenseeProfile.type}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Established</p>
                            <p className="font-medium">{project.licensingDetails.licenseeProfile.established}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Employees</p>
                            <p className="font-medium">{project.licensingDetails.licenseeProfile.employees}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Market Access</p>
                            <p className="font-medium">{project.licensingDetails.licenseeProfile.marketAccess}</p>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="label">License Type</label>
                        <span className="badge badge-info">
                          {project.licensingDetails.pathway || project.licensingDetails.executedTerms?.exclusivity || 'Exclusive'}
                        </span>
                      </div>

                      {project.licensingDetails.proposedTerms && (
                        <div className="border border-gray-200 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Proposed Terms</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Upfront Fee:</span>
                              <span className="font-semibold">
                                {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(project.licensingDetails.proposedTerms.upfrontFee)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Royalty Rate:</span>
                              <span className="font-semibold">{project.licensingDetails.proposedTerms.royaltyRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Territory:</span>
                              <span className="font-semibold">{project.licensingDetails.proposedTerms.territory}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Term:</span>
                              <span className="font-semibold">{project.licensingDetails.proposedTerms.term}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {project.licensingDetails.executedTerms && (
                        <div className="border border-green-200 bg-green-50 rounded-xl p-4">
                          <h4 className="font-semibold text-green-900 mb-3">Executed Terms</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-700">Upfront Fee:</span>
                              <span className="font-semibold text-green-900">
                                {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(project.licensingDetails.executedTerms.upfrontFee)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Royalty Rate:</span>
                              <span className="font-semibold text-green-900">{project.licensingDetails.executedTerms.royaltyRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-700">Executed:</span>
                              <span className="font-semibold text-green-900">
                                {new Date(project.licensingDetails.executedTerms.executed).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {project.licensingDetails.performance && (
                    <div className="card bg-green-50 border border-green-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">License Performance</h3>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Users Acquired</p>
                            <p className="text-2xl font-bold text-green-600">
                              {project.licensingDetails.performance.usersAcquired?.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Total Royalties</p>
                            <p className="text-2xl font-bold text-green-600">
                              {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(project.licensingDetails.performance.totalRoyalties)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Compliance</p>
                            <span className="badge badge-success">{project.licensingDetails.performance.complianceStatus}</span>
                          </div>
                        </div>

                        {project.licensingDetails.performance.revenue && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Quarterly Revenue</h4>
                            <div className="space-y-2">
                              {project.licensingDetails.performance.revenue.map((rev, idx) => (
                                <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-xl">
                                  <span className="font-medium">{rev.period}</span>
                                  <div className="text-right">
                                    <p className="font-semibold">
                                      Royalty: {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(rev.royalty)}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Sales: {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(rev.sales)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {project.pathway === 'spinoff' && project.spinoffDetails && (
                <>
                  <div className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Spin-off Company Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="label">Company Name</label>
                        <p className="text-lg font-semibold text-gray-900">{project.spinoffDetails.companyName}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Founded</label>
                          <p className="text-gray-900">{new Date(project.spinoffDetails.founded).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="label">Status</label>
                          <span className="badge badge-warning">{project.spinoffDetails.status.replace(/-/g, ' ').toUpperCase()}</span>
                        </div>
                      </div>

                      <div>
                        <label className="label">Founding Team</label>
                        <div className="space-y-2">
                          {project.spinoffDetails.foundingTeam.map((member, idx) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-semibold text-gray-900">{member.name}</p>
                                  <p className="text-sm text-gray-600">{member.role}</p>
                                  {member.background && (
                                    <p className="text-xs text-gray-500 mt-1">{member.background}</p>
                                  )}
                                </div>
                                <span className={`badge ${member.fullTime ? 'badge-success' : 'badge-info'}`}>
                                  {member.fullTime ? 'Full-Time' : 'Part-Time'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {project.spinoffDetails.fundraising && (
                        <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Fundraising</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Target:</span>
                              <span className="text-xl font-bold text-blue-600">
                                {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(project.spinoffDetails.fundraising.targetAmount)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Raised:</span>
                              <span className="text-xl font-bold text-green-600">
                                {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(project.spinoffDetails.fundraising.raisedAmount)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-green-500 h-3 rounded-full transition-all"
                                style={{ width: `${(project.spinoffDetails.fundraising.raisedAmount / project.spinoffDetails.fundraising.targetAmount) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {project.spinoffDetails.universityEquity && (
                        <div className="border border-purple-200 bg-purple-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">University Equity</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Equity Stake:</span>
                              <span className="font-semibold">{project.spinoffDetails.universityEquity.percentage}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Board Seat:</span>
                              <span className="font-semibold">{project.spinoffDetails.universityEquity.boardSeat ? 'Yes' : 'No'}</span>
                            </div>
                            {project.spinoffDetails.universityEquity.boardRepresentative && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Representative:</span>
                                <span className="font-semibold">{project.spinoffDetails.universityEquity.boardRepresentative}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Project Timeline
              </h3>
              <div className="space-y-4">
                {project.timeline && project.timeline.map((item, idx) => (
                  <div key={idx} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      {idx < project.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                      <p className="font-semibold text-gray-900">{item.event}</p>
                      <p className="text-sm text-blue-600">{item.milestone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Project Team
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Inventors</h4>
                  <div className="space-y-2">
                    {project.inventors.map((inventor, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3">
                            {inventor.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{inventor.name}</p>
                            <p className="text-sm text-gray-600">{inventor.email}</p>
                          </div>
                        </div>
                        {inventor.share && (
                          <span className="badge badge-info">{inventor.share}% IP Share</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">OTC Team</h4>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="font-semibold text-gray-900">{project.otcName}</p>
                    <p className="text-sm text-gray-600">Focal Point OTC</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Budget Tab */}
          {activeTab === 'budget' && project.budget && (
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Budget Overview
                </h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Allocated Budget</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(project.budget.allocated)}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">Spent</p>
                      <p className="text-2xl font-bold text-green-600">
                        {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(project.budget.spent)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Budget Utilization</span>
                      <span className="text-sm font-semibold">{Math.round((project.budget.spent / project.budget.allocated) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${(project.budget.spent / project.budget.allocated) * 100}%` }}
                      />
                    </div>
                  </div>

                  {project.budget.breakdown && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Expenditure Breakdown</h4>
                      <div className="space-y-2">
                        {project.budget.breakdown.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <span className="font-medium text-gray-700">{item.category}</span>
                            <span className="font-semibold text-gray-900">
                              {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(item.amount)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {project.revenue && (
                <div className="card bg-green-50 border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Expected Revenue</h3>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600 mb-2">
                      {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP' }).format(project.revenue.expected)}
                    </p>
                    <p className="text-sm text-gray-600">{project.revenue.structure}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Project ID:</span>
                <span className="font-semibold">{project.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`badge ${getStatusBadge(project.status)} text-xs`}>
                  {project.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Progress:</span>
                <span className="font-semibold">{project.progress}%</span>
              </div>
              {project.estimatedValue && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Est. Value:</span>
                  <span className="font-semibold text-green-600">
                    {new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', notation: 'compact' }).format(project.estimatedValue)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
            <div className="space-y-2">
              <button className="btn-primary w-full">
                <Plus className="w-4 h-4 mr-2" />
                Request Service
              </button>
              <button className="btn-secondary w-full">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </button>
              <button className="btn-secondary w-full">
                <Settings className="w-4 h-4 mr-2" />
                Update Status
              </button>
              <button className="btn-secondary w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Review
              </button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="card bg-yellow-50 border border-yellow-200">
            <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{project.nextMilestone}</p>
              </div>
              {project.licensingDetails?.nextSteps && project.licensingDetails.nextSteps.map((step, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
