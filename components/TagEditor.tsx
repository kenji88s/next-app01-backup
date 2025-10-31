"use client";

/*-- アプリ内フック・ロジック --*/
import { useTagEditorContext } from "@/contexts/TagEditorContext";
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";

/*-- コンポーネント --*/
import LoadingArea from "@/components/LoadingArea";

/* ======================================================================================= */

/* 画像拡大モーダルに配置するタグ編集エリア */
export default function TagEditor() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { selectedImage, setSelectedImage } = useImageGalleryContext();
  const { showEditor, setShowEditor, tagInput, setTagInput, updateTags, isUpdating } 
  = useTagEditorContext();

  /*-- 関数などの定義・実行 --*/
  const handleSuccess = (updatedTags: string[]) => {
    if (!selectedImage) return;
    setSelectedImage({ ...selectedImage, tags: updatedTags });
    setShowEditor(false);
  };

  /*-- 早期リターン --*/
  if (!selectedImage || !showEditor) return null;
  /* ↑ 選択画像[!selectedImage]や編集機能[!showEditor]が無効か解除で非表示 */

  return (
    <div className="tag-editor">
      
      {/* 入力欄、設定タグ[tagInput]をデフォルト値、入力で更新[setTagInput] */}
      <textarea
        className="tag-editor__textarea"
        value={tagInput}
        placeholder="#タグ1 #タグ2"
        onChange={(e) => setTagInput(e.target.value)}
      />
      <div className="tag-editor__button-wrapper">

        {/* タグ更新機能[updateTags] */}
        <button
          className="tag-editor__button btn--normal"
          onClick={() => updateTags(selectedImage.id, handleSuccess)}
        >
          更新
        </button>

        {/* タグ編集機能非表示[setShowEditor(false)] */}
        <button
          className="tag-editor__button btn--normal"
          onClick={() => setShowEditor(false)}
        >
          戻る
        </button>
      </div>

      {/* タグ更新中[isUpdating]はアニメーションを表示 */}
      <LoadingArea
        dataPlace="tag-editor"
        isProcessing={isUpdating}
      />
    </div>
  );
}
