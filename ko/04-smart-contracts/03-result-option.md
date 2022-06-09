---
sidebar_position: '2'
---

# Result 와 Option

Rust 에서, `Result` 와 `Option` 타입의 사용은 매우 일반적입니다. 만약, 타입스크립트에서 `fp-ts`, 스칼라와 같은 언어에서 함수적 특징, 혹은 Haskell 과 같은 강타입 함수형 언어를 사용해 본 적이 있다면, 이것들은 친숙할 것입니다.

이 타입들은 둘 다  containers, 혹은 열거형 타입입니다. 즉, 이들은 varinat 에서 다른 값들을 포함합니다.

대수적 데이터 타입에 친숙하다면, 다음으로 설명하는 것이 효과적일 수 있습니다.

```rust

enum Option<T> {
  Some(T),
  // 존재
  None, // 존재하지 않음
}

enum Result<T, E> {
  Ok(T),
  // 성공
  Err(E), // 실패
}
```

## Result

`Result` 는 열거형 타입이고, `Result<T, E>`에서 <br> `T` 와 `E` 는 둘 다 성공과 실패를 나타내는 제네릭 입니다. 이를 다음과 같이 부릅니다.

- `Ok(T)` - `T` 를 포함하는 성공한 `Result` 컨테이너
- `Err(E)` - `E` 를 포함하는 실패한 `Result` 컨테이너

result 타입은 개념적으로 다른 함수형 언어에서의 `Either` 와 비슷합니다. 많은 컨트랙트의 entry points 들은 `Result<Response, ContractError>`로 입력됩니다. 이 경우에, `ContractError` 컨트랙트가 실패 혹은 `Left` 케이스인 동안, `Response` 는`Right` 혹은 `Success` 브랜치입니다.

그러나, `Result` 타입들이 entry points 와 핸들러에서만 사용되는 것은 아닙니다.

예를 들어`execute` entry points 에서, 이들은 종종 enums 을 매치시키는 함수에 사용됩니다.

우리는 `execute` 가 입력된 CW20-base 에서 `Result<Response, ContractError>`를 볼 수 있습니다.    `ExecuteMsg::Transfer` 와 매치되는 첫 번째 브랜치에서 함수 호출을 살펴봅시다.

```rust
execute_transfer(deps, env, info, recipient, amount)
```

매치 브랜치가  entry point 와 동일하게 입력된 함수를 호출할 것으로 예상할 수 있습니다. 그리고 [그들은](https://github.com/CosmWasm/cw-plus/blob/main/contracts/cw20-base/src/contract.rs#L173).

```rust
pub fn execute_transfer(
  deps: DepsMut,
  _env: Env,
  info: MessageInfo,
  recipient: String,
  amount: Uint128,
) -> Result<Response, ContractError> {
  if amount == Uint128::zero() {
    return Err(ContractError::InvalidZeroAmount {});
  }

  let rcpt_addr = deps.api.addr_validate(&recipient)?;

  BALANCES.update(
    deps.storage,
    &info.sender,
    |balance: Option<Uint128>| -> StdResult<_> {
      Ok(balance.unwrap_or_default().checked_sub(amount)?)
    },
  )?;
  BALANCES.update(
    deps.storage,
    &rcpt_addr,
    |balance: Option<Uint128>| -> StdResult<_> { Ok(balance.unwrap_or_default() + amount) },
  )?;

  let res = Response::new()
    .add_attribute("action", "transfer")
    .add_attribute("from", info.sender)
    .add_attribute("to", recipient)
    .add_attribute("amount", amount);
  Ok(res)
}
```

### StdResult

또한 `StdResult` 에 대해 알아둘 가치가 있습니다. 이것은 `query` 핸들러 및 이들에서 호출되는 함수에서 자주 사용됩니다.

예를 들어, 정의된 오류 브랜치가 없는 경우를 제외하고 [nameservice contract](https://github.com/CosmWasm/cw-examples/blob/main/contracts/nameservice/src/contract.rs#L95)에서 `Result`와 같은 `StdResult`를 볼 수 있습니다.

```rust
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
  match msg {
    QueryMsg::ResolveRecord { name } => query_resolver(deps, env, name),
    QueryMsg::Config {} => to_binary(&config_read(deps.storage).load()?),
  }
}
```

`query_resolver` 의 구현을 봅시다.

```rust
fn query_resolver(deps: Deps, _env: Env, name: String) -> StdResult<Binary> {
  let key = name.as_bytes();

  let address = match resolver_read(deps.storage).may_load(key)? {
    Some(record) => Some(String::from(&record.owner)),
    None => None,
  };
  let resp = ResolveRecordResponse { address };

  to_binary(&resp)
}
```

여기서 중요한 점은 일반적으로 컨테이너 유형이 모두 정렬되어 있는 한 무시할 수 있다는 것입니다. 모든 타입이 정확하기만 하면, 코드는 컴파일 될 것입니다. 그런 다음 내부에 포함된 값으로 작업하기 위해서는 간단하게 container 타입을 올바르게 매치시키거나 unwrap 할 필요가 있습니다.

## Option

Rust에는 대부분의 다른 주류 프로그래밍 언어와 달리 `nil` 또는`null` 이라는 개념이 없습니다. 대신 존재 또는 비존재의 개념을 container 타입으로 인코딩하는 `Option` 유형이 있습니다.

`Option<T>` 는 두 가지 varinat 가 있는 enum 타입입니다.

- `Some(<wrapped-value>)` - `Some` 은 `.unwrap()` 을 통해 접근할 수 있는 내부 값을 래핑합니다. 이것은 rust 코드 전체에서 일치하는 것 뿐만 아니라 이를 볼 수 있습니다.
- `None` - `None`

이것은 구조체의 키에 대해 값이 존재하지 않을 수 있음을 표현하는 것과 같은 작업을 수행하는 데 유용합니다.

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Config {
  pub purchase_price: Option<Coin>,
  pub transfer_price: Option<Coin>,
}
```

출처는 [여기](https://github.com/InterWasm/cw-contracts/blob/main/contracts/nameservice/src/state.rs#L13) 입니다. 왜 그런지 알 수 있습니다 - 이 값을 [instantiation](https://github.com/InterWasm/cw-contracts/blob/main/contracts/nameservice/src/msg.rs#L6)로부터 가져오는데, 여기서 값은 또한 `Option` 입니다 :

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
  pub purchase_price: Option<Coin>,
  pub transfer_price: Option<Coin>,
}
```

위의 `Result` 예시에서, `Option` 사용 예시를 살펴봤습니다. storage를 읽으려고 하면 결과가 있거나 아무것도 없을 것입니다. 이와 같은 상황을 처리하기 위해 `match` operator를 사용하여 두 가지 경우를 패턴화하는 것이 일반적입니다.

```rust
let address = match resolver_read(deps.storage).may_load(key)? {
Some(record) => Some(String::from( & record.owner)),
None => None,
};
```

`None` 이 리턴되어 error state인 경우, 규칙에 따라`None` 을 처리하는 것 대신 에러를 발생시키는 것을 고려해야합니다.
