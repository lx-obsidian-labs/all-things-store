"use client";

import { Check, ShoppingBag, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import type { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AddToCartButton({
  product,
  className = "",
  size = "md",
}: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart();
  const { addToast } = useToast();
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const inCart = isInCart(product.id);

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const handleClick = useCallback(() => {
    setLoading(true);
    // Micro delay for feedback
    setTimeout(() => {
      addItem(product);
      setLoading(false);
      setAdded(true);
      addToast(`${product.name} added to cart`, "success");
      setTimeout(() => setAdded(false), 2000);
    }, 300);
  }, [addItem, addToast, product]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`btn-primary ${sizeClasses[size]} ${className} disabled:opacity-80 ${
        added || inCart ? "bg-emerald-600 hover:bg-emerald-500" : ""
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : added ? (
        <>
          <Check className="h-4 w-4" />
          Added!
        </>
      ) : inCart ? (
        <>
          <Check className="h-4 w-4" />
          In Cart — Add More
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </>
      )}
    </button>
  );
}
