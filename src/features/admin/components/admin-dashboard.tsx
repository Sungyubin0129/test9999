'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  FileText,
  Award,
  Clock,
  TrendingUp,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

// Java 프로젝트의 관리자 대시보드 데이터 타입
interface AdminStats {
  totalUsers: number;
  totalExams: number;
  totalCertificates: number;
  pendingApplications: number;
  todayExams: number;
  monthlyGrowth: number;
}

interface RecentActivity {
  id: string;
  type: 'exam' | 'certificate' | 'user' | 'application';
  title: string;
  user: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

// Mock 데이터 (Java 프로젝트의 관리자 데이터 구조)
const mockAdminStats: AdminStats = {
  totalUsers: 1250,
  totalExams: 45,
  totalCertificates: 890,
  pendingApplications: 23,
  todayExams: 5,
  monthlyGrowth: 12.5
};

const mockRecentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'exam',
    title: '회계사 1급 시험 완료',
    user: '김회계',
    date: '2024-01-15 14:30',
    status: 'completed'
  },
  {
    id: '2',
    type: 'certificate',
    title: '세무사 2급 자격증 발급',
    user: '이세무',
    date: '2024-01-15 13:45',
    status: 'completed'
  },
  {
    id: '3',
    type: 'application',
    title: '감사원 3급 접수',
    user: '박감사',
    date: '2024-01-15 12:20',
    status: 'pending'
  },
  {
    id: '4',
    type: 'user',
    title: '신규 회원 가입',
    user: '최회계',
    date: '2024-01-15 11:15',
    status: 'completed'
  }
];

export function AdminDashboard() {
  const [stats] = useState<AdminStats>(mockAdminStats);
  const [activities] = useState<RecentActivity[]>(mockRecentActivities);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <FileText className='h-4 w-4' />;
      case 'certificate':
        return <Award className='h-4 w-4' />;
      case 'user':
        return <Users className='h-4 w-4' />;
      case 'application':
        return <Clock className='h-4 w-4' />;
      default:
        return <FileText className='h-4 w-4' />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant='default'>완료</Badge>;
      case 'pending':
        return <Badge variant='secondary'>대기</Badge>;
      case 'failed':
        return <Badge variant='destructive'>실패</Badge>;
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  return (
    <div className='space-y-6'>
      {/* Java 프로젝트의 관리자 대시보드 헤더 */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>관리자 대시보드</h1>
          <p className='text-muted-foreground'>자격검정 시스템 관리 현황</p>
        </div>
        <div className='flex space-x-2'>
          <Button variant='outline'>
            <Download className='mr-2 h-4 w-4' />
            보고서 다운로드
          </Button>
          <Button>
            <Plus className='mr-2 h-4 w-4' />새 시험 등록
          </Button>
        </div>
      </div>

      {/* Java 프로젝트의 통계 카드 */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>총 회원수</CardTitle>
            <Users className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {stats.totalUsers.toLocaleString()}
            </div>
            <p className='text-muted-foreground text-xs'>
              <TrendingUp className='mr-1 inline h-3 w-3' />+
              {stats.monthlyGrowth}% 이번 달
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>총 시험수</CardTitle>
            <FileText className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalExams}</div>
            <p className='text-muted-foreground text-xs'>
              오늘 {stats.todayExams}개 시험 예정
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>발급된 자격증</CardTitle>
            <Award className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {stats.totalCertificates.toLocaleString()}
            </div>
            <p className='text-muted-foreground text-xs'>
              전체 자격증 발급 현황
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              대기 중인 접수
            </CardTitle>
            <Clock className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {stats.pendingApplications}
            </div>
            <p className='text-muted-foreground text-xs'>처리 대기 중</p>
          </CardContent>
        </Card>
      </div>

      {/* Java 프로젝트의 최근 활동 */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {activities.map((activity) => (
                <div key={activity.id} className='flex items-center space-x-4'>
                  <div className='flex-shrink-0'>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium text-gray-900'>
                      {activity.title}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {activity.user} • {activity.date}
                    </p>
                  </div>
                  <div className='flex-shrink-0'>
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>빠른 작업</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 gap-4'>
              <Button variant='outline' className='h-20 flex-col'>
                <Users className='mb-2 h-6 w-6' />
                회원 관리
              </Button>
              <Button variant='outline' className='h-20 flex-col'>
                <FileText className='mb-2 h-6 w-6' />
                시험 관리
              </Button>
              <Button variant='outline' className='h-20 flex-col'>
                <Award className='mb-2 h-6 w-6' />
                자격증 관리
              </Button>
              <Button variant='outline' className='h-20 flex-col'>
                <Clock className='mb-2 h-6 w-6' />
                접수 관리
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Java 프로젝트의 시스템 상태 */}
      <Card>
        <CardHeader>
          <CardTitle>시스템 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div className='flex items-center space-x-2'>
              <div className='h-3 w-3 rounded-full bg-green-500'></div>
              <span className='text-sm'>데이터베이스 연결</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='h-3 w-3 rounded-full bg-green-500'></div>
              <span className='text-sm'>CBT 시스템</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='h-3 w-3 rounded-full bg-yellow-500'></div>
              <span className='text-sm'>이메일 서비스</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
