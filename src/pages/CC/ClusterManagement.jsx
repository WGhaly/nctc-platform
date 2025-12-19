import { Link } from 'react-router-dom';
import { Calendar, Users, FileText, Info, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { clusterCoordinators } from '../../mockData';
import { handleScheduleMeeting } from '../../utils/quickActions';
import toast from '../../utils/toast';

export default function ClusterManagement() {
  const myCoordination = clusterCoordinators[0];
  const recentMeetings = myCoordination.monthlyMeetings;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cluster Management</h1>
          <p className="text-gray-600">{myCoordination.clusterName} (CC-FLOW-002, 003)</p>
        </div>
        <button 
          className="btn btn-primary flex items-center gap-2"
          onClick={() => handleScheduleMeeting('cluster')}
        >
          <Calendar className="w-5 h-5" />
          Schedule Meeting
        </button>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Monthly Coordination & Monitoring</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Monthly Meetings:</span> All cluster OTCs, review performance, share practices &rarr; 
              <span className="font-medium"> Weekly Dashboards:</span> Monitor KPIs, identify issues early &rarr; 
              <span className="font-medium"> Issue Resolution:</span> 3-day target for OTC concerns &rarr; 
              <span className="font-medium"> Best Practice Sharing:</span> Document and distribute successful approaches
            </p>
          </div>
        </div>
      </div>

      {/* Coordinator Info */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Coordinator Information</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">Coordinator</p>
            <p className="text-lg font-semibold text-gray-900">{myCoordination.coordinatorName}</p>
            <p className="text-sm text-gray-600">{myCoordination.coordinatorOTCName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Appointment</p>
            <p className="text-lg font-semibold text-gray-900">{myCoordination.appointmentDate}</p>
            <p className="text-sm text-gray-600">Term ends: {myCoordination.termEnd}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <span className="badge badge-success inline-block mt-1">{myCoordination.status}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Key Responsibilities:</p>
          <ul className="grid md:grid-cols-2 gap-2">
            {myCoordination.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                {resp}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cluster OTCs */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cluster OTCs ({myCoordination.clusterOTCs.length})</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {myCoordination.clusterOTCs.map(otc => (
            <div key={otc.otcId} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{otc.otcName}</h3>
                <span className="badge badge-success">{otc.status}</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Disclosures:</span>
                  <span className="font-medium text-gray-900">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Projects:</span>
                  <span className="font-medium text-gray-900">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Performance:</span>
                  <span className="font-medium text-green-600">85%</span>
                </div>
              </div>
              <button 
                className="btn btn-outline w-full mt-3 text-sm"
                onClick={() => toast.info(`Viewing details for ${otc.otcName}...`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Meeting History */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Meeting History</h2>
        <div className="space-y-4">
          {recentMeetings.map((meeting, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{meeting.month} Meeting</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {meeting.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Attendees</p>
                  <p className="font-semibold text-gray-900">{meeting.attendees.length}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Agenda</p>
                  <ul className="space-y-1">
                    {meeting.agenda.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Outcomes</p>
                  <ul className="space-y-1">
                    {meeting.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <CheckCircle2 className="w-3 h-3 text-green-600 mr-1 mt-0.5 flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Next meeting: {meeting.nextMeeting}
                </p>
                <div className="flex gap-2">
                  <button 
                    className="btn btn-outline text-sm"
                    onClick={() => toast.info('Viewing meeting minutes...')}
                  >
                    View Minutes
                  </button>
                  <button 
                    className="btn btn-outline text-sm"
                    onClick={() => toast.info('Viewing action items...')}
                  >
                    Action Items
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Coordination Performance Metrics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-gray-600">Coordination Score</p>
                <p className="text-sm font-semibold text-gray-900">{myCoordination.performanceMetrics.coordinationScore}/100</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${myCoordination.performanceMetrics.coordinationScore}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-gray-600">OTC Satisfaction</p>
                <p className="text-sm font-semibold text-gray-900">{myCoordination.performanceMetrics.otcSatisfaction}/5.0</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(myCoordination.performanceMetrics.otcSatisfaction/5)*100}%` }}></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Meeting Frequency</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">{myCoordination.performanceMetrics.meetingFrequency}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Report Timeliness</p>
              <p className="text-lg font-semibold text-green-600 capitalize">{myCoordination.performanceMetrics.reportTimeliness}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 col-span-2">
              <p className="text-sm text-gray-600">Avg Issue Resolution Time</p>
              <p className="text-lg font-semibold text-gray-900">{myCoordination.performanceMetrics.issueResolutionTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
