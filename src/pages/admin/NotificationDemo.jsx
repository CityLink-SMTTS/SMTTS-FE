import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import PremiumButton from '../../components/common/PremiumButton';
import GlassCard from '../../components/common/GlassCard';
import { Bell, CheckCircle, AlertCircle, Info, AlertTriangle, Keyboard } from 'lucide-react';

const NotificationDemo = () => {
    const { notify, alert, confirm } = useNotification();

    const examples = [
        {
            type: 'success',
            title: 'Success Notification',
            message: 'Your action was completed successfully!',
            variant: 'eco',
            icon: <CheckCircle size={18} />
        },
        {
            type: 'error',
            title: 'Error Notification',
            message: 'Something went wrong. Please try again.',
            variant: 'alert',
            icon: <AlertCircle size={18} />
        },
        {
            type: 'warning',
            title: 'Warning Notification',
            message: 'Please review this important information.',
            variant: 'gold',
            icon: <AlertTriangle size={18} />
        },
        {
            type: 'info',
            title: 'Info Notification',
            message: 'Here is some useful information for you.',
            variant: 'tech',
            icon: <Info size={18} />
        }
    ];

    const handleNotification = (type, title, message) => {
        notify[type](message, title);
    };

    const handleAlert = () => {
        alert('This is a custom alert replacing window.alert()', 'Custom Alert');
    };

    const handleConfirm = async () => {
        const result = await confirm(
            'Are you sure you want to delete this item? This action cannot be undone.',
            'Delete Confirmation'
        );

        if (result) {
            notify.success('Item deleted successfully', 'Deleted');
        } else {
            notify.info('Deletion cancelled', 'Cancelled');
        }
    };

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold gradient-text-primary flex items-center gap-3">
                    <Bell className="w-8 h-8" />
                    Notification System Demo
                </h1>
                <p className="text-slate-500 mt-2">
                    Test the global notification system with keyboard navigation and modern UI
                </p>
            </div>

            {/* Keyboard Navigation Info */}
            <GlassCard className="p-6 mb-8 bg-grad-tech">
                <div className="flex items-start gap-4 text-white">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Keyboard className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-2">Keyboard Navigation</h2>
                        <div className="space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                                <kbd className="px-2 py-1 bg-white/20 rounded font-mono">↑</kbd>
                                <kbd className="px-2 py-1 bg-white/20 rounded font-mono">↓</kbd>
                                <span>Navigate between notifications</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <kbd className="px-2 py-1 bg-white/20 rounded font-mono">Esc</kbd>
                                <span>Close active notification</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <kbd className="px-2 py-1 bg-white/20 rounded font-mono">Enter</kbd>
                                <span>Confirm dialog actions</span>
                            </p>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Basic Notifications */}
            <GlassCard className="p-6 mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Basic Notifications</h2>
                <p className="text-sm text-slate-600 mb-6">
                    Click the buttons below to trigger different notification types
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {examples.map((example) => (
                        <PremiumButton
                            key={example.type}
                            variant={example.variant}
                            onClick={() => handleNotification(example.type, example.title, example.message)}
                            icon={example.icon}
                            fullWidth
                        >
                            {example.type.charAt(0).toUpperCase() + example.type.slice(1)}
                        </PremiumButton>
                    ))}
                </div>
            </GlassCard>

            {/* Alert & Confirm Replacements */}
            <GlassCard className="p-6 mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Alert & Confirm Replacements</h2>
                <p className="text-sm text-slate-600 mb-6">
                    Modern replacements for window.alert() and window.confirm()
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PremiumButton
                        variant="tech"
                        onClick={handleAlert}
                        icon={<Info size={18} />}
                        fullWidth
                    >
                        Show Custom Alert
                    </PremiumButton>

                    <PremiumButton
                        variant="gold"
                        onClick={handleConfirm}
                        icon={<AlertTriangle size={18} />}
                        fullWidth
                    >
                        Show Confirm Dialog
                    </PremiumButton>
                </div>
            </GlassCard>

            {/* Real-world Examples */}
            <GlassCard className="p-6 mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Real-world Examples</h2>
                <p className="text-sm text-slate-600 mb-6">
                    Common notification scenarios in the SMTTS application
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PremiumButton
                        variant="eco"
                        onClick={() => notify.success('Vehicle BUS-101 has been successfully added to the fleet', 'Vehicle Added')}
                        fullWidth
                    >
                        Vehicle Added
                    </PremiumButton>

                    <PremiumButton
                        variant="alert"
                        onClick={() => notify.error('Failed to connect to the server. Please check your internet connection.', 'Connection Error')}
                        fullWidth
                    >
                        Connection Error
                    </PremiumButton>

                    <PremiumButton
                        variant="gold"
                        onClick={() => notify.warning('Route 45 is experiencing high traffic. Consider alternative routes.', 'Traffic Alert')}
                        fullWidth
                    >
                        Traffic Alert
                    </PremiumButton>

                    <PremiumButton
                        variant="tech"
                        onClick={() => notify.info('System maintenance scheduled for tonight at 2:00 AM', 'Maintenance Notice')}
                        fullWidth
                    >
                        Maintenance Notice
                    </PremiumButton>
                </div>
            </GlassCard>

            {/* Usage Instructions */}
            <GlassCard className="p-6 mt-8 bg-slate-50/90">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Usage Instructions</h2>
                <div className="space-y-4 text-sm text-slate-700">
                    <div>
                        <h3 className="font-bold mb-2">1. Import the hook:</h3>
                        <code className="block bg-slate-800 text-green-400 p-3 rounded-lg font-mono text-xs">
                            import {'{ useNotification }'} from './contexts/NotificationContext';
                        </code>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">2. Use in your component:</h3>
                        <code className="block bg-slate-800 text-green-400 p-3 rounded-lg font-mono text-xs">
                            const {'{ notify, alert, confirm }'} = useNotification();
                        </code>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">3. Trigger notifications:</h3>
                        <code className="block bg-slate-800 text-green-400 p-3 rounded-lg font-mono text-xs whitespace-pre">
                            {`// Basic notifications
notify.success('Message', 'Title');
notify.error('Message', 'Title');

// Custom alert
alert('Alert message', 'Title');

// Confirm dialog
const result = await confirm('Sure?');
if (result) { /* confirmed */ }`}
                        </code>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};

export default NotificationDemo;
