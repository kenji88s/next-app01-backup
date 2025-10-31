"use client";

/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";

/* ======================================================================================= */

/* 画像拡大モーダルに配置するタグボタン */
export default function TagButtons() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { selectedImage, setSelectedImage, handleTagClick } = useImageGalleryContext();

  /*-- 早期リターン --*/
  if (!selectedImage) return null;
  /* ↑ 選択画像が無効や解除[!selectedImage]で非表示 */
  if (!Array.isArray(selectedImage.tags) || selectedImage.tags.length === 0) return null;
  /* ↑ 画像にタグ[selectedImage.tags]が未設定の場合は非表示 */

  return (
    <div className="image-tags">
      
      {/* 空文字[selectedImage.tags[0]]の場合以外に表示 */}
      {selectedImage.tags[0] !== "" ? (
        selectedImage.tags.map((tag, index) => (

          /* 画像をタグ絞込[handleTagClick(tag)]、拡大モーダル閉じる[setSelectedImage(null)] */
          <button
            className="image-tags__button"
            key={index}
            onClick={() => {
              handleTagClick(tag);
              setSelectedImage(null);
            }}
          >
            {tag}
          </button>
        ))
      ) : (
        /* タグが無いときに表示 */
        <span className="image-tags__empty">タグがありません</span>
      )}
    </div>
  );
}