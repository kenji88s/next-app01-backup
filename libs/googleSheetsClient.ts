/* Node.jsライブラリ */
import { google } from 'googleapis';

/* アプリ内の定数・設定 */
import { SHEET_ID, SHEET_EMAIL, SHEET_KEY } from "@/constants/config";

/* ======================================================================================= */

/**
 * Google Sheets API クライアントを初期化して返す（readonly 権限も指定可能）
 */

// 共通認証ロジック
export const getSheetsClient = async (readonly = false) => {
  if (!SHEET_ID || !SHEET_EMAIL || !SHEET_KEY) {
    throw new Error('Required environment variables are missing');
  }

  const scopes = readonly
    ? ['https://www.googleapis.com/auth/spreadsheets.readonly']
    : ['https://www.googleapis.com/auth/spreadsheets'];

  const auth = new google.auth.JWT(
    SHEET_EMAIL,
    undefined,
    SHEET_KEY.replace(/\\n/g, '\n'),
    scopes
  );

  const sheets = google.sheets({ version: 'v4', auth });
  return { sheets, spreadsheetId: SHEET_ID };
};

// 共通データ取得ロジック（範囲指定付き）
export const fetchSheetData = async (range: string, readonly = true) => {
  const { sheets, spreadsheetId } = await getSheetsClient(readonly);

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return res.data.values || [];
};