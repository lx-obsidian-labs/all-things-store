const BRAND = {
  name: "All Things",
  email: "hello@allthings.store",
  siteUrl: "https://allthings.store",
};

function wrapper(content: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f0f14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <div style="background:#1a1a20;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.05);">
      <div style="background:linear-gradient(135deg,#7c3aed,#a78bfa);padding:40px 32px;text-align:center;">
        <h1 style="margin:0;font-size:28px;font-weight:700;color:#fff;letter-spacing:-0.5px;">${BRAND.name}</h1>
      </div>
      <div style="padding:32px;">
        ${content}
      </div>
      <div style="background:#0f0f14;padding:20px 32px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
        <p style="margin:0;font-size:12px;color:#71717f;">
          ${BRAND.name} &middot; ${BRAND.email}<br>
          <a href="${BRAND.siteUrl}" style="color:#a78bfa;text-decoration:none;">${BRAND.siteUrl}</a>
        </p>
        <p style="margin:8px 0 0;font-size:11px;color:#52525e;">
          If you no longer wish to receive these emails, you can unsubscribe anytime.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function textBlock(content: string) {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#e4e4e7;">${content}</p>`;
}

function ctaButton(url: string, label: string) {
  return `<div style="text-align:center;margin:24px 0;">
    <a href="${url}" style="display:inline-block;padding:14px 32px;border-radius:9999px;background:#7c3aed;color:#fff;font-size:15px;font-weight:600;text-decoration:none;transition:all 0.2s;">
      ${label}
    </a>
  </div>`;
}

function divider() {
  return `<div style="height:1px;background:rgba(255,255,255,0.05);margin:24px 0;"></div>`;
}

function orderItemRow(name: string, qty: number, price: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:14px;color:#e4e4e7;"><strong>${name}</strong> &times; ${qty}</td>
    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:14px;color:#e4e4e7;text-align:right;">${price}</td>
  </tr>`;
}

export function welcomeEmail(name: string) {
  return wrapper(`
    ${textBlock(`Hi${name ? ` ${name}` : ""},`)}
    ${textBlock("Welcome to <strong>All Things</strong>! You're now part of our community of curated shoppers.")}
    ${textBlock("Here's what you can expect:")}
    <table style="width:100%;margin:16px 0;">
      <tr><td style="padding:8px 0;font-size:14px;color:#a78bfa;">&bull; Curated product drops &mdash; new arrivals first</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:#a78bfa;">&bull; Exclusive subscriber-only discounts</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:#a78bfa;">&bull; Style inspiration &amp; buying guides</td></tr>
    </table>
    ${ctaButton(`${BRAND.siteUrl}/shop`, "Browse the Collection")}
    ${divider()}
    ${textBlock("As a welcome gift, use code <strong style='color:#a78bfa;'>WELCOME10</strong> for 10% off your first order.")}
  `);
}

export function orderConfirmationEmail(opts: {
  name: string;
  orderNumber: string;
  items: { name: string; quantity: number; price: string }[];
  total: string;
  address: string;
}) {
  const itemsHtml = opts.items.map((i) => orderItemRow(i.name, i.quantity, i.price)).join("");
  return wrapper(`
    ${textBlock(`Hi <strong>${opts.name}</strong>,`)}
    ${textBlock(`Your order <strong>#${opts.orderNumber}</strong> has been placed successfully. We're working on getting it ready for shipment.`)}
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      ${itemsHtml}
    </table>
    <div style="border-top:2px solid #7c3aed;padding:12px 0;text-align:right;font-size:18px;font-weight:700;color:#fff;">Total: ${opts.total}</div>
    ${divider()}
    ${textBlock(`<strong>Shipping to:</strong><br>${opts.address}`)}
    ${ctaButton(`${BRAND.siteUrl}/account/orders`, "Track Your Order")}
  `);
}

export function reviewRequestEmail(opts: {
  name: string;
  orderNumber: string;
  productName: string;
  productUrl: string;
}) {
  return wrapper(`
    ${textBlock(`Hi <strong>${opts.name}</strong>,`)}
    ${textBlock(`We hope you're enjoying your <strong>${opts.productName}</strong>!`)}
    ${textBlock("Your order has been delivered. We'd love to hear your thoughts — your review helps other shoppers make informed decisions.")}
    ${ctaButton(opts.productUrl, "Write a Review")}
    ${divider()}
    ${textBlock(`Order #${opts.orderNumber} &mdash; your feedback matters to us.`)}
  `);
}

export function abandonedCartEmail(opts: {
  email: string;
  items: { name: string; image?: string; price: string }[];
  cartUrl: string;
}) {
  const itemsList = opts.items
    .map((i) => `<li style="padding:8px 0;font-size:14px;color:#e4e4e7;border-bottom:1px solid rgba(255,255,255,0.05);">${i.name} &mdash; ${i.price}</li>`)
    .join("");
  return wrapper(`
    ${textBlock("You left something behind!")}
    ${textBlock("Your cart is still waiting. Here's what you saved:")}
    <ul style="list-style:none;padding:0;margin:16px 0;">
      ${itemsList}
    </ul>
    ${textBlock("Complete your order now and enjoy free shipping on orders over $50.")}
    ${ctaButton(opts.cartUrl, "Return to Cart")}
  `);
}
