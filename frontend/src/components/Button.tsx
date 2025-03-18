interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  const baseStyles =
    "px-4 py-2 border bg-cyan-400 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyles}  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
