import { QStash } from "@upstash/qstash";

const qstash = new QStash({ token: process.env.QSTASH_TOKEN });

export interface ProcessOrderJob {
  orderNumber: string;
  retry?: boolean;
}

export interface SyncCJJob {
  mode: "prices" | "inventory" | "full";
  limit?: number;
}

export async function enqueueProcessOrder(job: ProcessOrderJob) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  await qstash.publishJSON({
    url: `${baseUrl}/api/orders/process`,
    body: job,
    retries: 3,
    delay: "10s",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.CRON_SECRET}`,
    },
  });
}

export async function enqueueCJSync(job: SyncCJJob) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  await qstash.publishJSON({
    url: `${baseUrl}/api/cj-sync`,
    body: job,
    retries: 2,
    delay: "5s",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.CRON_SECRET}`,
    },
  });
}

export async function scheduleCronJobs() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  // Schedule daily CJ sync at 3 AM UTC
  await qstash.schedules.create({
    destination: `${baseUrl}/api/cj-sync`,
    method: "GET",
    cron: "0 3 * * *",
    body: { mode: "full" },
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.CRON_SECRET}`,
    },
  });

  // Schedule hourly order processing
  await qstash.schedules.create({
    destination: `${baseUrl}/api/orders/process-pending`,
    method: "POST",
    cron: "0 * * * *",
    body: {},
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.CRON_SECRET}`,
    },
  });
}