"use client";

import { useState } from 'react';
import { X, Mail, Apple, Smartphone } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
}

export default function AuthModal({ isOpen, mode, onClose }: AuthModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setPhoneSubmitted(true);
      // Here you'd typically send the phone number to your backend
      console.log(`${mode} via phone:`, phoneNumber);
    }
  };

  const handleGmailClick = () => {
    console.log(`${mode} via Gmail`);
    // Integrate with Google OAuth here
  };

  const handleAppleClick = () => {
    console.log(`${mode} via Apple ID`);
    // Integrate with Apple Sign In here
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-3xl shadow-2xl p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join HIcars'}
          </h2>
          <p className="text-sm text-gray-500">
            {mode === 'login'
              ? 'Sign in to your account'
              : 'Create your account to get started'}
          </p>
        </div>

        {!phoneSubmitted ? (
          <>
            {/* Gmail Option */}
            <button
              onClick={handleGmailClick}
              className="w-full mb-3 px-6 py-3.5 flex items-center justify-center gap-3 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold text-gray-700"
            >
              <Mail size={20} className="text-red-500" />
              Continue with Gmail
            </button>

            {/* Apple Option */}
            <button
              onClick={handleAppleClick}
              className="w-full mb-4 px-6 py-3.5 flex items-center justify-center gap-3 border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold text-gray-700"
            >
              <Apple size={20} className="text-gray-900" />
              Continue with Apple
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            {/* Phone Option */}
            <form onSubmit={handlePhoneSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select className="w-24 px-3 py-3 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-700 hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-colors">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                    <option>+61</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Enter your number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3.5 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all duration-300 font-semibold text-white"
              >
                <Smartphone size={20} />
                Continue with Phone
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Smartphone size={28} className="text-green-600" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">Check Your Phone</h3>
            <p className="text-sm text-gray-500 mb-6">
              We&apos;ve sent a verification code to <span className="font-semibold text-gray-700">{phoneNumber}</span>
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center text-2xl font-bold tracking-widest focus:border-blue-500 focus:outline-none transition-colors mb-4"
            />
            <button className="w-full px-6 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold text-white transition-all duration-300 mb-3">
              Verify Code
            </button>
            <button
              onClick={() => setPhoneSubmitted(false)}
              className="w-full px-6 py-3.5 border border-gray-200 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-300"
            >
              Try Another Number
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
