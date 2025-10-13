'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  AlertCircle,
  FileText,
  Award
} from 'lucide-react';

// Java 프로젝트의 시험 접수 데이터 타입
interface ExamSchedule {
  id: string;
  examName: string;
  examLevel: string;
  examDate: string;
  examTime: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  registrationFee: number;
  registrationStart: string;
  registrationEnd: string;
  status: 'open' | 'closed' | 'full';
}

interface ExamApplication {
  id: string;
  examId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
}

// Mock 데이터 (Java 프로젝트의 시험 데이터 구조)
const mockExamSchedules: ExamSchedule[] = [
  {
    id: 'EXAM2024001',
    examName: '회계사 1급',
    examLevel: '1급',
    examDate: '2024-03-15',
    examTime: '09:00-12:00',
    location: '서울시 강남구 삼성동',
    maxParticipants: 100,
    currentParticipants: 75,
    registrationFee: 50000,
    registrationStart: '2024-01-01',
    registrationEnd: '2024-03-01',
    status: 'open'
  },
  {
    id: 'EXAM2024002',
    examName: '세무사 2급',
    examLevel: '2급',
    examDate: '2024-03-20',
    examTime: '14:00-17:00',
    location: '서울시 서초구 서초동',
    maxParticipants: 80,
    currentParticipants: 80,
    registrationFee: 45000,
    registrationStart: '2024-01-01',
    registrationEnd: '2024-03-05',
    status: 'full'
  },
  {
    id: 'EXAM2024003',
    examName: '감사원 3급',
    examLevel: '3급',
    examDate: '2024-03-25',
    examTime: '10:00-13:00',
    location: '서울시 중구 명동',
    maxParticipants: 60,
    currentParticipants: 45,
    registrationFee: 40000,
    registrationStart: '2024-01-01',
    registrationEnd: '2024-03-10',
    status: 'open'
  }
];

export function ExamRegistration() {
  const [selectedExam, setSelectedExam] = useState<ExamSchedule | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    idNumber: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] =
    useState<ExamApplication | null>(null);

  // 시험 상태 배지
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <Badge variant='default' className='bg-green-500'>
            접수중
          </Badge>
        );
      case 'closed':
        return <Badge variant='destructive'>접수마감</Badge>;
      case 'full':
        return <Badge variant='secondary'>정원마감</Badge>;
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  // 접수 가능 여부
  const canRegister = (exam: ExamSchedule) => {
    const now = new Date();
    const startDate = new Date(exam.registrationStart);
    const endDate = new Date(exam.registrationEnd);
    return exam.status === 'open' && now >= startDate && now <= endDate;
  };

  // 접수 폼 제출
  const handleSubmit = async () => {
    if (!selectedExam) return;

    setIsSubmitting(true);

    // Mock 접수 처리
    setTimeout(() => {
      const newApplication: ExamApplication = {
        id: `APP_${Date.now()}`,
        examId: selectedExam.id,
        applicantName: applicationForm.applicantName,
        applicantEmail: applicationForm.applicantEmail,
        applicantPhone: applicationForm.applicantPhone,
        applicationDate: new Date().toISOString(),
        status: 'pending',
        paymentStatus: 'unpaid'
      };

      setSubmittedApplication(newApplication);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className='space-y-6'>
      {/* Java 프로젝트의 시험 접수 헤더 */}
      <div>
        <h1 className='text-3xl font-bold'>시험 접수</h1>
        <p className='text-muted-foreground'>자격검정 시험에 접수하세요.</p>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* 시험 일정 목록 */}
        <Card>
          <CardHeader>
            <CardTitle>시험 일정</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {mockExamSchedules.map((exam) => (
              <div key={exam.id} className='rounded-lg border p-4'>
                <div className='mb-3 flex items-center justify-between'>
                  <div>
                    <h3 className='text-lg font-semibold'>{exam.examName}</h3>
                    <Badge variant='outline'>{exam.examLevel}</Badge>
                  </div>
                  {getStatusBadge(exam.status)}
                </div>

                <div className='mb-3 grid grid-cols-2 gap-4'>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='text-muted-foreground h-4 w-4' />
                    <span className='text-sm'>{exam.examDate}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Clock className='text-muted-foreground h-4 w-4' />
                    <span className='text-sm'>{exam.examTime}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <MapPin className='text-muted-foreground h-4 w-4' />
                    <span className='text-sm'>{exam.location}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Users className='text-muted-foreground h-4 w-4' />
                    <span className='text-sm'>
                      {exam.currentParticipants}/{exam.maxParticipants}
                    </span>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-lg font-bold'>
                    {exam.registrationFee.toLocaleString()}원
                  </span>
                  <Button
                    size='sm'
                    onClick={() => setSelectedExam(exam)}
                    disabled={!canRegister(exam)}
                  >
                    {canRegister(exam) ? '접수하기' : '접수불가'}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 접수 폼 */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedExam
                ? `${selectedExam.examName} 접수`
                : '시험을 선택하세요'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedExam ? (
              <div className='space-y-4'>
                {/* 선택된 시험 정보 */}
                <div className='rounded-lg bg-gray-50 p-4'>
                  <h4 className='mb-2 font-semibold'>
                    {selectedExam.examName} {selectedExam.examLevel}
                  </h4>
                  <div className='grid grid-cols-2 gap-2 text-sm'>
                    <div>시험일: {selectedExam.examDate}</div>
                    <div>시험시간: {selectedExam.examTime}</div>
                    <div>장소: {selectedExam.location}</div>
                    <div>
                      접수료: {selectedExam.registrationFee.toLocaleString()}원
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 접수자 정보 입력 */}
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='applicantName'>성명 *</Label>
                    <Input
                      id='applicantName'
                      value={applicationForm.applicantName}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          applicantName: e.target.value
                        }))
                      }
                      placeholder='성명을 입력하세요'
                    />
                  </div>

                  <div>
                    <Label htmlFor='applicantEmail'>이메일 *</Label>
                    <Input
                      id='applicantEmail'
                      type='email'
                      value={applicationForm.applicantEmail}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          applicantEmail: e.target.value
                        }))
                      }
                      placeholder='이메일을 입력하세요'
                    />
                  </div>

                  <div>
                    <Label htmlFor='applicantPhone'>휴대폰 번호 *</Label>
                    <Input
                      id='applicantPhone'
                      value={applicationForm.applicantPhone}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          applicantPhone: e.target.value
                        }))
                      }
                      placeholder='휴대폰 번호를 입력하세요'
                    />
                  </div>

                  <div>
                    <Label htmlFor='idNumber'>주민등록번호 *</Label>
                    <Input
                      id='idNumber'
                      value={applicationForm.idNumber}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          idNumber: e.target.value
                        }))
                      }
                      placeholder='주민등록번호를 입력하세요'
                    />
                  </div>

                  <div>
                    <Label htmlFor='address'>주소 *</Label>
                    <Input
                      id='address'
                      value={applicationForm.address}
                      onChange={(e) =>
                        setApplicationForm((prev) => ({
                          ...prev,
                          address: e.target.value
                        }))
                      }
                      placeholder='주소를 입력하세요'
                    />
                  </div>
                </div>

                <Separator />

                {/* 접수 버튼 */}
                <Button
                  className='w-full'
                  size='lg'
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting ||
                    !applicationForm.applicantName ||
                    !applicationForm.applicantEmail
                  }
                >
                  {isSubmitting ? '접수 처리 중...' : '시험 접수하기'}
                </Button>
              </div>
            ) : (
              <div className='py-8 text-center'>
                <FileText className='text-muted-foreground mx-auto mb-4 h-12 w-12' />
                <p className='text-muted-foreground'>
                  접수할 시험을 선택하세요.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 접수 완료 정보 */}
      {submittedApplication && (
        <Card className='border-green-200 bg-green-50'>
          <CardHeader>
            <CardTitle className='flex items-center text-green-800'>
              <CheckCircle className='mr-2 h-5 w-5' />
              접수 완료
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label className='text-sm font-medium'>접수 번호</Label>
                <p className='font-mono text-sm'>{submittedApplication.id}</p>
              </div>
              <div>
                <Label className='text-sm font-medium'>접수 상태</Label>
                <div className='mt-1'>
                  <Badge variant='secondary'>접수완료</Badge>
                </div>
              </div>
              <div>
                <Label className='text-sm font-medium'>접수자</Label>
                <p className='text-sm'>{submittedApplication.applicantName}</p>
              </div>
              <div>
                <Label className='text-sm font-medium'>결제 상태</Label>
                <div className='mt-1'>
                  <Badge variant='outline'>미결제</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className='flex space-x-2'>
              <Button variant='outline' size='sm'>
                <FileText className='mr-2 h-4 w-4' />
                접수서 출력
              </Button>
              <Button variant='outline' size='sm'>
                <Award className='mr-2 h-4 w-4' />
                결제하기
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
