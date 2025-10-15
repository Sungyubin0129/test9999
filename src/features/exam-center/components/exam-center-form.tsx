'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Upload, Save } from 'lucide-react';

interface ExamCenterFormProps {
  centerId: string;
}

export default function ExamCenterForm({ centerId }: ExamCenterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    region: '',
    postalCode: '',
    address: '',
    department: '',
    manager: '',
    mobile: '',
    fax: '',
    phone: '',
    mapImage: null as File | null,
    transportation: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, region: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, mapImage: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: API 호출
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className='space-y-6'>
          {/* 고사장명과 고사장코드 */}
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='name'>
                고사장명 <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='name'
                name='name'
                placeholder='고사장명을 입력해주세요'
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='code'>
                고사장코드 <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='code'
                name='code'
                placeholder='고사장코드를 입력해주세요'
                value={formData.code}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* 지역 */}
          <div className='space-y-2'>
            <Label htmlFor='region'>
              지역 <span className='text-red-500'>*</span>
            </Label>
            <Select value={formData.region} onValueChange={handleRegionChange}>
              <SelectTrigger>
                <SelectValue placeholder='지역을 선택해주세요' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='강원'>강원</SelectItem>
                <SelectItem value='경기'>경기</SelectItem>
                <SelectItem value='경기(송내)'>경기(송내)</SelectItem>
                <SelectItem value='경주'>경주</SelectItem>
                <SelectItem value='광주'>광주</SelectItem>
                <SelectItem value='당진'>당진</SelectItem>
                <SelectItem value='대구'>대구</SelectItem>
                <SelectItem value='대전'>대전</SelectItem>
                <SelectItem value='부산'>부산</SelectItem>
                <SelectItem value='서울'>서울</SelectItem>
                <SelectItem value='서울(구룡)'>서울(구룡)</SelectItem>
                <SelectItem value='서울(무학)'>서울(무학)</SelectItem>
                <SelectItem value='서울(여자)'>서울(여자)</SelectItem>
                <SelectItem value='서울(한양중공업)'>
                  서울(한양중공업)
                </SelectItem>
                <SelectItem value='아산(천안)'>아산(천안)</SelectItem>
                <SelectItem value='안동'>안동</SelectItem>
                <SelectItem value='울산'>울산</SelectItem>
                <SelectItem value='인천'>인천</SelectItem>
                <SelectItem value='전주(익산)'>전주(익산)</SelectItem>
                <SelectItem value='창원'>창원</SelectItem>
                <SelectItem value='청주'>청주</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 우편번호와 주소 */}
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='postalCode'>우편번호</Label>
              <div className='flex gap-2'>
                <Input
                  id='postalCode'
                  name='postalCode'
                  placeholder='우편번호'
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className='max-w-[200px]'
                />
                <Button type='button' variant='outline'>
                  우편번호 찾기
                </Button>
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='address'>주소</Label>
              <Input
                id='address'
                name='address'
                placeholder='주소를 입력해주세요'
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* 담당부서와 담당자 */}
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='department'>담당부서</Label>
              <Input
                id='department'
                name='department'
                placeholder='담당부서를 입력해주세요'
                value={formData.department}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='manager'>담당자</Label>
              <Input
                id='manager'
                name='manager'
                placeholder='담당자 이름을 입력해주세요'
                value={formData.manager}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className='grid gap-6 md:grid-cols-3'>
            <div className='space-y-2'>
              <Label htmlFor='phone'>전화번호</Label>
              <Input
                id='phone'
                name='phone'
                placeholder='전화번호를 입력해주세요'
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='mobile'>핸드폰</Label>
              <Input
                id='mobile'
                name='mobile'
                placeholder='핸드폰 번호를 입력해주세요'
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='fax'>팩스</Label>
              <Input
                id='fax'
                name='fax'
                placeholder='팩스 번호를 입력해주세요'
                value={formData.fax}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* 약도 이미지 */}
          <div className='space-y-2'>
            <Label htmlFor='mapImage'>약도 이미지</Label>
            <div className='flex items-center gap-4'>
              <Input
                id='mapImage'
                name='mapImage'
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='hidden'
              />
              <Button
                type='button'
                variant='outline'
                onClick={() => document.getElementById('mapImage')?.click()}
              >
                <Upload className='mr-2 h-4 w-4' />
                이미지 업로드
              </Button>
              {formData.mapImage && (
                <span className='text-muted-foreground text-sm'>
                  {formData.mapImage.name}
                </span>
              )}
            </div>
          </div>

          {/* 교통편 */}
          <div className='space-y-2'>
            <Label htmlFor='transportation'>교통편</Label>
            <Textarea
              id='transportation'
              name='transportation'
              placeholder='교통편 정보를 입력해주세요 (예: 지하철 2호선 강남역 3번 출구)'
              value={formData.transportation}
              onChange={handleInputChange}
              rows={4}
            />
            <p className='text-muted-foreground text-xs'>
              * 대중교통 이용 방법이나 주요 랜드마크를 기준으로 상세히
              안내해주세요.
            </p>
          </div>

          {/* 버튼 */}
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' asChild>
              <Link href='/dashboard/exam-center/manage'>취소</Link>
            </Button>
            <Button type='submit'>
              <Save className='mr-2 h-4 w-4' />
              저장
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
