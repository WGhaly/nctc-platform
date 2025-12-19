import { Link } from 'react-router-dom';
import { Plus, Search, Briefcase, Clock, DollarSign, CheckCircle2, AlertCircle, Info, Star } from 'lucide-react';
import { serviceDirectory, serviceRequests } from '../../../mockData';
import { handleRequestService } from '../../../utils/quickActions';
import toast from '../../../utils/toast';

export default function Services() {
  // Calculate statistics
  const totalServices = serviceDirectory.length;
  const availableServices = serviceDirectory.filter(s => s.available).length;
  const totalRequests = serviceRequests.length;
  const completedRequests = serviceRequests.filter(r => r.status === 'completed').length;
  const inProgressRequests = serviceRequests.filter(r => r.status === 'in-progress').length;
  const avgRating = serviceRequests
    .filter(r => r.rating)
    .reduce((sum, r, _, arr) => sum + r.rating / arr.length, 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return 'badge-success';
      case 'in-progress': return 'badge-info';
      case 'quoted': return 'badge-warning';
      case 'requested': return 'badge-default';
      default: return 'badge-default';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'IP Management': 'bg-blue-100 text-blue-700',
      'Legal Support': 'bg-purple-100 text-purple-700',
      'Market Research': 'bg-green-100 text-green-700',
      'Financial Analysis': 'bg-yellow-100 text-yellow-700',
      'Business Planning': 'bg-pink-100 text-pink-700',
      'Training & Capacity': 'bg-indigo-100 text-indigo-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inter-OTC Services</h1>
          <p className="text-gray-600">Service Directory & Requests (OTC-FLOW-007)</p>
        </div>
        <Link to="/otc/services/request" className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Request Service
        </Link>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Inter-OTC Service Process</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Request:</span> OTC submits service request with requirements &rarr; 
              <span className="font-medium"> Response (3 days):</span> Provider responds with availability + quote &rarr; 
              <span className="font-medium"> Agreement:</span> Terms accepted, work begins &rarr; 
              <span className="font-medium"> Delivery:</span> Service completed, deliverables provided &rarr; 
              <span className="font-medium"> Payment:</span> Invoice processed (bank transfer or offset against services)
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Services</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{availableServices}</p>
              <p className="text-xs text-gray-500 mt-1">of {totalServices} total</p>
            </div>
            <Briefcase className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{totalRequests}</p>
              <p className="text-xs text-gray-500 mt-1">{inProgressRequests} in progress</p>
            </div>
            <Clock className="w-10 h-10 text-purple-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{completedRequests}</p>
              <p className="text-xs text-gray-500 mt-1">{totalRequests > 0 ? Math.round((completedRequests/totalRequests)*100) : 0}% success rate</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{avgRating.toFixed(1)}</p>
              <p className="text-xs text-gray-500 mt-1">
                <Star className="w-3 h-3 inline fill-current" /> out of 5.0
              </p>
            </div>
            <Star className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Service Directory */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Service Directory</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {serviceDirectory.map(service => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{service.serviceName}</h3>
                  <p className="text-sm text-gray-600 mb-2">{service.otcName}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryColor(service.category)}`}>
                    {service.category}
                  </span>
                </div>
                {service.available ? (
                  <span className="badge badge-success">Available</span>
                ) : (
                  <span className="badge badge-error">Unavailable</span>
                )}
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{service.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{service.deliveryTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>
                    {service.pricing.amount.toLocaleString()} {service.pricing.currency} {service.pricing.unit}
                    {service.pricing.estimatedHours && ` (est. ${service.pricing.estimatedHours})`}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Capacity:</span> {service.capacity}
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Requests:</span> {service.requestCount} total
                </div>
              </div>
              
              <button 
                onClick={() => handleRequestService(service.serviceName)}
                className="btn btn-primary w-full mt-3 text-sm"
              >
                Request This Service
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Service Requests */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Service Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requested</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {serviceRequests.map(request => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">{request.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{request.serviceName}</div>
                    <div className="text-xs text-gray-500">for {request.requestingOTCName}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{request.providingOTCName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{request.requestDate}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {request.quotedAmount ? `${request.quotedAmount.toLocaleString()} ${request.currency}` : 'Pending'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${getStatusBadge(request.status)}`}>
                      {request.status}
                    </span>
                    {request.paymentStatus === 'paid' && (
                      <div className="text-xs text-green-600 mt-1">
                        <CheckCircle2 className="w-3 h-3 inline mr-1" />
                        Paid
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => toast.info(`Viewing details for request ${request.id}...`)}
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

      {/* Decision Points */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Decision Points (OTC-FLOW-007)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D1:</span>
            <span className="text-gray-600">Provider responds within 3 days? (Yes &rarr; Proceed to quote / No &rarr; NCTC escalation, find alternative provider)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D2:</span>
            <span className="text-gray-600">Service quality satisfactory? (Yes &rarr; Payment + rating / No &rarr; Dispute resolution via NCTC)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
