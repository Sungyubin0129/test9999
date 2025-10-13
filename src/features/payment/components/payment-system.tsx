'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle,
  AlertCircle,
  Clock,
  Receipt,
  Download
} from 'lucide-react';

// Java 프로젝트의 결제 데이터 타입
interface PaymentItem {
  id: string;
  name: string;
  type: 'exam' | 'certificate' | 'renewal';
  price: number;
  description: string;
  examDate?: string;
  certificateType?: string;
}

interface PaymentInfo {
  paymentId: string;
  amount: number;
  method: 'card' | 'bank' | 'mobile';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  receiptUrl?: string;
}

// Mock 데이터 (Java 프로젝트의 결제 데이터 구조)
const mockPaymentItems: PaymentItem[] = [
  {
    id: 'EXAM001',
    name: '회계사 1급 시험',
    type: 'exam',
    price: 50000,
    description: '2024년 1차 회계사 1급 시험 접수',
    examDate: '2024-03-15'
  },
  {
    id: 'CERT001',
    name: '회계사 자격증 발급',
    type: 'certificate',
    price: 30000,
    description: '회계사 1급 자격증 발급 수수료',
    certificateType: '디지털 자격증'
  },
  {
    id: 'RENEW001',
    name: '자격증 갱신',
    type: 'renewal',
    price: 20000,
    description: '회계사 자격증 5년 갱신'
  }
];

export function PaymentSystem() {
  const [selectedItems, setSelectedItems] = useState<PaymentItem[]>([]);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'bank' | 'mobile'
  >('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // 장바구니에 추가
  const addToCart = (item: PaymentItem) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  // 장바구니에서 제거
  const removeFromCart = (itemId: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // 총 금액 계산
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);

  // 결제 처리 (Mock)
  const handlePayment = async () => {
    setIsProcessing(true);

    // Mock 결제 처리
    setTimeout(() => {
      const newPayment: PaymentInfo = {
        paymentId: `PAY_${Date.now()}`,
        amount: totalAmount,
        method: paymentMethod,
        status: 'completed',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        receiptUrl: '/receipts/sample-receipt.pdf'
      };

      setPaymentInfo(newPayment);
      setIsProcessing(false);
      setSelectedItems([]);
    }, 2000);
  };

  // 결제 방법 아이콘
  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className='h-5 w-5' />;
      case 'bank':
        return <Building2 className='h-5 w-5' />;
      case 'mobile':
        return <Smartphone className='h-5 w-5' />;
      default:
        return <CreditCard className='h-5 w-5' />;
    }
  };

  // 결제 상태 배지
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant='default' className='bg-green-500'>
            <CheckCircle className='mr-1 h-3 w-3' />
            완료
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant='secondary'>
            <Clock className='mr-1 h-3 w-3' />
            대기
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant='destructive'>
            <AlertCircle className='mr-1 h-3 w-3' />
            실패
          </Badge>
        );
      case 'cancelled':
        return <Badge variant='outline'>취소</Badge>;
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  return (
    <div className='space-y-6'>
      {/* Java 프로젝트의 결제 헤더 */}
      <div>
        <h1 className='text-3xl font-bold'>결제 시스템</h1>
        <p className='text-muted-foreground'>
          시험 접수 및 자격증 발급 결제를 진행하세요.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* 결제 상품 목록 */}
        <Card>
          <CardHeader>
            <CardTitle>결제 상품</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {mockPaymentItems.map((item) => (
              <div key={item.id} className='rounded-lg border p-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <h3 className='font-semibold'>{item.name}</h3>
                  <Badge
                    variant={
                      item.type === 'exam'
                        ? 'default'
                        : item.type === 'certificate'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {item.type === 'exam'
                      ? '시험'
                      : item.type === 'certificate'
                        ? '자격증'
                        : '갱신'}
                  </Badge>
                </div>
                <p className='text-muted-foreground mb-3 text-sm'>
                  {item.description}
                </p>
                <div className='flex items-center justify-between'>
                  <span className='text-lg font-bold'>
                    {item.price.toLocaleString()}원
                  </span>
                  <Button
                    size='sm'
                    onClick={() => addToCart(item)}
                    disabled={selectedItems.some(
                      (selected) => selected.id === item.id
                    )}
                  >
                    {selectedItems.some((selected) => selected.id === item.id)
                      ? '추가됨'
                      : '추가'}
                  </Button>
                </div>
                {item.examDate && (
                  <p className='text-muted-foreground mt-2 text-xs'>
                    시험일: {item.examDate}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 장바구니 및 결제 */}
        <Card>
          <CardHeader>
            <CardTitle>장바구니</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {selectedItems.length === 0 ? (
              <p className='text-muted-foreground py-8 text-center'>
                장바구니가 비어있습니다.
              </p>
            ) : (
              <>
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between border-b pb-2'
                  >
                    <div>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-muted-foreground text-sm'>
                        {item.price.toLocaleString()}원
                      </p>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => removeFromCart(item.id)}
                    >
                      제거
                    </Button>
                  </div>
                ))}

                <Separator />

                <div className='flex items-center justify-between text-lg font-bold'>
                  <span>총 금액</span>
                  <span>{totalAmount.toLocaleString()}원</span>
                </div>

                {/* 결제 방법 선택 */}
                <div className='space-y-3'>
                  <Label>결제 방법</Label>
                  <div className='grid grid-cols-3 gap-2'>
                    <Button
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard className='mr-2 h-4 w-4' />
                      카드
                    </Button>
                    <Button
                      variant={paymentMethod === 'bank' ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <Building2 className='mr-2 h-4 w-4' />
                      계좌이체
                    </Button>
                    <Button
                      variant={
                        paymentMethod === 'mobile' ? 'default' : 'outline'
                      }
                      size='sm'
                      onClick={() => setPaymentMethod('mobile')}
                    >
                      <Smartphone className='mr-2 h-4 w-4' />
                      휴대폰
                    </Button>
                  </div>
                </div>

                <Button
                  className='w-full'
                  size='lg'
                  onClick={handlePayment}
                  disabled={isProcessing || selectedItems.length === 0}
                >
                  {isProcessing
                    ? '결제 처리 중...'
                    : `${totalAmount.toLocaleString()}원 결제하기`}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 결제 완료 정보 */}
      {paymentInfo && (
        <Card className='border-green-200 bg-green-50'>
          <CardHeader>
            <CardTitle className='flex items-center text-green-800'>
              <CheckCircle className='mr-2 h-5 w-5' />
              결제 완료
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label className='text-sm font-medium'>결제 ID</Label>
                <p className='text-sm'>{paymentInfo.paymentId}</p>
              </div>
              <div>
                <Label className='text-sm font-medium'>결제 방법</Label>
                <div className='flex items-center'>
                  {getPaymentIcon(paymentInfo.method)}
                  <span className='ml-2 text-sm'>
                    {paymentInfo.method === 'card'
                      ? '신용카드'
                      : paymentInfo.method === 'bank'
                        ? '계좌이체'
                        : '휴대폰 결제'}
                  </span>
                </div>
              </div>
              <div>
                <Label className='text-sm font-medium'>결제 금액</Label>
                <p className='text-sm font-bold'>
                  {paymentInfo.amount.toLocaleString()}원
                </p>
              </div>
              <div>
                <Label className='text-sm font-medium'>결제 상태</Label>
                <div className='mt-1'>{getStatusBadge(paymentInfo.status)}</div>
              </div>
            </div>

            <Separator />

            <div className='flex space-x-2'>
              <Button variant='outline' size='sm'>
                <Receipt className='mr-2 h-4 w-4' />
                영수증 보기
              </Button>
              <Button variant='outline' size='sm'>
                <Download className='mr-2 h-4 w-4' />
                영수증 다운로드
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
