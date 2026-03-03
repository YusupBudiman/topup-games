"use client";

import Image from "next/image";
import {
  Navigation,
  Pagination,
  Scrollbar,
  EffectFade,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
// Dummy data slider
const sliderData = [
  {
    id: 1,
    image: "/hero/hero-pubg.jpeg",
    title: "Nikmati diskon eksklusif 50% untuk pembelian pertama",
    buttonText: "GO",
  },
  {
    id: 2,
    image: "/hero/hero-pubg.jpeg",
    title: "Promo spesial minggu ini, jangan sampai terlewat",
    buttonText: "GO",
  },
  {
    id: 3,
    image: "/hero/hero-pubg.jpeg",
    title: "Dapatkan bonus item eksklusif untuk setiap top-up",
    buttonText: "GO",
  },
  {
    id: 4,
    image: "/hero/hero-pubg.jpeg",
    title: "Limited time offer: diskon hingga 70%",
    buttonText: "GO",
  },
  {
    id: 5,
    image: "/hero/hero-pubg.jpeg",
    title: "Gabung sekarang dan nikmati berbagai keuntungan",
    buttonText: "GO",
  },
];

export default function HeroSection() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, EffectFade, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        effect="fade"
        loop
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full p-4 mt-12 lg:mt-16 flex justify-center items-center relative">
              <div className="relative w-auto flex items-center justify-center">
                {/* Tombol navigasi dekat card */}
                <div className="custom-prev h-1/6 absolute left-1  top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 rounded-sm flex items-center justify-center cursor-pointer hover:bg-black/50 transition">
                  <MdNavigateBefore />
                </div>
                <div className="custom-next h-1/6 absolute right-1 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 rounded-sm flex items-center justify-center cursor-pointer hover:bg-black/50 transition">
                  <MdNavigateNext />
                </div>
                {/* Card */}
                <div
                  className="
                rounded-xl bg-linear-to-r from-[#06d3f1] to-[#1b58ff] overflow-hidden
                w-[90vw] h-[30vh] max-h-80
                md:h-[48vh]
                lg:flex lg:w-[80vw] lg:h-[34vh] 
              "
                >
                  <div
                    className="
                  relative overflow-hidden 
                  w-full h-5/7
                  lg:w-2/3 lg:h-auto lg:[clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)] 
                "
                  >
                    <Image
                      src={slide.image}
                      alt={`hero-img-${slide.id}`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div
                      className="hidden lg:block absolute bg-white/30 w-1/6 h-full right-0
                    [clip-path:polygon(80%_0%,100%_0%,100%_100%,34%_100%)]"
                    />
                  </div>

                  {/* Content Section */}
                  <div
                    className="
                  w-full h-1/4 p-[clamp(4px,2vw,24px)] flex items-center justify-between text-white
                  lg:flex-col lg:w-1/2 lg:h-full lg:justify-center lg:items-start lg:gap-4
                "
                  >
                    <h1
                      className="
                    w-4/5 wrap-break-words
                    text-xs font-extrabold
                    lg:text-xl lg:w-full
                  "
                    >
                      {slide.title}
                    </h1>
                    <button
                      className="
                    bg-white text-[#1a5cfe] px-2.5 py-1 rounded-full
                    text-xs
                    lg:text-lg lg:px-4 
                  "
                    >
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
