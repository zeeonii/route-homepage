# Route Homepage

`Route Homepage`는 여행 큐레이션 서비스를 주제로 만든 React + Vite 기반 랜딩 페이지입니다.

사용자가 여행지, 기간, 인원, 테마를 선택하고 감성적인 큐레이션 카드를 둘러보는 흐름을 중심으로 구성했습니다.

## 프로젝트 소개

- 스플래시 화면 이후 메인 홈 화면으로 자연스럽게 전환됩니다.
- 여행지 필터 UI를 통해 원하는 조건을 선택할 수 있습니다.
- 큐레이션 카드가 자동으로 전환되며 여행 테마를 보여줍니다.
- 검색창과 메뉴 오버레이 인터랙션을 포함했습니다.

## 기술 스택

- React 18
- Vite 5
- CSS

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버 실행 후 브라우저에서 기본 주소(`http://localhost:5173`)를 열면 됩니다.

## 빌드 방법

```bash
npm run build
```

## 배포

이 프로젝트는 GitHub Pages 배포를 기준으로 설정되어 있습니다.

## 폴더 구조

```text
src/
  App.jsx
  main.jsx
  styles.css
  data/content.js
public/
  route-icon.png
  route-logo.png
```

## 회고

간단한 여행 서비스 메인 화면을 직접 구성하면서,
화면 전환, 오버레이 인터랙션, 큐레이션 콘텐츠 표현을 중심으로 UI 흐름을 구현했습니다.
