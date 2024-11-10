import { SignIn } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <SignIn routing="hash" />;
    </div>
  );
}
