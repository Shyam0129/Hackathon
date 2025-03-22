import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, Bell, BarChart, CreditCard, QrCode, Layout } from 'lucide-react';
import { Auth } from './components/Auth';
import { supabase } from './lib/supabase';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function LandingPage() {
  const features = [
    {
      icon: CreditCard,
      title: "Event Ticket Booking",
      description: "Browse and book tickets with multiple pricing tiers and secure payment processing"
    },
    {
      icon: QrCode,
      title: "Digital Check-In",
      description: "Streamlined entry management with QR codes and digital verification"
    },
    {
      icon: Users,
      title: "Live Entry Tracking",
      description: "Real-time monitoring of attendee flow and event analytics"
    },
    {
      icon: Layout,
      title: "User Dashboard",
      description: "Personalized space to manage bookings and access tickets"
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Comprehensive tools for creating and managing events"
    },
    {
      icon: BarChart,
      title: "Analytics & Reporting",
      description: "Detailed insights and data-driven event performance metrics"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EventMaster</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-indigo-600">Browse Events</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Create Event</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">Dashboard</a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"
            alt="Event background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Smart Event Management<br />Made Simple
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Transform your events with our comprehensive platform. From ticket booking to real-time analytics,
            we provide everything you need to create successful events.
          </p>
          <div className="mt-10 flex space-x-4">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-gray-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Comprehensive Event Management Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and analyze successful events in one platform.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to transform your events?
            </h2>
            <p className="mt-4 text-xl text-indigo-100">
              Join thousands of successful event organizers using our platform.
            </p>
            <div className="mt-8">
              <button className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/auth"
          element={
            !session ? <Auth /> : <Navigate to="/dashboard" replace />
          }
        />
        <Route
          path="/dashboard"
          element={
            session ? <div>Dashboard (Coming Soon)</div> : <Navigate to="/auth" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;