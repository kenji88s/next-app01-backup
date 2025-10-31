/*-- アプリ内の定数・設定 --*/
import { TAGLIST_DISPLAY_LIMIT } from "@/constants/config";

/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useTagContext } from "@/contexts/TagContext";

/*-- ユーティリティ関数 --*/
import { getTags } from "@/utils/getAllTags";
import { shuffleArray } from "@/utils/shuffleArray";

/* ======================================================================================= */

export function useSearchedTags() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { allImages } = useImageGalleryContext();
  const { selectedTag } = useTagContext();

  /*-- 関数などの定義・実行 --*/
  const tags = getTags();

  let matchedTags = shuffleArray(tags).slice(0, TAGLIST_DISPLAY_LIMIT);

  if (typeof selectedTag === "string" && selectedTag !== "") {
    matchedTags = tags
      .filter((tag) => tag.toLowerCase().startsWith(selectedTag.toLowerCase()))
      .slice(0, TAGLIST_DISPLAY_LIMIT);
  }

  const searchedList: { tag: string; image: string }[] = [];

  matchedTags.forEach((tag) => {
    const filteredImages = allImages.filter((img) => img.tags.includes(tag));
    if (filteredImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredImages.length);
      searchedList.push({
        tag: tag,
        image: filteredImages[randomIndex].url,
      });
    }
  });

  return searchedList;
}
