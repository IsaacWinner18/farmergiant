import React from "react";

const Button = ({ variant = "default", size = "md", className = "", ...props}) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50";
    const variants = {
        default: "bg-purple-600 text-white hover:bg-purple-500",
            outline: "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100",
            destructive: "bg-red-600 text-white hover:bg-red-500",
            ghost: "text-gray-800 hover:bg-gray-100",
            link: "text-blue-600 underline-offset-4 hover:underline",
    };

    
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4",
    lg: "h-10 px-6 text-lg",
  };

    return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
};


export default Button;
