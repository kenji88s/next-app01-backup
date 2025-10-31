/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useModalContext } from "@/contexts/ModalContext";
import { useTagContext } from "@/contexts/TagContext";

/*-- フック関数 --*/
import { useSearchedTags } from "@/hooks/useSearchedTags";

/*-- スタイル --*/
import "@/styles/tagSearchInput.css";

/* ======================================================================================= */

/* 検索フォームの下に配置するタグリスト */
export default function TagSearchInput() {
  
  /*-- コンテキスト・フックからの分割代入 --*/
  const { handleTagClick } = useImageGalleryContext();
  const { closeModal } = useModalContext();
  const { isFocused } = useTagContext();

  /*-- 関数などの定義・実行 --*/
  /* タグ検索結果を取得 */
  const searchedList = useSearchedTags();

  /*-- 早期リターン --*/
  if (!isFocused) return null;
  /* ↑ 検索フォームのフォーカス解除[!isFocused)]で非表示 */


  return (
    <>
      {/* タグ検索結果[searchedList]が1件以上で表示 */}
      {searchedList.length > 0 && (
        <ul className="tag-search__list">
          {searchedList.map((item, index) => (
            <li
              key={index}
              className="tag-search__item"
            >
              {/* 画像をタグ絞込[handleTagClick(item.tag)]、モーダル閉じる[closeModal] */}
              <button
                className="tag-search__button"
                onClick={() => {
                  handleTagClick(item.tag);
                  closeModal();
                }}
              >
                <span className="tag-search__image-wrapper">
                  {/* タグの該当する画像をランダム表示 */}
                  <img 
                    className="tag-search__image"
                    src={item.image}
                    alt={`${item.tag}の画像`}
                  />
                </span>

                {/* 先頭一致のタグを表示 */}
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