/*-- Next.js組み込み --*/
import Link from "next/link";

/*-- アプリ内の定数・設定 --*/
import Feature from "@/constants/feature";

/*-- アプリ内フック・ロジック --*/
import { useModalContext } from "@/contexts/ModalContext";
import { useToastContext } from "@/contexts/ToastContext";

/*-- コンポーネント --*/
import IconChoice from "@/components/IconChoice";

/*-- スタイル --*/
import "@/styles/navigation.css";

/* ======================================================================================= */

/* グローバルナビゲーション */
export default function Gnavi() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { openModal } = useModalContext();
  const { closeToast } = useToastContext();

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {Object.values(Feature.contents).map((btn, index) =>
          btn.visible && (
            <li
              key={index}
              className="navigation__item"
            >
              {/* モーダルを開く[openModal(btn.href)]、トーストを閉じる[closeToast] */}
              <Link
                className="navigation__link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openModal(btn.href);
                  closeToast();
                }}
              >
                {/* アイコンをタイトル[btn.title]で選択 */}
                <IconChoice title={btn.title} />

                {/* 機能一覧[Feature]から日本語ラベル[btn.label]を出力 */}
                <span className="navigation__label">
                  {btn.label}
                </span>
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );  
}
