/* React組み込みフック */
import { useState, useCallback, TouchEvent } from "react";

/* ======================================================================================= */

/* 親コンポーネントから渡されるプロパティの型定義 */
type Props = {
  deviceIsOpen: boolean;
  /* ↑ モバイル・タブレットでのモーダル開閉状態 */
  onClose: () => void;
  /* ↑ スワイプ終了時に閉じる処理など */
  threshold?: number;
  /* ↑ スワイプ距離のしきい値（px） */
};

/* ======================================================================================= */

export function useSwipeDownClose({
  deviceIsOpen,
  onClose,
  threshold = 80, // デフォルト80px
}: Props) {
  
  /* 状態管理の定義 */
  const [startY, setStartY] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);

  // タッチ開始
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!deviceIsOpen) return;
    setStartY(e.touches[0].clientY);
  }, [deviceIsOpen]);

  // タッチ移動
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!deviceIsOpen || startY === null) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - startY;

    if (diffY > 0) {
      setTranslateY(diffY);
    }
  }, [deviceIsOpen, startY]);

  // タッチ終了
  const handleTouchEnd = useCallback(() => {
    if (!deviceIsOpen) return;

    if (translateY > threshold) {
      onClose();
    } else {
      setTranslateY(0); // 元の位置に戻す
    }
    setStartY(null);
  }, [deviceIsOpen, translateY, threshold, onClose]);

  return {
    translateY,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
