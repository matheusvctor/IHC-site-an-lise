import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useClinic();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => {
        let Icon = CheckCircle2;
        let toastClass = 'toast-success';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          toastClass = 'toast-error';
        } else if (toast.type === 'info') {
          Icon = Info;
          toastClass = 'toast-info';
        } else if (toast.type === 'warning') {
          Icon = AlertCircle;
          toastClass = 'toast-warning';
        }

        return (
          <div key={toast.id} className={`toast ${toastClass}`}>
            <Icon size={18} className="flex-shrink-0" />
            <span className="toast-msg">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close"
              aria-label="Fechar notificação"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
