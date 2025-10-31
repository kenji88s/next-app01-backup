"use client";

/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useToastContext } from "@/contexts/ToastContext";

/*-- フック関数 --*/
import { useAutoRefreshOnFocus } from "@/hooks/useAutoRefreshOnFocus";

/*-- コンポーネント --*/
import TagNavigation from "@/components/TagNavigation";
import GalleryControls from "@/components/GalleryControls";
import NoImageMessage from "@/components/NoImageMessage";
import LoadingArea from "@/components/LoadingArea";

/*-- スタイル --*/
import "@/styles/gallery.css";

/* ======================================================================================= */

/* アップロード画像一覧 */
export default function ThumbnailGallery() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { closeToast } = useToastContext();
  const { setSelectedImage, visibleImages, isLoading } = useImageGalleryContext();

  /*-- 関数などの定義・実行 --*/
  /* フォーカス復帰時に画像リストを自動更新 */
  useAutoRefreshOnFocus();
  
  return (
    <div className="gallery">
      <TagNavigation />
      <div className="gallery__grid">

        {/* ローディング終了[!isLoading]で表示 */}
        {!isLoading ? (

          /* タグや表示件数絞込画像[visibleImages]が1件以上で表示 */
          visibleImages.length > 0 ? (
            <ul className="gallery__grid-inner">
              {visibleImages.map((img, index) => (
                <li
                  key={index}
                  className="gallery__thumbnail-wrapper"
                >
                  {/* 拡大画像情報をセット[setSelectedImage(img)]、トーストを閉じる[closeToast] */}
                  <img
                    className="gallery__thumbnail"
                    src={img.url}
                    alt={img.pathname}
                    onClick={() => {
                      setSelectedImage(img);
                      closeToast();
                    }}
                  />
                </li>
              ))}
            </ul>
          ) : (
            /* 画像が無い場合にメッセージを表示 */
            <NoImageMessage />
          )
        ) : (
          /* ローディング中はアニメーションを表示 */
          <LoadingArea isProcessing={isLoading} />
        )}
      </div>
      <GalleryControls />
    </div>
  );  
}
