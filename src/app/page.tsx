import { AboutUs } from "@/components/AboutUs";
import { Contact } from "@/components/Contact";
import { HeroBanner } from "@/components/HeroBanner";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Services />
      <AboutUs />
      <Contact />
    </>
  );
}
