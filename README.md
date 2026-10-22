# 곽호준 포트폴리오

Next.js 정적 사이트입니다. `npm run build` 하면 `out/` 폴더에 순수 HTML/CSS가 만들어져서 Vercel, GitHub Pages, Netlify 어디에든 올릴 수 있습니다.

## 실행

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # out/ 폴더에 정적 파일 생성
```

## 내용 수정

모든 문구는 `app/content.ts` 배열(`skillGroups`, `projects`)에 모여 있습니다. 색과 글꼴은 `app/globals.css` 맨 위 `:root` 변수에서 바꿉니다.
