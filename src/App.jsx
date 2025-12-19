import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Landing & Auth
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// NCTC Portal
import NCTCDashboard from './pages/NCTC/Dashboard';
import OTCApplications from './pages/NCTC/OTCManagement/Applications';
import ApplicationDetail from './pages/NCTC/OTCManagement/ApplicationDetail';
import MatrixAssignments from './pages/NCTC/OTCManagement/MatrixAssignments';
import FundingManagement from './pages/NCTC/OTCManagement/FundingManagement';
import PerformanceDashboard from './pages/NCTC/Performance/Dashboard';
import PerformanceReviews from './pages/NCTC/Performance/Reviews';
import OTCPerformanceDetail from './pages/NCTC/Performance/OTCDetail';
import TrainingManagement from './pages/NCTC/Training/Management';
import ClusterManagement from './pages/NCTC/Clusters/Management';
import GapManagement from './pages/NCTC/Gaps/Management';
import PlatformAdmin from './pages/NCTC/Platform/Admin';
import QualityCompliance from './pages/NCTC/Quality/Compliance';
import NCTCReports from './pages/NCTC/Reports/Reports';

// OTC Portal
import OTCDashboard from './pages/OTC/Dashboard';
import DisclosuresList from './pages/OTC/Disclosures/List';
import DisclosureDetail from './pages/OTC/Disclosures/Detail';
import NewDisclosure from './pages/OTC/Disclosures/New';
import DisclosureEvaluation from './pages/OTC/Disclosures/Evaluation';
import IPManagement from './pages/OTC/IP/Management';
import ProjectsList from './pages/OTC/Projects/List';
import ProjectDetail from './pages/OTC/Projects/Detail';
import ServicesList from './pages/OTC/Services/List';
import ServiceRequest from './pages/OTC/Services/Request';
import OTCReporting from './pages/OTC/Reporting/Reporting';
import CollaborationHub from './pages/OTC/Collaboration/Hub';
import Resources from './pages/OTC/Resources/Resources';
import MatrixPositions from './pages/OTC/Matrix/Positions';

// Cluster Coordinator Portal
import CCDashboard from './pages/CC/Dashboard';
import CCClusterManagement from './pages/CC/ClusterManagement';
import CCReports from './pages/CC/Reports';

// Layout
import ProtectedRoute from './components/Layout/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        {/* NCTC Portal Routes */}
        <Route path="/nctc" element={<ProtectedRoute user={user} requiredRole="nctc" />}>
          <Route index element={<Navigate to="/nctc/dashboard" replace />} />
          <Route path="dashboard" element={<NCTCDashboard />} />
          
          {/* OTC Management */}
          <Route path="otc-management">
            <Route index element={<Navigate to="/nctc/otc-management/applications" replace />} />
            <Route path="applications" element={<OTCApplications />} />
            <Route path="applications/:id" element={<ApplicationDetail />} />
            <Route path="matrix-assignments" element={<MatrixAssignments />} />
            <Route path="funding" element={<FundingManagement />} />
          </Route>
          
          {/* Performance Monitoring */}
          <Route path="performance">
            <Route index element={<Navigate to="/nctc/performance/dashboard" replace />} />
            <Route path="dashboard" element={<PerformanceDashboard />} />
            <Route path="reviews" element={<PerformanceReviews />} />
            <Route path="reviews/:otcId" element={<OTCPerformanceDetail />} />
          </Route>
          
          {/* Other NCTC Routes */}
          <Route path="training" element={<TrainingManagement />} />
          <Route path="clusters" element={<ClusterManagement />} />
          <Route path="gaps" element={<GapManagement />} />
          <Route path="platform-admin" element={<PlatformAdmin />} />
          <Route path="quality" element={<QualityCompliance />} />
          <Route path="reports" element={<NCTCReports />} />
        </Route>

        {/* OTC Portal Routes */}
        <Route path="/otc" element={<ProtectedRoute user={user} requiredRole="otc" />}>
          <Route index element={<Navigate to="/otc/dashboard" replace />} />
          <Route path="dashboard" element={<OTCDashboard />} />
          
          {/* Disclosures */}
          <Route path="disclosures">
            <Route index element={<DisclosuresList />} />
            <Route path="new" element={<NewDisclosure />} />
            <Route path=":id" element={<DisclosureDetail />} />
            <Route path=":id/evaluate" element={<DisclosureEvaluation />} />
          </Route>
          
          {/* IP Management */}
          <Route path="ip-management" element={<IPManagement />} />
          
          {/* Projects */}
          <Route path="projects">
            <Route index element={<ProjectsList />} />
            <Route path=":id" element={<ProjectDetail />} />
          </Route>
          
          {/* Services */}
          <Route path="services">
            <Route index element={<ServicesList />} />
            <Route path="request" element={<ServiceRequest />} />
          </Route>
          
          {/* Other OTC Routes */}
          <Route path="reporting" element={<OTCReporting />} />
          <Route path="collaboration" element={<CollaborationHub />} />
          <Route path="resources" element={<Resources />} />
          <Route path="matrix" element={<MatrixPositions />} />
        </Route>

        {/* Cluster Coordinator Portal Routes */}
        <Route path="/cc" element={<ProtectedRoute user={user} requiredRole="cc" />}>
          <Route index element={<Navigate to="/cc/dashboard" replace />} />
          <Route path="dashboard" element={<CCDashboard />} />
          <Route path="cluster-management" element={<CCClusterManagement />} />
          <Route path="reports" element={<CCReports />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
