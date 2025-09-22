/* 型定義 */
import type { ImageData } from "@/types/image";

/* ======================================================================================= */

export const fetchSheetItems = async (): Promise<ImageData[]> => {
  // /api/sheet 経由でスプレッドシートのデータを取得
  const res = await fetch('/api/sheet');

  // レスポンスが正常でない場合はエラーをスロー（ステータスコード付き）
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status}`);
  }

  // JSON 形式でデータを取得
  const rawData = await res.json();

return rawData.map((item: any) => {

    return {
      id: item.id,
      pathname: item.pathname,
      url: item.url,
      tags: item.tags?.split(" ").map((t: string) => t.trim()) ?? [],
    };
  });
};