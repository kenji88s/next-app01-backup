/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useTagContext } from "@/contexts/TagContext";
import { useTagEditorContext } from "@/contexts/TagEditorContext";

/* ======================================================================================= */

export function useHooks() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { setShowFullImage, setSelectedImage } = useImageGalleryContext();
  const { setShowTags } = useTagContext();
  const { setShowEditor } = useTagEditorContext();

  /*-- 関数などの定義・実行 --*/
  const clearSelection = () => {
    setShowFullImage(false);
    setShowEditor(false);
    setShowTags(false);
    setTimeout(() => setSelectedImage(null), 500);
  };
  
  /*-- フックの状態と操作関数を返す --*/
  return {
    clearSelection,
  };
};


