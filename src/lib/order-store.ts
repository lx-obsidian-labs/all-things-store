import fs from "fs";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "data", "orders.json");

export interface LocalOrder {
  id: string;
  orderNumber: string;
  status: "pending_cj" | "forwarded" | "failed" | "cancelled";
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    sku?: string;
    vid?: string;
    costPrice?: number;
  }>;
  subtotal: number;
  shipping: number;
  shippingMethod: string;
  total: number;
  email: string;
  shippingAddress: {
    name: string;
    phone?: string;
    address: string;
    address2?: string;
    city: string;
    province?: string;
    country: string;
    postalCode?: string;
  };
  paymentMethod: string;
  paypalCaptureId?: string;
  createdAt: string;
  updatedAt: string;
  cjOrderId?: string;
  cjOrderNumber?: string;
  cjStatus?: string;
  cjPayUrl?: string;
  cjError?: string;
  usedBalancePayment?: boolean;
  retryCount: number;
  lastRetryAt?: string;
}

function ensureStoreDir() {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readOrders(): LocalOrder[] {
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

function writeOrders(orders: LocalOrder[]) {
  ensureStoreDir();
  fs.writeFileSync(STORE_PATH, JSON.stringify(orders, null, 2));
}

export function createOrder(order: LocalOrder): LocalOrder {
  const orders = readOrders();
  
  // Check for duplicate orderNumber
  const existing = orders.find(o => o.orderNumber === order.orderNumber);
  if (existing) {
    return existing;
  }
  
  orders.unshift(order);
  writeOrders(orders);
  return order;
}

export function getOrder(orderNumber: string): LocalOrder | undefined {
  const orders = readOrders();
  return orders.find(o => o.orderNumber === orderNumber);
}

export function getOrderById(id: string): LocalOrder | undefined {
  const orders = readOrders();
  return orders.find(o => o.id === id);
}

export function updateOrder(orderNumber: string, updates: Partial<LocalOrder>): LocalOrder | undefined {
  const orders = readOrders();
  const index = orders.findIndex(o => o.orderNumber === orderNumber);
  if (index === -1) return undefined;
  
  orders[index] = { ...orders[index], ...updates, updatedAt: new Date().toISOString() };
  writeOrders(orders);
  return orders[index];
}

export function getPendingOrders(): LocalOrder[] {
  const orders = readOrders();
  return orders.filter(o => o.status === "pending_cj" || (o.status === "failed" && o.retryCount < 3));
}

export function getAllOrders(): LocalOrder[] {
  return readOrders();
}

export function incrementRetryCount(orderNumber: string): LocalOrder | undefined {
  const orders = readOrders();
  const index = orders.findIndex(o => o.orderNumber === orderNumber);
  if (index === -1) return undefined;
  
  orders[index] = { 
    ...orders[index], 
    retryCount: orders[index].retryCount + 1,
    lastRetryAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  writeOrders(orders);
  return orders[index];
}