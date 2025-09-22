"use client";

/* React組み込みフック */
import { useEffect } from "react";

/* Next.js組み込み */
import Link from "next/link";

/* アプリ内の定数・設定 */
import { DEFAULT_MODAL_MODE, DEFAULT_MODAL_HIDE_TIMES } from "@/constants/config";
import Feature from "@/constants/feature";

/* アプリ内フック・ロジック */
import { useModal } from "@/contexts/ModalContext";

/* コンポーネント */
import IconChoice from "@/components/IconChoice";

/* スタイル */
import "@/styles/navigation.css";

/* ======================================================================================= */

/* グローバルナビゲーション */
export default function Gnavi() {

  /* コンテキスト・フックからの分割代入 */
  const { openModal } = useModal();

  /* レンダリング後の処理 */
  useEffect(() => {
    if (DEFAULT_MODAL_MODE !== "") {
      const lastShown = localStorage.getItem("ModalLastShown");
      const now = Date.now();
      const modalHideDurationMs = DEFAULT_MODAL_HIDE_TIMES * 60 * 1000;

      if (!lastShown || now - Number(lastShown) > modalHideDurationMs) {
        // 初回 or 30時間経過後のリロード時に自動表示
        openModal(DEFAULT_MODAL_MODE);
        localStorage.setItem("ModalLastShown", String(now));
      }
      // 30時間以内なら自動表示しない（ボタンでのみ表示可能）
    };
  }, [openModal]);

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {Object.values(Feature.contents).map((btn, index) =>
          btn.visible && (
            <li className="navigation__item" key={index}>
              <Link
                href="#"
                className="navigation__link"
                onClick={(e) => {
                  e.preventDefault();
                  openModal(btn.href);
                }}
              >
                <IconChoice title={btn.title} />
                <span className="navigation__label">{btn.label}</span>
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );  
}
