import fs from 'fs';
import path from 'path';

const template = (title, desc) => `import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

export default function ${title.replace(/[^a-zA-Z0-9]/g, '')}() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">${title}</h1>
          <p className="text-gray-600">${desc}</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add New
        </button>
      </div>

      <div className="grid gap-6">
        <div className="card">
          <p className="text-gray-600 mb-4">This screen displays ${title.toLowerCase()} information and management tools.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-900">15</p>
              <p className="text-sm text-blue-700">Active Items</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-900">8</p>
              <p className="text-sm text-green-700">Completed</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-900">3</p>
              <p className="text-sm text-yellow-700">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const pages = [
  ['src/pages/NCTC/OTCManagement/MatrixAssignments.jsx', 'Matrix Assignments', 'Manage 6x6 matrix position assignments'],
  ['src/pages/NCTC/OTCManagement/FundingManagement.jsx', 'Funding Management', 'Allocate and track OTC funding cycles'],
  ['src/pages/NCTC/Performance/Dashboard.jsx', 'Performance Dashboard', 'Ecosystem performance overview'],
  ['src/pages/NCTC/Performance/Reviews.jsx', 'Performance Reviews', 'OTC performance review management'],
  ['src/pages/NCTC/Performance/OTCDetail.jsx', 'OTC Performance Detail', 'Detailed OTC performance analysis'],
  ['src/pages/NCTC/Training/Management.jsx', 'Training Management', 'Manage training programs and schedules'],
  ['src/pages/NCTC/Clusters/Management.jsx', 'Cluster Management', 'Oversee innovation cluster operations'],
  ['src/pages/NCTC/Gaps/Management.jsx', 'Gap Management', 'Identify and address capability gaps'],
  ['src/pages/NCTC/Platform/Admin.jsx', 'Platform Administration', 'User and system management'],
  ['src/pages/NCTC/Quality/Compliance.jsx', 'Quality & Compliance', 'Audit and compliance oversight'],
  ['src/pages/NCTC/Reports/Reports.jsx', 'Reports & Analytics', 'Generate and view ecosystem reports'],
  
  ['src/pages/OTC/Dashboard.jsx', 'OTC Dashboard', 'Your OTC performance overview'],
  ['src/pages/OTC/Disclosures/List.jsx', 'Disclosures', 'Manage invention disclosures'],
  ['src/pages/OTC/Disclosures/Detail.jsx', 'Disclosure Detail', 'View and manage disclosure details'],
  ['src/pages/OTC/Disclosures/New.jsx', 'New Disclosure', 'Submit new invention disclosure'],
  ['src/pages/OTC/Disclosures/Evaluation.jsx', 'Disclosure Evaluation', 'Evaluate invention disclosure'],
  ['src/pages/OTC/IP/Management.jsx', 'IP Management', 'Track and manage IP portfolio'],
  ['src/pages/OTC/Projects/List.jsx', 'Projects', 'Manage commercialization projects'],
  ['src/pages/OTC/Projects/Detail.jsx', 'Project Detail', 'View and manage project details'],
  ['src/pages/OTC/Services/List.jsx', 'Services', 'Inter-OTC service management'],
  ['src/pages/OTC/Services/Request.jsx', 'Service Request', 'Request services from other OTCs'],
  ['src/pages/OTC/Reporting/Reporting.jsx', 'Reporting', 'Submit 6-month and 2-year reports'],
  ['src/pages/OTC/Collaboration/Hub.jsx', 'Collaboration Hub', 'Multi-OTC project collaboration'],
  ['src/pages/OTC/Resources/Resources.jsx', 'Resources', 'Training materials and documentation'],
  ['src/pages/OTC/Matrix/Positions.jsx', 'Matrix Positions', 'Your assigned cluster and pillar positions'],
  
  ['src/pages/CC/Dashboard.jsx', 'Cluster Coordinator Dashboard', 'Cluster overview and management'],
  ['src/pages/CC/ClusterManagement.jsx', 'Cluster Management', 'Manage cluster OTCs and activities'],
  ['src/pages/CC/Reports.jsx', 'Cluster Reports', 'Submit cluster coordination reports'],
];

pages.forEach(([file, title, desc]) => {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, template(title, desc));
    console.log('Created:', file);
  }
});

console.log('Done!');
