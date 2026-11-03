export const EMAIL = "hojun6901@gmail.com";
export const GITHUB = "https://github.com/kwak317";

export const strengths: {
  title: string;
  en: string;
  claim: string;
  evidence: string[];
  story?: { label: string; text: string };
  roles?: { label: string; items: { name: string; text: string }[] };
}[] = [
  {
    title: "협업 능력",
    en: "COLLABORATION",
    claim: "3인 팀에서 기획부터 구현, 평가, 문서화까지 맡아 결과물을 함께 완성했습니다.",
    evidence: [
      "말해봄 Mk.2를 3인 팀으로 개발해 실제 도메인에 배포하고 운영하고 있습니다.",
      "서비스 기획에서 범위를 구체화하고 답변 근거 확인 → 코칭 → 재답변 → 비교 흐름을 정리했습니다.",
      "Docker CPU 재현 환경을 개선해 누구나 같은 환경에서 실행할 수 있게 했습니다.",
      "운영 소스를 동기화하고 평가·에이전트 보고서를 작성해 작업 결과를 문서로 남겼습니다.",
    ],
    story: {
      label: "팀장으로서 의견을 조율한 경험",
      text: "2차 프로젝트 초반, 팀원과 주제에 대한 의견이 엇갈렸습니다. 저는 각자의 안을 밀어붙이기보다 1차 프로젝트에서 검증한 틀을 2차 주제에 접목할 수 있는지 먼저 따져 보았고, 그 틀을 재사용하면 개발 범위와 위험을 줄일 수 있다는 근거를 팀원과 함께 검토했습니다. 충분히 상의한 끝에 합의에 이르렀고, 그 결과가 말해봄 Mk.2로 이어져 지금은 실제 도메인에 배포해 운영하고 있습니다.",
    },
    roles: {
      label: "팀장으로서 한 일",
      items: [
        { name: "방향 설정", text: "채용공고와 프로젝트 README를 바탕으로 면접을 준비하고, 첫 답변을 코칭받은 뒤 다시 답해 보는 연습 흐름을 설계했습니다." },
        { name: "역할 분담", text: "3인 팀에서 서비스 화면과 API 연동을 맡고, 팀원이 개발한 음성 인식 기능을 면접 코칭 흐름에 연결했습니다." },
        { name: "기준 합의", text: "코칭 결과의 JSON 형식과 답변 원문 인용 기준을 정리하고, AI가 사용자가 말하지 않은 선택 이유를 추측하지 않도록 예시를 작성했습니다." },
        { name: "진행 관리", text: "병합된 PR을 기준으로 기능별 구현·검증 현황을 정리하고, 배포 버전에 반영된 내용을 발표·제출 자료에 담았습니다." },
        { name: "배포·운영", text: "프론트엔드와 백엔드를 각각 Vercel과 Cloud Run에 배포하고, Langfuse에서 코칭 요청의 처리 과정과 실패 지점을 확인할 수 있게 했습니다." },
      ],
    },
  },
  {
    title: "AI 활용 능력",
    en: "AI ENGINEERING",
    claim: "AI를 그냥 호출하는 데서 끝내지 않고, 결과를 검증하고 평가해서 믿고 쓸 수 있게 만듭니다.",
    evidence: [
      "면접 코칭 판단 기준, 질문별 Skill, 출력 JSON 계약을 설계하고 개선했습니다.",
      "LLM 출력 검증과 재시도, 실패 단계별 오류 처리를 백엔드에 구현했습니다.",
      "FastMCP로 코칭에 필요한 조회·답변 비교 도구를 만들고 접근 제한과 인증을 붙였습니다.",
      "30건 평가셋과 Langfuse 계측으로 Prompt를 비교하고 반복 평가했습니다.",
    ],
  },
];

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
      { name: "RAG", mark: "Rg", tone: "amber", text: "문서를 검색해 LLM 답변의 근거로 연결합니다." },
      { name: "LLM API", mark: "AI", tone: "violet", text: "OpenRouter·OpenAI 호출, 출력 검증과 재시도를 다룹니다." },
      { name: "Prompt · Skill", mark: "Pr", tone: "violet", text: "판단 기준과 출력 JSON 계약을 설계합니다." },
      { name: "FastMCP", mark: "MC", tone: "rose", text: "에이전트가 쓰는 조회·비교 도구를 만듭니다." },
      { name: "Langfuse", mark: "Lf", tone: "rose", text: "LLM 호출을 관측하고 평가셋으로 품질을 확인합니다." },
      { name: "LangGraph", mark: "LG", tone: "teal", text: "상태와 분기가 있는 에이전트 흐름을 그래프로 설계합니다." },
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
      { name: "Docker", mark: "Dk", tone: "blue", text: "누구나 같은 환경에서 재현하도록 정리합니다." },
      { name: "React", mark: "Re", tone: "blue", text: "Vite와 함께 서비스 화면과 흐름을 구현합니다." },
      { name: "Streamlit", mark: "St", tone: "rose", text: "데이터 중심 웹 앱을 빠르게 만듭니다." },
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
  video?: { src: string; poster: string; caption: string };
};

export const projects: Project[] = [
  {
    id: "malhaebom",
    name: "말해봄 Mk.2",
    kind: "Team Project",
    team: "3인 팀, malhaebom.xyz 운영 중",
    oneLine: "면접 답변을 녹음하면 답변 속 근거를 바탕으로 코칭해 주는 AI 면접 코칭 에이전트",
    tags: [
      { name: "RAG", tone: "amber" },
      { name: "FastAPI", tone: "teal" },
      { name: "Docker", tone: "blue" },
      { name: "Python", tone: "blue" },
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
  "RAG",
  "FastAPI",
  "Docker",
  "React",
  "TypeScript",
  "Vite",
  "Python",
  "STT · VAD",
  "FastMCP",
  "LLM (OpenRouter)",
  "Supabase",
  "Langfuse",
  "Vercel",
  "Cloud Run",
],
    links: [
      { label: "로그인 없이 체험하기", href: "/demo/malhaebom" },
      { label: "실제 서비스에서 연습", href: "https://malhaebom.xyz/app/practice" },
      { label: "서비스 소개", href: "https://malhaebom.xyz/" },
      { label: "GitHub", href: "https://github.com/kwak317/malhaebom" },
    ],
    video: {
      src: "/malhaebom/demo.mp4",
      poster: "/malhaebom/demo-poster.jpg",
      caption: "malhaebom.xyz 실제 화면으로 NCS 역량 선택부터 이력서·README 분석, 공고 추천, 질문 선택, 음성 답변 전사, AI 코칭, 재답변 비교까지 한 번의 연습 흐름을 보여줍니다. (약 2분 30초)",
    },
  },
];

export type MiniProject = {
  id: string;
  name: string;
  kind: string;
  oneLine: string;
  features: string[];
  tags: Tag[];
  app?: string;
  code: string;
};

export const miniProjects: MiniProject[] = [
  {
    id: "music-lens",
    name: "Music Lens",
    kind: "음악 장르 분류",
    oneLine: "음악 파일을 올리면 10개 장르 중 어디에 가까운지 예측하고, 그렇게 판단한 소리 특징을 함께 보여 주는 앱입니다.",
    features: [
      "librosa로 MFCC·템포·스펙트럼 등 57개 특징을 뽑고, GTZAN으로 학습한 RandomForest로 장르별 확률을 계산합니다.",
      "멜스펙트로그램, 3초 구간별 장르 변화, BPM·에너지·밝기·리듬감 레이더 차트로 예측 근거를 보여 줍니다.",
      "여러 곡을 한 번에 비교하고, 예측 이력·피드백 저장·결과 공유 링크를 지원합니다.",
    ],
    tags: [
      { name: "librosa", tone: "teal" },
      { name: "scikit-learn", tone: "amber" },
      { name: "Streamlit", tone: "rose" },
    ],
    app: "https://aimusic-aa9mzave3aebemjsfkyrtg.streamlit.app",
    code: "https://github.com/kwak317/ai_music",
  },
  {
    id: "store-dashboard",
    name: "컴퓨터 주변기기 매장 운영 대시보드",
    kind: "데이터 대시보드",
    oneLine: "컴퓨터 소모품 200개 상품 데이터로 매장 현황, 재고, 견적, 고객 추천을 한 화면에서 관리하는 운영 대시보드입니다.",
    features: [
      "매출·마진, 월별 방문 추이, 상품군별 재고를 보여 주고 재고 부족 상품은 발주 목록 CSV로 내려받을 수 있습니다.",
      "고객 니즈에 맞는 상품과 대안을 추천하고, 장바구니로 견적서를 만들며 상담 기록을 남깁니다.",
      "\"5만원 이하 마우스 찾아줘\" 같은 질문에서 검색어와 가격 조건을 뽑아 검색 도구를 실행하고, 그 과정을 그대로 보여 주는 검색 에이전트를 넣었습니다.",
    ],
    tags: [
      { name: "pandas", tone: "blue" },
      { name: "Agent", tone: "violet" },
      { name: "Streamlit", tone: "rose" },
    ],
    app: "https://streamline-fewhcwgoquxqmznnyr9yx8.streamlit.app",
    code: "https://github.com/kwak317/streamline/blob/main/apps/computer_supplies_dashboard.py",
  },
  {
    id: "dl-model-lab",
    name: "나의 딥러닝 모델 랩",
    kind: "분류 · 회귀",
    oneLine: "직접 학습한 PyTorch 모델 두 개, 손글씨 숫자 분류 CNN과 서울 자전거 대여 수요 회귀 모델을 한 앱에서 써 볼 수 있습니다.",
    features: [
      "업로드하거나 카메라로 찍은 숫자를 MNIST 형식(28×28)으로 바꿔 CNN이 숫자별 확률을 보여 줍니다.",
      "시간·기온·습도 등 9개 조건을 슬라이더로 바꾸면 대여량을 예측하고, validation MAE로 예상 오차와 시간대별 수요 곡선을 함께 보여 줍니다.",
      "촬영한 숫자가 작거나 중심에서 벗어나면 오분류가 늘어나는 한계를 확인하고 데이터 증강을 다음 실험으로 정리했습니다.",
    ],
    tags: [
      { name: "PyTorch", tone: "amber" },
      { name: "CNN", tone: "teal" },
      { name: "Streamlit", tone: "rose" },
    ],
    code: "https://github.com/kwak317/mini_project/tree/main/showcase",
  },
  {
    id: "clip-fashion",
    name: "CLIP 패션 검색",
    kind: "멀티모달 검색",
    oneLine: "원하는 스타일을 글로 적거나 사진을 올리면 비슷한 패션 아이템을 찾아 주는 멀티모달 검색 앱입니다.",
    features: [
      "CLIP(ViT-B/16)으로 패션 이미지를 임베딩해 인덱스를 만들고, 텍스트나 이미지 쿼리와의 유사도로 상위 결과를 고릅니다.",
      "글과 사진을 같은 벡터 공간에 놓기 때문에 두 가지 검색 방식을 같은 인덱스로 처리합니다.",
    ],
    tags: [
      { name: "CLIP", tone: "violet" },
      { name: "PyTorch", tone: "amber" },
      { name: "Streamlit", tone: "rose" },
    ],
    code: "https://github.com/kwak317/transformer4-assignment/tree/main/lab6_clip_multimodal_fashion_search",
  },
  {
    id: "blip-caption",
    name: "BLIP 이미지 캡셔닝",
    kind: "이미지 → 문장",
    oneLine: "사진을 올리면 BLIP이 영어 설명 문장을 만들고, 선택하면 NLLB로 한국어 번역까지 해 주는 앱입니다.",
    features: [
      "BLIP base와 large 모델을 고를 수 있고, 무료 서버 메모리를 고려해 base를 기본값으로 두었습니다.",
      "NLLB-200 번역은 선택 기능으로 분리해, 메모리가 부족해도 영어 캡션은 정상적으로 보여 주도록 했습니다.",
    ],
    tags: [
      { name: "BLIP", tone: "blue" },
      { name: "NLLB", tone: "green" },
      { name: "Transformers", tone: "violet" },
    ],
    code: "https://github.com/kwak317/transformer4-assignment/tree/main/lab9_image_captioning",
  },
];
