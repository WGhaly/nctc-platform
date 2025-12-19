#!/usr/bin/env node

/**
 * Page Generator Script for NCTC Platform
 * This script generates all remaining page components with realistic mock functionality
 */

const fs = require('fs');
const path = require('path');

// Template for generic pages
const createPageTemplate = (title, description, hasTable = false) => `
import { Link } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';

export default function ${title.replace(/\s+/g, '')}() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">${title}</h1>
          <p className="text-gray-600">${description}</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Add New
        </button>
      </div>

      <div className="card">
        <p className="text-gray-600">Content for ${title} will be displayed here.</p>
        <p className="text-sm text-gray-500 mt-4">This is a mock-up screen demonstrating the ${title} functionality.</p>
      </div>
    </div>
  );
}
`;

// Pages to generate
const pages = [
  // NCTC Pages
  { path: 'NCTC/OTCManagement/ApplicationDetail', title: 'Application Detail', desc: 'Detailed application review' },
  { path: 'NCTC/OTCManagement/MatrixAssignments', title: 'Matrix Assignments', desc: 'Manage 6x6 matrix positions' },
  { path: 'NCTC/OTCManagement/FundingManagement', title: 'Funding Management', desc: 'Allocate and track funding' },
  { path: 'NCTC/Performance/Dashboard', title: 'Performance Dashboard', desc: 'Monitor ecosystem performance' },
  { path: 'NCTC/Performance/Reviews', title: 'Performance Reviews', desc: '6-month and 2-year reviews' },
  { path: 'NCTC/Performance/OTCDetail', title: 'OTC Performance Detail', desc: 'Detailed OTC performance' },
  { path: 'NCTC/Training/Management', title: 'Training Management', desc: 'Manage training programs' },
  { path: 'NCTC/Clusters/Management', title: 'Cluster Management', desc: 'Oversee innovation clusters' },
  { path: 'NCTC/Gaps/Management', title: 'Gap Management', desc: 'Identify and address capability gaps' },
  { path: 'NCTC/Platform/Admin', title: 'Platform Administration', desc: 'User and system management' },
  { path: 'NCTC/Quality/Compliance', title: 'Quality & Compliance', desc: 'Audits and compliance monitoring' },
  { path: 'NCTC/Reports/Reports', title: 'Reports', desc: 'Generate and view reports' },
  
  // OTC Pages  
  { path: 'OTC/Dashboard', title: 'OTC Dashboard', desc: 'Your OTC overview' },
  { path: 'OTC/Disclosures/List', title: 'Disclosures', desc: 'Manage invention disclosures' },
  { path: 'OTC/Disclosures/Detail', title: 'Disclosure Detail', desc: 'View disclosure details' },
  { path: 'OTC/Disclosures/New', title: 'New Disclosure', desc: 'Submit new invention disclosure' },
  { path: 'OTC/Disclosures/Evaluation', title: 'Disclosure Evaluation', desc: 'Evaluate disclosure' },
  { path: 'OTC/IP/Management', title: 'IP Management', desc: 'Track IP portfolio' },
  { path: 'OTC/Projects/List', title: 'Projects', desc: 'Manage commercialization projects' },
  { path: 'OTC/Projects/Detail', title: 'Project Detail', desc: 'View project details' },
  { path: 'OTC/Services/List', title: 'Services', desc: 'Inter-OTC services' },
  { path: 'OTC/Services/Request', title: 'Service Request', desc: 'Request services from other OTCs' },
  { path: 'OTC/Reporting/Reporting', title: 'Reporting', desc: 'Submit and view reports' },
  { path: 'OTC/Collaboration/Hub', title: 'Collaboration Hub', desc: 'Multi-OTC collaboration' },
  { path: 'OTC/Resources/Resources', title: 'Resources', desc: 'Training materials and guides' },
  { path: 'OTC/Matrix/Positions', title: 'Matrix Positions', desc: 'Your assigned matrix positions' },
  
  // CC Pages
  { path: 'CC/Dashboard', title: 'Cluster Coordinator Dashboard', desc: 'Cluster overview' },
  { path: 'CC/ClusterManagement', title: 'Cluster Management', desc: 'Manage your cluster' },
  { path: 'CC/Reports', title: 'Cluster Reports', desc: 'Submit cluster reports' },
];

console.log('Generating page files...');
pages.forEach(page => {
  const dir = path.join(__dirname, 'src', 'pages', page.path.split('/').slice(0, -1).join('/'));
  const file = path.join(__dirname, 'src', 'pages', page.path + '.jsx');
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = createPageTemplate(page.title, page.desc);
  fs.writeFileSync(file, content);
  console.log(\`Created: \${file}\`);
});

console.log('All pages generated successfully!');
`;

// Save the script
fs.writeFileSync(path.join(__dirname, 'generatePages.js'), script);
console.log('Script created: generatePages.js');
