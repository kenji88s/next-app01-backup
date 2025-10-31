"use client";

/*-- React組み込みフック --*/
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

/*-- アプリ内の定数・設定 --*/
import { THUMB_INITIAL_COUNT } from "@/constants/config";

/*-- アプリ内フック・ロジック --*/
import { useTagContext } from "@/contexts/TagContext";
import { useToastContext } from "@/contexts/ToastContext";

/*-- ライブラリ関数 --*/
import { fetchSheetItems } from "@/libs/fetchSheetItems";

/*-- 型定義 --*/
import type { ImageData } from "@/types/imageData";

/* ======================================================================================= */

/*-- コンテキストで扱う値の型を定義 --*/
type ImageGalleryContextType = {
  showFullImage: boolean; //画像モーダルの表示／非表示
  setShowFullImage: (value: boolean) => void; //表示／非表示の切替
  selectedImage: ImageData | null; //選択中の画像
  setSelectedImage: (img: ImageData | null) => void; //選択画像の更新
  visibleCount: number; //現在表示中の画像の数
  setVisibleCount: (count: number) => void;　//表示数の更新
  allImages: ImageData[]; //すべての画像
  filteredImages: ImageData[]; //タグ絞込画像
  visibleImages: ImageData[]; //先頭から〇件の画像
  handleTagClick: (tag: string) => void; //タグがクリックされたときの処理 
  isLoading: boolean; //ローディング状態
  fetchImages: () => Promise<void>; //画像データを再取得（タグ更新後など）
};

/* ======================================================================================= */

/*-- コンテキストの作成 --*/
const ImageGalleryContext = createContext<ImageGalleryContextType | undefined>(undefined);

/* ======================================================================================= */

/*-- プロバイダーコンポーネント（グローバルに状態を共有するための「囲い」） --*/
export function ImageGalleryProvider({ children }: { children: ReactNode }) {

  /*-- 状態管理の定義 --*/
  const [showFullImage, setShowFullImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [visibleCount, setVisibleCount] = useState(THUMB_INITIAL_COUNT);
  const [allImages, setAllImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /*-- コンテキスト・フックからの分割代入 --*/
  const { selectedTag, setSelectedTag } = useTagContext();
  const { setToast } = useToastContext();

  /*-- 関数などの定義・実行 --*/
  const fetchImages = useCallback(async () => {
    try {
      const result = await fetchSheetItems();
      setAllImages(result);
    } catch (err) {
      console.error(err);
      setToast('画像の取得に失敗しました。ネット環境の良い場所でリフレッシュしてください。', 'error');
      setAllImages([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // タグで絞り込みされた画像配列（タグが選択されていない場合は全件）
  const filteredImages = selectedTag
    ? allImages.filter((img) => img.tags.includes(selectedTag))
    : allImages;

  // 表示する画像（先頭から visibleCount 件だけ）
  const visibleImages = filteredImages.slice(0, visibleCount);

  // タグがクリックされたときの処理
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag); // タグ状態を更新
    setVisibleCount(THUMB_INITIAL_COUNT); // 表示枚数をリセット
  };

  /*-- レンダリング後の処理 --*/
  useEffect(() => {
    fetchImages();
  }, []);
  // 初回マウント時に画像データを非同期で取得

  /*-- 子コンポーネントに選択状態と更新関数を提供 --*/
  return (
    <ImageGalleryContext.Provider
      value={{
        showFullImage,
        setShowFullImage,
        selectedImage,
        setSelectedImage,
        visibleCount,
        setVisibleCount,
        allImages,
        filteredImages,
        visibleImages,
        handleTagClick,
        isLoading,
        fetchImages
      }}
    >
      {children}
    </ImageGalleryContext.Provider>
  );
}

/* ======================================================================================= */

/*-- コンテキストを使用するためのカスタムフック --*/
export const useImageGalleryContext = (): ImageGalleryContextType => {
  const context = useContext(ImageGalleryContext);
  if (!context) {
    throw new Error("useImageGalleryContext must be used within an ImageGalleryProvider");
  }
  return context;
  /* ↑ プロバイダーの外で使われた場合はエラーを出す（開発者への警告） */
}
