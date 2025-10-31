/*-- Next.js組み込み --*/
import { NextResponse } from 'next/server';

/*-- アプリ内の定数・設定 --*/
import { SHEET_END_CELL } from "@/constants/config";

/*-- ライブラリ関数 --*/
import { fetchSheetData } from '@/libs/googleSheetsClient';

/* ======================================================================================= */

export async function GET() {
  try {

    /*-- スプレッドシートのデータを取得 --*/
    const rows = await fetchSheetData(`A1:${SHEET_END_CELL}`, false);
    // スプレッドシートの範囲 A1:E100 を取得（ヘッダー含む）

    /*-- 早期リターン --*/
    if (!rows || rows.length < 2) {
      return NextResponse.json([]);
    }
    // データが存在しない、または2行未満の場合は空配列を返す

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

    /*-- 更新成功メッセージなどを返す --*/
    return NextResponse.json(data);

  } catch (err: unknown) {

    /*-- エラーオブジェクトである場合 --*/
    if (err instanceof Error) {
      console.error('Sheets fetch error:', err.message);
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      );
    }

    /*-- エラーオブジェクトでない場合 --*/
    console.error('Sheets fetch error:', err);
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

