/*-- Next.js組み込み --*/
import { NextRequest, NextResponse } from "next/server";

/*-- アプリ内の定数・設定 --*/
import { SHEET_NAME } from "@/constants/config";

/*-- ライブラリ関数 --*/
import { getSheetsClient } from "@/libs/googleSheetsClient";

/* ======================================================================================= */

export async function DELETE(req: NextRequest) {
  
  try {

    /*-- リクエストボディからの分割代入 --*/
    const { rowIndex } = await req.json();

    /*-- スプレッドシートのデータを取得 --*/
    const { sheets, spreadsheetId } = await getSheetsClient();


    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheet = sheetMeta.data.sheets?.find(
      (s) => s.properties?.title === SHEET_NAME
    );
    if (!sheet?.properties?.sheetId) {
      throw new Error("Sheet not found");
    }

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheet.properties.sheetId,
                dimension: "ROWS",
                startIndex: rowIndex - 1, // 0始まりなので -1
                endIndex: rowIndex,       // 削除対象の次の行
              },
            },
          },
        ],
      },
    });

    /*-- 更新成功メッセージなどを返す --*/
    return NextResponse.json(
      { success: true }
    );

  } catch (err: unknown) {

    /*-- エラーオブジェクトである場合 --*/
    if (err instanceof Error) {
      console.error('Row delete error:', err.message);
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }

    /*-- エラーオブジェクトでない場合 --*/
    console.error('Row delete error:', err);
    return NextResponse.json(
      { success: false, error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
