import { type RegisterOptions, type UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

const Input = ({
  type,
  name,
  placeholder,
  register,
  error,
  rules,
}: InputProps) => {
  return (
    <div>
      <input
        className="w-full border-2 border-slate-400 rounded-md h-11 px-2"
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
