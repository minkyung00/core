// NOTE: 서버 렌더링 이슈 (Class extends value undefined is not a function or null)
"use client";

import Logger from "logger";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // NOTE: Logger Basic Usage
  Logger.init({
    product: "mobile",
    sellerId: 0,
    deviceId: 0,
    sentry: {
      dsn: "",
    },
    loki: {
      url: "/",
    },
  });

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
