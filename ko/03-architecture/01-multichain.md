---
sidebar_position: '1'
---

# 멀티 체인 컨트랙트란 무엇인가?

CosmWasm은 스마트 컨트랙트를 위한 멀티 체인 솔루션으로 설계 및 구축되었습니다. Cosmos 생태계에서 출발했기에, 격리된 체인들이 아닌 블록체인들의 네트워크를 위해 설계가 되었습니다. 그러나 우리가 멀티 체인이라고 말하는 것은 정확히 무엇을 의미할까요?

## 다른 체인, 같은 컨트랙트 {#different-chain-same-contract}

호스트 애플리케이션에 대한 요구 사항이 거의 없어, 모든 Cosmos SDK 앱이 wasm 모듈을 쉽게 내장할 수 있고, 접근 허가 및 비용을 원하는 대로 바꿀 수 있습니다. 모든 코드는 체인의 세부 사항과 무관하게 설계가 되어 있기에, CosmWasm 컨트랙트를 쓰는 것만으로, Cosmos 생태계의 다른 체인들에서도 실행을 시킬 수 있습니다

[Regen Network](https://regen.network)는 출시에 CosmWasm 지원을 포함하여 계획했습니다. 많은 다른 체인들도 지원을 추가하고 있습니다

## 블록체인 간 컨트랙트 {#inter-blockchain-contracts}

Cosmos에 대해 들어본 적이 있다면, 아마 [Inter-Blockchain Communication](https://ibcprotocol.org/)일 가능성이 높습니다. [Tendermint BFT consensus](https://tendermint.com)의 힘과 그들의 [새로운 bonded proof of stake 알고리즘](https://blog.cosmos.network/what-does-the-launch-of-cosmos-mean-for-the-blockchain-ecosystem-952e14f67d0d)들은 블록체인간 신뢰할 수 없는 메시지가 의미를 전달할 수 있게 만든 혁명적인 프로토콜의 기반이 되었습니다. 중간자가 없고, 타이밍 문제도 없으며, 완벽한 보안이 이루어집니다.

잠재적인 의미는 한 체인에 있는 코드가 다른 체인에 트랜잭션을 실행시킬 수 있다는 것입니다. 그러나 코드는 메시지-전달 양식을 맞춰서 설계가 되어야만 합니다. CosmWasm은 [actor model](./actor)을 전부 받아들였고 IBC가 사용하도록 그 자체를 빌려줍니다. 메세지를 보낼 때 재진입 공격이나 경쟁 조건에 대해 걱정을 하거나 promise를 기다리지 않고, 보낸 후 잊고 있어도 됩니다. IBC가 안정화되면, 우리는 IBC 초기 단계를 지원하는 첫번째 클래스를 [CosmWasm](https://github.com/CosmWasm/cosmwasm) 라이브러리에 추가할 것이며, 그것을 호스트하는 [Cosmos SDK module](https://github.com/CosmWasm/wasmd/tree/master/x/wasm)도 추가할 것입니다.

## 쉬운 통합 {#easy-to-integrate}

CosmWasm의 또 다른 디자인 목표는 프레임워크가 아닌 라이브러리가 되는 것입니다. 필요한 API의 범위가 적기 때문에 대부분의 코드에 최적화를 할 수 있습니다. 따라서 쉽게 적용할 수 있을 뿐만 아니라 자신의 방법대로 만들 수도 있습니다.

여기에는 큰 두 가지 장점이 있습니다

- 여러 언어에 대한 지원을 추가해 컨트랙트를 작성하는 것이 쉬워집니다. 따라서 Rust를 쓰지 않는 사용자를 위해 AssemblyScript나 Go 등의 지원을 추가할 수 있습니다

- 호스트 시스템의 요구를 제한하기 때문에 Cosmos SDK 뿐만 아니라 다른 프레임워크에도 내장시킬 수 있습니다. 코어 런타임 로직인 [`cosmwasm-vm`](https://github.com/CosmWasm/cosmwasm/tree/main/packages/vm)은 Rust로 쓰여졌고, [`wasmvm`](https://github.com/CosmWasm/wasmvm)은 제네릭 Go 바인딩을 제공합니다. Go와 Rust가 블록체인을 작성할 때 가장 인기 많은 두 언어이기 때문에 통합을 쉽게 할 수 있습니다. 물론, 체인이 [Tendermint](https://tendermint.com)나 [Babble](https://github.com/mosaicnetworks/babble)와 같은 잠재적인 또다른 BFT Instant Finality Consensus 알고리즘 위에서 실행되지 않는다면 컨트랙트는 IBC를 통해서 상호작용할 수 없습니다

## 만들어질 플랫폼 {#platform-to-build-on}

CosmWasm은 당신이 한 블록체인이나 프로그래밍 언어에 묶여 있는걸 원하지 않습니다. CosmWasm은 많은 환경에 적합하게 설계되었고 블록체인들을 *연결*합니다. 이는 견고한 플랫폼을 만들 수 있습니다. 심지어 한 체인이 제대로 작동하지 않더라도 당신의 모든 스마트 컨트랙트와 dApp을 다른 체인으로 빠르게 옮길 수 있습니다. 아니면 당신의 애플리케이션이 빠르게 성장하면 자신의 체인을 출시하여 다음 버전의 컨트랙트를 배포하고 IBC를 통해 존재하는 모든 토큰들을 옮길 수 있습니다. 이런 가능성들은 오직 당신의 상상력에 의해서만 제한됩니다.
