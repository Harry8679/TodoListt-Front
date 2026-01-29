import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string; // ✅ AJOUT
  children: ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-slate-800">
          {title}
        </h1>

        {subtitle && (
          <p className="text-center text-sm text-slate-500 mt-2 mb-6">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;