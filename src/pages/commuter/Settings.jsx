import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    User, Bell, Shield, Moon, Volume2, HelpCircle, LogOut,
    X, Check, ChevronRight, Smartphone, Mail, MessageSquare,
    Zap, Tag, Volume1, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';

// Modal Portal Component to break out of parent transforms
const ModalPortal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-grade-in">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-xl sticky top-0 z-10">
                    <h3 className="text-lg font-bold text-slate-800" id="modal-title">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

const Settings = () => {
    const navigate = useNavigate();
    const { notify, confirm } = useNotification();
    const [activeModal, setActiveModal] = useState(null);
    const [settings, setSettings] = useState({
        notifications: {
            push: true,
            email: true,
            sms: false,
            tripReminders: true,
            promotions: false,
        },
        appearance: {
            darkMode: false,
            theme: 'default',
        },
        sound: {
            enabled: true,
            volume: 70,
            haptics: true,
        },
    });

    const handleLogout = async () => {
        const confirmed = await confirm(
            'Are you sure you want to log out?',
            'Logout'
        );

        if (confirmed) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            notify.success('You have been logged out successfully', 'Logged Out');
            navigate('/login');
        }
    };

    const handleSave = (type) => {
        notify.success(`${type} settings have been saved successfully`, 'Settings Saved');
        setActiveModal(null);
    };

    const Toggle = ({ checked, onChange }) => (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={onChange}
            className={`
                relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                ${checked ? 'bg-gradient-to-r from-teal-500 to-emerald-500' : 'bg-slate-200'}
            `}
        >
            <span
                aria-hidden="true"
                className={`
                    pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 
                    transition duration-200 ease-in-out
                    ${checked ? 'translate-x-5' : 'translate-x-0'}
                `}
            />
        </button>
    );

    const SettingsItem = ({ icon, label, desc, onClick, comingSoon }) => (
        <button
            onClick={onClick}
            className="w-full px-4 py-4 flex items-center gap-4 hover:bg-slate-50 transition-all text-left group first:rounded-t-xl last:rounded-b-xl"
        >
            <div className={`
                p-2.5 rounded-xl transition-all duration-300
                ${comingSoon
                    ? 'bg-slate-100 text-slate-400'
                    : 'bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-teal-500/30'
                }
            `}>
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h4 className={`font-bold text-sm ${comingSoon ? 'text-slate-400' : 'text-slate-700'}`}>
                        {label}
                    </h4>
                    {comingSoon && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-400 rounded uppercase tracking-wider">
                            Soon
                        </span>
                    )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{desc}</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
        </button>
    );

    const Section = ({ title, children }) => (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-100">
                <h3 className="font-bold text-slate-600 text-xs uppercase tracking-wider">{title}</h3>
            </div>
            <div className="divide-y divide-slate-50">
                {children}
            </div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto pb-20 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your app preferences</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Account Section */}
                <Section title="Account">
                    <SettingsItem
                        icon={<User size={18} />}
                        label="Profile Information"
                        desc="Personal details and contact info"
                        onClick={() => navigate('/commuter/settings/profile')}
                    />
                    <SettingsItem
                        icon={<Shield size={18} />}
                        label="Security"
                        desc="Password, 2FA, and authorized devices"
                        onClick={() => notify.info('Security settings coming soon', 'Coming Soon')}
                        comingSoon
                    />
                </Section>

                {/* App Preferences */}
                <Section title="Preferences">
                    <SettingsItem
                        icon={<Bell size={18} />}
                        label="Notifications"
                        desc="Push, email, and SMS alerts"
                        onClick={() => setActiveModal('notifications')}
                    />
                    <SettingsItem
                        icon={<Moon size={18} />}
                        label="Appearance"
                        desc="Dark mode and color themes"
                        onClick={() => setActiveModal('appearance')}
                    />
                    <SettingsItem
                        icon={<Volume2 size={18} />}
                        label="Sound & Haptics"
                        desc="Volume levels and feedback"
                        onClick={() => setActiveModal('sound')}
                    />
                </Section>

                {/* Support */}
                <Section title="Support">
                    <SettingsItem
                        icon={<HelpCircle size={18} />}
                        label="Help Center"
                        desc="FAQs and customer support"
                        onClick={() => notify.info('Support center opening...', 'Help')}
                    />
                </Section>

                <button
                    onClick={handleLogout}
                    className="w-full bg-red-50 text-red-500 font-bold py-4 rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-red-500/10"
                >
                    <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                    Sign Out
                </button>

                <div className="text-center">
                    <p className="text-xs text-slate-400 font-medium">SMTTS App v1.0.0</p>
                    <p className="text-[10px] text-slate-300 mt-1">© 2024 Smart Transport</p>
                </div>
            </div>

            {/* Modals using Portal */}

            {/* Notifications Modal */}
            <ModalPortal
                isOpen={activeModal === 'notifications'}
                onClose={() => setActiveModal(null)}
                title="Notification Settings"
            >
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                    <Smartphone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-700">Push Notifications</h4>
                                    <p className="text-xs text-slate-400">Receive alerts on your device</p>
                                </div>
                            </div>
                            <Toggle
                                checked={settings.notifications.push}
                                onChange={() => setSettings(s => ({ ...s, notifications: { ...s.notifications, push: !s.notifications.push } }))}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-700">Email Updates</h4>
                                    <p className="text-xs text-slate-400">Trip receipts and newsletters</p>
                                </div>
                            </div>
                            <Toggle
                                checked={settings.notifications.email}
                                onChange={() => setSettings(s => ({ ...s, notifications: { ...s.notifications, email: !s.notifications.email } }))}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-700">SMS Alerts</h4>
                                    <p className="text-xs text-slate-400">Urgent trip updates</p>
                                </div>
                            </div>
                            <Toggle
                                checked={settings.notifications.sms}
                                onChange={() => setSettings(s => ({ ...s, notifications: { ...s.notifications, sms: !s.notifications.sms } }))}
                            />
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Types</h4>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-700">Trip Reminders</h4>
                                </div>
                            </div>
                            <Toggle
                                checked={settings.notifications.tripReminders}
                                onChange={() => setSettings(s => ({ ...s, notifications: { ...s.notifications, tripReminders: !s.notifications.tripReminders } }))}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                                    <Tag size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-700">Promotions</h4>
                                </div>
                            </div>
                            <Toggle
                                checked={settings.notifications.promotions}
                                onChange={() => setSettings(s => ({ ...s, notifications: { ...s.notifications, promotions: !s.notifications.promotions } }))}
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => handleSave('Notifications')}
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={18} /> Save Preferences
                    </button>
                </div>
            </ModalPortal>

            {/* Appearance Modal */}
            <ModalPortal
                isOpen={activeModal === 'appearance'}
                onClose={() => setActiveModal(null)}
                title="Appearance"
            >
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-800 text-white rounded-lg">
                                <Moon size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-700">Dark Mode</h4>
                                <p className="text-xs text-slate-400">Reduce eye strain at night</p>
                            </div>
                        </div>
                        <Toggle
                            checked={settings.appearance.darkMode}
                            onChange={() => setSettings(s => ({ ...s, appearance: { ...s.appearance, darkMode: !s.appearance.darkMode } }))}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700 block mb-3">Color Theme</label>
                        <div className="grid grid-cols-2 gap-3">
                            {['default', 'ocean', 'forest', 'sunset'].map((theme) => (
                                <button
                                    key={theme}
                                    onClick={() => setSettings(s => ({ ...s, appearance: { ...s.appearance, theme } }))}
                                    className={`
                                        p-3 rounded-xl border-2 text-left transition-all
                                        ${settings.appearance.theme === theme
                                            ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500'
                                            : 'border-slate-100 hover:border-slate-300'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={`
                                            w-4 h-4 rounded-full 
                                            ${theme === 'default' ? 'bg-slate-900' : ''}
                                            ${theme === 'ocean' ? 'bg-blue-500' : ''}
                                            ${theme === 'forest' ? 'bg-green-500' : ''}
                                            ${theme === 'sunset' ? 'bg-orange-500' : ''}
                                        `}></div>
                                        <span className="text-sm font-medium capitalize">{theme}</span>
                                    </div>
                                    <div className="h-2 w-16 bg-slate-200 rounded-full opacity-50"></div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => handleSave('Appearance')}
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={18} /> Apply Theme
                    </button>
                </div>
            </ModalPortal>

            {/* Sound Modal */}
            <ModalPortal
                isOpen={activeModal === 'sound'}
                onClose={() => setActiveModal(null)}
                title="Sound & Haptics"
            >
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                <Volume1 size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-700">Sound Effects</h4>
                                <p className="text-xs text-slate-400">In-app interactions</p>
                            </div>
                        </div>
                        <Toggle
                            checked={settings.sound.enabled}
                            onChange={() => setSettings(s => ({ ...s, sound: { ...s.sound, enabled: !s.sound.enabled } }))}
                        />
                    </div>

                    <div className="py-2">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold text-slate-700">Master Volume</label>
                            <span className="text-sm text-teal-600 font-mono">{settings.sound.volume}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={settings.sound.volume}
                            onChange={(e) => setSettings(s => ({ ...s, sound: { ...s.sound, volume: parseInt(e.target.value) } }))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                                <Activity size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-700">Haptic Feedback</h4>
                                <p className="text-xs text-slate-400">Vibrate on touch</p>
                            </div>
                        </div>
                        <Toggle
                            checked={settings.sound.haptics}
                            onChange={() => setSettings(s => ({ ...s, sound: { ...s.sound, haptics: !s.sound.haptics } }))}
                        />
                    </div>

                    <button
                        onClick={() => handleSave('Sound')}
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={18} /> Save Settings
                    </button>
                </div>
            </ModalPortal>
        </div>
    );
};

export default Settings;
