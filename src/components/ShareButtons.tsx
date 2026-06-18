"use client";

import { useState } from "react";
import { Twitter, Facebook, Link as LinkIcon, Check, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

const SITE_URL = "https://allthings.store";

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const links = [
    {
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      label: "Share on X",
      icon: Twitter,
      color: "hover:text-white hover:bg-white/10",
    },
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: "Share on Facebook",
      icon: Facebook,
      color: "hover:text-[#1877F2] hover:bg-[#1877F2]/10",
    },
    {
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      label: "Share on WhatsApp",
      icon: MessageCircle,
      color: "hover:text-[#25D366] hover:bg-[#25D366]/10",
    },
  ];

  return (
    <div className="flex items-center gap-1.5">
      <span className="mr-1 text-xs font-medium text-obsidian-500">Share</span>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-obsidian-400 transition-all ${link.color}`}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="Copy link"
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-obsidian-400 transition-all hover:border-accent/30 hover:text-accent-light hover:bg-accent/5`}
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <LinkIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
