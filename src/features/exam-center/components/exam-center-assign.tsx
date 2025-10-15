'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function ExamCenterAssign() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    qualification: '',
    examSession: '',
    examType: '',
    region: '',
    examCenter: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('고사장배정:', formData);
    // TODO: API 호출
    alert('고사장이 배정되었습니다.');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className='h-full'>
      <div className='h-full space-y-6'>
        <Card>
          <CardContent className='space-y-6'>
            <div className='grid gap-6 md:grid-cols-2'>
              {/* 자격명 */}
              <div className='space-y-2'>
                <Label
                  htmlFor='qualification'
                  className='flex items-center gap-2'
                >
                  <FileText className='text-muted-foreground h-4 w-4' />
                  자격명 <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={formData.qualification}
                  onValueChange={(value) =>
                    handleSelectChange('qualification', value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder='자격명을 선택해주세요' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='정보처리기사'>정보처리기사</SelectItem>
                    <SelectItem value='정보처리산업기사'>
                      정보처리산업기사
                    </SelectItem>
                    <SelectItem value='빅데이터분석기사'>
                      빅데이터분석기사
                    </SelectItem>
                    <SelectItem value='정보보안기사'>정보보안기사</SelectItem>
                    <SelectItem value='네트워크관리사'>
                      네트워크관리사
                    </SelectItem>
                    <SelectItem value='컴퓨터활용능력1급'>
                      컴퓨터활용능력1급
                    </SelectItem>
                    <SelectItem value='컴퓨터활용능력2급'>
                      컴퓨터활용능력2급
                    </SelectItem>
                    <SelectItem value='워드프로세서'>워드프로세서</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 시험회차 */}
              <div className='space-y-2'>
                <Label
                  htmlFor='examSession'
                  className='flex items-center gap-2'
                >
                  <Calendar className='text-muted-foreground h-4 w-4' />
                  시험회차 <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='examSession'
                  name='examSession'
                  placeholder='예: 2025년 1회'
                  value={formData.examSession}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* 시험구분 */}
              <div className='space-y-2'>
                <Label htmlFor='examType' className='flex items-center gap-2'>
                  <FileText className='text-muted-foreground h-4 w-4' />
                  시험구분 <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={formData.examType}
                  onValueChange={(value) =>
                    handleSelectChange('examType', value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder='시험구분을 선택해주세요' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='필기'>필기</SelectItem>
                    <SelectItem value='실기'>실기</SelectItem>
                    <SelectItem value='필기+실기'>필기+실기</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 지역 */}
              <div className='space-y-2'>
                <Label htmlFor='region' className='flex items-center gap-2'>
                  <MapPin className='text-muted-foreground h-4 w-4' />
                  지역 <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => handleSelectChange('region', value)}
                  required
                >
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
            </div>

            {/* 고사장 - Full width */}
            <div className='space-y-2'>
              <Label htmlFor='examCenter' className='flex items-center gap-2'>
                <Building2 className='text-muted-foreground h-4 w-4' />
                고사장 <span className='text-red-500'>*</span>
              </Label>
              <Select
                value={formData.examCenter}
                onValueChange={(value) =>
                  handleSelectChange('examCenter', value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder='고사장을 선택해주세요' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='서울중앙초등학교'>
                    서울중앙초등학교
                  </SelectItem>
                  <SelectItem value='부산새빛중학교'>부산새빛중학교</SelectItem>
                  <SelectItem value='경기푸른고등학교'>
                    경기푸른고등학교
                  </SelectItem>
                  <SelectItem value='한국한빛대학교'>한국한빛대학교</SelectItem>
                  <SelectItem value='대전밝은초등학교'>
                    대전밝은초등학교
                  </SelectItem>
                  <SelectItem value='인천중앙중학교'>인천중앙중학교</SelectItem>
                  <SelectItem value='광주동부고등학교'>
                    광주동부고등학교
                  </SelectItem>
                  <SelectItem value='대구서부대학교'>대구서부대학교</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 버튼 */}
            <div className='flex justify-end gap-3 border-t pt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={handleCancel}
                className='min-w-32'
              >
                취소
              </Button>
              <Button type='submit' className='min-w-32'>
                <CheckCircle2 className='mr-2 h-4 w-4' />
                배정
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
