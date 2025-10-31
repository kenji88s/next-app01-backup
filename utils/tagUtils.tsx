/* 入力値からタグを分割・生成 */
export function parseHashTags(tags: string): string[] {
  return tags
    .split("#")
    .map(t => t.trim())
    .filter(t => t.length > 0)
    .map(t => `#${t}`);
  /* ↑ #で区切り空白・空文字を除去、#を先頭に付加 */
}