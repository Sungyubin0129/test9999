import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
  CardContent
} from '@/components/ui/card';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import React from 'react';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              삼일회계법인 자격시험 시스템
            </h2>
            <p className='text-muted-foreground'>
              재경관리사, 회계관리 1급, 회계관리 2급 자격시험 관리 시스템
            </p>
          </div>
        </div>

        {/* 시험일정 및 공지사항 섹션 */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* 시험일정 */}
          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                📅 시험일정
              </CardTitle>
              <CardDescription>
                재경관리사, 회계관리 1급, 회계관리 2급 시험일정
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex items-center justify-between p-4 border rounded-lg bg-blue-50/50'>
                  <div className='flex-1'>
                    <div className='font-semibold text-sm'>재경관리사</div>
                    <div className='text-xs text-muted-foreground mt-1'>접수: 2025.01.15 ~ 2025.02.15</div>
                    <div className='text-xs text-muted-foreground'>시험: 2025.02.22 (토)</div>
                  </div>
                  <Badge variant='outline' className='bg-blue-100 text-blue-700 border-blue-200'>
                    접수중
                  </Badge>
                </div>
                <div className='flex items-center justify-between p-4 border rounded-lg bg-green-50/50'>
                  <div className='flex-1'>
                    <div className='font-semibold text-sm'>회계관리 1급</div>
                    <div className='text-xs text-muted-foreground mt-1'>접수: 2025.01.15 ~ 2025.02.15</div>
                    <div className='text-xs text-muted-foreground'>시험: 2025.02.22 (토)</div>
                  </div>
                  <Badge variant='outline' className='bg-green-100 text-green-700 border-green-200'>
                    접수중
                  </Badge>
                </div>
                <div className='flex items-center justify-between p-4 border rounded-lg bg-purple-50/50'>
                  <div className='flex-1'>
                    <div className='font-semibold text-sm'>회계관리 2급</div>
                    <div className='text-xs text-muted-foreground mt-1'>접수: 2025.01.15 ~ 2025.02.15</div>
                    <div className='text-xs text-muted-foreground'>시험: 2025.02.22 (토)</div>
                  </div>
                  <Badge variant='outline' className='bg-purple-100 text-purple-700 border-purple-200'>
                    접수중
                  </Badge>
                </div>
                <div className='flex items-center justify-between p-4 border rounded-lg bg-gray-50/50'>
                  <div className='flex-1'>
                    <div className='font-semibold text-sm'>국제회계전문가</div>
                    <div className='text-xs text-muted-foreground mt-1'>접수: 2025.03.01 ~ 2025.03.31</div>
                    <div className='text-xs text-muted-foreground'>시험: 2025.04.05 (토)</div>
                  </div>
                  <Badge variant='outline' className='bg-gray-100 text-gray-600 border-gray-200'>
                    예정
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 공지사항 */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                📢 공지사항
              </CardTitle>
              <CardDescription>
                최신 공지사항 및 이벤트 정보
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors'>
                <div className='w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0'></div>
                <div className='flex-1 min-w-0'>
                  <div className='font-medium text-sm line-clamp-2'>제 56회 성적우수자 시상식</div>
                  <div className='text-xs text-muted-foreground mt-1'>2025.01.15</div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors'>
                <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                <div className='flex-1 min-w-0'>
                  <div className='font-medium text-sm line-clamp-2'>25년 9월 27일 재경관리사/회계관리 자격시험 확정답안 안내</div>
                  <div className='text-xs text-muted-foreground mt-1'>2025.01.10</div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors'>
                <div className='w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0'></div>
                <div className='flex-1 min-w-0'>
                  <div className='font-medium text-sm line-clamp-2'>[공고] 2025년 09월 27일(토) 재경관리사,회계관리 시행안내</div>
                  <div className='text-xs text-muted-foreground mt-1'>2025.01.05</div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors'>
                <div className='w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0'></div>
                <div className='flex-1 min-w-0'>
                  <div className='font-medium text-sm line-clamp-2'>[고사장 안내] 2025년 09월 27일 자격시험 고사장 안내</div>
                  <div className='text-xs text-muted-foreground mt-1'>2025.01.03</div>
                </div>
              </div>
              <div className='pt-2'>
                <Button variant='outline' size='sm' className='w-full'>
                  더보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 기존 통계 카드들 */}
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>총 수험생</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                2,456
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +15.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                이번 시험 대비 증가 <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                지난 시험 대비 수험생 증가
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>합격률</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                68.5%
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +3.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                합격률 상승 <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                전년 대비 합격률 향상
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>자격증 발급</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                1,682
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +8.7%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                자격증 발급 증가 <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                이번 분기 자격증 발급 현황
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>만족도</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                4.8/5
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +0.3
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                높은 만족도 <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                수험생 만족도 조사 결과
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 md:col-span-3'>
            {/* sales arallel routes */}
            {sales}
          </div>
          <div className='col-span-4'>{area_stats}</div>
          <div className='col-span-4 md:col-span-3'>{pie_stats}</div>
        </div>
      </div>
    </PageContainer>
  );
}
