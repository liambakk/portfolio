import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neura",
};

export default function NeuraLayout({ children }: { children: React.ReactNode }) {
  return children;
}
