"use client";

/* アプリ内フック・ロジック */
import { useTagEditorContext } from "@/contexts/TagEditorContext";
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";

/* コンポーネント */
import Loader from "@/components/Loader";

/* ======================================================================================= */

/* 画像拡大モーダルに配置するタグ編集エリア */
export default function TagEditor() {

  /* コンテキスト・フックからの分割代入 */
  const { showEditor, setShowEditor, tagInput, setTagInput, updateTags, isUpdating } = useTagEditorContext();
  const { selected, setSelected } = useImageGalleryContext();

  /* 関数の定義 */
  const handleSuccess = (updatedTags: string[]) => {
    if (!selected) return;
    setSelected({ ...selected, tags: updatedTags });
    setShowEditor(false);
  };

  /* 早期リターン */
  if (!selected || !showEditor) return null;
  /* ↑ 選択画像や編集機能が無効か解除になったら非表示 */

  return (
    <div className="tag-editor">
      <textarea
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        className="tag-editor__textarea"
        placeholder="#タグ1 #タグ2"
      />
      <div className="tag-editor__button-wrapper">
      <button
        className="tag-editor__button btn--normal"
        onClick={() => updateTags(selected.id, handleSuccess)}
      >
        更新
      </button>
      <button
        className="tag-editor__button btn--normal"
        onClick={() => setShowEditor(false)}
      >
        戻る
      </button>
      </div>
      {isUpdating && <div className="updating"><Loader /></div>}
    </div>
  );
}
