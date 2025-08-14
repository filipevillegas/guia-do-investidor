import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navigationItems = [
  { id: "mentalidade", label: "Mentalidade", icon: "🧠" },
  { id: "fundamentalista", label: "Análise Fundamentalista", icon: "📊" },
  { id: "grafica", label: "Análise Gráfica", icon: "📈" },
  { id: "checklist", label: "Checklist", icon: "✅" },
  { id: "duelo", label: "Duelo de Titãs", icon: "⚔️" }
];

export default function NavigationHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navigationItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-card/95 backdrop-blur-md shadow-card border-b border-border' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-2xl">💎</div>
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            Investindo no Futuro
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground shadow-elegant'
                  : 'text-muted-foreground hover:text-primary hover:bg-accent'
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="text-left">Menu de Navegação</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-2 mt-6">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-primary hover:bg-accent'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}