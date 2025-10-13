import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

// Define the base Next.js configuration
const baseConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist'],

  // Java 백엔드 API 프록시 설정
  async rewrites() {
    return [
      {
        source: '/api/java/:path*',
        destination: 'http://localhost:8080/:path*' // Java Spring Boot 서버
      },
      {
        source: '/api/cbt/:path*',
        destination: 'http://localhost:8080/cbt/:path*'
      },
      {
        source: '/api/admin/:path*',
        destination: 'http://localhost:8080/admin/:path*'
      }
    ];
  },

  // 환경 변수 설정
  env: {
    JAVA_API_BASE_URL: process.env.JAVA_API_BASE_URL || 'http://localhost:8080',
    DATABASE_URL: process.env.DATABASE_URL
  }
};

let configWithPlugins = baseConfig;

// Conditionally enable Sentry configuration
if (!process.env.NEXT_PUBLIC_SENTRY_DISABLED) {
  configWithPlugins = withSentryConfig(configWithPlugins, {
    org: process.env.NEXT_PUBLIC_SENTRY_ORG,
    project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
    silent: !process.env.CI,
    widenClientFileUpload: true,
    reactComponentAnnotation: {
      enabled: true
    },
    tunnelRoute: '/monitoring',
    disableLogger: true,
    telemetry: false
  });
}

const nextConfig = configWithPlugins;
export default nextConfig;
