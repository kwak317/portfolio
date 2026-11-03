import type { Metadata } from "next";
import { DemoApp } from "./DemoApp";
import "./demo.css";

export const metadata: Metadata = {
  title: "말해봄 Mk.2 체험판 | 곽호준 포트폴리오",
  description:
    "로그인이나 준비 자료 없이 말해봄 Mk.2의 전체 흐름(NCS 자기점검, README·이력서 분석, 공고 추천, 답변 녹음·STT, 코칭, 재답변 비교, 이력서 초안)을 샘플 자료로 체험합니다.",
};

export default function MalhaebomDemoPage() {
  return <DemoApp />;
}
