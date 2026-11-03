"use client";

import { useEffect, useRef, useState } from "react";
import {
  APPLICANT,
  ASSESSMENT_LABELS,
  COACHING_1,
  COMPARISON,
  CRITERION_LABELS,
  DELIVERY,
  DEMO_QUESTION_ID,
  FOLLOW_UPS,
  FREE_CHAT,
  INTERVIEW_SUMMARY,
  JOBS,
  METRIC_CHANGES,
  NCS_JOB,
  NCS_OPTIONS,
  NCS_SUGGESTED,
  NORMALIZED_SEGMENTS,
  POLISH,
  PRESET_QUESTIONS,
  README_ANALYSIS,
  RESUME_CATEGORY_LABEL,
  RESUME_DRAFT,
  RESUME_FACTS,
  RETRY_SEGMENTS,
  SAMPLE_ANSWER_SCRIPT,
  SAMPLE_README,
  SAMPLE_RESUME,
  STT_FIXES,
  STT_SEGMENTS,
} from "./data";

/* ---------------- 공통 ---------------- */

const STEPS = [
  { key: "ncs", label: "NCS 자기점검" },
  { key: "materials", label: "README·이력서 분석" },
  { key: "jobs", label: "공고 추천·요구사항" },
  { key: "question", label: "질문 선택" },
  { key: "record", label: "답변 녹음·제출" },
  { key: "transcript", label: "STT 확인·수정" },
  { key: "coaching", label: "답변 코칭·자유채팅" },
  { key: "retry", label: "재답변 비교·꼬리질문" },
  { key: "resume", label: "이력서 초안·PDF" },
  { key: "history", label: "연습 기록" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];
type DocKey = "resume" | "readme" | "job" | "script";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function useReplay() {
  const [stage, setStage] = useState<string | null>(null);
  const run = async (stages: string[], done: () => void) => {
    for (const s of stages) {
      setStage(s);
      await wait(900);
    }
    setStage(null);
    done();
  };
  return { stage, run, busy: stage !== null };
}

function Loading({ text }: { text: string }) {
  return (
    <div className="mh-loading" role="status">
      <span className="mh-spinner" aria-hidden="true" />
      <span>{text}</span>
      <small>저장된 결과 재생 중</small>
    </div>
  );
}

function Badge({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <span className={`mh-badge mh-badge--${tone}`}>{children}</span>;
}

const toneOf = (a: string) =>
  a === "met" || a === "related" ? "good" : a === "partial" ? "warn" : a === "not_observed" || a === "insufficient_evidence" ? "bad" : "muted";

function SampleButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className="mh-sample-btn" onClick={onClick}>
      <span aria-hidden="true">📎</span> {children}
    </button>
  );
}

/* ---------------- 샘플 자료 보기 ---------------- */

function DocViewer({ doc, onClose }: { doc: DocKey | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (doc) ref.current?.showModal();
    else ref.current?.close();
  }, [doc]);
  const job = JOBS[0];
  return (
    <dialog
      ref={ref}
      className="mh-dialog"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mh-dialog__head">
        <strong>
          {doc === "resume" && "샘플 이력서.pdf"}
          {doc === "readme" && "샘플 GitHub README.md"}
          {doc === "job" && "샘플 채용공고"}
          {doc === "script" && "샘플 답변 음성 대본"}
        </strong>
        <button type="button" className="mh-link" onClick={onClose}>
          닫기
        </button>
      </div>
      <p className="mh-dialog__note">체험용 가상 자료입니다. 실제 인물·회사와 관련이 없습니다.</p>
      {doc === "resume" &&
        SAMPLE_RESUME.pages.map((p) => (
          <div className="mh-paper" key={p.page}>
            <span className="mh-paper__page">p.{p.page}</span>
            <h4>{p.title}</h4>
            {p.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        ))}
      {doc === "readme" && <pre className="mh-pre">{SAMPLE_README}</pre>}
      {doc === "job" && <pre className="mh-pre">{job.posting}</pre>}
      {doc === "script" && <p className="mh-paper">{SAMPLE_ANSWER_SCRIPT}</p>}
    </dialog>
  );
}

/* ---------------- 메인 ---------------- */

export function DemoApp() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState<StepKey>("ncs");
  const [doc, setDoc] = useState<DocKey | null>(null);
  const replay = useReplay();

  // 1. NCS
  const [ncs, setNcs] = useState<Set<string>>(new Set());
  // 2. 자료
  const [readmeDone, setReadmeDone] = useState(false);
  const [resumeDone, setResumeDone] = useState(false);
  const [facts, setFacts] = useState<Set<string>>(new Set(RESUME_FACTS.map((f) => f.id)));
  const [materialsConfirmed, setMaterialsConfirmed] = useState(false);
  // 3. 공고
  const [jobsShown, setJobsShown] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [reqAnalyzed, setReqAnalyzed] = useState(false);
  const [reqs, setReqs] = useState<Set<string>>(new Set());
  // 4. 질문
  const [questionId, setQuestionId] = useState<string>(DEMO_QUESTION_ID);
  // 5. 녹음
  const [speaking, setSpeaking] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // 6. STT
  const [segments, setSegments] = useState(STT_SEGMENTS.map((s) => ({ ...s })));
  const [fixed, setFixed] = useState(false);
  const [normalized, setNormalized] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  // 7. 코칭
  const [coached, setCoached] = useState(false);
  const [chat, setChat] = useState<{ who: "me" | "coach"; text: string }[]>([]);
  const [asked, setAsked] = useState<Set<number>>(new Set());
  const [consent, setConsent] = useState<"none" | "pending" | "yes" | "no">("none");
  // 8. 재답변
  const [retried, setRetried] = useState(false);
  const [followIdx, setFollowIdx] = useState(0);
  const [followShown, setFollowShown] = useState<number[]>([]);
  // 9. 이력서
  const [draftDone, setDraftDone] = useState(false);
  const [polished, setPolished] = useState(false);
  // 10. 기록
  const [historyDeleted, setHistoryDeleted] = useState(false);

  const job = JOBS.find((j) => j.id === jobId) ?? null;
  const stepIndex = STEPS.findIndex((s) => s.key === step);

  const go = (key: StepKey) => {
    setStep(key);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const next = () => go(STEPS[Math.min(stepIndex + 1, STEPS.length - 1)].key);

  const fillAll = () => {
    setNcs(new Set(NCS_SUGGESTED));
    setReadmeDone(true);
    setResumeDone(true);
    setMaterialsConfirmed(true);
    setJobsShown(true);
    setJobId("job-1");
    setReqAnalyzed(true);
    setReqs(new Set(["req-2", "req-3", "req-4"]));
    setQuestionId(DEMO_QUESTION_ID);
    setSubmitted(true);
    setSegments(STT_SEGMENTS.map((s) => ({ ...s, text: NORMALIZED_SEGMENTS[s.id] ?? s.text })));
    setFixed(true);
    setNormalized(true);
    setCoached(true);
  };

  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(SAMPLE_ANSWER_SCRIPT);
    u.lang = "ko-KR";
    u.rate = 1.05;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(u);
  };
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const answerText = (ids: string[]) => segments.filter((s) => ids.includes(s.id));

  if (!started) {
    return (
      <div className="mh">
        <header className="mh-top">
          <a href="/" className="mh-back">
            ← 포트폴리오로
          </a>
          <span className="mh-logo">말해봄 Mk.2 · 체험판</span>
        </header>
        <main className="mh-intro">
          <p className="mh-eyebrow">로그인·준비물 없이 체험하기</p>
          <h1>
            면접 답변을 말하면,
            <br />
            <span>답변 속 근거</span>로 코칭해 드려요.
          </h1>
          <p className="mh-intro__lead">
            실제 서비스(malhaebom.xyz)는 Google 로그인과 본인의 이력서 PDF, GitHub README, 채용공고, 답변 녹음이 필요합니다.
            체험판은 가상 지원자 <b>{APPLICANT.name}</b>의 샘플 자료를 화면에 준비해 두었고, 각 단계에서
            <b> 📎 샘플 사용</b>을 누르면 바로 다음으로 넘어갑니다.
          </p>
          <ul className="mh-intro__facts">
            <li>
              <b>10단계</b>
              <span>NCS 점검부터 이력서 PDF까지 실서비스와 같은 흐름</span>
            </li>
            <li>
              <b>0원·즉시</b>
              <span>AI 결과는 실서비스 응답 형식으로 미리 저장해 재생</span>
            </li>
            <li>
              <b>개인정보 없음</b>
              <span>입력한 내용은 이 브라우저 밖으로 나가지 않아요</span>
            </li>
          </ul>
          <div className="mh-intro__actions">
            <button type="button" className="mh-btn mh-btn--solid mh-btn--lg" onClick={() => setStarted(true)}>
              게스트로 체험 시작
            </button>
            <a className="mh-btn mh-btn--lg" href="https://malhaebom.xyz/" target="_blank" rel="noreferrer">
              실제 서비스 보기
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="mh">
      <header className="mh-top">
        <a href="/" className="mh-back">
          ← 포트폴리오로
        </a>
        <span className="mh-logo">말해봄 Mk.2 · 체험판</span>
        <span className="mh-guest">
          게스트 · {APPLICANT.name} ({APPLICANT.note})
        </span>
      </header>

      <div className="mh-layout">
        <aside className="mh-side">
          <nav aria-label="체험 단계">
            <ol className="mh-steps">
              {STEPS.map((s, i) => (
                <li key={s.key}>
                  <button
                    type="button"
                    aria-current={s.key === step ? "step" : undefined}
                    className={i < stepIndex ? "is-done" : ""}
                    onClick={() => go(s.key)}
                  >
                    <span className="mh-steps__no">{i + 1}</span>
                    {s.label}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mh-box">
            <strong>샘플 자료함</strong>
            <p>실서비스에서 직접 준비해야 하는 자료예요.</p>
            <button type="button" onClick={() => setDoc("resume")}>📄 이력서.pdf</button>
            <button type="button" onClick={() => setDoc("readme")}>📘 GitHub README.md</button>
            <button type="button" onClick={() => setDoc("job")}>📋 채용공고</button>
            <button type="button" onClick={() => setDoc("script")}>🎙️ 답변 음성 대본</button>
          </div>
          <button type="button" className="mh-link mh-skip" onClick={() => { fillAll(); go("coaching"); }}>
            바쁘시면: 코칭 결과로 바로 가기 →
          </button>
        </aside>

        <main className="mh-main">
          <p className="mh-eyebrow">
            STEP {stepIndex + 1} / {STEPS.length}
          </p>

          {/* 1. NCS */}
          {step === "ncs" && (
            <section>
              <h2>NCS 역량 자기점검</h2>
              <p className="mh-desc">
                국가직무능력표준(NCS) <b>{NCS_JOB}</b>의 능력단위에서 뽑은 문장 중, 자신 있게 말할 수 있는 항목을 고릅니다.
                고른 역량은 공고 추천과 코칭 맥락에 쓰입니다.
              </p>
              <SampleButton onClick={() => setNcs(new Set(NCS_SUGGESTED))}>{APPLICANT.name}의 선택으로 채우기</SampleButton>
              {(["knowledge", "skill", "attitude"] as const).map((cat) => (
                <fieldset key={cat} className="mh-fieldset">
                  <legend>{cat === "knowledge" ? "지식" : cat === "skill" ? "기술" : "태도"}</legend>
                  {NCS_OPTIONS.filter((o) => o.category === cat).map((o) => (
                    <label key={o.id} className="mh-check">
                      <input
                        type="checkbox"
                        checked={ncs.has(o.id)}
                        onChange={() => {
                          const n = new Set(ncs);
                          n.has(o.id) ? n.delete(o.id) : n.add(o.id);
                          setNcs(n);
                        }}
                      />
                      <span>
                        {o.label}
                        <small>능력단위: {o.unit}</small>
                      </span>
                    </label>
                  ))}
                </fieldset>
              ))}
              <div className="mh-actions">
                <span className="mh-hint">{ncs.size}개 선택</span>
                <button type="button" className="mh-btn mh-btn--solid" disabled={ncs.size === 0} onClick={next}>
                  다음: 자료 분석
                </button>
              </div>
            </section>
          )}

          {/* 2. 자료 */}
          {step === "materials" && (
            <section>
              <h2>GitHub README·이력서 PDF 분석</h2>
              <p className="mh-desc">
                실서비스에서는 README 주소를 붙여 넣고 이력서 PDF를 올리면, AI가 기술 스택·프로젝트 흐름·이력 사실을 원문 근거와
                함께 뽑고 사용자가 확인합니다. 둘 다 선택 사항입니다.
              </p>

              <div className="mh-grid2">
                <div className="mh-card">
                  <h3>GitHub README</h3>
                  <div className="mh-input-fake">https://github.com/demo-malhae/roomfit</div>
                  {!readmeDone && !replay.busy && (
                    <SampleButton
                      onClick={() =>
                        replay.run(["README 가져오는 중", "기술 스택 추출 중", "프로젝트 흐름 정리 중"], () => setReadmeDone(true))
                      }
                    >
                      샘플 README로 분석
                    </SampleButton>
                  )}
                  <button type="button" className="mh-link" onClick={() => setDoc("readme")}>
                    README 원문 보기
                  </button>
                </div>
                <div className="mh-card">
                  <h3>이력서 PDF</h3>
                  <div className="mh-input-fake">📄 김말해_이력서.pdf (2쪽)</div>
                  {!resumeDone && !replay.busy && (
                    <SampleButton
                      onClick={() => replay.run(["PDF 텍스트 읽는 중", "이력 사실 분류 중"], () => setResumeDone(true))}
                    >
                      샘플 이력서로 분석
                    </SampleButton>
                  )}
                  <button type="button" className="mh-link" onClick={() => setDoc("resume")}>
                    이력서 원문 보기
                  </button>
                </div>
              </div>

              {replay.stage && <Loading text={replay.stage} />}

              {readmeDone && (
                <div className="mh-result">
                  <h3>README 분석 결과</h3>
                  <h4>기술 스택</h4>
                  <ul className="mh-list">
                    {README_ANALYSIS.technology_stack.map((t) => (
                      <li key={t.name}>
                        <b>{t.name}</b> — {t.description}
                        <q>{t.source_excerpt}</q>
                      </li>
                    ))}
                  </ul>
                  <h4>프로젝트 흐름</h4>
                  <ul className="mh-list">
                    {README_ANALYSIS.project_flow.map((f) => (
                      <li key={f.description}>
                        {f.description}
                        <q>{f.source_excerpt}</q>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {resumeDone && (
                <div className="mh-result">
                  <h3>이력서에서 찾은 사실</h3>
                  <p className="mh-hint">틀린 항목은 체크를 해제하세요. 확인한 사실만 다음 단계에 쓰입니다.</p>
                  {RESUME_FACTS.map((f) => (
                    <label key={f.id} className="mh-check">
                      <input
                        type="checkbox"
                        checked={facts.has(f.id)}
                        onChange={() => {
                          const n = new Set(facts);
                          n.has(f.id) ? n.delete(f.id) : n.add(f.id);
                          setFacts(n);
                        }}
                      />
                      <span>
                        <Badge tone="muted">{RESUME_CATEGORY_LABEL[f.category]}</Badge> {f.value}
                        <small>
                          p.{f.page} 원문: “{f.source_excerpt}”
                        </small>
                      </span>
                    </label>
                  ))}
                </div>
              )}

              <div className="mh-actions">
                {readmeDone && resumeDone && !materialsConfirmed && (
                  <button type="button" className="mh-btn" onClick={() => setMaterialsConfirmed(true)}>
                    분석 결과 확인 완료
                  </button>
                )}
                {materialsConfirmed && <Badge tone="good">확인 완료</Badge>}
                <button
                  type="button"
                  className="mh-btn mh-btn--solid"
                  disabled={!materialsConfirmed}
                  onClick={next}
                >
                  다음: 공고 추천
                </button>
              </div>
            </section>
          )}

          {/* 3. 공고 */}
          {step === "jobs" && (
            <section>
              <h2>확인한 경험으로 공고 추천</h2>
              <p className="mh-desc">
                실서비스는 사람인·잡알리오 등 공고를 검색해, 확인한 기술·프로젝트 흐름·NCS 역량과 겹치는 공고를 추천합니다.
                체험판은 가상 공고 3개를 사용합니다.
              </p>
              {!jobsShown && !replay.busy && (
                <SampleButton
                  onClick={() => replay.run(["검색어 만드는 중", "공고 검색 중", "경험과 맞춰 보는 중"], () => setJobsShown(true))}
                >
                  내 경험으로 공고 추천 받기
                </SampleButton>
              )}
              {replay.stage && <Loading text={replay.stage} />}
              {jobsShown && (
                <div className="mh-jobs">
                  {JOBS.map((j) => (
                    <label key={j.id} className={`mh-job ${jobId === j.id ? "is-on" : ""}`}>
                      <input
                        type="radio"
                        name="job"
                        checked={jobId === j.id}
                        onChange={() => {
                          setJobId(j.id);
                          setReqAnalyzed(false);
                          setReqs(new Set());
                        }}
                      />
                      <div>
                        <p className="mh-job__co">
                          {j.company} · {j.experience} · 마감 {j.deadline}
                        </p>
                        <strong>{j.title}</strong>
                        <div className="mh-chips">
                          {j.matched_technologies.map((t) => (
                            <Badge key={t} tone="blue">{t}</Badge>
                          ))}
                          {j.matched_project_flows.map((t) => (
                            <Badge key={t} tone="good">{t}</Badge>
                          ))}
                          {j.matched_ncs_labels.map((t) => (
                            <Badge key={t} tone="muted">NCS · {t}</Badge>
                          ))}
                        </div>
                        <q>{j.source_excerpt}</q>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {job && !reqAnalyzed && !replay.busy && (
                <div className="mh-actions mh-actions--left">
                  <button
                    type="button"
                    className="mh-btn mh-btn--solid"
                    onClick={() => replay.run(["공고 원문 읽는 중", "요구사항 추출 중"], () => setReqAnalyzed(true))}
                  >
                    이 공고 원문 분석하기
                  </button>
                </div>
              )}

              {job && reqAnalyzed && (
                <div className="mh-result">
                  <h3>요구사항 선택</h3>
                  <p className="mh-hint">연습할 때 연결해 볼 요구사항을 고르세요. 코칭이 답변과 이 요구사항의 관련성을 함께 봅니다.</p>
                  {job.requirements.map((r) => (
                    <label key={r.id} className="mh-check">
                      <input
                        type="checkbox"
                        checked={reqs.has(r.id)}
                        onChange={() => {
                          const n = new Set(reqs);
                          n.has(r.id) ? n.delete(r.id) : n.add(r.id);
                          setReqs(n);
                        }}
                      />
                      <span>
                        <Badge tone="muted">{r.code}</Badge> {r.text}
                        <small>공고 원문: “{r.source_excerpt}”</small>
                      </span>
                    </label>
                  ))}
                  {job.id === "job-1" ? (
                    <SampleButton onClick={() => setReqs(new Set(["req-2", "req-3", "req-4"]))}>추천 요구사항 3개 선택</SampleButton>
                  ) : (
                    <p className="mh-hint">체험판의 코칭 결과는 첫 번째 공고(하늘물류) 기준으로 저장되어 있어요.</p>
                  )}
                </div>
              )}

              <div className="mh-actions">
                <button
                  type="button"
                  className="mh-btn mh-btn--solid"
                  disabled={!reqAnalyzed || reqs.size === 0}
                  onClick={() => {
                    if (jobId !== "job-1") {
                      setJobId("job-1");
                      setReqs(new Set(["req-2", "req-3", "req-4"]));
                    }
                    next();
                  }}
                >
                  다음: 질문 선택
                </button>
              </div>
            </section>
          )}

          {/* 4. 질문 */}
          {step === "question" && (
            <section>
              <h2>면접 질문 선택</h2>
              <p className="mh-desc">
                신입 백엔드 기본 질문 10개와 직접 입력 질문을 지원합니다. 질문마다 다른 판단 기준(Skill)이 적용됩니다.
                체험판은 <b>문제 해결 경험</b> 질문의 결과를 저장해 두었습니다.
              </p>
              <div className="mh-questions">
                {PRESET_QUESTIONS.map((q) => {
                  const enabled = q.id === DEMO_QUESTION_ID;
                  return (
                    <label key={q.id} className={`mh-q ${questionId === q.id ? "is-on" : ""} ${enabled ? "" : "is-off"}`}>
                      <input
                        type="radio"
                        name="q"
                        disabled={!enabled}
                        checked={questionId === q.id}
                        onChange={() => setQuestionId(q.id)}
                      />
                      <span>{q.text}</span>
                      {enabled ? <Badge tone="blue">체험 가능</Badge> : <small>실서비스에서 가능</small>}
                    </label>
                  );
                })}
                <label className="mh-q is-off">
                  <input type="radio" name="q" disabled />
                  <span>직접 입력 질문</span>
                  <small>실서비스에서 가능</small>
                </label>
              </div>
              <div className="mh-actions">
                <button type="button" className="mh-btn mh-btn--solid" onClick={next}>
                  다음: 답변 녹음
                </button>
              </div>
            </section>
          )}

          {/* 5. 녹음 */}
          {step === "record" && (
            <section>
              <h2>답변 녹음·제출</h2>
              <div className="mh-question-card">
                <small>질문</small>
                <strong>{PRESET_QUESTIONS.find((q) => q.id === questionId)?.text}</strong>
              </div>
              <p className="mh-desc">
                실서비스에서는 마이크로 녹음하거나 WAV 파일을 올립니다. 체험판은 {APPLICANT.name}의 샘플 답변 음성을 사용합니다.
                (재생은 브라우저 음성 합성으로 대본을 읽어 줍니다.)
              </p>
              <div className="mh-recorder">
                <div className={`mh-wave ${speaking || replay.busy ? "is-live" : ""}`} aria-hidden="true">
                  {Array.from({ length: 36 }, (_, i) => (
                    <span key={i} style={{ height: `${18 + ((i * 41) % 70)}%` }} />
                  ))}
                </div>
                <p className="mh-recorder__file">🎙️ sample-answer.wav · 약 25초</p>
                <div className="mh-actions mh-actions--left">
                  <button type="button" className="mh-btn" onClick={speak}>
                    {speaking ? "■ 멈추기" : "▶ 샘플 답변 듣기"}
                  </button>
                  <button type="button" className="mh-link" onClick={() => setDoc("script")}>
                    대본 보기
                  </button>
                </div>
              </div>
              {!submitted && !replay.busy && (
                <SampleButton
                  onClick={() =>
                    replay.run(["음성 업로드 중", "말하는 구간 찾는 중 (VAD)", "음성을 글로 바꾸는 중 (STT)"], () => setSubmitted(true))
                  }
                >
                  샘플 음성으로 제출하기
                </SampleButton>
              )}
              {replay.stage && <Loading text={replay.stage} />}
              {submitted && (
                <div className="mh-result">
                  <Badge tone="good">분석 완료</Badge> 음성 25.1초, 말한 구간 4개를 찾았습니다.
                </div>
              )}
              <div className="mh-actions">
                <button type="button" className="mh-btn mh-btn--solid" disabled={!submitted} onClick={next}>
                  다음: 전사 확인
                </button>
              </div>
            </section>
          )}

          {/* 6. STT */}
          {step === "transcript" && (
            <section>
              <h2>STT 원문 확인·수정</h2>
              <p className="mh-desc">
                코칭은 사용자가 확인한 문장만 근거로 씁니다. 잘못 들린 단어를 고치고, 구어체를 표준어 문장으로 바꿀 수 있습니다.
              </p>
              <ol className="mh-segments">
                {segments.map((s) => {
                  const fix = STT_FIXES.find((f) => f.segment === s.id);
                  return (
                    <li key={s.id}>
                      <span className="mh-time">{s.start.toFixed(1)}s</span>
                      {editing === s.id ? (
                        <textarea
                          className="mh-textarea"
                          value={s.text}
                          onChange={(e) =>
                            setSegments(segments.map((x) => (x.id === s.id ? { ...x, text: e.target.value } : x)))
                          }
                          onBlur={() => setEditing(null)}
                          autoFocus
                        />
                      ) : (
                        <p>
                          {fix && !fixed && s.text.includes(fix.from) ? (
                            <>
                              {s.text.split(fix.from)[0]}
                              <mark className="mh-err">{fix.from}</mark>
                              {s.text.split(fix.from)[1]}
                            </>
                          ) : (
                            s.text
                          )}
                        </p>
                      )}
                      <button type="button" className="mh-link" onClick={() => setEditing(s.id)}>
                        직접 수정
                      </button>
                    </li>
                  );
                })}
              </ol>
              {!fixed && (
                <div className="mh-callout">
                  <span>
                    잘못 들린 것 같은 단어가 있어요: <mark className="mh-err">행 짐금</mark> → <b>행 잠금</b>
                  </span>
                  <button
                    type="button"
                    className="mh-btn"
                    onClick={() => {
                      setSegments(segments.map((s) => ({ ...s, text: s.text.replace("행 짐금", "행 잠금") })));
                      setFixed(true);
                    }}
                  >
                    교정 적용
                  </button>
                </div>
              )}
              {!normalized && !replay.busy && (
                <SampleButton
                  onClick={() =>
                    replay.run(["표준어 문장으로 바꾸는 중"], () => {
                      setSegments((cur) => cur.map((s) => ({ ...s, text: NORMALIZED_SEGMENTS[s.id] ?? s.text.replace("행 짐금", "행 잠금") })));
                      setFixed(true);
                      setNormalized(true);
                    })
                  }
                >
                  구어체 → 표준어 변환
                </SampleButton>
              )}
              {replay.stage && <Loading text={replay.stage} />}
              <h3 className="mh-sub">말하기 지표</h3>
              <div className="mh-metrics">
                {DELIVERY.map((d) => (
                  <div key={d.id}>
                    <span>{d.label}</span>
                    <strong>{d.value}</strong>
                    {d.note && <small>{d.note}</small>}
                  </div>
                ))}
              </div>
              <div className="mh-actions">
                <button
                  type="button"
                  className="mh-btn mh-btn--solid"
                  onClick={() => {
                    if (!fixed) {
                      setSegments(segments.map((s) => ({ ...s, text: s.text.replace("행 짐금", "행 잠금") })));
                      setFixed(true);
                    }
                    next();
                  }}
                >
                  이 문장으로 코칭 받기
                </button>
              </div>
            </section>
          )}

          {/* 7. 코칭 */}
          {step === "coaching" && (
            <section>
              <h2>답변 근거 코칭</h2>
              {!coached && !replay.busy && (
                <>
                  <p className="mh-desc">
                    질문별 판단 기준(Skill), 선택한 공고 요구사항, 확인한 답변 문장을 LLM에 넘기고, 출력 JSON 계약과 근거 인용을
                    서버에서 검증합니다.
                  </p>
                  <SampleButton
                    onClick={() =>
                      replay.run(["판단 기준 불러오는 중 (MCP)", "답변 근거 찾는 중", "출력 형식 검증 중"], () => setCoached(true))
                    }
                  >
                    코칭 받기
                  </SampleButton>
                </>
              )}
              {replay.stage && <Loading text={replay.stage} />}
              {coached && (
                <>
                  <div className="mh-coach-head">
                    <Badge tone="warn">추가 정보 필요</Badge>
                    <p>{COACHING_1.intent_assessment.reason}</p>
                  </div>
                  <div className="mh-metrics">
                    <div>
                      <span>질문 의도</span>
                      <strong>질문 의도에 맞음</strong>
                    </div>
                    <div>
                      <span>공고 연결</span>
                      <strong>
                        {COACHING_1.job_alignment.filter((j) => j.label === "related").length} / {COACHING_1.job_alignment.length} 관련 근거
                      </strong>
                    </div>
                    <div>
                      <span>보완 사항</span>
                      <strong>{COACHING_1.gaps.length}개 설명 확인 필요</strong>
                    </div>
                  </div>

                  <h3 className="mh-sub">내 답변에서 찾은 근거</h3>
                  <ol className="mh-segments mh-segments--evidence">
                    {answerText(STT_SEGMENTS.map((s) => s.id)).map((s) => {
                      const ev = COACHING_1.evidence.filter((e) => e.segment_id === s.id);
                      return (
                        <li key={s.id} className={ev.length ? "has-ev" : ""}>
                          <p>{s.text}</p>
                          {ev.map((e) => (
                            <Badge key={e.source_id} tone={toneOf(COACHING_1.criterion_assessments.find((c) => c.criterion_id === e.source_id)?.assessment ?? "")}>
                              {CRITERION_LABELS[e.source_id]} · {e.reason}
                            </Badge>
                          ))}
                        </li>
                      );
                    })}
                  </ol>

                  <h3 className="mh-sub">판단 기준별 결과</h3>
                  <div className="mh-criteria">
                    {COACHING_1.criterion_assessments.map((c) => (
                      <article key={c.criterion_id}>
                        <div>
                          <strong>{CRITERION_LABELS[c.criterion_id]}</strong>
                          <Badge tone={toneOf(c.assessment)}>{ASSESSMENT_LABELS[c.assessment]}</Badge>
                        </div>
                        <p>{c.reason}</p>
                        {c.needed && <p className="mh-needed">보완: {c.needed}</p>}
                      </article>
                    ))}
                  </div>

                  <h3 className="mh-sub">공고 요구사항과의 연결</h3>
                  <ul className="mh-list">
                    {COACHING_1.job_alignment.map((j) => {
                      const r = JOBS[0].requirements.find((x) => x.id === j.requirement_id);
                      return (
                        <li key={j.requirement_id}>
                          <Badge tone={toneOf(j.label)}>{ASSESSMENT_LABELS[j.label]}</Badge> <b>{r?.text}</b> — {j.reason}
                        </li>
                      );
                    })}
                  </ul>

                  <h3 className="mh-sub">다음 연습에서 할 일</h3>
                  <ol className="mh-list mh-list--num">
                    {COACHING_1.next_actions.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ol>

                  <details className="mh-details">
                    <summary>근거 기반 예시 답변 보기</summary>
                    <p>{COACHING_1.example_answer}</p>
                    <small>[ ] 부분은 확인되지 않은 내용이라 비워 둡니다. 하지 않은 일을 지어내지 않도록 설계했습니다.</small>
                  </details>

                  <div className="mh-chat">
                    <div className="mh-chat__head">
                      <strong>코치와 자유채팅</strong>
                      <small>추가 질문: {COACHING_1.clarifying_question}</small>
                    </div>
                    <div className="mh-chat__log">
                      <p className="mh-bubble mh-bubble--coach">{COACHING_1.clarifying_question}</p>
                      {chat.map((m, i) => (
                        <p key={i} className={`mh-bubble mh-bubble--${m.who}`}>
                          {m.text}
                        </p>
                      ))}
                      {consent === "pending" && (
                        <div className="mh-actions mh-actions--left">
                          <button
                            type="button"
                            className="mh-btn mh-btn--solid"
                            onClick={() => {
                              setConsent("yes");
                              setChat((c) => [...c, { who: "coach", text: "반영했어요. 재답변 비교와 이력서 초안에서 이 경험을 근거로 씁니다." }]);
                            }}
                          >
                            동의하고 반영
                          </button>
                          <button
                            type="button"
                            className="mh-btn"
                            onClick={() => {
                              setConsent("no");
                              setChat((c) => [...c, { who: "coach", text: "반영하지 않았어요. 대화 내용은 이번 코칭에서만 참고합니다." }]);
                            }}
                          >
                            반영하지 않기
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="mh-chat__suggest">
                      {FREE_CHAT.map((f, i) =>
                        asked.has(i) ? null : (
                          <button
                            key={f.q}
                            type="button"
                            disabled={consent === "pending"}
                            onClick={() => {
                              setAsked(new Set(asked).add(i));
                              setChat((c) => [...c, { who: "me", text: f.q }, { who: "coach", text: f.a }]);
                              if (f.consent) setConsent("pending");
                            }}
                          >
                            {f.q}
                          </button>
                        ),
                      )}
                      {asked.size === FREE_CHAT.length && <small>준비된 질문을 모두 보셨어요.</small>}
                    </div>
                  </div>

                  <div className="mh-actions">
                    <button type="button" className="mh-btn mh-btn--solid" onClick={next}>
                      다음: 다시 답변하기
                    </button>
                  </div>
                </>
              )}
            </section>
          )}

          {/* 8. 재답변 */}
          {step === "retry" && (
            <section>
              <h2>재답변 비교·꼬리질문</h2>
              <p className="mh-desc">
                코칭을 반영해 다시 답변하면, 같은 판단 기준으로 이전 답변과 비교합니다. 이어서 답변 근거를 바탕으로 꼬리질문을
                받습니다.
              </p>
              {!retried && !replay.busy && (
                <SampleButton
                  onClick={() => replay.run(["두 번째 답변 전사 중", "이전 답변과 비교 중"], () => setRetried(true))}
                >
                  샘플 재답변 제출
                </SampleButton>
              )}
              {replay.stage && <Loading text={replay.stage} />}
              {retried && (
                <>
                  <h3 className="mh-sub">두 번째 답변</h3>
                  <ol className="mh-segments">
                    {RETRY_SEGMENTS.map((s) => (
                      <li key={s.id}>
                        <p>{s.text}</p>
                      </li>
                    ))}
                  </ol>
                  {consent === "yes" && <p className="mh-hint">✓ 자유채팅에서 반영에 동의한 locust 테스트 경험이 근거로 쓰였어요.</p>}

                  <h3 className="mh-sub">판단 기준 변화</h3>
                  <table className="mh-table">
                    <thead>
                      <tr>
                        <th>기준</th>
                        <th>1차</th>
                        <th>2차</th>
                        <th>새로 확인된 근거</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON.map((c) => (
                        <tr key={c.criterion_id} className={c.change === "added" ? "is-up" : ""}>
                          <td>{CRITERION_LABELS[c.criterion_id]}</td>
                          <td>
                            <Badge tone={toneOf(c.before)}>{ASSESSMENT_LABELS[c.before]}</Badge>
                          </td>
                          <td>
                            <Badge tone={toneOf(c.after)}>{ASSESSMENT_LABELS[c.after]}</Badge>
                          </td>
                          <td>{c.quote ? `“${c.quote}”` : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mh-metrics">
                    {METRIC_CHANGES.map((m) => (
                      <div key={m.label}>
                        <span>{m.label}</span>
                        <strong>
                          {m.before} → {m.after}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="mh-chat">
                    <div className="mh-chat__head">
                      <strong>꼬리질문 면접</strong>
                      <small>답변에서 확인된 근거로만 질문합니다.</small>
                    </div>
                    <div className="mh-chat__log">
                      {FOLLOW_UPS.slice(0, followIdx + 1).map((f, i) => (
                        <div key={f.q}>
                          <p className="mh-bubble mh-bubble--coach">
                            {f.q}
                            <small>{f.hint}</small>
                          </p>
                          {followShown.includes(i) && (
                            <>
                              <p className="mh-bubble mh-bubble--me">{f.sample}</p>
                              <p className="mh-bubble mh-bubble--coach mh-bubble--fb">피드백: {f.feedback}</p>
                            </>
                          )}
                        </div>
                      ))}
                      {followShown.length === FOLLOW_UPS.length && (
                        <div className="mh-summary">
                          <strong>면접 정리</strong>
                          <p>분명해진 점: {INTERVIEW_SUMMARY.clarified_points.join(", ")}</p>
                          <p>다음 연습: {INTERVIEW_SUMMARY.next_practice.join(" / ")}</p>
                        </div>
                      )}
                    </div>
                    <div className="mh-chat__suggest">
                      {!followShown.includes(followIdx) && (
                        <button type="button" onClick={() => setFollowShown([...followShown, followIdx])}>
                          📎 샘플 답변으로 대답하기
                        </button>
                      )}
                      {followShown.includes(followIdx) && followIdx < FOLLOW_UPS.length - 1 && (
                        <button type="button" onClick={() => setFollowIdx(followIdx + 1)}>
                          다음 꼬리질문 받기
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mh-actions">
                    <button type="button" className="mh-btn mh-btn--solid" onClick={next}>
                      다음: 이력서 초안
                    </button>
                  </div>
                </>
              )}
            </section>
          )}

          {/* 9. 이력서 */}
          {step === "resume" && (
            <section>
              <h2>이력서 초안·문장 다듬기·PDF</h2>
              <p className="mh-desc">
                확인한 이력 사실, README, 연습 답변에서 확인된 근거만으로 이력서 초안을 만듭니다. 근거 없는 성과는 넣지 않습니다.
              </p>
              {!draftDone && !replay.busy && (
                <SampleButton onClick={() => replay.run(["확인한 사실 모으는 중", "초안 작성 중"], () => setDraftDone(true))}>
                  이력서 초안 만들기
                </SampleButton>
              )}
              {replay.stage && <Loading text={replay.stage} />}
              {draftDone && (
                <>
                  <div className="mh-polish">
                    <div>
                      <small>다듬기 전 문장</small>
                      <p className={polished ? "is-old" : ""}>{POLISH.before}</p>
                    </div>
                    {polished ? (
                      <div>
                        <small>다듬은 문장 · 근거: {POLISH.source}</small>
                        <p className="is-new">{POLISH.after}</p>
                      </div>
                    ) : (
                      <button type="button" className="mh-btn" onClick={() => setPolished(true)}>
                        ✨ 문장 다듬기
                      </button>
                    )}
                  </div>

                  <article className="mh-resume" id="mh-resume-print">
                    <header>
                      <h3>{APPLICANT.name}</h3>
                      <p>{RESUME_DRAFT.headline}</p>
                    </header>
                    <p>{RESUME_DRAFT.summary}</p>
                    <h4>프로젝트</h4>
                    <p>
                      <b>{RESUME_DRAFT.project.name}</b>
                    </p>
                    <ul>
                      {RESUME_DRAFT.project.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                      {polished && <li>{POLISH.after}</li>}
                    </ul>
                    <h4>기술</h4>
                    <p>{RESUME_DRAFT.skills}</p>
                    <h4>학력·교육</h4>
                    <ul>
                      {RESUME_DRAFT.education.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <h4>자격·어학</h4>
                    <ul>
                      {RESUME_DRAFT.qualification.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <footer>말해봄 Mk.2 체험판으로 만든 가상 지원자 이력서 초안</footer>
                  </article>
                  <div className="mh-actions">
                    <button type="button" className="mh-btn" onClick={() => window.print()}>
                      ⬇ PDF로 저장
                    </button>
                    <button type="button" className="mh-btn mh-btn--solid" onClick={next}>
                      다음: 연습 기록
                    </button>
                  </div>
                </>
              )}
            </section>
          )}

          {/* 10. 기록 */}
          {step === "history" && (
            <section>
              <h2>연습 결과·채팅 기록</h2>
              <p className="mh-desc">실서비스는 로그인한 사용자별로 연습 기록을 저장하고, 언제든 다시 보거나 삭제할 수 있습니다.</p>
              {historyDeleted ? (
                <div className="mh-result">
                  <p>기록을 삭제했습니다. (체험판에서는 이 화면에서만 지워집니다.)</p>
                  <button type="button" className="mh-link" onClick={() => setHistoryDeleted(false)}>
                    되돌리기
                  </button>
                </div>
              ) : (
                <div className="mh-history">
                  <article>
                    <div>
                      <small>2026-11-03 · {JOBS[0].company}</small>
                      <strong>프로젝트 개발 중 발생한 문제를 어떻게 해결했나요?</strong>
                      <p>
                        1차 <Badge tone="warn">추가 정보 필요</Badge> → 2차 <Badge tone="good">답변 근거 충족</Badge> · 자유채팅{" "}
                        {chat.filter((c) => c.who === "me").length}회 · 꼬리질문 {followShown.length}개
                      </p>
                    </div>
                    <div className="mh-history__actions">
                      <button type="button" className="mh-btn" onClick={() => go("coaching")}>
                        코칭 다시 보기
                      </button>
                      <button type="button" className="mh-btn" onClick={() => go("retry")}>
                        비교 다시 보기
                      </button>
                      <button type="button" className="mh-link mh-danger" onClick={() => setHistoryDeleted(true)}>
                        기록 삭제
                      </button>
                    </div>
                  </article>
                </div>
              )}

              <div className="mh-end">
                <h3>체험을 마쳤습니다 🎉</h3>
                <p>
                  실제 서비스에서는 이 흐름이 사용자의 자료와 실제 녹음으로 동작합니다. 제가 맡은 부분(코칭 Skill·출력 검증·MCP·연습
                  화면·평가)은 포트폴리오에서 자세히 보실 수 있습니다.
                </p>
                <div className="mh-actions mh-actions--left">
                  <a className="mh-btn mh-btn--solid" href="/#project">
                    포트폴리오로 돌아가기
                  </a>
                  <a className="mh-btn" href="https://malhaebom.xyz/" target="_blank" rel="noreferrer">
                    실제 서비스
                  </a>
                  <a className="mh-btn" href="https://github.com/kwak317/malhaebom" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>
              </div>
            </section>
          )}

          <div className="mh-nav">
            <button type="button" className="mh-link" disabled={stepIndex === 0} onClick={() => go(STEPS[stepIndex - 1].key)}>
              ← 이전 단계
            </button>
            <span className="mh-hint">체험판: AI 결과는 미리 저장한 응답을 재생합니다.</span>
          </div>
        </main>
      </div>

      <DocViewer doc={doc} onClose={() => setDoc(null)} />
    </div>
  );
}
