export type ProductStatus = "placeholder" | "sourced" | "live";

export type SupplierSource =
  | "pending"
  | "aliexpress"
  | "cj-dropshipping"
  | "spocket"
  | "printful"
  | "manual";

export interface ProductVariant {
  name: string;
  options: { label: string; color?: string }[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  tags: string[];
  image: string;
  images?: string[];
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  variants?: ProductVariant[];
  createdAt: string;
  status: ProductStatus;
  supplier: {
    source: SupplierSource;
    sku?: string;
    costPrice?: number;
    shippingDays?: string;
    notes?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = {
  id: string;
  name: string;
  description: string;
};
