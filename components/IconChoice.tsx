/* コンポーネント */
import IconUpload from "@/components/IconUpload";
import IconHash from "@/components/IconHash";
import IconInfo from "@/components/IconInfo";

/* スタイル */
import "@/styles/navigation.css";

/* ======================================================================================= */

/* 親コンポーネントから渡されるプロパティの型定義 */
type Props = {
  title: string;
  /* ↑ ナビゲーションボタンの種類もしくは機能 */
};

/* ======================================================================================= */

/* ナビゲーションに配置するアイコン */
export default function IconChoice({ title }: Props) {
  
  return (
    <span className="navigation__icon">
      {title === "upload" && <IconUpload />}
      {title === "tags" && <IconHash />}
      {title === "info" && <IconInfo />}
    </span>
  );
}
