/* アップ処理中／後・画像削除のファイル情報を表す型定義 */
export type UploadedFile = {
  file: File;
  url: string;
  pathname?: string;
  uploading?: boolean;
  uploaded?: boolean;
  failed?: boolean;
};