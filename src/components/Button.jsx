import { colors } from '../utils/colors';

function Button({ type = 'button', className = '', children, variant = 'primary', ...props }) {
  const bg = colors[variant] || colors.primary;
  const bgHover = colors[`${variant}Dark`] || colors.primaryDark;
  const textColor = variant === 'accent' ? colors.text : '#fff';

  const baseStyles = `
    inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold 
    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
    shadow-xl hover:shadow-2xl
  `;

  const variantStyles = {
    primary: `bg-[${colors.primary}] text-white hover:bg-[${colors.primaryDark}] focus:ring-[${colors.primaryDark}]`,
    secondary: `bg-[${colors.secondary}] text-white hover:bg-[${colors.secondaryDark}] focus:ring-[${colors.secondaryDark}]`,
    accent: `bg-[${colors.accent}] text-[${colors.text}] hover:bg-[${colors.accent}] focus:ring-[${colors.accent}]`,
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      style={{
        backgroundColor: bg,
        color: textColor,
        '--hover-bg': bgHover,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;