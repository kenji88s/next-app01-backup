/*-- vercel組み込み --*/
import { del } from "@vercel/blob";

/* ======================================================================================= */

/* vercel Blob内の画像削除 */
export async function DELETE(req: Request) {
  const { url } = await req.json();
  await del(url);

  return Response.json(
    { ok: true }
  );
}
