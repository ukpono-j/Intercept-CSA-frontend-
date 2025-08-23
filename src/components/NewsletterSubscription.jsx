import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://intercept-csa-backend.onrender.com/api';

const Button = ({ children, variant = 'primary', className = '', disabled = false, onClick }) => {
  const baseClasses = 'px-5 py-2.5 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-[#FFC938] text-[#374050] hover:bg-[#FFC938]/90 focus:ring-[#FFC938] hover:scale-105',
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const NewsletterSubscription = ({ StayConnected }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(data.message || 'Thank you for subscribing! You\'ll receive updates on our work and ways to get involved.');
        setMessageType('success');
        setEmail('');
      } else {
        setMessage(data.message || 'Something went wrong. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('Network error. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50/30 py-12 lg:py-16">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-bl from-teal-400 to-teal-500 rounded-full blur-2xl"></div>
      </div>
      
      {StayConnected && (
        <img
          src={StayConnected}
          alt="Children playing in a safe environment"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          loading="lazy"
          decoding="async"
        />
      )}
      
      <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
        {/* Compact Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="w-6 h-6 text-teal-600" />
            <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">Stay Connected</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            Join the <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">Movement</span>
          </h2>
          
          <p className="text-base lg:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Join the movement to intercept silence and protect children. Get updates on our work and ways to help.
          </p>
        </div>
        
        {/* Compact Form */}
        <div className="max-w-lg mx-auto">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-full text-slate-900 bg-white/80 backdrop-blur-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  aria-label="Email for newsletter subscription"
                  disabled={isLoading}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubscribe(e)}
                />
              </div>
              
              <Button 
                variant="primary" 
                className="sm:px-8 shadow-lg hover:shadow-xl"
                disabled={isLoading}
                onClick={handleSubscribe}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="hidden sm:inline">Subscribing...</span>
                    <span className="sm:hidden">...</span>
                  </span>
                ) : (
                  'Join Now'
                )}
              </Button>
            </div>
            
            {message && (
              <div className={`flex items-center gap-2 p-3 rounded-lg text-sm transition-all duration-300 ${
                messageType === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {messageType === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                )}
                <span>{message}</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-xs text-slate-500 mt-6 max-w-md mx-auto">
          We respect your privacy and will never share your email address. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSubscription;