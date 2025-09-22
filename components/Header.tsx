"use client";

/* React組み込みフック */
import { useState } from "react";

/* アプリ内の定数・設定 */
import { APPLICATION_NAME } from "@/constants/config";

/* コンポーネント */
import Navigation from "@/components/Navigation";
import Searcher from "@/components/Searcher";

/* スタイル・フォントなどのビジュアル設定 */
import { poppins } from "@/theme/font";
import "@/styles/header.css";

/* ======================================================================================= */

/* ヘッダー */
export default function Header() {

  /* 状態管理の定義 */
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="header">
      <h1 className={`header__title ${poppins.className} ${isFocused ? "sp_hidden" : ""}`}>
        {APPLICATION_NAME}
      </h1>
      <Searcher isFocused={isFocused} setIsFocused={setIsFocused} />
      <Navigation />
    </header>
  );
}