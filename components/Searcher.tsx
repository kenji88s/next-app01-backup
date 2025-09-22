/* React組み込みフック */
import { useRef } from "react";

/* アプリ内フック・ロジック */
import { useTagContext } from "@/contexts/TagContext";

/* コンポーネント */
import TagSearchInput from "@/components/TagSearchInput";
import IconSearch from "@/components/IconSearch";

/* スタイル */
import "@/styles/searcher.css";

/* ======================================================================================= */

/* 親コンポーネントから渡されるプロパティの型定義 */
type Props = {
  isFocused: boolean; 
  /* ↑ 検索フォームにフォーカスしてるか */
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  /* ↑ フォーカス状態を更新する関数 */
};

/* ======================================================================================= */

/* 検索フォーム */
export default function Searcher({ isFocused, setIsFocused }: Props) {

  /* コンテキスト・フックからの分割代入 */
  const { selectedTag, setSelectedTag } = useTagContext();
  
  /* 関数の定義 */
  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="searcher">
      <div className="searcher__form">
        <div className="searcher__input-area">
          <input
            type="text"
            value={selectedTag ?? ""}
            placeholder="ハッシュタグを入力"
            className="searcher__input"
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSelectedTag(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 200);
            }}
          />
          <div className="searcher__icon">
            <IconSearch />
          </div>
        </div>
        {isFocused && <TagSearchInput />} {/* この中でもBEMを使うなら searcher__tag-list */}
      </div>
    </div>
  );
  
}
