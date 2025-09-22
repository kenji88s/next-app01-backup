/* React組み込みフック */
import { useState, ChangeEvent, DragEvent } from "react";

/* ======================================================================================= */

// ファイルの型
type UploadedFile = {
  file: File;            // 実ファイル
  url: string;           // ObjectURL
  pathname?: string;     // 必要ならあとで設定
  uploading?: boolean;
  uploaded?: boolean;
};

/* ======================================================================================= */

export function useFileUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  // ファイル追加の共通処理
  const addFiles = (newFiles: FileList) => {
    const mapped: UploadedFile[] = Array.from(newFiles).map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
      pathname: f.name, // 仮でファイル名を入れる（必要に応じて変更）
      uploading: false,
      uploaded: false,
    }));
    setFiles((prev) => [...prev, ...mapped]);
  };

  // ファイル選択時
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addFiles(e.target.files);
  };

  // ドラッグ＆ドロップ時
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    addFiles(e.dataTransfer.files);
  };

  // dragover防止
  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  // 削除
  const handleRemove = (index: number) => {
    const fileToRemove = files[index];
    if (fileToRemove?.url) URL.revokeObjectURL(fileToRemove.url);
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    files,
    setFiles,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleRemove,
  };
}
