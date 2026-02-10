import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Layout from "@/components/layout/Layout";

const pretendard = localFont({
    src: '../../public/fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: "블로그 글 AI로 생성",
  description: "블로그 글 AI 생성",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={`${pretendard.className} dark:bg-zinc-900 dark:text-white bg-[#f6f7f9]`}>
        <Layout>
            {children}
        </Layout>
      </body>
    </html>
  );
}
