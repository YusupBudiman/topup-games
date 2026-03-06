import Navbar from "@/src/components/navbar/Navbar";
import HeroSection from "@/src/components/hero/HeroSection";
import Product from "@/src/components/product/Product";
export default function IndexPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden ">
      <div className="z-0 absolute w-full h-full rounded-full bg-linear-to-br from-[#266acb] to-[#173076] blur-[100px]"></div>
      <Navbar />

      <div className="mt-14 lg:mt-18">
        <HeroSection />
      </div>

      <div className="mt-12">
        <Product />
      </div>
    </div>
  );
}
