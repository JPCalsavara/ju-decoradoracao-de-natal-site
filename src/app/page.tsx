import GaleriaArvores from "@/components/GaleriaArvores";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <div className="w-screen h-min-screen">
        <NavBar />
        <HeroSection></HeroSection>
        <GaleriaArvores></GaleriaArvores>
      </div>
    </>
  );
}
