"use client";

/* アプリ内フック・ロジック */
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useTagContext } from "@/contexts/TagContext";
import { useTagEditorContext } from "@/contexts/TagEditorContext";

/* コンポーネント */
import TagButtons from "@/components/TagButtons";
import TagEditor from "@/components/TagEditor";
import CloseButton from "@/components/CloseButton";

/* スタイル */
import "@/styles/imageTagManager.css";

/* ======================================================================================= */

/* 画像拡大モーダル時のタグ管理ウィジェット */
export default function ImageTagManager() {
  
  /* コンテキスト・フックからの分割代入 */
  const { selected } = useImageGalleryContext();
  const { showTags, closeModal } = useTagContext();
  const { showEditor, setShowEditor } = useTagEditorContext();

  /* 関数の定義 */
  const handleClose = () => {
    setShowEditor(false);
    closeModal();
  };

  /* 早期リターン */
  if (!selected) return null;
  /* ↑ 選択画像が無効や解除になったら非表示 */

  /* アラートなど */
  if (!selected?.id) {
    alert('fileId が見つかりません');
    return;
  }

  return (
    <div className={`tag-controls ${showTags ? "fade-in" : "fade-out"}`}>
      <CloseButton clearSelection={handleClose} />
      <div className={`image-controls__tags ${!showEditor ? "show" : "hide"}`}>
        <TagButtons />
        <button
          className="image-controls__button--edit btn--normal"
          onClick={() => setShowEditor(true)}
        >
          タグを編集する
        </button>
      </div>
      <TagEditor />
    </div>
  );
}
