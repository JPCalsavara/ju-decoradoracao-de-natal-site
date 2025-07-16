import { AboutSection } from "@/components/AboutSection";
import { CredibilitySection } from "@/components/CredibilitySection";
import { GaleriaArvores } from "@/components/GaleriaArvores";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <HeroSection></HeroSection>
        <CredibilitySection></CredibilitySection>
        <GaleriaArvores></GaleriaArvores>
        <AboutSection></AboutSection>
      </div>
    </>
  );
}
