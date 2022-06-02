---
sidebar_position: '6'
---

# Events

대부부분의 entry point 함수는 `Result<Response, ContractError>` 타입을 반환합니다.

여기서, `Response` 는 Cosmos SDK의 [Events](https://docs.cosmos.network/v0.42/core/events.html) 에 대한 래퍼(wrapper)입니다.

`Response` 타입은 컨트랙트 entry point (i.e. `instantiate` 혹은 `execute`)의 성공적인 결과로 반환되어야 합니다. 이는 변경 가능으로 선언하고 함수 본문에 추가할 수 있지만 더 일반적인 패턴은 마지막에 구성하고 모든 계산이 성공한 경우 반환하는 것입니다. 다음 예시에서, `Response` 는 <code>Right</code> 또는 success 브랜치를 나타내며 이는  `Result` <br>타입을 반환하는 함수의 일부로 리턴되기 때문에 `Ok` 에 의해 래핑됩니다.

이에 대한 예외는 Cosmos SDK 인터페이스로 인해 `StdResult<Binary>` 를 반환하는 `query` 입니다.

Response의 소스는 [이해하는 데 도움이](https://github.com/CosmWasm/cosmwasm/blob/main/packages/std/src/results/response.rs#L65) 될 수 있습니다.

`Response` 의 가장 간단한 사용법은 다음과 같습니다.

```rust
Ok(Response::default ())
```

이는 클라이언트에게 메시지를 반환하지 않는 [instantiate 함수](https://github.com/CosmWasm/cw-plus/blob/main/contracts/cw20-base/src/contract.rs#L151) 에서 일반적입니다.

그러나, 대부분의 `execute` 처리 케이스에서, `Response` 는 반환되어야 합니다:

```rust
let res = Response::new()
.add_attribute("action", "transfer")
.add_attribute("from", info.sender)
.add_attribute("to", recipient)
.add_attribute("amount", amount);
Ok(res)
```

여기에 해야할 것이 있으니 한번 살펴봅시다. 소스는 [여기서](https://github.com/CosmWasm/cw-plus/blob/main/contracts/cw20-base/src/contract.rs#L239) 볼 수 있습니다.

1. 새로운 `Response` 가 생성됩니다.
2. 몇 개의 키/값 쌍들이 추가됩니다.
3. 이는 `Ok` 를 사용하여 `Result` 타입으로 래핑되어 반환됩니다.

커맨드 라인 인터페이스(CLI)를 통해 컨트랙트를 호출하는 경우 다른 SDK 이벤트와 함께 `"raw_log"` 응답의 일부로 기록된 것을 볼 수 있습니다.

attribute를 추가하는 것 대신, `.add_event`를 사용하여 래핑되지 않은(unwrapped) 이벤트를 추가할 수 있습니다.

이러한 이벤트는 다른 클라이언트 또는 컨트랙트와 상호 작용할 수 있습니다.
