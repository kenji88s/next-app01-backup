/* Next.js組み込み */
import { NextResponse } from "next/server";

/* vercel組み込み */
import { put } from "@vercel/blob";

/* ======================================================================================= */

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const blob = await put(file.name, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json(blob); // { url, pathname, size, ... }
}