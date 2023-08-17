"use client";
import { Button, Empty, message } from "antd";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseProductQuantity,
} from "@/redux/slice/authSlice";
import { removeFromCart } from "@/redux/slice/authSlice";

import empty from "@/public/empty.png";
import { request } from "@/server/request";
import { useState } from "react";

import './cart.scss';
export default function Cart() {
  const { cart } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleIncrement = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrement = (product) => {
    if (product.quantity > 1) {
      dispatch(decreaseProductQuantity(product));
    } else {
      dispatch(removeFromCart(product));
    }
  };

  const handleOrderProducts = async () => {
    const payload = {
      cart: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
    };
    try {
      setLoading(true);

      const response = await request.post("payment", payload);
      if (response.status === 200) {
        dispatch(clearCart());
        setLoading(false);
      } else {
        message.error("Failed to order products");
      }
    } catch (error) {
      message.error("An error occurred:", error);
    }
  };

  return (
    <main className="pt-56">
      <h1 className="text-3xl mb-5 text-white font-bold text-center">
        {cart.length == 0 ? "" : "Cart Products"}
      </h1>
      <div
        className={`container wrapper_cart p-10 ${
          cart.length == 0
            ? "text-center"
            : "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        } `}
      >
        {cart.length == 0 ? (
          <div className="w-full h-1/2 flex justify-center items-center">
            <Image className="m-auto" src={empty} alt="empty" />
          </div>
        ) : (
          cart.map((res) => (
            <div className="product_card" key={res?._id}>
              <Image
                src={res?.image?.url}
                alt="product img"
                width={200}
                height={150}
                style={{
                  objectFit: "cover",
                  height: "160px",
                  width: "100%",
                  borderRadius: "12px 12px 0 0",
                }}
              />
              <div className="category_products_row p-4">
                <p className="text-white mb-1">
                  <span className="font-bold">Name:</span> {res?.title}
                </p>
                <p className="text-white mb-1">
                  <span className="font-bold">Price:</span> {res?.price} UZS
                </p>
                <p className="text-white mb-1">
                  <span className="font-bold">Amount:</span> {res?.sold}
                </p>
                <div className="flex gap-2 items-center">
                  <Button
                    type="primary"
                    className="bg-red-500 flex items-center justify-center"
                    onClick={() => handleDecrement(res)}
                  >
                    -
                  </Button>
                  <p className="text-white font-bold">{res?.quantity}</p>
                  <Button
                    type="primary"
                    className="bg-cyan-500 flex items-center justify-center"
                    onClick={() => handleIncrement(res)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="w-full flex items-center justify-center mt-6">
        {cart.length == 0 ? (
          ""
        ) : (
          <Button
            loading={loading}
            onClick={handleOrderProducts}
            className="bg-white text-center m-auto font-bold text-cyan-600"
          >
            Order Products
          </Button>
        )}
      </div>
    </main>
  );
}


