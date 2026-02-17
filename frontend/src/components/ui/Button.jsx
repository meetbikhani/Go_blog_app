import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = ({ children, className, variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 border-transparent",
    outline:
      "bg-transparent text-white border-white hover:bg-white hover:text-black",
    ghost: "bg-transparent text-white hover:bg-white/10 border-transparent",
    danger: "bg-red-600 text-white hover:bg-red-700 border-transparent",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-colors duration-200 border transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
