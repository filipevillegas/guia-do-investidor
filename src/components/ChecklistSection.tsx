import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";

const checklistItems = [
  {
    id: 1,
    title: "Crescimento de Receita (5 anos)",
    question: "É positivo e consistente?",
    tip: "Busque empresas com crescimento médio anual acima de 10%. Evite empresas com receita em queda constante.",
    icon: "📈"
  },
  {
    id: 2,
    title: "Margens de Lucro",
    question: "São saudáveis e estáveis?",
    tip: "Margem líquida acima de 10% é excelente. Margens crescentes indicam eficiência operacional.",
    icon: "💰"
  },
  {
    id: 3,
    title: "Rentabilidade (ROE/ROIC)",
    question: "É consistentemente alta (acima da Selic)?",
    tip: "ROE acima de 15% é muito bom. Consistência ao longo dos anos é mais importante que picos isolados.",
    icon: "🎯"
  },
  {
    id: 4,
    title: "Tendência de Longo Prazo",
    question: "O preço está acima da Média Móvel de 200 dias?",
    tip: "Esta é nossa primeira linha de defesa contra quedas. Preço abaixo da MM200 indica cautela.",
    icon: "📊"
  },
  {
    id: 5,
    title: "Confirmação de Tendência",
    question: "A Média Móvel de 50 dias está acima da de 200 dias?",
    tip: "Quando a MM50 cruza a MM200 para cima, temos um sinal bullish adicional. Ideal para entrada.",
    icon: "✅"
  }
];

export default function ChecklistSection() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [showTips, setShowTips] = useState<Set<number>>(new Set());

  const toggleCheck = (id: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const toggleTip = (id: number) => {
    const newTips = new Set(showTips);
    if (newTips.has(id)) {
      newTips.delete(id);
    } else {
      newTips.add(id);
    }
    setShowTips(newTips);
  };

  const completionRate = (checkedItems.size / checklistItems.length) * 100;

  return (
    <section id="checklist" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            O Checklist do Investidor
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Um processo simples de <strong>5 perguntas</strong> para guiar sua decisão final e evitar armadilhas
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8 p-6 bg-card rounded-xl shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-primary">Progresso da Análise</h3>
              <span className="text-lg font-semibold text-primary">{checkedItems.size}/5</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-primary h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-muted-foreground mt-2 text-center">
              {completionRate === 100 
                ? "🎉 Análise completa! Esta empresa passou no seu checklist." 
                : `${Math.round(completionRate)}% concluído`
              }
            </p>
          </div>

          {/* Checklist Items */}
          <div className="space-y-4">
            {checklistItems.map((item, index) => (
              <Card 
                key={item.id}
                className={`transition-all duration-300 border-0 shadow-card hover:shadow-elegant ${
                  checkedItems.has(item.id) 
                    ? 'bg-gradient-to-r from-success/10 to-success/5 border-l-4 border-success' 
                    : 'hover:bg-gradient-to-r hover:from-card hover:to-primary/5'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => toggleCheck(item.id)}
                        className="transition-all duration-200 hover:scale-110"
                      >
                        {checkedItems.has(item.id) ? (
                          <CheckCircle className="w-8 h-8 text-success" />
                        ) : (
                          <Circle className="w-8 h-8 text-muted-foreground hover:text-primary" />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                      </div>
                      <p className="text-foreground font-medium mb-3">{item.question}</p>
                      
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTip(item.id)}
                          className="text-secondary hover:text-secondary/80 p-0 h-auto font-medium"
                        >
                          {showTips.has(item.id) ? '🔽 Ocultar dica' : '💡 Ver dica'}
                        </Button>
                      </div>
                      
                      {showTips.has(item.id) && (
                        <div className="mt-3 p-4 bg-secondary/10 rounded-lg border-l-4 border-secondary animate-slide-in-up">
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            <strong className="text-secondary">Dica:</strong> {item.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card className="mt-8 border-0 shadow-elegant">
            <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="text-2xl font-bold text-primary">
                🧠 Resumo da Metodologia
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-primary text-lg">✅ Análise Fundamentalista</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <span className="text-success">•</span>
                      <span>Crescimento consistente de receita</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-success">•</span>
                      <span>Margens de lucro saudáveis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-success">•</span>
                      <span>Alta rentabilidade (ROE/ROIC)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-primary text-lg">📈 Análise Gráfica</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <span className="text-success">•</span>
                      <span>Preço acima da MM200</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-success">•</span>
                      <span>MM50 acima da MM200 (ideal)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-success">•</span>
                      <span>Proteção contra "facas caindo"</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Agora que você conhece a metodologia, que tal praticar com empresas reais?
                </p>
                <Button 
                  size="lg"
                  onClick={() => document.getElementById('duelo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-secondary text-secondary-foreground font-semibold shadow-elegant"
                >
                  ⚔️ Ir para o Duelo de Titãs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}