/*-- Next.js組み込み --*/
import { NextResponse } from "next/server";

/*-- アプリ内の定数・設定 --*/
import { SHEET_END_CELL } from "@/constants/config";

/*-- ライブラリ関数 --*/
import { fetchSheetData } from "@/libs/googleSheetsClient";

/* ======================================================================================= */

export async function POST(req: Request) {

  try {

    /*-- リクエストボディからの分割代入 --*/
    const { rowId } = await req.json();

    /*-- スプレッドシートのデータを取得 --*/
    const rows = await fetchSheetData(`A2:${SHEET_END_CELL}`, false);

    /*-- 早期リターン --*/
    if (!rowId) {
      return NextResponse.json(
        { success: false, error: "rowId is required" },
        { status: 400 }
      );
    }

    const rowIndex = rows.findIndex((row) => row[0] === rowId);
    if (rowIndex === -1) {
      return NextResponse.json(
        { success: false, error: "指定されたIDが見つかりません" },
        { status: 404 }
      );
    }

    const url = rows[rowIndex][2];
    const sheetRowIndex = rowIndex + 2;

    /*-- 更新成功メッセージなどを返す --*/
    return NextResponse.json(
      { success: true, rowIndex: sheetRowIndex, url },
      { status: 200 }
    );

  } catch (err: unknown) {

    /*-- エラーオブジェクトである場合 --*/
    if (err instanceof Error) {
      console.error('Row fetch error:', err.message);
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
  
    /*-- エラーオブジェクトでない場合 --*/
    console.error('Row fetch error:', err);
    return NextResponse.json(
      { success: false, error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
