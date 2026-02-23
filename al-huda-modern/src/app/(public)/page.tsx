import Hero from "@/components/sections/Hero";
import PrayerTimes from "@/components/sections/PrayerTimes";
import Services from "@/components/sections/Services";
import FeaturedPackages from "@/components/sections/FeaturedPackages";
import ShopShowcase from "@/components/sections/ShopShowcase";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <PrayerTimes />
      <Services />
      <FeaturedPackages />
      <ShopShowcase />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
