import { login } from "@/actions/auth-actions";

export default function OAuthButton() {
  return (
    <button
      type="button"
      onClick={() => login("github")}
      className="flex items-center justify-center w-full py-2 text-white transition-colors bg-black rounded-none font-tajawal hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Login with GitHub
    </button>
  );
}
