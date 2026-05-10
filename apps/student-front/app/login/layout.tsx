import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to Your Account",
  description: "Sign in to Idensphere to continue your learning journey and access your AI avatars.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
