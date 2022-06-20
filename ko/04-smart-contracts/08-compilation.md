---
sidebar_position: '8'
---

# Compilation

컨트랙트를 사용하려면 먼저 컴파일한 다음 체인에 저장해야 합니다.

가장 쉬운 컴파일 방법은 `cargo` 를 사용하는 것입니다.

```sh
cargo wasm
```

이는 개발용으로 충분합니다. 그러나, 이는 생산 가스 비용 문제에서 최적화 되지 않을 것입니다. 아래와 같이 불필요한 코드를 제거하고 보다 가벼운 빌드를 생성할 수 있습니다.

```sh
RUSTFLAGS='-C link-arg=-s' cargo wasm
```

그러나, 대부분의 경우, 옵티마이저 도커 이미지를 사용하기를 원할 것입니다. 코드 경로에 더 잘 맞도록 아래 snippet 의 경로를 변경해야 할 수도 있습니다.

```sh
sudo docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.12.4
```
