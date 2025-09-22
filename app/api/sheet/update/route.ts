/* Next.js組み込み */
import { NextRequest, NextResponse } from 'next/server';

/* アプリ内の定数・設定 */
import { SHEET_NAME, SHEET_END_CELL, SHEET_TAGS_COLUMN } from "@/constants/config";

/* ライブラリ関数 */
import { fetchSheetData, getSheetsClient } from '@/libs/googleSheetsClient';

/* ======================================================================================= */

/**
 * PUTリクエストハンドラー
 * 指定されたIDの行のタグ列（D列）を更新する処理
 */
export async function PUT(req: NextRequest) {
  // リクエストボディから更新対象のIDと新しいタグ文字列を取得
  const { id, newTags } = await req.json();

  try {
    // Google Sheetsクライアント取得（書き込み権限あり）
    const { sheets, spreadsheetId } = await getSheetsClient();

    // スプレッドシートのデータを取得（A2:E100、ヘッダー除く）
    const rows = await fetchSheetData(`A2:${SHEET_END_CELL}`, false);

    // 指定されたIDが存在する行を検索（IDはA列にある想定）
    const rowIndex = rows.findIndex(row => row[0] === id);
    if (rowIndex === -1) {
      // 見つからなければ404エラーを返す
      return NextResponse.json({ error: '指定されたIDが見つかりません' }, { status: 404 });
    }

    // スプレッドシートは1始まりかつヘッダーが1行目にあるため、実際の行番号を計算
    const targetRow = rowIndex + 2;

    // 該当行のD列（タグ列）を新しいタグで更新
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAME}!${SHEET_TAGS_COLUMN}${targetRow}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[newTags]],
      },
    });

    // 更新成功メッセージを返す
    return NextResponse.json({ message: 'タグを更新しました' });
} catch (err: unknown) {
  if (err instanceof Error) {
    console.error('タグ更新エラー:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  console.error('タグ更新時の不明なエラー:', err);
  return NextResponse.json({ error: '不明なエラーが発生しました' }, { status: 500 });
}
}