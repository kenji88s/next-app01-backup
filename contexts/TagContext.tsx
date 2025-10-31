"use client";

/*-- React組み込みフック --*/
import { createContext, useContext, useState, ReactNode } from "react";

/* ======================================================================================= */

/*-- コンテキストで扱う値の型を定義 --*/
type TagContextType = {
  showTags: boolean; //モーダル画像のタグ一覧の表示／非表示
  setShowTags: (value: boolean | ((prev: boolean) => boolean))
    => void; //表示／非表示の切替
  selectedTag: string | null; //選択中のタグ
  setSelectedTag: (tag: string | null) => void; //選択タグの更新
  isFocused: boolean; //検索フォームにフォーカスしてるか
  setIsFocused: (value: boolean) => void; //フォーカスの切替
  openTags: (options?: { fadeIn?: boolean; duration?: number }) 
    => void; //タグ一覧表示エフェクト
  closeTags: (options?: { fadeIn?: boolean; duration?: number }) 
    => void; //タグ一覧非表示エフェクト
};

/* ======================================================================================= */

/*-- コンテキストの作成 --*/
const TagContext = createContext<TagContextType | undefined>(undefined);

/* ======================================================================================= */

/*-- プロバイダーコンポーネント（グローバルに状態を共有するための「囲い」） --*/
export const TagProvider = ({ children }: { children: ReactNode }) => {

  /*-- 状態管理の定義 --*/
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  /*-- 関数などの定義・実行 --*/
  // モーダルを開く関数（モードを指定して開く）
  const openTags = (
    options?: { fadeIn?: boolean; duration?: number }
  ) => {
    if (options?.fadeIn !== false) {
      setTimeout(() => {
        setShowTags(true);
      }, options?.duration ?? 300);
    }
  };

  // モーダルを閉じる関数（開閉状態とモードを初期化）
  const closeTags = (
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

  /*-- 子コンポーネントに選択状態と更新関数を提供 --*/
  return (
    <TagContext.Provider
      value={{
        showTags,
        setShowTags,
        selectedTag,
        setSelectedTag,
        isFocused,
        setIsFocused,
        openTags,
        closeTags
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

/* ======================================================================================= */

/*-- コンテキストを使用するためのカスタムフック --*/
export const useTagContext = (): TagContextType => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTagContext must be used within a TagProvider");
  }
  return context;
  /* ↑ プロバイダーの外で使われた場合はエラーを出す（開発者への警告） */
};