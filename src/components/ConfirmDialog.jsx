import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Modal from './Modal';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info', // info, success, warning, danger
  loading = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case 'danger':
        return <XCircle className="w-12 h-12 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-12 h-12 text-yellow-500" />;
      default:
        return <AlertCircle className="w-12 h-12 text-blue-500" />;
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case 'success':
        return 'btn-success';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50';
      default:
        return 'btn-primary';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showClose={false}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {getIcon()}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        
        {message && (
          <p className="text-gray-600 mb-6">{message}</p>
        )}
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            disabled={loading}
            className="btn-outline px-6 py-2"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={getButtonClass()}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
