'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CKEditorWrapperProps {
  data: string;
  onChange: (data: string) => void;
  config?: any;
}

export default function CKEditorWrapper({
  data,
  onChange,
  config
}: CKEditorWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const loadEditor = async () => {
      try {
        // 동적 import로 CKEditor 로드
        const { CKEditor } = await import('@ckeditor/ckeditor5-react');
        const ClassicEditor = (
          await import('@ckeditor/ckeditor5-build-classic')
        ).default;

        if (!isMounted) return;

        // React.createElement를 사용하여 동적으로 컴포넌트 생성
        const EditorComponent = React.createElement(
          CKEditor as any,
          {
            editor: ClassicEditor,
            data: data,
            config: {
              toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                '|',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'blockQuote',
                'link',
                '|',
                'undo',
                'redo'
              ],
              ...config
            },
            onReady: (editor: any) => {
              editorRef.current = editor;
              // 에디터 높이 설정
              editor.editing.view.change((writer: any) => {
                writer.setStyle(
                  'min-height',
                  '400px',
                  editor.editing.view.document.getRoot()
                );
              });
            },
            onChange: (event: any, editor: any) => {
              const editorData = editor.getData();
              onChange(editorData);
            }
          } as any
        );

        // 상태 업데이트를 통해 컴포넌트 렌더링
        setIsLoaded(true);
        setError(null);
      } catch (err) {
        console.error('CKEditor 로딩 실패:', err);
        if (isMounted) {
          setError('에디터 로딩에 실패했습니다.');
          setIsLoaded(false);
        }
      }
    };

    loadEditor();

    return () => {
      isMounted = false;
      if (editorRef.current) {
        editorRef.current.destroy?.();
      }
    };
  }, []);

  // data prop이 변경될 때 에디터 내용 업데이트
  useEffect(() => {
    if (editorRef.current && editorRef.current.getData() !== data) {
      editorRef.current.setData(data);
    }
  }, [data]);

  if (error) {
    return (
      <div className='flex min-h-[400px] items-center justify-center rounded border bg-red-50 p-4'>
        <div className='text-center'>
          <p className='mb-2 text-red-600'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='text-sm text-red-500 underline'
          >
            페이지 새로고침
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className='flex min-h-[400px] items-center justify-center rounded border bg-gray-50 p-4'>
        <div className='text-center'>
          <div className='mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900'></div>
          <p className='text-gray-500'>CKEditor를 로딩 중입니다...</p>
        </div>
      </div>
    );
  }

  return <CKEditorComponent data={data} onChange={onChange} config={config} />;
}

// 별도 컴포넌트로 분리
function CKEditorComponent({ data, onChange, config }: CKEditorWrapperProps) {
  const [Editor, setEditor] = useState<any>(null);
  const [ClassicEditor, setClassicEditor] = useState<any>(null);

  useEffect(() => {
    const loadModules = async () => {
      try {
        const [editorModule, classicModule] = await Promise.all([
          import('@ckeditor/ckeditor5-react'),
          import('@ckeditor/ckeditor5-build-classic')
        ]);

        setEditor(() => editorModule.CKEditor);
        setClassicEditor(() => classicModule.default);
      } catch (error) {
        console.error('모듈 로딩 실패:', error);
      }
    };

    loadModules();
  }, []);

  if (!Editor || !ClassicEditor) {
    return (
      <div className='flex min-h-[400px] items-center justify-center rounded border bg-gray-50 p-4'>
        <p className='text-gray-500'>에디터 모듈을 로딩 중입니다...</p>
      </div>
    );
  }

  const EditorComponent = Editor as any;

  return (
    <EditorComponent
      editor={ClassicEditor}
      data={data}
      config={{
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          '|',
          'blockQuote',
          'link',
          '|',
          'undo',
          'redo'
        ],
        ...config
      }}
      onReady={(editor: any) => {
        // 에디터 높이 설정 - 컴팩트하게 조정
        editor.editing.view.change((writer: any) => {
          writer.setStyle(
            'min-height',
            '280px',
            editor.editing.view.document.getRoot()
          );
          writer.setStyle(
            'height',
            '100%',
            editor.editing.view.document.getRoot()
          );
        });
      }}
      onChange={(event: any, editor: any) => {
        const editorData = editor.getData();
        onChange(editorData);
      }}
    />
  );
}
