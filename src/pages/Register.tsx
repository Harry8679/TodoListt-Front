import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  return (
    <AuthLayout title="Inscription">
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

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
          Créer un compte
        </button>
      </form>

      <p className="text-center text-sm text-slate-600 mt-6">
        Déjà un compte ?{" "}
        <Link
          to="/login"
          className="text-indigo-600 hover:underline font-medium"
        >
          Connexion
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;