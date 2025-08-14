import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Helper functions for generating price data and moving averages
function generatePriceData(periods: number, startPrice: number, trend: number, volatility: number) {
  const data = [];
  let currentPrice = startPrice;
  for (let i = 0; i < periods; i++) {
    data.push(currentPrice);
    const change = (Math.random() - 0.5) * volatility + trend;
    currentPrice += change;
    if (currentPrice < 0) currentPrice = 0;
  }
  return data;
}

function calculateSMA(data: number[], period: number) {
  const sma = [];
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const sum = slice.reduce((a, b) => a + b, 0);
    sma.push(sum / period);
  }
  return Array(period - 1).fill(null).concat(sma);
}

export default function GraficaSection() {
  const [activeTrend, setActiveTrend] = useState<'uptrend' | 'downtrend'>('uptrend');

  // Generate sample data
  const uptrendPrice = generatePriceData(180, 50, 0.15, 2);
  const uptrendSma50 = calculateSMA(uptrendPrice, 50);
  const uptrendSma200 = calculateSMA(uptrendPrice, 200);

  const downtrendPrice = generatePriceData(180, 100, -0.18, 2.2);
  const downtrendSma50 = calculateSMA(downtrendPrice, 50);
  const downtrendSma200 = calculateSMA(downtrendPrice, 200);

  const labels = Array.from({length: 180}, (_, i) => i + 1);

  const createChartData = (price: number[], sma50: (number | null)[], sma200: (number | null)[]) => ({
    labels,
    datasets: [
      {
        label: 'Preço da Ação',
        data: price,
        borderColor: 'hsl(var(--muted-foreground) / 0.6)',
        backgroundColor: 'hsl(var(--muted-foreground) / 0.1)',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.1,
        fill: false
      },
      {
        label: 'Média Móvel 50 dias',
        data: sma50,
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.3,
        fill: false
      },
      {
        label: 'Média Móvel 200 dias',
        data: sma200,
        borderColor: 'hsl(var(--secondary))',
        backgroundColor: 'hsl(var(--secondary) / 0.1)',
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.3,
        fill: false
      }
    ]
  });

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
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'hsl(var(--card))',
        titleColor: 'hsl(var(--card-foreground))',
        bodyColor: 'hsl(var(--card-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        display: false,
        grid: { display: false }
      },
      y: {
        title: {
          display: true,
          text: 'Preço (R$)',
          font: { size: 14 },
          color: 'hsl(var(--foreground))'
        },
        grid: { color: 'hsl(var(--border))' },
        ticks: { color: 'hsl(var(--muted-foreground))' }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <section id="grafica" className="py-20 bg-gradient-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Lendo as Ondas do Mercado: Análise Gráfica
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Após encontrar uma boa empresa, usamos o gráfico para decidir se é um <strong>bom momento</strong> para se associar, 
            evitando comprar <span className="text-danger font-semibold">"facas caindo"</span> 📉
          </p>
        </div>

        <Card className="shadow-elegant border-0 overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardTitle className="text-3xl font-bold text-primary mb-4">
              O Poder das Médias Móveis
            </CardTitle>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              As médias móveis de <strong className="text-secondary">200 dias</strong> (longo prazo) e 
              <strong className="text-primary"> 50 dias</strong> (médio prazo) nos ajudam a visualizar a 
              tendência principal do preço da ação, filtrando o ruído do dia a dia.
            </p>
          </CardHeader>

          <CardContent className="p-0">
            {/* Tab Buttons */}
            <div className="flex justify-center border-b bg-muted/30">
              <Button
                variant={activeTrend === 'uptrend' ? 'default' : 'ghost'}
                onClick={() => setActiveTrend('uptrend')}
                className={`rounded-none border-b-2 ${
                  activeTrend === 'uptrend' 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-transparent hover:border-primary/50'
                }`}
              >
                <span className="mr-2">📈</span>
                Tendência de Alta
              </Button>
              <Button
                variant={activeTrend === 'downtrend' ? 'default' : 'ghost'}
                onClick={() => setActiveTrend('downtrend')}
                className={`rounded-none border-b-2 ${
                  activeTrend === 'downtrend' 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-transparent hover:border-primary/50'
                }`}
              >
                <span className="mr-2">📉</span>
                Tendência de Baixa
              </Button>
            </div>

            {/* Chart Display */}
            <div className="p-8">
              <div className="h-64 md:h-96 mb-6">
                <Line
                  data={activeTrend === 'uptrend' 
                    ? createChartData(uptrendPrice, uptrendSma50, uptrendSma200)
                    : createChartData(downtrendPrice, downtrendSma50, downtrendSma200)
                  }
                  options={chartOptions}
                />
              </div>

              {/* Interpretation */}
              <div className={`p-6 rounded-lg border-l-4 ${
                activeTrend === 'uptrend' 
                  ? 'bg-success/10 border-success' 
                  : 'bg-danger/10 border-danger'
              }`}>
                <h4 className={`font-bold text-lg mb-3 ${
                  activeTrend === 'uptrend' ? 'text-success' : 'text-danger'
                }`}>
                  {activeTrend === 'uptrend' ? '✅ Cenário Ideal' : '⚠️ Cenário de Alerta'}
                </h4>
                <p className={`text-lg leading-relaxed ${
                  activeTrend === 'uptrend' ? 'text-success-foreground' : 'text-danger-foreground'
                }`}>
                  {activeTrend === 'uptrend' 
                    ? 'O preço (cinza) está acima da MM200 (laranja), e a MM50 (azul) também está acima da MM200. Isso sinaliza força e otimismo do mercado. É um ambiente favorável para novos investimentos.'
                    : 'O preço (cinza) está abaixo da MM200 (laranja). Mesmo que a empresa seja boa fundamentalmente, isso sugere pessimismo do mercado e risco de mais quedas. Paciência e cautela são essenciais.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Concepts */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: '🎯',
              title: 'MM200 - A Tendência Principal',
              desc: 'Quando o preço está acima da MM200, indica força de longo prazo. É nossa referência principal.'
            },
            {
              icon: '⚡',
              title: 'MM50 - O Momentum',
              desc: 'Mostra a força de médio prazo. Quando cruza a MM200 para cima, é um sinal bullish.'
            },
            {
              icon: '🛡️',
              title: 'Proteção de Capital',
              desc: 'Evitar compras em tendência de baixa protege contra perdas desnecessárias.'
            }
          ].map((concept, index) => (
            <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 border-0 shadow-card">
              <CardHeader>
                <div className="text-4xl mb-2">{concept.icon}</div>
                <CardTitle className="text-lg text-primary">{concept.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{concept.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}