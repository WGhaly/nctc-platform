import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    role: 'otc',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock registration - show success and redirect to login
    alert('Registration successful! Please wait for admin approval.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Link to="/" className="inline-flex items-center text-white mb-8 hover:text-blue-200 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <div className="card bg-white">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Register for NCTC Platform Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="Dr. Ahmed Hassan"
                  required
                />
              </div>

              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                  placeholder="your.email@university.eg"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">Institution</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="input"
                  placeholder="Cairo University"
                  required
                />
              </div>

              <div>
                <label className="label">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input"
                  required
                >
                  <option value="otc">OTC Staff</option>
                  <option value="researcher">Researcher</option>
                  <option value="nctc">NCTC Staff (Requires Approval)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input"
                placeholder="+20 123 456 7890"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input"
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="input"
                  placeholder="Re-enter password"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" required />
              <label className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="btn-primary w-full">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
