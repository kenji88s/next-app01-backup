"use client";

/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useTagContext } from "@/contexts/TagContext";
import { useTagEditorContext } from "@/contexts/TagEditorContext";
import { useToastContext } from "@/contexts/ToastContext";

/*-- コンポーネント --*/
import TagButtons from "@/components/TagButtons";
import TagEditor from "@/components/TagEditor";
import CloseButton from "@/components/CloseButton";

/*-- スタイル --*/
import "@/styles/imageTagManager.css";

/* ======================================================================================= */

/* 画像拡大モーダル時のタグ管理ウィジェット */
export default function ImageTagManager() {
  
  /*-- コンテキスト・フックからの分割代入 --*/
  const { selectedImage } = useImageGalleryContext();
  const { showTags, closeTags } = useTagContext();
  const { showEditor, setShowEditor } = useTagEditorContext();
  const { setToast } = useToastContext();

  /*-- 早期リターン --*/
  if (!selectedImage) return null;
  /* ↑ 選択画像が無効や解除[!selectedImage]で非表示 */

  /*-- トースト通知 --*/
  if (!selectedImage?.id) {
    setToast('画像IDが見つかりません', 'error');
    return;
  }

  return (
    /* [showTags]判定でフェードイン／アウト */
    <div
      className="tag-controls"
      data-state={`${showTags ? "fade-in" : "fade-out"}`}
    >

      {/* Xボタン、タグ編集[setShowEditor(false)]・ウィジェット[closeTags]非表示*/}
      <CloseButton
        dataPlace="tag-controls"
        clickAction={() => {
          setShowEditor(false);
          closeTags();
        }}
      />

      {/* [showEditor]判定でタグ編集表示／非表示 */}
      <div
        className="tag-controls__content"
        data-state={`${!showEditor ? "show" : "hidden"}`}
      >
        <TagButtons />
        
        {/* タグ編集機能を表示[setShowEditor(true)] */}
        <button
          className="tag-controls__edit-button btn--normal"
          onClick={() => setShowEditor(true)}
        >
          タグを編集する
        </button>
      </div>
      <TagEditor />
    </div>
  );
}
