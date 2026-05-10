import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Plans | Join Idensphere",
  description: "Choose the perfect plan for your learning goals. Access exclusive courses, AI avatars, and blockchain-backed rewards.",
};

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
