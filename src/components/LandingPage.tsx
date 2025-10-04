import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, BarChart3, Shield, ArrowRight, Clock, Target, Zap } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img 
                src="/Minimalist Logo for LifeSlice App with Lightning Bolt(1) (1).svg" 
                alt="LifeSlice Logo" 
                className="w-28"
              />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                LifeSlice
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-slate-700 font-medium mb-8 max-w-3xl mx-auto">
              Cook your day, balance your life.
            </p>
            
            {/* Hero Visual Placeholder */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="text-blue-600 mx-auto mb-4" size={64} />
                  <p className="text-lg text-gray-600 font-medium">Demo Video</p>
                  <p className="text-sm text-gray-500">See how activities become pizza slices</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Start with your first LifeSlice – Free
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Stop Burnout Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Stop burnout before it starts
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Burnout isn't just about working long hours — it's about constant energy depletion without recovery.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Research published in <em>World Psychiatry</em> (Maslach & Leiter, 2016) highlights that burnout leads to emotional exhaustion, reduced performance, and serious health risks when balance is missing.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                <strong>LifeSlice helps you track not just your time, but how your activities impact your energy.</strong> So you can spot the warning signs early — and prevent burnout before it takes over.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Plus className="text-blue-600" size={24} />
                  <span className="font-semibold text-gray-800">Add Activity</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Debug Hell (Population: You)</span>
                    <span className="text-red-600 font-medium">-3</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Sacred Coffee Ritual</span>
                    <span className="text-green-600 font-medium">+2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
            How LifeSlice works
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Plus className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Add Activities</h3>
              <p className="text-gray-600">Add your daily, weekly, or monthly activities.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Log Time</h3>
              <p className="text-gray-600">Log how much time they take.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Rate Energy</h3>
              <p className="text-gray-600">Rate whether they drain you (–5) or energise you (+5).</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-pink-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4. See Your Slice</h3>
              <p className="text-gray-600">See your life mapped in a simple circle chart — your LifeSlice.</p>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
            <p className="text-lg text-gray-600 text-center mb-8">
              If your schedule overloads the hours available, your pizza "burns" and the app nudges you to rebalance.
            </p>
            
            {/* Visual Comparison */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="bg-green-50 rounded-xl p-6 mb-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">Balanced</span>
                  </div>
                </div>
                <h4 className="font-semibold text-green-700">Healthy Balance</h4>
                <p className="text-sm text-gray-600">Energy flows in and out harmoniously</p>
              </div>
              
              <div className="text-center">
                <div className="bg-red-50 rounded-xl p-6 mb-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">Burnt</span>
                  </div>
                </div>
                <h4 className="font-semibold text-red-700">Overloaded</h4>
                <p className="text-sm text-gray-600">Too much drain, not enough recovery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Why it matters
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Studies show that people who consciously manage both workload and recovery are less likely to suffer from burnout.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                <strong>LifeSlice gives you a clear picture of how your time choices affect your energy</strong> — so you can cut down on what drains you and protect what fuels you.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">High drain activities</span>
                  <span className="ml-auto text-red-600 font-medium">-15 energy</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700">Neutral activities</span>
                  <span className="ml-auto text-gray-600 font-medium">0 energy</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Energizing activities</span>
                  <span className="ml-auto text-green-600 font-medium">+12 energy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Burnout Shield Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="text-blue-600" size={48} />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Your personal burnout shield
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              LifeSlice isn't another productivity tracker. It's a burnout prevention tool built around balance, awareness, and better choices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Target className="text-blue-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Catch energy drains</h3>
              <p className="text-gray-600">Before they pile up and overwhelm you.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Zap className="text-green-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Build recharging routines</h3>
              <p className="text-gray-600">That actually restore your energy levels.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <BarChart3 className="text-purple-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Keep days balanced</h3>
              <p className="text-gray-600">Without burning out in the process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Life's too short for burnt-out living.
          </h2>
          <p className="text-2xl text-blue-100 mb-12">
            Slice your time wisely.
          </p>
          
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-3 bg-white text-blue-600 font-bold text-xl px-10 py-5 rounded-2xl hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Start with your first LifeSlice – Free
            <ArrowRight size={24} />
          </button>
          
          <p className="text-blue-200 mt-6 text-sm">
            No credit card required • Start balancing in 2 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/Minimalist Logo for LifeSlice App with Lightning Bolt(1) (1).svg" 
              alt="LifeSlice Logo" 
              className="w-36 h-36"
            />
            <span className="text-xl font-bold text-white">LifeSlice</span>
          </div>
          <p className="text-sm">
            Cook your day, balance your life. © 2025 LifeSlice. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};