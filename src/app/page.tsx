import { AboutSection } from "@/components/AboutSection";
import { CredibilitySection } from "@/components/CredibilitySection";
import { GaleriaArvores } from "@/components/GaleriaArvores";
import GaleriaButton from "@/components/GaleriaButton";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <div className="w-screen h-min-screen">
        <HeroSection></HeroSection>
        <CredibilitySection></CredibilitySection>
        <GaleriaArvores></GaleriaArvores>
        <GaleriaButton></GaleriaButton>
        <AboutSection></AboutSection>
      </div>
    </>
  );
}
