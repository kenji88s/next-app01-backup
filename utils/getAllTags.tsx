/* 型定義 */
import type { ImageData } from "@/types/image";

/* ライブラリ関数 */
import { fetchSheetItems } from "@/libs/fetchSheetItems";

/* ======================================================================================= */

let tagList: string[] = []; // ← 非同期取得後に格納する同期的な変数

// 初回に非同期で取得してtagListにセット
const loadTags = async () => {
  const data = await fetchSheetItems();
  const tagSet = new Set<string>();

  data.forEach((img: ImageData) => {
    const tags =
      typeof img.tags === "string"
        ? img.tags.split(",").map((tag) => tag.trim())
        : img.tags;

    tags.forEach((tag) => {
      if (tag) tagSet.add(tag);
    });
  });

  tagList = Array.from(tagSet);
};

// 他のモジュールからは同期的に取得できる
export const getTags = (): string[] => {
  loadTags();
  return tagList;
};
