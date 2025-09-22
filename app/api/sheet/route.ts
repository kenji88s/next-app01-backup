/* Next.js組み込み */
import { NextResponse } from 'next/server';

/* アプリ内の定数・設定 */
import { SHEET_END_CELL } from "@/constants/config";

/* ライブラリ関数 */
import { fetchSheetData } from '@/libs/googleSheetsClient';

/* ======================================================================================= */

/**
 * GETリクエストハンドラー
 * Google Sheetsのスプレッドシートからデータを取得し、
 * 1行目をヘッダーとしてそれ以降の行をオブジェクト化して返す
 */
export async function GET() {
  try {
    // スプレッドシートの範囲 A1:E100 を取得（ヘッダー含む）
    const rows = await fetchSheetData(`A1:${SHEET_END_CELL}`, false);

    // データが存在しない、または2行未満の場合は空配列を返す
    if (!rows || rows.length < 2) {
      return NextResponse.json([]);
    }

    // 1行目をヘッダーとして取り出す
    const headers = rows[0];

    // 2行目以降の行をヘッダーをキーにしたオブジェクトに変換
    const data = rows.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((key, index) => {
        obj[key] = row[index] || ''; // 値がない場合は空文字列をセット
      });
      return obj;
    });

    // JSONでレスポンスを返す
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Google Sheets API エラー:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Errorオブジェクトでない場合の対応
    console.error('不明なエラー:', error);
    return NextResponse.json({ error: '不明なエラーが発生しました' }, { status: 500 });
  }
}