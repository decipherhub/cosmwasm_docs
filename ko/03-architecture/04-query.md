---
title: Querying
sidebar_position: '4'
---

# 컨트랙트 상태를 쿼리하기

컨트랙트의 상태를 확인하고 싶은 다양한 경우가 있습니다. 외부 클라이언트(cli 사용)뿐 아니라 컨트랙트를 실행하는 동안에도 확인하고 싶으실 것입니다. 예를 들어, 저번 섹션에서는 "Alice" 또는 "Bob"과 같은 네임 서비스를 위해 다른 컨트랙트에 쿼리가 필요한 경우를 다뤘습니다. 먼저 쿼리의 두 가지 유형 - 원본 및 커스텀 - 을 다룬 다음 *외부 클라이언트* 와 *내부 클라이언트* (또 다른 컨트랙트)를 통한 쿼리의 의미를 살펴볼 예정입니다. 실제로 어떻게 작동하는지 살펴보고, 한 컨트랙트에서 다른 컨트랙트로 쿼리를 실행할 때 발생하는 디자인 및 보안 문제도 살펴보겠습니다.

**참고:** 본 문서는 상호 컨트랙트 쿼리(cross-contract queries)를 완벽하게 지원하는 CosmWasm 0.8에 맞게 업데이트되었습니다.

## Raw 쿼리 {#raw-queries}

The simplest query to implement is just raw read access to the key-value store. If the caller (either external client, or other contract) passes in the raw binary key that is used in the contract's storage, we can easily return the raw binary value. The benefit of this approach is that it is very easy to implement and universal. The downside is that it links the caller to the *implementation* of the storage and requires knowledge of the exact contract being executed.

This is implemented inside the `wasmd` runtime and circumvents the VM. As a consequence it requires no support from the CosmWasm contract and all contract state is visible. Such a `query_raw` function is exposed to all callers (external and internal).

## 커스텀 쿼리 {#custom-queries}

많은 경우 *구현*에 꼭 맞지 않아, 오히려 *인터페이스*에 의존해야할 수 있습니다. 예를 들어 ,컨트랙트를 호출하기 위한`HandleMsg`과 `QueryMsg`의 "ERC20"을 위한 표준을 정의하는 경우를 생각해봅시다. 예로, 주소별 잔액에 대한 쿼리, 수여자(granter)와 수령자(grantee) 허용에 대한 쿼리, 토큰 정보(티커, 데시멀 등)를 쿼리할 수 있습니다. 표준 *인터페이스*를 정의하면 "ERC20" 인터페이스는 기능의 작은 부분집합일 뿐인 복잡한 컨트랙트를 포함한 여러 구현에 활용할 수 있습니다.

커스텀 쿼리를 실행하기 위해, 읽기 전용 모드로 데이터 저장소에 접근할 수 있는 `query` 함수 노출을 각 컨트랙트에 허용해야합니다. 이는 원하는 어떤 데이터든 가져올 수 있고, 심지어 계산도 수행할 수 있습니다. 이 메소드는 모든 호출자(외부 및 내부) 에게 `query_custom`으로 노출됩니다. 데이터 포맷(쿼리와 응답 모두)은 컨트랙트가 원하는 어떤 것이던 될 수 있고, `HandleMsg` 및 `InitMsg`와 함께 공개 스키마에 기술되어야 합니다.

Note that executing a contract may consume an unbounded amount of gas. Whereas `query_raw` will read one key and has a small, mostly fixed cost, we need to enforce a gas limit on these queries. This is done differently for external and internal calls and discussed below.

## 외부 쿼리 {#external-queries}

External queries are the typical way all web and cli clients work with the blockchain. They call Tendermint RPC, which calls into `abci_query` in the Cosmos SDK, which delegates down to the module to handle it. As far as I know, there is an infinite gas limit on queries, as they are only executed on one node, and cannot slow down the entire blockchain. This functionality is generally not exposed on validating nodes. The query functionality exposed in the current SDK is hard coded, and has execution time limits designed by the developers. This limits abuse. But what about someone uploading a wasm contract with an infinite loop, and then using that to DoS any public RPC node that exposes querying?

To avoid such issues, we need to define some fixed gas limit for all `query_custom` transactions called externally. This will not charge a fee, but is used to limit abuse. However, it is difficult to define a standard value, for a free public node would prefer a small amount, but I may want to sync my own archive node and perform complex queries. Thus, a gas limit for all `query_custom` calls can be defined in an app-specific configuration file, which can be customized by each node operator, with a sensible default limit. This will allow public nodes to protect themselves from complex queries, while still allowing optional queries to perform large aggregation over all contract data in specially-configured nodes.

Note that the `abci_query` call never reads the current "in-progress" state of the modules, but uses a read-only snapshot of the state after the last committed block.

## 내부 쿼리 {#internal-queries}

While many interactions between contracts can easily be modeled by sending messages, there are some cases where we would like to synchronously query other modules, without altering their state. For example, if I want to resolve a name to a [Address](03-addresses.md), or if I want to check KYC status of some account (in another contract) before enabling an action. One could model this as a series of messages, but it is quite complex and makes such simple use-cases almost unusable in the system.

However, this design violates one of the basic principles of the [actor model](02-actor.md), namely that each contract has exclusive access to its own internal state. (Both `query_raw` and `query_custom` fail in this regard). Far from just being a theoretical issue, this may lead to concurrency and reentrancy issues if not handled correctly. We do not want to push such safety critical reasoning into the laps of the contract developers, but rather provide these security guarantees in the platform. However, providing old data also leads to many possible errors and bugs, especially since we use the same `Querier` interface to interact with the native SDK modules, *including querying the contract's own balance*.

As such, we provide the `Querier` with read-only access to the state snapshot *right before execution of the current CosmWasm message*. Since we take a snapshot and both the executing contract and the queried contract have read-only access to the data *before the contract execution*, this is still safe with Rust's borrowing rules (as a placeholder for secure design). The current contract only writes to a cache, which is flushed afterwards on success.

재진입을 피해야 하는 것도 문제입니다. 이러한 쿼리는 동기적으로 호출되기 때문에 호출 컨트랙트를 다시 호출하여 문제를 일으킬 수 있습니다. 쿼리에는 읽기 전용 액세스 권한만 있고 부작용을 가질 수 없어, 원격 컨트랙트를 동기적으로 실행하는 것만큼 위험하지는 않지만 여전히 고려해야 할 문제입니다. 특히, 쿼리는 현재 실행 전의 상태에만 접근할 것입니다. 의도적으로 잘못된 데이터를 반환하는 쿼리 함수보다 더 많은 오류가 발생하지는 않겠지만 더 살펴볼 필요는 있습니다.

모든 쿼리는 이미 가스 제한이 있는 트랜잭션의 부분으로 수행되므로 여기서 추가 작업이 필요하지 않습니다. 쿼리의 일부로 수행된 모든 스토리지 읽기 및 데이터 처리는 나머지 트랜잭션과 동일한 가스 수준에서 차감되므로 처리 시간도 제한됩니다. 우리는 재진입이나 쿼리의 최대 깊이에 대한 명시적인 보호 장치를 추가하는 것을 고려했지만 `wasmd`에 아직 적용하지는 않았습니다. 크로스-컨트랙트 쿼리에 대한 많은 작업들이 결실을 맺게 되면, 이 부분은 더 연구 되어야 할 문제입니다.
