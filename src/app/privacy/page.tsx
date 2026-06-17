import { BRAND } from "@/lib/brand";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${BRAND.storeName}.`,
};

export default function PrivacyPage() {
  return (
    <div className="section-padding mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Legal
        </p>
        <h1 className="mb-4 font-display text-4xl text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-obsidian-300">
          How we collect, use, and protect your information.
        </p>
      </div>

      <div className="glass-card space-y-6 p-8 text-sm leading-relaxed text-obsidian-300">
        <p>
          <strong className="text-white">{BRAND.company}</strong> (&ldquo;we,&rdquo;
          &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our store.
        </p>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            Information We Collect
          </h2>
          <p>
            We collect personal information you provide to us, such as your name,
            email address, shipping address, and payment information when you
            place an order. We also automatically collect certain information
            when you visit our site, including your IP address, browser type, and
            browsing behavior.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            How We Use Your Information
          </h2>
          <ul className="list-inside list-disc space-y-1">
            <li>To process and fulfill your orders</li>
            <li>To communicate with you about your order</li>
            <li>To send promotional offers (with your consent)</li>
            <li>To improve our website and customer experience</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            Data Protection
          </h2>
          <p>
            We implement industry-standard security measures, including SSL
            encryption, to protect your personal information. Payment
            transactions are processed through PCI-compliant payment gateways,
            and we do not store full credit card details on our servers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            Third-Party Sharing
          </h2>
          <p>
            We do not sell your personal information to third parties. We may
            share information with trusted service providers who assist in
            operating our store (e.g., payment processors, shipping carriers),
            provided they agree to keep your information confidential.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            Your Rights
          </h2>
          <p>
            You have the right to access, correct, or delete your personal
            information at any time. To exercise these rights, please contact us
            at {BRAND.email}. You may also unsubscribe from marketing emails at
            any time using the link provided in our communications.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            Cookies
          </h2>
          <p>
            We use cookies to enhance your browsing experience, analyze site
            traffic, and serve personalized content. You can control cookie
            preferences through your browser settings. Disabling cookies may
            affect certain features of our site.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            Contact
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <span className="text-accent-light">{BRAND.email}</span>.
          </p>
        </section>

        <p className="pt-4 text-xs text-obsidian-500">
          Last updated: {BRAND.year}
        </p>
      </div>
    </div>
  );
}
