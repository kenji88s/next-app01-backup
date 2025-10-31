/*-- Next.js組み込み --*/
import { NextRequest, NextResponse } from 'next/server';

/*-- アプリ内の定数・設定 --*/
import { SHEET_NAME, SHEET_END_CELL, SHEET_TAGS_COLUMN } from "@/constants/config";

/*-- ライブラリ関数 --*/
import { fetchSheetData, getSheetsClient } from '@/libs/googleSheetsClient';

/* ======================================================================================= */

export async function PUT(req: NextRequest) {
  
  try {
    
    /*-- リクエストボディからの分割代入 --*/
    const { id, newTags } = await req.json();

    /*-- スプレッドシートのデータを取得 --*/
    const { sheets, spreadsheetId } = await getSheetsClient();
    const rows = await fetchSheetData(`A2:${SHEET_END_CELL}`, false);
    // 指定されたIDが存在する行を検索（IDはA列にある想定）
    const rowIndex = rows.findIndex(row => row[0] === id);

    /*-- 早期リターン --*/
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

    
    /*-- 更新成功メッセージなどを返す --*/
    return NextResponse.json(
      { message: 'タグを更新しました' }
    );

  } catch (err: unknown) {

    /*-- エラーオブジェクトである場合 --*/
    if (err instanceof Error) {
      console.error('Tag update error:', err.message);
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      );
    }

    /*-- エラーオブジェクトでない場合 --*/
    console.error('Tag update error:', err);
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}