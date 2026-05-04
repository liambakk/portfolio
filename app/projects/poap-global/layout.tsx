import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POAP Global",
};

export default function PoapGlobalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
