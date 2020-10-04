# redux saga study :rocket:

## 목표
- [x] CRA 없이 프로젝트 세팅을 할 수 있다.
    - [x] Webpack
    - [x] Babel
- [x] 리액트 훅에 대해 이해한다.
    - [x] 커스텀 훅을 이해하고 구현한다. (게시글마다 작성 후 시간 경과 표시, textarea 높이 자동 증가)
- [x] thunk 와 saga 의 차이에 대해 이해한다.
- [x] styled-jsx 를 사용해본다.
- [x] intersection-observer API 를 사용해 무한 스크롤을 구현한다.
    - [x] 커스텀 훅으로 기능을 분리한다.


##### 주의사항

서버영역과, 마크업 부분은 스터디를 위해 제공받은 부분으로, 제가 구현하지 않았음을 알립니다.

## Babel

### Babel 세팅에 도움된 사이트 목록

1. [babel-cli 설치 및 기초사용법](https://babeljs.io/docs/en/babel-cli)
2. [babel 공식 문서 첫 페이지](https://babeljs.io/docs/en/)

### 권장 사용법들

1. babel-cli 를 글로벌로 설치하지 않고 core 와 함께 로컬에 설치한 후 `npx babel ...` 같이 `npx` 와 함께 사용하는 것이 권장된다.
2. `npx babel src/app.js --out-file public/scripts/app.js --presets=@babel/env,@babel/react` 로 프리셋을 적용해 babel compile 된 파일(`public/scripts/app.js`)을 만들어낼 수 있다.
3. 위 명령어 뒤에 `--watch` 를 붙여 파일이 변화될 때마다 자동으로 babel 을 실행시킬 수 있다.

## Prettier

prettier 가 devDependencies 로 설치된 상황에서 `npx mrm lint-staged` 명령어를 통해 pre-commit 훅을 설정할 수 있다. 이 명령어는 알아서 `husky`, `lint-staged` 같은 필요한 라이브러리를 설치하고, `package.json` 파일에 설정 코드까지 작성해준다.
