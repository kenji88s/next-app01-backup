/* Next.js組み込み */
import { NextRequest, NextResponse } from "next/server";

/* アプリ内の定数・設定 */
import { SHEET_NAME } from "@/constants/config";

/* ライブラリ関数 */
import { getSheetsClient } from "@/libs/googleSheetsClient";

/* ======================================================================================= */

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  try {
    const { sheets, spreadsheetId } = await getSheetsClient();

    // スプレッドシートからID一覧を取得（A列のみ）
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A2:A`,
    });
    const rows = res.data.values || [];

    // ID検索
    const rowIndex = rows.findIndex((row) => row[0] === id);
    if (rowIndex === -1) {
      return NextResponse.json(
        { success: false, error: "指定されたIDが見つかりません" },
        { status: 404 }
      );
    }

    // sheetId を取得
    const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheet = sheetMeta.data.sheets?.find(
      (s) => s.properties?.title === SHEET_NAME
    );
    if (!sheet?.properties?.sheetId) {
      throw new Error("Sheet not found");
    }

    // 行削除リクエスト
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheet.properties.sheetId,
                dimension: "ROWS",
                startIndex: rowIndex + 1, // A2 が index=0 なので +1
                endIndex: rowIndex + 2,
              },
            },
          },
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
