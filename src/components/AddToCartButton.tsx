"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
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
  const [added, setAdded] = useState(false);
  const inCart = isInCart(product.id);

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const handleClick = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn-primary ${sizeClasses[size]} ${className} ${
        added || inCart ? "bg-emerald-600 hover:bg-emerald-500" : ""
      }`}
    >
      {added ? (
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
