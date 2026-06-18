export function generateReference(): string {
  return `AT-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

export function generateOrderReference(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}`;
}
