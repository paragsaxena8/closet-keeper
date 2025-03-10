import { LoginForm } from "@app/components/login-form";
import { SignupForm } from "@app/components/signup-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <LoginForm />
        {/* <SignupForm /> */}
      </div>
    </div>
  );
}
