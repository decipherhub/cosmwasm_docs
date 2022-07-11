---
sidebar_position: '11'
---

# 마이그레이션하기

마이그레이션을 통해 스마트 컨트랙트의 코드를 대체하거나 '업그레이드' 할 수 있습니다.

CosmWasm을 사용하면 컨트랙트 마이그레이션이 매우 편리합니다. 컨트랙트를 인스턴스화 할 때 선택할 수 있는 admin 필드가 있습니다. 만약 admin이 빈칸으로 설정된다면, 해당 컨트랙트는 수정이 불가합니다. 반대로 admin이 채워진다면 (external account 또는 거버넌스 컨트랙트), 해당 account에서 마이그레이션을 시도할 수 있습니다. 또한 admin은 다른 account로 admin을 변경하거나, 특정 기간이 지난 후 컨트랙트가 수정불가능하게 만들 수도 있습니다. 하지만, 컨트랙트 A에서 컨트랙트 B로 마이그레이션 하기 위해서, 컨트랙트 B에서는 기존에 스테이트가 어떻게 인코딩 되어있는지 알아야 합니다.

CW2 규격을 통해 이를 쉽게 풀어낼 수 있습니다. CW2는 모든 컨트랙트의 인스턴스화 시점에 단 하나의 특별한 `Singleton` 이 디스크에 저장될 수 있게 합니다. 마이그레이션 함수가 불러질 때, 새로운 컨트랙트는 마이그레이션을 하려고 하는 기존 컨트랙트의 데이터를 읽고 마이그레이션의 대상이 맞는지 확인할 수 있습니다. 또한 여러 마이그레이션 경로를 지원할 때 추가적인 버전 정보를 포함합니다.

스마트 컨트랙트 개발자들은 몇가지 단계만 밟으면 된다는 점에서, CW2를 사용하는 과정은 매우 간단합니다.

CW2 규격은 컨트랙트의 원래 버전을 저장하기 위해 인스턴스화하는 데 사용해야 하는 `set_contract_version` 을 제공합니다. 성공적인 마이그레이션 후에 컨트랙트 버전이 업데이트되도록 이번에는 ( `instantiate` 와는 달리)  `pub fn migrate(...)` 로직의 일부로 `set_contract_version` 설정하는 것이중요합니다.

```rust
const CONTRACT_NAME: &str = "crates.io:my-crate-name";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");


#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(deps: DepsMut, env: Env, info: MessageInfo, msg: InstantiateMsg) -> Response {
    // 마이그레이션 과정에서 필요한 컨트랙트 버전은 CW2 를 사용하여 지정합니다.
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
}
```

또한 CW2의 `get_contract_version` 을 통해 `migrate` 함수를 사용할 때 필요한 이전 컨트랙트의 버전을 알 수 있습니다. 두 방법 모두 이 객체에 대해 작동하는 `cw_storage_plus` 의 `Item` 데이터 구조에서 작동합니다.

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
pub struct ContractVersion {
    /// contract is the crate name of the implementing contract, eg. `crate:cw20-base`
    /// we will use other prefixes for other languages, and their standard global namespacing
    pub contract: String,
    /// version is any string that this implementation knows. It may be simple counter "1", "2".
    /// or semantic version on release tags "v0.7.0", or some custom feature flag list.
    /// the only code that needs to understand the version parsing is code that knows how to
    /// migrate from the given contract (and is tied to it's implementation somehow)
    pub version: String,
}
```

## 마이그레이션을 위한 컨트랙트 세팅

컨트랙트 마이그레이션은 3단계로 이뤄집니다. <br>1. 업데이트하려는 컨트랙트를 작성합니다. <br>2. 이전과 같이 새 컨트랙트를 업로드합니다. 하지만 아직 인스턴스화 하지 말아야 합니다. <br>3. [MsgMigrateContract](https://github.com/CosmWasm/wasmd/blob/v0.20.0/proto/cosmwasm/wasm/v1/tx.proto#L94-L104) 트랜잭션을 사용하여 이 컨트랙트가 새로 업데이트한 코드를 사용하도록 지정합니다.

마이그레이션 프로세스 동안 새 코드에 정의된 마이그레이션 함수가 실행됩니다. 소스와 대상 `code_id` 는 모두 마이그레이션할 수 있지만 새 코드에 `migrate` 함수가 정의되어 있어야 하며 entry_point로 export되어야 합니다. `entry_point`: #[cfg_attr(not(feature = "library"), entry_point)].

`migrate` 함수는 데이터베이스 마이그레이션 같은 State 의 세부적인 변경에 필요한 기능을 제공합니다.

마이그레이션 함수가 오류를 리턴하면 트랜잭션이 중단되고 모든 State 변경이 되돌려지고 마이그레이션이 수행되지 않습니다.

아래에는 매우 간단한 마이그레이션부터 코드 ID 및 유형을 지정한 복잡한 마이그레이션에 대한 예시가 있습니다.

### 기본적인 컨트랙트 마이그레이션

이 마이그레이션은 가장 일반적인 예시입니다. 아래의 코드는 단순히 컨트랙트의 코드를 변경하는 방식에 대한 설명입니다.`cw2::set_contract_version` 를 사용하지 않으면 safety check가 실행되지 않을 수 있습니다.

```rust
const CONTRACT_NAME: &str = "crates.io:my-crate-name";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[entry_point]
pub fn migrate(deps: DepsMut, _env: Env, msg: MigrateMsg) -> Result<Response, ContractError> {
    // No state migrations performed, just returned a Response
    Ok(Response::default())
}
```

### 코드의 버전과 이름을 지정한 마이그레이션

이 마이그레이션은 완전하고 제한된 예시입니다. 여기에서는 `cw2` 패키지가 사용되고 `migrate` 함수가 다음을 보장합니다.

- 동일한 타입의 컨트랙트의 마이그레이션; 이름을 확인합니다.
- 이전 버전의 컨트랙트를 업그레이드하는 마이그레이션; 버전을 확인합니다.

```rust
const CONTRACT_NAME: &str = "crates.io:my-crate-name";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[entry_point]
pub fn migrate(deps: DepsMut, _env: Env, msg: MigrateMsg) -> Result<Response, ContractError> {
    let ver = cw2::get_contract_version(deps.storage)?;
    // 마이그레이션이 가능한 컨트랙트인지 확인합니다.
    if ver.contract != CONTRACT_NAME {
        return Err(StdError::generic_err("Can only upgrade from same type").into());
    }
    // note: better to do proper semver compare, but string compare *usually* works
    if ver.version >= CONTRACT_VERSION {
        return Err(StdError::generic_err("Cannot upgrade from a newer version").into());
    }

    // set the new version
    cw2::set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    // do any desired state migrations...

    Ok(Response::default())
}
```

### 최신 버전의 컨트랙트일 경우에만 업데이트하는 마이그레이션

이 마이그레이션은 위보다 덜 제한적인 예시입니다. 이 경우 `cw2` 패키지가 사용되며 `migrate` 함수가 다음을 보장합니다.

- 컨트랙트 버전이 저장된 버전보다 최신일 경우 필요한 마이그레이션을 수행하되 새 컨트랙트 버전을 저장합니다.
- String compare가 아닌 Semver를 사용합니다.

```rust
const CONTRACT_NAME: &str = "crates.io:my-crate-name";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[entry_point]
pub fn migrate(deps: DepsMut, _env: Env, msg: MigrateMsg) -> Result<Response, ContractError> {
    let version: Version = CONTRACT_VERSION.parse()?;
    let storage_version: Version = get_contract_version(deps.storage)?.version.parse()?;

    if storage_version < version {
        set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

        // If state structure changed in any contract version in the way migration is needed, it
        // should occur here
    }
    Ok(Response::default())
}
```

이 예제에서는 Semver를 사용하여 버전을 확인니다. 이때 cargo deps에 semver dependency를 추가해야 합니다.

```toml
[dependencies]
semver = "1"
```

또한 컨트랙트 패키지에 Semver 커스텀 error를 구현해야합니다.

```rust
#[derive(Error, Debug, PartialEq)]
pub enum ContractError {

    #[error("Semver parsing error: {0}")]
    SemVer(String),

}
impl From<semver::Error> for ContractError {
    fn from(err: semver::Error) -> Self {
        Self::SemVer(err.to_string())
    }
}
```

### 마이그레이션을 통해 변경 불가능한 상태 업데이트하기

이 예시는 마이그레이션을 사용하여 일반적으로 변경해서는 안 되는 값을 업데이트하는 방법입니다. immutable한 값을 업데이트해야 하는 경우 마이그레이션 중에 변경할 수 있습니다.

```rust
#[entry_point]
pub fn migrate(deps: DepsMut, _env: Env, msg: MigrateMsg) -> Result<Response, HackError> {
    let data = deps
        .storage
        .get(CONFIG_KEY)
        .ok_or_else(|| StdError::not_found("State"))?;
    let mut config: State = from_slice(&data)?;
    config.verifier = deps.api.addr_validate(&msg.verifier)?;
    deps.storage.set(CONFIG_KEY, &to_vec(&config)?);

    Ok(Response::default())
}
```

위의 예시에서 `MigrateMsg` 는 State에 저장된 컨트랙트의 `verifier` 필드를 변경하기 위해 새로운 `verifier` 값을 가지고 있습니다. 기존 컨트랙트에서 `UpdateState` 또는 `UpdateVerifier` 와 같은 ExecuteMsgs 함수들을 미리 구현하지 않았다면 `verifier` 값을 변경하는 유일한 방법은 위에서 제시한 마이그레이션 뿐입니다.

### 마이그레이션을 통해 컨트랙트를 'burn'하기

마이그레이션을 사용하여 기존 컨트랙트를 완전히 폐기하고 state를 소각할 수도 있습니다. 이것은 여러 목적으로 사용될 수 있지만 필요한 경우 [here](https://github.com/CosmWasm/cosmwasm/blob/main/contracts/burner/src/contract.rs#L20) 에서 예를 찾을 수 있습니다.

```rust
#[entry_point]
pub fn migrate(deps: DepsMut, env: Env, msg: MigrateMsg) -> StdResult<Response> {
    // delete all state
    let keys: Vec<_> = deps
        .storage
        .range(None, None, Order::Ascending)
        .map(|(k, _)| k)
        .collect();
    let count = keys.len();
    for k in keys {
        deps.storage.remove(&k);
    }

    // get balance and send all to recipient
    let balance = deps.querier.query_all_balances(env.contract.address)?;
    let send = BankMsg::Send {
        to_address: msg.payout.clone(),
        amount: balance,
    };

    let data_msg = format!("burnt {} keys", count).into_bytes();

    Ok(Response::new()
        .add_message(send)
        .add_attribute("action", "burn")
        .add_attribute("payout", msg.payout)
        .set_data(data_msg))
}

```

위의 예시에서 마이그레이션이 발생하면 State가 완전히 삭제됩니다. 또한 컨트랙트의 모든 토큰은 `MigrationMsg` 에 지정한 `payout` 주소로 전송됩니다. 이 경우 모든 자금이 소진되고 모든 state에서 컨트랙트를 burn하여 제거합니다.

## 특정 플랫폼에서의 마이그레이션

코스모스 생태계의 각 체인과 허브는 각각의 네트워크에서 마이그레이션이 수행되는 방식이 다를 수 있습니다. 이 섹션에서는 이러한 항목을 간략하게 설명합니다.

### Terra

Terra(Classic) 는 마이그레이션을 처리하는데에 몇가지 차이점이 있습니다. 먼저, 컨트랙트의 instantiation 당시에 migratable로 지정된 컨트랙트만 마이그레이션을 진행할 수 있습니다. 이러한 컨트랙트는 일반적인 마이그레이션 절차와 유사하게 migratability 를 가진 admin이 필요합니다. 이때 Terra에서의 마이그레이션은 기존 컨트랙트와 'compatible'(이는 CW2에 명시되어 있습니다. [Source](https://github.com/terra-money/terrain#migrating-cosmwasm-contracts-on-terra).) 한 다른 코드의 code id로 대체합니다.

> 참고: Terra에서는 체인 간에 code_id를 마이그레이션할 수도 있습니다(예: COL4-&gt;5). 이 작업은 원자적이며 단 한 번만 수행할 수 있습니다. 이러한 이유는 코드를 새 체인으로 마이그레이션하고 이전 code ID를 유지하기 위함입니다. 이 고 ㅏ정은 기존 code ID에 의존하는 새 네트워크에서 다른 컨트랙트의 downstream breakage를 방지하는 데 도움이 됩니다. 체인 간 마이그레이션을 위한 커맨드 예:
>
> ```rust
> terrad tx wasm store ./{code.wasm} --from {keyname} \
> --migrate-code-id {codeID}
> ```
