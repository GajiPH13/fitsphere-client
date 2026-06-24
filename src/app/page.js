import ClassesPreview from "@/components/ClassesPreview";
import FeaturedSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";
import PricePlan from "@/components/PricePlan";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
     <HeroSection />
     {/* <FeaturedSection /> */}
     <ClassesPreview />
     <PricePlan />
    </div>
  );
}
