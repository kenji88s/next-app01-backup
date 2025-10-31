/*-- スタイル --*/
import "@/styles/loader.css";

/* ======================================================================================= */

/* ローディングアニメーション */
export default function Loader() {
  return (
    <div className="sk-chase">
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
    </div>
  );  
}
