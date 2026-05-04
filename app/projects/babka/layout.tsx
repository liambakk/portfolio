import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Babka",
};

export default function BabkaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
