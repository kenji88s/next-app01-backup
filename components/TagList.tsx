"use client";

/* アプリ内フック・ロジック */
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useModal } from "@/contexts/ModalContext";

/* ユーティリティ関数 */
import { getTags } from "@/utils/getAllTags";

/* コンポーネント */
import CloseButton from "@/components/CloseButton";
import DragHandle from "@/components/DragHandle";

/* スタイル */
import "@/styles/tagList.css";

/* ======================================================================================= */

/* モーダルの中のタグリスト */
export default function TagList() {

  /* コンテキスト・フックからの分割代入 */
  const { handleTagClick } = useImageGalleryContext();
  const { isOpen, mode, closeModal } = useModal();

  /* 早期リターン */
  if (mode !== "#tags") return null;
  /* ↑ モード（tags）が無効もしくは解除になったら非表示 */

  /* 全タグ取得後、五十音順にソート */
  const tags = getTags();
  const sortedTags = [...tags].sort((a, b) => a.localeCompare(b, "ja"));

  return (
    <div 
      className={`tag-list ${isOpen ? "fade-in" : "fade-out"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseButton />
      <DragHandle isOpen={isOpen} closeModal={closeModal} />
      {sortedTags.length > 0 && (
        <ul className="tag-list__list">
          {sortedTags.map((tag, index) => (
            <li key={index} className="tag-list__item">
              <button
                className="tag-list__btn"
                onClick={() => {
                  handleTagClick(tag);
                  closeModal();
                }}>
                {tag}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}