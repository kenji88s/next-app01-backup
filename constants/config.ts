
/* 管理者のベーシック認証パスワード */
export const ADMIN_PASS: string = process.env.BASIC_ADMIN_PASS!;

/* ゲストのベーシック認証パスワード */
export const GUEST_PASS: string = process.env.BASIC_GUEST_PASS!;

/* アプリケーション名 */
export const APPLICATION_NAME: string = "TagSeacher";

/* アプリ説明 */
export const APPLICATION_DESCRIPTION = "このアプリは、購入したストック画像にタグを付け、目的の画像を効率的に検索・管理できるツールです。\n※画像はすべてAIで生成されています。";

/* 検索フォーム下のタグの表示件数上限 */
export const TAGLIST_DISPLAY_LIMIT: number = 5;

/* サムネイル初期表示件数 */
export const THUMB_INITIAL_COUNT: number = 30;

/* サムネイル追加表示件数 */
export const THUMB_INCREMENT_COUNT: number = 10;

/* 初期表示するモーダルのモード（空文字で非表示）  */
export const DEFAULT_MODAL_MODE: string = "#info"; // #info, #tags etc

/* 初期表示するモーダルの非表示時間（分単位）  */
export const DEFAULT_MODAL_HIDE_TIMES: number = 180;

/* スプレッドシートのID名 */
export const SHEET_ID: string = process.env.GOOGLE_SHEET_ID!;

/* スプレッドシートのシート名 */
export const SHEET_NAME: string = process.env.GOOGLE_SHEET_NAME!;

/* スプレッドシートの取得範囲の終了セル */
export const SHEET_END_CELL: string = "D1000"; // A1またはA2から

/* スプレッドシートのタグの列 */
export const SHEET_TAGS_COLUMN: string = "D"; // アルファベットで指定

/* スプレッドシートのメアド */
export const SHEET_EMAIL: string = process.env.GOOGLE_CLIENT_EMAIL!;

/* スプレッドシートのキー名 */
export const SHEET_KEY: string = process.env.GOOGLE_PRIVATE_KEY!;

/* ストレージ（vercel Blob）のトークン */
export const STORAGE_TOKEN: string = process.env.BLOB_READ_WRITE_TOKEN!;

/* 画像ファイルの最大サイズ */
export const MAX_IMAGE_SIZE: number = 4.5;