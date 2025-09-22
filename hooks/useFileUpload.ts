/* 型定義 */
import type { ImageData } from "@/types/image";

/* ======================================================================================= */

/* 親コンポーネントから渡されるプロパティの型定義 */
type UploadResult = {
  success: boolean;
  error?: string;
};

type UploadedFile = {
  file: File;            // 実ファイル
  url: string;           // ObjectURL
  pathname?: string;     // アップロード先のパス or ファイル名
  uploading?: boolean;
  uploaded?: boolean;
};

/* ======================================================================================= */

export function useFileUpload(
  files: UploadedFile[],
  setFiles: (
    files: UploadedFile[] | ((prev: UploadedFile[]) => UploadedFile[])
  ) => void
) {
  const uploadAll = async (tags: string[] = []): Promise<UploadResult[]> => {
    const updatedFiles = [...files];
    const results: UploadResult[] = [];

    for (let i = 0; i < updatedFiles.length; i++) {
      try {
        // アップロード開始フラグ
        setFiles((prev) =>
          prev.map((file, idx) =>
            idx === i ? { ...file, uploading: true, uploaded: false } : file
          )
        );

        const file = updatedFiles[i];

        // ==============================
        // 1. Vercel Blob にアップロード
        // ==============================
        const blobRes = await fetch("/api/drive/upload", {
          method: "POST",
          body: (() => {
            const formData = new FormData();
            formData.append("file", file.file);
            return formData;
          })(),
        });

        if (!blobRes.ok) throw new Error("Blob upload failed");
        const blobData = await blobRes.json();

        // blobData の想定: { url: string, pathname: string }
        const { url: blobUrl, pathname } = blobData;



        // ==============================
        // 2. Sheets に書き込みデータ生成
        // ==============================
        const imageRow: ImageData = {
          id: crypto.randomUUID(),
          pathname,
          url: blobUrl,
          tags,
        };

        const sheetRes = await fetch("/api/sheet/insert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ values: Object.values(imageRow) }),
        });

        if (!sheetRes.ok) throw new Error("Sheet insert failed");

        // ==============================
        // 3. 成功時に state 更新
        // ==============================
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i
              ? {
                  ...f,
                  uploading: false,
                  uploaded: true,
                  pathname: blobUrl, // 保存先のURLを入れる
                }
              : f
          )
        );

        results.push({ success: true });
      } catch (err: any) {
        console.error(err);
        setFiles((prev) =>
          prev.map((file, idx) =>
            idx === i ? { ...file, uploading: false } : file
          )
        );
        results.push({ success: false, error: err.message });
      }
    }

    return results;
  };

  return { uploadAll };
}