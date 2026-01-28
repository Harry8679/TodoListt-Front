import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  return (
    <AuthLayout title="Connexion">
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Se connecter
        </button>
      </form>

      <p className="text-center text-sm text-slate-600 mt-6">
        Pas de compte ?{" "}
        <Link
          to="/register"
          className="text-indigo-600 hover:underline font-medium"
        >
          Inscription
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;