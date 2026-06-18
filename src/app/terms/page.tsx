import Link from "next/link";
import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Review the ${BRAND.storeName} terms and conditions governing your use of our marketplace and purchases.`,
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <div className="section-padding mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-light">
          Legal
        </p>
        <h1 className="mb-4 font-display text-4xl text-white sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-obsidian-300">
          The terms governing your use of {BRAND.storeName}.
        </p>
      </div>

      <div className="glass-card space-y-6 p-8 text-sm leading-relaxed text-obsidian-300">
        <p>
          Welcome to {BRAND.storeName}, operated by{" "}
          <strong className="text-white">{BRAND.company}</strong>. By accessing or
          using our website, you agree to be bound by these Terms of Service.
        </p>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            1. General
          </h2>
          <p>
            These Terms of Service govern your use of our website and the
            purchase of any products from us. We reserve the right to update
            these terms at any time, and changes will be effective immediately
            upon posting.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            2. Products & Pricing
          </h2>
          <p>
            All product descriptions, images, and pricing are subject to change
            without notice. We make every effort to display accurate information,
            but we do not guarantee that product descriptions or prices are
            error-free. In the event of a pricing error, we reserve the right to
            cancel or adjust the order.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            3. Orders
          </h2>
          <p>
            By placing an order, you agree to provide accurate and complete
            information. We reserve the right to refuse or cancel any order for
            any reason, including but not limited to product availability,
            pricing errors, or suspected fraud.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            4. User Accounts
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities under your account.
            You must notify us immediately of any unauthorized use of your
            account.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            5. Intellectual Property
          </h2>
          <p>
            All content on this website — including text, images, logos, and
            design — is the property of {BRAND.company} unless otherwise noted
            and may not be reproduced without our written consent.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            6. Limitation of Liability
          </h2>
          <p>
            {BRAND.company} shall not be liable for any indirect, incidental, or
            consequential damages arising from your use of this website or the
            products purchased herein. Our total liability is limited to the
            amount paid for the product in question.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl text-white">
            7. Contact
          </h2>
          <p>
            For questions about these terms, please contact us at{" "}
            <span className="text-accent-light">{BRAND.email}</span>.
          </p>
        </section>

        <p className="pt-4 text-xs text-obsidian-500">
          Last updated: {BRAND.year}
        </p>

        <div className="pt-2">
          <Link href="/privacy" className="text-sm text-accent-light transition-colors hover:text-white">
            View our Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
