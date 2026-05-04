import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Mate",
};

export default function VirtualMateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
