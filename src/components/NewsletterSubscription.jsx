import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://intercept-csa-backend.onrender.com/api';

const Button = ({ children, variant = 'primary', className = '', disabled = false, onClick }) => {
  const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 focus:ring-yellow-500',
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
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {StayConnected && (
        <img
          src={StayConnected}
          alt="Children playing in a safe environment"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="lazy"
          decoding="async"
        />
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-24 text-center relative z-10">
        <div className="mb-6"></div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Join the <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Movement</span>
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
          Join the movement to intercept silence and protect children.
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full text-slate-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              aria-label="Email for newsletter subscription"
              disabled={isLoading}
              onKeyPress={(e) => e.key === 'Enter' && handleSubscribe(e)}
            />
          </div>
          
          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              messageType === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}
          
          <Button 
            variant="primary" 
            className="w-full"
            disabled={isLoading}
            onClick={handleSubscribe}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </span>
            ) : (
              'Get Involved'
            )}
          </Button>
        </div>
        
        <p className="text-sm text-slate-400 mt-4">
          We respect your privacy and will never share your email address.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSubscription;