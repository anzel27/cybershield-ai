"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { 
  Shield, 
  ShieldAlert,
  Network,
  LayoutDashboard,
  BrainCircuit,
  RefreshCcw,
  Lock, 
  Zap, 
  Search, 
  Activity, 
  Cpu, 
  ChevronRight, 
  Menu, 
  X, 
  Terminal,
  Globe,
  Database,
  ShieldCheck
} from 'lucide-react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-cyan-400" />,
      title: "Real-time Threat Detection",
      description: "Our neural networks analyze traffic patterns in milliseconds to identify and block zero-day exploits before they breach your perimeter."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: "Autonomous Response",
      description: "AI-driven containment protocols automatically isolate compromised nodes to prevent lateral movement across your network."
    },
    {
      icon: <Search className="w-8 h-8 text-cyan-400" />,
      title: "Predictive Analytics",
      description: "Leverage machine learning to forecast potential vulnerabilities based on global threat intelligence and historical data."
    },
    {
      icon: <Cpu className="w-8 h-8 text-blue-400" />,
      title: "Neural Firewall",
      description: "A self-evolving defense layer that adapts its filtering rules based on emerging attack vectors and behavioral anomalies."
    },
    {
      icon: <Activity className="w-8 h-8 text-cyan-400" />,
      title: "Smart Monitoring",
      description: "Unified visibility across cloud, hybrid, and on-premise environments with intelligent alerting to reduce noise."
    },
    {
      icon: <Lock className="w-8 h-8 text-blue-400" />,
      title: "Quantum Encryption",
      description: "Next-generation cryptographic standards ensure your sensitive data remains secure even against future compute capabilities."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-[30%] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative">
              <ShieldCheck className="w-8 h-8 text-cyan-400 relative z-10" />
              <div className="absolute inset-0 bg-cyan-400/20 blur-lg rounded-full group-hover:bg-cyan-400/40 transition-colors" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              CYBERSHIELD <span className="text-cyan-400">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Platform', 'Solutions', 'Resources', 'Pricing'].map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">
                {item}
              </a>
            ))}
            <Link
  href="/login"
  className="px-5 py-2 rounded-full bg-cyan-500 text-slate-950 text-sm font-bold hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
>
  Sign In
</Link>
          </div>

          <button className="md:hidden text-slate-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-6 animate-pulse">
            <Terminal className="w-4 h-4" /> v2.0 AI Core Now Live
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Next-Gen Security <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Driven by Neural Logic
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
            Protect your digital infrastructure with the world&apos;s most advanced autonomous cybersecurity platform. Detect, respond, and neutralize threats before they even happen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
  href="/login"
  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2 group"
>
  Start Monitoring
  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</Link>
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-white/10 text-white font-bold hover:bg-slate-800 transition-all">
              View Dashboard
            </button>
          </div>

          {/* Abstract Dashboard Mockup */}
          <div className="mt-20 relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" />
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-4 shadow-2xl overflow-hidden group">
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="mx-auto text-xs text-slate-500 font-mono">system-monitor --secure --ai-active</div>
              </div>
              <div className="grid grid-cols-12 gap-4 h-[300px] lg:h-[450px]">
                <div className="col-span-3 space-y-4">
                  <div className="h-32 rounded-lg bg-white/5 border border-white/5 animate-pulse" />
                  <div className="h-full rounded-lg bg-white/5 border border-white/5" />
                </div>
                <div className="col-span-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20 relative flex items-center justify-center">
                   <Globe className="w-32 h-32 text-cyan-500/20 animate-spin-slow" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                   </div>
                </div>
                <div className="col-span-3 space-y-4">
                  <div className="h-full rounded-lg bg-white/5 border border-white/5" />
                  <div className="h-32 rounded-lg bg-white/5 border border-white/5 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Autonomous Defense Ecosystem</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our multi-layered security stack integrates seamlessly with your existing infrastructure to provide holistic protection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-6 p-3 w-fit rounded-lg bg-slate-950 border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Stats Section */}
<section className="py-20 border-y border-white/5 bg-slate-900/20">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      { label: "Cyber Attack Scenarios", val: "5+" },
      { label: "Real-Time AI Response", val: "<2s" },
      { label: "Detection Accuracy", val: "98.7%" },
      { label: "Automated Recovery", val: "100%" }
    ].map((stat, i) => (
      <div key={i} className="text-center">
        <div className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
          {stat.val}
        </div>
        <div className="text-xs md:text-sm text-cyan-500/80 font-mono tracking-wide uppercase leading-relaxed">
          {stat.label}
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Footer */}
      <footer className="pt-20 pb-10 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
                <span className="text-2xl font-extrabold tracking-wide text-white">CYBERSHIELD AI</span>
              </div>
              <p className="text-slate-400 mt-6 leading-8">
  Intelligent cyber resilience platform built for
  real-time threat detection, automated response,
  and AI-driven recovery of critical infrastructure.
</p>
            </div>
            <div>
  <h4 className="font-bold text-white mb-6">
    Platform Features
  </h4>

  <div className="space-y-4">

    <div className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
      <ShieldAlert className="w-4 h-4 text-cyan-400" />
      Threat Detection
    </div>

    <div className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
      <BrainCircuit className="w-4 h-4 text-cyan-400" />
      AI Threat Analysis
    </div>

    <div className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
      <Zap className="w-4 h-4 text-cyan-400" />
      Auto Defense
    </div>

    <div className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
      <RefreshCcw className="w-4 h-4 text-cyan-400" />
      Recovery Engine
    </div>

  </div>
</div>
            <div>
  <h4 className="font-bold text-white mb-6">
    Core Modules
  </h4>

  <div className="space-y-4">

    <div className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
      <Network className="w-4 h-4 text-cyan-400" />
      Digital Twin
    </div>

    <div className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
      <Activity className="w-4 h-4 text-cyan-400" />
      Threat Timeline
    </div>

    <div className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
      <LayoutDashboard className="w-4 h-4 text-cyan-400" />
      Executive Dashboard
    </div>

    <div className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
      <BrainCircuit className="w-4 h-4 text-cyan-400" />
      AI Threat Prediction
    </div>

  </div>
</div>
           <div>
  <h4 className="font-bold text-white mb-6">
    Technology Stack
  </h4>

  <p className="text-slate-400 text-sm leading-7 mb-6">
    CyberShield AI is powered by modern web technologies and AI-driven
    visualization tools to deliver real-time cyber resilience.
  </p>

  <div className="flex flex-wrap gap-3">

    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
      Next.js
    </span>

    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
      React
    </span>

    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
      Tailwind CSS
    </span>

    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
      Recharts
    </span>

    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
      Sonner
    </span>

    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
      TypeScript
    </span>

  </div>
</div>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-6" /> 
          <div className="border-t border-white/10 mt-16 pt-8 text-center">

  <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-3">
    Protect • Detect • Respond • Recover
  </p>

  <p className="text-slate-500 text-sm">
    © 2026 CyberShield AI.
  </p>

</div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}