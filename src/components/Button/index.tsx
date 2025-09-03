import type { ReactNode } from "react";

interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
}

const Button = ({ type, children }: ButtonProps) => {
  return (
    <button
      type={type}
      className="bg-zinc-900 text-white w-full rounded-md h-11 font-medium cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
