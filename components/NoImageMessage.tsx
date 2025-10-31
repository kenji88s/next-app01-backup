/*-- コンポーネント --*/
import IconAlert from "@/components/IconAlert";

/*-- スタイル --*/
import "@/styles/noImageMessage.css";

/* ======================================================================================= */

/* 該当する画像がないアラート */
export default function NoImageMessage() {
  return (
    <div className="no-image-message">
      <div className="no-image-message__icon">
        <IconAlert />
      </div>
      <p className="no-image-message__text">該当する写真が見つかりません</p>
    </div>
  );  
}
