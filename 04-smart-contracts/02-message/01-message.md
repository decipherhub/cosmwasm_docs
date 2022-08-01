---
sidebar_position: '1'
---

# 메시지

메시지는 CosmWasm 스마트 컨트랙트와 상호 작용하는 방법입니다. 대부분의 컨트랙트를 살펴보면 메시지를 정의하는 `msg.rs` 파일이 있을 것입니다.

인스턴스화 메시지는 일반적으로 `msg.rs` 에서 `InstantiateMsg` 로 별도 정의된 다음, 메인`contract.rs` 의 `instantiate` 함수에 의해 처리된다는 점에서 차이가 있습다.

여기에서 사용하는 예제는 매우 간단합니다. 혹시 어떤 인수를 전달할 수 있는지 혼동된다면 컨트랙트의 `schema` 폴더를 살펴보세요. 적어도 두 개의 관련 파일을 확인할 수 있을 것입니다.

- `instantiate_msg.json` - 인스턴스화 메시지의 예상되는 모양 및 유형
- `execute_msg.json` - 컨트랙트가 액션을 실행하는 데 사용할 수 있는 각각의 메시지의 예상 모양 및 유형

넓은 영역의 API를 가지는 일부 컨트랙트는 더 많은 스키마 파일들을 가지고 있습니다. 이를 탐색하여 원하는 메시지나 명령을 찾으십시오.

nameservice 예제 컨트랙트의 경우 컨트랙트가 인스턴스화되면 두 개의 유효한 메시지만 존재합니다.

```rust
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
  Register { name: String },
  Transfer { name: String, to: String },
}
```

이 코드의 컨텍스트는 [여기](https://github.com/InterWasm/cw-contracts/blob/main/contracts/nameservice/src/msg.rs#L13) 에 있습니다.

이는 `contract.rs` 에서 작업할 수 있습니다. 이들 각각은 다음과 같이 `execute` 함수에서 처리됩니다.

```rust
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
  deps: DepsMut,
  env: Env,
  info: MessageInfo,
  msg: ExecuteMsg,
) -> Result<Response, ContractError> {
  match msg {
    ExecuteMsg::Register { name } => execute_register(deps, env, info, name),
    ExecuteMsg::Transfer { name, to } => execute_transfer(deps, env, info, name, to),
  }
}
```

[execute function](https://github.com/InterWasm/cw-contracts/blob/main/contracts/nameservice/src/contract.rs#L31) 소스 코드를 확인하세요.
