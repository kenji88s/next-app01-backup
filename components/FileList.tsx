"use client";

/* スタイル */
import "@/styles/fileList.css";

/* ======================================================================================= */


// ファイルの型
type UploadedFile = {
  url: string;
  pathname: string;
  uploading?: boolean;
  uploaded?: boolean;
};

/* propsの型 */
type FileListProps = {
  files: UploadedFile[];
  handleRemove: (index: number) => void;
};


/* ======================================================================================= */

export default function FileList({ files, handleRemove }: FileListProps) {
  if (!files || files.length === 0) return null;

  return (
   <ul className="file-list">
  {files.map((f, index) => (
    <li key={index} className="file-item">
      <img
        src={f.url}
        alt={f.pathname}
        className="file-thumb"
      />
      <span className="file-name">{f.pathname}</span>
      {f.uploading && <span className="file-status uploading">Uploading...</span>}
      {f.uploaded && <span className="file-status uploaded">Uploaded</span>}
      <button
        type="button"
        className="file-remove"
        onClick={() => handleRemove(index)}
      >
        ×
      </button>
    </li>
  ))}
</ul>
  );
}
