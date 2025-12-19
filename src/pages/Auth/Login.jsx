import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LogIn, ArrowLeft } from 'lucide-react';
import { mockUser } from '../../mockData';

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const portal = searchParams.get('portal') || 'nctc';
  
  const [formData, setFormData] = useState({
    email: portal === 'otc' ? 'director@cairo.otc.eg' : 'ahmed.hassan@nctc.gov.eg',
    password: 'demo123',
    portal: portal
  });

  const handlePortalChange = (newPortal) => {
    setFormData({
      email: newPortal === 'otc' ? 'director@cairo.otc.eg' : 'ahmed.hassan@nctc.gov.eg',
      password: 'demo123',
      portal: newPortal
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create user object based on selected portal
    const user = {
      ...mockUser,
      role: formData.portal,
      email: formData.email,
      name: formData.portal === 'otc' ? 'Dr. Sarah Ahmed' : 'Ahmed Hassan',
      institution: formData.portal === 'otc' ? 'Cairo University OTC' : 'NCTC Central'
    };
    
    setUser(user);
    
    // Navigate based on selected portal in form (not URL param)
    if (formData.portal === 'otc') {
      navigate('/otc/dashboard');
    } else {
      navigate('/nctc/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-white mb-8 hover:text-blue-200 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="card bg-white">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">
              Sign in to {portal === 'otc' ? 'OTC' : 'NCTC'} Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">Portal</label>
              <select
                value={formData.portal}
                onChange={(e) => handlePortalChange(e.target.value)}
                className="input"
              >
                <option value="nctc">NCTC Central Portal</option>
                <option value="otc">OTC Portal</option>
              </select>
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Register here
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-900 font-medium mb-2">Demo Credentials:</p>
            {formData.portal === 'nctc' ? (
              <>
                <p className="text-xs text-blue-700">Email: ahmed.hassan@nctc.gov.eg</p>
                <p className="text-xs text-blue-700">Password: demo123</p>
                <p className="text-xs text-blue-600 mt-1 italic">Role: NCTC Administrator</p>
              </>
            ) : (
              <>
                <p className="text-xs text-blue-700">Email: director@cairo.otc.eg</p>
                <p className="text-xs text-blue-700">Password: demo123</p>
                <p className="text-xs text-blue-600 mt-1 italic">Role: OTC Director (Cairo University)</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
