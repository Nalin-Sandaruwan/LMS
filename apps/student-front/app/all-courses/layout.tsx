import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore All Courses",
  description: "Browse our extensive catalog of AI-driven courses. Learn from the best interactive avatars and enhance your skills in tech, business, and more.",
  keywords: ["online courses", "AI teaching", "skill sharing", "Idensphere catalog"],
};

export default function AllCourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
