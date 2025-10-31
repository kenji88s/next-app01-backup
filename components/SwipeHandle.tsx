"use client";

/*-- フック関数 --*/
import { useSwipeClose } from "@/hooks/useSwipeClose";

/* ======================================================================================= */

type SwipeHandlePropsType = {
  showTarget: boolean; //配置場所が表示されているか
  swipeAction: () => void; //モーダルを閉じるなどの処理
};

/* ======================================================================================= */

/* モーダルの上部のつまみバー */
export default function SwipeHandle({ showTarget, swipeAction }: SwipeHandlePropsType) {
  
  /*-- フックからの分割代入（引数有り） --*/
  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipeClose({
      showTarget: showTarget,
      swipeAction: swipeAction,
    });

  return (
    <div
      className="swipe-handle"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="swipe-handle__bar" />
    </div>
  );
}

