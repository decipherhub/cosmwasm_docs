---
sidebar_position: '5'
---

# Query

쿼리는 메세지의 또다른 방식입니다. 쿼리를 데이터 베이스 읽기나 상태를 조회하는 방법으로 생각할 수 있습니다.

컨트랙트 작성자가 코드를 구성한 방식에 따라, 일반적으로 `msg.rs` 나 `query.rs` 에서 사용 가능한 쿼리 메세지를 찾을 수 있을 것입니다.

외부 클라이언트(over API or via CLI) 혹은 내부 클라이언트(컨트랙트 내에서, 다른 컨트랙트로)를 통해 쿼리할 수 있습니다. 이 기능의 작동 방식에 대한 자세한 내용은 [ Querying Architecture 섹션 ](/03-architecture/04-query.md)을 참조하십시오.

사용하는 대부분의 쿼리는 사용자 지정 쿼리입니다. 이들은 읽기 전용 모드에서 컨트랙트의 데이터 저장소에 액세스합니다. 이러한 쿼리는 데이터를 조회하고 필요에 따라 추가적인 계산 또는 처리를 수행할 수 있습니다. 결과적으로 이러한 쿼리에 가스 제한이 적용됩니다.

사용자 지정 쿼리는 `QueryMsg` 열거형으로 구성되어 있고, 컨트랙트의 `query` 함수에서 처리됩니다.

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
  // ResolveAddress 는 name 이 resolve 된 현재 주소를 반환합니다
  ResolveRecord { name: String },
  Config {},
}
```

[여기](https://github.com/InterWasm/cw-contracts/blob/main/contracts/nameservice/src/msg.rs#L20) 컨텍스트에서 이 예제의 코드를 찾을 수 있습니다.

그런 다음 컨트랙트는 이를 `query` 함수에서 처리합니다:

```rust
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
  match msg {
    QueryMsg::ResolveRecord { name } => query_resolver(deps, env, name),
    QueryMsg::Config {} => to_binary(&config_read(deps.storage).load()?),
  }
}
```

여기서 `query_resolver` 는 다른 함수일 뿐이고,`config_read` 는 데이터 저장소에 대한 접근을 래핑하는 헬퍼입니다.

사용자 지정 쿼리는 [the query function](https://github.com/InterWasm/cw-contracts/blob/main/contracts/nameservice/src/contract.rs#L95) 을 통해 확인할 수 있습니다.
