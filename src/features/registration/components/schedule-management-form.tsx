'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import EventCountBadge from '@/components/event-count-badge';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/ko';
import '@/app/big-calendar.css';
import { getScheduleById, getFutureScheduleData } from './schedule-management';

// moment 로케일 설정
moment.locale('ko');

// BigCalendar 로케일 설정
const localizer = momentLocalizer(moment);

export default function ScheduleManagementForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get('id');
  const isEditMode = !!scheduleId;

  const calendarRef = useRef<any>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDateEvents, setSelectedDateEvents] = useState<any[]>([]);
  const [activeDateField, setActiveDateField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    qualification: '',
    examSession: '',
    examType: '',
    registrationStart: null as Date | null,
    registrationEnd: null as Date | null,
    examStartDate: null as Date | null,
    examEndDate: null as Date | null,
    examStartTime: '',
    examEndTime: '',
    resultDate: null as Date | null,
    resultTime: '',
    refundStart: null as Date | null,
    refundEnd: null as Date | null,
    admissionTicketStart: null as Date | null,
    admissionTicketStartTime: '',
    admissionTicketEnd: null as Date | null,
    organization: '',
    showRegistration: false
  });

  // 날짜 파싱 함수
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  // 실제 데이터에서 오늘 이후 시험일정만 가져와서 달력 이벤트 생성
  const futureScheduleData = getFutureScheduleData();

  const scheduleEvents = futureScheduleData.flatMap((schedule) => {
    const events = [];

    // 접수기간 파싱
    const [regStartStr, regEndStr] = schedule.registrationPeriod.split(' - ');
    const regStartDate = parseDate(regStartStr);
    const regEndDate = parseDate(regEndStr);

    // 환불기간 파싱
    const [refundStartStr, refundEndStr] = schedule.refundPeriod.split(' - ');
    const refundStartDate = parseDate(refundStartStr);
    const refundEndDate = parseDate(refundEndStr);

    // 시험일정 파싱
    const [examStartStr, examEndStr] = schedule.examDate.split(' ~ ');
    const examStartDate = parseDate(examStartStr);
    const examEndDate = parseDate(examEndStr);

    // 합격자발표일 파싱
    const resultDate = parseDate(schedule.resultDate);

    // 접수 시작일 이벤트
    if (regStartDate) {
      events.push({
        id: `${schedule.id}-reg-start`,
        date: regStartDate,
        type: 'registration',
        title: `${schedule.qualification} ${schedule.examSession}회차 접수 시작`,
        qualification: schedule.qualification,
        examSession: schedule.examSession,
        examType: schedule.examType,
        organization: '한국산업인력공단'
      });
    }

    // 접수 종료일 이벤트
    if (regEndDate) {
      events.push({
        id: `${schedule.id}-reg-end`,
        date: regEndDate,
        type: 'registration',
        title: `${schedule.qualification} ${schedule.examSession}회차 접수 마감`,
        qualification: schedule.qualification,
        examSession: schedule.examSession,
        examType: schedule.examType,
        organization: '한국산업인력공단'
      });
    }

    // 환불 마감일 이벤트
    if (refundEndDate) {
      events.push({
        id: `${schedule.id}-refund-end`,
        date: refundEndDate,
        type: 'refund',
        title: `${schedule.qualification} ${schedule.examSession}회차 환불 마감`,
        qualification: schedule.qualification,
        examSession: schedule.examSession,
        examType: schedule.examType,
        organization: '한국산업인력공단'
      });
    }

    // 시험 시작일 이벤트
    if (examStartDate) {
      events.push({
        id: `${schedule.id}-exam-start`,
        date: examStartDate,
        type: 'exam',
        title: `${schedule.qualification} ${schedule.examSession}회차 시험 시작`,
        qualification: schedule.qualification,
        examSession: schedule.examSession,
        examType: schedule.examType,
        organization: '한국산업인력공단'
      });
    }

    // 시험 종료일 이벤트
    if (examEndDate) {
      events.push({
        id: `${schedule.id}-exam-end`,
        date: examEndDate,
        type: 'exam',
        title: `${schedule.qualification} ${schedule.examSession}회차 시험 종료`,
        qualification: schedule.qualification,
        examSession: schedule.examSession,
        examType: schedule.examType,
        organization: '한국산업인력공단'
      });
    }

    // 합격자발표일 이벤트
    if (resultDate) {
      events.push({
        id: `${schedule.id}-result`,
        date: resultDate,
        type: 'result',
        title: `${schedule.qualification} ${schedule.examSession}회차 결과 발표`,
        qualification: schedule.qualification,
        examSession: schedule.examSession,
        examType: schedule.examType,
        organization: '한국산업인력공단'
      });
    }

    return events;
  });

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

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEditMode && scheduleId) {
      const scheduleData = getScheduleById(parseInt(scheduleId));
      if (scheduleData) {
        // 문자열 날짜를 Date 객체로 변환하는 함수
        const parseDate = (dateStr: string): Date | null => {
          if (!dateStr) return null;
          const [year, month, day] = dateStr.split('.').map(Number);
          return new Date(year, month - 1, day);
        };

        // 접수기간 파싱
        const [regStartStr, regEndStr] =
          scheduleData.registrationPeriod.split(' - ');
        const registrationStart = parseDate(regStartStr);
        const registrationEnd = parseDate(regEndStr);

        // 환불기간 파싱
        const [refundStartStr, refundEndStr] =
          scheduleData.refundPeriod.split(' - ');
        const refundStart = parseDate(refundStartStr);
        const refundEnd = parseDate(refundEndStr);

        // 시험일정 파싱
        const [examStartStr, examEndStr] = scheduleData.examDate.split(' ~ ');
        const examStartDate = parseDate(examStartStr);
        const examEndDate = parseDate(examEndStr);

        // 합격자발표일 파싱
        const resultDate = parseDate(scheduleData.resultDate);

        setFormData({
          qualification: scheduleData.qualification,
          examSession: scheduleData.examSession,
          examType: scheduleData.examType,
          registrationStart,
          registrationEnd,
          examStartDate,
          examEndDate,
          examStartTime: '09:00',
          examEndTime: '17:00',
          resultDate,
          resultTime: '14:00',
          refundStart,
          refundEnd,
          admissionTicketStart: null,
          admissionTicketStartTime: '',
          admissionTicketEnd: null,
          organization: '한국정보통신기술협회',
          showRegistration: false
        });
      }
    }
  }, [isEditMode, scheduleId]);

  // 폼 데이터 변경 핸들러
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      // 선택된 날짜와 관련된 이벤트 필터링 (calendarEvents에서 필터링)
      const events = calendarEvents.filter((event) => {
        const eventDate = new Date(event.start);
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

    // 선택된 날짜와 관련된 이벤트 필터링 (calendarEvents에서 필터링)
    console.log('Selected date:', selectedDate.toDateString());
    console.log('Total calendar events:', calendarEvents.length);

    const events = calendarEvents.filter((event) => {
      const eventDate = new Date(event.start);
      const matches = eventDate.toDateString() === selectedDate.toDateString();
      if (matches) {
        console.log(
          'Found matching event:',
          event.title,
          eventDate.toDateString()
        );
      }
      return matches;
    });

    console.log('Filtered events for selected date:', events.length);
    setSelectedDateEvents(events);
  };

  const handleNavigate = (action: string) => {
    console.log('Navigation action:', action);

    if (action === 'PREV') {
      const newDate = new Date(currentDate);
      if (currentView === 'month') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (currentView === 'week') {
        newDate.setDate(newDate.getDate() - 7);
      } else if (currentView === 'day') {
        newDate.setDate(newDate.getDate() - 1);
      }
      setCurrentDate(newDate);
    } else if (action === 'NEXT') {
      const newDate = new Date(currentDate);
      if (currentView === 'month') {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (currentView === 'week') {
        newDate.setDate(newDate.getDate() + 7);
      } else if (currentView === 'day') {
        newDate.setDate(newDate.getDate() + 1);
      }
      setCurrentDate(newDate);
    } else if (action === 'TODAY') {
      setCurrentDate(new Date());
    }
  };

  const handleViewChange = (view: string) => {
    console.log('View change:', view);
    setCurrentView(view);
  };

  // 일정 개수 계산 함수
  const getEventCountForDate = (date: Date) => {
    return calendarEvents.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    }).length;
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
              : event.type === 'refund'
                ? '#f59e0b'
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

  // 달력 렌더링 후 일정 개수 배지 추가 및 더보기 버튼 이벤트 처리
  useEffect(() => {
    const addEventCountBadges = () => {
      console.log('Adding event count badges...');
      const dateCells = document.querySelectorAll('.rbc-date-cell');
      console.log('Found date cells:', dateCells.length);

      dateCells.forEach((cell, index) => {
        // 이미 배지가 있는지 확인
        if (cell.querySelector('.event-count-badge')) {
          return;
        }

        const dateLink = cell.querySelector('a');
        if (!dateLink) {
          console.log(`No date link found in cell ${index}`);
          return;
        }

        const dateText = dateLink.textContent;
        if (!dateText) {
          console.log(`No date text found in cell ${index}`);
          return;
        }

        const day = parseInt(dateText);
        if (isNaN(day)) {
          console.log(`Invalid day: ${dateText} in cell ${index}`);
          return;
        }

        // 현재 달력의 년월 정보 가져오기
        const calendarHeader = document.querySelector('.rbc-toolbar-label');
        if (!calendarHeader) {
          console.log('No calendar header found');
          return;
        }

        const headerText = calendarHeader.textContent;
        if (!headerText) {
          console.log('No header text found');
          return;
        }

        console.log('Header text:', headerText);

        // 년월 파싱 (예: "2024년 12월")
        const yearMatch = headerText.match(/(\d{4})년/);
        const monthMatch = headerText.match(/(\d{1,2})월/);

        if (!yearMatch || !monthMatch) {
          console.log('Could not parse year/month from header:', headerText);
          return;
        }

        const year = parseInt(yearMatch[1]);
        const month = parseInt(monthMatch[1]) - 1; // JavaScript Date는 0부터 시작

        const date = new Date(year, month, day);
        const eventCount = getEventCountForDate(date);

        console.log(`Date: ${date.toDateString()}, Event count: ${eventCount}`);

        // 테스트를 위해 모든 날짜에 배지 표시
        const badge = document.createElement('div');
        badge.className = 'event-count-badge';

        // 일정 개수에 따른 클래스 추가
        if (eventCount === 1) badge.classList.add('count-1');
        else if (eventCount === 2) badge.classList.add('count-2');
        else if (eventCount === 3) badge.classList.add('count-3');
        else if (eventCount === 4) badge.classList.add('count-4');
        else if (eventCount > 0) badge.classList.add('count-5-plus');
        else badge.classList.add('count-1'); // 일정이 없어도 테스트용 배지

        badge.textContent =
          eventCount > 9 ? '9+' : eventCount > 0 ? eventCount.toString() : '0';
        cell.appendChild(badge);
        console.log(`Added badge for day ${day} with count ${eventCount}`);
      });
    };

    // 달력이 렌더링된 후 배지 추가
    const timer = setTimeout(addEventCountBadges, 500);

    return () => clearTimeout(timer);
  }, [calendarEvents, currentDate, currentView]);

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
    if (isEditMode) {
      console.log('일정 수정:', formData);
      // TODO: 실제 수정 로직 구현
    } else {
      console.log('일정 등록:', formData);
      // TODO: 실제 등록 로직 구현
    }
    router.push('/dashboard/registration/schedule-management');
  };

  const handleCancel = () => {
    console.log(isEditMode ? '수정 취소' : '등록 취소');
    router.push('/dashboard/registration/schedule-management');
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
        value={(formData[field as keyof typeof formData] as string) || ''}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className='w-full'
      />
    </div>
  );

  return (
    <div className='container mx-auto p-6'>
      {/* 페이지 제목 */}
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              {isEditMode ? '시험일정 수정' : '시험일정 등록'}
            </h1>
            <p className='mt-1 text-sm text-gray-600'>
              {isEditMode
                ? '기존 시험일정을 수정합니다.'
                : '새로운 시험일정을 등록합니다.'}
            </p>
          </div>
          <Button
            variant='outline'
            onClick={handleCancel}
            className='text-gray-600 hover:text-gray-900'
          >
            취소
          </Button>
        </div>
      </div>

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
              {/* 커스텀 네비게이션 툴바 */}
              <div className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleNavigate('PREV')}
                    className='hover:bg-blue-50'
                  >
                    ‹ 이전
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleNavigate('TODAY')}
                    className='hover:bg-blue-50'
                  >
                    오늘
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleNavigate('NEXT')}
                    className='hover:bg-blue-50'
                  >
                    다음 ›
                  </Button>
                </div>

                <div className='text-lg font-semibold text-gray-800'>
                  {currentDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </div>

                <div className='flex items-center gap-2'>
                  <Button
                    variant={currentView === 'month' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => handleViewChange('month')}
                  >
                    월
                  </Button>
                  <Button
                    variant={currentView === 'week' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => handleViewChange('week')}
                  >
                    주
                  </Button>
                  <Button
                    variant={currentView === 'day' ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => handleViewChange('day')}
                  >
                    일
                  </Button>
                </div>
              </div>

              <div className='h-[550px]'>
                <BigCalendar
                  ref={calendarRef}
                  localizer={localizer}
                  events={calendarEvents}
                  startAccessor='start'
                  endAccessor='end'
                  onSelectSlot={handleBigCalendarSelect}
                  onNavigate={handleNavigate}
                  onView={handleViewChange}
                  selectable
                  views={['month', 'week', 'day']}
                  view={currentView}
                  date={currentDate}
                  style={{ height: '100%' }}
                  culture='ko'
                  eventPropGetter={(event: any) => {
                    const baseStyle = event.style || {
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '11px',
                      padding: '4px 8px',
                      margin: '1px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    };

                    // 일정 개수에 따른 색상 변경
                    const eventDate = new Date(event.start);
                    const dayEvents = calendarEvents.filter((e) => {
                      const eDate = new Date(e.start);
                      return eDate.toDateString() === eventDate.toDateString();
                    });

                    const eventCount = dayEvents.length;

                    if (eventCount === 1) {
                      baseStyle.backgroundColor = '#10b981';
                    } else if (eventCount === 2) {
                      baseStyle.backgroundColor = '#3b82f6';
                    } else if (eventCount === 3) {
                      baseStyle.backgroundColor = '#f59e0b';
                    } else if (eventCount === 4) {
                      baseStyle.backgroundColor = '#8b5cf6';
                    } else if (eventCount >= 5) {
                      baseStyle.backgroundColor = '#ef4444';
                    }

                    return { style: baseStyle };
                  }}
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
                                        : activeDateField ===
                                            'admissionTicketEnd'
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
                              <p className='text-sm font-medium'>
                                {event.title}
                              </p>
                              <p className='text-muted-foreground text-xs'>
                                {event.qualification} | {event.examSession}회차
                                | {event.examType}
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
            <CardTitle>{isEditMode ? '일정 수정' : '일정 등록'}</CardTitle>
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
              <Button onClick={handleSubmit}>
                {isEditMode ? '수정' : '등록'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
