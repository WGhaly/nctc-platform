import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, Info, Clock, DollarSign, Building2, FileText, Calendar, AlertCircle } from 'lucide-react';
import { otcs, detailedProjects, serviceDirectory } from '../../../mockData';

export default function ServiceRequest() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    serviceCategory: '',
    providerOTC: '',
    projectId: '',
    serviceDescription: '',
    timeline: '',
    deliverables: '',
    budget: '',
    attachments: []
  });

  const [selectedService, setSelectedService] = useState(null);

  const serviceCategories = [
    { id: 'ip-protection', name: 'IP Protection', description: 'Patent searches, filing support, prosecution' },
    { id: 'market-analysis', name: 'Market Analysis', description: 'Market research, competitive analysis, opportunity assessment' },
    { id: 'licensing-support', name: 'Licensing Support', description: 'Agreement drafting, negotiation support, valuation' },
    { id: 'lab-access', name: 'Lab Access', description: 'Access to specialized laboratory facilities' },
    { id: 'pilot-facilities', name: 'Pilot Facilities', description: 'Pilot testing and scale-up facilities' },
    { id: 'grant-writing', name: 'Grant Writing', description: 'Grant application preparation and submission support' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // If provider OTC changes, update available services
    if (field === 'providerOTC') {
      const services = serviceDirectory.filter(s => s.otcId === value);
      setSelectedService(null);
    }
  };

  const handleServiceCategoryChange = (categoryId) => {
    handleChange('serviceCategory', categoryId);
    // Find matching services from the selected provider
    if (formData.providerOTC) {
      const matchingService = serviceDirectory.find(
        s => s.otcId === formData.providerOTC && 
        s.category.toLowerCase().includes(categoryId.replace('-', ' '))
      );
      setSelectedService(matchingService);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    alert('Service request submitted successfully! The provider OTC will respond within 5 business days.');
    navigate('/otc/services');
  };

  const availableOTCs = otcs.filter(otc => otc.status === 'active');
  const availableProjects = detailedProjects;

  // Get services from selected provider
  const providerServices = formData.providerOTC 
    ? serviceDirectory.filter(s => s.otcId === formData.providerOTC)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button onClick={() => navigate('/otc/services')} className="btn-secondary mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Services
        </button>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Inter-OTC Service</h1>
          <p className="text-gray-600">Process Flow: OTC-FLOW-007 • Inter-OTC Collaboration</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Inter-OTC Service Request Process</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Step 1:</span> Select service category and provider OTC &rarr; 
              <span className="font-medium"> Step 2:</span> Link to existing project &rarr; 
              <span className="font-medium"> Step 3:</span> Provide detailed requirements &rarr; 
              <span className="font-medium"> Response:</span> Provider acknowledges within 5 business days &rarr; 
              <span className="font-medium"> Delivery:</span> Service delivered per agreed timeline
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Selection */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Service Selection</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="label">Service Category *</label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => handleServiceCategoryChange(e.target.value)}
                    className="input"
                    required
                  >
                    <option value="">Select a service category...</option>
                    {serviceCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {formData.serviceCategory && (
                    <p className="text-sm text-gray-600 mt-2">
                      {serviceCategories.find(c => c.id === formData.serviceCategory)?.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">Provider OTC *</label>
                  <select
                    value={formData.providerOTC}
                    onChange={(e) => handleChange('providerOTC', e.target.value)}
                    className="input"
                    required
                  >
                    <option value="">Select provider OTC...</option>
                    {availableOTCs.map(otc => (
                      <option key={otc.id} value={otc.id}>
                        {otc.name} - {otc.institution}
                      </option>
                    ))}
                  </select>
                  {formData.providerOTC && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-900">
                        {availableOTCs.find(o => o.id === formData.providerOTC)?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {availableOTCs.find(o => o.id === formData.providerOTC)?.city}
                      </p>
                    </div>
                  )}
                </div>

                {/* Available Services from Provider */}
                {providerServices.length > 0 && (
                  <div>
                    <label className="label">Available Services from this OTC</label>
                    <div className="space-y-2">
                      {providerServices.map(service => (
                        <div 
                          key={service.id}
                          className="p-3 border border-gray-200 rounded-xl hover:border-blue-400 cursor-pointer transition-all"
                          onClick={() => setSelectedService(service)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-900">{service.serviceName}</p>
                              <p className="text-sm text-gray-600">{service.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Delivery: {service.deliveryTime}
                              </p>
                            </div>
                            <span className="badge badge-info text-xs">
                              {service.pricing.amount.toLocaleString()} EGP
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Linkage */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Project Linkage</h3>
              
              <div>
                <label className="label">Link to Existing Project (Optional)</label>
                <select
                  value={formData.projectId}
                  onChange={(e) => handleChange('projectId', e.target.value)}
                  className="input"
                >
                  <option value="">No project linkage</option>
                  {availableProjects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.id} - {project.title}
                    </option>
                  ))}
                </select>
                {formData.projectId && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm font-medium text-gray-900">
                      {availableProjects.find(p => p.id === formData.projectId)?.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {availableProjects.find(p => p.id === formData.projectId)?.pathway} • 
                      {availableProjects.find(p => p.id === formData.projectId)?.status}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Service Details */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4">3. Service Requirements</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="label">Detailed Service Description *</label>
                  <textarea
                    value={formData.serviceDescription}
                    onChange={(e) => handleChange('serviceDescription', e.target.value)}
                    rows={6}
                    placeholder="Provide detailed description of the service you need, including specific requirements, scope, and expected outcomes..."
                    className="input"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Be as specific as possible to help the provider understand your needs
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Required Timeline *</label>
                    <input
                      type="text"
                      value={formData.timeline}
                      onChange={(e) => handleChange('timeline', e.target.value)}
                      placeholder="e.g., 2 weeks, 30 days, by March 15"
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">Budget Discussion</label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => handleChange('budget', e.target.value)}
                      placeholder="e.g., up to 25,000 EGP"
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Expected Deliverables *</label>
                  <textarea
                    value={formData.deliverables}
                    onChange={(e) => handleChange('deliverables', e.target.value)}
                    rows={4}
                    placeholder="List the specific deliverables you expect (e.g., reports, analyses, documents, access arrangements)..."
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="label">Attachments (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">Supporting documents, specifications, etc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Response Time Info */}
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Expected Response Time
              </h3>
              <div className="text-center py-4">
                <p className="text-4xl font-bold text-blue-600 mb-2">5</p>
                <p className="text-sm text-gray-600">Business Days</p>
              </div>
              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                Provider OTC will acknowledge your request and provide initial response within 5 business days
              </p>
            </div>

            {/* Selected Service Details */}
            {selectedService && (
              <div className="card bg-green-50 border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-3">Selected Service</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">{selectedService.serviceName}</p>
                    <p className="text-sm text-gray-600">{selectedService.category}</p>
                  </div>
                  <div className="pt-3 border-t border-green-300 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Time:</span>
                      <span className="font-semibold">{selectedService.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pricing:</span>
                      <span className="font-semibold text-green-700">
                        {selectedService.pricing.amount.toLocaleString()} EGP
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Capacity:</span>
                      <p className="text-gray-700 mt-1">{selectedService.capacity}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Guidelines */}
            <div className="card bg-yellow-50 border border-yellow-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                Request Guidelines
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Provide clear, detailed requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Link to relevant project when applicable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Include reasonable timeline expectations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Attach supporting documentation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Provider will respond with quote and timeline</span>
                </li>
              </ul>
            </div>

            {/* Cost Estimate */}
            {selectedService && (
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Cost Estimate
                </h3>
                <div className="text-center py-4">
                  <p className="text-3xl font-bold text-blue-600 mb-1">
                    {selectedService.pricing.amount.toLocaleString()} EGP
                  </p>
                  <p className="text-sm text-gray-600">{selectedService.pricing.unit}</p>
                  {selectedService.pricing.estimatedHours && (
                    <p className="text-xs text-gray-500 mt-2">
                      Estimated: {selectedService.pricing.estimatedHours}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Final quote will be provided by provider OTC based on specific requirements
                </p>
              </div>
            )}

            {/* Process Flow */}
            <div className="card bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-3">Process Flow</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</div>
                  <span className="text-gray-700">Submit request</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</div>
                  <span className="text-gray-700">Provider acknowledges (5 days)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</div>
                  <span className="text-gray-700">Quote & timeline provided</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0">4</div>
                  <span className="text-gray-700">Accept quote</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0">5</div>
                  <span className="text-gray-700">Service delivery</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center mr-2 flex-shrink-0">6</div>
                  <span className="text-gray-700">Review & payment</span>
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="space-y-3">
              <button type="submit" className="btn-success w-full">
                <Send className="w-5 h-5 mr-2" />
                Submit Request
              </button>
              <button 
                type="button" 
                className="btn-secondary w-full"
                onClick={() => navigate('/otc/services')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
