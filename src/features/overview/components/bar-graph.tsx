'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = '시험 응시 현황 차트';

const chartData = [
  { date: '2024-04-01', 재경관리사: 45, 회계관리1급: 38, 회계관리2급: 52 },
  { date: '2024-04-02', 재경관리사: 32, 회계관리1급: 28, 회계관리2급: 41 },
  { date: '2024-04-03', 재경관리사: 58, 회계관리1급: 42, 회계관리2급: 35 },
  { date: '2024-04-04', 재경관리사: 67, 회계관리1급: 55, 회계관리2급: 48 },
  { date: '2024-04-05', 재경관리사: 89, 회계관리1급: 72, 회계관리2급: 63 },
  { date: '2024-04-06', 재경관리사: 76, 회계관리1급: 68, 회계관리2급: 71 },
  { date: '2024-04-07', 재경관리사: 54, 회계관리1급: 48, 회계관리2급: 39 },
  { date: '2024-04-08', 재경관리사: 92, 회계관리1급: 78, 회계관리2급: 85 },
  { date: '2024-04-09', 재경관리사: 23, 회계관리1급: 19, 회계관리2급: 28 },
  { date: '2024-04-10', 재경관리사: 68, 회계관리1급: 52, 회계관리2급: 45 },
  { date: '2024-04-11', 재경관리사: 85, 회계관리1급: 73, 회계관리2급: 67 },
  { date: '2024-04-12', 재경관리사: 71, 회계관리1급: 58, 회계관리2급: 49 },
  { date: '2024-04-13', 재경관리사: 89, 회계관리1급: 76, 회계관리2급: 82 },
  { date: '2024-04-14', 재경관리사: 38, 회계관리1급: 32, 회계관리2급: 44 },
  { date: '2024-04-15', 재경관리사: 34, 회계관리1급: 28, 회계관리2급: 36 },
  { date: '2024-04-16', 재경관리사: 39, 회계관리1급: 33, 회계관리2급: 42 },
  { date: '2024-04-17', 재경관리사: 112, 회계관리1급: 89, 회계관리2급: 95 },
  { date: '2024-04-18', 재경관리사: 91, 회계관리1급: 78, 회계관리2급: 85 },
  { date: '2024-04-19', 재경관리사: 61, 회계관리1급: 48, 회계관리2급: 39 },
  { date: '2024-04-20', 재경관리사: 22, 회계관리1급: 18, 회계관리2급: 25 },
  { date: '2024-04-21', 재경관리사: 34, 회계관리1급: 28, 회계관리2급: 38 },
  { date: '2024-04-22', 재경관리사: 56, 회계관리1급: 42, 회계관리2급: 35 },
  { date: '2024-04-23', 재경관리사: 35, 회계관리1급: 29, 회계관리2급: 44 },
  { date: '2024-04-24', 재경관리사: 97, 회계관리1급: 78, 회계관리2급: 65 },
  { date: '2024-04-25', 재경관리사: 54, 회계관리1급: 48, 회계관리2급: 58 },
  { date: '2024-04-26', 재경관리사: 19, 회계관리1급: 15, 회계관리2급: 23 },
  { date: '2024-04-27', 재경관리사: 96, 회계관리1급: 78, 회계관리2급: 85 },
  { date: '2024-04-28', 재경관리사: 31, 회계관리1급: 26, 회계관리2급: 36 },
  { date: '2024-04-29', 재경관리사: 79, 회계관리1급: 64, 회계관리2급: 55 },
  { date: '2024-04-30', 재경관리사: 114, 회계관리1급: 92, 회계관리2급: 85 },
  { date: '2024-05-01', 재경관리사: 41, 회계관리1급: 35, 회계관리2급: 48 },
  { date: '2024-05-02', 재경관리사: 73, 회계관리1급: 58, 회계관리2급: 65 },
  { date: '2024-05-03', 재경관리사: 62, 회계관리1급: 48, 회계관리2급: 39 },
  { date: '2024-05-04', 재경관리사: 96, 회계관리1급: 78, 회계관리2급: 85 },
  { date: '2024-05-05', 재경관리사: 120, 회계관리1급: 98, 회계관리2급: 89 },
  { date: '2024-05-06', 재경관리사: 125, 회계관리1급: 102, 회계관리2급: 115 },
  { date: '2024-05-07', 재경관리사: 97, 회계관리1급: 78, 회계관리2급: 65 },
  { date: '2024-05-08', 재경관리사: 37, 회계관리1급: 31, 회계관리2급: 42 },
  { date: '2024-05-09', 재경관리사: 57, 회계관리1급: 45, 회계관리2급: 38 },
  { date: '2024-05-10', 재경관리사: 73, 회계관리1급: 58, 회계관리2급: 65 },
  { date: '2024-05-11', 재경관리사: 84, 회계관리1급: 68, 회계관리2급: 58 },
  { date: '2024-05-12', 재경관리사: 49, 회계관리1급: 41, 회계관리2급: 55 },
  { date: '2024-05-13', 재경관리사: 49, 회계관리1급: 41, 회계관리2급: 35 },
  { date: '2024-05-14', 재경관리사: 112, 회계관리1급: 89, 회계관리2급: 98 },
  { date: '2024-05-15', 재경관리사: 118, 회계관리1급: 95, 회계관리2급: 85 },
  { date: '2024-05-16', 재경관리사: 85, 회계관리1급: 68, 회계관리2급: 75 },
  { date: '2024-05-17', 재경관리사: 125, 회계관리1급: 102, 회계관리2급: 95 },
  { date: '2024-05-18', 재경관리사: 79, 회계관리1급: 64, 회계관리2급: 78 },
  { date: '2024-05-19', 재경관리사: 59, 회계관리1급: 48, 회계관리2급: 38 },
  { date: '2024-05-20', 재경관리사: 44, 회계관리1급: 37, 회계관리2급: 48 },
  { date: '2024-05-21', 재경관리사: 21, 회계관리1급: 17, 회계관리2급: 28 },
  { date: '2024-05-22', 재경관리사: 20, 회계관리1급: 16, 회계관리2급: 25 },
  { date: '2024-05-23', 재경관리사: 63, 회계관리1급: 51, 회계관리2급: 65 },
  { date: '2024-05-24', 재경관리사: 74, 회계관리1급: 58, 회계관리2급: 48 },
  { date: '2024-05-25', 재경관리사: 50, 회계관리1급: 41, 회계관리2급: 58 },
  { date: '2024-05-26', 재경관리사: 53, 회계관리1급: 43, 회계관리2급: 38 },
  { date: '2024-05-27', 재경관리사: 105, 회계관리1급: 85, 회계관리2급: 98 },
  { date: '2024-05-28', 재경관리사: 58, 회계관리1급: 47, 회계관리2급: 38 },
  { date: '2024-05-29', 재경관리사: 20, 회계관리1급: 16, 회계관리2급: 25 },
  { date: '2024-05-30', 재경관리사: 85, 회계관리1급: 68, 회계관리2급: 58 },
  { date: '2024-05-31', 재경관리사: 45, 회계관리1급: 37, 회계관리2급: 48 },
  { date: '2024-06-01', 재경관리사: 45, 회계관리1급: 37, 회계관리2급: 42 },
  { date: '2024-06-02', 재경관리사: 118, 회계관리1급: 95, 회계관리2급: 89 },
  { date: '2024-06-03', 재경관리사: 26, 회계관리1급: 21, 회계관리2급: 35 },
  { date: '2024-06-04', 재경관리사: 110, 회계관리1급: 89, 회계관리2급: 85 },
  { date: '2024-06-05', 재경관리사: 22, 회계관리1급: 18, 회계관리2급: 28 },
  { date: '2024-06-06', 재경관리사: 74, 회계관리1급: 58, 회계관리2급: 55 },
  { date: '2024-06-07', 재경관리사: 81, 회계관리1급: 65, 회계관리2급: 78 },
  { date: '2024-06-08', 재경관리사: 96, 회계관리1급: 78, 회계관리2급: 68 },
  { date: '2024-06-09', 재경관리사: 110, 회계관리1급: 89, 회계관리2급: 98 },
  { date: '2024-06-10', 재경관리사: 39, 회계관리1급: 31, 회계관리2급: 42 },
  { date: '2024-06-11', 재경관리사: 23, 회계관리1급: 18, 회계관리2급: 28 },
  { date: '2024-06-12', 재경관리사: 123, 회계관리1급: 98, 회계관리2급: 89 },
  { date: '2024-06-13', 재경관리사: 20, 회계관리1급: 16, 회계관리2급: 25 },
  { date: '2024-06-14', 재경관리사: 107, 회계관리1급: 85, 회계관리2급: 78 },
  { date: '2024-06-15', 재경관리사: 77, 회계관리1급: 62, 회계관리2급: 78 },
  { date: '2024-06-16', 재경관리사: 93, 회계관리1급: 75, 회계관리2급: 68 },
  { date: '2024-06-17', 재경관리사: 119, 회계관리1급: 95, 회계관리2급: 115 },
  { date: '2024-06-18', 재경관리사: 27, 회계관리1급: 22, 회계관리2급: 35 },
  { date: '2024-06-19', 재경관리사: 85, 회계관리1급: 68, 회계관리2급: 58 },
  { date: '2024-06-20', 재경관리사: 102, 회계관리1급: 82, 회계관리2급: 98 },
  { date: '2024-06-21', 재경관리사: 42, 회계관리1급: 34, 회계관리2급: 48 },
  { date: '2024-06-22', 재경관리사: 79, 회계관리1급: 64, 회계관리2급: 58 },
  { date: '2024-06-23', 재경관리사: 120, 회계관리1급: 96, 회계관리2급: 115 },
  { date: '2024-06-24', 재경관리사: 33, 회계관리1급: 27, 회계관리2급: 38 },
  { date: '2024-06-25', 재경관리사: 35, 회계관리1급: 28, 회계관리2급: 42 },
  { date: '2024-06-26', 재경관리사: 109, 회계관리1급: 87, 회계관리2급: 78 },
  { date: '2024-06-27', 재경관리사: 112, 회계관리1급: 89, 회계관리2급: 98 },
  { date: '2024-06-28', 재경관리사: 37, 회계관리1급: 30, 회계관리2급: 42 },
  { date: '2024-06-29', 재경관리사: 26, 회계관리1급: 21, 회계관리2급: 35 },
  { date: '2024-06-30', 재경관리사: 112, 회계관리1급: 89, 회계관리2급: 85 }
];

const chartConfig = {
  views: {
    label: '시험 응시자 수'
  },
  재경관리사: {
    label: '재경관리사',
    color: 'hsl(var(--chart-1))'
  },
  회계관리1급: {
    label: '회계관리 1급',
    color: 'hsl(var(--chart-2))'
  },
  회계관리2급: {
    label: '회계관리 2급',
    color: 'hsl(var(--chart-3))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('재경관리사');

  const total = React.useMemo(
    () => ({
      재경관리사: chartData.reduce((acc, curr) => acc + curr.재경관리사, 0),
      회계관리1급: chartData.reduce((acc, curr) => acc + curr.회계관리1급, 0),
      회계관리2급: chartData.reduce((acc, curr) => acc + curr.회계관리2급, 0)
    }),
    []
  );

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Card className='@container/card !pt-3'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b !p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 !py-0'>
          <CardTitle>시험 응시 현황</CardTitle>
          <CardDescription>
            <span className='hidden @[540px]/card:block'>
              지난 3개월간 시험 응시자 수
            </span>
            <span className='@[540px]/card:hidden'>지난 3개월</span>
          </CardDescription>
        </div>
        <div className='flex'>
          {['재경관리사', '회계관리1급', '회계관리2급'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            if (!chart || total[key as keyof typeof total] === 0) return null;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='data-[active=true]:bg-primary/5 hover:bg-primary/5 relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left transition-colors duration-200 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-muted-foreground text-xs'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg leading-none font-bold sm:text-3xl'>
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillBar' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='0%'
                  stopColor='var(--primary)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='100%'
                  stopColor='var(--primary)'
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill='url(#fillBar)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
