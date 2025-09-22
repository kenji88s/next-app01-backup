"use client";

/* React組み込みフック */
import { createContext, useContext, useState, ReactNode } from "react";

/* ======================================================================================= */

/* コンテキストで扱う値の型を定義 */
type TagContextType = {
  showTags: boolean;
  setShowTags: (value: boolean | ((prev: boolean) => boolean)) => void;
  /* ↑ モーダル画像のタグ一覧の表示／非表示 */
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  /* ↑ 選択中のタグ */
  openModal: (options?: { fadeIn?: boolean; duration?: number }) => void;
  /* ↑ モーダル画像のタグ一覧表示エフェクト */
  closeModal: (options?: { fadeIn?: boolean; duration?: number }) => void;
  /* ↑ モーダル画像のタグ一覧非表示エフェクト */
};

/* ======================================================================================= */

/* コンテキストの作成 */
const TagContext = createContext<TagContextType | undefined>(undefined);

/* ======================================================================================= */

/* プロバイダーコンポーネント（グローバルに状態を共有するための「囲い」） */
export const TagProvider = ({ children }: { children: ReactNode }) => {

  /* 状態管理の定義 */
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // モーダルを開く関数（モードを指定して開く）
  const openModal = (
    options?: { fadeIn?: boolean; duration?: number }
  ) => {
    if (options?.fadeIn !== false) {
      setTimeout(() => {
        setShowTags(true);
      }, options?.duration ?? 300);
    }
  };

  // モーダルを閉じる関数（開閉状態とモードを初期化）
  const closeModal = (
    options?: { fadeIn?: boolean; duration?: number }
  ) => {
    if (options?.fadeIn !== false) {
      setShowTags(false);
      setTimeout(() => {
      }, options?.duration ?? 500);
    } else {
      setShowTags(false);
    }
  };

  /* 子コンポーネントに選択状態と更新関数を提供 */
  return (
    <TagContext.Provider
      value={{
        showTags,
        setShowTags,
        selectedTag,
        setSelectedTag,
        openModal,
        closeModal
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

/* ======================================================================================= */

/* コンテキストを使用するためのカスタムフック */
export const useTagContext = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTagContext must be used within a TagProvider");
  }
  return context;
  /* ↑ プロバイダーの外で使われた場合はエラーを出す（開発者への警告） */
};
