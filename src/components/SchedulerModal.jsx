import React, { useState } from 'react';
import Modal from './Modal';
import { Calendar, Clock, Users } from 'lucide-react';
import toast from '../utils/toast';

const SchedulerModal = ({ isOpen, onClose, title = "Schedule Event", eventType = "meeting" }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '60',
    location: '',
    description: '',
    attendees: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    toast.info('Scheduling event...');
    
    setTimeout(() => {
      toast.success(`${eventType === 'meeting' ? 'Meeting' : 'Event'} scheduled successfully!`);
      setFormData({
        title: '',
        date: '',
        time: '',
        duration: '60',
        location: '',
        description: '',
        attendees: ''
      });
      onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {eventType === 'meeting' ? 'Meeting' : 'Event'} Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 inline mr-1" />
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="w-4 h-4 inline mr-1" />
              Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
          <select
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
            <option value="180">3 hours</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Meeting room or online link"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Users className="w-4 h-4 inline mr-1" />
            Attendees (comma-separated emails)
          </label>
          <textarea
            value={formData.attendees}
            onChange={(e) => setFormData({...formData, attendees: e.target.value})}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="user1@otc.eg, user2@otc.eg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description/Agenda</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Meeting agenda and notes"
          />
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <button type="button" onClick={onClose} className="btn-outline px-4 py-2">
            Cancel
          </button>
          <button type="submit" className="btn-primary px-4 py-2">
            Schedule {eventType === 'meeting' ? 'Meeting' : 'Event'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SchedulerModal;
