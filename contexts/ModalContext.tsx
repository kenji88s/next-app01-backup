"use client";

/*-- React組み込みフック --*/
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/*-- アプリ内の定数・設定 --*/
import { DEFAULT_MODAL_MODE, DEFAULT_MODAL_HIDE_TIMES } from "@/constants/config";

/* ======================================================================================= */

/*-- コンテキストで扱う値の型を定義 --*/
type ModalContextType = {
  showModal: boolean; //モーダルの表示／非表示
  mode: string | null; //モーダルの表示モード（#info, #tags etc）
  setMode: (mode: string | null) => void; //表示モードの切替
  openModal: (mode: string, options?: { fadeIn?: boolean; duration?: number }) 
    => void; //モーダルの表示エフェクト
  closeModal: (options?: { fadeIn?: boolean; duration?: number }) 
    => void; //モーダルの非表示エフェクト
};

/* ======================================================================================= */

/*-- コンテキストの作成 --*/
const ModalContext = createContext<ModalContextType | undefined>(undefined);

/* ======================================================================================= */

/*-- プロバイダーコンポーネント（グローバルに状態を共有するための「囲い」） --*/
export const ModalProvider = ({ children }: { children: ReactNode }) => {

  /*-- 状態管理の定義 --*/  
  const [showModal, setShowModal] = useState(false); //消す
  const [mode, setMode] = useState<string | null>(null);

  /*-- 関数などの定義・実行 --*/
  // モーダルを開く関数（モードを指定して開く）
  const openModal = (
    mode: string,
    options?: { fadeIn?: boolean; duration?: number }
  ) => {
    setMode(mode);
    if (options?.fadeIn !== false) {
      setTimeout(() => {
        setShowModal(true);
      }, options?.duration ?? 300);
    }
  };


  // モーダルを閉じる関数（開閉状態とモードを初期化）
  const closeModal = (
    options?: { fadeIn?: boolean; duration?: number }
  ) => {
    if (options?.fadeIn !== false) {
      setShowModal(false);
      setTimeout(() => {
        setMode(null);
      }, options?.duration ?? 500);
    } else {
      setShowModal(false);
      setMode(null);
    }
  };

  /*-- レンダリング後の処理 --*/
  useEffect(() => {
    if (DEFAULT_MODAL_MODE !== "") {
      const lastShown = localStorage.getItem("ModalLastShown");
      const now = Date.now();
      const modalHideDurationMs = DEFAULT_MODAL_HIDE_TIMES * 60 * 1000;

      if (!lastShown || now - Number(lastShown) > modalHideDurationMs) {
        // 初回 or 30時間経過後のリロード時に自動表示
        openModal(DEFAULT_MODAL_MODE);
        localStorage.setItem("ModalLastShown", String(now));
      }
      // 30時間以内なら自動表示しない（ボタンでのみ表示可能）
    };
  }, [openModal]);

  /*-- 子コンポーネントに選択状態と更新関数を提供 --*/
  return (
    <ModalContext.Provider 
      value={{
        showModal,
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

/*-- コンテキストを使用するためのカスタムフック --*/
export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
  /* ↑ プロバイダーの外で使われた場合はエラーを出す（開発者への警告） */
};
