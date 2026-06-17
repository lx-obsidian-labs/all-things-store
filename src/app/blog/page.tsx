import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { blogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description:
    "Read about product guides, lifestyle tips, and curated living insights from the All Things team.",
};

export default function BlogPage() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="section-padding mx-auto max-w-7xl">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Journal
        </p>
        <h1 className="mb-4 font-display text-4xl text-white sm:text-5xl">
          The All Things Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-obsidian-300">
          Product guides, lifestyle tips, and stories from our team.
        </p>
      </div>

      {featured.length > 0 && (
        <div className="mb-16 grid gap-6 lg:grid-cols-2">
          {featured.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group glass-card overflow-hidden transition-all hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-obsidian-800 lg:aspect-[16/10]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-obsidian-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {post.author}
                  </span>
                </div>
                <h2 className="mb-2 font-display text-xl text-white transition-colors group-hover:text-accent-light">
                  {post.title}
                </h2>
                <p className="line-clamp-2 text-sm leading-relaxed text-obsidian-400">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group glass-card overflow-hidden transition-all hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-obsidian-800">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-3 text-xs text-obsidian-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mb-2 font-medium text-white transition-colors group-hover:text-accent-light">
                  {post.title}
                </h2>
                <p className="mb-3 line-clamp-2 text-sm text-obsidian-400">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-light">
                  Read More
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
