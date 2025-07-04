# 사용중인 모듈들 설명

1.

# 프로젝트 구조도 설명

```
Front-end/
├── src/
├── electron/
├── mobile/
│   ├── dist/ (vite 빌드 파일)
│   ├── node_modules/ ($ npm install로 받은 모듈들)
│   ├── release/ (electron-builder 빌드 파일)
│   ├── src/renderer/
│   │   ├── App.vue
│   │   ├── index.html
│   │   ├── main.js
│   │   ├── style.css
│   │   ├── api/
│   │   ├── assets/
│   │   │   ├── fonts/
│   │   │   │   └── code128.ttf
│   │   │   └── logo.png
│   │   ├── components/
│   │   │   ├── Canvas/
│   │   │   │   ├── CoupangLabel.vue
│   │   │   │   ├── LabelTemplate.vue
│   │   │   │   └── ProdStdLabel.vue
│   │   │   ├── common/
│   │   │   │   ├──  (여기서부터 작업 시작)
│   ├── .env
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── .prettierrc
│   ├── .project
│   ├── cleanupOldLogs.cjs
│   ├── electron-main.cjs
│   ├── electron-newWindow.cjs
│   ├── electron-print.cjs
│   ├── generate-release-html.cjs
│   ├── package-lock.json
│   ├── package.json
│   ├── post-release.cjs
│   ├── preload.cjs
│   ├── release-note.html
│   ├── release-notes.md
│   ├── store.cjs
│   ├── update.html
└───└── vite.config.js
```

#

# Health-Boosting Frontend

## Capacitor 사용 예정

```
@capacitor/core   	Capacitor 핵심 기능
@capacitor/cli	    명령어 실행용 CLI
@capacitor/android	안드로이드 플랫폼 지원
```
