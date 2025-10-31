/*-- 型定義 --*/
type FeatureItem = {
  href: string;
  title: string;
  label: string;
  visible: boolean;
};

/* データ構造の型 */
type FeatureList = {
  contents: Record<string, FeatureItem>;
};

/* ======================================================================================= */

/* 機能一覧 */
const Feature: FeatureList = {
  contents: {
    home: {
      href: "#home",
      title: "home",
      label: "ホーム",
      visible: false,
    },
    search: {
      href: "#search",
      title: "search",
      label: "検索",
      visible: false,
    },
    upload: {
      href: "#upload",
      title: "upload",
      label: "画像アップロード",
      visible: true,
    },
    tags: {
      href: "#tags",
      title: "tags",
      label: "タグ一覧",
      visible: true,
    },
    info: {
      href: "#info",
      title: "info",
      label: "アプリ説明",
      visible: true,
    },
  },
};

export default Feature;