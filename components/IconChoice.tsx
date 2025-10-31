/*-- コンポーネント --*/
import IconUpload from "@/components/IconUpload";
import IconHash from "@/components/IconHash";
import IconInfo from "@/components/IconInfo";

/* ======================================================================================= */

type IconChoicePropsType = {
  title: string; //Gナビボタンの種類・機能
};

/* ======================================================================================= */

/* ナビゲーションに配置するアイコン */
export default function IconChoice({ title }: IconChoicePropsType) {
  
  return (
    <span className="btn-icon">
      {/* アイコンをタイトル[title]で選択 */}
      {title === "upload" && <IconUpload />}
      {title === "tags" && <IconHash />}
      {title === "info" && <IconInfo />}
    </span>
  );
}
