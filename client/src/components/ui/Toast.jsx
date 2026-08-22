import React, { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-surface border border-outline-variant shadow-paper rounded-sm text-xs font-semibold text-on-surface animate-bounce">
      <span className="material-symbols-outlined text-primary text-base">
        {type === 'error' ? 'error' : 'check_circle'}
      </span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-secondary hover:text-on-surface">
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
}
