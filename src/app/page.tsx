import { AboutSection } from "@/components/AboutSection";
import { CredibilitySection } from "@/components/CredibilitySection";
import { GaleriaArvores } from "@/components/GaleriaArvores";
import GaleriaButton from "@/components/GaleriaButton";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection></HeroSection>
      <CredibilitySection></CredibilitySection>
      <GaleriaArvores></GaleriaArvores>
      <GaleriaButton></GaleriaButton>
      <AboutSection></AboutSection>
    </>
  );
}
