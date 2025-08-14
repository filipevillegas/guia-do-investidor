import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export default function InvestmentHero() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-primary/90 bg-gradient-primary" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-slide-in-up">
          Investindo no{" "}
          <span className="bg-gradient-secondary bg-clip-text text-transparent">
            Futuro
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed animate-slide-in-up">
          Aprenda a <strong>escolher empresas vencedoras</strong> para o longo prazo com análise fundamentalista e gráfica profissional
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up">
          <Button 
            size="lg" 
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-4 text-lg shadow-elegant hover:shadow-glow transform hover:scale-105 transition-all duration-300"
            onClick={() => scrollToSection('mentalidade')}
          >
            🚀 Começar Agora
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm font-semibold px-8 py-4 text-lg hover:scale-105 transition-all duration-300"
            onClick={() => scrollToSection('duelo')}
          >
            📊 Ver Duelo de Titãs
          </Button>
        </div>
        
        {/* Floating Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-float">
          {[
            { icon: "🧠", text: "Mentalidade" },
            { icon: "📈", text: "Análise" },
            { icon: "✅", text: "Checklist" },
            { icon: "⚔️", text: "Duelo" }
          ].map((item, index) => (
            <div key={index} className="bg-card/10 backdrop-blur-md border border-primary-foreground/20 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-primary-foreground font-medium">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}