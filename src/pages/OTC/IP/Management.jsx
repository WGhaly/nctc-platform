import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, FileText, Shield, AlertCircle, DollarSign, Calendar, Filter, Download, ExternalLink, Info } from 'lucide-react';
import { clusters } from '../../../mockData';
import { handleExportIPData } from '../../../utils/quickActions';
import toast from '../../../utils/toast';

export default function IPManagement() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCluster, setSelectedCluster] = useState('');
  const [showNewIPForm, setShowNewIPForm] = useState(false);

  // Mock IP portfolio data
  const ipAssets = [
    {
      id: 'IP-2024-001',
      technology: 'Smart Grid Energy Management System',
      type: 'Patent',
      status: 'Granted',
      filingDate: '2023-01-20',
      grantDate: '2024-06-15',
      countries: ['Egypt', 'Saudi Arabia', 'UAE'],
      attorney: 'Ahmed & Partners IP Law',
      annualCost: 45000,
      cluster: 'eng',
      inventor: 'Prof. Ahmed Sabry',
      applicationNumber: 'EG-2023-001234',
      maintenanceDue: '2025-06-15',
      projectLinked: 'PROJ-2024-001'
    },
    {
      id: 'IP-2024-002',
      technology: 'BioPharma Drug Delivery Nanoparticles',
      type: 'Patent',
      status: 'Full Application',
      filingDate: '2024-03-10',
      grantDate: null,
      countries: ['Egypt', 'PCT'],
      attorney: 'BioPatents Egypt',
      annualCost: 38000,
      cluster: 'health',
      inventor: 'Prof. Sara Mostafa',
      applicationNumber: 'PCT/EG2024/000045',
      maintenanceDue: null,
      projectLinked: 'PROJ-2024-002'
    },
    {
      id: 'IP-2024-003',
      technology: 'Mobile Learning Platform',
      type: 'Copyright',
      status: 'Granted',
      filingDate: '2023-08-15',
      grantDate: '2023-09-01',
      countries: ['Egypt'],
      attorney: 'Internal',
      annualCost: 5000,
      cluster: 'ict',
      inventor: 'Dr. Mona Khalil',
      applicationNumber: 'CR-2023-5678',
      maintenanceDue: '2033-09-01',
      projectLinked: 'PROJ-2024-003'
    },
    {
      id: 'IP-2023-015',
      technology: 'Water Quality Monitoring AI Algorithm',
      type: 'Trade Secret',
      status: 'Maintained',
      filingDate: '2023-11-01',
      grantDate: null,
      countries: ['N/A'],
      attorney: 'Internal',
      annualCost: 8000,
      cluster: 'env',
      inventor: 'Dr. Khaled Abdel-Rahman',
      applicationNumber: 'TS-2023-088',
      maintenanceDue: 'Ongoing',
      projectLinked: 'DISC-2024-001'
    },
    {
      id: 'IP-2024-005',
      technology: 'NCTC Platform Trademark',
      type: 'Trademark',
      status: 'Granted',
      filingDate: '2023-05-10',
      grantDate: '2023-10-20',
      countries: ['Egypt'],
      attorney: 'Trademark Associates',
      annualCost: 12000,
      cluster: 'ict',
      inventor: 'N/A',
      applicationNumber: 'TM-2023-9876',
      maintenanceDue: '2033-10-20',
      projectLinked: null
    },
    {
      id: 'IP-2023-008',
      technology: 'Biodegradable Packaging Material',
      type: 'Patent',
      status: 'Provisional Filed',
      filingDate: '2024-10-15',
      grantDate: null,
      countries: ['Egypt'],
      attorney: 'GreenTech Patents',
      annualCost: 15000,
      cluster: 'env',
      inventor: 'Dr. Laila Hassan',
      applicationNumber: 'EG-2024-PROV-456',
      maintenanceDue: null,
      projectLinked: null
    },
    {
      id: 'IP-2022-034',
      technology: 'Legacy Robotics System',
      type: 'Patent',
      status: 'Abandoned',
      filingDate: '2022-03-01',
      grantDate: null,
      countries: ['Egypt'],
      attorney: 'Tech Patents Ltd',
      annualCost: 0,
      cluster: 'eng',
      inventor: 'Dr. Youssef Ahmed',
      applicationNumber: 'EG-2022-007890',
      maintenanceDue: null,
      projectLinked: null
    },
  ];

  // Filter IPs
  const filteredIPs = ipAssets.filter(ip => {
    if (selectedType && ip.type !== selectedType) return false;
    if (selectedStatus && ip.status !== selectedStatus) return false;
    if (selectedCluster && ip.cluster !== selectedCluster) return false;
    return true;
  });

  // Calculate statistics
  const totalIPs = ipAssets.length;
  const activePatents = ipAssets.filter(ip => ip.type === 'Patent' && ['Granted', 'Full Application', 'Provisional Filed'].includes(ip.status)).length;
  const pendingApplications = ipAssets.filter(ip => ['Full Application', 'Provisional Filed'].includes(ip.status)).length;
  const annualCosts = ipAssets.reduce((sum, ip) => sum + ip.annualCost, 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Granted': return 'badge-success';
      case 'Full Application': return 'badge-info';
      case 'Provisional Filed': return 'badge-warning';
      case 'Maintained': return 'badge-success';
      case 'Abandoned': return 'badge-error';
      case 'Concept': return 'badge-default';
      default: return 'badge-default';
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Patent': return 'bg-blue-100 text-blue-800';
      case 'Copyright': return 'bg-purple-100 text-purple-800';
      case 'Trademark': return 'bg-green-100 text-green-800';
      case 'Trade Secret': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IP Portfolio Management</h1>
          <p className="text-gray-600">Coordinate IP protection for all technologies (OTC-FLOW-002)</p>
        </div>
        <button onClick={() => setShowNewIPForm(true)} className="btn-primary rounded-xl">
          <Plus className="w-5 h-5 mr-2" />
          Coordinate New IP
        </button>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">IP Protection Coordination</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Note:</span> OTC provides project management and coordination services &rarr; 
              <span className="font-medium"> Attorneys:</span> External patent attorneys/agents provide legal services &rarr; 
              <span className="font-medium"> Tracking:</span> Monitor prosecution, maintenance deadlines, and costs
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total IP Assets</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalIPs}</p>
              <p className="text-xs text-gray-500 mt-1">Portfolio size</p>
            </div>
            <FileText className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Patents</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{activePatents}</p>
              <p className="text-xs text-gray-500 mt-1">Granted + pending</p>
            </div>
            <Shield className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Apps</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{pendingApplications}</p>
              <p className="text-xs text-gray-500 mt-1">In prosecution</p>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
        <div className="card rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Annual Costs</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {(annualCosts / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-gray-500 mt-1">EGP per year</p>
            </div>
            <DollarSign className="w-10 h-10 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card rounded-xl">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search IP assets..."
                className="input rounded-xl pl-10 w-full"
              />
            </div>
          </div>
          <select 
            className="input rounded-xl"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Patent">Patent</option>
            <option value="Copyright">Copyright</option>
            <option value="Trademark">Trademark</option>
            <option value="Trade Secret">Trade Secret</option>
          </select>
          <select 
            className="input rounded-xl"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Concept">Concept</option>
            <option value="Provisional Filed">Provisional Filed</option>
            <option value="Full Application">Full Application</option>
            <option value="Granted">Granted</option>
            <option value="Maintained">Maintained</option>
            <option value="Abandoned">Abandoned</option>
          </select>
          <select 
            className="input rounded-xl"
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
          >
            <option value="">All Clusters</option>
            {clusters.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button 
            onClick={handleExportIPData}
            className="btn btn-secondary px-4 py-2 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* IP Assets Table */}
      <div className="card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Technology</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Filing Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Countries</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attorney</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Annual Cost</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredIPs.map(ip => (
                <tr key={ip.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-blue-600">{ip.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{ip.technology}</div>
                    <div className="text-xs text-gray-500">{ip.inventor}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadge(ip.type)}`}>
                      {ip.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${getStatusBadge(ip.status)}`}>
                      {ip.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {ip.filingDate}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-gray-600">
                      {ip.countries.slice(0, 2).join(', ')}
                      {ip.countries.length > 2 && (
                        <span className="text-gray-400"> +{ip.countries.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {ip.attorney}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {ip.annualCost > 0 ? `${(ip.annualCost / 1000).toFixed(0)}K EGP` : '-'}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => toast.info(`Viewing details for ${ip.technology} (${ip.id})...`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance Deadlines */}
      <div className="card rounded-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Upcoming Maintenance Deadlines
        </h2>
        <div className="space-y-3">
          {ipAssets
            .filter(ip => ip.maintenanceDue && ip.maintenanceDue !== 'Ongoing' && ip.status !== 'Abandoned')
            .slice(0, 5)
            .map(ip => (
              <div key={ip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{ip.technology}</div>
                  <div className="text-sm text-gray-600">{ip.applicationNumber}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{ip.maintenanceDue}</div>
                  <div className="text-xs text-yellow-600">Due in 180 days</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* IP Lifecycle Timeline */}
      <div className="card rounded-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">IP Lifecycle Overview</h2>
        <div className="grid md:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">
              {ipAssets.filter(ip => ip.status === 'Concept').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Concept</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <div className="text-2xl font-bold text-yellow-900">
              {ipAssets.filter(ip => ip.status === 'Provisional Filed').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Provisional</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-900">
              {ipAssets.filter(ip => ip.status === 'Full Application').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Application</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-900">
              {ipAssets.filter(ip => ip.status === 'Granted').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Granted</div>
          </div>
          <div className="text-center p-4 bg-teal-50 rounded-xl">
            <div className="text-2xl font-bold text-teal-900">
              {ipAssets.filter(ip => ip.status === 'Maintained').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Maintained</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <div className="text-2xl font-bold text-red-900">
              {ipAssets.filter(ip => ip.status === 'Abandoned').length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Abandoned</div>
          </div>
        </div>
      </div>

      {/* Patent Attorneys */}
      <div className="card rounded-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Patent Attorney Contacts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">Ahmed & Partners IP Law</h3>
                <p className="text-sm text-gray-600">General Patents & Trademarks</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Contact: Ahmed Hassan</div>
              <div>Email: contact@ahmedip.com</div>
              <div>Active Cases: 3</div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">BioPatents Egypt</h3>
                <p className="text-sm text-gray-600">Pharmaceutical & Biotech</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Contact: Dr. Laila Mostafa</div>
              <div>Email: info@biopatents.eg</div>
              <div>Active Cases: 2</div>
            </div>
          </div>
        </div>
      </div>

      {/* New IP Form Modal */}
      {showNewIPForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Coordinate New IP Protection</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technology Name
                    </label>
                    <input type="text" className="input rounded-xl w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IP Type
                    </label>
                    <select className="input rounded-xl w-full">
                      <option value="">Select type...</option>
                      <option value="patent">Patent</option>
                      <option value="copyright">Copyright</option>
                      <option value="trademark">Trademark</option>
                      <option value="trade-secret">Trade Secret</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inventor(s)
                    </label>
                    <input type="text" className="input rounded-xl w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cluster
                    </label>
                    <select className="input rounded-xl w-full">
                      <option value="">Select cluster...</option>
                      {clusters.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technology Description
                  </label>
                  <textarea className="input rounded-xl w-full h-24"></textarea>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Countries
                    </label>
                    <input type="text" placeholder="Egypt, Saudi Arabia, UAE..." className="input rounded-xl w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Attorney
                    </label>
                    <select className="input rounded-xl w-full">
                      <option value="">Select attorney...</option>
                      <option value="ahmed">Ahmed & Partners IP Law</option>
                      <option value="bio">BioPatents Egypt</option>
                      <option value="greentech">GreenTech Patents</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Budget (EGP)
                  </label>
                  <input type="number" className="input rounded-xl w-full" />
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowNewIPForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Submit to Attorney
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
