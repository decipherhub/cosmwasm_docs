---
sidebar_position: '1'
---

# 소개

이 튜토리얼에서는 [CosmJS](https://github.com/cosmos/cosmjs) 기반 dApp을 구축하는 방법을 배우게 됩니다. 예제 dApp은 주소를 입력하면 네이티브 토큰 및 CW20 토큰의 잔고를 확인할 수 있는 밸런스 체커입니다.

## 뷰 {#views}

다음과 같습니다.

### 로그인 {#login}

![image](assets/frontend-dapp/login.png)

### 네이티브 잔고 {#native-balance}

![image](assets/frontend-dapp/balance-native.png)

### CW20 잔고 {#balance-of-a-cw20-contract}

![image](assets/frontend-dapp/balance-cw20.png)

### 컨트랙트가 없는 경우의 에러 {#error-for-address-with-no-contract}

![image](assets/frontend-dapp/balance-error.png)

## 환경 설정 {#setup-environment}

[Visual Studio Code](https://code.visualstudio.com) 사용을 추천하지만, 이 튜토리얼에서는 다른 에디터를 사용해도 괜찮습니다.

선호하는 방법으로 [`CosmWasm/dApps`](https://github.com/CosmWasm/dApps) 모노레포의 최신 릴리즈로 다운로드해주세요.
