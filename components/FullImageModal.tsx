"use client";

/* React組み込みフック */
import { useEffect } from "react";

/* アプリ内フック・ロジック */
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useTagContext } from "@/contexts/TagContext";
import { useTagEditorContext } from "@/contexts/TagEditorContext";

/* コンポーネント */
import ImageTagManager from "@/components/ImageTagManager";
import FullImageControls from "@/components/FullImageControls";
import CloseButton from "@/components/CloseButton";
import DragHandle from "@/components/DragHandle";

/* スタイル */
import "@/styles/fullImageModal.css";

/* ======================================================================================= */

/* 画像拡大モーダル */
export default function FullImageModal() {

  /* コンテキスト・フックからの分割代入 */
  const { isOpen, setIsOpen, selected, setSelected } = useImageGalleryContext();
  const { setShowTags } = useTagContext();
  const { setShowEditor } = useTagEditorContext();

  /* 関数の定義 */
  const clearSelection = () => {
    setIsOpen(false);
    setShowEditor(false);
    setShowTags(false);
    setTimeout(() => setSelected(null), 500);
  };

  /* レンダリング後の処理 */
  useEffect(() => {
    if (selected) {
      const timer = setTimeout(() => setIsOpen(true), 300);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  useEffect(() => {
    if (selected && !selected.id) {
      alert("fileId が見つかりません");
    }
  }, [selected]);

  /* 早期リターン */
  if (!selected) return null;
  /* ↑ 選択画像が無効や解除になったら非表示 */

  return (
    <div
      className="full-image" onClick={clearSelection}>
      <div
        className={`full-image__wrap ${isOpen ? "fade-in" : "fade-out"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton clearSelection={clearSelection} />
        <DragHandle isOpen={isOpen} closeModal={clearSelection} />
        <div className="full-image__image-wrapper" onClick={(e) => e.stopPropagation()}>
          <img
            src={selected.url}
            alt="拡大画像"
            className="full-image__image"
          />
        </div>

        <ImageTagManager />
        <FullImageControls />
      </div>
    </div>
  );
}
