/*-- アプリ内フック・ロジック --*/
import { AppProviders } from "@/contexts/Providers";

/*-- スタイル・フォントなどのビジュアル設定 --*/
import { notoSansJP } from "@/theme/font";
import "@/styles/reset.css";

/* ======================================================================================= */

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
}

/* ======================================================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
