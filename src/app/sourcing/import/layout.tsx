import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Import Products",
  description: "Import new products to the All Things catalog. Add products from AliExpress, CJ Dropshipping, and other trusted suppliers.",
  robots: { index: false, follow: false },
};

export default function ImportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
