import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "곽호준 | AI 서비스 개발자 포트폴리오",
  description:
    "AI를 효율적으로 활용해 실제 작동하는 서비스를 만드는 곽호준의 포트폴리오. AI 면접 코칭 에이전트 말해봄.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
