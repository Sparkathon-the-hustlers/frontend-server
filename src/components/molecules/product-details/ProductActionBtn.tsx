"use client";
import { Button } from "@/components/atoms/Button";
import React, { useState } from "react";
import { ShoppingCart, CreditCard, Coins } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface ActionBtnProps {
  productId?: number;
  quantity?: number;
  token?: string | undefined;
  addressId?: number;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ productId, quantity = 1, token, addressId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyFromCoins = async () => {
    if (!productId) {
      toast.error("Product not found");
      return;
    }

    setIsLoading(true);
    
    try {
      if (!token) {
        toast.error("Please login first");
        setIsLoading(false);
        return;
      }

      const response = await fetch("http://localhost:9000/api/user/order/buy-now-from-green-point", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: quantity,
          addressId: addressId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Order placed successfully! Order ID: ${data.orderId}`);
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 font-semibold w-full">
      <Link
        href="/checkout"
        className="whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer flex items-center justify-center gap-2 flex-1 bg-blue-700 text-white px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95"
        aria-label="Buy Now"
      >
        <CreditCard size={18} />
        Buy Now
      </Link>
      <Button
        onClick={handleBuyFromCoins}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 flex-1 bg-green-600 text-white px-4 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-gray-500 active:scale-95 disabled:opacity-50"
        aria-label="Buy from Coins"
      >
        <Coins size={18} />
        {isLoading ? "Processing..." : "Buy from Coins"}
      </Button>
    </div>
  );
};

export default ActionBtn;