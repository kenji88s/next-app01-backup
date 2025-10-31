"use client";

/*-- コンポーネント --*/
import IconClose from "@/components/IconClose";

/* ======================================================================================= */

type CloseButtonPropsType = {
  dataPlace?: string; //どこに配置するか（省略時は "close"）
  clickAction: () => void; //モーダルを閉じるなどの処理
};

/* ======================================================================================= */

/* モーダルなどの右上に配置する「閉じるボタン」 */
export default function CloseButton({ dataPlace, clickAction }: CloseButtonPropsType) {

  return (
    /* 親コンポーネントからのクリック処理を実行[clickAction] */
    <button
      className="btn-close"
      data-type={dataPlace ?? "close"}
      onClick={clickAction}
    >
      <IconClose />
    </button>
  );
}