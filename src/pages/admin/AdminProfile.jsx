import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, Shield } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import PremiumButton from '../../components/common/PremiumButton';
import { useNotification } from '../../contexts/NotificationContext';

const AdminProfile = () => {
    const { notify } = useNotification();
    const [profile, setProfile] = useState({
        name: 'Admin User',
        email: 'admin@smtts.lk',
        phone: '+94 77 123 4567',
        role: 'Administrator',
        location: 'Colombo, Sri Lanka',
        joinDate: 'January 15, 2024',
        bio: 'System administrator managing the SMTTS transportation network.'
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        setIsEditing(false);
        notify.success('Your profile has been updated successfully', 'Profile Updated');
    };

    const handleCancel = () => {
        setIsEditing(false);
        notify.info('Changes have been discarded', 'Cancelled');
    };

    return (
        <div className="p-6 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold gradient-text-primary flex items-center gap-3">
                    <User className="w-8 h-8" />
                    Admin Profile
                </h1>
                <p className="text-slate-500 mt-2">
                    Manage your personal information and account settings
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <GlassCard className="p-6 lg:col-span-1" hover={false}>
                    <div className="flex flex-col items-center">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-5xl shadow-xl shadow-teal-500/30 ring-4 ring-white">
                                A
                            </div>
                            <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-teal-600 hover:bg-teal-50 transition opacity-0 group-hover:opacity-100">
                                <Camera size={18} />
                            </button>
                            {/* Online Status */}
                            <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                        </div>

                        {/* User Info */}
                        <h2 className="text-xl font-bold text-slate-800 mt-4">{profile.name}</h2>
                        <p className="text-sm text-slate-500">{profile.email}</p>

                        {/* Role Badge */}
                        <div className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full text-sm font-medium shadow-lg shadow-teal-500/30 flex items-center gap-2">
                            <Shield size={16} />
                            {profile.role}
                        </div>

                        {/* Stats */}
                        <div className="w-full mt-6 pt-6 border-t border-slate-200 space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <span className="text-slate-600">Joined {profile.joinDate}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                <span className="text-slate-600">{profile.location}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full mt-6 space-y-2">
                            {!isEditing ? (
                                <PremiumButton
                                    variant="primary"
                                    size="md"
                                    onClick={() => setIsEditing(true)}
                                    fullWidth
                                >
                                    Edit Profile
                                </PremiumButton>
                            ) : (
                                <>
                                    <PremiumButton
                                        variant="eco"
                                        size="md"
                                        icon={<Save size={18} />}
                                        onClick={handleSave}
                                        fullWidth
                                    >
                                        Save Changes
                                    </PremiumButton>
                                    <PremiumButton
                                        variant="glass"
                                        size="md"
                                        onClick={handleCancel}
                                        fullWidth
                                    >
                                        Cancel
                                    </PremiumButton>
                                </>
                            )}
                        </div>
                    </div>
                </GlassCard>

                {/* Profile Details */}
                <GlassCard className="p-6 lg:col-span-2" hover={false}>
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Personal Information</h2>

                    <div className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <User size={16} />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-glass border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${!isEditing ? 'cursor-not-allowed opacity-60' : ''}`}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <Mail size={16} />
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-glass border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${!isEditing ? 'cursor-not-allowed opacity-60' : ''}`}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <Phone size={16} />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-glass border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${!isEditing ? 'cursor-not-allowed opacity-60' : ''}`}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <MapPin size={16} />
                                Location
                            </label>
                            <input
                                type="text"
                                value={profile.location}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-glass border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${!isEditing ? 'cursor-not-allowed opacity-60' : ''}`}
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                Bio
                            </label>
                            <textarea
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                disabled={!isEditing}
                                rows={4}
                                className={`w-full px-4 py-3 bg-white/70 backdrop-blur-glass border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition resize-none ${!isEditing ? 'cursor-not-allowed opacity-60' : ''}`}
                            />
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default AdminProfile;
