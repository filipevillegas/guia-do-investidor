import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface MetricData {
  title: string;
  description: string;
  isRadar?: boolean;
  chart: any;
}

const metricData: Record<string, MetricData> = {
  receita: {
    title: "Crescimento da Receita",
    description: "Uma empresa saudável vende mais com o tempo. Um crescimento de receita consistente (ex: >10% ao ano) indica forte demanda e boa estratégia de mercado.",
    chart: {
      labels: ['Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'],
      datasets: [{
        label: 'Receita (em milhões)',
        data: [100, 115, 130, 150, 175],
        backgroundColor: 'hsl(var(--primary) / 0.6)',
        borderColor: 'hsl(var(--primary))',
        borderWidth: 2,
        borderRadius: 6
      }]
    }
  },
  margens: {
    title: "Margens de Lucro",
    description: "Margens altas e estáveis são sinal de eficiência e poder de precificação. A Margem Líquida mostra o lucro final para os sócios.",
    chart: {
      labels: ['Empresa Eficiente', 'Empresa Média'],
      datasets: [{
        label: 'Margem Líquida (%)',
        data: [25, 8],
        backgroundColor: ['hsl(var(--success) / 0.6)', 'hsl(var(--muted-foreground) / 0.4)'],
        borderColor: ['hsl(var(--success))', 'hsl(var(--muted-foreground))'],
        borderWidth: 2,
        borderRadius: 6
      }]
    }
  },
  roe: {
    title: "Rentabilidade (ROE)",
    description: "O Retorno sobre o Patrimônio (ROE) mede a capacidade da empresa de gerar lucro com o capital dos acionistas. Um ROE consistentemente acima da taxa Selic é um excelente sinal.",
    chart: {
      labels: ['Empresa de Qualidade', 'Taxa Selic (Ref.)'],
      datasets: [{
        label: 'Rentabilidade Anual (%)',
        data: [22, 10],
        backgroundColor: ['hsl(var(--primary) / 0.6)', 'hsl(var(--secondary) / 0.6)'],
        borderColor: ['hsl(var(--primary))', 'hsl(var(--secondary))'],
        borderWidth: 2,
        borderRadius: 6
      }]
    }
  },
  qualidade: {
    title: "O Retrato de uma Empresa de Qualidade",
    description: "Uma empresa de alta qualidade combina os três fatores: crescimento de receita, margens saudáveis e alta rentabilidade. Este é o perfil ideal para o investidor de longo prazo.",
    isRadar: true,
    chart: {
      labels: ['Crescimento Receita', 'Margem Líquida', 'ROE'],
      datasets: [{
        label: 'Empresa de Qualidade',
        data: [85, 75, 90],
        fill: true,
        backgroundColor: 'hsl(var(--primary) / 0.2)',
        borderColor: 'hsl(var(--primary))',
        pointBackgroundColor: 'hsl(var(--primary))',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'hsl(var(--primary))'
      }, {
        label: 'Empresa Mediana',
        data: [40, 50, 30],
        fill: true,
        backgroundColor: 'hsl(var(--secondary) / 0.2)',
        borderColor: 'hsl(var(--secondary))',
        pointBackgroundColor: 'hsl(var(--secondary))',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'hsl(var(--secondary))'
      }]
    }
  }
};

export default function FundamentalistSection() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const metrics = [
    { key: 'receita', icon: '📈', title: '1. Crescimento da Receita', desc: 'É o "salário" da empresa. Mostra se ela está vendendo mais ao longo do tempo. Buscamos crescimento consistente.' },
    { key: 'margens', icon: '💰', title: '2. Margens de Lucro', desc: 'É o que sobra do "salário". Mede a eficiência operacional e a lucratividade real do negócio.' },
    { key: 'roe', icon: '🎯', title: '3. ROE / ROIC', desc: 'Mede a rentabilidade. Mostra quão bem a empresa usa o dinheiro investido para gerar lucro.' },
    { key: 'qualidade', icon: '💎', title: 'Qualidade do Negócio', desc: 'Juntando as peças: uma empresa de qualidade cresce, é eficiente e rentável. Veja o resumo visual.' }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 14 },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'hsl(var(--card))',
        titleColor: 'hsl(var(--card-foreground))',
        bodyColor: 'hsl(var(--card-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'hsl(var(--border))' },
        ticks: { color: 'hsl(var(--muted-foreground))' }
      },
      x: {
        grid: { color: 'hsl(var(--border))' },
        ticks: { color: 'hsl(var(--muted-foreground))' }
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 14 },
          padding: 20
        }
      }
    },
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          font: { size: 14 },
          color: 'hsl(var(--foreground))'
        },
        grid: { color: 'hsl(var(--border))' },
        ticks: { color: 'hsl(var(--muted-foreground))' }
      }
    }
  };

  return (
    <section id="fundamentalista" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Raio-X Financeiro: Análise Fundamentalista
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Aprenda a diagnosticar a saúde de uma empresa com <strong>4 métricas vitais</strong>. 
            Clique em cada card para explorar em detalhes.
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card 
              key={metric.key}
              className={`cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 border-0 shadow-card ${
                selectedMetric === metric.key 
                  ? 'ring-2 ring-primary shadow-glow bg-gradient-to-br from-primary/5 to-secondary/5' 
                  : 'hover:bg-gradient-to-br hover:from-card hover:to-primary/5'
              }`}
              onClick={() => setSelectedMetric(selectedMetric === metric.key ? null : metric.key)}
            >
              <CardHeader className="text-center pb-3">
                <div className={`text-4xl mb-2 transition-transform duration-300 ${
                  selectedMetric === metric.key ? 'animate-pulse-glow' : ''
                }`}>
                  {metric.icon}
                </div>
                <CardTitle className="text-lg font-bold text-secondary">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {metric.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Display */}
        {selectedMetric && (
          <Card className="mb-8 shadow-elegant border-0 animate-slide-in-up">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary mb-4">
                {metricData[selectedMetric]?.title}
              </CardTitle>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                {metricData[selectedMetric]?.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-64 md:h-80 w-full">
                {metricData[selectedMetric]?.isRadar ? (
                  <Radar 
                    data={metricData[selectedMetric].chart} 
                    options={radarOptions}
                  />
                ) : (
                  <Bar 
                    data={metricData[selectedMetric].chart} 
                    options={chartOptions}
                  />
                )}
              </div>
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedMetric(null)}
                  className="border-primary/20 hover:bg-primary/5"
                >
                  Fechar Análise
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="max-w-3xl mx-auto p-8 bg-gradient-primary rounded-2xl shadow-elegant">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
              🎯 Lembre-se: Qualidade é Tudo!
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-6">
              Uma empresa que cresce consistentemente, mantém margens saudáveis e oferece alta rentabilidade 
              aos acionistas é o que buscamos para construir riqueza no longo prazo.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => document.getElementById('grafica')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-semibold"
            >
              Próximo: Análise Gráfica 📈
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}