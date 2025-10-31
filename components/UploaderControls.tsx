/*-- 型定義 --*/
import type { UploadedFile } from "@/types/uploadedFile";

/* ======================================================================================= */

type UploaderControlsPropsType = {
  files: UploadedFile[]; //候補画像の配列
  setFiles: (files: UploadedFile[]) => void;
  isUploading: boolean; //アップロード進行中
  setIsUploading: (value: boolean) => void;
  allCompleted: boolean; //全画像アップ完了
  setAllCompleted: (value: boolean) => void;
  handleUploadAll: () => void; //アップロード処理
};

/* ======================================================================================= */

export default function UploaderControls({ 
  files, setFiles, handleUploadAll, isUploading, setIsUploading, allCompleted, setAllCompleted }
  : UploaderControlsPropsType) {

  return (
    <div className="uploader-controls">
      
      {/* アップロード中ではないとき、かつ候補画像があるとき */}
      {!isUploading && files && files.length > 0 && (

      /* アップロード開始[handleUploadAll()]、アップロード状態を更新[setIsUploading(true)] */
      <button
        className="uploader-controls__button btn--normal"
        type="button"
        onClick={() => {
          handleUploadAll();
          setIsUploading(true);
        }}
      >
        アップロード
      </button>
      )}

      {/* アップロード完了時 または（アップロード中ではなく候補画像があるとき） */}
      {(allCompleted || (!isUploading && files && files.length > 0)) && (

        /* アップの候補[setFiles([])]・進行中[setIsUploading(false)]・完了[setAllCompleted(false)]をリセット */
        <button
          className="uploader-controls__button btn--normal"
          type="button"
          onClick={() => {
            setFiles([]);
            setIsUploading(false);
            setAllCompleted(false);
          }}
        >
          リセット
        </button>
      )}
    </div>
  );
}