"use client";

/* アプリ内フック・ロジック */
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";

/* ======================================================================================= */

/* 画像拡大モーダルに配置するタグボタン */
export default function TagButtons() {

  /* コンテキスト・フックからの分割代入 */
  const { selected, setSelected, handleTagClick } = useImageGalleryContext();

  /* 早期リターン */
  if (!selected) return null;
  /* ↑ 選択画像が無効や解除になったら非表示 */
  if (!Array.isArray(selected.tags) || selected.tags.length === 0) return null;
  /* ↑ 画像にタグが未設定の場合は非表示 */

  return (
    <div className="image-tags">
      {selected.tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => {
            handleTagClick(tag);
            setSelected(null);
          }}
          className="image-tags__button"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}