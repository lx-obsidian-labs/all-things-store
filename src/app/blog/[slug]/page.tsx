import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="section-padding mx-auto max-w-4xl">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-obsidian-400 transition-colors hover:text-accent-light"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <article>
        <div className="mb-8">
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-light">
            {post.category}
          </span>
          <h1 className="mb-4 font-display text-4xl text-white sm:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-obsidian-400">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
        </div>

        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-obsidian-800">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>

        <div
          className="prose prose-invert prose-a:text-accent-light prose-headings:font-display prose-headings:text-white prose-p:text-obsidian-300 prose-li:text-obsidian-300 max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {related.length > 0 && (
        <section className="mt-16 border-t border-white/5 pt-12">
          <h2 className="mb-6 font-display text-2xl text-white">
            More from {post.category}
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group glass-card overflow-hidden transition-all hover:border-accent/30"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-obsidian-800">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-1 text-xs text-accent-light">{p.category}</p>
                  <h3 className="font-medium text-white transition-colors group-hover:text-accent-light">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
