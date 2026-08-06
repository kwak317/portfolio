"use client";

import Image from "next/image";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  X,
  Code2,
  Database,
  Mail,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { useState } from "react";

const projectLinks = [
  {
    label: "프론트엔드 README",
    href: "https://github.com/5Headers/team_project_frontend/blob/main/README.md",
  },
  {
    label: "백엔드 README",
    href: "https://github.com/5Headers/team_project_backend/blob/main/README.md",
  },
];

const keywords = [
  {
    title: "AI 서비스 빌더",
    description:
      "AI를 단순히 사용하는 사람이 아니라, AI를 개발 과정과 연결해 실제 서비스 형태로 구현하는 방향을 의미합니다.",
    detail:
      "포트폴리오에서는 컴퓨터 견적 사이트 제작 경험과 AI 활용 관점을 통해 아이디어를 결과물로 만드는 역량을 보여줍니다.",
  },
  {
    title: "업무 효율화",
    description:
      "AI를 멋있게 쓰는 것보다, 반복되거나 복잡한 과정을 더 빠르고 편하게 만드는 데 초점을 둡니다.",
    detail:
      "사용자의 선택 과정을 줄이고, 필요한 정보를 더 쉽게 찾게 만드는 방식으로 AI 활용 가치를 설명합니다.",
  },
  {
    title: "문제 해결",
    description:
      "기술을 먼저 앞세우기보다 사용자가 겪는 불편함을 정의하고, 해결 가능한 서비스 구조로 바꾸는 관점입니다.",
    detail:
      "문제 정의, AI 활용 방식, 구현 과정을 나눠 보여주며 실무형 사고 흐름을 강조합니다.",
  },
  {
    title: "서비스 구현",
    description:
      "아이디어를 설명하는 데서 끝내지 않고, 웹개발 기술을 활용해 실제 화면과 기능이 있는 결과물로 만듭니다.",
    detail:
      "Java, JavaScript, Python, SQL 등 학습한 기술을 서비스 제작 과정과 연결해 보여줍니다.",
  },
];

const skills = [
  {
    name: "Java",
    description: "웹 서비스의 기본 구조와 서버 로직을 이해하고 구현합니다.",
  },
  {
    name: "JavaScript",
    description: "화면 흐름과 사용자 인터랙션을 설계하고 구현합니다.",
  },
  {
    name: "Python",
    description: "AI 도구 활용, 데이터 처리, 자동화 흐름을 실험합니다.",
  },
  {
    name: "SQL",
    description: "서비스에 필요한 데이터를 구조화하고 조회합니다.",
  },
];

const strengths = [
  "AI를 무작정 쓰기보다, 어디에 적용해야 효율이 나는지 판단합니다.",
  "사용자의 불편함을 먼저 보고, 해결 가능한 서비스 구조로 정리합니다.",
  "아이디어를 말에서 끝내지 않고 작동하는 결과물로 구현합니다.",
];

const projectSteps = [
  {
    label: "문제",
    text: "사용자가 목적에 맞는 컴퓨터 견적을 직접 비교하고 고르는 과정이 복잡했습니다.",
  },
  {
    label: "AI 활용",
    text: "AI를 활용해 용도와 조건에 맞는 견적 선택 과정을 더 쉽게 만드는 방향을 설계했습니다.",
  },
  {
    label: "구현",
    text: "학원 웹개발 과정에서 익힌 기술을 바탕으로 웹 서비스 형태의 결과물을 제작했습니다.",
  },
];

export default function Home() {
  const [activeModal, setActiveModal] = useState<
    "about" | "project" | "contact" | "keyword" | null
  >(null);
  const [activeKeyword, setActiveKeyword] = useState<(typeof keywords)[number] | null>(
    null,
  );

  const openKeywordModal = (keyword: (typeof keywords)[number]) => {
    setActiveKeyword(keyword);
    setActiveModal("keyword");
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveKeyword(null);
  };

  return (
    <main>
      <nav className="topbar" aria-label="주요 메뉴">
        <a className="brand" href="#home" aria-label="홈으로 이동">
          <BrainCircuit size={22} />
          <span>kwak hojun</span>
        </a>
        <div className="nav-links">
          <button type="button" onClick={() => setActiveModal("about")}>
            소개
          </button>
          <button type="button" onClick={() => setActiveModal("project")}>
            프로젝트
          </button>
          <button type="button" onClick={() => setActiveModal("contact")}>
            연락
          </button>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            <Sparkles size={16} />
            AI Service Builder
          </p>
          <h1>
            <span>AI를 효율적으로 활용해</span>
            <span>실제 작동하는</span>
            <span>서비스를 만듭니다</span>
          </h1>
          <p className="hero-copy">
            곽호준은 AI에 의존하기보다, AI를 문제 해결과 업무 효율화에 연결하는
            AI 서비스 빌더입니다.
          </p>
          <div className="hero-actions">
            <button
              className="button primary"
              type="button"
              onClick={() => setActiveModal("project")}
            >
              프로젝트 보기
              <ArrowRight size={18} />
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={() => setActiveModal("contact")}
            >
              연락하기
            </button>
          </div>
        </div>
        <div className="hero-preview" aria-label="AI 포트폴리오 미리보기">
          <Image
            src="/hero-ai-portfolio.png"
            alt="AI 서비스 개발 작업 공간"
            width={1100}
            height={620}
            priority
          />
        </div>
      </section>

      <section className="keyword-band" aria-label="핵심 키워드">
        {keywords.map((keyword) => (
          <button
            key={keyword.title}
            type="button"
            onClick={() => openKeywordModal(keyword)}
          >
            {keyword.title}
          </button>
        ))}
      </section>

      <section id="about" className="section intro-section">
        <div className="section-copy">
          <p className="section-label">About</p>
          <h2>아이디어를 실제 서비스로 바꾸는 과정에 집중합니다.</h2>
          <p>
            사용자의 불편함과 업무 비효율을 발견하고, AI 도구와 개발 기술을
            연결해 더 편리한 해결책을 만드는 사람입니다.
          </p>
        </div>
        <div className="intro-card">
          <Target size={28} />
          <h3>회사에서 만났을 때 무엇이든 믿고 맡길 수 있는 사람</h3>
          <p>
            새로운 도구를 빠르게 익히고, 실제 업무에 적용할 수 있는 사람으로
            기억되고 싶습니다.
          </p>
        </div>
      </section>

      <section className="section skills-section">
        <div className="section-copy centered">
          <p className="section-label">Skills</p>
          <h2>기술은 나열보다, 무엇을 만들 수 있는지가 중요하다고 생각합니다.</h2>
        </div>
        <div className="skill-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={skill.name}>
              <Code2 size={22} />
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="project" className="section project-section">
        <div className="section-copy">
          <p className="section-label">Featured Project</p>
          <h2>AI를 이용한 컴퓨터 견적 사이트</h2>
          <p>
            학원에서 웹개발 과정을 진행하며 제작한 프로젝트입니다. 사용자의
            목적에 맞는 컴퓨터 견적을 더 쉽게 찾을 수 있도록 AI 활용 방식을
            고민했습니다.
          </p>
          <div className="project-links" aria-label="프로젝트 README 링크">
            {projectLinks.map((link) => (
              <a
                key={link.href}
                className="button secondary"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <ArrowRight size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <Database size={28} />
            <span>Web Development Course Project</span>
          </div>
          <div className="project-steps">
            {projectSteps.map((step) => (
              <article key={step.label}>
                <strong>{step.label}</strong>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section project-section store-project-section">
        <div className="section-copy">
          <p className="section-label">Personal Project</p>
          <h2>컴퓨터 주변기기 매장 운영 사이트</h2>
          <p>
            컴퓨터 주변기기 매장의 상품과 운영 정보를 한눈에 확인하고 효율적으로
            관리할 수 있도록 제작한 웹 서비스입니다. Streamlit과 Pandas를 활용해
            실제 매장 업무에 필요한 정보를 직관적으로 구성했습니다.
          </p>
          <div
            className="project-links"
            aria-label="컴퓨터 주변기기 매장 프로젝트 링크"
          >
            <a
              className="button primary"
              href="https://streamline-fewhcwgoquxqmznnyr9yx8.streamlit.app"
              target="_blank"
              rel="noreferrer"
            >
              서비스 직접 체험하기
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <Database size={28} />
            <span>Computer Store Management Project</span>
          </div>
          <div className="project-steps">
            <article>
              <strong>상품 관리</strong>
              <p>
                컴퓨터 주변기기 상품 정보를 정리하고 필요한 항목을 빠르게 확인할
                수 있도록 구성했습니다.
              </p>
            </article>
            <article>
              <strong>매장 운영</strong>
              <p>
                매장 운영에 필요한 데이터를 한 화면에서 확인할 수 있어 반복적인
                관리 업무를 줄여줍니다.
              </p>
            </article>
            <article>
              <strong>데이터 확인</strong>
              <p>
                상품과 운영 현황을 이해하기 쉬운 형태로 보여주어 빠른 판단을
                돕습니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section project-section store-project-section">
        <div className="section-copy">
          <p className="section-label">AI Model Showcase</p>
          <h2>이미지 분류와 자전거 수요 예측</h2>
          <p>
            PyTorch로 학습한 MNIST 이미지 분류 CNN과 서울 자전거 수요 회귀
            모델을 하나의 Streamlit 쇼케이스로 구성했습니다. 숫자 이미지의 예측
            결과와 날씨·시간 조건에 따른 시간당 자전거 대여량을 직접 확인할 수
            있습니다.
          </p>
          <div
            className="project-links"
            aria-label="딥러닝 모델 쇼케이스 프로젝트 링크"
          >
            <a
              className="button primary"
              href="https://miniprojectgit-324deds6vhyhjkm7nbrqpe.streamlit.app/회귀_자전거"
              target="_blank"
              rel="noreferrer"
            >
              자전거 수요 예측 체험하기
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <BrainCircuit size={28} />
            <span>Deep Learning Model Showcase</span>
          </div>
          <div className="project-steps">
            <article>
              <strong>이미지 분류</strong>
              <p>
                28×28 숫자 이미지를 CNN으로 분석해 0부터 9까지의 예측 확률과
                신뢰도를 보여줍니다.
              </p>
            </article>
            <article>
              <strong>수요 회귀</strong>
              <p>
                시간과 날씨 조건을 입력하면 학습한 회귀 모델이 예상 자전거
                대여량을 계산합니다.
              </p>
            </article>
            <article>
              <strong>결과 시각화</strong>
              <p>
                시간대별 수요 곡선과 조건 민감도 그래프로 예측 결과의 변화를
                직관적으로 확인할 수 있습니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section project-section store-project-section">
        <div className="section-copy">
          <p className="section-label">AI Music Analysis</p>
          <h2>Music Lens · 음악 장르 예측기</h2>
          <p>
            오디오 파일의 리듬·음색·주파수 특징을 분석해 장르와 신뢰도를
            예측하는 AI 음악 분석 서비스입니다. 여러 곡의 분석 결과를 비교하고,
            BPM·에너지·스펙트럼 정보를 시각적으로 확인할 수 있습니다.
          </p>
          <div className="project-links" aria-label="Music Lens 프로젝트 링크">
            <a
              className="button primary"
              href="https://aimusic-aa9mzave3aebemjsfkyrtg.streamlit.app"
              target="_blank"
              rel="noreferrer"
            >
              Music Lens 체험하기
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <BrainCircuit size={28} />
            <span>Music Genre Analysis Project</span>
          </div>
          <div className="project-steps">
            <article>
              <strong>오디오 특징 추출</strong>
              <p>
                WAV·MP3·M4A 등 오디오에서 BPM, 에너지, 스펙트럼과 MFCC 특징을
                추출해 분석에 활용합니다.
              </p>
            </article>
            <article>
              <strong>장르 예측과 구간 분석</strong>
              <p>
                학습 모델이 장르별 확률을 제공하고, 3초 단위 타임라인으로 곡의
                구간별 예측 결과를 보여줍니다.
              </p>
            </article>
            <article>
              <strong>비교와 결과 공유</strong>
              <p>
                레이더 차트와 멜스펙트로그램으로 특징을 비교하고, CSV 다운로드와
                공유 링크로 분석 결과를 활용할 수 있습니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section strength-section">
        <div className="section-copy centered">
          <p className="section-label">Strength</p>
          <h2>AI를 잘 쓰는 기준은 멋진 말보다, 실제 효율을 만드는 것이라고 생각합니다.</h2>
        </div>
        <div className="strength-list">
          {strengths.map((strength) => (
            <article key={strength}>
              <CheckCircle2 size={22} />
              <p>{strength}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section growth-section">
        <div className="growth-panel">
          <p className="section-label">Growth</p>
          <h2>웹개발 기초 위에 AI 활용 역량을 더해 실무형 빌더로 성장합니다.</h2>
          <p>
            개발 과정에서 결과물이 완성되어 가는 흐름에 몰입하고 성취감을
            느낍니다. 앞으로도 AI와 개발 기술을 연결해 사용자의 편의성과 업무
            효율을 높이는 서비스를 만들고 싶습니다.
          </p>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <p className="section-label">Contact</p>
        <h2>AI와 개발을 활용해 실제 결과물을 만드는 사람으로 함께 일하고 싶습니다.</h2>
        <div className="hero-actions">
          <button
            className="button primary"
            type="button"
            onClick={() => setActiveModal("contact")}
          >
            이메일 보내기
            <Mail size={18} />
          </button>
          <button
            className="button secondary light"
            type="button"
            onClick={() => setActiveModal("project")}
          >
            프로젝트 다시 보기
          </button>
        </div>
      </section>

      <footer>
        <Workflow size={18} />
        <span>AI Service Builder Portfolio. Built with Next.js.</span>
      </footer>

      {activeModal !== null && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <section
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${activeModal}-modal-title`}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="창 닫기"
              onClick={closeModal}
            >
              <X size={22} />
            </button>

            {activeModal === "keyword" && activeKeyword !== null ? (
              <div className="modal-content">
                <p className="section-label">Keyword</p>
                <h2 id="keyword-modal-title">{activeKeyword.title}</h2>
                <p>{activeKeyword.description}</p>
                <div className="modal-grid">
                  <article>
                    <strong>포트폴리오에서 보여주는 방식</strong>
                    <p>{activeKeyword.detail}</p>
                  </article>
                </div>
              </div>
            ) : activeModal === "about" ? (
              <div className="modal-content">
                <p className="section-label">About</p>
                <h2 id="about-modal-title">아이디어를 실제 서비스로 바꾸는 과정에 집중합니다.</h2>
                <p>
                  곽호준은 사용자의 불편함과 업무 비효율을 발견하고, AI 도구와
                  개발 기술을 연결해 더 편리한 해결책을 만드는 AI 서비스
                  빌더입니다.
                </p>
                <div className="modal-grid">
                  <article>
                    <strong>지향점</strong>
                    <p>
                      AI에 의존하기보다, AI를 문제 해결과 업무 효율화에 연결하는
                      사람으로 성장하고 싶습니다.
                    </p>
                  </article>
                  <article>
                    <strong>되고 싶은 인상</strong>
                    <p>
                      회사에서 만났을 때 무엇이든 믿고 맡길 수 있는 사람, 새로운
                      도구를 실제 업무에 적용할 수 있는 사람으로 기억되고
                      싶습니다.
                    </p>
                  </article>
                </div>
              </div>
            ) : activeModal === "project" ? (
              <div className="modal-content">
                <p className="section-label">Featured Project</p>
                <h2 id="project-modal-title">AI를 이용한 컴퓨터 견적 사이트</h2>
                <p>
                  학원 웹개발 과정에서 제작한 프로젝트로, 사용자가 목적에 맞는
                  컴퓨터 견적을 더 쉽게 찾을 수 있도록 AI 활용 방식을
                  고민했습니다.
                </p>
                <div className="modal-grid">
                  {projectSteps.map((step) => (
                    <article key={step.label}>
                      <strong>{step.label}</strong>
                      <p>{step.text}</p>
                    </article>
                  ))}
                </div>
                <div className="project-links modal-links" aria-label="프로젝트 README 링크">
                  {projectLinks.map((link) => (
                    <a
                      key={link.href}
                      className="button secondary"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                      <ArrowRight size={18} />
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="modal-content">
                <p className="section-label">Contact</p>
                <h2 id="contact-modal-title">함께 일할 기회를 기다리고 있습니다.</h2>
                <p>
                  AI와 개발을 활용해 실제 결과물을 만드는 사람으로 성장하고
                  싶습니다. 채용, 협업, 포트폴리오 피드백이 있다면 편하게
                  연락해주세요.
                </p>
                <div className="contact-card">
                  <Mail size={22} />
                  <div>
                    <strong>이메일</strong>
                    <a href="mailto:test@example.com">test@example.com</a>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
