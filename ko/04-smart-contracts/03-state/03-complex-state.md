---
sidebar_position: '3'
---

# 복잡한 상태와 맵핑(Complex State and Maps)

물론 대부분의 사소하지 않은 예시에서, 추가적인 데이터를 저장해야할 필요가 있을 것입니다. 더 큰 JSON 데이터 구조를 직렬화하고 키-값 조회를 사용하여 이 데이터에 액세스할 수 있습니다.

CW20에서 CW20 잔액에 대한 주소 맵핑은 다음과 같은 맵을 통해 이루어집니다.

```rust
pub const BALANCES: Map<&Addr, Uint128> = Map::new("balance");
```

이에 대한 코드는 [여기](https://github.com/CosmWasm/cw-plus/blob/main/contracts/cw20-base/src/state.rs#L35) 에서 찾을 수 있습니다.

[여기](https://github.com/CosmWasm/cw-plus/blob/main/contracts/cw20-base/src/contract.rs#L303) 에서 `contract.rs` 와 상호 작용하는 방법을 볼 수 있습니다. 관련 스니펫은 다음과 같습니다.

```rust
let rcpt_addr = deps.api.addr_validate( & recipient) ?;
BALANCES.update(
deps.storage,
& rcpt_addr,
| balance: Option<Uint128> | -> StdResult<_ > { Ok(balance.unwrap_or_default() + amount) },
) ?;
```

풀어서 설명해 보겠습니다.

1. `deps.storage` 가 전달됩니다. 이것은 컨트랙트 컨텍스트에서 가져온 것입니다. `deps` 는 Cosmos SDK에서 본 `ctx` 와 유사합니다.
2. `&rcpt_addr` 은 검증된 수신자 주소에 대한 차용 참조(borrowed reference)입니다. 만약 이것이 유효하지 않으면 `let` 문에 오류가 발생했을 것입니다. 이것은 키/값 쌍에서 키에 해당합니다.
3. 세 번째 명령문은 `balance` 의 현재 값을 기반으로 일부 계산을 수행하는 `StdResult` 를 리턴하는 람다(익명 함수)입니다. 여기서 `balance` 는 값이고 `&rcpt_addr` 은 키입니다.

CW1155와 같은 보다 정교한 컨트랙트 통해 여러 코인을 생성하고 관리할 수 있습니다.

고급 사용법, 인덱싱 등을 보려면 다음을 확인하세요.

- [인덱싱(Indexes) in CosmWasm](https://docs.cosmwasm.com/tutorials/storage/indexes)
- [고급 상태 모델링(Advanced State Modeling) in CosmWasm](https://docs.cosmwasm.com/tutorials/storage/state-modeling)
- [CW 저장소 작동원리(How CW Storage Works)](https://docs.cosmwasm.com/tutorials/storage/key-value-store)
