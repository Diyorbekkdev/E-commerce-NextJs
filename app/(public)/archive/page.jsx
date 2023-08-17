'use client';
import { request } from "@/server/request";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Archive = () => {
const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await request.get("auth/payments");
        if (res.status === 200) {
          setPayments(res.data);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  console.log(payments);
  return (
    <div>
      <h1>Archive Page</h1>
      <ul>
      <div
        className={`container  p-10 ${
          payments?.length == 0
            ? "text-center"
            : "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        } `}
      >
        {payments?.length == 0 ? (
          <div className="w-full h-1/2 flex justify-center items-center">
            {/* <Image className="m-auto"  alt="empty" /> */}
          </div>
        ) : (
          payments?.map((res) => (
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
               <ul>
              {payments?.cart?.map((item, index) => (
                console.log(item)
                // <li key={index}>
                //   <div>
                //     <p>Item {index + 1}</p>
                //     <p>Quantity: {item.title.quantity}</p>
                //     {/* You can add additional details here */}
                //   </div>
                // </li>
              ))}
            </ul>
              {/* <div className="category_products_row p-4">
                <p className="text-white mb-1">
                  <span className="font-bold">Name:</span> {res?.status}
                </p>
                <p className="text-white mb-1">
                  <span className="font-bold">Price:</span> {res?.cart.map((el)=>(<span key={el._id}>{el.title}</span>))} UZS
                </p>
                <p className="text-white mb-1">
                  <span className="font-bold">Amount:</span> {res?.sold}
                </p>
                <div className="flex gap-2 items-center">
                  
                </div>
              </div> */}
            </div>
          ))
        )}
      </div>
      </ul>
    </div>
  );
};

export default Archive;
