/* アプリ内フック・ロジック */
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useModal } from "@/contexts/ModalContext";

/* フック関数 */
import { useSearchedTags } from "@/hooks/useSearchedTags";

/* スタイル */
import "@/styles/tagSearchInput.css";

/* ======================================================================================= */

/* 検索フォームの下に配置するタグリスト */
export default function TagSearchInput() {
  
  /* コンテキスト・フックからの分割代入 */
  const { handleTagClick } = useImageGalleryContext();
  const { closeModal } = useModal();

  /* カスタムフックでタグ検索結果を取得 */
  const searchedList = useSearchedTags();

  return (
    <>
      {searchedList.length > 0 && (
        <ul className="tag-search__list">
          {searchedList.map((item, index) => (
            <li key={index} className="tag-search__item">
              <button
                className="tag-search__btn"
                onClick={() => {
                  handleTagClick(item.tag);
                  closeModal();
              }}>
                <span className="tag-search__image-wrapper">
                  <img 
                    className="tag-search__image"
                    src={item.image}
                    alt={`${item.tag}の画像`}
                  />
                </span>
                <span className="tag-search__tag-wrapper">
                  {item.tag}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}