// Download utility functions for exports and file generation

/**
 * Convert array of objects to CSV string
 */
export const convertToCSV = (data, headers = null) => {
  if (!data || data.length === 0) return '';
  
  const keys = headers || Object.keys(data[0]);
  const csvHeaders = keys.join(',');
  
  const csvRows = data.map(row => {
    return keys.map(key => {
      const value = row[key] || '';
      // Escape commas and quotes
      const escaped = String(value).replace(/"/g, '""');
      return `"${escaped}"`;
    }).join(',');
  });
  
  return [csvHeaders, ...csvRows].join('\n');
};

/**
 * Download data as CSV file
 */
export const downloadCSV = (data, filename = 'export.csv', headers = null) => {
  const csv = convertToCSV(data, headers);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, filename);
};

/**
 * Download data as Excel file (simplified CSV with .xlsx extension)
 */
export const downloadExcel = (data, filename = 'export.xlsx', headers = null) => {
  const csv = convertToCSV(data, headers);
  const blob = new Blob([csv], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  downloadBlob(blob, filename);
};

/**
 * Generate and download PDF report
 */
export const downloadPDFReport = (title, content, filename = 'report.pdf') => {
  // Simple PDF generation - in production, use jsPDF or similar
  const pdfContent = `
    ${title}
    ${'='.repeat(title.length)}
    
    ${content}
    
    Generated: ${new Date().toLocaleString()}
  `;
  
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  downloadBlob(blob, filename);
};

/**
 * Download text file
 */
export const downloadTextFile = (content, filename = 'document.txt') => {
  const blob = new Blob([content], { type: 'text/plain' });
  downloadBlob(blob, filename);
};

/**
 * Download blob as file
 */
const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate report data for performance reviews
 */
export const generatePerformanceReport = (reviews) => {
  return reviews.map(review => ({
    OTC: review.otc,
    Status: review.status,
    Score: review.score || 'N/A',
    'Review Date': review.reviewDate || 'Not scheduled',
    Reviewer: review.reviewer || 'Unassigned',
    'Next Action': review.nextAction || 'Pending'
  }));
};

/**
 * Generate report data for audit logs
 */
export const generateAuditLogReport = (logs) => {
  return logs.map(log => ({
    Timestamp: new Date(log.timestamp).toLocaleString(),
    User: log.user,
    Action: log.action,
    Details: log.details,
    'IP Address': log.ipAddress || 'N/A'
  }));
};

/**
 * Generate report data for training participants
 */
export const generateParticipantReport = (participants) => {
  return participants.map(p => ({
    Name: p.name,
    OTC: p.otc,
    Email: p.email,
    'Registration Date': p.registrationDate,
    Status: p.status
  }));
};
