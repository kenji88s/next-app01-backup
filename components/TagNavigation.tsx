/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";

/*-- ユーティリティ関数 --*/
import { getTags } from "@/utils/getAllTags";

/*-- フック関数 --*/
import { useDragScroll } from "@/hooks/useDragScroll";

/*-- スタイル --*/
import "@/styles/tagNavigation.css";

/* ======================================================================================= */

/* ヘッダーの下のタグボタン */
export default function TagNavigation() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { handleTagClick } = useImageGalleryContext();
  const { containerRef, handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove } = 
    useDragScroll();

  /*-- 関数などの定義・実行 --*/
  const tags = getTags();

  return (
    <>
      {tags.length > 0 && (
        <nav className="tag-navigation">
          <div
            className="tag-navigation__inner"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className="tag-navigation__list">
              {tags.map((tag, index) => (
                
                /* タグボタン[tag]、クリックで画像をタグ絞込[handleTagClick(tag)] */
                <button
                  key={index}
                  className="tag-navigation__button"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
