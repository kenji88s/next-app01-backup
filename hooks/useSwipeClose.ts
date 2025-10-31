/*-- React組み込みフック --*/
import { useState, useEffect, useCallback, TouchEvent } from "react";

/* ======================================================================================= */

type SwipeClosePropsType = {
  showTarget: boolean; //どこに配置するか（省略時は "close"）
  swipeAction: () => void; //スワイプ終了時に閉じる処理など
  direction?: "up" | "down" | "both"; //スワイプ方向
  threshold?: number; // スワイプ距離のしきい値（px）
};

/* ======================================================================================= */

export function useSwipeClose({
  showTarget,
  swipeAction,
  direction = "down",
  threshold = 60,
}: SwipeClosePropsType) {

  /*-- 状態管理の定義 --*/
  const [startY, setStartY] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  /*-- 関数などの定義・実行 --*/
  // タッチ開始
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!showTarget || !isMobileOrTablet) return;
    setStartY(e.touches[0].clientY);
  }, [showTarget, isMobileOrTablet]);

  // タッチ移動
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!showTarget || startY === null || !isMobileOrTablet) return;
      const currentY = e.touches[0].clientY;
      const diffY = currentY - startY;

      // 上下どちらかに制御
      if (
        (direction === "down" && diffY > 0) ||
        (direction === "up" && diffY < 0) ||
        direction === "both"
      ) {
        e.preventDefault();
        setTranslateY(diffY);
      }
    },
    [showTarget, startY, isMobileOrTablet, direction]
  );

  // タッチ終了
  const handleTouchEnd = useCallback(() => {
    if (!showTarget || !isMobileOrTablet) return;

    if (
      (direction === "down" && translateY > threshold) ||
      (direction === "up" && translateY < -threshold) ||
      (direction === "both" && Math.abs(translateY) > threshold)
    ) {
      swipeAction();
    } else {
      setTranslateY(0);
    }
    setStartY(null);
  }, [showTarget, isMobileOrTablet, translateY, threshold, swipeAction, direction]);

  /*-- レンダリング後の処理 --*/
  useEffect(() => {
    const mediaQuery = window.matchMedia("(any-hover: none) and (max-width: 480px)");
    setIsMobileOrTablet(mediaQuery.matches);

    // 画面サイズが変わった時も反映するようにリスナーを追加
    const handler = (e: MediaQueryListEvent) => setIsMobileOrTablet(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  /*-- フックの状態と操作関数を返す --*/
  return {
    startY,
    translateY,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
