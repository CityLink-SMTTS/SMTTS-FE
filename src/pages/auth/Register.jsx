import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bus, ArrowLeft, User, Mail, Lock, CheckCircle, Loader2, AlertCircle, Eye, EyeOff, Sparkles, Zap, CreditCard, Leaf } from 'lucide-react';

// Mock registration service
const registerService = {
  register: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1500);
    });
  }
};

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'COMMUTER'
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerService.register(formData);
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-['Inter',system-ui,sans-serif]">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridReg" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridReg)" />
          </svg>
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-[128px]" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Back & Logo */}
          <div className="space-y-6">
            <Link to="/login" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center">
                <Bus className="w-5 h-5 text-emerald-900" />
              </div>
              <span className="text-xl font-semibold text-white tracking-tight">SMTTS</span>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Join the<br />
                <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  Green Revolution
                </span>
              </h1>
              <p className="text-emerald-200 text-lg max-w-md leading-relaxed">
                Start your sustainable commute journey. Track carbon savings and earn rewards with every trip.
              </p>
            </div>
            
            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: Zap, text: 'Instant route optimization' },
                { icon: CreditCard, text: 'Smart digital wallet' },
                { icon: Leaf, text: 'Carbon savings tracker' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-emerald-100">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-emerald-300" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-emerald-400 text-sm">
            © 2026 SMTTS. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8">
            <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors text-sm font-medium mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-800 tracking-tight">SMTTS</span>
            </div>
          </div>
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Create your account</h2>
            <p className="text-slate-500">Start your journey towards sustainable commuting</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span className="text-sm text-red-600 font-medium">{error}</span>
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                    required
                    placeholder="John"
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Last Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={onChange}
                    required
                    placeholder="Doe"
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
            
            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Must be at least 8 characters</p>
            </div>
            
            {/* Terms */}
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="terms" 
                required
                className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" 
              />
              <label htmlFor="terms" className="text-sm text-slate-500 leading-relaxed cursor-pointer">
                I agree to the{' '}
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors">Privacy Policy</a>
              </label>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-slate-50 text-sm text-slate-400">or</span>
            </div>
          </div>
          
          {/* Login Link */}
          <p className="text-center text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
