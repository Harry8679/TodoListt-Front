import { useState } from "react";

const PasswordInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder="Mot de passe"
        className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
};

export default PasswordInput;