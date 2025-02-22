import { AboutUs } from "@/components/AboutUs";
import { HeroBanner } from "@/components/HeroBanner";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Services />
      <AboutUs />
    </>
  );
}
