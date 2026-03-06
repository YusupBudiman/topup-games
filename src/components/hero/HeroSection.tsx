"use client";

import Image from "next/image";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";
import { event } from "../../data/event";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

export default function HeroSection() {
  const eventT = useTranslations("ContentEvent");
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
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
        pagination={{ el: ".custom-pagination", clickable: true }}
        effect="fade"
        loop
      >
        {event.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full flex justify-center items-center">
              {/* Card */}
              <div
                className="
                rounded-xl bg-linear-to-r from-[#06d3f1] to-[#1b58ff] overflow-hidden
                w-[90%] h-[30vh] max-h-80
                md:h-[48vh]
                lg:flex lg:w-[80%] lg:h-[34vh] 
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
                    alt={`event-img-${slide.id}`}
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
                    {eventT(`event_desc.${slide.id}`)}
                  </h1>
                  <button
                    className="
                    bg-white text-[#1a5cfe] px-2.5 py-1 rounded-full
                    text-xs
                    lg:text-lg lg:px-4 
                  "
                  >
                    {eventT("btn_event")}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="custom-prev h-1/6 absolute left-[5%]  top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 rounded-r-md flex items-center justify-center cursor-pointer hover:bg-black/50 transition
      lg:left-[10.5%] lg:h-1/5 lg:rounded-md"
      >
        <MdNavigateBefore className="w-4 h-4 lg:w-6 lg:h-6" />
      </div>
      <div
        className="custom-next h-1/6 absolute right-[5%] top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 rounded-l-md flex items-center justify-center cursor-pointer hover:bg-black/50 transition
      lg:right-[10.5%] lg:h-1/5 lg:rounded-md"
      >
        <MdNavigateNext className="w-4 h-4 lg:w-6 lg:h-6" />
      </div>
      <div className="z-10 bg-black/70 px-2 h-2.5 rounded-full absolute -bottom-5 -translate-x-1/2 left-1/2 flex items-center justify-center lg:left-1/3 lg:bottom-2 lg:h-3 ">
        <div className="custom-pagination"></div>
      </div>
    </div>
  );
}
