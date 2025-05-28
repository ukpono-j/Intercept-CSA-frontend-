import React, { useState } from 'react';
import { User, Mail, Lock, Check, Phone, MapPin } from 'lucide-react';
import { colors } from '../utils/colors';
import { api as axiosInstance } from '../utils/api';

// Glassmorphism card component
const GlassCard = ({ children, className = '', hover = true, ...props }) => (
  <div
    className={`
      backdrop-blur-md bg-white/95 border border-[${colors.accent}]
      rounded-2xl shadow-md transition-all duration-300 ease-out
      ${hover ? `hover:bg-white/100 hover:border-[${colors.text}] hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]` : ''}
      ${className}
    `}
    style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.05)',
    }}
    {...props}
  >
    {children}
  </div>
);

// Animated gradient text
const GradientText = ({ children, className = '' }) => (
  <span
    className={`bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}] bg-clip-text text-transparent ${className}`}
    style={{
      backgroundSize: '200% 200%',
      animation: 'gradient-shift 3s ease infinite',
    }}
  >
    {children}
  </span>
);

// Neon button with glow effect
const NeonButton = ({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) => {
  const variants = {
    primary: `from-[${colors.primary}] to-[${colors.primaryDark}]`,
    secondary: `from-[${colors.secondary}] to-[${colors.secondaryDark}]`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-6 py-3 rounded-lg font-medium text-white
        bg-gradient-to-r ${variants[variant]}
        shadow-md hover:shadow-lg
        transform transition-all duration-300 ease-out
        hover:scale-105 hover:-translate-y-1
        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        before:absolute before:inset-0 before:rounded-lg before:p-[1px]
        before:bg-gradient-to-r before:${variants[variant]} before:opacity-0
        hover:before:opacity-100 before:transition-opacity before:duration-300
        ${className}
      `}
      style={{
        filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))',
      }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

// Animated input with floating label
const FloatingInput = ({ label, type = 'text', value, onChange, className = '', icon: Icon, ...props }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full px-4 py-3 bg-white/95 border border-[${colors.accent}]
          text-[${colors.text}] placeholder-transparent
          focus:border-[${colors.primary}] focus:bg-white/100
          transition-all duration-300 ease-out
          backdrop-blur-md rounded-lg
          ${Icon ? 'pl-10' : ''}
        `}
        placeholder={label}
        {...props}
      />
      {Icon && (
        <Icon
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          style={{ color: colors.text }}
          size={20}
        />
      )}
      <label
        className={`
          absolute left-4 transition-all duration-300 ease-out pointer-events-none
          ${focused || hasValue
            ? `-top-2 text-xs bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}] bg-clip-text text-transparent px-1`
            : `top-3 text-[${colors.text}]`
          }
        `}
      >
        {label}
      </label>
    </div>
  );
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      alert('Username is required');
      return false;
    }
    if (!formData.email.trim()) {
      alert('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      alert('Phone number is required');
      return false;
    }
    if (!/^\+?\d{7,15}$/.test(formData.phone)) {
      alert('Please enter a valid phone number');
      return false;
    }
    if (!formData.location.trim()) {
      alert('Location is required');
      return false;
    }
    if (!formData.password) {
      alert('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await axiosInstance.post('/auth/register-user', {
        name: formData.username,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        password: formData.password,
        role: 'user',
      });
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
      alert(error.response?.data?.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <GlassCard className="p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          <GradientText>Create Your Account</GradientText>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingInput
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            icon={User}
            required
          />
          <FloatingInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            icon={Mail}
            required
          />
          <FloatingInput
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            icon={Phone}
            required
          />
          <FloatingInput
            label="Location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            icon={MapPin}
            required
          />
          <FloatingInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            icon={Lock}
            required
          />
          <FloatingInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            icon={Check}
            required
          />
          <NeonButton
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing Up...
              </>
            ) : (
              'Sign Up'
            )}
          </NeonButton>
        </form>
        <p className="text-sm text-center mt-4" style={{ color: colors.text }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: colors.primary }} className="hover:underline">
            Log in
          </a>
        </p>
      </GlassCard>
      <style jsx="true">{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Signup;