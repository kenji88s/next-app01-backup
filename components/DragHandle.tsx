"use client";

/* React組み込みフック */
import { useState, useEffect } from "react";

/* フック関数 */
import { useSwipeDownClose } from "@/hooks/useSwipeDownClose";

/* ======================================================================================= */

/* 親コンポーネントから渡されるプロパティの型定義 */
type Props = {
  isOpen: boolean;
  /* ↑ モーダルが表示されているか */
  closeModal: () => void;
  /* ↑ モーダルを閉じるなどのアクション */
};

/* ======================================================================================= */

/* モーダルの上部のつまみバー */
export default function DragHandle({ isOpen, closeModal }: Props) {
  
  /* 状態管理の定義 */
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  /* フックからの分割代入（引数有り） */
  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipeDownClose({
      deviceIsOpen: isMobileOrTablet && isOpen,
      onClose: closeModal,
    });

  /* レンダリング後の処理 */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(any-hover: none) and (max-width: 480px)");
    setIsMobileOrTablet(mediaQuery.matches);

    // 画面サイズが変わった時も反映するようにリスナーを追加
    const handler = (e: MediaQueryListEvent) => setIsMobileOrTablet(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className="drag-handle"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="drag-handle__bar" />
    </div>
  );
}
