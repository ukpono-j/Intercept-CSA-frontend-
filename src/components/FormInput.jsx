import { colors } from '../utils/colors';

function FormInput({ label, type = 'text', name, value, onChange, required = false, ...props }) {
  const isTextarea = type === 'textarea';

  return (
    <div className="mb-4">
      <label htmlFor={name} className={`block text-${colors.text} text-sm font-medium mb-1`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-${colors.secondary} focus:border-transparent text-${colors.text}`}
          rows="4"
          {...props}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-${colors.secondary} focus:border-transparent text-${colors.text}`}
          {...props}
        />
      )}
    </div>
  );
}

export default FormInput;