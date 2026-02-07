import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bus, ArrowLeft, Shield, User, Mail, Lock, CheckCircle, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Logo from '../../components/common/Logo';

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

const BackgroundWrapper = ({ children }) => (
  <div className="relative min-h-screen flex items-center justify-center p-4 font-sans overflow-hidden bg-slate-50">
    {/* 1. Background Elements (SMTTS Theme) */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-200 z-0" />
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#71B280]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#134E5E]/10 rounded-full blur-[100px]" />
    </div>

    {/* 2. Content Layer */}
    <div className="relative z-10 w-full flex justify-center">
      {children}
    </div>
  </div>
);

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
    role: 'COMMUTER' // Default role
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
      // Navigate to login with success state
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="bg-white/80 backdrop-blur-xl w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/50">

        {/* SIDE BAR - Eco Theme for Register */}
        <div className="hidden md:flex w-5/12 bg-gradient-to-br from-[#134E5E] to-[#71B280] p-8 flex-col justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/login" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 text-sm font-bold">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">SMTTS</span>
            </div>

            <h2 className="text-3xl font-black mb-4 leading-tight">Join the<br />Green Revolution.</h2>
            <p className="text-emerald-100 text-sm leading-relaxed font-medium">
              Create an account to track your carbon savings, earn rewards, and experience seamless multi-modal travel.
            </p>
          </div>

          <div className="relative z-10 mt-auto">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                </div>
                <span className="text-xs font-bold text-white/90">Real-time Route Updates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                </div>
                <span className="text-xs font-bold text-white/90">Digital Wallet Integration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-emerald-300" />
                </div>
                <span className="text-xs font-bold text-white/90">Carbon Footprint Tracking</span>
              </div>
            </div>
          </div>

          {/* BACKGROUND SHAPES */}
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-emerald-900/20 rounded-full blur-2xl"></div>
        </div>

        {/* FORM AREA */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white/50 relative">
          <div className="max-w-md mx-auto">
            <div className="text-center md:text-left mb-8">
              <h3 className="text-2xl font-black text-slate-800 mb-2">Create Account 🚀</h3>
              <p className="text-slate-500 text-sm">Enter your details to register as a new commuter.</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold">{error}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">

              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">First Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 transition-all duration-300 group-focus-within:text-emerald-600 group-focus-within:scale-110 z-10" />
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={onChange}
                      required
                      placeholder="John"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>
                {/* Last Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Last Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 transition-all duration-300 group-focus-within:text-emerald-600 group-focus-within:scale-110 z-10" />
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={onChange}
                      required
                      placeholder="Doe"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 transition-all duration-300 group-focus-within:text-emerald-600 group-focus-within:scale-110 z-10" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 transition-all duration-300 group-focus-within:text-emerald-600 group-focus-within:scale-110 z-10" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-mono placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-emerald-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 mt-4">
                <input type="checkbox" id="terms" className="mt-1 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" required />
                <label htmlFor="terms" className="text-xs text-slate-500 leading-snug cursor-pointer">
                  I agree to the <a href="#" className="font-bold text-emerald-600 hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-emerald-600 hover:underline">Privacy Policy</a>.
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-[#134E5E] to-[#71B280] hover:brightness-110 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-900/20 mt-4 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
              </button>

              <div className="mt-6 text-center text-sm text-slate-500 font-medium">
                Already a member?{' '}
                <Link to="/login" className="font-bold text-[#134E5E] hover:underline">
                  Sign In
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
}
