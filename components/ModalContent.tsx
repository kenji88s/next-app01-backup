"use client";

/* アプリ内フック・ロジック */
import { useModal } from "@/contexts/ModalContext";

/* コンポーネント */
import TaggedImagesUploader from "@/components/TaggedImagesUploader";
import TagList from "@/components/TagList";
import Infomation from "@/components/Infomation";

/* ======================================================================================= */

/* ナビゲーションボタンクリック時のモーダル */
export default function ModalContent() {

  /* コンテキスト・フックからの分割代入 */
  const { mode, closeModal } = useModal();
  
  /* 早期リターン */
  if (!mode) return null;
  /* ↑ モード（upload,tags,info）が無効・未設定もしくは解除になったら非表示 */

  return (
    <div className="overlay" onClick={() => closeModal()}>
      <TaggedImagesUploader />
      <TagList />
      <Infomation />     
    </div>
  );
}