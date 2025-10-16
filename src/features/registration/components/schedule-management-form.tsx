'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/ko';
import '@/app/big-calendar.css';

// moment 로케일 설정
moment.locale('ko');

// BigCalendar 로케일 설정
const localizer = momentLocalizer(moment);

export default function ScheduleManagementForm() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDateEvents, setSelectedDateEvents] = useState<any[]>([]);
  const [activeDateField, setActiveDateField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    qualification: '',
    examSession: '',
    examType: '',
    registrationStart: undefined as Date | undefined,
    registrationEnd: undefined as Date | undefined,
    examStartDate: undefined as Date | undefined,
    examEndDate: undefined as Date | undefined,
    examStartTime: '',
    examEndTime: '',
    resultDate: undefined as Date | undefined,
    resultTime: '',
    refundStart: undefined as Date | undefined,
    refundEnd: undefined as Date | undefined,
    admissionTicketStart: undefined as Date | undefined,
    admissionTicketStartTime: '',
    admissionTicketEnd: undefined as Date | undefined,
    organization: '',
    showRegistration: false
  });

  // 더미 데이터 - 실제로는 API에서 가져올 데이터
  const scheduleEvents = [
    {
      id: 1,
      date: new Date(2024, 11, 15), // 2024-12-15
      type: 'exam',
      title: '정보처리기사 1회차 시험',
      qualification: '정보처리기사',
      examSession: '1',
      examType: '정기',
      organization: '한국산업인력공단'
    },
    {
      id: 2,
      date: new Date(2024, 11, 20), // 2024-12-20
      type: 'registration',
      title: '정보처리산업기사 접수 시작',
      qualification: '정보처리산업기사',
      examSession: '2',
      examType: '정기',
      organization: '한국산업인력공단'
    },
    {
      id: 3,
      date: new Date(2024, 11, 25), // 2024-12-25
      type: 'result',
      title: '빅데이터분석기사 결과 발표',
      qualification: '빅데이터분석기사',
      examSession: '1',
      examType: '정기',
      organization: '한국산업인력공단'
    }
  ];

  const qualifications = [
    '정보처리기사',
    '정보처리산업기사',
    '빅데이터분석기사',
    '정보보안기사',
    '네트워크관리사',
    '컴퓨터활용능력1급'
  ];

  const organizations = [
    '삼성전자',
    'LG전자',
    '네이버',
    '카카오',
    'SK하이닉스',
    '현대자동차',
    '삼성SDS',
    'LG CNS',
    '한국전력공사',
    '한국수자원공사'
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      // 선택된 날짜와 관련된 이벤트 필터링
      const events = scheduleEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.toDateString();
      });
      setSelectedDateEvents(events);
    } else {
      setSelectedDateEvents([]);
    }
  };

  const handleBigCalendarSelect = (slotInfo: any) => {
    const selectedDate = slotInfo.start;
    setSelectedDate(selectedDate);

    // 활성화된 날짜 필드가 있으면 해당 필드에 날짜 설정
    if (activeDateField) {
      setFormData((prev) => ({ ...prev, [activeDateField]: selectedDate }));
      setActiveDateField(null); // 필드 활성화 해제
    }

    // 선택된 날짜와 관련된 이벤트 필터링
    const events = scheduleEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
    setSelectedDateEvents(events);
  };

  const handleDateFieldClick = (field: string) => {
    setActiveDateField(field);
  };

  const handleEventSelect = (event: any) => {
    // 선택된 이벤트의 데이터를 폼에 자동으로 채우기
    setFormData((prev) => ({
      ...prev,
      qualification: event.qualification,
      examSession: event.examSession,
      examType: event.examType,
      organization: event.organization
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // BigCalendar용 이벤트 데이터 변환 (기존 일정 + 폼 데이터)
  const formEvents = [];

  // 접수기간
  if (formData.registrationStart) {
    formEvents.push({
      id: 'reg-start',
      title: '접수기간 시작',
      start: formData.registrationStart,
      end: formData.registrationStart,
      resource: { type: 'registration-start', color: '#3b82f6' }
    });
  }
  if (formData.registrationEnd) {
    formEvents.push({
      id: 'reg-end',
      title: '접수기간 종료',
      start: formData.registrationEnd,
      end: formData.registrationEnd,
      resource: { type: 'registration-end', color: '#3b82f6' }
    });
  }

  // 시험일정
  if (formData.examStartDate) {
    formEvents.push({
      id: 'exam-start',
      title: '시험일정 시작',
      start: formData.examStartDate,
      end: formData.examStartDate,
      resource: { type: 'exam-start', color: '#ef4444' }
    });
  }
  if (formData.examEndDate) {
    formEvents.push({
      id: 'exam-end',
      title: '시험일정 종료',
      start: formData.examEndDate,
      end: formData.examEndDate,
      resource: { type: 'exam-end', color: '#ef4444' }
    });
  }

  // 합격자발표
  if (formData.resultDate) {
    formEvents.push({
      id: 'result',
      title: '합격자발표',
      start: formData.resultDate,
      end: formData.resultDate,
      resource: { type: 'result', color: '#10b981' }
    });
  }

  // 환불기간
  if (formData.refundStart) {
    formEvents.push({
      id: 'refund-start',
      title: '50%환불기간 시작',
      start: formData.refundStart,
      end: formData.refundStart,
      resource: { type: 'refund-start', color: '#f59e0b' }
    });
  }
  if (formData.refundEnd) {
    formEvents.push({
      id: 'refund-end',
      title: '50%환불기간 종료',
      start: formData.refundEnd,
      end: formData.refundEnd,
      resource: { type: 'refund-end', color: '#f59e0b' }
    });
  }

  // 수험표출력기간
  if (formData.admissionTicketStart) {
    formEvents.push({
      id: 'ticket-start',
      title: '수험표출력기간 시작',
      start: formData.admissionTicketStart,
      end: formData.admissionTicketStart,
      resource: { type: 'ticket-start', color: '#8b5cf6' }
    });
  }
  if (formData.admissionTicketEnd) {
    formEvents.push({
      id: 'ticket-end',
      title: '수험표출력기간 종료',
      start: formData.admissionTicketEnd,
      end: formData.admissionTicketEnd,
      resource: { type: 'ticket-end', color: '#8b5cf6' }
    });
  }

  const calendarEvents = [
    ...scheduleEvents.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.date),
      end: new Date(event.date),
      resource: event,
      style: {
        backgroundColor:
          event.type === 'exam'
            ? '#ef4444'
            : event.type === 'registration'
              ? '#3b82f6'
              : '#10b981',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '11px',
        padding: '4px 8px',
        margin: '1px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }
    })),
    ...formEvents.map((event) => ({
      ...event,
      style: {
        backgroundColor: event.resource.color,
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '11px',
        padding: '4px 8px',
        margin: '1px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }
    }))
  ];

  useEffect(() => {
    // 선택된 날짜를 달력에 표시
    if (selectedDate) {
      const dateCells = document.querySelectorAll('.rbc-date-cell');
      dateCells.forEach((cell) => {
        const cellDate = cell.querySelector('a');
        if (cellDate) {
          const cellText = cellDate.textContent?.trim();
          const selectedDateText = selectedDate.getDate().toString();

          if (cellText === selectedDateText) {
            cell.setAttribute('data-selected', 'true');
            if (activeDateField) {
              cell.setAttribute('data-active', 'true');
            } else {
              cell.removeAttribute('data-active');
            }
          } else {
            cell.removeAttribute('data-selected');
            cell.removeAttribute('data-active');
          }
        }
      });
    } else {
      // 선택된 날짜가 없으면 모든 표시 제거
      const dateCells = document.querySelectorAll('.rbc-date-cell');
      dateCells.forEach((cell) => {
        cell.removeAttribute('data-selected');
        cell.removeAttribute('data-active');
      });
    }
  }, [selectedDate, activeDateField]);

  const handleDateChange = (field: string, date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleSubmit = () => {
    console.log('일정 등록:', formData);
    // TODO: 실제 등록 로직 구현
  };

  const handleCancel = () => {
    console.log('등록 취소');
    // TODO: 취소 로직 구현
  };

  const DatePicker = ({
    field,
    label,
    placeholder
  }: {
    field: string;
    label: string;
    placeholder: string;
  }) => (
    <div className='space-y-2'>
      <Label htmlFor={field}>{label}</Label>
      <Button
        variant='outline'
        className='w-full justify-start text-left font-normal'
        onClick={() => handleDateFieldClick(field)}
      >
        <CalendarIcon className='mr-2 h-4 w-4' />
        {formData[field as keyof typeof formData] ? (
          format(formData[field as keyof typeof formData] as Date, 'PPP', {
            locale: ko
          })
        ) : (
          <span className='text-muted-foreground'>{placeholder}</span>
        )}
      </Button>
    </div>
  );

  const TimePicker = ({
    field,
    label,
    placeholder
  }: {
    field: string;
    label: string;
    placeholder: string;
  }) => (
    <div className='space-y-2'>
      <Label htmlFor={field}>{label}</Label>
      <Input
        type='time'
        id={field}
        placeholder={placeholder}
        value={formData[field as keyof typeof formData] as string}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className='w-full'
      />
    </div>
  );

  return (
    <div className='grid h-[calc(100vh-200px)] grid-cols-1 gap-6 lg:grid-cols-2'>
      {/* 왼쪽: 달력과 선택된 날짜 이벤트 */}
      <div className='space-y-4'>
        <Card className='h-full'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              시험 일정 달력
              {activeDateField && (
                <Badge variant='default' className='animate-pulse'>
                  날짜 선택 모드
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='h-[600px]'>
              <BigCalendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor='start'
                endAccessor='end'
                onSelectSlot={handleBigCalendarSelect}
                selectable
                views={['month', 'week', 'day']}
                defaultView='month'
                style={{ height: '100%' }}
                eventPropGetter={(event: any) => ({
                  style: event.style || {
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '11px',
                    padding: '4px 8px',
                    margin: '1px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }
                })}
                messages={{
                  next: '다음',
                  previous: '이전',
                  today: '오늘',
                  month: '월',
                  week: '주',
                  day: '일',
                  agenda: '일정',
                  date: '날짜',
                  time: '시간',
                  event: '이벤트',
                  noEventsInRange: '이 기간에는 일정이 없습니다.',
                  showMore: (total: number) => `+${total}개 더 보기`
                }}
              />
            </div>

            {/* 선택된 날짜 정보 표시 */}
            {selectedDate && (
              <div className='mt-4 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4'>
                <div className='mb-3 flex items-center gap-2'>
                  <div className='h-3 w-3 animate-pulse rounded-full bg-blue-500'></div>
                  <h4 className='text-sm font-semibold text-blue-900'>
                    선택된 날짜:{' '}
                    {format(selectedDate, 'yyyy년 MM월 dd일 (E)', {
                      locale: ko
                    })}
                  </h4>
                </div>

                {activeDateField && (
                  <div className='mb-3 rounded-md bg-blue-100 p-2'>
                    <p className='text-xs font-medium text-blue-800'>
                      📅{' '}
                      {activeDateField === 'examStartDate'
                        ? '시험일정 시작일'
                        : activeDateField === 'examEndDate'
                          ? '시험일정 종료일'
                          : activeDateField === 'resultDate'
                            ? '합격자발표'
                            : activeDateField === 'admissionTicketStart'
                              ? '수험표출력기간 시작'
                              : activeDateField === 'registrationStart'
                                ? '접수기간 시작'
                                : activeDateField === 'registrationEnd'
                                  ? '접수기간 종료'
                                  : activeDateField === 'refundStart'
                                    ? '50%환불기간 시작'
                                    : activeDateField === 'refundEnd'
                                      ? '50%환불기간 종료'
                                      : activeDateField === 'admissionTicketEnd'
                                        ? '수험표출력기간 종료'
                                        : activeDateField}{' '}
                      필드에 날짜가 설정됩니다
                    </p>
                  </div>
                )}

                {selectedDateEvents.length > 0 ? (
                  <div className='space-y-2'>
                    <p className='mb-2 text-xs font-medium text-blue-700'>
                      📋 해당 날짜의 기존 일정:
                    </p>
                    {selectedDateEvents.map((event) => (
                      <div
                        key={event.id}
                        className='cursor-pointer rounded-lg border border-blue-200 p-3 transition-colors hover:bg-blue-50'
                        onClick={() => handleEventSelect(event)}
                      >
                        <div className='flex items-center justify-between'>
                          <div>
                            <Badge
                              variant={
                                event.type === 'exam'
                                  ? 'default'
                                  : event.type === 'registration'
                                    ? 'secondary'
                                    : 'outline'
                              }
                              className='mb-1'
                            >
                              {event.type === 'exam'
                                ? '시험'
                                : event.type === 'registration'
                                  ? '접수'
                                  : '결과'}
                            </Badge>
                            <p className='text-sm font-medium'>{event.title}</p>
                            <p className='text-muted-foreground text-xs'>
                              {event.qualification} | {event.examSession}회차 |{' '}
                              {event.examType}
                            </p>
                          </div>
                          <Button size='sm' variant='outline'>
                            선택
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-sm text-blue-600'>
                    해당 날짜에 등록된 일정이 없습니다.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 오른쪽: 폼 */}
      <Card className='h-full'>
        <CardHeader>
          <CardTitle>일정 등록</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* 기본 정보 */}
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* 자격명 */}
              <div className='space-y-2'>
                <Label htmlFor='qualification'>자격명</Label>
                <Select
                  value={formData.qualification}
                  onValueChange={(value) =>
                    handleInputChange('qualification', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='자격명 선택' />
                  </SelectTrigger>
                  <SelectContent>
                    {qualifications.map((qual) => (
                      <SelectItem key={qual} value={qual}>
                        {qual}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 시험회차 */}
              <div className='space-y-2'>
                <Label htmlFor='examSession'>시험회차</Label>
                <Input
                  id='examSession'
                  placeholder='시험회차 입력'
                  value={formData.examSession}
                  onChange={(e) =>
                    handleInputChange('examSession', e.target.value)
                  }
                />
              </div>

              {/* 시험구분 */}
              <div className='space-y-2'>
                <Label htmlFor='examType'>시험구분</Label>
                <Select
                  value={formData.examType}
                  onValueChange={(value) =>
                    handleInputChange('examType', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='시험구분 선택' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='정기'>정기</SelectItem>
                    <SelectItem value='수시'>수시</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 단체명 */}
              <div className='space-y-2'>
                <Label htmlFor='organization'>단체명</Label>
                <Select
                  value={formData.organization}
                  onValueChange={(value) =>
                    handleInputChange('organization', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='단체명 선택' />
                  </SelectTrigger>
                  <SelectContent>
                    {organizations.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 접수표시 체크박스 */}
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='showRegistration'
                checked={formData.showRegistration}
                onCheckedChange={(checked) =>
                  handleInputChange('showRegistration', checked)
                }
              />
              <Label htmlFor='showRegistration'>접수표시</Label>
            </div>
          </div>

          {/* 날짜 정보 */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>날짜 정보</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <DatePicker
                field='registrationStart'
                label='접수기간 시작'
                placeholder='접수 시작일 선택'
              />
              <DatePicker
                field='registrationEnd'
                label='접수기간 종료'
                placeholder='접수 종료일 선택'
              />

              {/* 시험일정 - 시작일과 종료일 */}
              <div className='space-y-2'>
                <Label>시험일정 시작일</Label>
                <div className='grid grid-cols-2 gap-2'>
                  <DatePicker
                    field='examStartDate'
                    label=''
                    placeholder='시작일 선택'
                  />
                  <TimePicker
                    field='examStartTime'
                    label=''
                    placeholder='시작 시간'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label>시험일정 종료일</Label>
                <div className='grid grid-cols-2 gap-2'>
                  <DatePicker
                    field='examEndDate'
                    label=''
                    placeholder='종료일 선택'
                  />
                  <TimePicker
                    field='examEndTime'
                    label=''
                    placeholder='종료 시간'
                  />
                </div>
              </div>

              {/* 합격자발표 - 날짜와 시간 */}
              <div className='space-y-2'>
                <Label>합격자발표</Label>
                <div className='grid grid-cols-2 gap-2'>
                  <DatePicker
                    field='resultDate'
                    label=''
                    placeholder='발표일 선택'
                  />
                  <TimePicker
                    field='resultTime'
                    label=''
                    placeholder='발표 시간'
                  />
                </div>
              </div>

              <DatePicker
                field='refundStart'
                label='50%환불기간 시작'
                placeholder='환불 시작일 선택'
              />
              <DatePicker
                field='refundEnd'
                label='50%환불기간 종료'
                placeholder='환불 종료일 선택'
              />

              {/* 수험표 출력기간 - 시작일과 시간 */}
              <div className='space-y-2'>
                <Label>수험표 출력기간</Label>
                <div className='grid grid-cols-2 gap-2'>
                  <DatePicker
                    field='admissionTicketStart'
                    label=''
                    placeholder='출력 시작일 선택'
                  />
                  <TimePicker
                    field='admissionTicketStartTime'
                    label=''
                    placeholder='시작 시간'
                  />
                </div>
                <DatePicker
                  field='admissionTicketEnd'
                  label='종료일'
                  placeholder='출력 종료일 선택'
                />
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className='flex justify-end gap-2 pt-4'>
            <Button variant='outline' onClick={handleCancel}>
              취소
            </Button>
            <Button onClick={handleSubmit}>등록</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
