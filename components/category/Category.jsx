import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";

import "./category.scss";

const Category = ({ categories }) => {
  return (
    <Fragment>
      <h2 className="text-center mt-10 category_title text-white p-10 font-bold">Categories</h2>
      <div className="categorires_wrapper mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories?.map((res) => (
          <div className="category_card" key={res?._id}>
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
            <Link href={`category/${res?._id}`}>
              <p className="text-center text-cyan-50 font-bold p-3 product_name">
                {res?.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Category;
