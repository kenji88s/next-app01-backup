/*-- React組み込みフック --*/
import { useState, useEffect } from "react";

/*-- 型定義 --*/
import type { ImageData } from "@/types/imageData";
import type { OperationResult } from "@/types/operationResult";
import type { UploadedFile } from "@/types/uploadedFile";

/*-- アプリ内の定数・設定 --*/
import { MAX_IMAGE_SIZE } from "@/constants/config";

/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useToastContext } from "@/contexts/ToastContext";

/* ======================================================================================= */

export function useFileUpload(
  files: UploadedFile[],
  setFiles: (
    files: UploadedFile[] | ((prev: UploadedFile[]) => UploadedFile[])
  ) => void
) {

  /*-- 状態管理の定義 --*/
  const [allCompleted, setAllCompleted] = useState(false);

  /*-- コンテキスト・フックからの分割代入 --*/
  const { fetchImages } = useImageGalleryContext();
  const { setToast } = useToastContext();

  /*-- 関数などの定義・実行 --*/
  const uploadAll = async (tags: string[] = []): Promise<{results: OperationResult[]; allCompleted: boolean}> => {
    const updatedFiles = [...files];
    const results: OperationResult[] = [];

    for (let i = 0; i < updatedFiles.length; i++) {
      try {
        // アップロード開始フラグ
        setFiles((prev) =>
          prev.map((file, idx) =>
            idx === i ? { ...file, uploading: true, uploaded: false, failed: false } : file
          )
        );

        const file = updatedFiles[i];


              // ==============================
      // 🔍 アップロード前のファイルチェック
      // ==============================
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.file.type)) {
        console.warn("不正なファイルタイプ:", file.file.type);
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i ? { ...f, uploading: false, failed: true } : f
          )
        );
        results.push({ success: false, error: "画像ファイル（JPEG/PNG/GIF/WEBP）のみアップロード可能です。" });
        continue; // 次のファイルへ
      }

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
          tags: tags.join(" "),
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
          prev.map((file, idx) =>
            idx === i
              ? {
                  ...file,
                  uploading: false,
                  uploaded: true,
                  failed: false,
                }
              : file
          )
        );

        results.push({ success: true });
      } catch (err: any) {
        console.error(err);
        setFiles((prev) =>
          prev.map((file, idx) =>
            idx === i ? { ...file, uploading: false, failed: true, } : file
          )
        );
        results.push({ success: false, error: err.message });
      }
    }

    const completed = results.length === updatedFiles.length;
    setFiles((prev) => prev.map((file) => ({ ...file, allCompleted: completed })));
    setAllCompleted(completed);




    return { results, allCompleted: completed };
  };

  /*-- レンダリング後の処理 --*/
  useEffect(() => {
    if (allCompleted) {
      (async () => {
        try {
          await fetchImages(); // 画像一覧を再取得
          setToast('アップロードが完了しました', 'success');
        } catch (error) {
          console.error("画像の再取得に失敗:", error);
          setToast(`${MAX_IMAGE_SIZE}MB以内かファイルタイプや通信環境を確認してください。`, 'error');
        };
      })();
    }
  }, [allCompleted]);

  /*-- フックの状態と操作関数を返す --*/
  return { 
    allCompleted, 
    setAllCompleted, 
    uploadAll 
  };
}