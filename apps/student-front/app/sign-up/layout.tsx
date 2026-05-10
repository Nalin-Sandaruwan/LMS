import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Account",
  description: "Join the future of learning. Sign up for Idensphere and start building your legacy with AI and Blockchain.",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
