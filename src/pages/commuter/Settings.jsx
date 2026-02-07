import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { User, Bell, Shield, Moon, Volume2, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Account Settings",
            items: [
                { icon: <User size={20} />, label: "Profile Information", desc: "Update your name, email, and phone number", path: '/commuter/settings/profile' },
                { icon: <Shield size={20} />, label: "Security", desc: "Change password and 2FA settings" },
            ]
        },
        {
            title: "App Preferences",
            items: [
                { icon: <Bell size={20} />, label: "Notifications", desc: "Manage push notifications and alerts" },
                { icon: <Moon size={20} />, label: "Appearance", desc: "Toggle dark mode and themes" },
                { icon: <Volume2 size={20} />, label: "Sound & Haptics", desc: "Customize app sounds" },
            ]
        },
        {
            title: "Support",
            items: [
                { icon: <HelpCircle size={20} />, label: "Help & Support", desc: "FAQs and customer service" },
            ]
        }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            <h1 className="text-3xl font-black text-slate-800">Settings</h1>

            <div className="space-y-6">
                {sections.map((section, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
                            <h3 className="font-bold text-slate-700 text-sm">{section.title}</h3>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {section.items.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => item.path && navigate(item.path)}
                                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left group"
                                >
                                    <div className="p-2.5 bg-slate-100 rounded-xl text-slate-600 group-hover:bg-white group-hover:text-[#134E5E] group-hover:shadow-sm transition-all">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 text-sm">{item.label}</h4>
                                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                                    </div>
                                    <div className="flex items-center text-slate-300">
                                        →
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-red-50 text-red-500 font-bold py-4 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                    <LogOut size={20} /> Log Out
                </button>
            </div>

            <div className="text-center text-xs text-slate-400 mt-8">
                SMTTS Version 1.0.0
            </div>
        </div>
    );
};

export default Settings;
