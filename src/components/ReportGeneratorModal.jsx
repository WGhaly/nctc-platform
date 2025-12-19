import React, { useState } from 'react';
import Modal from './Modal';
import { FileText, Download } from 'lucide-react';
import toast from '../utils/toast';
import { downloadPDFReport, downloadExcel, downloadCSV } from '../utils/downloads';

const ReportGeneratorModal = ({ isOpen, onClose, reportTypes = [], context = 'general' }) => {
  const [selectedType, setSelectedType] = useState('');
  const [format, setFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('current-month');
  const [includeSections, setIncludeSections] = useState({
    summary: true,
    details: true,
    charts: true,
    recommendations: true
  });

  const handleGenerate = () => {
    if (!selectedType) {
      toast.error('Please select a report type');
      return;
    }

    toast.info('Generating report...');
    
    // Simulate report generation
    setTimeout(() => {
      const reportData = {
        type: selectedType,
        dateRange,
        generatedAt: new Date().toLocaleString(),
        sections: includeSections
      };

      const filename = `${selectedType.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}`;

      if (format === 'pdf') {
        const content = `Report Type: ${selectedType}\nDate Range: ${dateRange}\nGenerated: ${reportData.generatedAt}\n\nSections Included:\n${Object.entries(includeSections).filter(([,v]) => v).map(([k]) => `- ${k}`).join('\n')}`;
        downloadPDFReport(selectedType, content, `${filename}.pdf`);
      } else if (format === 'excel') {
        const data = [{ 'Report Type': selectedType, 'Date Range': dateRange, 'Generated': reportData.generatedAt }];
        downloadExcel(data, `${filename}.xlsx`);
      } else {
        const data = [{ 'Report Type': selectedType, 'Date Range': dateRange, 'Generated': reportData.generatedAt }];
        downloadCSV(data, `${filename}.csv`);
      }

      toast.success('Report generated successfully!');
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Report" size="md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Report Type</option>
            {reportTypes.map(type => (
              <option key={type.id} value={type.name}>{type.name}</option>
            ))}
            {reportTypes.length === 0 && (
              <>
                <option value="Executive Summary">Executive Summary</option>
                <option value="Performance Report">Performance Report</option>
                <option value="Compliance Report">Compliance Report</option>
                <option value="Financial Report">Financial Report</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
            <option value="current-quarter">Current Quarter</option>
            <option value="last-quarter">Last Quarter</option>
            <option value="current-year">Current Year</option>
            <option value="last-year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
          <div className="flex gap-3">
            {['pdf', 'excel', 'csv'].map(fmt => (
              <label key={fmt} className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value={fmt}
                  checked={format === fmt}
                  onChange={(e) => setFormat(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 uppercase">{fmt}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Include Sections</label>
          <div className="space-y-2">
            {Object.keys(includeSections).map(section => (
              <label key={section} className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeSections[section]}
                  onChange={(e) => setIncludeSections({...includeSections, [section]: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 capitalize">{section}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <button onClick={onClose} className="btn-outline px-4 py-2">
            Cancel
          </button>
          <button onClick={handleGenerate} className="btn-primary px-4 py-2 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReportGeneratorModal;
