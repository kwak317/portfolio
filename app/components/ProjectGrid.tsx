"use client";

import { useRef, useState } from "react";
import type { Project } from "../content";

function Thumb({ id }: { id: string }) {
  if (id === "malhaebom") {
    return (
      <div className="thumb thumb-malhaebom" aria-hidden="true">
        <div className="thumb-wave">
          {Array.from({ length: 28 }, (_, i) => (
            <span key={i} style={{ height: `${20 + ((i * 37) % 70)}%` }} />
          ))}
        </div>
        <p>
          출력 <mark>검증과 재시도</mark>를 추가하고 <mark>평가셋으로 확인</mark>했습니다.
        </p>
        <span className="thumb-chip">근거 2곳 확인</span>
      </div>
    );
  }
  return null;
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Project | null>(null);

  const show = (project: Project) => {
    setOpen(project);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className={index === 0 ? "card card-main" : "card"}
            data-reveal
          >
            <Thumb id={project.id} />
            <div className="card-body">
              <div className="card-head">
                <h3>{project.name}</h3>
                <span className="card-kind">{project.kind}</span>
              </div>
              <p className="card-line">{project.oneLine}</p>
              <ul className="tags" aria-label="사용 기술">
                {project.tags.map((tag) => (
                  <li key={tag.name} className={`tag tone-${tag.tone}`}>
                    {tag.name}
                  </li>
                ))}
              </ul>
              {project.demo && (
                <a className="btn btn-solid card-demo" href={project.demo.href}>
                  {project.demo.label}
                  <span aria-hidden="true">→</span>
                </a>
              )}
              <button className="btn card-more" type="button" onClick={() => show(project)}>
                자세히 보기
              </button>
            </div>
          </article>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="detail"
        aria-labelledby="detail-title"
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        {open && (
          <div className="detail-inner">
            <button
              className="detail-close"
              type="button"
              onClick={() => dialogRef.current?.close()}
            >
              닫기
            </button>
            <p className="detail-team">{open.team}</p>
            <h3 id="detail-title">{open.name}</h3>
            <p className="detail-summary">{open.summary}</p>
            {open.problem && (
              <>
                <h4>문제 정의</h4>
                <dl className="detail-roles detail-problem">
                  {open.problem.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.text}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
            <dl className="detail-points">
              {open.points.map((point) => (
                <div key={point.title}>
                  <dt>{point.title}</dt>
                  <dd>{point.text}</dd>
                </div>
              ))}
            </dl>
            {open.video && (
              <>
                <h4>실제 서비스 시연</h4>
                <video
                  className="detail-video"
                  src={open.video.src}
                  poster={open.video.poster}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                />
                <p className="detail-video-caption">{open.video.caption}</p>
              </>
            )}
            {open.architecture && (
              <>
                <h4>시스템 구성</h4>
                <a href={open.architecture.src} target="_blank" rel="noreferrer" className="detail-arch">
                  <img src={open.architecture.src} alt={open.architecture.alt} loading="lazy" />
                </a>
                <p className="detail-video-caption">{open.architecture.caption}</p>
              </>
            )}
            {open.metrics && (
              <>
                <h4>평가 결과 · 합성 30건 기준</h4>
                <p className="detail-note">{open.metrics.note}</p>
                <dl className="detail-metrics">
                  {open.metrics.rows.map((row) => (
                    <div key={row.label}>
                      <dt>
                        <span>{row.label}</span>
                        <b>{row.value}</b>
                      </dt>
                      <dd>{row.text}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
            {open.troubleshooting && (
              <>
                <h4>트러블슈팅</h4>
                <p className="detail-note">{open.troubleshooting.note}</p>
                <ol className="detail-trouble">
                  {open.troubleshooting.items.map((item, i) => (
                    <li key={item.title}>
                      <p className="trouble-title">
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        {item.title}
                      </p>
                      <dl>
                        <div><dt>문제</dt><dd>{item.problem}</dd></div>
                        <div><dt>원인</dt><dd>{item.cause}</dd></div>
                        <div><dt>해결</dt><dd>{item.fix}</dd></div>
                        <div><dt>결과</dt><dd>{item.result}</dd></div>
                      </dl>
                    </li>
                  ))}
                </ol>
              </>
            )}
            {open.roles && (
              <>
                <h4>제가 맡은 작업</h4>
                <dl className="detail-roles">
                  {open.roles.map((role) => (
                    <div key={role.area}>
                      <dt>{role.area}</dt>
                      <dd>{role.work}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
            <h4>사용 기술</h4>
            <p className="detail-stack">{open.stack.join(", ")}</p>
            <div className="detail-links">
              {open.links.map((link, i) => (
                <a
                  key={link.href}
                  className={i === 0 ? "btn btn-solid" : "btn"}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
