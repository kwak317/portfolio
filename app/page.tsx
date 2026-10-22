import { BouncyName, Effects } from "./components/Effects";
import { ProjectGrid } from "./components/ProjectGrid";
import { TopNav } from "./components/TopNav";
import { EMAIL, GITHUB, projects, skillGroups } from "./content";

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="section-title">
      <span>{children}</span>
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <Effects />
      <TopNav />

      <header className="hero">
        <div className="hero-grid" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-circle hero-circle-a" aria-hidden="true" />
        <div className="hero-circle hero-circle-b" aria-hidden="true" />

        <div className="wrap hero-inner">
          <p className="hero-caption">
            <span>AI SERVICE PORTFOLIO</span>
          </p>
          <h1 aria-label="곽호준, KWAK HO JUN">
            <span className="hero-line hero-line-1">
              <BouncyName text="KWAK" />
            </span>
            <span className="hero-line hero-line-2">
              <BouncyName text="HO JUN" />
            </span>
          </h1>
          <hr className="hero-rule" />
          <a className="hero-down" href="#about" aria-label="소개로 내려가기">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </a>
        </div>
      </header>

      <main>
        <section className="wrap section" aria-labelledby="about">
          <SectionTitle id="about">ABOUT ME</SectionTitle>
          <div className="about" data-reveal>
            <div className="about-copy">
              <p className="about-hello">
                안녕하세요,
                <br />
                AI 서비스 개발자
                <br />
                <em>곽호준</em>입니다.
              </p>
              <p className="about-text">
                AI에 의존하기보다 <em>문제 해결과 업무 효율화</em>에 연결하고,
                <br />
                아이디어를 <em>실제 작동하는 서비스</em>로 끝까지 완성합니다.
              </p>
              <ul className="about-principles">
                <li>AI를 어디에 적용해야 효율이 나는지 먼저 판단합니다.</li>
                <li>사용자의 불편함을 먼저 보고, 해결 가능한 구조로 정리합니다.</li>
                <li>말에서 끝내지 않고 배포해서 운영하는 결과물로 만듭니다.</li>
              </ul>
            </div>

            <aside className="namecard">
              <p className="namecard-mono" aria-hidden="true">
                HJ
              </p>
              <div>
                <p className="namecard-name">곽호준</p>
                <p className="namecard-en">KWAK HO JUN</p>
                <p className="namecard-role">AI Service Developer</p>
              </div>
              <ul className="namecard-links">
                <li>
                  <span>Email</span>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </li>
                <li>
                  <span>GitHub</span>
                  <a href={GITHUB} target="_blank" rel="noreferrer">
                    github.com/kwak317
                  </a>
                </li>
                <li>
                  <span>Service</span>
                  <a href="https://malhaebom.xyz/" target="_blank" rel="noreferrer">
                    malhaebom.xyz
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="wrap section" aria-labelledby="skills">
          <SectionTitle id="skills">SKILLS</SectionTitle>
          <div className="skills">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title} data-reveal>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li className="skill" key={item.name}>
                      <span className={`skill-mark tone-${item.tone}`} aria-hidden="true">
                        {item.mark}
                      </span>
                      <span>
                        <b>{item.name}</b>
                        <small>{item.text}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap section" aria-labelledby="project">
          <SectionTitle id="project">PROJECT</SectionTitle>
          <ProjectGrid projects={projects} />
        </section>

        <section className="wrap section contact" aria-labelledby="contact">
          <SectionTitle id="contact">CONTACT</SectionTitle>
          <p className="contact-big" data-reveal>
            함께 일할 기회를 찾고 있습니다.
          </p>
          <p className="contact-sub">채용, 협업, 포트폴리오 피드백 모두 편하게 연락해 주세요.</p>
          <a className="contact-email" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </section>
      </main>

      <footer className="footer">© 2026. HoJun Kwak. All rights reserved.</footer>
    </>
  );
}
