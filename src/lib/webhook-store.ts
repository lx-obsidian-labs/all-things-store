import { CJWebhookPayload } from "./sourcing";
import fs from "fs";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "data", "webhook-events.json");
const MAX_EVENTS = 1000;

function ensureStoreDir() {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readEvents(): CJWebhookPayload[] {
  ensureStoreDir();
  if (!fs.existsSync(STORE_PATH)) {
    return [];
  }
  try {
    const content = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

function writeEvents(events: CJWebhookPayload[]) {
  ensureStoreDir();
  fs.writeFileSync(STORE_PATH, JSON.stringify(events, null, 2));
}

export function addWebhookEvent(event: CJWebhookPayload) {
  const events = readEvents();
  events.unshift(event);
  if (events.length > MAX_EVENTS) {
    events.length = MAX_EVENTS;
  }
  writeEvents(events);
}

export function getWebhookEvents(orderId?: string, limit = 50): CJWebhookPayload[] {
  let events = readEvents();
  if (orderId) {
    events = events.filter(
      (e) => e.orderId === orderId || e.orderNumber === orderId
    );
  }
  return events.slice(0, limit);
}

export function clearWebhookEvents() {
  writeEvents([]);
}