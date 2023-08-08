import { request } from "@/server/request";
import TopProducts from "@/components/topnews";
import Link from "next/link";
import Category from "@/components/category/Category";

async function getData() {
  try {
    return request("category");
  } catch (err) {
    console.log(err);
  }
}

async function getLatestProducts() {
  try {
    return request("last-products");
  } catch (err) {
    console.log(err.message);
  }
}

export default async function Home() {
  const { data: latestProducts } = await getLatestProducts();
  const { data: categories } = await getData();
  return (
    <main className="">
      <section className="container mt-5">
        <div className="box pt-28">
          <TopProducts products={latestProducts} />
        </div>
      </section>
      <section>
        <div className="container">

          <Category categories={categories}/>
        </div>
      </section>
    </main>
  );
}
