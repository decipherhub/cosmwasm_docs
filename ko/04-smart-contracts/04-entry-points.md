---
sidebar_position: '4'
---

# Entry points

진입점 혹은 *핸들러*는 메세지나 쿼리가 컨트랙트에 의해 처리되는 부분입니다.

앞으로 이야기할 세 개의 함수들은 명시적으로 entry point 로 표시되어 있고, 라이브러리에서 번들로 제외됩니다:

```rust
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
  deps: DepsMut,
  _env: Env,
  _info: MessageInfo,
  msg: InstantiateMsg,
) -> Result<Response, StdError> {
  // ...etc
}
```

이 핸들러들은 :

1. `InstantiateMsg` 구조체에 정의된 바와 같이, `instantiate`에 의해 처리되는 메세지를 인스턴스화합니다.
2. `ExecuteMsg` enum 에 정의된 바와 같이, 메세지들은 패턴 매칭 `match` statement 을 사용하여, `execute` 함수에 의해 처리됩니다.
3. `QueryMsg` enum 에 정의된 바와 같이, 쿼리들은 패턴-매치를 사용하여 `query` 함수에 의해 처리됩니다.

`execute`와 `query` 는 처리하는 enum들이 모든 variant 와 완전히 일치해야 하지만 `instantiate` 는 오직 전달된 구조체만 처리하면 됩니다.

일반적으로, `instantiate` 와 `execute` 는 `Result<Response, ContractError>` 타입을 갖지만, `query` 는 네이티브 코스모스 SDK  `Querier` 로 인해 `StdResult<Binary>`를 갖습니다.
