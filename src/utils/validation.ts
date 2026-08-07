import { AuthMode } from "@/components/AuthTabs";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AuthFormValues = {
  email: string;
  password: string;
  displayName: string;
};

export function getAuthValidationError(
  mode: AuthMode,
  { email, password, displayName }: AuthFormValues,
): string | null {
  if (!email.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(email.trim())) return "Enter a valid email address.";
  if (!password) return "Password is required.";

  if (mode === "createAccount") {
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!displayName.trim()) return "Display name is required.";
  }

  return null;
}
