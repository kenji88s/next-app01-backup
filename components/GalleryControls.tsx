"use client";

/*-- アプリ内の定数・設定 --*/
import { THUMB_INCREMENT_COUNT } from "@/constants/config";

/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useTagContext } from "@/contexts/TagContext";

/*-- コンポーネント --*/
import CloseButton from "@/components/CloseButton";

/*-- スタイル --*/
import "@/styles/galleryControls.css";

/* ======================================================================================= */

/* ギャラリーの操作ボタン・情報エリア */
export default function GalleryControls() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { visibleCount, setVisibleCount, filteredImages } = useImageGalleryContext();
  const { selectedTag, setSelectedTag, setIsFocused } = useTagContext();

  return (
    <div className="gallery-controls">

      {/* タグ選択中やタグ検索時[selectedTag]に表示 */}
      {selectedTag && (
        <p className="gallery-controls__tag-info">
          
          <span className="gallery-controls__tag-label">選択中のタグ:</span>

          {/* 選択中のタグもしくは検索欄の値 */}
          <span className="gallery-controls__tag-value">
            {selectedTag}
          </span>

          {/* タグリセットボタン[setSelectedTag(null)]、 検索欄のブラー処理[setIsFocused(false)] */}
          <CloseButton
            dataPlace="gallery"
            clickAction={() => {
              setSelectedTag(null)
              setIsFocused(false)
            }}
          />
        </p>
      )}

      {/* 現在表示数[visibleCount]＜タグ絞込数[filteredImages]で表示 */}
      {visibleCount < filteredImages.length && (
        <div className="gallery-controls__load-wrapper">

          {/* 現在表示数＋追加数[THUMB_INCREMENT_COUNT]をセット[setVisibleCount] */}
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
