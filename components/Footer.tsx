/*-- アプリ内の定数・設定 --*/
import { APPLICATION_NAME } from "@/constants/config";

/*-- スタイル --*/
import "@/styles/footer.css";

/* ======================================================================================= */

/* フッター */
export default function Footer() {
  
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © 2025 {APPLICATION_NAME}. Built with Next.js.
      </p>
    </footer>
  );
}
