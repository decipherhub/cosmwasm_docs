---
sidebar_position: '7'
---

# 솔리디티 컨트랙트와의 비교

먼저, 배포-실행 프로세스는 2단계가 아닌 3단계로 구성이 됩니다. 이더리움은 많은 독특한 컨트랙트의 개념을 중심으로 만들어졌고, 각각의 컨트랙트는 양쪽의 합의를 위해 커스텀-제작이 가능했지만, 현실은 원래 생각했던 것 보다 버그가 없는 컨트랙트 작성이 어려웠고, 대다수의 컨트랙트는 OpenZepellin과 같은 표준 템플릿의 복사본입니다. 이를 염두하고, wasm 코드를 업로드하고 검증하는 오버헤드를 생각해, 우리는 컨트랙트의 다음 3 단계를 정의했습니다:

- 코드 업로드 - 최적화된 wasm 코드를 업로드하고, 상태나 컨트랙트 주소는 존재하지 않습니다 (예로 표준 ERC20 컨트랙트가 있습니다)
- 컨트랙트 초기화 - 초기 상태를 가진 코드 참조를 초기화하고, 새로운 주소를 생성합니다 (예로 *본인의* ERC20 토큰 이름, 최대 발행량 등을 설정하는 것이 있습니다)
- 컨트랙트 실행 - 이는 많은 다른 호출들을 지원하지만, 컨트랙트가 인스턴스화되기 전에는 권한 없는 호출들이고, 컨트랙트 설계에 따라 달라집니다 (예:  ERC20 토큰 전송, 다른 컨트랙트에 approval 수여)

이더리움처럼, 컨트랙트 인스턴스화 및 실행은 계량이 되고 가스가 필요합니다. 추가로, 인스턴스화 및 실행 둘 다 서명자가 컨트랙트에 토큰을 보낼 때 메시지도 함께 보낼 수 있게 합니다. 이더리움과의 주요 차이점은 컨트랙트에 토큰을 직접 보낼 때(예를 들면 `SendMsg`를 사용해서 보낼 때) 가능하다면 *어떠한 컨트랙트 코드도 실행시키지 않는 것 입니다*. 이는 가능한 공격 방법을 줄이기 위한 깔끔한 설계입니다. 이런 설계 때문에 기능상 차이는 없지만, 모든 컨트랙트의 실행은 *명시적으로 요청받아야 합니다*.

## 재진입 공격 방지 {#avoiding-reentrancy-attacks}

또 다른 큰 차이점은 설계로 재진입 공격을 방지할 수 있다는 것입니다. 이 점 자체만으로도 글을 하나 쓸 수 있지만, 한마디로 [이더리움에서의 많은 악용은 이 공격에서 나옵니다](https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/). 공격의 아이디어는 컨트랙트 A가 함수 실행 중 두 번째 컨트랙트를 호출하는 것에 있습니다(명시적 혹은 암묵적인 전송을 통해서). 코드를 실행하는 제어권은 컨트랙트 B로 넘어가고, 이는 다시 컨트랙트 A를 호출합니다. 따라서 두 개의 컨트랙트 A가 실행되고, 원격 컨트랙트를 호출하기 전 상태 관리에 매우, 매우 신경을 쓰거나 서브-콜에서 매우 엄격한 가스 제한을 설정하지 않는 한, 컨트랙트에서 정의되지 않은 행동을 일으킬 수 있고, 영리한 해커는 DAO 해킹과 같이 재진입을 사용해 악용을 할 수 있습니다.

Cosmwasm은 컨트랙트가 다른 컨트랙트를 직접 호출하는 것을 막아 재진입을 방지합니다. 컴포지션을 활용하고 싶지만, 잘못된 코드에 대한 인라인 함수 호출은 보안에 큰 위협이 될 수 있습니다. CosmWasm에서 취하는 접근법은 메시지 목록을 *반환*하는 컨트랙트들은 *같은 트랜잭션에서 실행이 되도록* 하는 것입니다. 이는 한 컨트랙트가 완료된 이후에(예: 에스크로 릴리스) 전송을 요청하거나, 다른 컨트랙트를 호출할 수 있음을 의미합니다. 만약 이후 메시지가 실패한다면, 업데이트가 된 컨트랙트의 상태를 포함 전체 트랜잭션은 복구가 됩니다. 이는 원자성 있는 컴포지션과 상당한 보안을 보장할 수 있으며, 단 하나의 단점은 다른 컨트랙트의 실행 결과를 볼 수 없고 "오류 시 되돌리기"만 할 수 있다는 점입니다.

가끔 다른 컨트랙트의 정보가 필요할 때가 있고, 그래서 0.8 릴리스에서 다른 컨트랙트나 Cosmos SDK 모듈로의 동기적 쿼리를 추가했습니다. 이러한 쿼리들은 읽기 전용 데이터베이스 스냅샷에 접근만 할 수 있고 다른 모듈에 상태를 수정하거나 메시지를 보낼 수 없어, 가능한 재진입 문제를 방지할 수 있습니다.

## 리소스 한도 {#resource-limits}

악용(재진입 공격과 같은) 외에도, 스마트 컨트랙트에 대한 다른 공격 방법은 서비스 거부 공격입니다. 악의적인 행위자가 무한 루프를 실행하는 컨트랙트를 업로드하거나 엄청난 양의 데이터를 기록해 데스크를 채워버릴 수 있습니다. 웹 어셈블리는 OS에 대한 기본 접근 없이 엄격한 샌드박스를 제공해 스마트 컨트랙트에 제공되는 엄격한 리소스 한도만 걱정하면 됩니다. 모든 개발자들은 이러한 한도에 대해 알아야 합니다.

*메모리 사용* - Wasm VM을 인스턴스화할 때, 기본적으로 32MB의 RAM이 주어집니다. 이는 바이트 코드뿐만 아니라 프로세스를 실행할 때 필요한 모든 메모리(스택과 힙)를 저장합니다. 이 용량은 대부분의 컨트랙트에서는 충분히 크지만, 아마 몇 복잡한 영지식 로직 컨트랙트는 한계에 부딪힐 수 있습니다. 이 용량은 컨트랙트가 블록체인의 메모리 사용량에 미치는 영향을 최소화할 수 있을 정도로 작기도 합니다.

*CPU 사용량* - 우리가 사용하는 [Wasmer Runtime](https://github.com/wasmerio/wasmer)은 wasm 코드에 계량하는 로직을 주입할 수 있습니다. 이 로직은 모든 점프 statement(루프, 함수 호출, 등) 이전에 여러 오퍼레이션에 대한 비용을 계산하고 한도를 확인해, cpu 속도, 플랫폼 등에상관 없이 결정론적 가스 가격을 산출합니다. 컨트랙트 실행 전, wasm 가스 한도는 남아있는 Cosmos SDK 가스에 의해 산정되고, 컨트랙트가 종료되면 가스가 차감됩니다(변환 상수는 일정하며, 현재 100 wasm 가스는 1 sdk 가스로 변환됩니다). 이는 사용한 사이클에 대해 비용을 지불해 CPU 계산량에 대해 엄격한 한도를 걸게 됩니다.

*디스크 사용량* - KVStore에 대한 읽기, 쓰기를 통해 모든 디스크 접근은 이루어집니다. Cosmos SDK는 이미 [KVStore 접근에 대한 가스 지불을 강제합니다](https://github.com/cosmos/cosmos-sdk/blob/4ffabb65a5c07dbb7010da397535d10927d298c1/store/types/gas.go#L154-L162). 컨트랙트 안의 모든 디스크 접근이 콜백을 통해 SDK로 이루어지기 때문에, 비용이 청구됩니다. 만약 다른 런타임에 CosmWasm을 통합한다면, 그곳에서도 비용을 지불해야할 것입니다.

## 이더리움으로부터 배운 교훈 {#lessons-learned-from-ethereum}

이더리움은 모든 블록체인 스마트 컨트랙트 플랫폼의 할아버지격이며 그 어떤 플랫폼보다 많은 사용량과 실제 경험을 가지고 있습니다. 이더리움이 가진 지식을 무시하지 말고, 좀 더 튼튼한 스마트 컨트랙트 플랫폼을 만들기 위해 이더리움의 성공과 실패로부터 배워야할 것입니다.

이더리움은 완화 전략과 함께 [알려진 모든 이더리움 공격 방법들](https://github.com/sigp/solidity-security-blog) 목록을 작성했습니다. 우리는 이제 Cosmwasm과 이 목록을 비교해 얼마나 적용이 되는지 볼 것입니다. 대부분의 공격 방법은 설계상으로 막혀있습니다. 다만 몇 개의 공격 방법이 남아 있고 이러한 공격들을 피하기 위한 섹션을 계획했습니다.

### :heavy_check_mark: [재진입](https://github.com/sigp/solidity-security-blog#reentrancy) {#heavy_check_mark-reentrancy}

Cosmwasm에서, 컨트랙트가 완료된 *이후*, 같은 원자적 작동 안에서, 다른 컨트랙트를 실행하기 위해 메시지를 반환합니다. 이는 액터 모델에 기반을 두고 있고, 재진입 공격의 가능성을 방지합니다 - 컨트랙트가 호출될 때 절대 임시 상태가 있을 수 없습니다.

### :heavy_check_mark: [연산 언더/오버플로우](https://github.com/sigp/solidity-security-blog#ouflow) {#heavy_check_mark-arithmetic-underoverflows}

어떠한 오버플로우가 발견되더라도 러스트는 단순히 `overflow-checks = true`를 [Cargo manifest](https://doc.rust-lang.org/cargo/reference/manifest.html#the-profile-sections)에 설정해주는 것만으로 프로그램이 중단될 수 있게 해줍니다. 안정적으로 수학 연산을 사용할 수 있습니다.

### :warning: [예상치 못한 Ether](https://github.com/sigp/solidity-security-blog#ether) {#warning-unexpected-ether}

**나쁜 디자인 패턴**

여기에는 컨트랙트 자신의 잔액에 대한 통제를 의존하는 컨트랙트도 포함이 됩니다. 모든 컨트랙트 시스템에서 피해야 하는 디자인 패턴입니다. CosmWasm에서는, 토큰이 컨트랙트에 전송이 될 때 컨트랙트가 호출이 되지 않지만, 컨트랙트가 호출이 될 때 현재 자신의 잔액을 쿼리할 수 있습니다. 한 예로 [샘플 에스크로 컨트랙트](https://github.com/InterWasm/cw-contracts/blob/escrow-0.4.0/escrow/src/contract.rs)가 초기화되는 동안 얼마가 보내졌는지 기록하지 않지만, 금액을 지불하거나 받을 때 [현재 자신의 잔액을 보여준다는 것](https://github.com/InterWasm/cw-contracts/blob/escrow-0.4.0/escrow/src/contract.rs#L83-L92)을 알 수 있습니다. 이를 통해 토큰이 고착되지 않음을 보장합니다.

### :heavy_check_mark: [위임 호출(Delegate Call)](https://github.com/sigp/solidity-security-blog#delegatecall) {#heavy_check_mark-delegate-call}

CosmWasm에는 위임 호출(Delegate Call)이 없습니다. 모듈로부터 가져올 수 있지만, 컴파일 타임에 링크되어 전체로써 테스트를 수행할 수 있고, 컨트랙트 로직에 감지하기 힘든 진입점이 없습니다.

### :heavy_check_mark: [기본 가시성](https://github.com/sigp/solidity-security-blog#visibility) {#heavy_check_mark-default-visibilities}

코드의 모든 함수/메소드에 진입점을 자동으로 생성하는 것보다(더 최악의 경우는 따로 명시하지 않았을 때 public을 가정하는 것), 개발자는 다룰 메시지 목록을 명확히 정의하고 적절한 함수에 발송해야 합니다. 이 방법은 함수를 실수로 노출시키는 것을 방지합니다.

### :warning: [엔트로피 오해](https://github.com/sigp/solidity-security-blog#entropy) {#warning-entropy-illusion}

**의도된 고정**

블록 해시들(그리고 타임 스탬프들의 마지막 자리들) 이더리움의 채굴자보다 텐더민트의 블록 제안자들에 의해 훨씬 쉽게 조작됩니다. 이것들은 무작위성을 위해 사용되면 안됩니다. 안전한 랜덤 비콘울 제공하고 스마트 컨트랙트로의 안전한 엔트로피 소스를 제공하려는 계획이 있습니다.

### :heavy_check_mark: [외부 컨트랙트 참조](https://github.com/sigp/solidity-security-blog#contract-reference) {#heavy_check_mark-external-contract-referencing}

**계획된 완화**

주어진 `HandleMsg`로 컨트랙트를 호출한다면, 컨트랙트에 지정된 API가 있어야 할 뿐, 코드는 아무것도 요구사항이 없습니다. 따라서 제가 원하는 컨트랙트와 같은 API(또는 API의 모집합)를 가진 악의적인 코드를 올리고, 당신에게 호출을 요청할 수 있습니다 - 직접 혹은 컨트랙트에서 호출하는 두 가지 모두. 이는 자금을 훔치는 데 사용될 수 있고 실제로  [튜토리얼에서 이것을 시연했습니다](/tutorials/hijack-escrow/hack-contract).

여기에는 두 가지 완화 조치가 있습니다. 첫번째는 CosmWasm에서 크기 제한을 다루기 위해 런타임에서 솔리디티 라이브러리를 호출할 필요는 없지만, 하나의 wasm blob에 모든 필요한 코드를 링크해 넣는 것입니다. 이것만으로도 대부분의 외부 컨트랙트 참조의 사용을 없앨 수 있습니다.

또 다른 완화 조치는 사용자가 체인 위에 있는 wasm 컨트랙트 뒤의 검증된 rust 소스를 빠르게 찾을 수 있도록 허용하는 것입니다. 이 접근법은 개발자가 원본 소스 코드를 게시할 수 있고, 컴파일하는  [이더스캔에서 사용합니다](https://medium.com/coinmonks/how-to-verify-and-publish-on-etherscan-52cf25312945#bc72). 만약 같은 바이트 코드가 체인 위에 있다면, 러스트 소스로부터 왔다는 것을 증명할 수 있습니다. 우리는 rust wasm을 위한 결정론적 빌드 시스템을 구축했고, [원본 소스 코드를 검증할 수 있는 간단한 도구](https://medium.com/confio/dont-trust-cosmwasm-verify-db1caac2d335)도 가지고 있습니다. 또한 컨트랙트를 탐색하고 하나의 명령으로 소스 코드를 로컬로 검증할 수 있는 [코드 탐색기를 릴리스했습니다](https://demonet.wasm.glass/codes).

### :heavy_check_mark: [짧은 주소/파라미터 공격](https://github.com/sigp/solidity-security-blog#short-address) {#heavy_check_mark-short-addressparameter-attack}

RLP 인코딩 메커니즘의 장점과 고정된 32-바이트 스택의 크기를 이용한 공격입니다. 이 공격은 우리의 타입-체킹 json 파서에는 작동하지 않습니다.

### :heavy_check_mark: [검사되지 않은 호출 리턴 값](https://github.com/sigp/solidity-security-blog#unchecked-calls) {#heavy_check_mark-unchecked-call-return-values}

CosmWasm은 다른 컨트랙트를 직접 호출하는 것을 허용하지 않지만, 라우터에 의해 전송될 메시지를 발송합니다. 라우터는 모든 메시지의 결과를 확인하고, 만약 체인 안의 **어떤** 메시지가 에러를 리턴하면, 전체 트랜잭션은 중단되고, 상태는 롤백됩니다. 이는 계획한 대로 진행하지 않는다면 모든 상태가 롤백이 되는 것을 알기에, 다른 컨트랙트 호출을 계획할 때 성공한 경우에 집중할 수 있게 해줍니다.

### :warning: [레이스 컨디션/프론트 러닝](https://github.com/sigp/solidity-security-blog#race-conditions) {#warning-race-conditionsfront-running}

이 문제는 모든 블록체인들의 일반적인 문제입니다. 서명된 메시지는 블록이 생성되기 전에 모든 노드에게 전달됩니다. 채굴자/검증자는 다른 트랜잭션을 생성하여 당신이 보낸 트랜잭션 앞에 넣을 수 있습니다(아마 당신의 트랜잭션이 지연이 될 겁니다). 이는 때로는 문제가 아닐 수도 있지만, 탈중앙화된 교환에서 특히 많이 나타납니다. 만약 90에 팔겠다는 주문이 있고 내가 100에 사겠다는 주문을 걸었다면, 보통의 경우 90에 채결이 될 겁니다. 그러나 채굴자가 두 트랜잭션 사이에 90에 사는 주문과 100에 파는 주문을 넣을 수 있을겁니다. 그러면 채굴자의 100에 걸린 주문을 받을 것이고 채굴자들은 차익거래로 10개의 토큰 수익을 거둘 수 있습니다.

주문이 빈번한 트레이딩과 결과를 클라이언트 간 주문에 의존하는 모든 시스템에도 이는 문제가 되는데, 특히 블록체인은 지연이 마이크로초 단위가 아닌 초 단위로 이루어지기에 두드러집니다. 대부분의 어플리케이션에서는 문제가 되지 않고, 탈중앙화 교환은 프론트 러닝의 가능성을 없애는 batch auction과 같은 설계를 가진다면 문제가 되지 않습니다.

### :warning: [서비스의 거부](https://github.com/sigp/solidity-security-blog#dos) {#warning-denial-of-service}

**제한된 상황**

이 공격의 아이디어는 컨트랙트가 외부 사용자-정의 입력에 의존한다면, 모든 가스를 소모하는 방식으로 동작하게 입력을 설정할 수 있다는 것입니다. 대부분의 케이스는 CosmWasm에는 영향을 미치지 않는데, 특히 wasm이 실행이 훨씬 빠르고 가스 제한이 한 트랜잭션에서 엄청난 양의 처리를 감당하기 때문입니다(사전 컴파일 없이 wasm에서 ed25519 서명 검증을 하는 경우 포함). 그러나 저장소에서 사용자가 제어할 수 있는 키들을 루프를 실행시키면 가스는 빠르게 고갈될 것입니다.

### :heavy_check_mark: [블록 타임스탬프 조작](https://github.com/sigp/solidity-security-blog#block-timestamp) {#heavy_check_mark-block-timestamp-manipulation}

텐더민트는 [BFT 타임스탬프](https://github.com/tendermint/tendermint/blob/master/docs/spec/blockchain/blockchain.md#time-1)를 모든 블록체인 헤더에 제공합니다. 따라서 타임스탬프를 조작하려면 공모할 검증자들을 과반수 이상 모집해야 하며, 그러므로 블록 스탬프는 블록체인 자체만큼 신뢰할 수 있습니다. (체인을 멈추게 하거나 포크를 할 수 있는 같은 노드 수)

### :heavy_check_mark: [생성자 관리](https://github.com/sigp/solidity-security-blog#constructors) {#heavy_check_mark-constructors-with-care}

이것은 생성자 이름 지정과 함께 솔리디티 언어의 특이한 점입니다. cosmwasm에서 `init`의 이름을 바꿀 가능성은 거의 없고, 만약 그랬다면, 백도어를 만드는 것보다 컴파일에서 실패할 것입니다.

### :heavy_check_mark: [초기화되지 않은 저장소 포인터들](https://github.com/sigp/solidity-security-blog#storage) {#heavy_check_mark-uninitialised-storage-pointers}

CosmWasm은 변수를 자동으로 채우지 않으므로, 저장소에서 명시적으로 로드를 해야합니다. 그리고 rust는 어디든 초기화되지 않은 변수를 허용하지 않습니다(`unsafe` 블록들을 작성하고, 초기화되지 않은 메모리에 접근하는 특별한 호출을 만들지 않는 한 말입니다.. 그러나 이 방법은 위험을 불러올 수 있습니다). 스토리지를 암시적으로 만들지 않고 명시적으로 만드는 것이 이러한 실패 유형을 없앨 수 있습니다.

### :heavy_check_mark: [부동 소수점 및 정밀도](https://github.com/sigp/solidity-security-blog#precision) {#heavy_check_mark-floating-points-and-precision}

Solidity와 CosmWasm 모두 부동 소수점 연산을 지원하지 않는데, 반올림을 할 때 비결정적일 수 있기 때문입니다(CPU에 따라 달라짐). Solidity 정수 연산을 할 대안이 없고, 소숫점에 대한 근사치를 제공하는 개발된 많은 코드들은 반올림 에러를 만들 수 있을겁니다.

CosmWasm에서는 어떤 rust 패키지도 가져올 수 있고, 적절한 패키지를 택해 내부적으로 사용하면 됩니다. "반올림 에러 없는 많은 정수 및 소수 자릿수를 요구하는 재무 계산에 적합하고, 순수 Rust로 쓰여진 소숫점 구현."인 [rust_decimal](https://docs.rs/rust_decimal/1.0.3/rust_decimal/)와 같은 것 말입니다. 아니면 고정 소숫점 연산을 제공하는 [fixed](https://docs.rs/fixed/0.5.0/fixed/)를 사용할 수도 있습니다. fixed는 최대 128 bit를 지원하며, 이는 소숫점 이전과 이후 각각 18자리까지 쓸 수 있어, 어떠한 사용에도 충분할 것입니다.

### :heavy_check_mark: [Tx.Origin 인증](https://github.com/sigp/solidity-security-blog#tx-origin) {#heavy_check_mark-txorigin-authentication}

CosmWasm은 `tx.origin`을 노출하지 않고, 컨트랙트를 직접 호출하는 컨트랙트 또는 사용자를 `params.message.signer`로 노출합니다. 따라서 비교할 값이 오직 하나이므로, 잘못된 인증에 의존이 불가능합니다.
