"use client";

/*-- React組み込みフック --*/
import { useState } from "react";

/*-- アプリ内フック・ロジック --*/
import { useModalContext } from "@/contexts/ModalContext";

/*-- ユーティリティ関数 --*/
import { parseHashTags } from "@/utils/tagUtils";

/*-- コンポーネント --*/
import CloseButton from "@/components/CloseButton";
import SwipeHandle from "@/components/SwipeHandle";
import IconImage from "@/components/IconImage";
import FileList from "@/components/FileList";
import UploaderControls from "@/components/UploaderControls";

/*-- フック関数 --*/
import { useFileUploader } from "@/hooks/useFileUploader";
import { useFileUpload } from "@/hooks/useFileUpload";

/*-- スタイル --*/
import "@/styles/taggedImagesUploader.css";

/* ======================================================================================= */

/* モーダルの中の画像アップローダー */
export default function TaggedImagesUploader() {

  /*-- 状態管理の定義 --*/
  const [tags, setTags] = useState("");

  /*-- コンテキスト・フックからの分割代入 --*/
  const { showModal, mode, closeModal } = useModalContext();
  const { isUploading, setIsUploading, files, setFiles, handleFileChange, handleDrop, handleDragOver, handleRemove } 
    = useFileUploader();
  
  /*-- フックからの分割代入（引数有り） --*/
  const { allCompleted, setAllCompleted, uploadAll } = useFileUpload(files, setFiles);

  /*-- 関数などの定義・実行 --*/
  const handleUploadAll = async () => {
    const tagArray = parseHashTags(tags);
    await uploadAll(tagArray);
  };

  /*-- 早期リターン --*/
  if (mode !== "#upload") return null;
  /* ↑ モード[mode:#upload]が無効もしくは解除で非表示 */

  return (

    /* [showModal]判定でフェードイン／アウト */
    <div
      className="uploader"
      data-state={`${showModal ? "fade-in" : "fade-out"}`}
      onClick={(e) => e.stopPropagation()}
    >

      {/* Xボタン、モーダルを閉じる[closeModal] */}
      <CloseButton clickAction={() => closeModal()} />

      {/* 表示中[showModal]のみ有効、モーダルを閉じる[closeModal] */}
      <SwipeHandle showTarget={showModal} swipeAction={closeModal} />

      {/* ドラッグ＆ドロップなど画像を選択でレイアウト変形 */}
      <form
        className="uploader__form"
        data-state={`${files.length > 0 ? "pending" : "no-item"}`}
      >
        <div className="uploader__inputs">
          <div className="uploader__file-input-wrapper">  
            <input
              className="uploader__file-input"
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />

            {/* 候補画像リスト、候補の配列[files]と候補削除機能[handleRemove]を挿入 */}
            <FileList files={files} handleRemove={handleRemove} />

            {/* アップ中以外[!isUploading]のとき表示 */}
            {!isUploading && (
              <label
                className="uploader__dropzone"
                htmlFor="image-upload"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <span className="uploader__icon">
                  <IconImage />
                </span>
                <span className="uploader__label no-device">ここをクリックして画像を選択</span>
                <span className="uploader__label device">タップして画像を選択</span>
              </label>
            )}
          </div>

          {/* アップ中以外[!isUploading]のとき表示 */}
          {!isUploading && (
            <textarea
              className="uploader__tag-input"
              value={tags}
              placeholder="ハッシュタグを入力"
              rows={2}
              onChange={(e) => setTags(e.target.value)}
            />
          )}
        </div>

        {/* 画像アップローダーの操作ボタン */}
        <UploaderControls
          files={files}
          setFiles={setFiles}
          handleUploadAll={handleUploadAll}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          allCompleted={allCompleted}
          setAllCompleted={setAllCompleted}
        />
      </form>
    </div>
  );
}