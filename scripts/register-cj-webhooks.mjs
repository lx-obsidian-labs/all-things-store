import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";

async function getToken(apiKey) {
  const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey }),
  });
  const data = await res.json();
  if (!data.success) throw new Error("CJ auth failed: " + data.message);
  return data.data.accessToken;
}

async function registerWebhooks(token, baseUrl) {
  const webhookUrl = `${baseUrl}/api/cj/webhook`;
  
  const payload = {
    product: {
      type: "ENABLE",
      callbackUrls: [webhookUrl]
    },
    stock: {
      type: "ENABLE",
      callbackUrls: [webhookUrl]
    },
    order: {
      type: "ENABLE",
      callbackUrls: [webhookUrl]
    },
    logistics: {
      type: "ENABLE",
      callbackUrls: [webhookUrl]
    }
  };

  const res = await fetch(`${CJ_BASE}/webhook/set`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
}

async function main() {
  const apiKey = process.env.CJ_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!apiKey) {
    console.error("CJ_API_KEY not set in environment");
    process.exit(1);
  }

  console.log("Registering CJ webhooks...");
  console.log("Webhook URL:", `${baseUrl}/api/cj/webhook`);

  try {
    const token = await getToken(apiKey);
    console.log("Token acquired.");

    const result = await registerWebhooks(token, baseUrl);
    
    if (result.success || result.code === 200) {
      console.log("✅ Webhooks registered successfully!");
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.error("❌ Failed to register webhooks:");
      console.error(JSON.stringify(result, null, 2));
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

main();