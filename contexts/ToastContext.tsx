"use client";

/*-- React組み込みフック --*/
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/* ======================================================================================= */

type ToastType = "success" | "error" | "info" | null;

/*-- コンテキストで扱う値の型を定義 --*/
type ToastContextType = {
  showToast: boolean; //トーストの表示／非表示
  setShowToast: (value: boolean) => void; //表示／非表示の切替
  message: string | null; //通知の文言
  type: ToastType; //通知のタイプ
  setToast: (message: string | null, type?: ToastType) => void; //通知の設定
  closeToast: () => void; //トーストを閉じる
};

/* ======================================================================================= */

/*-- コンテキストの作成 --*/
const ToastContext = createContext<ToastContextType | undefined>(undefined);

/* ======================================================================================= */

/*-- プロバイダーコンポーネント（グローバルに状態を共有するための「囲い」） --*/
export const ToastProvider = ({ children }: { children: ReactNode }) => {

  /*-- 状態管理の定義 --*/  
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<ToastType>(null);

  /*-- 関数などの定義・実行 --*/
  const setToast = (message: string | null, type: ToastType = "info") => {
    setMessage(message);
    setType(type);
  };

  const closeToast = () => {
    setShowToast(false);
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 300);
  };

  /*-- レンダリング後の処理 --*/
  useEffect(() => {
    if (!message) return;
    setTimeout(() => {
      setShowToast(true);
    }, 300);
    const closeTimer = setTimeout(() => {
      setShowToast(false);
      setTimeout(() => {
        setMessage(null);
        setType(null);
      }, 300);
    }, 3000);

    return () => clearTimeout(closeTimer);
  }, [message]);

  /*-- 子コンポーネントに選択状態と更新関数を提供 --*/
  return (
    <ToastContext.Provider 
      value={{
        showToast,
        setShowToast,
        message,
        type,
        setToast,
        closeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

/* ======================================================================================= */

/*-- コンテキストを使用するためのカスタムフック --*/
export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
  /* ↑ プロバイダーの外で使われた場合はエラーを出す（開発者への警告） */
};