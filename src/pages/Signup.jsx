import React, { useState } from 'react';
import { User, Mail, Lock, Check, Phone, MapPin, Eye, EyeOff } from 'lucide-react';

// Mock API call - replace with your actual API
const mockAPI = {
  post: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (data.email === 'test@error.com') {
      throw new Error('Email already exists');
    }
    return { data: { message: 'Success' } };
  }
};

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await mockAPI.post('/auth/register-user', {
        name: formData.username,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        password: formData.password,
        role: 'user',
      });
      
      // Success - show success state
      alert('Signup successful! Please log in.');
      setFormData({
        username: '',
        email: '',
        phone: '',
        location: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FloatingInput = ({ label, type = 'text', name, value, onChange, icon: Icon, error, showToggle, onToggleShow, showPassword }) => {
    const [focused, setFocused] = useState(false);
    const hasValue = value && value.length > 0;
    const inputType = showToggle ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="relative group">
        <div className="relative">
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`
              w-full px-4 py-4 pl-12 pr-12 bg-white/90 backdrop-blur-sm border-2 rounded-2xl
              text-slate-800 placeholder-transparent font-medium
              transition-all duration-300 ease-out
              focus:bg-white focus:border-orange-400 focus:shadow-lg focus:shadow-orange-500/20
              group-hover:bg-white/95
              ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-200 hover:border-slate-300'}
            `}
            placeholder={label}
          />
          {Icon && (
            <Icon
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                focused || hasValue ? 'text-orange-500' : 'text-slate-400'
              }`}
              size={20}
            />
          )}
          {showToggle && (
            <button
              type="button"
              onClick={onToggleShow}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          <label
            className={`
              absolute left-12 transition-all duration-300 ease-out pointer-events-none font-medium
              ${focused || hasValue
                ? '-top-3 left-4 text-sm bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent px-2 bg-white'
                : 'top-4 text-slate-500'
              }
            `}
          >
            {label}
          </label>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2 ml-4 font-medium animate-pulse">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-tr from-orange-300/20 to-yellow-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative mt-32 mb-32 flex items-center justify-center min-h-screen p-4">
        {/* Main card */}
        <div className="relative w-full max-w-md">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          
          {/* Card content */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg">
                  Join Our Community
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Create Account
                </span>
              </h1>
              <p className="text-slate-600 font-medium">
                Start your journey with us today
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <FloatingInput
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                icon={User}
                error={errors.username}
              />
              
              <FloatingInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                icon={Mail}
                error={errors.email}
              />
              
              <FloatingInput
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                icon={Phone}
                error={errors.phone}
              />
              
              <FloatingInput
                label="Location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                icon={MapPin}
                error={errors.location}
              />
              
              <FloatingInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                icon={Lock}
                error={errors.password}
                showToggle={true}
                onToggleShow={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
              />
              
              <FloatingInput
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                icon={Check}
                error={errors.confirmPassword}
                showToggle={true}
                onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                showPassword={showConfirmPassword}
              />

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-slate-200">
              <p className="text-slate-600 font-medium">
                Already have an account?{' '}
                <a 
                  href="/login" 
                  className="font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent hover:from-orange-600 hover:to-yellow-600 transition-all duration-300"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;