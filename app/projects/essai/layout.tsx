import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heuristic",
};

export default function EssaiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
