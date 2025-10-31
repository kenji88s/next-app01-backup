/*-- Next.js組み込み --*/
import { NextResponse } from "next/server";

/*-- vercel組み込み --*/
import { put } from "@vercel/blob";

/*-- アプリ内の定数・設定 --*/
import { STORAGE_TOKEN } from "@/constants/config";

/* ======================================================================================= */

/* vercel Blob内に画像アップロード */
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const blob = await put(file.name, file, {
    access: "public",
    token: STORAGE_TOKEN,
  });

  return NextResponse.json(blob);
}