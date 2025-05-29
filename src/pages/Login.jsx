import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(''); // Clear error on input change
  };


  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    // Simulate API call for demo
    setTimeout(() => {
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        alert('Login successful! Redirecting...');
        setFormData({ email: '', password: '' });
      } else {
        setError('Invalid credentials. Try demo@example.com / password');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const FloatingInput = ({ label, type, name, value, onChange, icon: Icon, showToggle = false }) => {
    const hasValue = value && value.length > 0;
    const isFocused = focusedField === name;
    const actualType = showToggle && name === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="relative group">
        <div className={`
          absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur opacity-0 
          group-hover:opacity-30 transition duration-1000 group-hover:duration-200
          ${isFocused ? 'opacity-40' : ''}
        `}></div>
        <div className="relative">
          <input
            type={actualType}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            className={`
              w-full px-4 py-4 pl-12 bg-white/95 backdrop-blur-md border rounded-xl
              text-slate-900 placeholder-transparent transition-all duration-300
              focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500/20
              ${isFocused || hasValue ? 'border-yellow-500/50' : 'border-slate-200'}
              ${error && (name === 'email' || name === 'password') ? 'border-red-400' : ''}
            `}
            placeholder={label}
            required
          />
          <Icon className={`
            absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300
            ${isFocused || hasValue ? 'text-yellow-600' : 'text-slate-400'}
          `} size={20} />

          {showToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}

          <label className={`
            absolute left-12 transition-all duration-300 pointer-events-none
            ${isFocused || hasValue
              ? '-top-2 text-xs font-medium bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent px-2 bg-white'
              : 'top-4 text-slate-500'
            }
          `}>
            {label}
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative mt-32 mb-32 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 ">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20">
                Welcome Back
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
              Sign <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">In</span>
            </h1>
            <p className="text-slate-300 text-lg font-light">
              Access your account and continue your journey
            </p>
          </div>

          {/* Login Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div onSubmit={handleSubmit} className="space-y-6">
                <FloatingInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  icon={Mail}
                />

                <FloatingInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  icon={Lock}
                  showToggle={true}
                />

                <div className="flex items-center justify-between text-sm">
                  <button className="flex items-center space-x-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 text-yellow-500 border-slate-300 rounded focus:ring-yellow-500/20 focus:ring-2" />
                    <span className="text-slate-600 group-hover:text-slate-800 transition-colors">Remember me</span>
                  </button>
                  <button className="text-yellow-600 hover:text-orange-600 transition-colors font-medium">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="group relative w-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-slate-600">
                  Don't have an account?{' '}
                  <button
                    onClick={handleSignupClick}
                    className="font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent hover:from-yellow-700 hover:to-orange-700 transition-all duration-300"
                  >
                    Create Account
                  </button>
                </p>
              </div>

              {/* Social Login Options */}
              {/* <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="w-full inline-flex justify-center py-3 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors duration-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="ml-2 text-slate-700">Google</span>
                  </button>
                  
                  <button className="w-full inline-flex justify-center py-3 px-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="#1877f2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="ml-2 text-slate-700">Facebook</span>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;