/*-- React組み込みフック --*/
import { useRef, useState, useCallback } from "react";

/* ======================================================================================= */

export function useDragScroll() {

  /*-- 永続値 --*/
  const containerRef = useRef<HTMLDivElement>(null);

  /*-- 状態管理の定義 --*/
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  /*-- 関数などの定義・実行 --*/
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseLeave = useCallback(() => setIsDragging(false), []);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // スクロール速度
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, scrollLeft, startX]);

  /*-- フックの状態と操作関数を返す --*/
  return {
    containerRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  };
}
