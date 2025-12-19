// Toast notification system
// Simple implementation - can be replaced with library like react-toastify

class ToastManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;
    
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById('toast-container');
    }
  }

  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      background: ${this.getColor(type)};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      margin-bottom: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      pointer-events: auto;
      animation: slideIn 0.3s ease;
      min-width: 300px;
      max-width: 500px;
      font-size: 14px;
      line-height: 1.5;
    `;
    toast.textContent = message;

    this.container.appendChild(toast);

    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    if (!document.getElementById('toast-styles')) {
      style.id = 'toast-styles';
      document.head.appendChild(style);
    }

    // Auto remove
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  getColor(type) {
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };
    return colors[type] || colors.info;
  }

  success(message, duration) {
    this.show(message, 'success', duration);
  }

  error(message, duration) {
    this.show(message, 'error', duration);
  }

  warning(message, duration) {
    this.show(message, 'warning', duration);
  }

  info(message, duration) {
    this.show(message, 'info', duration);
  }
}

const toast = new ToastManager();

export default toast;
