/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',     // 小型スマホ対応
        'sm': '375px',     // スマホ標準
        'md': '768px',     // タブレット縦
        'lg': '1024px',    // ノートPC標準
        'xl': '1440px',    // デスクトップ
        '2xl': '2560px',   // 4K対応
      }
    }
  },
  plugins: [],
};
