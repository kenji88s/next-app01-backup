/* 画像情報の型定義（スプレッドシート1行目の項目） */
export type ImageData = {
  id: string; //セルIDはランダムで生成
  /* ↑ hVTMIHHF */
  pathname: string; //Blob内でのファイルパス
  /* ↑ my-image.png */
  url: string; //公開されているファイルの URL
  /* ↑ https://blob.vercel.com/my-project/my-image.png */
  tags: string[] | string; //設定したタグ
};
