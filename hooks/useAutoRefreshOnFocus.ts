/*-- React組み込みフック --*/
import { useEffect } from "react";

/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";

/* ======================================================================================= */

export function useAutoRefreshOnFocus() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { fetchImages } = useImageGalleryContext();

  /*-- レンダリング後の処理 --*/
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchImages();
      }
    };

    const handleWindowFocus = () => {
      fetchImages();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [fetchImages]);
}
