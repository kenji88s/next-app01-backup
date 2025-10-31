/*-- コンポーネント --*/
import Loader from "@/components/Loader";

/* ======================================================================================= */

type LoadingAreaPropsType = {
  dataPlace?: string; //どこに配置するか（省略時は "loader"）
  isProcessing: boolean; //何か進行中の状態
};

/* ======================================================================================= */

/* ローディングエリア */
export default function LoadingArea({ dataPlace, isProcessing }: LoadingAreaPropsType) {  
  
  /*-- 早期リターン --*/
  if (!isProcessing) return null;
  /* ↑ ローディング中などが無効や解除[!isProcessing]で非表示 */

  return (
    <div
      className="loading-area"
      data-type={dataPlace ?? "loader"}
    >
      <Loader />
    </div>
  );  
}
