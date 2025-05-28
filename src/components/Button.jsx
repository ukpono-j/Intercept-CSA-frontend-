import { colors } from '../utils/colors';

function Button({ type = 'button', className = '', children, ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-colors bg-[${colors.primary}] text-[${colors.text}] hover:bg-[${colors.primaryDark}] focus:outline-none focus:ring-2 focus:ring-[${colors.primaryDark}] focus:ring-offset-2 shadow-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;