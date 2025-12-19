import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Network, BarChart3, Users, Globe, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-900 font-bold text-2xl">N</span>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">NCTC</h1>
              <p className="text-xs text-blue-200">Technology Transfer Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 border-2 border-white text-white hover:bg-white hover:text-blue-900 inline-flex items-center justify-center gap-2 min-w-[120px]">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              National Center for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Technology Commercialization
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Egypt's comprehensive ecosystem for transforming academic research into commercial success
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link to="/login" className="btn-primary text-lg px-8 py-3">
                Access Platform
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <a href="#about" className="px-8 py-3 rounded-xl font-semibold transition-all duration-200 border-2 border-white text-white hover:bg-white hover:text-blue-900 inline-flex items-center justify-center gap-2 text-lg">
                Learn More
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { label: 'Active OTCs', value: '58', icon: Building2 },
              { label: 'Innovation Clusters', value: '6', icon: Network },
              { label: 'Active Projects', value: '127', icon: BarChart3 },
              { label: 'Total Revenue', value: '24.5M EGP', icon: Zap },
            ].map((stat, index) => (
              <div key={index} className="card bg-white/10 backdrop-blur-md border border-white/20 text-center">
                <stat.icon className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="about" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Comprehensive Ecosystem Support
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: 'OTC Network',
                description: 'Connect with 58 active Offices of Technology Commercialization across Egypt\'s leading institutions'
              },
              {
                icon: Network,
                title: '6×6 Matrix Model',
                description: '6 Innovation Clusters × 6 Functional Pillars creating 36 strategic capability positions'
              },
              {
                icon: Users,
                title: 'Cluster Coordination',
                description: 'Expert coordinators leading each innovation cluster for specialized support'
              },
              {
                icon: BarChart3,
                title: 'Performance Tracking',
                description: 'Comprehensive KPI monitoring and 6-month performance reviews'
              },
              {
                icon: Globe,
                title: 'Collaboration Hub',
                description: 'Facilitate inter-OTC services and multi-institution projects'
              },
              {
                icon: Zap,
                title: 'Fast-Track Support',
                description: 'Streamlined processes from disclosure to commercialization'
              },
            ].map((feature, index) => (
              <div key={index} className="card bg-white/10 backdrop-blur-md border border-white/20">
                <feature.icon className="w-12 h-12 text-blue-300 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-blue-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portal Selection */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Choose Your Portal
          </h2>
          <p className="text-blue-200 text-center mb-12 text-lg">
            Access the platform with your designated role
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/login?portal=nctc" className="card bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-400 hover:shadow-2xl hover:scale-105 transition-all duration-200">
              <Building2 className="w-16 h-16 text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">NCTC Portal</h3>
              <p className="text-blue-100 mb-4">
                For NCTC central management team
              </p>
              <ul className="text-blue-100 space-y-2 text-sm mb-6">
                <li>• OTC network management</li>
                <li>• Performance monitoring</li>
                <li>• Training coordination</li>
                <li>• Quality & compliance oversight</li>
              </ul>
              <div className="btn-primary bg-white text-blue-700 hover:bg-blue-50 inline-flex items-center">
                Access NCTC Portal
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>

            <Link to="/login?portal=otc" className="card bg-gradient-to-br from-cyan-600 to-blue-600 border-2 border-cyan-400 hover:shadow-2xl hover:scale-105 transition-all duration-200">
              <Network className="w-16 h-16 text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">OTC Portal</h3>
              <p className="text-blue-100 mb-4">
                For Office of Technology Commercialization staff
              </p>
              <ul className="text-blue-100 space-y-2 text-sm mb-6">
                <li>• Manage disclosures & projects</li>
                <li>• IP protection coordination</li>
                <li>• Inter-OTC collaboration</li>
                <li>• Performance reporting</li>
              </ul>
              <div className="btn-primary bg-white text-cyan-700 hover:bg-blue-50 inline-flex items-center">
                Access OTC Portal
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-blue-200">
          <p>&copy; 2024 National Center for Technology Commercialization (NCTC)</p>
          <p className="text-sm mt-2">Academy of Scientific Research and Technology (ASRT) - Egypt</p>
        </div>
      </footer>
    </div>
  );
}
