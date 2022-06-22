---
sidebar_position: '2'
---

# 간단한 상태(Simple State)

상태는 스마트 컨트랙트가 데이터 저장 및 검색과 함께 작동하는 곳입니다. 기존 애플리케이션의 데이터베이스 상호 작용 계층과 매우 유사하다고 생각하시면 됩니다.

상태를 작성하는 가장 간단한 방법은 단일 항목(single item)을 작성하는 것입니다.

예를 들어, `cw20-base` 컨트랙트에서 `TokenInfo` 는 컨트랙트가 인스턴스화될 때 작성됩니다.

첫번째로, `state.rs` 에 `TokenInfo` 유형이 선언됩니다.

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub struct TokenInfo {
  pub name: String,
  pub symbol: String,
  pub decimals: u8,
  pub total_supply: Uint128,
  pub mint: Option<MinterData>,
}
```

그런 다음, 스토리지가 초기화됩니다.

```rust
pub const TOKEN_INFO: Item<TokenInfo> = Item::new("token_info");
```

컨트랙트에서, 우리는 `instantiate` 함수에서 데이터가 어떻게 저장되는지를 알 수 있습니다.

```rust
let data = TokenInfo {
name: msg.name,
symbol: msg.symbol,
decimals: msg.decimals,
total_supply,
mint,
};
TOKEN_INFO.save(deps.storage, & data) ?;
```

위는 [코드 컨텍스트](https://github.com/CosmWasm/cw-plus/blob/main/contracts/cw20-base/src/contract.rs#L90) 입니다.
