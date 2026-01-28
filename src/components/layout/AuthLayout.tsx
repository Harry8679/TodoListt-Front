import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const AuthLayout = ({ title, children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;