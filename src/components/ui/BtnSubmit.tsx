import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function BtnSubmit({ children, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={`
        flex w-full py-3 items-center justify-center gap-1 rounded-md 
        bg-linear-to-br from-cyan-400 to-blue-600 cursor-pointer
        hover:from-[#68d6f7] hover:to-[#3b6aee]
        active:from-[#0a89c0] active:to-[#072bc1]
        disabled:opacity-50 disabled:cursor-not-allowed
        
        ${className}
      `}
    >
      {children}
    </button>
  );
}
