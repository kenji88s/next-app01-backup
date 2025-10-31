/*-- コンポーネント --*/
import IconRefresh from "@/components/IconRefresh";

/*-- スタイル --*/
import "@/styles/reloadButton.css";

/* ======================================================================================= */

/* フローティングの再読み込みボタン */
export default function ReloadButton() {
  return (
    /* クリックで画面リフレッシュ */
    <button
      className="reload-button"
      onClick={() => window.location.reload()}
    >
      <IconRefresh />
    </button>
  );
}
