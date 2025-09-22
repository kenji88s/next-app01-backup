"use client";

/* アプリ内フック・ロジック */
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";

/* コンポーネント */
import TagNavigation from "@/components/TagNavigation";
import GalleryControls from "@/components/GalleryControls";
import NoImageMessage from "@/components/NoImageMessage";
import Loader from "@/components/Loader";

/* スタイル */
import "@/styles/gallery.css";

/* ======================================================================================= */

/* アップロード画像一覧 */
export default function ThumbnailGallery() {

  /* コンテキスト・フックからの分割代入 */
  const { setSelected, visibleImages, isLoading } = useImageGalleryContext();
  
  return (
    <div className="gallery">
      <TagNavigation />
      <div className="gallery__grid">
        {!isLoading ? (
          visibleImages.length > 0 ? (
            <div className="gallery__grid-inner">
              {visibleImages.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.pathname}
                  className="gallery__thumbnail"
                  onClick={() => setSelected(img)}
                />
              ))}
            </div>
          ) : (
            <NoImageMessage />
          )
        ) : (
          <Loader />
        )}
      </div>
      <GalleryControls />
    </div>
  );  
}
