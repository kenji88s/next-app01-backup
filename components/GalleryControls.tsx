"use client";

/* アプリ内の定数・設定 */
import { THUMB_INCREMENT_COUNT } from "@/constants/config";

/* アプリ内フック・ロジック */
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useTagContext } from "@/contexts/TagContext";

/* スタイル */
import "@/styles/galleryControls.css";

/* ======================================================================================= */

/* ギャラリーの下の機能 */
export default function GalleryControls() {

  /* コンテキスト・フックからの分割代入 */
  const { visibleCount, setVisibleCount, filteredImages, visibleImages } = useImageGalleryContext();
  const { selectedTag, setSelectedTag } = useTagContext();

  return (
    <div className="gallery-controls">
      {selectedTag && visibleImages.length > 0 && (
          <>
            <p className="gallery-controls__tag-info">
              <span className="gallery-controls__tag-label">選択中のタグ:</span>{" "}
              <span className="gallery-controls__tag-value">{selectedTag}</span>
            </p>
            <button
              className="gallery-controls__clear-button btn--normal"
              onClick={() => setSelectedTag(null)}
            >
              タグをクリア
            </button>
          </>
      )}

      {visibleCount < filteredImages.length && (
        <div className="gallery-controls__load-more">
          <button
            className="gallery-controls__load-button btn--normal"
            onClick={() => setVisibleCount(visibleCount + THUMB_INCREMENT_COUNT)}
          >
            もっと見る
          </button>
        </div>
      )}
    </div>
  );
}
