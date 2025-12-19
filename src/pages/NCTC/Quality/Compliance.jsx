import { useState } from 'react';
import { handleScheduleAudit, handleGenerateComplianceReport } from '../../../utils/quickActions';
import { Shield, CheckCircle2, XCircle, AlertTriangle, FileText, Calendar, Award, TrendingUp, Users, BookOpen, Clock } from 'lucide-react';
import { otcs } from '../../../mockData';

export default function QualityCompliance() {
  const [selectedOTC, setSelectedOTC] = useState('all');

  // Mock compliance data
  const complianceStats = {
    overallRate: 94,
    sopCompliance: 96,
    policyAdherence: 92,
    documentControl: 95,
    trainingCompletion: 91
  };

  // Mock SOP compliance checklist
  const sopChecklist = [
    { id: 1, item: 'Disclosure Intake Process', status: 'compliant', lastAudit: '2024-11-15', compliantOTCs: 56, totalOTCs: 58 },
    { id: 2, item: 'Evaluation Procedures', status: 'compliant', lastAudit: '2024-11-10', compliantOTCs: 55, totalOTCs: 58 },
    { id: 3, item: 'IP Protection Guidelines', status: 'minor-issues', lastAudit: '2024-11-20', compliantOTCs: 52, totalOTCs: 58 },
    { id: 4, item: 'Licensing Agreement Templates', status: 'compliant', lastAudit: '2024-10-25', compliantOTCs: 57, totalOTCs: 58 },
    { id: 5, item: 'Financial Reporting Standards', status: 'compliant', lastAudit: '2024-11-30', compliantOTCs: 58, totalOTCs: 58 },
    { id: 6, item: 'Conflict of Interest Policy', status: 'minor-issues', lastAudit: '2024-10-15', compliantOTCs: 53, totalOTCs: 58 }
  ];

  // Mock audit schedule
  const auditSchedule = [
    { id: 1, otc: 'Cairo University TTO', type: 'Annual Compliance', date: '2025-01-15', status: 'scheduled' },
    { id: 2, otc: 'Alexandria University OTC', type: 'Process Review', date: '2025-01-20', status: 'scheduled' },
    { id: 3, otc: 'Ain Shams Innovation Hub', type: 'Document Control', date: '2024-12-20', status: 'in-progress' },
    { id: 4, otc: 'Assiut University TTC', type: 'Annual Compliance', date: '2024-11-28', status: 'completed', score: 88 },
    { id: 5, otc: 'Mansoura University Innovation Office', type: 'Process Review', date: '2024-11-15', status: 'completed', score: 95 }
  ];

  // Mock non-compliance incidents
  const incidents = [
    {
      id: 'INC-2024-001',
      otc: 'Tanta University TTO',
      type: 'Document Control',
      severity: 'low',
      date: '2024-11-25',
      description: 'Missing signatures on 2 evaluation forms',
      status: 'resolved',
      correctiveAction: 'Forms updated and signed, staff reminded of procedures'
    },
    {
      id: 'INC-2024-002',
      otc: 'Suez University Innovation',
      type: 'Training Compliance',
      severity: 'medium',
      date: '2024-11-18',
      description: '3 staff members overdue for annual compliance training',
      status: 'in-progress',
      correctiveAction: 'Training sessions scheduled for Dec 15'
    },
    {
      id: 'INC-2024-003',
      otc: 'Fayoum University TTO',
      type: 'SOP Adherence',
      severity: 'low',
      date: '2024-10-30',
      description: 'Evaluation timeline exceeded by 5 days',
      status: 'resolved',
      correctiveAction: 'Process review conducted, timeline management improved'
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      'compliant': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle2 },
      'minor-issues': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
      'non-compliant': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };
    return badges[status] || badges.compliant;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quality & Compliance</h1>
          <p className="text-gray-600">Monitor and manage compliance across the ecosystem</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleScheduleAudit} className="btn btn-primary flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Schedule Audit
          </button>
          <button onClick={handleGenerateComplianceReport} className="btn btn-primary flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Overall Compliance Metrics */}
      <div className="grid md:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">↑ 2%</span>
          </div>
          <p className="text-3xl font-bold text-blue-900">{complianceStats.overallRate}%</p>
          <p className="text-sm text-blue-700 font-medium">Overall Compliance</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{complianceStats.sopCompliance}%</p>
          <p className="text-sm text-gray-600">SOP Compliance</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{complianceStats.policyAdherence}%</p>
          <p className="text-sm text-gray-600">Policy Adherence</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{complianceStats.documentControl}%</p>
          <p className="text-sm text-gray-600">Document Control</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 text-teal-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{complianceStats.trainingCompletion}%</p>
          <p className="text-sm text-gray-600">Training Complete</p>
        </div>
      </div>

      {/* SOP Compliance Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">SOP Compliance Checklist</h2>
        <div className="space-y-3">
          {sopChecklist.map(item => {
            const badge = getStatusBadge(item.status);
            const Icon = badge.icon;
            const complianceRate = Math.round((item.compliantOTCs / item.totalOTCs) * 100);
            
            return (
              <div key={item.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{item.item}</h3>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${badge.bg} ${badge.text}`}>
                        <Icon className="w-3 h-3" />
                        {item.status === 'compliant' ? 'Compliant' : 'Minor Issues'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Last audit: {new Date(item.lastAudit).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{complianceRate}%</p>
                    <p className="text-xs text-gray-500">{item.compliantOTCs}/{item.totalOTCs} OTCs</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${complianceRate >= 95 ? 'bg-green-500' : complianceRate >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${complianceRate}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Audit Schedule */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Audit Schedule</h2>
          <div className="space-y-3">
            {auditSchedule.map(audit => (
              <div key={audit.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{audit.otc}</h3>
                    <p className="text-sm text-gray-600">{audit.type}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    audit.status === 'completed' ? 'bg-green-100 text-green-800' :
                    audit.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {audit.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">{new Date(audit.date).toLocaleDateString()}</p>
                  {audit.score && (
                    <p className="text-sm font-semibold text-green-700">Score: {audit.score}%</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Compliance Incidents */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Incidents</h2>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium">
              {incidents.filter(i => i.status !== 'resolved').length} Active
            </span>
          </div>
          <div className="space-y-3">
            {incidents.map(incident => (
              <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{incident.id}</h3>
                    <p className="text-sm text-gray-600">{incident.otc}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    incident.severity === 'low' ? 'bg-yellow-100 text-yellow-800' :
                    incident.severity === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {incident.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-700 mb-2">{incident.description}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    incident.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {incident.status}
                  </span>
                  <p className="text-xs text-gray-500">{new Date(incident.date).toLocaleDateString()}</p>
                </div>
                <p className="text-xs text-gray-600 mt-2 italic">{incident.correctiveAction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Training Completion Tracking */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Training Completion Status</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 text-green-600" />
              <span className="text-2xl font-bold text-green-900">213</span>
            </div>
            <p className="text-sm text-green-700">Training Complete</p>
            <p className="text-xs text-green-600 mt-1">91% of all staff</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-6 h-6 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-900">18</span>
            </div>
            <p className="text-sm text-yellow-700">Overdue Training</p>
            <p className="text-xs text-yellow-600 mt-1">8% of all staff</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              <span className="text-2xl font-bold text-blue-900">3</span>
            </div>
            <p className="text-sm text-blue-700">Upcoming Sessions</p>
            <p className="text-xs text-blue-600 mt-1">Next 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
