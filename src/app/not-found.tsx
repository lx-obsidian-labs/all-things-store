import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-padding mx-auto max-w-7xl text-center">
      <div className="glass-card mx-auto max-w-md py-16">
        <p className="mb-2 font-display text-6xl text-accent">404</p>
        <h1 className="mb-2 font-display text-2xl text-white">Page not found</h1>
        <p className="mb-6 text-obsidian-400">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
