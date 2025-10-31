"use client";

/*-- React組み込みフック --*/
import { useEffect } from "react";

/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useTagEditorContext } from "@/contexts/TagEditorContext";
import { useTagContext } from "@/contexts/TagContext";

/*-- フック関数 --*/
import { useFileDownload } from "@/hooks/useFileDownload";
import { useFileDelete } from "@/hooks/useFileDelete";
import { useHooks } from "@/hooks/useHooks";

/*-- コンポーネント --*/
import LoadingArea from "@/components/LoadingArea";
import IconDownload from "@/components/IconDownload";
import IconHash from "@/components/IconHash";
import IconDelete from "@/components/IconDelete";

/*-- スタイル --*/
import "@/styles/fullImageControls.css";

/* ======================================================================================= */

/* 画像拡大モーダル */
export default function FullImageControls() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { selectedImage, fetchImages } = useImageGalleryContext();
  const { showTags, openTags, closeTags } = useTagContext();
  const { showEditor, initializeTags } = useTagEditorContext();
  const { downloadFile } = useFileDownload();
  const { isDeleting, handleDelete } = useFileDelete();
  const { clearSelection } = useHooks();

  /*-- 関数などの定義・実行 --*/
  /* 削除アイコンの処理 */
  const deleteImages = async () => {
    if (!selectedImage?.id) return;
    /* ↑ 選択中の画像IDが無い[!selectedImage?.id]場合は何もしない */

    await handleDelete(selectedImage.id);
    await fetchImages();
    clearSelection();
    /* 画像削除[handleDelete]、画像再取得[fetchImages]、選択状態クリア[clearSelection] */
  };

  /*-- レンダリング後の処理 --*/
  useEffect(() => {
    if (selectedImage && !showEditor) {
    /* ↑ 選択中[selectedImage]かつ編集非表示[showEditor]の場合 */

      initializeTags(selectedImage.tags);
      /* ↑ スペース区切りの文字列に変換 */
    }
  }, [selectedImage, showEditor, initializeTags]);

  /*-- 早期リターン --*/
  if (!selectedImage) return null;
  /* ↑ 選択画像が無効や解除[!selectedImage]で非表示 */

  return (
    <>
      <div className="image-controls">
        <div className="image-controls__icons">

          {/* ボタン通常操作を無効、画像ダウンロード[downloadFile] */}
          <a
            className="image-controls__button"
            href={selectedImage.url}
            onClick={(e) => {
              e.preventDefault();
              downloadFile(selectedImage.url, selectedImage.pathname);
            }}
          >
            <IconDownload />
          </a>

          {/* 画像設定タグ一覧（状態[showTags]）の表示[openTags]／非表示[closeTags] */}
          <button
            className="image-controls__button"
            onClick={() => {
              if (showTags) {
                closeTags({ fadeIn: true, duration: 300 });
              } else {
                openTags({ fadeIn: true, duration: 300 });
              }
            }}
          >
            <IconHash />
          </button>

          {/* アップ画像削除など[deleteImages] */}
          <button
            className="image-controls__button"
            onClick={deleteImages}
          >
            <IconDelete />
          </button>
        </div>
      </div>

      {/* 画像削除中[isDeleting]はアニメーションを表示 */}
      <LoadingArea
        dataPlace="full-image"
        isProcessing={isDeleting}
      />
    </>
  );
}
