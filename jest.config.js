module.exports = {
  // 모듈 확장자 생략시 추정할 확장자
  moduleFileExtensions: ['js', 'json'],
  // 경로 alias
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // 테스트 환경 셋업 스크립트
  setupFiles: ['<rootDir>/jest.setup.js'],
  // 테스트 환경
  testEnvironment: 'jsdom',
  // 테스트 파일 경로 패턴
  testMatch: ['**/?(*.)+(spec|test).js?(x)'],
  // 테스트 제외 할 경로
  testPathIgnorePatterns: ['/node_modules/'],
  // 테스트 코드에 적용할 바벨 설정
  transform: {
    '^.+\\.(js|jsx)?$': [
      'babel-jest',
      {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      },
    ],
  },
  // 테스트 결과 상세 출력
  verbose: true,
};
