/*-- 型定義 --*/
import type { ImageData } from "@/types/imageData";

/*-- ライブラリ関数 --*/
import { fetchSheetItems } from "@/libs/fetchSheetItems";

/* ======================================================================================= */

let tagList: string[] = [];

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

export const getTags = (): string[] => {
  loadTags();
  return tagList;
};
