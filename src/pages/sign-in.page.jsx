import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <SignIn />
    </main>
  );
}
