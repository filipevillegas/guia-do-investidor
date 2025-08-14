import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MentalidadeSection() {
  return (
    <section id="mentalidade" className="py-20 bg-gradient-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Escolhendo empresas para o longo prazo
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Compreendendo a diferença crucial entre ser <strong>sócio de uma empresa</strong> e apostar no mercado
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-primary/5 border-0 shadow-card">
            <CardHeader className="text-center pb-4">
              <div className="text-6xl mb-4 group-hover:animate-float">🧠</div>
              <CardTitle className="text-2xl font-bold text-primary">
                A Filosofia de Sócio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Investir não é comprar um <strong>bilhete de loteria digital</strong>, é adquirir uma fração de um negócio real. 
                O sucesso do seu investimento está ligado ao sucesso da empresa. 
                <span className="text-primary font-semibold"> Pense como um dono, não como um apostador.</span>
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-secondary/5 border-0 shadow-card">
            <CardHeader className="text-center pb-4">
              <div className="text-6xl mb-4 group-hover:animate-float">⚖️</div>
              <CardTitle className="text-2xl font-bold text-primary">
                Investir vs. Especular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-lg">
                <div className="p-4 bg-success/10 rounded-lg border-l-4 border-success">
                  <p className="text-success-foreground">
                    <strong className="text-success">Investir:</strong> Analisar o negócio a fundo, foco no longo prazo (anos)
                  </p>
                </div>
                <div className="p-4 bg-warning/10 rounded-lg border-l-4 border-warning">
                  <p className="text-warning-foreground">
                    <strong className="text-warning">Especular:</strong> Foco no movimento de preços (dias, horas)
                  </p>
                </div>
                <p className="text-primary font-semibold text-center">
                  Nossa metodologia é 100% focada em investir! 🎯
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Principles */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-primary mb-8">
            Princípios Fundamentais do Investidor de Longo Prazo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Foco no Negócio", desc: "Analise a empresa, não o preço da ação" },
              { icon: "⏰", title: "Paciência", desc: "Resultados sólidos levam tempo para se materializar" },
              { icon: "📚", title: "Conhecimento", desc: "Entenda antes de investir, nunca invista no que não compreende" }
            ].map((principle, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-xl shadow-card hover:shadow-elegant transition-all">
                <div className="text-4xl mb-3">{principle.icon}</div>
                <h4 className="font-bold text-primary mb-2">{principle.title}</h4>
                <p className="text-muted-foreground">{principle.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}