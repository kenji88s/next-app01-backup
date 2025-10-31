"use client";

/*-- アプリ内フック・ロジック --*/
import { useImageGalleryContext } from "@/contexts/ImageGalleryContext";
import { useModalContext } from "@/contexts/ModalContext";

/*-- ユーティリティ関数 --*/
import { getTags } from "@/utils/getAllTags";

/*-- コンポーネント --*/
import CloseButton from "@/components/CloseButton";
import SwipeHandle from "@/components/SwipeHandle";

/*-- スタイル --*/
import "@/styles/tagList.css";

/* ======================================================================================= */

/* モーダルの中のタグリスト */
export default function TagList() {

  /*-- コンテキスト・フックからの分割代入 --*/
  const { handleTagClick } = useImageGalleryContext();
  const { showModal, mode, closeModal } = useModalContext();

  /*-- 関数などの定義・実行 --*/
  /* 全タグ取得後、五十音順にソート */
  const tags = getTags();
  const sortedTags = [...tags].sort((a, b) => a.localeCompare(b, "ja"));

  /*-- 早期リターン --*/
  if (mode !== "#tags") return null;
  /* ↑ モード[mode:#tags]が無効もしくは解除で非表示 */

  return (
    
    /* [showModal]判定でフェードイン／アウト */
    <div
      className="tag-list"
      data-state={`${showModal ? "fade-in" : "fade-out"}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Xボタン、モーダルを閉じる[closeModal] */}
      <CloseButton clickAction={() => closeModal()} />

      {/* 表示中[showModal]のみ有効、モーダルを閉じる[closeModal] */}
      <SwipeHandle showTarget={showModal} swipeAction={closeModal} />

      {/* 五十音順ソートタグ[sortedTags]1件以上で表示 */}
      {sortedTags.length > 0 && (
        <ul className="tag-list__list">
          {sortedTags.map((tag, index) => (
            <li
              key={index}
              className="tag-list__item"
            >
              {/* 画像をタグ絞込[handleTagClick(tag)]、モーダル閉じる[closeModal] */}
              <button
                className="tag-list__button"
                onClick={() => {
                  handleTagClick(tag);
                  closeModal();
                }}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}