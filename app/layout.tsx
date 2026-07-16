import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Service Builder | 곽호준",
  description:
    "AI에 의존하기보다 AI를 효율적으로 활용해 실제 작동하는 서비스를 만드는 곽호준의 포트폴리오.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
