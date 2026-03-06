import Image from "next/image";

export default function CardProduct() {
  return (
    <div className="relative">
      <div className="transition-transform duration-300 hover:scale-105 hover:z-30 hover:-translate-y-1">
        <div
          className="
          flex bg-white flex-col justify-between overflow-hidden
          relative w-28 h-28 rounded-tl-[50px] rounded-br-3xl rounded-md
          [clip-path:polygon(12%_0%,100%_0%,88%_100%,0%_100%)]
          md:w-38 md:h-34
          lg:w-42 lg:h-42 lg:rounded-tl-[80px] lg:rounded-br-[40px] lg:rounded-xl
          "
        >
          <div className="relative w-full h-full">
            <Image
              src={"/hero/hero-lor.jpg"}
              alt="image"
              sizes="100%"
              fill
              className="object-cover rounded-b-[22px]"
            />
          </div>

          <span className="py-0.5 text-center w-full bg-linear-to-br from-[#fd895d] to-[#d92d41] text-xs text-white border-t">
            Text promo
          </span>
        </div>
      </div>
    </div>
  );
}
