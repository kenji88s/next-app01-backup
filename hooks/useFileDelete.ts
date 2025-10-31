/*-- React組み込みフック --*/
import { useState } from "react";

/*-- 型定義 --*/
import type { OperationResult } from "@/types/operationResult";

/*-- アプリ内フック・ロジック --*/
import { useToastContext } from "@/contexts/ToastContext";

/* ======================================================================================= */

type FileDeleteItemsType = {
  url: string; //Blobでの画像URL
};

/* ======================================================================================= */

export function useFileDelete(
  setFiles?: React.Dispatch<React.SetStateAction<FileDeleteItemsType[]>>
) {

  /*-- 状態管理の定義 --*/
  const [isDeleting, setIsDeleting] = useState(false);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  /*-- コンテキスト・フックからの分割代入 --*/
  const { setToast } = useToastContext();

  /*-- 関数などの定義・実行 --*/
  const handleDelete = async (rowId: string): Promise<OperationResult> => {
    if (!rowId) return { success: false, error: "rowId not found" };

    // ✅ すでに削除中なら二重実行を防ぐ
    if (loadingIds.includes(rowId)) {
      return { success: false, error: "This row is already deleting" };
    }

    setLoadingIds((prev) => [...prev, rowId]);

    try {
      setIsDeleting(true);
      // ✅ API から rowIndex と url を取得
      const res = await fetch("/api/sheet/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rowId }),
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, error: data.error || "rowId lookup failed" };
      }

      const { rowIndex, url } = data;

      // Drive 側の削除
      if (url) {
        await fetch("/api/drive/delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        // ローカル state の更新
        setFiles?.((prev) => prev.filter((f) => f.url !== url));
      }

      // Sheets 側の削除
      const sheetRes = await fetch("/api/sheet/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rowIndex }),
      });

      const sheetData = await sheetRes.json();
      if (!sheetData.success) {
        throw new Error(sheetData.error || "Sheet delete failed");
      }

      setToast('画像を削除しました', 'success');

      return { success: true };
    } catch (err: unknown) {
      console.error(err);
      setToast('画像の削除に失敗しました', 'error');
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== rowId));
      setTimeout(() => {
        setIsDeleting(false);
      }, 300);
    }
  };

  /*-- フックの状態と操作関数を返す --*/
  return { 
    isDeleting, 
    loadingIds, 
    handleDelete 
  };
}
