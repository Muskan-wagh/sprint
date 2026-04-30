import { SignUp } from "@clerk/nextjs";

export default function GetStartedPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <SignUp 
        signInUrl="/login"
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}