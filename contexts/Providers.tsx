/* アプリ内フック・ロジック */
import { TagProvider } from "@/contexts/TagContext";
import { TagEditorProvider } from "@/contexts/TagEditorContext";
import { ImageGalleryProvider } from "@/contexts/ImageGalleryContext";
import { ModalProvider } from "@/contexts/ModalContext";

/* ======================================================================================= */

/* コンテキスト総括 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <TagProvider>
        <ImageGalleryProvider>
          <TagEditorProvider>
            {children}
          </TagEditorProvider>
        </ImageGalleryProvider>
      </TagProvider>
    </ModalProvider>
  );
}