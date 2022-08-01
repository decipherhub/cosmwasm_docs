---
sidebar_position: '4'
---

# dApp 부트스트랩

새로운 dApp을 부트스트랩하는 두가지 방식이 있습니다. 모노레포에서 [Lerna](https://lerna.js.org/) 패키지를 사용하거나, standalone app을 사용하는 것입니다.

## Monorepo template {#monorepo-template}

이 방법을 이용하면, 지역 `logic`과 `design` 패키지 의존성을 사용하는 또 다른 lena 패키지를 `packages/` 디렉토리에 설치하게 됩니다.

이를 위해 `_template` 디렉토리를 `packages/`에 복사하고 이름을 `balance-checker`로 바꾸기만 하면 됩니다.

```shell
git clone https://github.com/CosmWasm/dApps.git
cd dApps
cp -r _template packages/balance-checker
```

다음 섹션에서 필요에 맞게 커스터마이징을 시작합니다.

## Standalone template {#standalone-template}

👷 곧 업데이트 됩니다.
