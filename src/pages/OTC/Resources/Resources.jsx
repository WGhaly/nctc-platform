import { useState } from 'react';
import { handleRequestUpload, handleViewResourcePreview, handleDownloadResource } from '../../../utils/quickActions';
import Modal from '../../../components/Modal';
import toast from '../../../utils/toast';
import { Search, Filter, Download, FileText, Video, BookOpen, FileSpreadsheet, Eye, Star, Clock, Upload, TrendingUp } from 'lucide-react';

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Resource categories
  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen, count: 127 },
    { id: 'sops', name: 'SOPs', icon: FileText, count: 24 },
    { id: 'templates', name: 'Templates', icon: FileSpreadsheet, count: 18 },
    { id: 'training', name: 'Training Materials', icon: Video, count: 32 },
    { id: 'best-practices', name: 'Best Practices', icon: Star, count: 15 },
    { id: 'legal', name: 'Legal Forms', icon: FileText, count: 22 },
    { id: 'marketing', name: 'Marketing Materials', icon: TrendingUp, count: 16 }
  ];

  // Mock resources
  const resources = [
    {
      id: 1,
      title: 'Disclosure Intake SOP',
      category: 'sops',
      type: 'PDF',
      size: '2.4 MB',
      updated: '2024-11-15',
      views: 342,
      rating: 4.8,
      description: 'Standard operating procedure for receiving and processing invention disclosures'
    },
    {
      id: 2,
      title: 'Evaluation Scorecard Template',
      category: 'templates',
      type: 'Excel',
      size: '156 KB',
      updated: '2024-11-20',
      views: 289,
      rating: 4.9,
      description: 'Template for conducting technical, market, and IP evaluation of disclosures'
    },
    {
      id: 3,
      title: 'IP Basics Training Video',
      category: 'training',
      type: 'Video',
      size: '245 MB',
      updated: '2024-10-05',
      views: 567,
      rating: 4.7,
      description: 'Introduction to intellectual property management for OTC staff'
    },
    {
      id: 4,
      title: 'Licensing Agreement Template',
      category: 'legal',
      type: 'Word',
      size: '89 KB',
      updated: '2024-11-30',
      views: 423,
      rating: 4.9,
      description: 'Standard exclusive and non-exclusive licensing agreement templates'
    },
    {
      id: 5,
      title: 'Technology Marketing One-Pager',
      category: 'marketing',
      type: 'PowerPoint',
      size: '1.2 MB',
      updated: '2024-11-10',
      views: 198,
      rating: 4.6,
      description: 'Template for creating one-page technology marketing materials'
    },
    {
      id: 6,
      title: 'Best Practices in Inventor Engagement',
      category: 'best-practices',
      type: 'PDF',
      size: '3.1 MB',
      updated: '2024-10-20',
      views: 256,
      rating: 4.8,
      description: 'Guide to effective communication and collaboration with inventors'
    },
    {
      id: 7,
      title: 'Financial Reporting Template',
      category: 'templates',
      type: 'Excel',
      size: '234 KB',
      updated: '2024-12-01',
      views: 412,
      rating: 4.7,
      description: '6-month and annual financial reporting templates for NCTC'
    },
    {
      id: 8,
      title: 'Patent Filing Process SOP',
      category: 'sops',
      type: 'PDF',
      size: '1.8 MB',
      updated: '2024-11-25',
      views: 301,
      rating: 4.9,
      description: 'Step-by-step procedure for filing patent applications'
    },
    {
      id: 9,
      title: 'Spin-off Formation Guide',
      category: 'best-practices',
      type: 'PDF',
      size: '4.2 MB',
      updated: '2024-09-15',
      views: 187,
      rating: 4.6,
      description: 'Comprehensive guide to forming and supporting spin-off companies'
    },
    {
      id: 10,
      title: 'Conflict of Interest Form',
      category: 'legal',
      type: 'Word',
      size: '67 KB',
      updated: '2024-11-05',
      views: 534,
      rating: 4.5,
      description: 'Standard conflict of interest disclosure form'
    }
  ];

  // Recently accessed
  const recentlyAccessed = resources.slice(0, 4);

  // Recommended resources
  const recommended = resources.filter(r => r.rating >= 4.8).slice(0, 3);

  // Filter resources
  const filteredResources = resources.filter(resource => {
    if (selectedCategory !== 'all' && resource.category !== selectedCategory) return false;
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getFileTypeColor = (type) => {
    const colors = {
      PDF: 'bg-red-100 text-red-800',
      Excel: 'bg-green-100 text-green-800',
      Word: 'bg-blue-100 text-blue-800',
      PowerPoint: 'bg-orange-100 text-orange-800',
      Video: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources</h1>
          <p className="text-gray-600">Training materials and documentation library</p>
        </div>
        <button onClick={handleRequestUpload} className="btn btn-primary flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Request Upload
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <button onClick={() => setShowFilters(true)} className="btn btn-secondary flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-medium">Advanced Filters</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Categories</h2>
        <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${
                  selectedCategory === category.id ? 'text-blue-600' : 'text-gray-600'
                }`} />
                <p className={`text-xs font-medium text-center ${
                  selectedCategory === category.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {category.name}
                </p>
                <p className="text-xs text-gray-500 text-center mt-1">{category.count}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Resources List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className="text-sm text-gray-600">{filteredResources.length} resources</span>
            </div>

            <div className="space-y-3">
              {filteredResources.map(resource => (
                <div key={resource.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getFileTypeColor(resource.type)}`}>
                          {resource.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {resource.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          {resource.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Updated {new Date(resource.updated).toLocaleDateString()}
                        </span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => handleViewResourcePreview(resource.title)} className="btn btn-sm btn-secondary flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button onClick={() => handleDownloadResource(resource.title, resource.size)} className="btn btn-sm btn-primary flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recently Accessed */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Recently Accessed
            </h3>
            <div className="space-y-3">
              {recentlyAccessed.map(resource => (
                <div key={resource.id} className="pb-3 border-b border-gray-100 last:border-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">{resource.title}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-xs ${getFileTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                    <button onClick={() => handleViewResourcePreview(resource.title)} className="text-xs text-blue-600 hover:text-blue-800">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              Recommended
            </h3>
            <div className="space-y-3">
              {recommended.map(resource => (
                <div key={resource.id} className="bg-white rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">{resource.title}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-gray-600">{resource.rating}</span>
                    </div>
                    <button onClick={() => handleViewResourcePreview(resource.title)} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Usage</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Resources Viewed</span>
                <span className="font-semibold text-gray-900">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Downloads</span>
                <span className="font-semibold text-gray-900">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Favorites</span>
                <span className="font-semibold text-gray-900">7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
