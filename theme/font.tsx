/*-- Next.js組み込み --*/
import { Noto_Sans_JP, Poppins } from "next/font/google";

/* ======================================================================================= */

/* Noto Sans JP フォント設定 */
export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/* Poppins フォント設定 */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});