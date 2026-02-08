import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};

const NotificationItem = ({ notification, onClose, isActive }) => {
    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        warning: <AlertTriangle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />
    };

    const styles = {
        success: {
            gradient: 'bg-grad-eco',
            bg: 'bg-emerald-50/90',
            border: 'border-emerald-200/50',
            text: 'text-emerald-800',
            icon: 'text-emerald-600'
        },
        error: {
            gradient: 'bg-grad-alert',
            bg: 'bg-red-50/90',
            border: 'border-red-200/50',
            text: 'text-red-800',
            icon: 'text-red-600'
        },
        warning: {
            gradient: 'bg-grad-gold',
            bg: 'bg-orange-50/90',
            border: 'border-orange-200/50',
            text: 'text-orange-800',
            icon: 'text-orange-600'
        },
        info: {
            gradient: 'bg-grad-tech',
            bg: 'bg-cyan-50/90',
            border: 'border-cyan-200/50',
            text: 'text-cyan-800',
            icon: 'text-cyan-600'
        }
    };

    const style = styles[notification.type] || styles.info;

    return (
        <div
            className={`
        relative overflow-hidden
        ${style.bg} backdrop-blur-glass
        border ${style.border}
        rounded-2xl shadow-glass
        p-4 mb-3
        animate-slide-in
        transition-all duration-300
        hover:shadow-glass-hover
        max-w-md w-full
        ${isActive ? 'ring-2 ring-offset-2' : ''}
      `}
            role="alert"
            aria-live="polite"
        >
            {/* Gradient accent bar */}
            <div className={`absolute top-0 left-0 w-1 h-full ${style.gradient}`}></div>

            <div className="flex items-start gap-3 ml-2">
                {/* Icon */}
                <div className={`${style.icon} flex-shrink-0 mt-0.5`}>
                    {icons[notification.type]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {notification.title && (
                        <h4 className={`font-bold text-sm ${style.text} mb-1`}>
                            {notification.title}
                        </h4>
                    )}
                    <p className={`text-sm ${style.text} opacity-90`}>
                        {notification.message}
                    </p>
                </div>

                {/* Close button */}
                <button
                    onClick={() => onClose(notification.id)}
                    className={`
            ${style.icon}
            hover:bg-white/50
            rounded-lg p-1
            transition-colors
            flex-shrink-0
          `}
                    aria-label="Close notification"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Progress bar for auto-dismiss */}
            {notification.duration && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 overflow-hidden">
                    <div
                        className={`h-full ${style.gradient}`}
                        style={{
                            animation: `shrink ${notification.duration}ms linear forwards`
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
};

// Confirmation Dialog Component
const ConfirmDialog = ({ dialog, onConfirm, onCancel }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onCancel();
            } else if (e.key === 'Enter') {
                onConfirm();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onConfirm, onCancel]);

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                onClick={onCancel}
            ></div>

            {/* Dialog */}
            <div className="relative bg-white/90 backdrop-blur-glass rounded-2xl shadow-premium border border-white/50 max-w-md w-full p-6 animate-slide-in">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-grad-gold flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">
                            {dialog.title || 'Confirm Action'}
                        </h3>
                        <p className="text-sm text-slate-600">
                            {dialog.message}
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2.5 bg-white/70 backdrop-blur-glass border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-white transition-all"
                        autoFocus
                    >
                        {dialog.cancelText || 'Cancel'}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 bg-grad-gold text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-orange-500/20"
                    >
                        {dialog.confirmText || 'Confirm'}
                    </button>
                </div>

                <p className="text-xs text-slate-400 text-center mt-3">
                    Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono">Enter</kbd> to confirm or <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono">Esc</kbd> to cancel
                </p>
            </div>
        </div>
    );
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [confirmDialog, setConfirmDialog] = useState(null);

    // Keyboard navigation for notifications
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (notifications.length === 0 || confirmDialog) return;

            switch (e.key) {
                case 'Escape':
                    // Close the active notification
                    if (notifications[activeIndex]) {
                        removeNotification(notifications[activeIndex].id);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setActiveIndex((prev) => Math.max(0, prev - 1));
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setActiveIndex((prev) => Math.min(notifications.length - 1, prev + 1));
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [notifications, activeIndex, confirmDialog]);

    const addNotification = useCallback((notification) => {
        const id = Date.now() + Math.random();
        const newNotification = {
            id,
            type: 'info',
            duration: 5000,
            ...notification
        };

        setNotifications((prev) => [...prev, newNotification]);

        // Auto remove after duration
        if (newNotification.duration) {
            setTimeout(() => {
                removeNotification(id);
            }, newNotification.duration);
        }

        return id;
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const notify = {
        success: (message, title, duration) =>
            addNotification({ type: 'success', message, title, duration }),
        error: (message, title, duration) =>
            addNotification({ type: 'error', message, title, duration }),
        warning: (message, title, duration) =>
            addNotification({ type: 'warning', message, title, duration }),
        info: (message, title, duration) =>
            addNotification({ type: 'info', message, title, duration }),
        custom: (options) => addNotification(options)
    };

    // Replace window.alert
    const alert = useCallback((message, title = 'Alert') => {
        addNotification({
            type: 'info',
            message,
            title,
            duration: null // Persistent
        });
    }, [addNotification]);

    // Replace window.confirm
    const confirm = useCallback((message, title = 'Confirm') => {
        return new Promise((resolve) => {
            setConfirmDialog({
                message,
                title,
                onConfirm: () => {
                    setConfirmDialog(null);
                    resolve(true);
                },
                onCancel: () => {
                    setConfirmDialog(null);
                    resolve(false);
                }
            });
        });
    }, []);

    return (
        <NotificationContext.Provider value={{ notify, alert, confirm, removeNotification }}>
            {children}

            {/* Notification Container */}
            <div className="fixed top-20 right-6 z-[9999] pointer-events-none">
                <div className="pointer-events-auto">
                    {notifications.map((notification, index) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onClose={removeNotification}
                            isActive={index === activeIndex}
                        />
                    ))}
                </div>
            </div>

            {/* Keyboard Navigation Hint */}
            {notifications.length > 0 && !confirmDialog && (
                <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
                    <div className="bg-slate-800/90 backdrop-blur-glass text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-slate-700">
                        <kbd className="px-1.5 py-0.5 bg-slate-700 rounded mr-1">↑</kbd>
                        <kbd className="px-1.5 py-0.5 bg-slate-700 rounded mr-1">↓</kbd>
                        Navigate •
                        <kbd className="px-1.5 py-0.5 bg-slate-700 rounded ml-1">Esc</kbd> Close
                    </div>
                </div>
            )}

            {/* Confirmation Dialog */}
            {confirmDialog && (
                <ConfirmDialog
                    dialog={confirmDialog}
                    onConfirm={confirmDialog.onConfirm}
                    onCancel={confirmDialog.onCancel}
                />
            )}

            {/* Add keyframe animation */}
            <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
