import Navbar from "@/src/components/navbar/Navbar";
import HeroSection from "@/src/components/hero/HeroSection";

export default function IndexPage() {
  return (
    <div className="relative w-screen h-screen overflow-x-hidden">
      <div className="absolute  w-full h-full rounded-full bg-linear-to-br from-[#266acb] to-[#173076] blur-[100px]"></div>
      <div className="relative w-full h-full z-10">
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
}
