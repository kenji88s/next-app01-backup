"use client";

/*-- アプリ内の定数・設定 --*/
import { APPLICATION_DESCRIPTION } from "@/constants/config";

/*-- アプリ内フック・ロジック --*/
import { useModalContext } from "@/contexts/ModalContext";

/*-- コンポーネント --*/
import CloseButton from "@/components/CloseButton";
import SwipeHandle from "@/components/SwipeHandle";

/*-- スタイル --*/
import "@/styles/infomation.css";

/* ======================================================================================= */

/* モーダルの中のインフォメーション */
export default function ModalContent() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { showModal, mode, closeModal } = useModalContext();

  /*-- 早期リターン --*/
  if (mode !== "#info") return null;
  /* ↑ モード[mode:#info]が無効もしくは解除で非表示 */

  return (

    /* [showModal]判定でフェードイン／アウト */
    <div
      className="about"
      data-state={`${showModal ? "fade-in" : "fade-out"}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Xボタン、モーダルを閉じる[closeModal] */}
      <CloseButton clickAction={() => closeModal()} />

      {/* 表示中[showModal]のみ有効、モーダルを閉じる[closeModal] */}
      <SwipeHandle showTarget={showModal} swipeAction={closeModal} />

      <h2 className="about__title">このアプリについて</h2>
      <p className="about__description">
        {APPLICATION_DESCRIPTION}
      </p>

      {/* モーダルを閉じる[closeModal] */}
      <button
        className="about__button btn--normal"
        onClick={() => closeModal()}
      >
        はじめる
      </button>
    </div>
  );
}