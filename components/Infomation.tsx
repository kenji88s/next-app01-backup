"use client";

/* アプリ内の定数・設定 */
import { APPLICATION_DESCRIPTION } from "@/constants/config";

/* アプリ内フック・ロジック */
import { useModal } from "@/contexts/ModalContext";

/* コンポーネント */
import CloseButton from "@/components/CloseButton";
import DragHandle from "@/components/DragHandle";

/* スタイル */
import "@/styles/infomation.css";

/* ======================================================================================= */

/* モーダルの中のインフォメーション */
export default function ModalContent() {

  /* コンテキスト・フックからの分割代入 */
  const { isOpen, mode, closeModal } = useModal();

  /* 早期リターン */
  if (mode !== "#info") return null;
  /* ↑ モード（info）が無効もしくは解除になったら非表示 */

  return (
    <div
      className={`about ${isOpen ? "fade-in" : "fade-out"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseButton />
      <DragHandle isOpen={isOpen} closeModal={closeModal} />
      <h2 className="about__title">このアプリについて</h2>
      <p className="about__description">{APPLICATION_DESCRIPTION}</p>
      <button className="about__button btn--normal" onClick={() => closeModal()}>
        はじめる
      </button>
    </div>
  );
}