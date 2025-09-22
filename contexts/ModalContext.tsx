"use client";

/* React組み込みフック */
import { createContext, useContext, useState, ReactNode } from "react";

/* ======================================================================================= */

/* コンテキストで扱う値の型を定義 */
type ModalContextType = {
  isOpen: boolean;
  /* ↑ モーダルの表示／非表示 */
  mode: string | null;
  setMode: (mode: string | null) => void;
  /* ↑ モーダルの表示モード（#info, #tags etc） */
  openModal: (mode: string, options?: { fadeIn?: boolean; duration?: number }) => void;
  /* ↑ モーダルの表示エフェクト */
  closeModal: (options?: { fadeIn?: boolean; duration?: number }) => void;
  /* ↑ モーダルの非表示エフェクト */
};

/* ======================================================================================= */

/* コンテキストの作成 */
const ModalContext = createContext<ModalContextType | undefined>(undefined);

/* ======================================================================================= */

/* プロバイダーコンポーネント（グローバルに状態を共有するための「囲い」） */
export const ModalProvider = ({ children }: { children: ReactNode }) => {

  /* 状態管理の定義 */  
  const [isOpen, setIsOpen] = useState(false); //消す
  const [mode, setMode] = useState<string | null>(null);

  // モーダルを開く関数（モードを指定して開く）
  const openModal = (
    mode: string,
    options?: { fadeIn?: boolean; duration?: number }
  ) => {
    setMode(mode);
    if (options?.fadeIn !== false) {
      setTimeout(() => {
        setIsOpen(true);
      }, options?.duration ?? 300);
    }
  };


  // モーダルを閉じる関数（開閉状態とモードを初期化）
  const closeModal = (
    options?: { fadeIn?: boolean; duration?: number }
  ) => {
    if (options?.fadeIn !== false) {
      setIsOpen(false);
      setTimeout(() => {
        setMode(null);
      }, options?.duration ?? 500);
    } else {
      setIsOpen(false);
      setMode(null);
    }
  };


  /* 子コンポーネントに選択状態と更新関数を提供 */
  return (
    <ModalContext.Provider 
      value={{
        isOpen,
        mode,
        setMode,
        openModal,
        closeModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

/* ======================================================================================= */

/* コンテキストを使用するためのカスタムフック */
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
  /* ↑ プロバイダーの外で使われた場合はエラーを出す（開発者への警告） */
};
