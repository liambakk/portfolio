import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scholara",
};

export default function ScholaraLayout({ children }: { children: React.ReactNode }) {
  return children;
}
