"use client";

/* アプリ内フック・ロジック */
import { useModal } from "@/contexts/ModalContext";

/* コンポーネント */
import IconClose from "@/components/IconClose";

/* ======================================================================================= */

/* 親コンポーネントから渡されるプロパティの型定義 */
type Props = {
  clearSelection?: () => void;
  /* ↑ モーダルを閉じるなどのアクション */
};

/* ======================================================================================= */

/* モーダルなどの右上に配置する「閉じるボタン」 */
export default function CloseButton({ clearSelection }: Props) {

  /* コンテキスト・フックからの分割代入 */
  const { closeModal } = useModal();

  /* 関数の定義 */
  const handleClick = () => {
    if (clearSelection) {
      clearSelection();
    } else {
      closeModal();
    }
  };

  return (
    <button onClick={handleClick} className="btn-close">
      <IconClose />
    </button>
  );
}