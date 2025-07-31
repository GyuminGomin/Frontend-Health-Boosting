# 개발속도의 저하 원인

```
모르는 걸 그때그때 Chatgpt로 해결하지만,
구체적 맥락은 빠르게 지나쳐 어중간하게 아는 듯한 느낌

이주에 하루는 무조건 공부한걸 정리하는 시간을 가지기로 하자 (하루종일)
블로그 Tstory

목표의 전구는 '미래의 나를 위한 문서'

1. 기간 ~ 기간 : 이번 기간 이슈 요약

2. 기간 ~ 기간 : 이슈 발생 이유

3. 기간 ~ 기간 : 해결 방법

4. 기간 ~ 기간 : 참고 자료


이해 -> 정리 -> 반복의 과정에서 단단한 뿌리가 만들어진다.
```

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
