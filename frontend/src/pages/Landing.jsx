import { Link } from "react-router-dom";
import { Leaf, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div 
      className="w-full flex flex-col"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-7049fae79fcc?w=1600&h=900&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
      <div className="relative z-10 flex flex-col">
      
      <header className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4">
            🚀 Smart Farming Revolution
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold text-green-300 mb-8">
            Smarter Farming,<br />Better Harvests
          </h2>

          <p className="mt-6 max-w-3xl text-gray-100 text-lg md:text-xl mx-auto leading-relaxed mb-8">
            CropVision combines AI, real-time data, and farming expertise to help you monitor, predict, and optimize every aspect of your crop production.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 rounded-xl text-white font-bold shadow-lg bg-green-600 hover:bg-green-700 transition text-lg"
            >
              Get Started Free
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-xl font-bold bg-white/20 text-white border-2 border-white hover:bg-white/30 transition text-lg backdrop-blur"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>


      <section className="py-20 bg-white/95 backdrop-blur px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Powerful Features for Modern Farming
          </h2>

          <p className="text-center text-gray-600 mt-2 mb-16 text-lg">
            Everything you need to optimize your crop performance
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow hover:shadow-lg transition">
              <Leaf size={48} className="text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Real-Time Monitoring</h3>
              <p className="text-gray-700">
                Monitor your crops 24/7 with live data streaming and instant alerts.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow hover:shadow-lg transition">
              <Zap size={48} className="text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">24/7 Crop Tracking</h3>
              <p className="text-gray-700">
                Never miss a critical moment with round-the-clock monitoring and alerts.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow hover:shadow-lg transition">
              <BarChart3 size={48} className="text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">AI Analytics</h3>
              <p className="text-gray-700">
                Advanced analytics powered by AI to understand your crop data better.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow hover:shadow-lg transition">
              <ShieldCheck size={48} className="text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Smart Predictions</h3>
              <p className="text-gray-700">
                Predict yields and plan harvests with ML-driven insights and forecasts.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-[#5800ca] text-white text-center mt-16">
        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Farming?</h2>
        <p className="max-w-2xl mx-auto text-lg opacity-90 mb-8">
          Join thousands of farmers using CropVision to optimize crop performance every day.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-(--primary-dark) font-semibold rounded-xl shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 bg-purple-300/30 border border-white font-semibold rounded-xl hover:bg-purple-300/50 transition"
          >
            Login
          </Link>
        </div>
      </section>

      </div>
    </div>
  );
}