'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Rocket, Users, TrendingUp } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center text-white">
          {/* Main CTA */}
          <div className="mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your{' '}
              <span className="text-yellow-300">NFT Trading</span>?
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Join the future of automated trading. Create your first AI agent in minutes 
              and start earning while you sleep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-yellow-100 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Rocket className="mr-2 w-5 h-5" />
                Start Building Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Watch Live Demo
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">1,000+</div>
              <div className="text-blue-200">Active Traders</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$2.4M</div>
              <div className="text-blue-200">Volume Traded</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-200">AI Agents Deployed</div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-blue-200 mb-4">Trusted by leading traders and institutions</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-white font-semibold">NBA Top Shot</div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="text-white font-semibold">NFL All Day</div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="text-white font-semibold">Flow Protocol</div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="text-white font-semibold">Dapper Labs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
