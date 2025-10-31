"use client";

/*-- コンポーネント --*/
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ModalContent from "@/components/ModalContent";
import FullImageModal from "@/components/FullImageModal";
import Gallery from "@/components/Gallery";
import Toast from "@/components/Toast";
import ReloadButton from "@/components/ReloadButton";

/*-- スタイル --*/
import "@/styles/globals.css";

/* ======================================================================================= */

export default function Home() {
  
  return (
    <>
      <div className="page">
        <Header />
        <main className="page__main">
          <Gallery />
        </main>
        <Footer />
      </div>
      <ModalContent />
      <FullImageModal />
      <Toast />
      <ReloadButton />
    </>
  );
}
