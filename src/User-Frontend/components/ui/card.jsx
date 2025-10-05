export const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-lg rounded-xl p-4 ${className}`}>{children}</div>
);

export const CardContent = ({ children }) => <div>{children}</div>;
