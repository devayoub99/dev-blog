import { logout } from "@/actions/auth-actions";

export default function SignoutButton() {
  return (
    <button
      type="button"
      onClick={logout}
      className="flex items-center justify-center px-4 py-2 m-4 text-white transition-colors bg-black rounded-none hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Logout
    </button>
  );
}
