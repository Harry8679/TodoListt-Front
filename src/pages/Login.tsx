import { useState } from "react";
import { Link } from "react-router-dom";
import GlassAuthLayout from "../components/GlassAuthLayout";
import IconInput from "../components/IconInput";
import PasswordInput from "../components/ui/PasswordInput";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <GlassAuthLayout title="Member Login">
      <form className="space-y-5">
        <IconInput
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          icon={<span>📧</span>}
        />

        <PasswordInput
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <div className="flex justify-between text-sm text-white/70">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>
          <span className="hover:underline cursor-pointer">
            Forgot password?
          </span>
        </div>

        <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-medium transition">
          Login
        </button>
      </form>

      <p className="text-center text-sm text-white/70 mt-6">
        Pas de compte ?{" "}
        <Link to="/register" className="underline">
          Inscription
        </Link>
      </p>
    </GlassAuthLayout>
  );
};

export default Login;