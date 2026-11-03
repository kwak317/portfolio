// 말해봄 Mk.2 체험판 샘플 데이터.
// 모든 인물·회사·공고는 가상이며, AI 결과는 실서비스 응답 형식(CoachingResponse 등)을 따라 미리 저장한 값입니다.

export const APPLICANT = {
  name: "김말해",
  role: "신입 백엔드 개발자",
  note: "체험용 가상 지원자",
};

/* ---------- 샘플 자료 ---------- */

export const SAMPLE_README = `# RoomFit · 스터디룸 예약 API

대학가 스터디룸의 빈 시간을 조회하고 예약하는 백엔드 서비스입니다.
부트캠프 팀 프로젝트(4인)로 진행했고, 저는 예약 도메인과 배포를 맡았습니다.

## 기술 스택
- Python 3.12, FastAPI
- PostgreSQL 16, SQLAlchemy 2.0
- Redis (빈 시간 조회 캐시)
- Docker Compose, GitHub Actions, AWS EC2

## 주요 기능
1. 지점·날짜별 빈 시간 조회 (Redis 캐시, 5분 TTL)
2. 30분 단위 예약 생성·취소
3. 예약 중복 방지 (DB 유니크 제약 + 트랜잭션 잠금)
4. 노쇼 3회 시 예약 제한

## 트러블슈팅
- 같은 시간대에 예약이 두 건 생기는 문제 → 조회 후 저장 사이 경쟁 조건 확인,
  (room_id, slot_start) 유니크 제약과 SELECT ... FOR UPDATE 적용
- locust로 동시 요청 100건 테스트, 중복 예약 0건 확인
`;

export const SAMPLE_RESUME = {
  pages: [
    {
      page: 1,
      title: "이력서 · 김말해",
      lines: [
        "지원 직무: 백엔드 개발자 (신입)",
        "학력: 한빛대학교 정보통신공학과 졸업 (2026.02)",
        "교육: AI·백엔드 개발자 부트캠프 수료 (2026.03 ~ 2026.09, 960시간)",
        "자격증: 정보처리기사 (2026.06), SQLD (2025.12)",
        "어학: TOEIC 845 (2026.01)",
      ],
    },
    {
      page: 2,
      title: "프로젝트",
      lines: [
        "RoomFit · 스터디룸 예약 API (2026.07 ~ 2026.08, 4인)",
        " - FastAPI·PostgreSQL로 예약 생성·취소 API 구현",
        " - 동시 예약 시 중복이 생기는 문제를 유니크 제약과 행 잠금으로 해결",
        " - Docker Compose와 GitHub Actions로 EC2 자동 배포 구성",
        "사용 기술: Python, FastAPI, PostgreSQL, Redis, Docker, Git",
        "인턴: (주)가상소프트 QA 인턴 3개월 (2025.07 ~ 2025.09)",
      ],
    },
  ],
};

/* ---------- 1. NCS 역량 자기점검 ---------- */

export type NcsOption = { id: string; category: "knowledge" | "skill" | "attitude"; label: string; unit: string };

export const NCS_JOB = "응용SW엔지니어링 (정보기술개발)";

export const NCS_OPTIONS: NcsOption[] = [
  { id: "ncs-k1", category: "knowledge", label: "HTTP·REST API 설계 원칙을 설명할 수 있다", unit: "인터페이스 구현" },
  { id: "ncs-k2", category: "knowledge", label: "트랜잭션과 동시성 제어 개념을 이해한다", unit: "데이터 입출력 구현" },
  { id: "ncs-k3", category: "knowledge", label: "SQL 조인·인덱스의 동작을 이해한다", unit: "SQL 활용" },
  { id: "ncs-s1", category: "skill", label: "서버 프로그램을 요구사항에 맞게 구현할 수 있다", unit: "서버 프로그램 구현" },
  { id: "ncs-s2", category: "skill", label: "테스트 케이스를 작성하고 결과를 확인할 수 있다", unit: "애플리케이션 테스트 관리" },
  { id: "ncs-s3", category: "skill", label: "컨테이너로 애플리케이션을 배포할 수 있다", unit: "애플리케이션 배포" },
  { id: "ncs-a1", category: "attitude", label: "문제의 원인을 로그와 데이터로 확인하려는 태도", unit: "통합 구현" },
  { id: "ncs-a2", category: "attitude", label: "팀원과 작업 범위를 공유하고 조율하는 태도", unit: "요구사항 확인" },
];

export const NCS_SUGGESTED = ["ncs-k2", "ncs-s1", "ncs-s2", "ncs-a1"];

/* ---------- 2. README·이력서 분석 ---------- */

export const README_ANALYSIS = {
  source_url: "https://github.com/demo-malhae/roomfit (가상)",
  technology_stack: [
    { name: "FastAPI", description: "예약·조회 API 서버", source_excerpt: "Python 3.12, FastAPI" },
    { name: "PostgreSQL", description: "예약 데이터 저장, 유니크 제약", source_excerpt: "PostgreSQL 16, SQLAlchemy 2.0" },
    { name: "Redis", description: "빈 시간 조회 캐시", source_excerpt: "Redis (빈 시간 조회 캐시)" },
    { name: "Docker · GitHub Actions", description: "EC2 자동 배포", source_excerpt: "Docker Compose, GitHub Actions, AWS EC2" },
  ],
  project_flow: [
    { description: "동시 예약 시 중복 생성 문제를 유니크 제약과 행 잠금으로 해결", source_excerpt: "(room_id, slot_start) 유니크 제약과 SELECT ... FOR UPDATE 적용" },
    { description: "부하 테스트로 중복 예약이 사라졌는지 확인", source_excerpt: "locust로 동시 요청 100건 테스트, 중복 예약 0건 확인" },
    { description: "예약 도메인과 배포 담당", source_excerpt: "저는 예약 도메인과 배포를 맡았습니다." },
  ],
};

export const RESUME_CATEGORY_LABEL: Record<string, string> = {
  role: "지원 직무",
  career: "경력·인턴",
  technology: "사용 기술",
  project: "프로젝트 경험",
  education: "교육·졸업 상태",
  qualification: "자격증·어학",
};

export const RESUME_FACTS = [
  { id: "f1", category: "role", value: "백엔드 개발자 (신입)", page: 1, source_excerpt: "지원 직무: 백엔드 개발자 (신입)" },
  { id: "f2", category: "education", value: "정보통신공학과 졸업 (2026.02)", page: 1, source_excerpt: "한빛대학교 정보통신공학과 졸업 (2026.02)" },
  { id: "f3", category: "education", value: "AI·백엔드 부트캠프 수료 (960시간)", page: 1, source_excerpt: "AI·백엔드 개발자 부트캠프 수료 (2026.03 ~ 2026.09, 960시간)" },
  { id: "f4", category: "qualification", value: "정보처리기사, SQLD, TOEIC 845", page: 1, source_excerpt: "정보처리기사 (2026.06), SQLD (2025.12)" },
  { id: "f5", category: "project", value: "RoomFit 스터디룸 예약 API (4인)", page: 2, source_excerpt: "RoomFit · 스터디룸 예약 API (2026.07 ~ 2026.08, 4인)" },
  { id: "f6", category: "technology", value: "Python, FastAPI, PostgreSQL, Redis, Docker", page: 2, source_excerpt: "사용 기술: Python, FastAPI, PostgreSQL, Redis, Docker, Git" },
  { id: "f7", category: "career", value: "QA 인턴 3개월", page: 2, source_excerpt: "(주)가상소프트 QA 인턴 3개월 (2025.07 ~ 2025.09)" },
];

/* ---------- 3. 공고 추천·요구사항 ---------- */

export type DemoJob = {
  id: string;
  company: string;
  title: string;
  deadline: string;
  experience: string;
  matched_technologies: string[];
  matched_project_flows: string[];
  matched_ncs_labels: string[];
  source_excerpt: string;
  posting: string;
  requirements: { id: string; code: string; text: string; source_excerpt: string }[];
};

export const JOBS: DemoJob[] = [
  {
    id: "job-1",
    company: "(가상) 하늘물류",
    title: "백엔드 개발자 신입 채용 (Python)",
    deadline: "2026-11-30",
    experience: "신입",
    matched_technologies: ["FastAPI", "PostgreSQL", "Docker"],
    matched_project_flows: ["동시 예약 중복 문제 해결", "부하 테스트로 결과 확인"],
    matched_ncs_labels: ["트랜잭션과 동시성 제어", "테스트 케이스 작성"],
    source_excerpt: "주문·배차 API의 동시성 이슈를 다뤄본 경험이 있으면 좋습니다.",
    posting: `[하늘물류] 백엔드 개발자 신입 채용 (가상 공고)

담당 업무
- 주문·배차 API 개발 및 운영
- PostgreSQL 기반 데이터 모델 설계

자격 요건
- Python 웹 프레임워크(FastAPI, Django 등)로 API를 구현해 본 분
- 관계형 DB와 트랜잭션에 대한 이해가 있는 분
- 테스트를 작성하고 결과를 근거로 설명할 수 있는 분

우대 사항
- 주문·배차 API의 동시성 이슈를 다뤄본 경험이 있으면 좋습니다.
- Docker 기반 배포 경험`,
    requirements: [
      { id: "req-1", code: "R1", text: "Python 웹 프레임워크로 API 구현 경험", source_excerpt: "Python 웹 프레임워크(FastAPI, Django 등)로 API를 구현해 본 분" },
      { id: "req-2", code: "R2", text: "관계형 DB와 트랜잭션 이해", source_excerpt: "관계형 DB와 트랜잭션에 대한 이해가 있는 분" },
      { id: "req-3", code: "R3", text: "테스트 결과를 근거로 설명하는 능력", source_excerpt: "테스트를 작성하고 결과를 근거로 설명할 수 있는 분" },
      { id: "req-4", code: "P1", text: "동시성 이슈 해결 경험 (우대)", source_excerpt: "주문·배차 API의 동시성 이슈를 다뤄본 경험이 있으면 좋습니다." },
      { id: "req-5", code: "P2", text: "Docker 기반 배포 경험 (우대)", source_excerpt: "Docker 기반 배포 경험" },
    ],
  },
  {
    id: "job-2",
    company: "(가상) 온길헬스케어",
    title: "서버 개발 주니어 (예약·결제 도메인)",
    deadline: "2026-12-12",
    experience: "신입·경력 2년 이하",
    matched_technologies: ["PostgreSQL", "Redis"],
    matched_project_flows: ["예약 도메인 담당"],
    matched_ncs_labels: ["서버 프로그램 구현"],
    source_excerpt: "병원 예약 시스템의 조회 성능 개선과 캐시 설계에 참여합니다.",
    posting: `[온길헬스케어] 서버 개발 주니어 (가상 공고)

- 병원 예약 시스템의 조회 성능 개선과 캐시 설계에 참여합니다.
- 자격: 백엔드 프레임워크 1개 이상 사용 경험, SQL 활용 능력
- 우대: Redis 캐시 운영 경험`,
    requirements: [
      { id: "req-6", code: "R1", text: "백엔드 프레임워크 사용 경험", source_excerpt: "백엔드 프레임워크 1개 이상 사용 경험" },
      { id: "req-7", code: "R2", text: "SQL 활용 능력", source_excerpt: "SQL 활용 능력" },
      { id: "req-8", code: "P1", text: "Redis 캐시 운영 경험 (우대)", source_excerpt: "Redis 캐시 운영 경험" },
    ],
  },
  {
    id: "job-3",
    company: "(가상) 모아페이",
    title: "Python 백엔드 엔지니어 (신입)",
    deadline: "상시",
    experience: "신입",
    matched_technologies: ["Python", "FastAPI"],
    matched_project_flows: [],
    matched_ncs_labels: ["HTTP·REST API 설계"],
    source_excerpt: "정산 배치와 REST API를 Python으로 개발합니다.",
    posting: `[모아페이] Python 백엔드 엔지니어 (가상 공고)

- 정산 배치와 REST API를 Python으로 개발합니다.
- 자격: Python, REST API 설계 이해
- 우대: 금융 도메인 관심`,
    requirements: [
      { id: "req-9", code: "R1", text: "Python 개발 능력", source_excerpt: "Python" },
      { id: "req-10", code: "R2", text: "REST API 설계 이해", source_excerpt: "REST API 설계 이해" },
    ],
  },
];

/* ---------- 4. 질문 ---------- */

export const PRESET_QUESTIONS = [
  { id: "preset-01", text: "자기소개를 해주세요." },
  { id: "preset-02", text: "지원한 이유를 말씀해주세요." },
  { id: "preset-03", text: "본인의 장점을 말씀해주세요." },
  { id: "preset-04", text: "프로젝트 개발 중 발생한 문제를 어떻게 해결했나요?" },
  { id: "preset-05", text: "협업 중 갈등을 해결했던 경험을 말씀해주세요." },
  { id: "preset-06", text: "실패 경험과 배운 점을 말씀해주세요." },
  { id: "preset-07", text: "가장 기억에 남는 프로젝트를 소개해주세요." },
  { id: "preset-08", text: "본인이 맡았던 역할을 설명해주세요." },
  { id: "preset-09", text: "입사 후 어떤 개발자가 되고 싶은가요?" },
  { id: "preset-10", text: "마지막으로 하고 싶은 말을 말씀해주세요." },
];

export const DEMO_QUESTION_ID = "preset-04";

/* ---------- 5. 답변·STT ---------- */

// 샘플 답변 음성의 대본 (브라우저 음성 합성으로 들려줍니다)
export const SAMPLE_ANSWER_SCRIPT =
  "스터디룸 예약 프로젝트에서 같은 시간대에 예약이 두 건씩 생기는 문제가 있었습니다. 운영 로그를 보니까 거의 같은 시각에 들어온 요청 두 개가 둘 다 성공으로 처리돼 있었습니다. 그래서 저는 예약 테이블에 방 번호랑 시작 시간으로 유니크 제약을 걸고, 예약 저장할 때 행 잠금을 적용했습니다. 그 뒤로는 중복 예약 문의가 거의 안 들어왔습니다.";

// STT 원문 (오인식 포함)
export const STT_SEGMENTS = [
  { id: "s1", text: "스터디룸 예약 프로젝트에서 같은 시간대에 예약이 두 건씩 생기는 문제가 있었습니다.", start: 0.0 },
  { id: "s2", text: "운영 로그를 보니까 거의 같은 시각에 들어온 요청 두 개가 둘 다 성공으로 처리돼 있었습니다.", start: 5.2 },
  { id: "s3", text: "그래서 저는 예약 테이블에 방 번호랑 시작 시간으로 유니크 제약을 걸고, 예약 저장할 때 행 짐금을 적용했습니다.", start: 11.6 },
  { id: "s4", text: "그 뒤로는 중복 예약 문의가 거의 안 들어왔습니다.", start: 19.4 },
];

// STT 오인식 교정 제안
export const STT_FIXES = [{ segment: "s3", from: "행 짐금", to: "행 잠금" }];

// 표준어·문어체 변환 결과
export const NORMALIZED_SEGMENTS: Record<string, string> = {
  s2: "운영 로그를 보니 거의 같은 시각에 들어온 요청 두 개가 모두 성공으로 처리되어 있었습니다.",
  s3: "그래서 저는 예약 테이블에 방 번호와 시작 시간으로 유니크 제약을 걸고, 예약을 저장할 때 행 잠금을 적용했습니다.",
};

export const DELIVERY = [
  { id: "cpm", label: "말하기 속도", value: "312 CPM", note: "적정 범위 (280~350)" },
  { id: "long_silence_count", label: "긴 침묵 (2초 이상)", value: "1회", note: "11초 지점" },
  { id: "repetition_count", label: "반복 표현", value: "0회", note: "" },
];

/* ---------- 6. 코칭 결과 (CoachingResponse 형식) ---------- */

export const CRITERION_LABELS: Record<string, string> = {
  problem_context: "문제 상황",
  cause_observation: "원인 관찰 신호",
  cause_inference: "원인 추론 연결",
  own_action: "본인이 한 행동",
  action_rationale: "행동 선택 이유",
  result_verification: "결과 확인",
};

export const ASSESSMENT_LABELS: Record<string, string> = {
  met: "충족",
  partial: "일부 충족",
  not_observed: "확인되지 않음",
  undetermined: "판단 보류",
  related: "관련 있음",
  insufficient_evidence: "근거 부족",
};

export type Coaching = {
  status: "ok" | "needs_more_info";
  intent_assessment: { label: string; reason: string };
  job_alignment: { requirement_id: string; label: string; reason: string }[];
  criterion_assessments: { criterion_id: string; assessment: string; reason: string; needed: string | null }[];
  evidence: { source_id: string; segment_id: string; quote: string; reason: string }[];
  gaps: { criterion_id: string; needed: string }[];
  clarifying_question: string | null;
  next_actions: string[];
  example_answer: string | null;
};

export const COACHING_1: Coaching = {
  status: "needs_more_info",
  intent_assessment: {
    label: "aligned",
    reason: "질문이 요구한 '문제와 해결 과정'에 맞게 중복 예약 문제와 본인이 한 조치를 말했습니다. 다만 원인을 어떻게 판단했는지와 해결을 어떻게 확인했는지가 약합니다.",
  },
  job_alignment: [
    { requirement_id: "req-2", label: "related", reason: "유니크 제약과 행 잠금은 트랜잭션·동시성 이해를 보여 줍니다." },
    { requirement_id: "req-3", label: "insufficient_evidence", reason: "답변에는 테스트로 확인한 결과가 나오지 않습니다." },
    { requirement_id: "req-4", label: "related", reason: "동시 요청으로 생긴 중복 예약 문제를 직접 다뤘습니다." },
  ],
  criterion_assessments: [
    { criterion_id: "problem_context", assessment: "met", reason: "대상(스터디룸 예약)과 증상(같은 시간대 두 건)이 분명합니다.", needed: null },
    { criterion_id: "cause_observation", assessment: "met", reason: "운영 로그에서 거의 같은 시각의 요청 두 개가 모두 성공한 것을 관찰했습니다.", needed: null },
    { criterion_id: "cause_inference", assessment: "partial", reason: "관찰은 있지만 '조회 후 저장 사이의 경쟁 조건'이라는 원인 판단이 말로 연결되지 않았습니다.", needed: "관찰한 로그가 왜 경쟁 조건을 뜻하는지 한 문장으로 연결하세요." },
    { criterion_id: "own_action", assessment: "met", reason: "'저는'으로 본인이 유니크 제약과 행 잠금을 적용했다고 말했습니다.", needed: null },
    { criterion_id: "action_rationale", assessment: "not_observed", reason: "두 방법을 함께 쓴 이유나 다른 방법 대신 고른 이유가 없습니다.", needed: "왜 애플리케이션 검사만이 아니라 DB 제약과 잠금을 골랐는지 설명하세요." },
    { criterion_id: "result_verification", assessment: "partial", reason: "'문의가 거의 안 들어왔다'는 간접 신호뿐이고, 직접 확인한 방법이 없습니다.", needed: "수정 후 실제로 확인한 방법과 결과를 말하세요. 하지 않았다면 하지 않았다고 말해도 됩니다." },
  ],
  evidence: [
    { source_id: "problem_context", segment_id: "s1", quote: "같은 시간대에 예약이 두 건씩 생기는 문제", reason: "문제 대상과 증상" },
    { source_id: "cause_observation", segment_id: "s2", quote: "거의 같은 시각에 들어온 요청 두 개가 모두 성공으로 처리되어", reason: "로그로 관찰한 신호" },
    { source_id: "own_action", segment_id: "s3", quote: "저는 예약 테이블에 방 번호와 시작 시간으로 유니크 제약을 걸고", reason: "본인이 한 조치" },
    { source_id: "result_verification", segment_id: "s4", quote: "중복 예약 문의가 거의 안 들어왔습니다", reason: "간접적인 결과 신호" },
  ],
  gaps: [
    { criterion_id: "cause_inference", needed: "로그 관찰 → 경쟁 조건이라는 판단을 연결하기" },
    { criterion_id: "action_rationale", needed: "DB 제약과 행 잠금을 고른 이유" },
    { criterion_id: "result_verification", needed: "수정 후 직접 확인한 방법과 수치" },
  ],
  clarifying_question: "수정한 뒤 중복 예약이 사라졌는지 직접 확인해 본 방법이 있었나요? 예를 들어 테스트나 로그 확인처럼요.",
  next_actions: [
    "로그에서 본 현상이 '조회 후 저장 사이의 경쟁 조건' 때문이라고 판단한 과정을 한 문장 추가하세요.",
    "유니크 제약과 행 잠금을 함께 쓴 이유를 말하세요.",
    "수정 후 확인한 방법(테스트·로그)과 결과를 사실대로 말하세요.",
  ],
  example_answer:
    "스터디룸 예약 API에서 같은 시간대에 예약이 두 건씩 생기는 문제가 있었습니다. 운영 로그를 보니 거의 같은 시각에 들어온 요청 두 개가 모두 성공으로 처리되어 있었고, 저는 빈 시간을 조회한 뒤 저장하기 전 사이에 다른 요청이 끼어드는 경쟁 조건이 원인이라고 판단했습니다. [확인한 근거가 있다면 추가] 그래서 예약 테이블에 방 번호와 시작 시간으로 유니크 제약을 걸고, 저장할 때 행 잠금을 적용했습니다. [두 방법을 고른 이유] 수정 후에는 [직접 확인한 방법과 결과]를 확인했습니다.",
};

/* ---------- 자유채팅 (준비된 질문과 답) ---------- */

export const FREE_CHAT = [
  {
    q: "행 잠금 말고 낙관적 락을 쓰면 안 되나요?",
    a: "쓸 수 있어요. 다만 지금 답변에서는 왜 행 잠금을 골랐는지가 빠져 있어서, 면접관이 이 질문을 할 가능성이 높아요. 예약은 같은 슬롯에 충돌이 몰리는 경우가 많아 재시도가 잦은 낙관적 락보다 행 잠금이 단순했다는 식으로, 실제로 고민한 이유가 있다면 그대로 말해 보세요.",
  },
  {
    q: "사실 locust로 100건 동시 요청 테스트를 했어요.",
    a: "좋은 근거예요. 'locust로 동시 요청 100건을 보내 중복 예약 0건을 확인했다'는 결과 확인 기준을 직접 채워 줍니다. 이 경험을 다음 답변 근거로 반영할까요?",
    consent: true,
  },
  {
    q: "답변이 너무 길지는 않나요?",
    a: "현재 약 25초로 짧은 편이에요. 원인 판단과 확인 결과를 각각 한 문장씩 더해도 40초 안쪽이라 적당합니다.",
  },
];

/* ---------- 7. 재답변·비교 ---------- */

export const RETRY_SEGMENTS = [
  { id: "r1", text: "스터디룸 예약 API에서 같은 시간대에 예약이 두 건씩 생기는 문제가 있었습니다." },
  { id: "r2", text: "운영 로그를 보니 거의 같은 시각의 요청 두 개가 모두 성공으로 처리되어 있었고, 빈 시간을 조회한 뒤 저장하기 전 사이에 다른 요청이 끼어드는 경쟁 조건이라고 판단했습니다." },
  { id: "r3", text: "애플리케이션에서 한 번 더 확인하는 방식은 같은 문제가 반복될 수 있어서, 저는 DB에서 확실히 막도록 방 번호와 시작 시간에 유니크 제약을 걸고 저장 시 행 잠금을 적용했습니다." },
  { id: "r4", text: "수정 후 locust로 같은 슬롯에 동시 요청 100건을 보내 중복 예약이 0건인 것을 확인했습니다." },
];

export const COMPARISON = [
  { criterion_id: "problem_context", before: "met", after: "met", change: "unchanged" },
  { criterion_id: "cause_observation", before: "met", after: "met", change: "unchanged" },
  { criterion_id: "cause_inference", before: "partial", after: "met", change: "added", quote: "경쟁 조건이라고 판단했습니다" },
  { criterion_id: "own_action", before: "met", after: "met", change: "unchanged" },
  { criterion_id: "action_rationale", before: "not_observed", after: "met", change: "added", quote: "같은 문제가 반복될 수 있어서, 저는 DB에서 확실히 막도록" },
  { criterion_id: "result_verification", before: "partial", after: "met", change: "added", quote: "동시 요청 100건을 보내 중복 예약이 0건" },
];

export const METRIC_CHANGES = [
  { label: "답변 길이", before: "약 25초", after: "약 38초" },
  { label: "말하기 속도", before: "312 CPM", after: "305 CPM" },
  { label: "긴 침묵", before: "1회", after: "0회" },
];

export const FOLLOW_UPS = [
  {
    q: "유니크 제약만으로도 중복은 막히는데, 행 잠금까지 쓴 이유가 있나요?",
    hint: "답변 근거: '저장 시 행 잠금을 적용했습니다'",
    sample: "유니크 제약만 있으면 두 번째 요청이 DB 오류로 실패해서 사용자에게 서버 오류처럼 보였습니다. 잠금으로 순서를 정해 두 번째 요청에는 '이미 예약된 시간'이라는 안내를 주려고 함께 적용했습니다.",
    feedback: "선택 이유와 사용자 영향이 함께 드러나 좋습니다. 실제로 확인한 오류 응답 예시가 있다면 한 가지 덧붙여 보세요.",
  },
  {
    q: "트래픽이 열 배로 늘면 이 방식에 어떤 문제가 생길 수 있을까요?",
    hint: "답변 근거: '동시 요청 100건'",
    sample: "같은 슬롯에 요청이 몰리면 잠금 대기가 길어질 수 있습니다. 그 경우 대기 시간 지표를 먼저 확인하고, 필요하면 예약 요청을 큐로 받는 방식을 검토하겠습니다.",
    feedback: "확인하지 않은 일을 해본 것처럼 말하지 않고 '검토하겠다'로 구분한 점이 좋습니다.",
  },
];

export const INTERVIEW_SUMMARY = {
  clarified_points: ["경쟁 조건이라는 원인 판단", "DB 제약·행 잠금 선택 이유", "locust 100건 테스트로 결과 확인"],
  next_practice: ["행 잠금 대기 시간처럼 운영 지표를 함께 말하기", "'가장 기억에 남는 프로젝트' 질문으로 같은 경험 다르게 말해 보기"],
};

/* ---------- 8. 이력서 초안 ---------- */

export const RESUME_DRAFT = {
  headline: "동시성 문제를 데이터로 확인하고 끝까지 검증하는 신입 백엔드 개발자",
  summary:
    "FastAPI·PostgreSQL로 예약 API를 만들며 동시 요청으로 생긴 중복 예약 문제를 로그로 원인을 좁히고, DB 제약과 행 잠금으로 해결한 뒤 부하 테스트로 확인했습니다.",
  project: {
    name: "RoomFit · 스터디룸 예약 API (2026.07 ~ 2026.08, 4인)",
    bullets: [
      "FastAPI·PostgreSQL 기반 예약 생성·취소 API 구현 (예약 도메인 담당)",
      "동시 요청 시 중복 예약 발생 → 경쟁 조건으로 원인 판단, (room_id, slot_start) 유니크 제약과 행 잠금 적용",
      "locust 동시 요청 100건 테스트로 중복 예약 0건 확인",
      "Docker Compose·GitHub Actions로 EC2 자동 배포 구성",
    ],
  },
  skills: "Python, FastAPI, PostgreSQL, Redis, Docker, GitHub Actions",
  education: ["한빛대학교 정보통신공학과 졸업 (2026.02)", "AI·백엔드 개발자 부트캠프 수료 (960시간)"],
  qualification: ["정보처리기사, SQLD", "TOEIC 845"],
};

export const POLISH = {
  before: "예약 기능에서 버그가 있어서 고쳤고 잘 되게 만들었습니다.",
  after: "동시 요청 시 발생한 중복 예약을 유니크 제약과 행 잠금으로 해결하고, 동시 요청 100건 테스트로 중복 0건을 확인했습니다.",
  source: "재답변 r3·r4 문장과 README 트러블슈팅 항목",
};
