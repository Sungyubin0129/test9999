import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

const examData = [
  {
    name: '김민수',
    exam: '재경관리사',
    avatar: 'https://api.slingacademy.com/public/sample-users/1.png',
    fallback: '김',
    score: '85점'
  },
  {
    name: '이지영',
    exam: '회계관리 1급',
    avatar: 'https://api.slingacademy.com/public/sample-users/2.png',
    fallback: '이',
    score: '92점'
  },
  {
    name: '박준호',
    exam: '회계관리 2급',
    avatar: 'https://api.slingacademy.com/public/sample-users/3.png',
    fallback: '박',
    score: '78점'
  },
  {
    name: '정수진',
    exam: '재경관리사',
    avatar: 'https://api.slingacademy.com/public/sample-users/4.png',
    fallback: '정',
    score: '88점'
  },
  {
    name: '최영희',
    exam: '회계관리 1급',
    avatar: 'https://api.slingacademy.com/public/sample-users/5.png',
    fallback: '최',
    score: '95점'
  }
];

export function RecentSales() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>최근 시험 결과</CardTitle>
        <CardDescription>이번 달 156명이 시험을 완료했습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {examData.map((exam, index) => (
            <div key={index} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={exam.avatar} alt='Avatar' />
                <AvatarFallback>{exam.fallback}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-medium'>{exam.name}</p>
                <p className='text-muted-foreground text-sm'>{exam.exam}</p>
              </div>
              <div className='ml-auto font-medium text-green-600'>{exam.score}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
