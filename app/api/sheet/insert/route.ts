/* Next.js組み込み */
import { NextRequest, NextResponse } from 'next/server';

/* アプリ内の定数・設定 */
import { SHEET_NAME } from "@/constants/config";

/* ライブラリ関数 */
import { getSheetsClient } from '@/libs/googleSheetsClient';

/* ======================================================================================= */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { values } = body; // フロントから { values: [...] } で送信

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

    return NextResponse.json({ success: true, data: res.data }, { status: 200 });

  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}