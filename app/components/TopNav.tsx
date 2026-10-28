"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "ABOUT" },
  { id: "strengths", label: "STRENGTHS" },
  { id: "skills", label: "SKILLS" },
  { id: "project", label: "PROJECT" },
  { id: "contact", label: "CONTACT" },
];

export function TopNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
      else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4)
        setActive("contact");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className="topnav" aria-label="주요 메뉴">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={active === section.id ? "true" : undefined}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
