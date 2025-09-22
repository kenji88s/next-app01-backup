"use client";

/* React組み込みフック */
import { createContext, useContext, useState, ReactNode } from "react";

/* アプリ内フック・ロジック */
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";

/* ======================================================================================= */

/* コンテキストで扱う値の型を定義 */
type TagEditorContextType = {
  showEditor: boolean;
  setShowEditor: (value: boolean) => void;
  /* ↑ タグ編集画面の表示／非表示 */
  tagInput: string;
  setTagInput: (val: string) => void;
  /* ↑ 編集画面のタグの入力状態 */
  initializeTags: (tags: string[] | string) => void;
  /* ↑ タグを整形する処理（スペース区切り） */
  updateTags: (imageId: string, onSuccess: (tags: string[]) => void) => void;
  /* ↑ タグ更新処理（API送信含む）*/
  isUpdating: boolean;
  setIsUpdating: (value: boolean) => void;
  /* ↑ タグ更新中（ローディングアニメーション表示） */
};

/* ======================================================================================= */

/* コンテキストの作成 */
const TagEditorContext = createContext<TagEditorContextType | undefined>(undefined);

/* ======================================================================================= */

/* プロバイダーコンポーネント（グローバルに状態を共有するための「囲い」） */
export const TagEditorProvider = ({ children }: { children: ReactNode }) => {

  /* 状態管理の定義 */
  const [showEditor, setShowEditor] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [tagInput, setTagInput] = useState(""); // タグ入力用のステート

  /* コンテキスト・フックからの分割代入 */
  const { fetchImages } = useImageGalleryContext();

  // 初期タグのセット（配列ならスペース区切りの文字列に変換）
  const initializeTags = (tags: string[] | string) => {
    const str = Array.isArray(tags) ? tags.join(" ") : tags || "";
    setTagInput(str);
  };

  // タグの更新処理（APIにPUT送信し、成功時にコールバックを実行）
  const updateTags = async (
    imageId: string,
    onSuccess: (tags: string[]) => void
  ) => {
    const tagArray = tagInput
      .split(" ")
      .map((t) => t.trim())
      .filter(Boolean); // 空白除去

    try {
      setIsUpdating(true);
      const res = await fetch("/api/sheet/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: imageId, newTags: tagInput }),
      });

      if (!res.ok) throw new Error("更新失敗");

      await fetchImages();

      onSuccess(tagArray); // 成功時にコールバックに整形済タグを渡す
    } catch (err) {
      console.error("タグ更新失敗", err);
      alert("タグの更新に失敗しました");
    } finally {
      setTimeout(() => {
        setIsUpdating(false);
      }, 300);
    }
  };

  /* 子コンポーネントに選択状態と更新関数を提供 */
  return (
    <TagEditorContext.Provider
      value={{
        showEditor,
        setShowEditor,
        tagInput,
        setTagInput,
        initializeTags,
        updateTags,
        isUpdating,
        setIsUpdating
      }}
    >
      {children}
    </TagEditorContext.Provider>
  );
};


/* ======================================================================================= */

/* コンテキストを使用するためのカスタムフック */
export const useTagEditorContext = () => {
  const context = useContext(TagEditorContext);
  if (!context) {
    throw new Error("useTagEditorContext must be used within a TagEditorProvider");
  }
  return context;
  /* ↑ プロバイダーの外で使われた場合はエラーを出す（開発者への警告） */
};
