import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Mission & Team",
  description: "Learn about Idensphere's mission to revolutionize education using AI and Blockchain. Meet our team of dedicated innovators.",
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
