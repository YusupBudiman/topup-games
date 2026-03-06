"use client";
import CardProduct from "../ui/CardProduct";
import { Pagination, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Product() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center h-auto ">
      <div className="w-[90%] lg:w-[80%]">
        <h1 className="text-white text-xl font-bold mb-5">SEMUA GAME</h1>
        <Swiper
          className=" overflow-visible! "
          modules={[Pagination, Grid]}
          pagination
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            1024: {
              slidesPerView: 6, // desktop
            },
          }}
          grid={{
            rows: 2,
            fill: "row",
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <SwiperSlide key={i}>
              <CardProduct />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
