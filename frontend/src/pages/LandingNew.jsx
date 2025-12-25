import { Link } from "react-router-dom";
import { Leaf, BarChart3, ShieldCheck, TrendingUp, Zap, Cloud, Users, Award, ArrowRight, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Leaf,
      title: "Real-Time Growth Tracking",
      description: "Get instant insights into your crops' growth stages with AI-powered stage detection.",
      color: "text-green-500"
    },
    {
      icon: BarChart3,
      title: "Smart Yield Predictions",
      description: "Estimate yield using data-driven algorithms tailored for your crop type.",
      color: "text-blue-500"
    },
    {
      icon: ShieldCheck,
      title: "Crop Health Monitoring",
      description: "Easily understand crop health with AI analysis and color-coded insights.",
      color: "text-purple-500"
    },
    {
      icon: Cloud,
      title: "Weather Integration",
      description: "Get weather forecasts and farming recommendations based on local conditions.",
      color: "text-sky-500"
    },
    {
      icon: Zap,
      title: "Pest & Disease Alert",
      description: "Real-time notifications for potential pest issues and preventive measures.",
      color: "text-orange-500"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Comprehensive dashboard with visual analytics and historical trend analysis.",
      color: "text-emerald-500"
    }
  ];

  const testimonials = [
    {
      name: "Raj Kumar",
      role: "Farmer, Punjab",
      image: "🌾",
      text: "CropVision increased my yield by 35% in just one season. The pest alerts saved my entire crop!"
    },
    {
      name: "Priya Singh",
      role: "Farmer, Haryana",
      image: "👩‍🌾",
      text: "Finally, a platform that actually understands farming. The analytics are game-changing!"
    },
    {
      name: "Amit Patel",
      role: "Farm Manager, Maharashtra",
      image: "👨‍💼",
      text: "Managing 50 acres has never been easier. Real-time tracking saves me hours every week."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Farmers" },
    { number: "2.5M", label: "Acres Tracked" },
    { number: "92%", label: "Yield Increase Avg" },
    { number: "24/7", label: "Alert Support" }
  ];

  return (
    <div className="min-h-screen w-full bg-white flex flex-col overflow-hidden">
      
      {/* Hero Section with Full Screen Background */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Full Screen Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90')`,
            backgroundAttachment: 'fixed',
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
            zIndex: 0,
            backgroundColor: '#10b981'
          }}
        ></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-[1]"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse z-[1]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse z-[1]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-15 animate-pulse z-[1]" style={{ animationDelay: '4s' }}></div>

        {/* Content - Text Over Image */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-block mb-6 animate-fade-in">
            <span className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-semibold border border-white/30 shadow-lg">
              🚀 Smart Farming Revolution
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl">
            Smarter Farming,<br/>Better Harvests
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow-lg">
            CropVision combines AI, real-time data, and farming expertise to help you monitor, predict, and optimize every aspect of your crop production.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-10 py-5 rounded-xl text-white font-semibold shadow-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-3xl hover:scale-105 transition-all transform flex items-center justify-center gap-2 text-lg border-2 border-white/20"
            >
              Get Started Free <ArrowRight size={22} />
            </Link>

            <Link
              to="/login"
              className="px-10 py-5 rounded-xl font-semibold bg-white/10 backdrop-blur-md text-white border-2 border-white/40 hover:bg-white/20 hover:border-white/60 transition-all flex items-center justify-center gap-2 text-lg shadow-xl"
            >
              Sign In
            </Link>
          </div>

          {/* Floating feature cards */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Leaf className="text-white" size={28} />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-white">Real-Time Monitoring</div>
                  <div className="text-sm text-white/80">24/7 Crop Tracking</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="text-white" size={28} />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-white">AI Analytics</div>
                  <div className="text-sm text-white/80">Smart Predictions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Powerful Features for Modern Farmers
          </h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            Everything you need to make data-driven farming decisions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all border border-gray-100">
                <feature.icon size={48} className={`${feature.color} mb-4`} />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Add Your Fields", desc: "Input crop details, location, and soil info" },
              { step: 2, title: "Monitor Growth", desc: "Track real-time growth stages and health" },
              { step: 3, title: "Get Alerts", desc: "Receive pest and weather notifications" },
              { step: 4, title: "Optimize Yield", desc: "Use insights to maximize your harvest" }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-center">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-green-400 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Loved by Farmers</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            See how CropVision is transforming farms across the country
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="text-5xl mr-4">{test.image}</div>
                  <div>
                    <h4 className="font-bold text-lg">{test.name}</h4>
                    <p className="text-green-600 text-sm">{test.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{test.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Checklist */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What You Get</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              "Real-time crop health monitoring",
              "AI-powered growth stage detection",
              "Pest & disease alerts",
              "Yield prediction analytics",
              "Weather forecasting integration",
              "Activity & harvest tracking",
              "Multi-field management",
              "Export reports & analytics",
              "Mobile-responsive design",
              "24/7 alert notifications",
              "Crop recommendations engine",
              "Free and premium plans"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <CheckCircle size={24} className="text-green-500 flex-shrink-0" />
                <span className="text-lg text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl opacity-90 mb-10">
            Join thousands of farmers already using CropVision to grow smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-10 py-4 bg-white text-green-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition transform inline-flex items-center justify-center gap-2"
            >
              Start Free Trial <ArrowRight size={20} />
            </Link>

            <Link
              to="/login"
              className="px-10 py-4 bg-green-800 text-white font-bold rounded-xl border-2 border-white hover:bg-green-900 transition inline-flex items-center justify-center gap-2"
            >
              Sign In to Your Account
            </Link>
          </div>

          <p className="mt-8 text-green-100">
            No credit card required • Start monitoring in 2 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                🌾 CropVision
              </h4>
              <p className="text-sm">Smart farming starts here.</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Product</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Download</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2025 CropVision. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}