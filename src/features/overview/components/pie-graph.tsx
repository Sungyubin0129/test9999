'use client';

import * as React from 'react';
import { IconTrendingUp, IconPalette, IconCheck } from '@tabler/icons-react';
import { Label, Pie, PieChart, Cell } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

const initialChartData = [
  {
    examType: 'financial',
    applicants: 2156,
    fill: '#3b82f6',
    name: '재경관리사'
  },
  {
    examType: 'accounting1',
    applicants: 1534,
    fill: '#10b981',
    name: '회계관리 1급'
  },
  {
    examType: 'accounting2',
    applicants: 892,
    fill: '#f59e0b',
    name: '회계관리 2급'
  },
  {
    examType: 'insurance',
    applicants: 456,
    fill: '#ef4444',
    name: '보험중개사'
  }
];

const colorOptions = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#84cc16',
  '#f97316',
  '#ec4899',
  '#6366f1'
];

const chartConfig = {
  applicants: {
    label: '지원자 수'
  },
  financial: {
    label: '재경관리사',
    color: 'var(--primary)'
  },
  accounting1: {
    label: '회계관리 1급',
    color: 'var(--primary)'
  },
  accounting2: {
    label: '회계관리 2급',
    color: 'var(--primary)'
  },
  insurance: {
    label: '보험중개사',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const [chartData, setChartData] = React.useState(initialChartData);
  const [selectedSegment, setSelectedSegment] = React.useState<string | null>(
    null
  );
  const [isCustomizing, setIsCustomizing] = React.useState(false);

  const totalApplicants = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.applicants, 0);
  }, [chartData]);

  const handleSegmentClick = (data: any, index: number) => {
    setSelectedSegment(data.examType);
    setIsCustomizing(true);
  };

  const handleColorChange = (examType: string, newColor: string) => {
    setChartData((prev) =>
      prev.map((item) =>
        item.examType === examType ? { ...item, fill: newColor } : item
      )
    );
  };

  const resetColors = () => {
    setChartData(initialChartData);
    setSelectedSegment(null);
    setIsCustomizing(false);
  };

  return (
    <Card className='@container/card'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>시험별 지원자 현황</CardTitle>
            <CardDescription>
              <span className='hidden @[540px]/card:block'>
                2025년 1월 기준 각 시험별 지원자 분포
              </span>
              <span className='@[540px]/card:hidden'>시험별 지원자 분포</span>
            </CardDescription>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setIsCustomizing(!isCustomizing)}
              className='h-8'
            >
              <IconPalette className='mr-1 h-4 w-4' />
              색상 설정
            </Button>
            {isCustomizing && (
              <Button
                variant='ghost'
                size='sm'
                onClick={resetColors}
                className='h-8'
              >
                초기화
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square h-[250px]'
        >
          <PieChart>
            <defs>
              {['financial', 'accounting1', 'accounting2', 'insurance'].map(
                (examType, index) => (
                  <linearGradient
                    key={examType}
                    id={`fill${examType}`}
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop
                      offset='0%'
                      stopColor='var(--primary)'
                      stopOpacity={1 - index * 0.15}
                    />
                    <stop
                      offset='100%'
                      stopColor='var(--primary)'
                      stopOpacity={0.8 - index * 0.15}
                    />
                  </linearGradient>
                )
              )}
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='applicants'
              nameKey='examType'
              innerRadius={60}
              strokeWidth={2}
              stroke='var(--background)'
              onClick={handleSegmentClick}
              cursor='pointer'
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke={
                    selectedSegment === entry.examType ? '#000' : 'transparent'
                  }
                  strokeWidth={selectedSegment === entry.examType ? 2 : 0}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalApplicants.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground text-sm'
                        >
                          총 지원자
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* 색상 커스터마이징 패널 */}
        {isCustomizing && (
          <div className='mt-4 rounded-lg border bg-gray-50 p-4'>
            <h4 className='mb-3 flex items-center gap-2 text-sm font-medium'>
              <IconPalette className='h-4 w-4' />
              색상 커스터마이징
              {selectedSegment && (
                <Badge variant='outline' className='text-xs'>
                  {
                    chartData.find((item) => item.examType === selectedSegment)
                      ?.name
                  }{' '}
                  선택됨
                </Badge>
              )}
            </h4>
            <div className='space-y-3'>
              {chartData.map((item) => (
                <div
                  key={item.examType}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-2'>
                    <div
                      className='h-4 w-4 rounded border'
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className='text-sm font-medium'>{item.name}</span>
                    <span className='text-xs text-gray-500'>
                      ({item.applicants.toLocaleString()}명)
                    </span>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant='outline' size='sm' className='h-7 px-2'>
                        색상 변경
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-48 p-3'>
                      <div className='grid grid-cols-5 gap-2'>
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            className='relative h-8 w-8 rounded border-2 transition-transform hover:scale-110'
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              handleColorChange(item.examType, color);
                              setSelectedSegment(item.examType);
                            }}
                          >
                            {item.fill === color && (
                              <IconCheck className='absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-sm' />
                            )}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
            <div className='mt-3 border-t pt-3 text-xs text-gray-600'>
              💡 차트 조각을 클릭하여 선택하거나, 색상 변경 버튼을 사용하세요.
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          재경관리사가{' '}
          {((chartData[0].applicants / totalApplicants) * 100).toFixed(1)}%로
          최다 <IconTrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          2025년 1월 기준 시험별 지원자 현황
        </div>
      </CardFooter>
    </Card>
  );
}
