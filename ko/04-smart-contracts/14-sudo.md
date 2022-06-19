---
sidebar_position: '14'
---

# Sudo 실행

Cosmos SDK의 놀라운 점 중 하나는 [거버넌스](https://docs.cosmos.network/v0.44/modules/gov/) 입니다. 네트워크 참가자는 네트워크의 미래를 결정하기 위한 제안에 투표할 수 있습니다. 제안에는 투표 결과에 따라 실행될 메시지가 포함될 수 있습니다.

우리는 신뢰할 수 있는 네이티브 Cosmos 모듈에서만 호출할 수 있는 스마트 컨트랙트 진입점을 정의할 수 있습니다. 이 진입점은 `sudo` 입니다. 사용자나 다른 스마트 컨트랙트를 호출할 수 없으며 Cosmos 모듈에서만 호출할 수 있습니다. 이것은 `sudo` 가 단순한 거버넌스 이상에 유용하다는 것을 의미합니다.

먼저 msg 타입이 필요합니다.

```rust
/// SudoMsg는 내부 코스모스 SDK 모듈만 호출할 수 있습니다..
/// 이 코드는 외부 유저나 컨트랙트가 호출할 수 없는 "관리자" 기능을 블록체인의 신뢰할 수 있는 코드(native/Go)가 사용할 수 있는지 보여줍니다.
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum SudoMsg {
    MoveFunds {
        recipient: String,
        amount: Vec<Coin>,
    },
}
```

다음 진입점:

```rust
#[entry_point]
pub fn sudo(_deps: DepsMut, _env: Env, msg: SudoMsg) -> Result<Response, HackError> {
    match msg {
        SudoMsg::MoveFunds { recipient, amount } => {
            let msg = BankMsg::Send {
                to_address: recipient,
                amount,
            };
            Ok(Response::new().add_message(msg))
        }
    }
}
```

이 코드는 정상적으로 테스트할 수 있습니다.

`multi-test` 를 사용할 때 컨트랙트 래퍼에 추가 호출을 추가해야 합니다.

```rust
pub fn contract_template() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        crate::contract::execute,
        crate::contract::instantiate,
        crate::contract::query,
    );
    let contract_with_sudo = contract.with_sudo(crate::contract::sudo);
    Box::new(contract_with_sudo)
}
```

## 제안

거버넌스가 실행하기 전에 스마트 컨트랙트를 인스턴스화해야 합니다.

거버넌스를 통해 스마트 컨트랙트를 실행하기 위한 인터페이스는 모든 제안에서 유사합니다.

앞서 정의한 메시지에 대한 JSON은 제안과 함께 제공되어야 합니다.

```shell
wasmd tx gov submit-proposal sudo-contract [contract_addr_bech32] [json_encoded_migration_args] [flags]
```

`json_encoded_migration_args` 는 JSON으로 인코딩된 `SudoMsg` 를 받습니다.

```json
{
  "move_funds": {
    "amount": "100000",
    "recipient": "wasm126kmp3ceapx2gxrju3uruxd2d440raxaz8xa90"
  }
}
```
