/*-- React組み込みフック --*/
import { useState } from "react";

/*-- 型定義 --*/
import type { OperationResult } from "@/types/operationResult";

/* ======================================================================================= */

export function useFileDownload() {

  /*-- 状態管理の定義 --*/
  const [loading, setLoading] = useState(false);

  /*-- 関数などの定義・実行 --*/
  const downloadFile = async (url: string, fileName: string): Promise<OperationResult> => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(blobUrl);
      setLoading(false);
      return { success: true };
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  /*-- フックの状態と操作関数を返す --*/
  return { 
    downloadFile, 
    loading 
  };
}
