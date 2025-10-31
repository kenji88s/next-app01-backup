"use client";

/*-- アプリ内フック・ロジック --*/
import { useModalContext } from "@/contexts/ModalContext";

/*-- コンポーネント --*/
import TaggedImagesUploader from "@/components/TaggedImagesUploader";
import TagList from "@/components/TagList";
import Infomation from "@/components/Infomation";

/* ======================================================================================= */

/* ナビゲーションボタンクリック時のモーダル */
export default function ModalContent() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { mode, closeModal } = useModalContext();
  
  /*-- 早期リターン --*/
  if (!mode) return null;
  /* ↑ モード[mode（upload,tags,info）]が無効・未設定もしくは解除で非表示 */

  return (
    /* オーバーレイ、クリックでモーダルを閉じる[closeModal] */
    <div
      className="overlay"
      onClick={() => closeModal()}
    >
      <TaggedImagesUploader />
      <TagList />
      <Infomation />     
    </div>
  );
}