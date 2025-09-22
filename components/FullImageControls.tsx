"use client";

/* React組み込みフック */
import { useEffect } from "react";

/* アプリ内フック・ロジック */
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useTagEditorContext } from "@/contexts/TagEditorContext";
import { useTagContext } from "@/contexts/TagContext";

/* フック関数 */
import { useFileDelete } from "@/hooks/useFileDelete";

/* コンポーネント */
import IconDownload from "@/components/IconDownload";
import IconHash from "@/components/IconHash";
import IconDelete from "@/components/IconDelete";

/* スタイル */
import "@/styles/fullImageControls.css";

/* ======================================================================================= */

/* 画像拡大モーダル */
export default function FullImageControls() {

  /* コンテキスト・フックからの分割代入 */
  const { selected } = useImageGalleryContext();
  const { showTags, openModal, closeModal } = useTagContext();
  const { showEditor, initializeTags } = useTagEditorContext();
  const { handleDelete } = useFileDelete();

  /* レンダリング後の処理 */
  useEffect(() => {
    if (selected && !showEditor) {
      initializeTags(selected.tags);
    }
  }, [selected, showEditor, initializeTags]);

  /* 早期リターン */
  if (!selected) return null;
  /* ↑ 選択画像が無効や解除になったら非表示 */

  return (
    <div className="image-controls">
      <div className="image-controls__icons">
        <a href={selected.url} download className="image-controls__button">
          <IconDownload />
        </a>

        <button
          className="image-controls__button"
          onClick={() => {
            if (showTags) {
              closeModal({ fadeIn: true, duration: 300 });
            } else {
              openModal({ fadeIn: true, duration: 300 });
            }
          }}
        >
          <IconHash />
        </button>

        <button
          className="image-controls__button"
          onClick={() => handleDelete(selected.id)}
        >
          <IconDelete />
        </button>
      </div>
    </div>
  );
}
