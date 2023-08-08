"use client";

import Image from "next/image";
import Slider from "react-slick";
import NewIcon from '@/public/new.png'
import "./topproducts.scss";
import Link from "next/link";
const TopProducts = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    variableWidth: false,
    lazyLoad: true,
    margin: 20,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="slick_wrapper">
      <div className="title flex items-center justify-center mb-10 gap-3 font">
          <Image src={NewIcon} width={200} height={150} style={{width: '45px'}} alt="new icon" />
          <p className="text-cyan-50 font-bold">Yangi Mahsulotlar</p>
      </div>
      <Slider {...settings}>
        {products?.map((pr) => {
          if (pr !== null) {
            return (
              <div key={pr} className="slider_cards">
                <Image
                  src={pr?.image?.url}
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
                <Link href={pr?._id}><p className="text-center text-cyan-50 font-bold p-3 product_name">{pr?.title}</p></Link>
              </div>
            );
          }
        })}
      </Slider>
    </div>
  );
};

export default TopProducts;
