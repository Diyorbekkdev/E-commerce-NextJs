"use client";

import Search from "antd/es/input/Search";
import { useParams } from "next/navigation";
import './categoryProdcuts.scss'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { request } from "@/server/request";
export default function CategoryPage() {
  const { categoryId } = useParams();
  const onSearch = (value) => console.log(value);
  const [search, setSearch] = useState("");
  const [categoryProdcuts, setCategoryProducts] = useState({ total: 0, products: [] })
  const getProducts = async ({ categoryId, search }) => {
    try {
      const { data } = await request(
        `product?category=${categoryId}`
      );
      setCategoryProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts({ categoryId, search });
  }, [search, categoryId]);


  console.log(categoryProdcuts.products);
  return (
    <main>
      <section className="products">
        <div className="container">
          <div className="searching__box pt-36">
            <Search
              placeholder="input search text"
              style={{ width: '35%' }}
              onSearch={(value) => console.log(value)}
            />

          </div>

            <div className="category_products mt-10 p-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryProdcuts?.products?.map((res)=> (
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
                      <p className="text-white mb-1"><span className="font-bold">Name:</span> {res?.title}</p>
                      <p className="text-white mb-1"><span className="font-bold">Price:</span> {res?.price} UZS</p>
                      <p className="text-white mb-1"><span className="font-bold">Amount:</span> {res?.sold}</p>
                      <Button type="primary" className="bg-cyan-500">Add to Cart</Button>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>
    </main>
  );
}
