/* React組み込みフック */
import { useState } from "react";

/* アプリ内の定数・設定 */
import { SHEET_END_CELL } from "@/constants/config";

/* ライブラリ関数 */
import { fetchSheetData } from "@/libs/googleSheetsClient";

/* ======================================================================================= */

/* 親コンポーネントから渡されるプロパティの型定義 */
type DeleteResult = {
  success: boolean;
  error?: string;
};

type UploadedFile = {
  url: string;
  [key: string]: any;
};

/* ======================================================================================= */

export function useFileDelete(
  setFiles?: React.Dispatch<React.SetStateAction<UploadedFile[]>>
) {
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const handleDelete = async (rowId: string): Promise<DeleteResult> => {
    if (!rowId) return { success: false, error: "rowId not found" };

    // ✅ prev は string[]
    setLoadingIds((prev) => [...prev, rowId]);

    try {
      const rows = await fetchSheetData(`A2:${SHEET_END_CELL}`, false);

      // ID検索（A列にIDがある想定）
      const rowIndex = rows.findIndex((row) => row[0] === rowId);
      if (rowIndex === -1) {
        return { success: false, error: "指定されたIDが見つかりません" };
      }

      // C列（row[2]）に画像URLがある想定
      const url = rows[rowIndex][2];
      if (url) {
        await fetch("/api/drive/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        // ローカルの state からも削除
        setFiles?.((prev) => prev.filter((f) => f.url !== url));
      }

      // Google Sheets 側の行を削除
      const sheetRes = await fetch("/api/sheet/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rowIndex }),
      });

      const sheetData = await sheetRes.json();
      if (!sheetData.success) {
        throw new Error(sheetData.error || "Sheet delete failed");
      }

      return { success: true };
    } catch (err: unknown) {
      console.error(err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    } finally {
      // ✅ rowId に統一
      setLoadingIds((prev) => prev.filter((id) => id !== rowId));
    }
  };

  return { handleDelete, loadingIds };
}
