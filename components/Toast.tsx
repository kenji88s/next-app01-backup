/*-- アプリ内フック・ロジック --*/
import { useToastContext } from "@/contexts/ToastContext";

/*-- フック関数 --*/
import { useSwipeClose } from "@/hooks/useSwipeClose";

/*-- コンポーネント --*/
import CloseButton from "@/components/CloseButton";

/*-- スタイル --*/
import "@/styles/toast.css";

/* ======================================================================================= */

/*-- トースト通知 --*/
export default function Toast() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { showToast, message, type, closeToast } = useToastContext();

  /*-- フックからの分割代入（引数有り） --*/
  const { startY, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipeClose({
      showTarget: showToast,
      swipeAction: closeToast,
      direction: "up",
      threshold: 30,
    });

  /*-- 早期リターン --*/
  if (!message) return null;
  /* ↑ アラートメッセージ無効[!message]で非表示 */

  return (
    /* [showToast]判定でフェードイン／アウト */
    <div
      className="toast"
      data-state={`${showToast ? "fade-in" : "fade-out"}`}
      data-type={type}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transition: startY === null ? "transform 0.2s ease" : "none",
      }}
    >
      {/* トーストを閉じる[closeToast] */}
      <CloseButton clickAction={closeToast} />

      {/* トーストを通知の文言[message] */}
      <div className="toast-container">
        {message}
      </div>
    </div>
  );
}
