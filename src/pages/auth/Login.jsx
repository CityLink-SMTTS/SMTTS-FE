import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, User, Lock, Loader2, Shield, AlertCircle, CheckCircle, ArrowRight, Bus, Eye, EyeOff } from 'lucide-react';
import Logo from '../../components/common/Logo';
import LogoBg from '../../assets/logo.jpg';

// Mock authService since we don't have the actual file yet
const authService = {
  login: async (credentials) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username && credentials.password) {
          // Mock response
          resolve({
            token: 'mock-token',
            role: 'COMMUTER', // Default to commuter for now
            username: credentials.username
          });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  }
};

const BackgroundWrapper = ({ children }) => (
  <div className="relative min-h-screen flex items-center justify-center p-4 font-sans overflow-hidden bg-slate-50">
    {/* 1. Background Elements (SMTTS Theme) */}
    <div className="absolute inset-0 z-0">
      {/* Background Image Layer */}
      <div className="absolute inset-0">
        <img
          src={LogoBg}
          alt="Background"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/40 to-slate-200/40" />
      </div>

      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#134E5E]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#0F2027]/10 rounded-full blur-[100px]" />
    </div>

    {/* 2. Content Layer */}
    <div className="relative z-10 w-full flex justify-center">
      {children}
    </div>
  </div>
);

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(location.state?.registrationSuccess || false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'COMMUTER'
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user types
    if (error) setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authService.login(formData);

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));

        const role = (data.role || data.userRole || '').toUpperCase();
        console.log('Login successful. Role:', role);

        switch (role) {
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'DRIVER':
            navigate('/driver');
            break;
          case 'COMMUTER':
          default:
            navigate('/commuter');
            break;
        }
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="bg-white/80 backdrop-blur-xl w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/50">

        {/* SIDE BAR */}
        <div className="hidden md:flex w-5/12 bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] p-8 flex-col justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <Bus className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">SMTTS</span>
            </div>

            <h2 className="text-3xl font-black mb-4 leading-tight">Smart City.<br />Smarter Travel.</h2>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              Join thousands reducing their carbon footprint through our eco-friendly transport network.
            </p>
          </div>

          <div className="relative z-10 mt-auto">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl w-full backdrop-blur-sm border border-white/5">
                <Shield className="h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">Secure Access</p>
                  <p className="text-[10px] text-slate-300">End-to-end encrypted</p>
                </div>
              </div>
            </div>
          </div>

          {/* BACKGROUND SHAPES */}
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
        </div>

        {/* FORM AREA */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white/50 relative">
          <div className="max-w-sm mx-auto">
            <div className="text-center md:text-left mb-8">
              <h3 className="text-2xl font-black text-slate-800 mb-2">Welcome Back 👋</h3>
              <p className="text-slate-500 text-sm">Please enter your details to sign in.</p>

              {/* Quick Role Toggle (Visual Only for now, logic handled by backend usually) */}
              <div className="flex gap-2 mt-4 bg-slate-100/50 p-1 rounded-lg inline-flex">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'COMMUTER' }))}
                  className={`px-3 py-1 text-xs font-bold rounded shadow-sm border transition-all ${formData.role === 'COMMUTER' || !formData.role ? 'bg-white text-[#0F2027] border-slate-200' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                >
                  Commuter
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'DRIVER' }))}
                  className={`px-3 py-1 text-xs font-bold rounded shadow-sm border transition-all ${formData.role === 'DRIVER' ? 'bg-white text-[#0F2027] border-slate-200' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                >
                  Driver
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold">{error}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">

              {/* Username */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Username</label>
                <div className="relative group">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 transition-all duration-300 group-focus-within:text-[#134E5E] group-focus-within:scale-110 z-10" />
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                    placeholder="Enter username"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#134E5E]/20 focus:border-[#134E5E] transition-all text-sm font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 transition-all duration-300 group-focus-within:text-[#134E5E] group-focus-within:scale-110 z-10" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#134E5E]/20 focus:border-[#134E5E] transition-all text-sm font-mono placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-[#134E5E] transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-xs font-bold text-[#134E5E] hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-[#0F2027] to-[#2C5364] hover:brightness-110 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-900/20 mt-2 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to Account"}
              </button>

              <div className="mt-8 text-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-400 font-bold bg-white/50 backdrop-blur">Or</span>
                  </div>
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-bold text-[#134E5E] hover:underline">
                    Register Now
                  </Link>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
}
