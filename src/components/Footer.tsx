import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="text-4xl">💎</div>
            <h3 className="text-3xl font-bold">Investindo no Futuro</h3>
          </div>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Transforme sua relação com o mercado financeiro através de conhecimento sólido e análise criteriosa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-6 text-center">
            <div className="text-3xl mb-3">📚</div>
            <h4 className="font-bold mb-2">Educação Contínua</h4>
            <p className="text-primary-foreground/80 text-sm">
              O aprendizado sobre investimentos é uma jornada constante. Continue estudando e aprimorando suas análises.
            </p>
          </Card>

          <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-6 text-center">
            <div className="text-3xl mb-3">⏰</div>
            <h4 className="font-bold mb-2">Paciência Estratégica</h4>
            <p className="text-primary-foreground/80 text-sm">
              Grandes fortunas são construídas com tempo. Mantenha a disciplina e o foco no longo prazo.
            </p>
          </Card>

          <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-6 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-bold mb-2">Qualidade Sempre</h4>
            <p className="text-primary-foreground/80 text-sm">
              Prefira sempre empresas de qualidade comprovada a apostas especulativas de alto risco.
            </p>
          </Card>
        </div>

        <div className="text-center border-t border-primary-foreground/20 pt-8">
          <div className="mb-6">
            <Button 
              variant="secondary" 
              onClick={scrollToTop}
              className="font-semibold"
            >
              🚀 Voltar ao Topo
            </Button>
          </div>
          
          <div className="space-y-2 text-primary-foreground/60">
            <p className="font-medium">
              © 2025 Investindo no Futuro - Conteúdo Educacional
            </p>
            <p className="text-sm">
              ⚠️ Este material tem fins educacionais. Não constitui recomendação de investimento. 
              Consulte sempre um assessor qualificado.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}