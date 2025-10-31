"use client";

/*-- 型定義 --*/
import type { UploadedFile } from "@/types/uploadedFile";

/*-- スタイル --*/
import "@/styles/fileList.css";

/* ======================================================================================= */

type FileListPropsType = {
  files: UploadedFile[]; //候補画像の配列
  handleRemove: (index: number) => void; //アップ画像を候補から削除
};

/* ======================================================================================= */

/* アップローダーに配置する候補画像リスト*/
export default function FileList({ files, handleRemove }: FileListPropsType) {

  /*-- 早期リターン --*/
  if (!files || files.length === 0) return null;
  /* ↑ 候補画像が無い場合は非表示 */

  return (
    <ul className="file-list">
      {files.map((f, index) => (
        <li
          key={index}
          className="file-list__item"
        >
          {/* サムネイル画像とファイル名 */}
          <img
            className="file-list__thumb"
            src={f.url}
            alt={f.pathname}
          />
          <span className="file-list__name">{f.pathname}</span>

          {/* アップロード状態表示 */}
          {f.uploading && <span className="file-list__status uploading">アップロード中</span>}
          {f.uploaded && <span className="file-list__status uploaded">アップロード成功</span>}
          {f.failed && <span className="file-list__status failed">アップロード失敗</span>}

          {/* 候補画像削除ボタン（アップロード中・成功・失敗以外） */}
          {!f.uploading && !f.uploaded && !f.failed && (
            <button
              className="file-list__remove-btn"
              type="button"
              onClick={() => handleRemove(index)}
            >
              ×
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
