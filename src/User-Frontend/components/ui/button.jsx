export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-[#4b011d] text-white rounded-lg hover:bg-[#600227] transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};
