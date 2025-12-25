import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, User, Sprout, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    farmType: "crops",
    farmSize: "",
    location: "",
  });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  const features = [
    { icon: "🌾", text: "Track Your Crops" },
    { icon: "📊", text: "Smart Analytics" },
    { icon: "🚨", text: "Real-time Alerts" },
    { icon: "🌦️", text: "Weather Forecasts" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      <div className="flex h-screen">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>

      {/* Left side - Image (hidden on mobile) */}
      <div className="hidden md:flex items-center justify-center relative w-1/2 h-full overflow-hidden">
        <div className="relative w-full h-full group">
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90"
            alt="Beautiful farming landscape"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 flex items-center justify-center"><div class="text-white text-9xl animate-pulse">🌱</div></div>';
            }}
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-green-800/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-32 right-20 w-24 h-24 bg-green-400/20 rounded-full blur-xl"></div>
          </div>
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-12 text-white animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-4xl font-bold tracking-tight">Start Your Journey</h3>
            </div>
            <p className="text-xl opacity-95 font-light leading-relaxed">Join thousands of farmers growing smarter with CropVision</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
              <div>
                <p className="text-sm opacity-80">Transform your farming experience</p>
                <p className="text-2xl font-bold">Smart Agriculture Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form and Content */}
      <div className="flex-1 flex items-center justify-center  px-4 md:px-12 lg:px-16 relative z-10 overflow-y-auto">
        <div className="w-full h-screen py-8">
          {/* Logo and Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">CropVision</h1>
            </div>
            <p className="text-gray-600 text-sm">Join thousands of farmers growing smarter</p>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
            <p className="text-gray-500 text-sm mb-6">Start managing your farm in minutes</p>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {/* Full Name */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg opacity-0 group-hover:opacity-10 transition blur pointer-events-none"></div>
                <User size={18} className="absolute left-4 top-4 text-green-600 group-hover:text-emerald-600 transition pointer-events-none z-10" />
                <input
                  name="name"
                  placeholder="Full Name"
                  onChange={update}
                  value={form.name}
                  required
                  className="w-full pl-2 pr-4 py-1 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:bg-white focus:outline-none transition relative z-10"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg opacity-0 group-hover:opacity-10 transition blur pointer-events-none"></div>
                <Mail size={18} className="absolute left-4 top-4 text-green-600 group-hover:text-emerald-600 transition pointer-events-none z-10" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  onChange={update}
                  value={form.email}
                  required
                  className="w-full pl-2 pr-4 py-1 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:bg-white focus:outline-none transition relative z-10"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg opacity-0 group-hover:opacity-10 transition blur pointer-events-none"></div>
                <Lock size={18} className="absolute left-4 top-4 text-green-600 group-hover:text-emerald-600 transition pointer-events-none z-10" />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Create a strong password"
                  onChange={update}
                  value={form.password}
                  required
                  className="w-full pl-2 pr-2 py-1 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:bg-white focus:outline-none transition relative z-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition z-20"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {form.password && (
                <div className="mt-3">
                  <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-200">
                    <div className={`flex-1 transition ${form.password.length >= 6 ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                    <div className={`flex-1 transition ${form.password.length >= 10 ? 'bg-orange-400' : 'bg-gray-300'}`}></div>
                    <div className={`flex-1 transition ${form.password.length >= 14 && /[A-Z]/.test(form.password) && /[0-9]/.test(form.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    {form.password.length < 6 ? '🔴 Weak' : form.password.length < 10 ? '🟡 Fair' : /[A-Z]/.test(form.password) && /[0-9]/.test(form.password) ? '🟢 Strong' : '🟠 Medium'}
                  </p>
                </div>
              )}

              {/* Phone Number */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg opacity-0 group-hover:opacity-10 transition blur pointer-events-none"></div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  onChange={update}
                  value={form.phone}
                  className="w-full pl-2 pr-4 py-1 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:bg-white focus:outline-none transition relative z-10"
                />
              </div>

              {/* Farm Type */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg opacity-0 group-hover:opacity-10 transition blur pointer-events-none"></div>
                <select
                  name="farmType"
                  onChange={update}
                  value={form.farmType}
                  className="w-full px-4 py-1 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:bg-white focus:outline-none transition relative z-10"
                >
                  <option value="crops">Crops & Vegetables</option>
                  <option value="livestock">Livestock & Animals</option>
                  <option value="mixed">Mixed Farming</option>
                  <option value="organic">Organic Farming</option>
                </select>
              </div>

              {/* Farm Size */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg opacity-0 group-hover:opacity-10 transition blur pointer-events-none"></div>
                <input
                  name="farmSize"
                  type="text"
                  placeholder="Farm size (e.g., 5 acres, 2 hectares)"
                  onChange={update}
                  value={form.farmSize}
                  className="w-full pl-2 pr-4 py-1 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:bg-white focus:outline-none transition relative z-10"
                />
              </div>

              {/* Location */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg opacity-0 group-hover:opacity-10 transition blur pointer-events-none"></div>
                <input
                  name="location"
                  type="text"
                  placeholder="City, State/Province"
                  onChange={update}
                  value={form.location}
                  className="w-full pl-2 pr-4 py-1 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:bg-white focus:outline-none transition relative z-10"
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-start gap-2 mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-gray-700 cursor-pointer leading-relaxed">
                  I agree to the <span className="text-green-600 font-semibold hover:underline">Terms of Service</span> and <span className="text-green-600 font-semibold hover:underline">Privacy Policy</span>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105 active:scale-95 shadow-lg mt-6"
              >
                {loading ? "Creating account..." : "Create Account"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-400 text-sm">or sign up with</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Google Sign Up */}
            <button className="w-full border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 py-3 rounded-lg font-medium text-gray-700 transition flex items-center justify-center gap-2">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Sign up with Google
            </button>

            {/* Login Link */}
            <div className="mt-6 text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:text-emerald-600 font-semibold transition">
                Log in
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-white/20 text-center hover:bg-white/70 transition transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="text-2xl mb-1">{feature.icon}</div>
                <p className="text-xs font-medium text-gray-700">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
