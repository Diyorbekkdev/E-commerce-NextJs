"use client";

import Search from "antd/es/input/Search";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Spin, message, notification  } from "antd";
import { request } from "@/server/request";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slice/authSlice";

import "./categoryProdcuts.scss";
import Link from "next/link";
export default function CategoryPage() {
  const { isAuth, cart } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [search, setSearch] = useState("");
  const [categoryProdcuts, setCategoryProducts] = useState({
    total: 0,
    products: [],
  });

  const [loading, setLoading] = useState(false);
  const getProducts = async ({ categoryId, search }) => {
    console.log(search);
    try {
      setLoading(true);
      const { data } = await request(`product?category=${categoryId}&search=${search}`);
      setCategoryProducts(data);
      setLoading(false);
    } catch (err) {
      message.error(err.response ? err.response.data.msg : "Timeout");
      message.error("Oops! Something went wrong.", err);
    }
  };

  useEffect(() => {
    getProducts({ categoryId, search });
  }, [search,categoryId]);

  const addItemToCart = (product) => {
    if (isAuth) {
      dispatch(addToCart(product));
      message.success('Product added to cart!');
    } else {
      message.warning('Please log in to add items to your cart.');
    }
  };


  return (
    <main>
      <section className="products">
        <div className="container">
          <div className="searching__box pt-36">
            <Search
              placeholder="input search text"
              style={{ width: "35%" }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={`category_products mt-10 p-10 ${loading ? "" : "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}`}>
            {loading ? (
              <div className="w-full flex justify-center  text-center h-10 m-auto">
                <Spin size="large" />
              </div>
            ) : (
              categoryProdcuts?.products?.map((res) => (
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
                      <span className="font-bold">Name:</span> <Link href={`card/${res?._id}`}>{res?.title}</Link> 
                    </p>
                    <p className="text-white mb-1">
                      <span className="font-bold">Price:</span> {res?.price} UZS
                    </p>
                    <p className="text-white mb-1">
                      <span className="font-bold">Amount:</span> {res?.sold}
                    </p>
                    <Button type="primary" className="bg-cyan-500" onClick={() => addItemToCart(res)}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
