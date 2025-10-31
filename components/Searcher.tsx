/*-- React組み込みフック --*/
import { useRef } from "react";

/*-- アプリ内フック・ロジック --*/
import { useTagContext } from "@/contexts/TagContext";
import { useToastContext } from "@/contexts/ToastContext";

/*-- コンポーネント --*/
import TagSearchInput from "@/components/TagSearchInput";
import CloseButton from "@/components/CloseButton";
import IconSearch from "@/components/IconSearch";

/*-- スタイル --*/
import "@/styles/searcher.css";

/* ======================================================================================= */

/* 検索フォーム */
export default function Searcher() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { closeToast } = useToastContext();
  const { selectedTag, setSelectedTag, setIsFocused } = useTagContext();
  
  /*-- 関数などの定義・実行 --*/
  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="searcher">
      <div className="searcher__inner">
        <div className="searcher__form">

          {/* 入力で更新[setSelectedTag] */}
          <input
            className="searcher__input"
            type="text"
            ref={inputRef}
            /* アクセス時は空欄、タグ選択[selectedTag]でタグ名をセット */
            value={selectedTag ?? ""}
            
            placeholder="ハッシュタグを入力"
            
            /* エンターキーでブラー処理[handleKeyDow] */
            onKeyDown={handleKeyDown}
            /* 入力で更新[setSelectedTag] */
            onChange={(e) => setSelectedTag(e.target.value)}
            /* トーストを閉じる[closeToast]、タグ検索結果表示[setIsFocused(true)]で */
            onFocus={() => {
              closeToast();
              setIsFocused(true);
            }}
            /* 遅延で入力欄ブラー処理[setIsFocused(false)] */
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 200);
            }}
          />
          
          <div className="searcher__icon">
            <IconSearch />
          </div>
          
          {/* タグ選択中やタグ検索時[selectedTag]に表示 */}
          {selectedTag && (
            <div className="searcher__reset-wrapper">

              {/* 入力値をリセット[setSelectedTag(null)] */}
              <CloseButton
                dataPlace="searcher"
                clickAction={() => setSelectedTag(null)}
              />
            </div>
          )}
        </div>
        <TagSearchInput />
      </div>
    </div>
  );
  
}
