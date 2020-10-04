// jest 가 cli 에서 테스트 할 수 없는 `alert` 같은 메서드는 아래처럼 테스트 생략하도록 해줘야 한다.
window.alert = () => null;
