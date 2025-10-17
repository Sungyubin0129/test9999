'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Card } from '@/components/ui/card';
import {
  IconCircleCheck,
  IconAlertCircle,
  IconInfoCircle,
  IconAlertTriangle
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertConfig {
  title?: string;
  message: string;
  type?: AlertType;
  confirmText?: string;
}

interface AlertContextType {
  showAlert: (config: AlertConfig) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useCustomAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useCustomAlert must be used within AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<AlertConfig>({
    title: '',
    message: '',
    type: 'info',
    confirmText: '확인'
  });

  const showAlert = (alertConfig: AlertConfig) => {
    setConfig({
      title: alertConfig.title,
      message: alertConfig.message,
      type: alertConfig.type || 'info',
      confirmText: alertConfig.confirmText || '확인'
    });
    setOpen(true);
  };

  const getIconConfig = () => {
    switch (config.type) {
      case 'success':
        return {
          icon: <IconCircleCheck className='h-8 w-8' />,
          bgColor: 'bg-green-50 dark:bg-green-950/30',
          iconColor: 'text-green-600 dark:text-green-400',
          borderColor: 'border-green-200 dark:border-green-800',
          ringColor: 'ring-green-100 dark:ring-green-900/50'
        };
      case 'error':
        return {
          icon: <IconAlertCircle className='h-8 w-8' />,
          bgColor: 'bg-red-50 dark:bg-red-950/30',
          iconColor: 'text-red-600 dark:text-red-400',
          borderColor: 'border-red-200 dark:border-red-800',
          ringColor: 'ring-red-100 dark:ring-red-900/50'
        };
      case 'warning':
        return {
          icon: <IconAlertTriangle className='h-8 w-8' />,
          bgColor: 'bg-orange-50 dark:bg-orange-950/30',
          iconColor: 'text-orange-600 dark:text-orange-400',
          borderColor: 'border-orange-200 dark:border-orange-800',
          ringColor: 'ring-orange-100 dark:ring-orange-900/50'
        };
      default:
        return {
          icon: <IconInfoCircle className='h-8 w-8' />,
          bgColor: 'bg-blue-50 dark:bg-blue-950/30',
          iconColor: 'text-blue-600 dark:text-blue-400',
          borderColor: 'border-blue-200 dark:border-blue-800',
          ringColor: 'ring-blue-100 dark:ring-blue-900/50'
        };
    }
  };

  const getTitle = () => {
    if (config.title) return config.title;

    switch (config.type) {
      case 'success':
        return '성공';
      case 'error':
        return '오류';
      case 'warning':
        return '경고';
      default:
        return '알림';
    }
  };

  const getButtonVariant = () => {
    switch (config.type) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white shadow-xs focus-visible:ring-green-600/20 dark:bg-green-600 dark:hover:bg-green-700';
      case 'error':
        return 'bg-red-600 hover:bg-red-700 text-white shadow-xs focus-visible:ring-red-600/20 dark:bg-red-600 dark:hover:bg-red-700';
      case 'warning':
        return 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs focus-visible:ring-orange-600/20 dark:bg-orange-600 dark:hover:bg-orange-700';
      default:
        return 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs';
    }
  };

  const iconConfig = getIconConfig();

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='border-border bg-card max-w-md gap-0 overflow-hidden p-0'>
          {/* 상단 색상 바 */}
          <div className={cn('h-1.5 w-full', iconConfig.bgColor)} />

          <div className='p-6'>
            <AlertDialogHeader className='space-y-4'>
              {/* 아이콘 영역 */}
              <div className='flex justify-center'>
                <div
                  className={cn(
                    'flex items-center justify-center rounded-xl border-2 p-4 ring-4',
                    iconConfig.bgColor,
                    iconConfig.borderColor,
                    iconConfig.iconColor,
                    iconConfig.ringColor
                  )}
                >
                  {iconConfig.icon}
                </div>
              </div>

              {/* 제목 */}
              <AlertDialogTitle className='text-center text-xl font-semibold'>
                {getTitle()}
              </AlertDialogTitle>

              {/* 메시지 */}
              <AlertDialogDescription className='text-muted-foreground text-center text-base leading-relaxed'>
                {config.message}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className='mt-6 sm:justify-center'>
              <AlertDialogAction
                className={cn(
                  'h-10 rounded-md px-8 font-medium transition-all',
                  getButtonVariant()
                )}
                onClick={() => setOpen(false)}
              >
                {config.confirmText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </AlertContext.Provider>
  );
};
