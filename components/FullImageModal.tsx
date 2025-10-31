"use client";

/*-- React組み込みフック --*/
import { useEffect } from "react";

/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useToastContext } from "@/contexts/ToastContext";

/*-- フック関数 --*/
import { useHooks } from "@/hooks/useHooks";

/*-- コンポーネント --*/
import ImageTagManager from "@/components/ImageTagManager";
import FullImageControls from "@/components/FullImageControls";
import CloseButton from "@/components/CloseButton";
import SwipeHandle from "@/components/SwipeHandle";

/*-- スタイル --*/
import "@/styles/fullImageModal.css";

/* ======================================================================================= */

/* 画像拡大モーダル */
export default function FullImageModal() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { showFullImage, setShowFullImage, selectedImage } = useImageGalleryContext();
  const { setToast } = useToastContext();
  const { clearSelection } = useHooks();

  /*-- レンダリング後の処理 --*/
  useEffect(() => {
    if (selectedImage) {
      const timer = setTimeout(() => setShowFullImage(true), 300);
      return () => clearTimeout(timer);
      /* ↑ フェードイン用の遅延処理 */
    }
  }, [selectedImage]);
  useEffect(() => {
    if (selectedImage && !selectedImage.id) {
      setToast('画像IDが見つかりません', 'error');
      /* ↑ 画像IDが無い場合はトースト通知 */
    }
  }, [selectedImage]);

  /*-- 早期リターン --*/
  if (!selectedImage) return null;
  /* ↑ 選択画像が無効や解除[!selectedImage]で非表示 */

  return (
    /* オーバーレイクリックでXボタンと同じ処理[clearSelection] */
    <div
      className="full-image"
      onClick={clearSelection}
    >
      {/* [showFullImage]判定でフェードイン／アウト */}
      <div
        className="full-image__content"
        data-state={`${showFullImage ? "fade-in" : "fade-out"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Xボタン、選択・拡大・タグ一覧／編集を解除／非表示[clearSelection] */}
        <CloseButton clickAction={clearSelection} />

        {/* 表示中[showFullImage]のみ有効、Xボタンと同じ処理[clearSelection] */}
        <SwipeHandle showTarget={showFullImage} swipeAction={clearSelection} />

        <div
          className="full-image__image-wrapper" 
          onClick={(e) => e.stopPropagation()}
        >
          <img
            className="full-image__image"
            src={selectedImage.url}
            alt="拡大画像"
          />
        </div>

        <ImageTagManager />
        <FullImageControls />
      </div>
    </div>
  );
}
