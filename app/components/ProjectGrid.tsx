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
              <button className="more" type="button" onClick={() => show(project)}>
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
            <dl className="detail-points">
              {open.points.map((point) => (
                <div key={point.title}>
                  <dt>{point.title}</dt>
                  <dd>{point.text}</dd>
                </div>
              ))}
            </dl>
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
