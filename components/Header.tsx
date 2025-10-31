"use client";

/*-- アプリ内の定数・設定 --*/
import { APPLICATION_NAME } from "@/constants/config";

/*-- アプリ内フック・ロジック --*/
import { useTagContext } from "@/contexts/TagContext";

/*-- コンポーネント --*/
import Navigation from "@/components/Navigation";
import Searcher from "@/components/Searcher";

/*-- スタイル・フォントなどのビジュアル設定 --*/
import { poppins } from "@/theme/font";
import "@/styles/header.css";

/* ======================================================================================= */

/* ヘッダー */
export default function Header() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { isFocused } = useTagContext();
  
  return (
    <header className="header">
      {/* スマホ時かつ検索欄にフォーカス[isFocused]で非表示 */}
      <h1
        className={`header__title ${poppins.className}`}
        data-state={`${isFocused ? "hidden" : "visible"}`}
      >
        {APPLICATION_NAME}
      </h1>
      
      <Searcher />
      <Navigation />
    </header>
  );
}