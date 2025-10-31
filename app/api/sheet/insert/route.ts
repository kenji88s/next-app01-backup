/*-- Next.js組み込み --*/
import { NextRequest, NextResponse } from 'next/server';

/*-- アプリ内の定数・設定 --*/
import { SHEET_NAME } from "@/constants/config";

/*-- ライブラリ関数 --*/
import { getSheetsClient } from '@/libs/googleSheetsClient';

/* ======================================================================================= */

export async function POST(req: NextRequest) {

  try {

    /*-- リクエストボディからの分割代入 --*/
    const body = await req.json();
    const { values } = body;

    /*-- スプレッドシートのデータを取得 --*/
    const { sheets, spreadsheetId } = await getSheetsClient();

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [values],
      },
    });

    /*-- 更新成功メッセージなどを返す --*/
    return NextResponse.json(
      { success: true, data: res.data },
      { status: 200 }
    );

  } catch (err: unknown) {

    /*-- エラーオブジェクトである場合 --*/
    if (err instanceof Error) {
      console.error('Row insert error:', err.message);
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
  
    /*-- エラーオブジェクトでない場合 --*/
    console.error('Row insert error:', err);
    return NextResponse.json(
      { success: false, error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}