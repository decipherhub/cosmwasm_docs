---
sidebar_position: '1'
---

# 컨트랙트 시맨틱스(Contract Semantics)

이 문서는 CosmWasm 컨트랙트가 환경과 상호작용하는 방법의 시맨틱스를 명확히 하는데 목표를 두고 있습니다. 그 방법에는 두 가지 메인 타입의 액션들: `DepsMut`을 받고 블록체인의 상태를 바꿀 수 있는 *mutating* 액션과 단일 노드에서 실행되고 데이터에 대한 읽기 전용 접근이 가능한 *query* 액션이 있습니다.

## 실행(Execution)

아래 섹션에서 저희는 `execute` 호출이 어떻게 동작을 하는지 설명하겠습니다. 아래와 같은 *mutating* 액션에도 동일한 시맨틱스가 적용이 됩니다 - `instantiate`, `migrate`, `sudo` 등.

### SDK 컨텍스트

CosmWasm을 살펴보기 전에 [Cosmos SDK](https://v1.cosmos.network/sdk) 와 통합하는 블록체인 프레임워크에 의해 실행되는 시맨틱스(문서화가 다소 덜 되어있습니다)를 살펴봐야 합니다. Cosmos SDK는 [Tendermint BFT](https://tendermint.com/core/) Consensus Engine을 기반으로 합니다. 트랜잭션이 CosmWasm에 도착하기 전(그리고 이후) 트랜잭션을 처리하는 방법을 먼저 살펴보겠습니다.

먼저, Tendermint 엔진은 다음 블록에 포함될 트랜잭션 목록에 대한 2/3 이상의 합의를 찾습니다. 이것은 *트랜잭션들을 실행하지 않고* 이루어집니다. 최소한의 사전 필터링이 Cosmos SDK 모듈에 의해 이루어지는데, 유효한 형식의 트랜잭션인지, 충분한 가스비가 있는지, 충분한 비용을 지불할 수 있는 주소에 의해 서명이 되었는지 등을 확인합니다. 주의할 것은, 블록에 에러가 있는 트랜잭션들이 많이 포함되어 있을 수 있다는 것입니다.

블록이 커밋이 되면(일반적으로 매 5초마다), 트랜잭션들은 실행되기 위해 Cosmos SDK로 순차적으로 들어가게 됩니다. 각 트랜잭션은 이벤트 로그와 함께 결과나 에러를 반환하는데, 다음 블록의 `TxResults` 섹션에 기록이 됩니다. 블록 실행 이후에 `AppHash`(또는 머클 증명 또는 블록체인 상태)가 다음 블록에 포함이 됩니다.

Cosmos SDK `BaseApp` 은 고립된(isolated) 컨텍스트에서 각 트랜잭션을 처리합니다. 먼저 모든 서명을 증명하고 가스비를 공제합니다. "가스 계량기(Gas Meter)"를 설정하여 수수료로 지불된 가스의 양으로 실행을 제한합니다. 그런 다음 트랜잭션을 실행하기 위해 고립된 컨텍스트를 만듭니다. 이를 통해 코드는 체인의 현재 상태(마지막 트랜잭션이 완료된 후)를 읽을 수 있지만, 오류가 발생하면 커밋되거나 롤백될 수 있는 캐시에만 기록(write)됩니다.

트랜잭션은 여러 메시지로 구성될 수 있으며 각 메시지는 동일한 컨텍스트와 동일한 가스 한도에서 차례로 실행됩니다. 모든 메시지가 성공하면 컨텍스트는 블록체인 상태로 커밋되고 모든 메시지의 결과는 `TxResult` 에 저장됩니다. 하나의 메시지가 실패하면 이후의 모든 메시지를 건너뛰고 모든 상태 변경 사항을 되돌립니다. 이러한 원자성(Atomicity)은 매우 중요합니다. 이것은 Alice와 Bob이 모두 2개의 메시지로 트랜잭션에 서명할 수 있음을 의미합니다. Alice는 Bob에게 1000 ATOM을 지불하고 Bob은 Alice에게 50 ETH를 지불했을때, Bob의 계정에 자금이 없으면 Alice의 지불도 되돌려집니다. 이것은 DB 트랜잭션이 일반적으로 작동하는 것과 같습니다.

[`x/wasm`](https://github.com/CosmWasm/wasmd/tree/master/x/wasm) 은 특정 메시지를 처리하고 이를 사용하여 스마트 컨트랙트를 업로드, 인스턴스화, 실행하는 맞춤형 Cosmos SDK 모듈입니다. 특히, 적절리 서명된 [`Keeper.ExecuteContract`](https://github.com/CosmWasm/wasmd/blob/v0.23.0/proto/cosmwasm/wasm/v1/tx.proto#L73-L86) 를 받아 [`MsgExecute`](https://github.com/CosmWasm/wasmd/blob/v0.23.0/x/wasm/keeper/keeper.go#L328-L369) 로 라우팅하여 적절한 스마트 컨트랙트를 로드하고 이에 대한 `execute` 을 호출합니다. 이 메소드는 성공(데이터 및 이벤트 포함) 또는 오류를 반환할 수 있습니다. 여기에 오류가 있는 경우 블록의 전체 트랜잭션을 되돌립니다. 되돌려진 컨텍스트는 우리의 컨트랙트가 `execute` 호출을 받을 때의 컨텍스트입니다.

### 기본 실행(Basic Execution)

컨트랙트를 구현할 때, 다음 진입점(entry point)을 제공합니다.

```rust
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> { }
```

`DepsMut` 을 사용하면 백킹되는 `Storage` 를 읽고 쓸 수 있을 뿐만 아니라 `Api` 를 사용하여 주소를 검증하고 다른 컨트랙트들 또는 기본 모듈들의 상태를 `Query` 할 수 있습니다. 완료된 뒤에는, `Ok(Response)` 또는 `Err(ContractError)` 를 반환합니다. 다음에 어떤 일이 일어나는지 살펴보겠습니다.

`Err` 을 반환하면 이 오류가 문자열 표현( `err.to_string()` )으로 변환되고 SDK 모듈에 리턴됩니다. *모든 상태 변경은 되돌려* 지고 `x/wasm` 은 이 오류 메시지를 반환합니다. 이 오류 메시지는 *일반적으로* (아래 하위 메시지 예외 참조) 트랜잭션을 중단하고 동일한 오류 메시지를 외부 호출자에게 리턴합니다.

`Ok` 를 반환하면 `Response` 객체가 파싱(parsed)되고 처리됩니다. 아래를 살펴보십시오.

```rust
pub struct Response<T = Empty>
where
    T: Clone + fmt::Debug + PartialEq + JsonSchema,
{
    /// "subcalls"의 선택가능한(optional) 목록이고 이것들은 순서대로 실행될 것입니다
    /// 그리고 이 컨트랙트의 subcall_response 진입점이 호출되었습니다
    /// "fire and forget" 메시지가 실행되기 *전에*
    pub submessages: Vec<SubMsg<T>>,
    /// 서브메시지가 하나라도 처리되면, 호스트 블록체인에 모두 발송(dispatch)됩니다
    /// 모든 메시지가 성공적으로 처리되면, 트랜잭션은 커밋됩니다. 만약 하나라도 실패하면, 트랜잭션과
    /// 로컬 컨트랙트 상태 변경은 모두 되돌려집니다
    pub messages: Vec<CosmosMsg<T>>,
    /// "wasm" 이벤트의 일부로 발생될 특성들입니다
    pub attributes: Vec<Attribute>,
    pub data: Option<Binary>,
}
```

Cosmos SDK에서 트랜잭션은 옵셔널한 데이터 "결과"와 함께 사용자에게 여러 이벤트를 반환합니다. 이 결과는 증명될 수 있도록 해시되어 다음 블록 해시에 포함되며 일부 필수 상태를 반환할 수 있습니다(비록 일반적인 클라이언트 앱은 이벤트에 더 많이 의존하지만). 이 결과는 SDK의 컨트랙트 또는 모듈 간에 결과를 전달하는 데 더 자주 사용됩니다. `ResultHash` 에는 트랜잭션의 `Code` (non-zero meaning error)와 `Result` (데이터)만 포함된다는 것을 주의하십시오. 이벤트 및 로그는 쿼리를 통해 사용할 수 있지만 라이트 클라이언트 증명은 불가능합니다.

컨트랙트가 `data` 를 설정하는 경우 `result` 필드에 리턴됩니다. `attributes` 은 <a>default event에 추가</a> 될 <code>{key, value}</code> 쌍의 목록입니다. 최종 결과는 클라이언트에게 다음과 같이 표시됩니다.

```json
{
  "type": "wasm",
  "attributes": [
    { "key": "contract_addr", "value": "cosmos1234567890qwerty" },
    { "key": "custom-key-1", "value": "custom-value-1" },
    { "key": "custom-key-2", "value": "custom-value-2" }
  ]
}
```

### 메시지 발송(Dispatching Messages)

이제 `messages` 필드로 이동해 보겠습니다. cw20 컨트랙트 전송 시 잔액을 조정하는 것과 같이 일부 컨트랙트는 해당 컨트랙트 자체만 봐도 괜찮습니다. 그러나 많은 사람들이 토큰(네이티브 또는 cw20)을 이동하거나 더 복잡한 작업을 위해 다른 컨트랙트를 호출하기를 원합니다. 이것은 메시지가 들어오는 곳입니다. 우리는 [`CosmosMsg` 를 반환합니다. 이것은 컨트랙트가 만들 수 있는 모든 외부 호출을 직렬화할 수 있는 표현](https://github.com/CosmWasm/cosmwasm/blob/v0.14.0-beta4/packages/std/src/results/cosmos_msg.rs#L18-L40) 입니다. 이것은 다음과 같이 보입니다( `stargate` 기능 플래그가 활성화된 경우라면).

```rust
pub enum CosmosMsg<T = Empty>
where
    T: Clone + fmt::Debug + PartialEq + JsonSchema,
{
    Bank(BankMsg),
    /// 맞춤화된 익스텐션으로서 각 블록체인에 의해 정의될 수 있습니다
    Custom(T),
    Staking(StakingMsg),
    Distribution(DistributionMsg),
    Stargate {
        type_url: String,
        value: Binary,
    },
    Ibc(IbcMsg),
    Wasm(WasmMsg),
}
```

컨트랙트가 두 개의 메시지(M1 및 M2)를 반환하면 이 메시지는 모두 파싱(parse)되고 <em>컨트랙트의 승인으로</em> <code>x/wasm</code> 에서 실행됩니다(즉, `info.sender` 는 원래 호출자가 아닌 본래 컨트랙트가 되는 것입니다). 성공 메시지를 리턴하면 사용자 지정 속성(attributes)이 있는 새 이벤트를 내보내고, `data` 필드가 무시되며, 리턴되는 모든 메시지도 처리됩니다. 오류를 반환하면, 부모 호출(parent call)은 오류를 반환하므로, 전체 트랜잭션의 상태를 롤백합니다.

메시지가 *깊이 우선적(depth-first)* 으로 실행되는 것을 기억하시기 바랍니다. 즉, 컨트랙트 A가 M1( `WasmMsg::Execute` ) 및 M2( `BankMsg::Send` )를 리턴하고, 컨트랙트 B( `WasmMsg::Execute` 에서)가 N1 및 N2(예: `StakingMsg` 및 `DistributionMsg` )를 리턴하는 경우 실행 순서는 다음과 같습니다. **M1, N1, N2, M2** 입니다.

이것은 처음에는 이해하기 어려울 수 있습니다. "왜 다른 컨트랙트를 부를 수 없나요?"라고 물을 수 있습니다. 그러나 우리는 이더리움 컨트랙트에서 가장 광범위하고 가장 탐지하기 어려운 보안 구멍 중 하나인 '재진입(reentrancy)'을 방지하기 위해 이 작업을 수행합니다. 함수 호출을 중첩하지 않지만 나중에 실행될 메시지를 반환하는 액터 모델에 따라 이를 수행합니다. 이는 한 호출과 다음 호출 사이에 전달되는 모든 상태가 메모리가 아닌 저장소(storage)에서 발생함을 의미합니다. 이 디자인에 대한 자세한 내용 [은 Actor Model 에 대한 문서](https://docs.cosmwasm.com/docs/1.0/architecture/actor) 를 읽는 것이 좋습니다.

### 서브메시지(Submessages)

CosmWasm 0.14(2021년 4월)부터 컨트랙트에서 호출을 발송하는 방법이 하나 더 추가되었습니다. 일반적인 요청은 발송한 메시지 중에서 결과를 가져오는 기능이었습니다. 예를 들어, `WasmMsg::Instantiate` 를 사용하여 새 컨트랙트를 만들고 싶다면 새로 생성된 컨트랙트의 주소를 호출자에 저장해야합니다. `submessages` 를 사용하면 이것이 가능합니다. 또한 오류 결과를 캡처하는 유사한 사례를 해결하는데, 예를 들어 cron 컨트랙트를 사용하면 전체 트랜잭션을 중단하는 대신 오류 메시지를 저장하고 메시지를 실행했다고 표시할 수 있습니다. 또한 하위 메시지의 가스 사용을 제한할 수 있습니다(대부분의 경우에 사용되는 것은 아니지만 모든 가스를 태우고 트랜잭션을 중단하는 하위 메시지의 무한 루프로부터 보호하기 위해 cron 작업에 필요합니다)

이것은 위와 같이 `CosmosMsg` 를 사용하지만 `SubMsg` envelope 안에 래핑합니다.

```rust
pub struct SubMsg<T = Empty>
where
    T: Clone + fmt::Debug + PartialEq + JsonSchema,
{
    pub id: u64,
    pub msg: CosmosMsg<T>,
    pub gas_limit: Option<u64>,
    pub reply_on: ReplyOn,
}

pub enum ReplyOn {
    /// SubMsg가 실행된 뒤 항상 콜백합니다
    Always,
    /// SubMsg가 성공을 리턴하고 콜백하지 않고 에러가 리턴되면 콜백합니다
    Error,
    /// SubMsg가 성공을 리턴하면 콜백하고, 에러가 리턴되면 콜백하지 않습니다
    Success,
}
```

서브메시지 실행이란. 첫째로, 상태 주변의 하위 트랜잭션 컨텍스트를 만들어 호출자가 작성한 최신 상태를 읽을 수 있게합니다. 하지만 아직 다른 캐시에 쓸 수 있는 것은 아닙니다. `gas_limit` 가 설정되면 `OutOfGasError` 로 중단될 때까지 사용할 수 있는 가스 양으로 샌드박스 처리됩니다. 이 오류는 컨트랙트 실행에서 반환된 다른 오류와 마찬가지로 포착되어 호출자에게 리턴됩니다(트랜잭션의 전체 가스 한도를 소진하지 않는 한). 더 흥미로운 것은 완료되고 난 후 일어나는 일들입니다.

성공을 리턴하면 임시 상태가 커밋되고(호출자의 캐시로) `Response`가 정상적으로 처리됩니다(현재 EventManager에 이벤트가 추가되고 메시지 및 서브메시지가 실행됨). `Response`가 완전히 처리된 후, 호출 컨트랙트에게 이를 볼 수 있습니다( `ReplyOn::Always` 및 `ReplyOn::Success` 의 경우). 오류가 발생하면 서브호출은 이 메시지로 인한 부분적인 상태 변경을 되돌리지만 호출 컨트랙트의 상태 변경은 되돌리지 않습니다. 그러면 호출 컨트랙트가 오류를 볼 수 있습니다( `ReplyOn::Always` 및 `ReplyOn::Error` 의 경우). *이 경우 메시지 오류는 전체 트랜잭션을 중단하지 않습니다.*

#### 응답 관리하기(Handling the Reply)

`submessages` 를 사용하려면 호출 컨트랙트에 추가 진입점이 있어야 합니다.

```rust
#[entry_point]
pub fn reply(deps: DepsMut, env: Env, msg: Reply) -> Result<Response, ContractError> { }

pub struct Reply {
    pub id: u64,
    /// ContractResult는 단지 `Result<SubcallResponse, String>`의 잘 직렬화된 버전입니다
    pub result: ContractResult<SubcallResponse>,
}

pub struct SubcallResponse {
    pub events: Vec<Event>,
    pub data: Option<Binary>,
}
```

`submessage` 가 완료된 후 호출자는 결과를 처리할 기회를 얻습니다. 서브호출의 원래 `id` 를 가져오므로, 이를 처리하는 방법과 실행 `Result` (성공 및 오류 모두)를 전환할 수 있습니다. 여기에는 기본 SDK 모듈(예: Bank)과 아래에서 반환된 데이터에 적용되는 서브메시지에서 반환된 모든 이벤트가 포함됩니다. 이것과 원래 호출 ID는 계속 처리하기 위한 모든 컨텍스트를 제공합니다. 더 많은 상태가 필요한 경우 원본 `execute` 에서 `submessage` 를 반환하기 전에 저장소에 일부 로컬 컨텍스트(그 `id`로)를 저장하고 `reply` 으로 로드해야 합니다. 우리는 이더리움의 큰 보안 표면 영역인 재진입 공격의 핵심 벡터이기 때문에 컨트랙트 메모리에 정보를 전달하는 것을 명시적으로 금지합니다.

`reply` 호출은 `Err` 자체를 리턴할 수 있으며, 이 경우 호출자가 오류가 발생한 것처럼 처리되고 트랜잭션이 중단됩니다. 그러나 성공적으로 처리되면 `reply`은 정상적인 `Response`를 리턴할 수 있으며 이는 EventManager에 추가된 이벤트와 위에서 설명한 대로 전달된 모든 `messages` 및 `submessages` 메시지와 같이 정상으로 처리됩니다.

<code>reply</code>와의 한 가지 <em>중요한 차이점</em> 은 *데이터를 삭제하지 않는다는* 것입니다. `reply`가 `Response` 객체의 `data: Some(value)`를 리턴하면, 호출자가 리턴한 `data` 필드를 덮어씁니다. 즉, `execute`가 `data: Some(b"first thought")`를 리턴하고 `reply`(모든 추가 정보와 함께)가 `data: Some(b"better idea")`를 리턴하면 이는 `execute`의 호출자(클라이언트나 다른 트랜잭션)에게 리턴됩니다. 마치 원래 `execute` 및 리턴된 `data: Some(b"better idea")`가 리턴되는 것과 같습니다. 만약`reply`이 `data: None`를 리턴하면 이전에 설정된 데이터 상태를 수정하지 않습니다. 이 설정을 모두 설정하는 여러 서브메시지가 있는 경우 마지막 메시지만 사용됩니다(모두 이전 `data` 값을 덮어씁니다). 결과적으로 `data: Some(b"")` 을 사용하여 이전에 설정한 데이터를 지울 수 있습니다. 이것은 `null` 대신 JSON 문자열로 표시되고 다른 `Some` 값으로 처리됩니다.

#### 오더와 롤백(Order and Rollback)

서브메시지(및 해당 응답)는 그 어떤 `messages`보다 먼저 실행됩니다. 또한 <code>messages</code> 와 마찬가지로 <em>depth first</em> 규칙을 따릅니다. 간단한 예를 살펴보겠습니다. 컨트랙트 A는 서브메시지 S1 및 S2와 메시지 M1을 리턴합니다. 서브메시지 S1은 메시지 N1을 리턴합니다. 순서는 다음과 같습니다: **S1, N1, 응답(S1), S2, 응답(S2), M1**

서브메시지 `execution` 및 `reply` 은 다른 서브메시지의 컨텍스트 내에서 발생할 수 있다는 것을 기억하세요. 예를 들어, `contract-A--submessage --> contract-B--submessage --> contract-C`의 상황을 보겠습니다. 여기에서 `contract-B` 는 서브메시지 `reply`에서 `Err`을 리턴하여 `contract-C` 및 자체의 상태를 되돌릴 수 있지만, 컨트랙트 A 또는 전체 트랜잭션을 되돌릴 수는 없습니다. 단지 컨트랙트 A의 `reply` 기능으로 `Err`을 반환하는 것으로 끝납니다.

오류는 `ReplyOn::Success` 로 처리되지 않는다는 것도 중요합니다. 즉, 이러한 경우 오류는 오류를 반환하는 일반 `message`처럼 처리됩니다. 이 도표가 이해에 도움이 될 수 있습니다. 컨트랙트가 (a) `ReplyOn::Success` 및 (b) `ReplyOn::Error`와 함께 두 개의 서브메시지를 반환했다고 상상해보십시오.

a) 처리결과 | b) 처리결과 | 호출 응답(reply called) | 응답을 덮어쓰는지(may overwrite result from reply) | 비고
--- | --- | --- | --- | ---
ok | ok | a) | a) | success를 리턴함
err | err | none | none | error를 리턴함 (부모 트랜잭션 종료(abort))
err | ok | none | none | error를 리턴함 (부모 트랜잭션 종료(abort))
ok | err | a)b) | a)b) | a), b) 둘다 덮어쓰게 된다면(overwrite), b) 만 사용됨

## 쿼리 시멘틱스(Query Semantics)

지금까지 행위자 모델(Actor model)을 통해 다른 컨트랙트의 코드를 실행할 수 있는 `Response` 객체에 집중했습니다. 즉, 각 컨트랙트는 순차적으로 실행되며, 중첩된 호출이 불가능합니다. 이것은 재진입을 피하기 위해 필수적입니다. 여기서 말하는 재진입이란 트랜잭션 중에 있는 동안 다른 컨트랙트를 호출하여 내 상태를 변경할 수 있는 경우를 말합니다.

그러나, 자금을 전송 이전에 컨트랙트의 은행 잔고를 결정하는 것과 같이, 프로세스하는 중에 다른 컨트랙트의 정보에 액세스해야 하는 경우가 많습니다. 실행 중간에 *동기* 호출을 가능하게 하는 <em>읽기 전용</em> <code>Querier</code> 자를 노출시킴으로써 이를 가능하게 만들었습니다. 쿼리가 상태를 수정하거나 컨트랙트를 실행할 수 없도록 읽기 전용으로 만들어서(VM 수준에서 적용해서) 재진입 가능성을 방지할 수 있습니다.

"쿼리를 만들" 때 가능한 모든 호출을 나타내는 [`QueryRequest` 구조체](https://github.com/CosmWasm/cosmwasm/blob/v0.14.0-beta4/packages/std/src/query/mod.rs#L27-L48) 를 직렬화한 다음 FFI를 통해 런타임으로 전달합니다. 여기서 런타임은 `x/wasm` SDK 모듈에서 해석됩니다. 이것은 `CosmosMsg` 가 맞춤화된 결과를 허용하는 것처럼 블록체인별로 특화된 맞춤화된 쿼리로 확장할 수 있습니다. 또한 raw protobuf "Stargate" 쿼리 수행 능력에 유의하셔야합니다.

```rust
pub enum QueryRequest<C: CustomQuery> {
    Bank(BankQuery),
    Custom(C),
    Staking(StakingQuery),
    Stargate {
        /// 이것은 라우팅을 위한 충분히 안전한 경로입니다,
        /// 예. custom/cosmos_sdk.x.bank.v1.Query/QueryBalance
        path: String,
        /// 이것은 바이너리로 인코딩된 protobuf 메세지 타입입니다
        data: Binary,
    },
    Ibc(IbcQuery),
    Wasm(WasmQuery),
}
```

이것은 유연하며 언어 간 표현에 필요한 인코딩이지만, 은행 잔고를 찾고 싶을 때 생성하고 사용하기에는 다소 무리가 있습니다. 이를 해결하기 위해, 종종 <code>Querier</code> 를 래핑하는 <a><code data-md-type="codespan">QuerierWrapper</code></a>를 사용하며, 후드(hood) 하에서 `QueryRequest`와 `Querier.raw_query`를 사용하는 편리한 메소드들도 <br>많이 제공합니다.

[저희 문서에서 `Querier` 디자인에](https://docs.cosmwasm.com/docs/1.0/architecture/query) 대한 자세한 설명을 읽을 수 있습니다.
