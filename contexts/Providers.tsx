/*-- アプリ内フック・ロジック --*/
import { ToastProvider } from "@/contexts/ToastContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { TagProvider } from "@/contexts/TagContext";
import { ImageGalleryProvider } from "@/contexts/ImageGalleryContext";
import { TagEditorProvider } from "@/contexts/TagEditorContext";

/* ======================================================================================= */

/* コンテキスト総括 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ModalProvider>
        <TagProvider>
          <ImageGalleryProvider>
            <TagEditorProvider>
              {children}
            </TagEditorProvider>
          </ImageGalleryProvider>
        </TagProvider>
      </ModalProvider>
    </ToastProvider>
  );
}