import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, BookOpen, Users, Calendar, Award, Clock, Info, CheckCircle2, MapPin, Video } from 'lucide-react';
import { detailedTrainingPrograms } from '../../../mockData';
import Modal from '../../../components/Modal';
import SchedulerModal from '../../../components/SchedulerModal';
import toast from '../../../utils/toast';
import { downloadCSV } from '../../../utils/downloads';

export default function TrainingManagement() {
  const [showScheduler, setShowScheduler] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  // Calculate statistics
  const totalPrograms = detailedTrainingPrograms.length;
  const onboardingPrograms = detailedTrainingPrograms.filter(p => p.type === 'onboarding').length;
  const totalEnrolled = detailedTrainingPrograms.reduce((sum, p) => sum + p.enrolled, 0);
  const totalCapacity = detailedTrainingPrograms.reduce((sum, p) => sum + p.capacity, 0);
  const upcomingPrograms = detailedTrainingPrograms.filter(p => p.status === 'open-registration').length;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'onboarding': return <Users className="w-5 h-5" />;
      case 'specialized': return <BookOpen className="w-5 h-5" />;
      case 'refresher': return <Award className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'onboarding': return 'badge-success';
      case 'specialized': return 'badge-info';
      case 'refresher': return 'badge-warning';
      default: return 'badge-default';
    }
  };

  const getCategoryBadge = (category) => {
    return category === 'mandatory' ? 'badge-error' : 'badge-info';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Training & Development</h1>
          <p className="text-gray-600">OTC Capacity Building Programs (NCTC-FLOW-005)</p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => setShowScheduler(true)}
        >
          <Plus className="w-5 h-5" />
          Schedule New Training
        </button>
      </div>

      {/* Process Info */}
      <div className="card bg-blue-50 border border-blue-200">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Training Program Structure</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              <span className="font-medium">Onboarding (Mandatory):</span> 5-day program within 60 days of OTC acceptance &rarr; 
              <span className="font-medium"> Ongoing Programs:</span> Specialized workshops (quarterly, 4/year), advanced topics &rarr; 
              <span className="font-medium"> Annual Refresher (Mandatory):</span> Policy updates, new features, best practices &rarr; 
              <span className="font-medium"> Certification:</span> Pre-test, post-test (pass 70%), certificate issued
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Programs</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalPrograms}</p>
              <p className="text-xs text-gray-500 mt-1">{upcomingPrograms} open for registration</p>
            </div>
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Onboarding Programs</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{onboardingPrograms}</p>
              <p className="text-xs text-gray-500 mt-1">5-day intensive</p>
            </div>
            <Users className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Enrollments</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{totalEnrolled}</p>
              <p className="text-xs text-gray-500 mt-1">of {totalCapacity} capacity</p>
            </div>
            <Calendar className="w-10 h-10 text-purple-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Utilization Rate</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {Math.round((totalEnrolled/totalCapacity)*100)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Capacity filled</p>
            </div>
            <Award className="w-10 h-10 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search training programs..."
                className="input pl-10 w-full"
              />
            </div>
          </div>
          <select className="input">
            <option value="">All Types</option>
            <option value="onboarding">Onboarding</option>
            <option value="specialized">Specialized</option>
            <option value="refresher">Refresher</option>
          </select>
          <select className="input">
            <option value="">All Categories</option>
            <option value="mandatory">Mandatory</option>
            <option value="ongoing">Ongoing</option>
          </select>
          <select className="input">
            <option value="">All Status</option>
            <option value="open-registration">Open Registration</option>
            <option value="full">Full</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Training Programs */}
      <div className="space-y-4">
        {detailedTrainingPrograms.map(program => (
          <div key={program.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                  <span className={`badge ${getTypeBadge(program.type)} flex items-center`}>
                    {getTypeIcon(program.type)}
                    <span className="ml-1">{program.type}</span>
                  </span>
                  <span className={`badge ${getCategoryBadge(program.category)}`}>
                    {program.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{program.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{program.duration}</p>
                <p className="text-xs text-gray-500">Duration</p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-start">
                <Calendar className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="text-sm font-medium text-gray-900">{program.startDate}</p>
                </div>
              </div>
              <div className="flex items-start">
                {program.deliveryMode === 'online' ? (
                  <Video className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                ) : program.deliveryMode === 'hybrid' ? (
                  <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                ) : (
                  <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                )}
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-900">{program.location}</p>
                  <p className="text-xs text-blue-600 capitalize">{program.deliveryMode}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Enrollment</p>
                  <p className="text-sm font-medium text-gray-900">
                    {program.enrolled} / {program.capacity}
                  </p>
                  <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${(program.enrolled/program.capacity)*100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Certificate</p>
                  <p className="text-sm font-medium text-gray-900">
                    {program.certificate ? 'Yes' : 'No'}
                  </p>
                  {program.postTest.required && (
                    <p className="text-xs text-gray-600">Pass: {program.postTest.passScore}%</p>
                  )}
                </div>
              </div>
            </div>

            {/* Topics */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Topics Covered:</p>
              <div className="flex flex-wrap gap-2">
                {program.topics.map((topic, idx) => (
                  <span key={idx} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {topic.name}
                    <span className="ml-1 text-gray-500">({topic.hours}h)</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Instructors */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Instructors:</p>
              <p className="text-sm text-gray-600">{program.instructors.join(', ')}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <button onClick={() => {
                  setSelectedProgram(program);
                  setShowDetails(true);
                }} className="btn-outline text-sm">View Details</button>
                <button onClick={() => {
                  toast.info('Generating participant list...');
                  setTimeout(() => {
                    const participants = Array.from({length: program.enrolled}, (_, i) => ({
                      'Name': `Participant ${i+1}`,
                      'OTC': 'Sample OTC',
                      'Email': `participant${i+1}@otc.eg`,
                      'Registration Date': new Date().toLocaleDateString()
                    }));
                    downloadCSV(participants, `${program.id}-participants.csv`);
                    toast.success('Participant list downloaded!');
                  }, 500);
                }} className="btn-outline text-sm">Participant List</button>
                <button onClick={() => {
                  setSelectedProgram(program);
                  setShowMaterials(true);
                }} className="btn-outline text-sm">Materials</button>
              </div>
              {program.status === 'open-registration' && (
                <button onClick={() => {
                  setSelectedProgram(program);
                  setShowRegister(true);
                }} className="btn-primary text-sm">Register Participants</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Decision Points */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Decision Points (NCTC-FLOW-005)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D1:</span>
            <span className="text-gray-600">Post-test score &ge; 70%? (Yes &rarr; Issue certificate / No &rarr; Require retake or remedial training)</span>
          </div>
          <div className="flex items-start">
            <span className="font-medium text-gray-700 mr-2 min-w-[40px]">D2:</span>
            <span className="text-gray-600">OTC onboarding completed within 60 days? (Yes &rarr; Proceed to matrix assignment / No &rarr; Extend timeline with justification)</span>
          </div>
        </div>
      </div>

      {/* Schedule Training Modal */}
      <SchedulerModal
        isOpen={showScheduler}
        onClose={() => setShowScheduler(false)}
        title="Schedule Training Program"
        eventType="training"
      />

      {/* Training Details Modal */}
      {selectedProgram && (
        <Modal isOpen={showDetails} onClose={() => setShowDetails(false)} title={selectedProgram.title} size="lg">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Program ID</p>
                <p className="text-sm text-gray-900">{selectedProgram.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Duration</p>
                <p className="text-sm text-gray-900">{selectedProgram.duration}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Start Date</p>
                <p className="text-sm text-gray-900">{selectedProgram.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Location</p>
                <p className="text-sm text-gray-900">{selectedProgram.location}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Topics</p>
              <div className="space-y-2">
                {selectedProgram.topics.map((topic, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{topic.name}</span>
                    <span className="text-xs text-gray-500">{topic.hours} hours</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Instructors</p>
              <p className="text-sm text-gray-900">{selectedProgram.instructors.join(', ')}</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Materials Library Modal */}
      {selectedProgram && (
        <Modal isOpen={showMaterials} onClose={() => setShowMaterials(false)} title="Training Materials" size="md">
          <div className="space-y-3">
            {selectedProgram.topics.map((topic, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{topic.name}</h4>
                <div className="flex gap-2">
                  <button onClick={() => toast.success('Downloading presentation...')} className="btn-outline text-xs px-3 py-1">
                    Slides
                  </button>
                  <button onClick={() => toast.success('Downloading handouts...')} className="btn-outline text-xs px-3 py-1">
                    Handouts
                  </button>
                  <button onClick={() => toast.success('Downloading exercises...')} className="btn-outline text-xs px-3 py-1">
                    Exercises
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Register Participants Modal */}
      {selectedProgram && (
        <Modal isOpen={showRegister} onClose={() => setShowRegister(false)} title="Register Participants" size="md">
          <form onSubmit={(e) => {
            e.preventDefault();
            toast.info('Registering participants...');
            setTimeout(() => {
              toast.success('Participants registered successfully!');
              setShowRegister(false);
            }, 1000);
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Training Program</label>
              <input
                type="text"
                value={selectedProgram.title}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Participant Names (one per line)</label>
              <textarea
                rows="4"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ahmed Hassan&#10;Fatma El-Sayed&#10;Mohamed Rashad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OTC Affiliation</label>
              <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select OTC</option>
                <option value="auc">AUC TTO</option>
                <option value="guc">GUC TTO</option>
                <option value="cu">Cairo University TTO</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="contact@otc.eg"
              />
            </div>
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button type="button" onClick={() => setShowRegister(false)} className="btn-outline px-4 py-2">
                Cancel
              </button>
              <button type="submit" className="btn-primary px-4 py-2">
                Register
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
