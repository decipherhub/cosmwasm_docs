---
sidebar_position: '2'
---

# Cosmic dApp logic

[`CosmWasm/dApps [Logic]`](https://github.com/CosmWasm/dApps/tree/master/packages/logic) 패키지는 CosmJS 기반 dApp을 보다 쉽게 개발할 수 있도록 세 가지 리소스 *[config](#config)* , *[utils](#utils)*, *[service](#service)*를 제공합니다. 밸런스 체커 dApp을 더 잘 이해할 수 있도록, 이 애플리케이션에서 사용하는 유틸리티를 살펴보겠습니다.

## Config {#config}

주어진 체인에서 작동하도록 설정하는 AppConfig 정의는 아래와 같습니다.

```typescript
export interface AppConfig {
  readonly chainId: string;
  readonly chainName: string;
  readonly addressPrefix: string;
  readonly rpcUrl: string;
  readonly httpUrl: string;
  readonly faucetUrl: string;
  readonly feeToken: string;
  readonly stakingToken: string;
  readonly faucetToken: string;
  readonly coinMap: CoinMap;
  readonly gasPrice: number;
  readonly codeId?: number;
}
```

이 튜토리얼에서는 Heldernet 환경설정을 사용합니다.

위의 대부분의 필드들은 이름 그대로 이해할 수 있습니다. 한가지 이해하기 어려운 필드인 `coinMap`은 네이티브 코인의 이름으로 구성된 맵이고, `nativeCoinToDisplay()`을 이용해 토큰의 양을 보기좋게 표시해 줍니다. 관련 코드는 아래와 같습니다.

```typescript
{
  ucosm: {
    denom: "COSM", fractionalDigits
  :
    6
  }
,
  ustake: {
    denom: "STAKE", fractionalDigits
  :
    6
  }
,
}
```

## Utils {#utils}

config 파일을 정의할 때 도움이 되는 `CoinMap`에 대한 정의를 이 리소스에서 찾을 수 있습니다.

에러 및 토큰 관련 여러 유틸리티 함수도 있으나, 이 튜토리얼에서는 `[@cosmjs/launchpad](https://github.com/cosmos/cosmjs/tree/main/packages/launchpad)` `Coin` 과 `CoinMap` 두 가지 매개변수를 사용하는 `nativeCoinToDisplay()` 만 사용합니다.

이 유틸리티 함수는 두 매개변수와 `[@cosmjs/math](https://github.com/cosmos/cosmjs/tree/main/packages/math)` 의 `Decimal` 클래스를 사용해서 밸런스 체커에서 네이티브 토큰을 출력하는 데 사용하는 더 사용자 친화적인`amount` 필드를 가진 `Coin` 을 리턴합니다.

## Service {#service}

Service 리소스는 [React](https://reactjs.org/) context 프로바이더, 몇가지 유틸리티 함수, `[ProtectedSwitch](#protectedswitch)` React 컴포넌트를 제공합니다.

### Sdk provider {#sdk-provider}

`useSdk` hook으로 Sdk 프로바이더와 상호작용할 수 있습니다. `SigningCosmWasmClient`에 접근해서 체인에 쿼리를 보낼 수 있습니다.

### Account provider {#account-provider}

`useAccount` hook은 Account 프로바이더의 상태를 가지고 있어 사용자의 주소나 잔고를 얻는데 유용합니다.

### ErrorProvider {#errorprovider}

`useError` hook으로 전역 에러 값을 변경하거나 쿼리를 보낼 수 있습니다.

### CW20 {#cw20}

이 유틸리티는 CW20 컨트랙트와 상호작용할 수 있는 여러 함수를 제공합니다. 밸런스 체커를 예로 들면, 주어진 CW20 컨트랙트의 잔고에 대한 쿼리를 보낼 때 사용할 수 있습니다.

### ProtectedSwitch {#protectedswitch}

`react-router-dom` `Switch`를 감싸고 있는 컴포넌트입니다. 사용자가 로그인 과정을 끝냈을 때 해당 route 이동을 허용합니다.
