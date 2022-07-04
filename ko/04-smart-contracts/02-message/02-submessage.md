---
sidebar_position: '2'
---

# 서브메시지

메시지는 SDK 모듈 또는 다른 CW 스마트 컨트랙트와 상호 작용하는 데 사용됩니다. 메시지는 set-and-forget 방식으로 실행되기 때문에 호출 성공 여부에 대한 응답을 받지 못합니다. 다음과 같은 경우에 호출 결과를 얻는 것이 매우 유용할 수 있습니다.

1. 새로운 컨트랙트 인스턴스화 및 컨트랙트 주소 가져오기
2. 액션을 실행하고 결과가 성공했다는 것을 표명하기(예: 특정 토큰이 컨트랙트로 전송되었는지 확인)
3. 트랜잭션을 롤백하는 대신 크로스 컨트랙트 호출의 오류 처리

스마트 컨트랙트에서 보낸 메시지의 결과를 얻기 위해서는 서브메시지를 발송해야 합니다.

[서브메시지의 의미와 서브메시지 실행 순서](https://github.com/CosmWasm/cosmwasm/blob/main/SEMANTICS.md#submessages) 에 대해 더 알아보세요.

## 서브메시지 만들기

서브메시지는 `SubMsg` 구조체에서 `CosmMsg` 를 래핑합니다. `SubMsg` 구조체는 다음 필드로 구성되어 있습니다.

```rust
pub struct SubMsg<T> {
    pub id: u64,                // 응답을 처리하는 데 사용될 reply_id
    pub msg: CosmosMsg<T>,      // 보낼 메시지
    pub gas_limit: Option<u64>, // 서브메시지에 대한 gas_limit
    pub reply_on: ReplyOn,      // 응답이 보내져야 하는 시기를 결정하는 flag
}
```

`SubMsg` 구조체의 [소스 코드](https://github.com/CosmWasm/cosmwasm/blob/main/packages/std/src/results/submessages.rs) 를 확인해 보세요.

다음은 서브메시지를 사용하여 `cw20` 토큰을 인스턴스화하는 예시입니다.

```rust
const INSTANTIATE_REPLY_ID = 1u64;

// 새로운 cw20토큰을 생성하는 메시지 만들기
let instantiate_message = WasmMsg::Instantiate {
    admin: None,
    code_id: msg.cw20_code_id,
    msg: to_binary(&Cw20InstantiateMsg {
        name: "new token".to_string(),
        symbol: "nToken".to_string(),
        decimals: 6,
        initial_balances: vec![],
        mint: Some(MinterResponse {
            minter: env.contract.address.to_string(),
            cap: None,
        }),
    })?,
    funds: vec![],
    label: "".to_string(),
};

// 위 메시지를 래핑하는 서브메시지 만들기
let submessage = SubMsg::reply_on_success(instantiate_message.into(), INSTANTIATE_REPLY_ID);

// 서브메시지로 응답 생성
let response = Response::new().add_submessage(submessage);
```

## 응답 전략

서브메시지는 다른 컨트랙트에 응답을 제공하기 위한 다양한 옵션을 제공합니다. 다음 네 가지 응답 옵션을 선택할 수 있습니다.

```rust
pub enum ReplyOn {
    /// SubMsg가 처리된 뒤 항상 콜백 수행
    Always,
    /// 성공의 경우 콜백을 처리하지 않고, SubMsg가 에러를 리턴한 경우에만 콜백.
    Error,
    /// 에러의 경우 콜백을 처리하지 않고, SubMsg가 성공한 경우만 콜백.
    Success,
    /// 콜백을 만들지 않음 - 이는 오리지널 CosmosMsg semantics와 유사합니다.
    Never,
}
```

위의 예에서는 `SubMsg::reply_on_success` 약칭을 사용하여 하위 메시지를 만들었습니다. 그러나 하위 메시지를 만들고 응답 전략을 명시적으로 지정할 수도 있습니다.

```rust
let submessage = SubMsg {
    gas_limit: None,
    id: INSTANTIATE_REPLY_ID,
    reply_on: ReplyOn::Success,
    msg: instantiate_message.into()
}
```

## 응답 처리하기

다른 컨트랙트로부터의 응답을 처리하기 위해 호출 컨트랙트는 새로운 진입점(entry point)을 구현해야 합니다. 다음은 응답을 처리하는 방법의 두가지 예시입니다 :

### 새로운 컨트랙트 인스턴스화

```rust
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn reply(deps: DepsMut, _env: Env, msg: Reply) -> StdResult<Response> {
    match msg.id {
        INSTANTIATE_REPLY_ID => handle_instantiate_reply(deps, msg),
        id => Err(StdError::generic_err(format!("Unknown reply id: {}", id))),
    }
}

fn handle_instantiate_reply(deps: DepsMut, msg: Reply) -> StdResult<Response> {
	// msg 데이터 처리 및 컨트랙트 주소 저장
	// See: https://github.com/CosmWasm/cw-plus/blob/main/packages/utils/src/parse_reply.rs
	let res = parse_reply_instantiate_data(msg)?;

    // res.contract_address 저장
	Ok(Response::new())
}
```

### 토큰 전송에 대한 응답 처리

```rust
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn reply(deps: DepsMut, msg: Reply) -> StdResult<Response> {
    match msg.id {
        CW20_TRANSFER_REPLY_ID => handle_transfer_reply(deps, msg),
        id => Err(StdError::generic_err(format!("Unknown reply id: {}", id))),
    }
}

fn handle_transfer_reply(deps: DepsMut, msg: Reply) -> StdResult<Response> {
	// msg 데이터 처리 및 컨트랙트 주소 저장
	// See: https://github.com/CosmWasm/cw-plus/blob/main/packages/utils/src/parse_reply.rs
	let data = msg.result.into_result().map_err(StdError::generic_err);

    // 전송 이벤트 검색
    // 여러 개의 전송이 있다면, 처리할 정확한 이벤트를 찾아야 합니다.
    let transfer_event = msg
        .events
        .iter()
        .find(|e| {
            e.attributes
                .iter()
                .any(|attr| attr.key == "action" && attr.value == "transfer")
        })
        .ok_or_else(|| StdError::generic_err(format!("unable to find transfer action"))?;

    // 전송 이벤트에 있는 특성들을 사용해 무엇이든 할 수 있습니다.
    // 전체 이벤트에 대한 참고: https://github.com/CosmWasm/cw-plus/blob/main/contracts/cw20-base/src/contract.rs#L239-L244
	Ok(Response::new())
}
```

## 컨트랙트 간 컨텍스트 전파

재진입 공격을 막기 위해 CosmWasm은 컨텍스트가 컨트랙트 메모리에 저장되는 것을 허용하지 않습니다. 컨트랙트 간에 상태를 전파하는 두 가지 방법이 있습니다.

1. 서브메시지에서 반환된 모든 `events` 는 `Reply` 메시지에서 읽을 수 있습니다.
2. `cw_storage_plus::Item` 을 사용하여 임시 상태를 저장하고 이를 응답 핸들러에 로드합니다.

## 예시

1. [컨트랙트 인스턴스화 응답 처리](https://github.com/terraswap/terraswap/blob/main/contracts/terraswap_pair/src/contract.rs) (Terraswap)
2. [컨트랙트 실행 응답 파싱](https://github.com/larry0x/astrozap/blob/master/contracts/astrozap/src/contract.rs) (larry0x)
