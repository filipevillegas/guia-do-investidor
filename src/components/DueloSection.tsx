import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Trophy, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DuelMetric {
  name: string;
  valA: string;
  valB: string;
  winner: 'A' | 'B' | 'draw';
  numA: number;
  numB: number;
}

interface DuelData {
  title: string;
  companyA: string;
  companyB: string;
  metrics: DuelMetric[];
  conclusion: string;
  sector: string;
}

const duelData: Record<string, DuelData> = {
  bancos: {
    title: "Duelo Bancário",
    companyA: "ITUB4 (Itaú)",
    companyB: "BBDC4 (Bradesco)",
    sector: "Setor Financeiro",
    metrics: [
      { name: "Cresc. Receita (5a)", valA: "+92.4%", valB: "-9.0%", winner: 'A', numA: 92.4, numB: -9.0 },
      { name: "Margem Líquida", valA: "11.6%", valB: "8.83%", winner: 'A', numA: 11.6, numB: 8.83 },
      { name: "ROE", valA: "20.54%", valB: "11.89%", winner: 'A', numA: 20.54, numB: 11.89 }
    ],
    conclusion: "O Itaú (ITUB4) demonstra uma performance muito superior em todos os indicadores-chave. Seu crescimento de receita é explosivo comparado à retração do Bradesco, e sua eficiência (margem) e rentabilidade (ROE) são significativamente maiores. Com base nestes dados, o Itaú se apresenta como uma opção consideravelmente mais forte para o longo prazo."
  },
  varejo: {
    title: "Duelo do Varejo",
    companyA: "MGLU3 (Magazine Luiza)",
    companyB: "BHIA3 (Casas Bahia)",
    sector: "Setor de Varejo",
    metrics: [
      { name: "Cresc. Receita (5a)", valA: "+2.0%", valB: "-4.1%", winner: 'A', numA: 2.0, numB: -4.1 },
      { name: "Margem Líquida", valA: "1.0%", valB: "-6.3%", winner: 'A', numA: 1.0, numB: -6.3 },
      { name: "ROE", valA: "3.5%", valB: "-115.92%", winner: 'A', numA: 3.5, numB: -115.92 }
    ],
    conclusion: "O setor de varejo apresenta um cenário desafiador. A Magazine Luiza (MGLU3), apesar de números modestos, consegue se manter lucrativa e com leve crescimento, enquanto a Casas Bahia (BHIA3) mostra retração e uma rentabilidade extremamente negativa, destruindo valor para o acionista. Embora MGLU3 seja a clara 'vencedora' deste duelo, ambas exigem cautela devido aos desafios do setor."
  },
  tech: {
    title: "Duelo Tecnológico",
    companyA: "TOTS3 (Totvs)",
    companyB: "LWSA3 (Locaweb)",
    sector: "Setor de Tecnologia",
    metrics: [
      { name: "Cresc. Receita (5a)", valA: "+68.2%", valB: "+45.1%", winner: 'A', numA: 68.2, numB: 45.1 },
      { name: "Margem Líquida", valA: "18.3%", valB: "12.7%", winner: 'A', numA: 18.3, numB: 12.7 },
      { name: "ROE", valA: "24.8%", valB: "15.2%", winner: 'A', numA: 24.8, numB: 15.2 }
    ],
    conclusion: "Ambas as empresas de tecnologia mostram métricas sólidas, mas a Totvs (TOTS3) se destaca com crescimento superior, maior eficiência operacional e rentabilidade mais atrativa. O setor de tecnologia brasileiro tem mostrado resiliência e crescimento, tornando ambas as opções interessantes, com vantagem para a Totvs."
  }
};

export default function DueloSection() {
  const [selectedDuel, setSelectedDuel] = useState<string>("bancos");
  const data = duelData[selectedDuel];

  const chartData = {
    labels: data.metrics.map(m => m.name),
    datasets: [
      {
        label: data.companyA,
        data: data.metrics.map(m => m.numA),
        backgroundColor: 'hsl(var(--primary) / 0.7)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 2,
        borderRadius: 6
      },
      {
        label: data.companyB,
        data: data.metrics.map(m => m.numB),
        backgroundColor: 'hsl(var(--secondary) / 0.7)',
        borderColor: 'hsl(var(--secondary))',
        borderWidth: 2,
        borderRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 14 },
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'hsl(var(--card))',
        titleColor: 'hsl(var(--card-foreground))',
        bodyColor: 'hsl(var(--card-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'hsl(var(--border))' },
        ticks: { 
          color: 'hsl(var(--muted-foreground))',
          callback: function(value: any) {
            return value + '%';
          }
        },
        title: {
          display: true,
          text: 'Percentual (%)',
          color: 'hsl(var(--foreground))'
        }
      },
      x: {
        grid: { color: 'hsl(var(--border))' },
        ticks: { color: 'hsl(var(--muted-foreground))' }
      }
    }
  };

  const getWinnerIcon = (winner: 'A' | 'B' | 'draw') => {
    if (winner === 'draw') return <AlertCircle className="w-5 h-5 text-warning" />;
    return <Trophy className="w-5 h-5 text-success" />;
  };

  const getWinnerCount = () => {
    let countA = 0, countB = 0;
    data.metrics.forEach(metric => {
      if (metric.winner === 'A') countA++;
      if (metric.winner === 'B') countB++;
    });
    return { countA, countB };
  };

  const winnerCount = getWinnerCount();

  return (
    <section id="duelo" className="py-20 bg-gradient-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            ⚔️ Atividade Prática: Duelo de Titãs
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Agora é sua vez! Escolha um setor e compare duas gigantes do mercado usando os conceitos que aprendeu. 
            <strong> Qual delas parece ser a melhor sócia para o longo prazo?</strong>
          </p>
        </div>

        {/* Selector */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-4 p-4 bg-card rounded-xl shadow-card">
            <label className="font-semibold text-foreground">Escolha o Duelo:</label>
            <Select value={selectedDuel} onValueChange={setSelectedDuel}>
              <SelectTrigger className="w-64 border-primary/20 focus:ring-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bancos">🏦 Bancos: Itaú vs. Bradesco</SelectItem>
                <SelectItem value="varejo">🛍️ Varejo: Magazine Luiza vs. Casas Bahia</SelectItem>
                <SelectItem value="tech">💻 Tech: Totvs vs. Locaweb</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
          {/* Data Table */}
          <Card className="shadow-elegant border-0">
            <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="text-2xl font-bold text-primary">
                {data.title}
              </CardTitle>
              <p className="text-muted-foreground">{data.sector}</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Indicador</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-primary">{data.companyA}</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-secondary">{data.companyB}</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-foreground">Vencedor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {data.metrics.map((metric, index) => (
                      <tr key={index} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{metric.name}</td>
                        <td className={`px-6 py-4 text-center font-bold ${
                          metric.winner === 'A' ? 'bg-success/10 text-success' : 'text-muted-foreground'
                        }`}>
                          {metric.valA}
                        </td>
                        <td className={`px-6 py-4 text-center font-bold ${
                          metric.winner === 'B' ? 'bg-success/10 text-success' : 'text-muted-foreground'
                        }`}>
                          {metric.valB}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {getWinnerIcon(metric.winner)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Score Summary */}
              <div className="p-6 bg-muted/20 border-t">
                <div className="flex justify-center items-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{winnerCount.countA}</div>
                    <div className="text-sm text-muted-foreground">Vitórias {data.companyA.split(' ')[0]}</div>
                  </div>
                  <div className="text-4xl">🆚</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{winnerCount.countB}</div>
                    <div className="text-sm text-muted-foreground">Vitórias {data.companyB.split(' ')[0]}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card className="shadow-elegant border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                📊 Comparativo Visual
              </CardTitle>
              <p className="text-muted-foreground">Visualização dos indicadores principais</p>
            </CardHeader>
            <CardContent>
              <div className="h-64 md:h-80 w-full">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conclusion */}
        <Card className="mt-8 max-w-6xl mx-auto shadow-elegant border-0">
          <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center space-x-2">
              <span>🎯</span>
              <span>Conclusão da Análise</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-lg text-foreground leading-relaxed text-center mb-6">
              {data.conclusion}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                <h4 className="font-bold text-primary mb-1">Vencedor</h4>
                <p className="text-sm text-muted-foreground">
                  {winnerCount.countA > winnerCount.countB ? data.companyA : 
                   winnerCount.countB > winnerCount.countA ? data.companyB : "Empate"}
                </p>
              </div>
              
              <div className="text-center p-4 bg-warning/5 rounded-lg">
                <AlertCircle className="w-8 h-8 text-warning mx-auto mb-2" />
                <h4 className="font-bold text-primary mb-1">Lembre-se</h4>
                <p className="text-sm text-muted-foreground">
                  Análise gráfica também é essencial para timing de entrada
                </p>
              </div>
              
              <div className="text-center p-4 bg-secondary/5 rounded-lg">
                <Trophy className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h4 className="font-bold text-primary mb-1">Próximo Passo</h4>
                <p className="text-sm text-muted-foreground">
                  Aplique o checklist completo em suas análises
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}