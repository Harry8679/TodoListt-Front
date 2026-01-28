import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

const IconInput = ({ icon, ...props }: Props) => {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
        {icon}
      </span>
      <input
        {...props}
        className="w-full bg-white/20 text-white placeholder-white/60 pl-10 pr-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>
  );
};

export default IconInput;