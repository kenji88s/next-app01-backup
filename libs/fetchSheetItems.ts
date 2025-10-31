/*-- 型定義 --*/
import type { ImageData } from "@/types/imageData";

/* ======================================================================================= */

export const fetchSheetItems = async (): Promise<ImageData[]> => {

  const res = await fetch('/api/sheet');

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status}`);
  }

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