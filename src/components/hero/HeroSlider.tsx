{
  /* Card */
}
<div
  className="
        rounded-xl bg-linear-to-r from-[#06d3f1] to-[#1b58ff] overflow-hidden
        w-[90vw] h-[30vh] max-h-80
        md:h-[48vh]
        lg:flex lg:w-[80vw] lg:h-[34vh] 
      "
>
  <div
    className="relative overflow-hidden 
          w-full h-5/7
          lg:w-2/3 lg:h-auto lg:[clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)] 
          "
  >
    <Image
      src="/hero/hero-pubg.jpeg"
      alt="hero-img"
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
          w-full h-1/4 p-[clamp(4px,2vw,24px)]  flex items-center justify-between text-white
         
          lg:w-1/2
        "
  >
    <h1
      className="
          w-4/5 wrap-break-word
          text-xs font-extrabold
          lg:text-sm
          "
    >
      Nikmati diskon eksklusif 50% untuk pembelian pertama
    </h1>
    <button
      className="
          bg-white text-[#1a5cfe] px-2.5 py-1 rounded-full
          text-xs
          lg:text-sm
          "
    >
      GO
    </button>
  </div>
</div>;
