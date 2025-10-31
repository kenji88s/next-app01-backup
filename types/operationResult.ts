/* 成功／失敗を含む処理結果の型定義 */
export type OperationResult = {
  success: boolean;
  error?: string;
};