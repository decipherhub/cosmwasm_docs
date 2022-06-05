---
sidebar_position: '4'
---

# 컨트랙트를 다운로드하고 컴파일하기

이 섹션에서는 샘플 컨트랙트를 다운로드한 뒤,  wasm 바이너리 실행 파일로 컴파일하는 방법을 설명합니다.

먼저 [client setup instructions](03-setting-env.md)을 검토한 뒤, 클라이언트를 구성하셔야합니다. Node.js REPL 또는 Go CLI를 사용하시면 됩니다.

## 컨트랙트를 컴파일링하고 테스트하는 방법 {#compiling-and-testing-contract}

[`cw-contracts`](https://github.com/InterWasm/cw-contracts) 를 수집하는 리포지토리를 다운로드하고 name service를 모방한 기존의 간단한 name service 컨트랙트를 사용해 보겠습니다. 해당 튜토리얼은 사실상 cosmos-sdk 입문 튜토리얼입니다. 먼저 리포지토리를 clone하고 wasm 번들을 만들어보겠습니다.

```shell
# 코드 클론하기
git clone https://github.com/InterWasm/cw-contracts
cd cw-contracts
git checkout main
cd contracts/nameservice

# Stable toolchain을 사용하여 wasm 컨트랙트를 컴파일하기
rustup default stable
cargo wasm
```

컴파일한 뒤 `target/wasm32-unknown-unknown/release/cw_nameservice.wasm` 파일을 생성해야 합니다. 간단한 `ls -lh` 는 약 1.7MB로 표시됩니다. 릴리스 빌드이지만 불필요한 코드가 모두 제거되지는 않습니다. 훨씬 더 작은 버전을 생성하려면 다음을 실행하여 컴파일러에게 사용되지 않는 모든 코드를 제거하도록 지시할 수 있습니다.

```shell
RUSTFLAGS='-C link-arg=-s' cargo wasm
```

이것은 약 162kB의 파일을 생성합니다. [최적화된 컴파일 섹션](#optimized-compilation) 에서 위와 다른 최적화 프로그램을 사용하여 블록체인에 업로드된 최종 제품을 생성합니다. 이 작업을 직접 실행하는 것을 자세히 이해할 필요는 없지만, 이러한 방식으로 계약의 최종 크기에 대한 생각을 해야합니다.

## 유닛 테스트 {#unit-tests}

유닛 테스트를 실행해보겠습니다.

```shell
RUST_BACKTRACE=1 cargo unit-test
```

몇가지 컴파일 단계를 거치고 나면, 아래의 메세지를 보게될 것입니다:

```text
running 5 tests
test contract::tests::cannot_initialize_expired ... ok
test contract::tests::proper_initialization ... ok
test contract::tests::init_and_query ... ok
test contract::tests::handle_refund ... ok
test contract::tests::handle_approve ... ok

test result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

`RUST_BACKTRACE=1` 은 모든 오류에 대한 전체 스택 추적을 제공하므로 유용하게 쓸 수 있습니다. 이것은 유닛 테스트에서만 작동합니다(컴파일된 wasm이 아닌 기본 rust 코드를 테스트합니다). 또한, `cargo wasm` 및 `cargo unit-test`는 `.cargo/config` 에 정의된 alias일 뿐입니다. cargo flag를 이해하려면 `.cargo/config` 를 살펴보시면 됩니다.

## 컴파일링 최적화하기 {#optimized-compilation}

가스 비용을 줄이려면 바이너리 크기가 작을수록 좋습니다. 바이너리 크기가 작을수록 배포 비용이 절감되고 모든 상호 작용에 대한 수수료가 낮아집니다. 이를 도와주는 도구가 있습니다. <a>Rust-optimizer</a> 를 사용하여 <strong>production 코드 최적화</strong>를 할 수 있습니다. **Rust-optimizer** 는 CosmWasm 스마트 컨트랙트의 재현 가능한??? 빌드를 생성합니다. 써드파티가 해당 컨트랙트가 실제로 claim된 코드인지 확인할 수 있다는 것을 의미합니다.

```shell
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.12.4
```

바이너리는 `artifacts` 에 있으며 크기는 `138k` 입니다.
