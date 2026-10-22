export const EMAIL = "hojun6901@gmail.com";
export const GITHUB = "https://github.com/kwak317";

export type Tag = { name: string; tone: "blue" | "teal" | "amber" | "rose" | "violet" | "green" };

export const skillGroups: {
  title: string;
  items: { name: string; mark: string; tone: Tag["tone"]; text: string }[];
}[] = [
  {
    title: "LANGUAGES",
    items: [
      { name: "Python", mark: "Py", tone: "blue", text: "LLM 호출, 데이터 처리, FastAPI 서버를 만듭니다." },
      { name: "TypeScript", mark: "TS", tone: "blue", text: "React 화면을 타입 안전하게 구현합니다." },
      { name: "Java", mark: "Jv", tone: "amber", text: "Spring Boot로 웹 서비스 서버 로직을 구현합니다." },
      { name: "SQL", mark: "SQ", tone: "teal", text: "서비스 데이터를 구조화하고 조회합니다." },
    ],
  },
  {
    title: "AI · LLM",
    items: [
      { name: "LLM API", mark: "AI", tone: "violet", text: "OpenRouter·OpenAI 호출, 출력 검증과 재시도를 다룹니다." },
      { name: "Prompt · Skill", mark: "Pr", tone: "violet", text: "판단 기준과 출력 JSON 계약을 설계합니다." },
      { name: "FastMCP", mark: "MC", tone: "rose", text: "에이전트가 쓰는 조회·비교 도구를 만듭니다." },
      { name: "Langfuse", mark: "Lf", tone: "rose", text: "LLM 호출을 관측하고 평가셋으로 품질을 확인합니다." },
    ],
  },
  {
    title: "BACKEND",
    items: [
      { name: "FastAPI", mark: "Fa", tone: "teal", text: "Python 기반 API 서버를 구현합니다." },
      { name: "Spring Boot", mark: "Sb", tone: "green", text: "JWT 인증, MyBatis, MySQL과 함께 사용했습니다." },
      { name: "Supabase", mark: "Su", tone: "green", text: "사용자 데이터와 기록을 저장합니다." },
    ],
  },
  {
    title: "FRONT · INFRA",
    items: [
      { name: "React", mark: "Re", tone: "blue", text: "Vite와 함께 서비스 화면과 흐름을 구현합니다." },
      { name: "Streamlit", mark: "St", tone: "rose", text: "데이터 중심 웹 앱을 빠르게 만듭니다." },
      { name: "Docker", mark: "Dk", tone: "blue", text: "누구나 같은 환경에서 재현하도록 정리합니다." },
      { name: "Vercel · Cloud Run", mark: "Dp", tone: "amber", text: "서비스를 실제 도메인에 배포해 운영합니다." },
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  kind: "Team Project" | "Solo Project";
  team: string;
  oneLine: string;
  tags: Tag[];
  summary: string;
  points: { title: string; text: string }[];
  roles?: { area: string; work: string }[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "malhaebom",
    name: "말해봄 Mk.2",
    kind: "Team Project",
    team: "3인 팀, malhaebom.xyz 운영 중",
    oneLine: "면접 답변을 녹음하면 답변 속 근거를 바탕으로 코칭해 주는 AI 면접 코칭 에이전트",
    tags: [
      { name: "Python", tone: "blue" },
      { name: "FastAPI", tone: "teal" },
      { name: "FastMCP", tone: "rose" },
      { name: "LLM", tone: "violet" },
      { name: "React", tone: "blue" },
      { name: "Langfuse", tone: "amber" },
    ],
    summary:
      "신입 개발자 취업준비생이 한국어 면접 답변을 녹음하면, 답변에서 확인되는 근거를 바탕으로 코칭하고 다시 연습하도록 돕는 AI 면접 코칭 에이전트입니다. 실제 도메인에 배포해 운영하고 있습니다.",
    points: [
  {
    title: "풀려는 문제",
    text: "혼자 면접을 준비하면 내 답변의 어디가 부족한지, 무엇을 근거로 고쳐야 하는지 알기 어렵습니다.",
  },
  {
    title: "AI 활용",
    text: "STT·VAD로 녹음 답변을 분석하고, Skill·MCP·LLM을 조합해 답변 근거 기반 코칭, 꼬리질문, 재답변 비교를 제공합니다.",
  },
  {
    title: "맞춤 준비",
    text: "NCS 역량 자기점검, GitHub README·이력서 PDF 분석으로 확인한 경험을 바탕으로 채용공고를 추천하고 요구사항을 뽑아냅니다.",
  },
  {
    title: "품질 관리",
    text: "고정 평가셋과 Langfuse 계측으로 코칭 품질을 평가하고, Docker Compose로 누구나 재현할 수 있게 정리했습니다.",
  },
],
    roles: [
  {
    area: "서비스 기획",
    work: "신입 개발자 면접의 문제 해결 경험으로 범위를 구체화하고, 답변 근거 확인 → 코칭 → 재답변 → 비교 흐름을 정리했습니다.",
  },
  {
    area: "Prompt · Skill",
    work: "면접 코칭 판단 기준, 질문별 Skill, 출력 JSON 계약, 한국어 출력과 근거 기반 예시 답변을 구현하고 개선했습니다.",
  },
  {
    area: "LLM 백엔드",
    work: "모델 호출, 출력 검증·재시도, 실패 단계와 오류 응답 처리, Langfuse 관측과 Prompt 관리를 연결했습니다.",
  },
  {
    area: "MCP",
    work: "코칭에 필요한 조회·답변 비교 도구와 사용자·범위 기반 접근 제한, 인증 검증을 만들었습니다.",
  },
  {
    area: "연습 화면 · 대화 흐름",
    work: "연습 설정, 전사 확인·수정, 코칭 결과 표시, 재답변 비교, 후속 면접 대화, 기록 조회·재시작을 연결했습니다.",
  },
  {
    area: "취업 준비 기능",
    work: "NCS 자기점검·GitHub README 분석, 채용공고 검색·선택·요구사항 분석, 이력서 보조 흐름을 연결하고 PDF 가져오기 오류를 고쳤습니다.",
  },
  {
    area: "평가 · 재현 · 문서화",
    work: "30건 평가셋과 근거 매핑 수정, Prompt 비교·반복 평가, 운영 소스 동기화, Docker CPU 재현 환경 개선, 평가·에이전트 보고서를 작성했습니다.",
  },
],
    stack: [
  "React",
  "TypeScript",
  "Vite",
  "Python",
  "FastAPI",
  "STT · VAD",
  "FastMCP",
  "LLM (OpenRouter)",
  "Supabase",
  "Langfuse",
  "Docker",
  "Vercel",
  "Cloud Run",
],
    links: [
      { label: "면접 연습 해보기", href: "https://malhaebom.xyz/app/practice" },
      { label: "서비스 소개", href: "https://malhaebom.xyz/" },
      { label: "GitHub", href: "https://github.com/kwak317/malhaebom" },
    ],
  },
  {
    id: "pc-quote",
    name: "AI 컴퓨터 견적",
    kind: "Team Project",
    team: "5Headers 팀, 웹개발 과정",
    oneLine: "용도와 예산을 입력하면 GPT가 부품 조합을 추천하고 최저가·주변 매장까지 이어주는 서비스",
    tags: [
      { name: "React", tone: "blue" },
      { name: "Spring Boot", tone: "green" },
      { name: "MySQL", tone: "teal" },
      { name: "OpenAI API", tone: "violet" },
    ],
    summary:
      "사용자가 용도와 예산을 입력하면 GPT가 맞춤형 부품 조합을 추천하고, 온라인 최저가와 주변 오프라인 매장까지 이어주는 컴퓨터 견적 웹서비스입니다.",
    points: [
      { title: "풀려는 문제", text: "목적과 예산에 맞는 부품을 직접 비교하고 고르는 견적 과정이 복잡했습니다." },
      { title: "AI 활용", text: "GPT API로 요구사항을 분석해 견적을 만들고, 응답 JSON을 파싱·정제해 보여줍니다. 대화로 추천 부품을 수정할 수도 있습니다." },
      { title: "구매 연결", text: "네이버 쇼핑 API로 부품별 최저가와 구매 링크를, 카카오맵 API로 근처 오프라인 매장을 안내합니다." },
      { title: "회원 기능", text: "JWT·소셜 로그인, 견적 저장·즐겨찾기·기록 보기, Firebase 프로필 이미지 업로드를 지원합니다." },
    ],
    stack: ["React", "Vite", "Java 17", "Spring Boot", "Spring Security · JWT", "MyBatis", "MySQL", "OpenAI API", "Naver Shopping API", "Kakao Map API", "Firebase"],
    links: [
      { label: "프론트엔드 GitHub", href: "https://github.com/5Headers/team_project_frontend" },
      { label: "백엔드 GitHub", href: "https://github.com/5Headers/team_project_backend" },
    ],
  },
  {
    id: "store",
    name: "주변기기 매장 운영",
    kind: "Solo Project",
    team: "개인 프로젝트",
    oneLine: "컴퓨터 주변기기 매장의 상품과 운영 정보를 한 화면에서 관리하는 웹 앱",
    tags: [
      { name: "Python", tone: "blue" },
      { name: "Streamlit", tone: "rose" },
      { name: "Pandas", tone: "violet" },
    ],
    summary:
      "컴퓨터 주변기기 매장의 상품과 운영 정보를 한눈에 확인하고 효율적으로 관리할 수 있도록 만든 웹 서비스입니다. 바로 써볼 수 있게 배포해 두었습니다.",
    points: [
      { title: "상품 관리", text: "상품 정보를 정리해 필요한 항목을 빠르게 찾을 수 있게 구성했습니다." },
      { title: "매장 운영", text: "운영에 필요한 데이터를 한 화면에 모아 반복 관리 업무를 줄였습니다." },
      { title: "데이터 확인", text: "상품과 운영 현황을 읽기 쉬운 형태로 보여줘 빠른 판단을 돕습니다." },
    ],
    stack: ["Python", "Streamlit", "Pandas"],
    links: [{ label: "서비스 직접 써보기", href: "https://streamline-fewhcwgoquxqmznnyr9yx8.streamlit.app" }],
  },
];
