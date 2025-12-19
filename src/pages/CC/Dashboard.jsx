import { Link } from 'react-router-dom';
import { Users, TrendingUp, AlertCircle, Calendar, BarChart3, Info, CheckCircle2, Clock } from 'lucide-react';
import { clusterCoordinators, otcs } from '../../mockData';
import { handleScheduleMeeting } from '../../utils/quickActions';
import toast from '../../utils/toast';

export default function ClusterCoordinatorDashboard() {
  // Get current user's coordinator role (simulated)
  const myCoordination = clusterCoordinators[0]; // Cairo University coordinating Physical Sciences
  
  const totalOTCs = myCoordination.clusterOTCs.length;
  const activeOTCs = myCoordination.clusterOTCs.filter(o => o.status === 'active').length;
  const upcomingMeeting = myCoordination.monthlyMeetings[0];
  const lastReport = myCoordination.quarterlyReports[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cluster Coordinator Dashboard</h1>
          <p className="text-gray-600">{myCoordination.clusterName} (CC-FLOW-001)</p>
        </div>
        <div className="flex gap-3">
          <Link to="/cc/reports" className="btn-primary">
            <BarChart3 className="w-5 h-5 mr-2" />
            Submit Report
          </Link>
        </div>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Cluster Coordinator Responsibilities</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Monthly Meetings:</span> Coordinate cluster OTC activities, share best practices &rarr; 
              <span className="font-medium"> Weekly Monitoring:</span> Review dashboards, track performance &rarr; 
              <span className="font-medium"> Quarterly Reports:</span> Gap identification, recommendations to NCTC &rarr; 
              <span className="font-medium"> Budget Oversight:</span> Monitor spending, recommend adjustments
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cluster OTCs</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{activeOTCs}</p>
              <p className="text-xs text-gray-500 mt-1">of {totalOTCs} total</p>
            </div>
            <Users className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Coordination Score</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{myCoordination.performanceMetrics.coordinationScore}</p>
              <p className="text-xs text-gray-500 mt-1">out of 100</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">OTC Satisfaction</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{myCoordination.performanceMetrics.otcSatisfaction}</p>
              <p className="text-xs text-gray-500 mt-1">out of 5.0</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-purple-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Resolution Time</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">3</p>
              <p className="text-xs text-gray-500 mt-1">days</p>
            </div>
            <Clock className="w-10 h-10 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Upcoming Meeting */}
      <div className="card bg-yellow-50 border border-yellow-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <Calendar className="w-5 h-5 text-yellow-700 mt-0.5 mr-3" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Next Monthly Meeting</h3>
              <p className="text-sm text-yellow-700 mb-2">{upcomingMeeting.nextMeeting}</p>
              <p className="text-xs text-yellow-600">Expected attendees: {upcomingMeeting.attendees.join(', ')}</p>
            </div>
          </div>
          <button 
            className="btn btn-primary text-sm"
            onClick={() => handleScheduleMeeting('cluster coordination')}
          >
            Prepare Agenda
          </button>
        </div>
      </div>

      {/* Cluster OTCs Performance */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cluster OTCs Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">OTC</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disclosures</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projects</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {myCoordination.clusterOTCs.map(clusterOTC => {
                const otcDetails = otcs.find(o => o.id === clusterOTC.otcId);
                return (
                  <tr key={clusterOTC.otcId} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{clusterOTC.otcName}</div>
                      <div className="text-xs text-gray-500">{otcDetails?.university}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge badge-success">{clusterOTC.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">12</td>
                    <td className="px-4 py-3 text-sm text-gray-900">8</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => toast.info(`Viewing details for ${clusterOTC.otcName}...`)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Latest Quarterly Report */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Quarterly Report ({lastReport.quarter})</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Highlights</h3>
            <ul className="space-y-2">
              {lastReport.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Challenges</h3>
            <ul className="space-y-2">
              {lastReport.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Recommendations</h3>
          <ul className="space-y-1">
            {lastReport.recommendations.map((rec, idx) => (
              <li key={idx} className="text-sm text-gray-600 ml-4">• {rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
