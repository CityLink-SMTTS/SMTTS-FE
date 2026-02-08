import React, { useState } from 'react';
import { Settings, Bell, Shield, Database, Mail, Globe, Users, Lock, FileText, Save, Trash2, Download } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import PremiumButton from '../../components/common/PremiumButton';
import { useNotification } from '../../contexts/NotificationContext';

const AdminSettings = () => {
    const { notify, confirm } = useNotification();
    const [settings, setSettings] = useState({
        systemName: 'SMTTS',
        contactEmail: 'admin@smtts.lk',
        userRegistration: true,
        emailNotifications: true,
        vehicleAlerts: true,
        userActivityAlerts: false,
        twoFactorAuth: false,
        sessionTimeout: '30',
        activityLogs: true,
        backupSchedule: 'daily'
    });

    const handleSave = (section) => {
        notify.success(`${section} settings have been saved successfully`, 'Settings Saved');
    };

    const handleClearCache = async () => {
        const confirmed = await confirm(
            'Are you sure you want to clear the system cache? This may temporarily slow down the system.',
            'Clear Cache'
        );

        if (confirmed) {
            notify.success('System cache has been cleared successfully', 'Cache Cleared');
        }
    };

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold gradient-text-primary flex items-center gap-3">
                    <Settings className="w-8 h-8" />
                    System Settings
                </h1>
                <p className="text-slate-500 mt-2">
                    Configure and manage your SMTTS system preferences
                </p>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* General Settings */}
                <GlassCard className="p-6" hover={false}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-grad-primary flex items-center justify-center shadow-lg">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">General Settings</h2>
                            <p className="text-sm text-slate-500">Basic system configuration</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                System Name
                            </label>
                            <input
                                type="text"
                                value={settings.systemName}
                                onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/70 backdrop-blur-glass border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                value={settings.contactEmail}
                                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/70 backdrop-blur-glass border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
                            <div>
                                <h3 className="font-semibold text-slate-800">User Registration</h3>
                                <p className="text-sm text-slate-500">Allow new users to register</p>
                            </div>
                            <ToggleSwitch
                                checked={settings.userRegistration}
                                onChange={() => toggleSetting('userRegistration')}
                            />
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200">
                        <PremiumButton
                            variant="primary"
                            size="md"
                            icon={<Save size={18} />}
                            onClick={() => handleSave('General')}
                            fullWidth
                        >
                            Save General Settings
                        </PremiumButton>
                    </div>
                </GlassCard>

                {/* Notification Settings */}
                <GlassCard className="p-6" hover={false}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-grad-gold flex items-center justify-center shadow-lg">
                            <Bell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Notifications</h2>
                            <p className="text-sm text-slate-500">Manage alerts and notifications</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
                            <div>
                                <h3 className="font-semibold text-slate-800">Email Notifications</h3>
                                <p className="text-sm text-slate-500">Receive email alerts for critical events</p>
                            </div>
                            <ToggleSwitch
                                checked={settings.emailNotifications}
                                onChange={() => toggleSetting('emailNotifications')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
                            <div>
                                <h3 className="font-semibold text-slate-800">Vehicle Alerts</h3>
                                <p className="text-sm text-slate-500">Maintenance and issue notifications</p>
                            </div>
                            <ToggleSwitch
                                checked={settings.vehicleAlerts}
                                onChange={() => toggleSetting('vehicleAlerts')}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
                            <div>
                                <h3 className="font-semibold text-slate-800">User Activity Alerts</h3>
                                <p className="text-sm text-slate-500">New registrations and activities</p>
                            </div>
                            <ToggleSwitch
                                checked={settings.userActivityAlerts}
                                onChange={() => toggleSetting('userActivityAlerts')}
                            />
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200">
                        <PremiumButton
                            variant="gold"
                            size="md"
                            icon={<Save size={18} />}
                            onClick={() => handleSave('Notification')}
                            fullWidth
                        >
                            Save Notification Settings
                        </PremiumButton>
                    </div>
                </GlassCard>

                {/* Security Settings */}
                <GlassCard className="p-6" hover={false}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-grad-alert flex items-center justify-center shadow-lg">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Security</h2>
                            <p className="text-sm text-slate-500">Security and access control</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
                            <div>
                                <h3 className="font-semibold text-slate-800">Two-Factor Authentication</h3>
                                <p className="text-sm text-slate-500">Extra layer of security</p>
                            </div>
                            <ToggleSwitch
                                checked={settings.twoFactorAuth}
                                onChange={() => toggleSetting('twoFactorAuth')}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Session Timeout
                            </label>
                            <select
                                value={settings.sessionTimeout}
                                onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/70 backdrop-blur-glass border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                            >
                                <option value="15">15 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="60">1 hour</option>
                                <option value="120">2 hours</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
                            <div>
                                <h3 className="font-semibold text-slate-800">Activity Logs</h3>
                                <p className="text-sm text-slate-500">Keep detailed admin activity logs</p>
                            </div>
                            <ToggleSwitch
                                checked={settings.activityLogs}
                                onChange={() => toggleSetting('activityLogs')}
                            />
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200">
                        <PremiumButton
                            variant="alert"
                            size="md"
                            icon={<Save size={18} />}
                            onClick={() => handleSave('Security')}
                            fullWidth
                        >
                            Save Security Settings
                        </PremiumButton>
                    </div>
                </GlassCard>

                {/* System Settings */}
                <GlassCard className="p-6" hover={false}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-grad-eco flex items-center justify-center shadow-lg">
                            <Database className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">System</h2>
                            <p className="text-sm text-slate-500">Performance and maintenance</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Database Backup Schedule
                            </label>
                            <select
                                value={settings.backupSchedule}
                                onChange={(e) => setSettings({ ...settings, backupSchedule: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white/70 backdrop-blur-glass border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                            >
                                <option value="daily">Daily at 3:00 AM</option>
                                <option value="12hours">Every 12 hours</option>
                                <option value="weekly">Weekly</option>
                                <option value="manual">Manual only</option>
                            </select>
                        </div>

                        <div className="p-4 bg-red-50/50 border border-red-200 rounded-xl">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-red-800 flex items-center gap-2">
                                        <Trash2 size={18} />
                                        Cache Management
                                    </h3>
                                    <p className="text-sm text-red-600 mt-1">Clear system cache to improve performance</p>
                                </div>
                            </div>
                            <PremiumButton
                                variant="alert"
                                size="sm"
                                icon={<Trash2 size={16} />}
                                onClick={handleClearCache}
                                className="mt-3"
                            >
                                Clear Cache
                            </PremiumButton>
                        </div>

                        <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                        <FileText size={18} />
                                        System Logs
                                    </h3>
                                    <p className="text-sm text-slate-600 mt-1">View and download system logs</p>
                                </div>
                            </div>
                            <PremiumButton
                                variant="glass"
                                size="sm"
                                icon={<Download size={16} />}
                                onClick={() => notify.info('System logs download started', 'Downloading')}
                                className="mt-3"
                            >
                                Download Logs
                            </PremiumButton>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200">
                        <PremiumButton
                            variant="eco"
                            size="md"
                            icon={<Save size={18} />}
                            onClick={() => handleSave('System')}
                            fullWidth
                        >
                            Save System Settings
                        </PremiumButton>
                    </div>
                </GlassCard>

            </div>
        </div>
    );
};

// Toggle Switch Component
const ToggleSwitch = ({ checked, onChange }) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-grad-eco shadow-inner"></div>
        </label>
    );
};

export default AdminSettings;
