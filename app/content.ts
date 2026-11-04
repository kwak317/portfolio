export const EMAIL = "hojun6901@gmail.com";
export const GITHUB = "https://github.com/kwak317";

export type CaseStudy = {
  title: string;
  tag: string;
  rows: { label: string; text: string }[];
};

export const strengths: {
  title: string;
  en: string;
  claim: string;
  evidence: string[];
  story?: { label: string; steps: { label: string; text: string }[] };
  proof?: { value: string; label: string }[];
  proofNote?: string;
  cases?: { label: string; items: CaseStudy[] };
}[] = [
  {
    title: "협업 능력",
    en: "COLLABORATION",
    claim: "문제가 생기면 혼자 끝내기보다 팀원과 근거를 맞춰 함께 해결했습니다.",
    evidence: [
      "말해봄 Mk.2를 3인 팀의 팀장으로 개발해 malhaebom.xyz에 배포했고, 팀원과 PR 리뷰를 거쳐 기능을 합쳤습니다.",
    ],
    cases: {
      label: "어떤 문제를 누구와 어떻게 해결했나",
      items: [
        {
          title: "프로젝트 주제를 두고 엇갈린 의견 조율",
          tag: "팀원 2명",
          rows: [
            { label: "문제", text: "2차 프로젝트 초반, 어떤 주제로 갈지를 두고 팀원과 의견이 엇갈렸습니다." },
            { label: "해결", text: "각자의 안을 밀어붙이기보다 1차 프로젝트에서 검증한 틀을 2차 주제에 접목할 수 있는지 먼저 따져 보았고, 그 틀을 재사용하면 개발 범위와 위험을 줄일 수 있다는 근거를 팀원과 함께 검토했습니다." },
            { label: "결과", text: "충분히 상의한 끝에 합의했고, 그 결과가 말해봄 Mk.2로 이어져 지금은 실제 도메인에 배포해 운영하고 있습니다." },
          ],
        },
        {
          title: "리뷰에서 나온 빈틈을 머지 전에 고침",
          tag: "PR 리뷰 · 팀원 1명",
          rows: [
            { label: "문제", text: "제가 올린 Prompt와 Skill 분리 PR에서, 형식이 다른 템플릿 표기가 검증을 통과해 모델에게 보내는 프롬프트에 그대로 남을 수 있었습니다." },
            { label: "해결", text: "리뷰를 맡은 팀원이 이 빈틈을 짚고 이슈로 분리했습니다. 저는 후속 작업으로 미루지 않고 같은 PR에서 지원하지 않는 표기를 모두 거절하는 검증과 회귀 테스트를 추가했습니다." },
            { label: "결과", text: "수정분을 반영해 머지했고 해당 이슈도 함께 닫았습니다." },
          ],
        },
        {
          title: "팀원 PC에서만 막히던 로컬 로그인 해결",
          tag: "개발 환경 · 팀 전체",
          rows: [
            { label: "문제", text: "팀원 PC의 로컬 개발 환경에서 로그인 토큰 검증이 실패해, 로그인이 필요한 기능을 로컬에서 확인할 수 없었습니다." },
            { label: "해결", text: "컨테이너 안과 밖에서 인증 서버 주소가 다르게 보이는 점을 원인으로 찾아 설정을 고치고, 같은 문제가 다시 생기지 않도록 회귀 테스트와 작업 기록을 남겼습니다." },
            { label: "결과", text: "팀원이 변경 범위가 로컬 환경으로 제한된 것까지 확인하고 승인해 머지했고, 팀 전체가 같은 로컬 환경에서 개발할 수 있게 됐습니다." },
          ],
        },
        {
          title: "기준이 다른 팀원 평가 결과를 한 문서로 취합",
          tag: "품질 평가 · 팀원 2명",
          rows: [
            { label: "문제", text: "AI 코칭 응답 30건을 팀원 두 명이 각자 평가했는데, 한 명은 30건 전체를 채점하고 다른 한 명은 15건 채점과 15건 의견을 남겨 범위와 기준이 서로 달랐습니다." },
            { label: "해결", text: "결과를 한 문서로 모으되 범위가 다른 점수는 합산하지 않았고, AI가 쓴 초안은 사람 점수와 분리했으며, 의견이 갈린 항목은 '미합의'로 남겼습니다." },
            { label: "결과", text: "팀원이 원점수와 미확인 항목이 분명히 표시된 것을 확인하고 승인했습니다. 숫자를 부풀리지 않고 각자의 작업을 그대로 기록했습니다." },
          ],
        },
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
    ],
    story: {
      label: "왜 검증이 필요했고, 어떻게 나아졌나",
      steps: [
        {
          label: "왜",
          text: "처음 후보였던 GPT-5 mini로 평가셋 30건을 돌리자 27건에서 JSON이 중간에 끊겨, 출력 계약을 지킨 응답이 10%뿐이었습니다. 호출은 성공해도 화면에 보여 줄 수 없는 응답이 대부분이었습니다.",
        },
        {
          label: "어떻게",
          text: "strict JSON Schema로 응답 형식을 고정하고, Pydantic 검증과 답변 원문 인용 대조, 계약 실패 시 횟수를 제한한 재시도를 넣었습니다. 모델과 Prompt는 같은 30건에서 계약 준수, 판정 일치, 지연, 비용을 함께 비교해 골랐습니다.",
        },
        {
          label: "결과",
          text: "채택한 Gemini 3.5 Flash Lite는 계약 30/30, p95 4.20초였고, 운영 배포 이미지로 30건을 3회 반복한 평가에서도 계약 90/90을 지켰습니다. 비용을 13.3% 줄인 Prompt v5는 판정 일치가 떨어져 올리지 않았습니다.",
        },
      ],
    },
    proof: [
      { value: "10% → 100%", label: "출력 계약 준수 (첫 후보 → 채택 모델)" },
      { value: "90/90", label: "3회 반복 평가 계약 통과" },
      { value: "4.20초", label: "채택 모델 응답 p95" },
    ],
    proofNote: "모두 합성 평가셋 30건(정상 12 · 경계 10 · 실패 유도 8) 기준입니다.",
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
      { name: "Docker", mark: "Dk", tone: "blue", text: "Docker Compose로 API와 로컬 Supabase 인증 주소를 맞추고, CPU 재현 환경을 정리해 누구나 같은 환경에서 실행하게 했습니다." },
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
  problem?: { label: string; text: string }[];
  architecture?: { src: string; alt: string; caption: string };
  metrics?: { note: string; rows: { label: string; value: string; text: string }[] };
  troubleshooting?: { note: string; items: { title: string; problem: string; cause: string; fix: string; result: string }[] };
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
    problem: [
      { label: "누가", text: "혼자 면접을 준비하는 신입 개발자 취업준비생" },
      { label: "무엇이 어려운가", text: "내 답변의 어디가 부족한지, 무엇을 근거로 고쳐야 하는지 알려 줄 사람이 없습니다." },
      { label: "주의할 점", text: "AI에게 피드백을 받으면 답변에 없는 경험이나 선택 이유를 그럴듯하게 덧붙일 수 있어, 그대로 믿고 연습하기 어렵습니다." },
      { label: "목표", text: "답변 원문에서 확인되는 근거만 인용해 코칭하고, 다시 답한 내용과 비교해 무엇이 나아졌는지 보여 줍니다." },
    ],
    points: [
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
    text: "합성 평가셋 30건으로 모델과 Prompt를 비교하고, Langfuse로 실제 요청을 단계별로 추적합니다.",
  },
],
    architecture: {
      src: "/malhaebom/architecture.png",
      alt: "말해봄 Mk.2 시스템 구성도. React 프론트엔드(Vercel)가 Cloud Run의 FastAPI 백엔드를 호출하고, 백엔드는 음성 분석, 코칭 서비스(Prompt·Skill 조립, LLM 호출, 출력 검증과 재시도), FastMCP 조회 도구, 준비 단계로 나뉘며 OpenRouter, Supabase, 채용 데이터, Langfuse와 연결됩니다.",
      caption: "2026-10-10 운영 기준. 코칭 응답은 Prompt·Skill 조립 → LLM 호출 → 출력 검증을 거치고, 계약을 어기면 제한된 횟수만 다시 요청합니다. 이미지를 누르면 크게 볼 수 있습니다.",
    },
    metrics: {
      note: "아래 수치는 모두 합성 평가셋 30건(정상 12 · 경계 10 · 실패 유도 8)에서 모델을 직접 호출해 얻은 결과입니다. 실제 사용자 요청으로 잰 품질 점수는 아닙니다.",
      rows: [
        { label: "모델 선정", value: "계약 10% → 30/30", text: "첫 후보 GPT-5 mini는 30건 중 27건이 JSON 잘림. 22개 모델 660건 탐색과 최종 4개 동일 조건 비교 끝에 Gemini 3.5 Flash Lite 채택 (p95 4.20초, 30건 $0.107)." },
        { label: "반복 평가", value: "계약 90/90", text: "운영 배포 이미지로 30건을 3회 반복. 종합 자동 통과 57/90(63.3%), 30건 중 25건은 3회 모두 같은 판정." },
        { label: "Prompt 비교", value: "v5 보류", text: "같은 모델·30건에서 Prompt만 교체. v5는 비용 13.3% 절감에도 종합 통과 22/30 → 20/30, 판정 일치 96.7% → 89.2%로 떨어져 v4 유지." },
        { label: "사람 검토", value: "정답 1건 교정", text: "평가셋 정답 1건이 틀린 것을 사람 검토로 찾아 고친 뒤 저장된 90건을 재채점. 판정 정확도가 87.8% → 86.9%로 내려갔지만 고친 기준을 택함." },
        { label: "Langfuse 추적", value: "요청 ID 연결", text: "실제 사이트 요청의 X-Trace-Id를 Langfuse trace와 Cloud Run 로그에 같은 ID로 남겨, 요청 1건의 호출 → 출력 검증 → 분석 단계를 이어서 확인 (2026-10-09)." },
      ],
    },
    troubleshooting: {
      note: "저장소 작업 기록에 문제, 원인, 해결, 검증이 남아 있는 팀의 해결 사례입니다.",
      items: [
        {
          title: "잘린 JSON이 '제공자 장애'로 잘못 집계됨",
          problem: "평가 30건 중 1건이 실패했는데, 기록에는 모델 제공자 장애(provider_error)로 남았습니다.",
          cause: "출력 한도 2,048 tokens에서 응답이 잘려 JSON이 미완성이었습니다. 이때 난 JSON 파싱 오류가 다른 예외로 감싸지면서 분류 함수가 원인을 읽지 못했습니다.",
          fix: "시도마다 모델의 종료 사유(finish_reason)를 기록하고, 감싸진 JSON 오류도 출력 계약 위반(schema_violation)으로 분류하도록 고친 뒤 회귀 테스트 2개를 추가했습니다.",
          result: "출력 한도를 4,096으로 올려 같은 30건을 다시 돌려 계약 30/30, 정상 종료 30/30을 확인했습니다. 점수가 이상할 때 측정 도구부터 의심하게 된 계기입니다.",
        },
        {
          title: "운영에서 이력서 PDF 가져오기가 500 오류",
          problem: "운영 버전에서 이력서 PDF 가져오기 API가 HTTP 500을 반환했습니다.",
          cause: "호출하는 쪽은 개인정보 가림 여부(redact_private)를 넘기는데, PDF 추출 함수가 그 인자를 받지 않아 TypeError가 났습니다.",
          fix: "운영 이미지와 같은 환경에서 오류를 재현하는 테스트부터 만든 뒤, 함수에 가림 옵션(기본값: 가림)을 추가했습니다. 기본 분석은 개인정보를 가리고, 사용자가 동의한 가져오기에서만 원문을 유지합니다.",
          result: "관련 테스트 25개와 백엔드 전체 테스트 848개를 통과한 뒤, 트래픽 없는 후보 버전에서 검증하고 운영 트래픽을 전환했습니다.",
        },
        {
          title: "결제 한도 오류가 '연결 오류'로 표시됨",
          problem: "API 키를 바꾼 뒤 GitHub README 분석과 공고 검색이 503으로 실패했습니다. 짧은 호출은 성공했습니다.",
          cause: "출력 상한을 지정하지 않아 OpenRouter가 최대 출력 비용을 미리 예약하려다 키 한도를 넘겨 402를 반환했고, 코드는 이를 일반 연결 오류로 보여 주고 있었습니다.",
          fix: "README 분석과 검색에 기능별 출력 상한을 걸고, 402는 '크레딧·키 한도' 안내로 따로 구분했습니다. Markdown 강조 때문에 인용 대조에서 떨어지던 문제도 함께 고쳤습니다.",
          result: "백엔드 테스트 275개를 통과했고, 실제 README 분석에서 기술 8개와 흐름 4개를 정상 반환했습니다.",
        },
      ],
    },
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
    app: "https://miniprojectgit-324deds6vhyhjkm7nbrqpe.streamlit.app",
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
    app: "https://transformer4-assignment-cl2anom8nfbjwkrngbdj37.streamlit.app",
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
    app: "https://transformer4-assignment-qutw8keyfjugbue8festsj.streamlit.app",
    code: "https://github.com/kwak317/transformer4-assignment/tree/main/lab9_image_captioning",
  },
];
