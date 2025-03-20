interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  customStyles?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  customStyles = "",
  type = "button",
  disabled = false,
}) => {
  const baseStyles =
    "px-4 py-2 border rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2 hover:bg-white/30 cursor-pointer";

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${disabled ? disabledStyles : ""} ${customStyles ? customStyles : baseStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;
