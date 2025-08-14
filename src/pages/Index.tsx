import NavigationHeader from "@/components/NavigationHeader";
import InvestmentHero from "@/components/InvestmentHero";
import MentalidadeSection from "@/components/MentalidadeSection";
import FundamentalistSection from "@/components/FundamentalistSection";
import GraficaSection from "@/components/GraficaSection";
import ChecklistSection from "@/components/ChecklistSection";
import DueloSection from "@/components/DueloSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <NavigationHeader />
      <main>
        <InvestmentHero />
        <MentalidadeSection />
        <FundamentalistSection />
        <GraficaSection />
        <ChecklistSection />
        <DueloSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
