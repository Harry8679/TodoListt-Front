import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const GlassAuthLayout = ({ title, children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-white">
        <h1 className="text-center text-2xl font-semibold mb-8 tracking-wide">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default GlassAuthLayout;