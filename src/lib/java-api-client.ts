// Java 백엔드 API 클라이언트
// Java Spring Controller의 기능을 Next.js에서 호출

interface JavaAPIResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  etc?: string;
}

interface CBTLoginRequest {
  user_id: string;
  tq_num: string;
}

interface CBTLoginResponse {
  examinee: {
    timeleft: number;
    question_left: number;
    question_total: number;
    examtime: number;
  };
}

export class JavaAPIClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.JAVA_API_BASE_URL || 'http://localhost:8080';
  }

  // CBT 시스템 API
  async cbtLogin(
    data: CBTLoginRequest
  ): Promise<JavaAPIResponse<CBTLoginResponse>> {
    const response = await fetch(`${this.baseURL}/cbt/login.do`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(data)
    });

    return response.json();
  }

  async cbtStart(): Promise<JavaAPIResponse> {
    const response = await fetch(`${this.baseURL}/cbt/start.do`, {
      method: 'POST'
    });

    return response.json();
  }

  async cbtGoPage(examNo: string): Promise<JavaAPIResponse> {
    const response = await fetch(`${this.baseURL}/cbt/gopage.do`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ exam_no: examNo })
    });

    return response.json();
  }

  async cbtSubmit(): Promise<JavaAPIResponse> {
    const response = await fetch(`${this.baseURL}/cbt/submit.do`, {
      method: 'POST'
    });

    return response.json();
  }

  async cbtSave(): Promise<JavaAPIResponse> {
    const response = await fetch(`${this.baseURL}/cbt/save.do`, {
      method: 'POST'
    });

    return response.json();
  }

  // 관리자 시스템 API
  async adminLogin(credentials: {
    id: string;
    password: string;
  }): Promise<JavaAPIResponse> {
    const response = await fetch(`${this.baseURL}/admin/login.do`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(credentials)
    });

    return response.json();
  }

  // 자격증 관리 API
  async getQualificationList(params: {
    exam_kind?: string;
    exam_rec?: string;
    mber_id?: string;
    name?: string;
    pageline?: number;
    curpage?: number;
  }): Promise<JavaAPIResponse> {
    const response = await fetch(
      `${this.baseURL}/admin/qualification/list.do`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.json();
  }

  // 시험장바구니 API
  async getExamCartList(params: {
    user_no?: string;
    exam_kind?: string;
    cart_div?: string;
  }): Promise<JavaAPIResponse> {
    const response = await fetch(`${this.baseURL}/examHome/cart/list.do`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.json();
  }
}

// 싱글톤 인스턴스
export const javaAPI = new JavaAPIClient();
