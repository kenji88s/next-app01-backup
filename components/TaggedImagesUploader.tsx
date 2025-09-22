"use client";

/* React組み込みフック */
import { useState } from "react";

/* アプリ内フック・ロジック */
import { useModal } from "@/contexts/ModalContext";

/* コンポーネント */
import CloseButton from "@/components/CloseButton";
import DragHandle from "@/components/DragHandle";
import IconImage from "@/components/IconImage";
import FileList from "@/components/FileList";

/* フック関数 */
import { useFileUploader } from "@/hooks/useFileUploader";
import { useFileUpload } from "@/hooks/useFileUpload";

/* スタイル */
import "@/styles/taggedImagesUploader.css";

/* ======================================================================================= */

/* 検索フォームの下に配置するタグリスト */
export default function TaggedImagesUploader() {

  /* 状態管理の定義 */
  const [tags, setTags] = useState("");

  /* コンテキスト・フックからの分割代入 */
  const { isOpen, mode, closeModal } = useModal();
  const { files, setFiles, handleFileChange, handleDrop, handleDragOver, handleRemove } = useFileUploader();
  
  /* フックからの分割代入（引数有り） */
  const { uploadAll } = useFileUpload(files, setFiles);

  /* 早期リターン */
  if (mode !== "#upload") return null;
  /* ↑ モード（upload）が無効もしくは解除になったら非表示 */

  /* スプレッドシートからの全タグ */
  const handleUploadAll = async () => {
    await uploadAll(tags.split(",").map(t => t.trim()));
  };

  return (
    <div
      className={`uploader ${isOpen ? "fade-in" : "fade-out"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseButton />
      <DragHandle isOpen={isOpen} closeModal={closeModal} />
      <form 
        className={`uploader__form ${files.length > 0 ? "files" : ""}`}
      >
        <div className="uploader__input-wrapper">
          <div className="uploader__input-wrapper--file">  
          <input
            className="uploader__input"
            id="image-upload"
            type="file"
            accept="image/*"
            multiple

            onChange={handleFileChange}
          />
          <FileList files={files} handleRemove={handleRemove} />
          <label
            className="uploader__area"
            htmlFor="image-upload"

            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <span className="uploader__area--icon">
              <IconImage />
            </span>
            <span className="uploader__area--label no-device">ここをクリックして画像を選択</span>
            <span className="uploader__area--label device">タップして画像を選択</span>
          </label>
          
          </div>
          <textarea
            className="uploader__input--tag"
            placeholder="ハッシュタグを入力"
            rows={2}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {files.length > 0 && (
        <div className="uploader__button-wrapper"> 
          <button
            className="uploader__button btn--normal"
            type="button"
            onClick={handleUploadAll}
          >
            アップロード
          </button>

          <button
            className="uploader__button btn--normal"
            type="button"
            onClick={() => setFiles([])}
          >
            リセット
          </button>

        </div>
    )}
      </form>
    </div>
  );
}