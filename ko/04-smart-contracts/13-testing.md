---
sidebar_position: '13'
---

# 테스트

스마트 컨트랙트 개발 중 누구나 테스트 단계에 도달하게 됩니다. 테스트를 잘 수행해야 변경 사항을 컨트랙트 코드베이스에 신속하게 배포할 수 있습니다.

좋은 컨트랙트 세트에는 일반적으로 두 가지 테스트 영역, 즉 단위 테스트 및 통합 테스트로 나누어지는 테스트 세트가 있습니다.

## 단위 테스트

단위 테스트에 대한 가이드는 [여기](https://docs.cosmwasm.com/tutorials/simple-option/testing)를 참조하세요.

## `cw-multi-test`를 사용한 통합 테스트

cw-plus 리포지토리에서 제공되는 cw-multi-test 패키지는 테스트넷에 배포하지 않고도 스마트 컨트랙트를 테스트할 수 있는 방법을 제공합니다. 멀티 테스트를 사용하기 전에 주로 사용하는 테스트 방법은 주어진 체인(테스트넷, 로컬)에서 컨트랙트를 셋업하고 몇 가지 테스트를 수행한 다음 가능한 경우 컨트랙트를 삭제/자체 삭제하는 파이프라인을 만드는 것이었습니다.

위의 스마트 컨트랙트와의 상호 작용 부분은 cw-multi-test 기반 통합 테스트를 사용한다면 거의 제거할 수 있습니다. 위에서 설명한 흐름에서 필요한 부분이 여전히 있지만 멀티 테스트의 복잡성을 경험하고 나면 이러한 통합 테스트를 작성하는 것이 더 좋다는 것을 확인할 수 있었습니다. 여기서는 몇 가지 팁, 리소스 및 단계들을 통해 이러한 복잡성을 해결하고자 합니다.

## `cw-multi-test` 컨셉

Rust에서 블록체인 환경을 시뮬레이션하고 컨트랙트 -&gt; 컨트랙트, 또는 컨트랙트 -&gt; Bank 모듈간 상호 작용과 관련된 테스트를 하기 전에 이해해야 할 몇 가지 주요 개념이 있습니다.

이 섹션에서는 cw-multi-test로 테스트를 작성하는 과정을 단계별로 살펴보고 그 과정에서 몇 가지 중요한 개념을 설명합니다. 시작하기 위해 <code>Increment</code> 및 `Reset` 의 두 가지 기능이 있는 <a>cw-template</a> 과 같은 간단한 샘플 컨트랙트를 보겠습니다.

몇 가지 imports가 있는 새 테스트 파일로 시작하겠습니다.

```rust
use cosmwasm_std::testing::{mock_env, MockApi, MockQuerier, MockStorage, MOCK_CONTRACT_ADDR};
use cw_multi_test::{App, BankKeeper, Contract, ContractWrapper};
```

위의 imports는 테스트 제작을 할 수 있는 많은 도구를 제공합니다. 여기에서 살펴볼 첫 번째 imports는 테스트가 실행될 시뮬레이션 블록체인 환경이 될 `App` 입니다.

### App

시스템의 주요 진입점은 `App` 이라고 하며 블록체인 앱을 나타냅니다. 여러 블록을 시뮬레이션하도록 업데이트할 수 있는 블록 높이 d와 시간에 대한 아이디어를 유지합니다. `app.update_block(next_block)` 을 사용하여 타임스탬프를 5초, 높이를 1(새 블록 시뮬레이션) 증가하거나 다른 mutator를 작성할 수 있습니다.

`CosmosMsg` 를 실행할 수 있는 진입점 `App.execute` 를 노출하고 이를 원자성 트랜잭션(atomic transaction)으로 래핑합니다. 즉, `execute` 이 성공을 반환하는 경우에만 상태가 커밋됩니다. 성공적으로 실행되면 데이터와 이벤트 목록을 반환하고 오류가 발생하면 `Err(String)` 을 반환합니다. 단순명료한 API를 제공하기 위해 `CosmosMsg` 를 생성하는 `Executor` trait에 연결된 몇 가지 도우미 메서드가 있습니다. `instantiate_contract` , `execute_contract` 및 `send_tokens` 는 테스트 작성의 편의를 위해 사용됩니다. 각각은 사용자가 제출한 것처럼 하나 `CosmosMsg` 를 원자적으로 실행합니다. (실패할 경우 모든 상태를 되돌리는 여러 메시지를 함께 실행하려면 `execute_multi` 를 사용할 수도 있습니다.)

앱에 대한 다른 주요 진입점은 `App` 이 구현하는 `Querier` 인터페이스입니다. 특히, `App.wrap()` 을 사용하여 `all_balances` 및 `query_wasm_smart` 와 같이 블록체인을 쿼리할 수 있도록 모든 종류의 멋진 API를 제공하는 `QuerierWrapper` 를 얻을 수 있습니다. 이를 종합하면 간단한 API를 통해 컨트랙트 및 은행(bank) 기능을 실행하고, 쉽게 쿼리할 수 있고, 현재 `BlockInfo` 를 업데이트할 수 있는 애플리케이션에 하나의 `Storage` 가 래핑됩니다. 이 아래에서는 컨트랙트에서 반환된 모든 메시지를 처리하고 "bank" 토큰을 이동하고 다른 컨트랙트를 호출합니다.

다음과 같이 테스트 코드에 사용할 앱을 만들 수 있습니다.

```rust
fn mock_app() -> App {
    let env = mock_env();
    let api = Box::new(MockApi::default());
    let bank = BankKeeper::new();

    App::new(api, env.block, bank, Box::new(MockStorage::new()))
}
```

### 모킹(Mocking) 컨트랙트

컨트랙트를 모킹하는 것은 다중 테스트의 진언 중 하나이지만, 테스트를 수행하는 데 주요 장애물 중 하나이기도 합니다. 먼저 어떠한 컨트랙트든 테스트하기 위해서는 컨트랙트를 모킹하거나 완성해야 합니다. `cw-multi-test` 는 컨트랙트의 논리적 부분(인스턴스화, 실행자, 쿼리)을 마무리하고 모킹된 네트워크에 배포할 수 있는 `ContractWrapper` 를 제공합니다.

모든 컨트랙트를 모킹한 다음 하나를 테스트하는 것은 스크립팅 방식으로 수행할 수 있지만 유지 관리를 위해 모든 래핑된 컨트랙트 기능을 정의하여 재사용할 수 있도록 하는 것이 좋습니다.

```rust
use crate::contract::{execute, instantiate, query, reply};


pub fn contract_stablecoin_exchanger() -> Box<dyn Contract<Empty>>{
    let contract = ContractWrapper::new_with_empty(
        execute,
        instantiate,
        query,
    ).with_reply(reply);
    Box::new(contract)
}
```

위의 예는 더 복잡한 예이지만 빠르게 보겠습니다. 런타임에 컨트랙트에서 사용하는 execute, instantiate, query, reply 기능을 가져온 다음 테스트에 사용할 자체 래퍼를 만듭니다.

> reply를 할 것인가 말 것인가?
>
> 컨트랙트 구성에 따라 ContractWrapper를 생성할 때 컨트랙트가 `reply` 기능을 구현하지 않으면 `with_reply` 가 필요하지 않을 수 있습니다.

컨트랙트를 모킹한 후 다음 두 단계가 더 수행됩니다. 코드를 저장한 다음 코드 오브젝트로부터 컨트랙트를 셋업합니다. 테스트넷 또는 메인넷 체인에 배포하는 것과 동일한 프로세스입니다. 반면 단위 테스트에서는 mock_dependencies를 사용하고 `mock_dependencies` 를 전달하는 `mock_info` 로 작업합니다.

### 컨트랙트 저장 및 인스턴스화:

컨트랙트를 `cw-multi-test` 환경에서 인스턴스화하려면 먼저 컨트랙트를 저장해야 합니다. 저장되면 관련 `code_id` 를 사용하여 컨트랙트를 인스턴스화할 수 있습니다.

```rust
let contract_code_id = router.store_code(contract_stablecoin_exchanger());
```

새 코드 객체에서 인스턴스화:

```rust
let mocked_contract_addr = router
        .instantiate_contract(contract_code_id, owner.clone(), &msg, &[], "super-contract", None)
        .unwrap();
```

위 코드는 1개의 모의계약을 제공합니다. 테스트를 시작하면 다음과 같은 오류가 표시될 수 있습니다.

- `No ContractData`
- `Contract '<contract>' does not exist`

이 오류 중 하나라도 나타나면 모킹된 컨트랙트 객체가 안될 가능성이 큽니다. 멀티 테스트를 할 때 컨트랙트로 간주될 수 있는 것과 상호 작용하는 모든 것은 모킹해야 합니다. 여기에는 현재 테스트할 계획이 없는 간단한 유틸리티 컨트랙트와 컨트랙트가 상호 작용하는 모든 서비스가 포함됩니다.

컨트랙트를 살펴보고 더미 컨트랙트 주소를 전달하고 있는지 확인하세요. 보통 가능성이 높은 원인입니다. 문제를 찾으면 위의 방법으로 모킹하고, 인스턴스화하면 됩니다. 그리고 주소를 캡처하고 더미 주소 대신 전달하세요. 이처럼 복잡한 컨트랙트를 완전히 모킹하는 데 조금 시간이 걸렸지만 이것이 도움이 될 것입니다. 지금의 고통이 훗날 도움이 되길 바라며 다른 서비스들을 모킹하면 됩니다!

### 모아보기

```rust
use cosmwasm_std::testing::{mock_env, MockApi, MockQuerier, MockStorage, MOCK_CONTRACT_ADDR};
use cw_multi_test::{App, BankKeeper, Contract, ContractWrapper};
use crate::contract::{execute, instantiate, query, reply};
use crate::msg::{InstantiateMsg, QueryMsg}

fn mock_app() -> App {
    let env = mock_env();
    let api = Box::new(MockApi::default());
    let bank = BankKeeper::new();

    App::new(api, env.block, bank, Box::new(MockStorage::new()))
}

pub fn contract_counter() -> Box<dyn Contract<Empty>>{
    let contract = ContractWrapper::new_with_empty(
        execute,
        instantiate,
        query,
    );
    Box::new(contract)
}

pub fn counter_instantiate_msg(count: Uint128) -> InstantiateMsg {
    InstantiateMsg {
        count: count
    }
}

#[test]
fn counter_contract_multi_test() {
    // 소유자 계정 생성하기
    let owner = Addr::unchecked("owner");
    let mut router = mock_app();

    let counter_contract_code_id = router.store_code(contract_counter());
    // 초기값이 0을 갖도록 카운터 컨트랙트 셋업
    let init_msg = InstantiateMsg {
        count: Uint128::zero()
    }
    // 새로 저장된 code id를 이용해서 카운터 컨트랙트 인스턴스화
    let mocked_contract_addr = router
        .instantiate_contract(counter_contract_code_id, owner.clone(), &init_msg, &[], "counter", None)
        .unwrap();

    // 컨트랙트의 액션을 실행하고, 필요하면 쿼리하기
    let msg = ExecuteMsg::Increment {}
    // Increment the counter by executing the above prepared msg on the previously setup contract
    let _ = router.execute_contract(
            owner.clone(),
            mocked_contract_addr.clone(),
            &msg,
            &[],
        )
        .unwrap();
    // Query the contract to verify the counter was incremented
    let config_msg =  QueryMsg::Count{};
    let count_response: CountResponse = router
        .wrap()
        .query_wasm_smart(mocked_contract_addr.clone(), &config_msg)
        .unwrap();
    asserteq!(count_response.count, 1)

    // Now lets reset the counter with the other ExecuteMsg
    let msg = ExecuteMsg::Reset {}
    let _ = router.execute_contract(
            owner.clone(),
            mocked_contract_addr.clone(),
            &msg,
            &[],
        )
        .unwrap();

    // And again use the available contract query to verify the result
    // Query the contract to verify the counter was incremented
    let config_msg =  QueryMsg::Count{};
    let count_response: CountResponse = router
        .wrap()
        .query_wasm_smart(mocked_contract_addr.clone(), &config_msg)
        .unwrap();
    asserteq!(count_response.count, 0)
}

```

#### 제 3자(3rd Party) 컨트랙트 모킹

위의 섹션을 읽으면 컨트랙트를 모킹하고 모킹으로 테스트를 진행하면서 수행해야 하는 설정 작업의 양에 대한 요지를 알게 될 것입니다. 또 자신의 컨트랙트를 모킹하고 모킹을 가지고 테스트를 진행하려다 보면 컨트랙트가 테라스왑이나 앵커와 같은 다른 서비스들과 IBC를 통해서 상호작용하는 것을 확인할 수 있습니다. 그렇겠죠?

우리가 위에서 했던 것과 똑같은 방식으로 이러한 서비스 중 하나를 모킹하겠습니다. 먼저 코드에 대한 액세스가 필요합니다. 컨트랙트 코드는 `execute, instantiate, query` 하기 위해 가져오는 것입니다. <code>execute, instantiate, query</code> . 하지만 프로토콜이 Rust 패키지에 컨트랙트 코드를 포함하지 않고 있습니다! 여기에는 메시지 및 일부 헬퍼와 같이 상호 작용하는 데 필요한 것만 포함되어 있습니다.

방법이 없는건 아니지만 상호 작용하는 서비스에 대한 얕은 모킹을 통해 만들어 볼 수 있습니다. 이 과정은 모든 기능을 채워야 한다는 점을 제외하고는 자신의 컨트랙트를 모킹하는 것과 유사합니다(위에 설명됨). 예를 들어 사용하는 함수만 있는 더 작은 ExecuteMsg 또는 쿼리만 있는 MockQuery 핸들러를 사용할 수도 있기 때문에 이 작업이 더 쉬워집니다. 다음은 제3자 컨트랙트 모킹의 예입니다.

```rust
pub fn contract_ping_pong_mock() -> Box<dyn Contract<Empty>> {
    let contract = ContractWrapper::new(
        |deps, _, info, msg: MockExecuteMsg| -> StdResult<Response> {
            match msg {
                MockExecuteMsg::Receive(Cw20ReceiveMsg {
                    sender: _,
                    amount: _,
                    msg,
                }) => {
                    let received: PingMsg = from_binary(&msg)?;
                    Ok(Response::new()
                        .add_attribute("action", "pong")
                        .set_data(to_binary(&received.payload)?))
                }
                }})}

        |_, _, msg: MockQueryMsg| -> StdResult<Binary> {
            match msg {
                MockQueryMsg::Pair {} => Ok(to_binary(&mock_pair_info())?),

```

자신만의 모의 컨트랙트를 만들면 많은 유연성을 얻을 수 있습니다. deps, env, info와 같이 `_`로 된것들을 날리고 주어진 실행 메시지 또는 쿼리에 대해 원하는 응답을 반환할 수 있습니다. 문제는 이러한 모든 서비스를 어떻게 모킹할 것인가 하는 것입니다. 일부 Terra 기반 모킹에 대해서는 [cw-terra-test-mocks](https://github.com/0xFable/cw-terra-test-mocks) 를 참조하십시오.

## 플랫폼별 변경사항

코스모스 생태계의 다른 체인과 허브는 각각의 네트워크에서 마이그레이션이 수행되는 방식에 약간의 변경사항이 있을 수 있습니다. 이 섹션에서는 이러한 항목을 간략하게 설명합니다.

### Juno

Juno는 최신 버전의 CosmWasm 중 하나를 사용합니다. 일반적으로 `cw-multi-test` 버전을 CosmWasm 버전에 가깝게 유지하는 것이 좋지만 필수 사항은 아닙니다. 다른 버전을 사용하는 경우 다양한 경험을 얻을 수 있으며 최신 버전에서는 변경이 있을 수 있습니다.

### Terra

#### 포크된 `cw-multi-test` 사용

많은 사용 사례의 경우 `cw-multi-test` 가 있는 그대로 작동하며 편리하게 사용할 수 있습니다. UST에 중점을 둔 특정 컨트랙트에 대한 테스트를 작성할 때 NativeToken을 보내거나 쿼리하는 데 문제가 발생할 수 있습니다. 여기서 문제점은 `cw-multi-test` 가 일반 테스트 도구이고 이 때문에 Terra에는 이를 적절하게 모킹하는 데 필요한 몇 가지 추가 기능이 있습니다.

최신 버전의 `cw-multi-test`에서는 고유한 쿼리자를 등록할 수 있으므로 최신 버전이 있는 경우 이 문제를 직접 해결할 수도 있습니다. 대안으로는 TerraQuerier가 추가된 `cw-multi-test`의 포크가 있습니다. 이를 통해 Terra Native 코인 트랜잭션이 가능하며 `terra-multi-test`라고 부릅니다.

`terra-multi-test` 포크를 사용하려면 다음 단계를 따르십시오.

- cargo.toml에 다음 dep를 추가하십시오. `terra-multi-test = {git="https://github.com/astroport-fi/terra-plus", version="1.0.0", package = "terra-multi-test"}`
- 이제 `terra_multi_test` 대신 `cw_multi_test` 를 사용하도록 테스트를 업데이트하십시오.
- 원하는대로 사용하세요!
