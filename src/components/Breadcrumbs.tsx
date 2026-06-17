import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-obsidian-400">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-accent-light"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-obsidian-600" />
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-accent-light"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-obsidian-300">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
