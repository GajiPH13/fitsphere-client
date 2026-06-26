import ClassesPreview from "@/components/ClassesPreview";

import HeroSection from "@/components/HeroSection";
import FitnessJourney from "@/components/home/FitnessJourney";
import LatestForumPosts from "@/components/home/LatestForumPosts";
import WhyChooseFitSphere from "@/components/home/WhyChooseFitSphere";


export default function Home() {
  return (
    <div className="">
     <HeroSection />
     {/* <FeaturedSection /> */}
     <ClassesPreview />
     <FitnessJourney />
     <LatestForumPosts />
     <WhyChooseFitSphere />
    </div>
  );
}
