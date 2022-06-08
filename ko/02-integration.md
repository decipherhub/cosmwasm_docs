---
sidebar_position: '5'
---

# 통합(Integration)

앱에서 Wasm을 사용하려면 다음과 같이 빠르고 쉽게 작업할 수 있습니다. 먼저 전제 조건이 맞는지 확인한 다음 아래 설명된 대로 `x/wasm` 모듈을 통합하고 마지막으로 사용자 정의 메시지와 쿼리를 사용자 정의 Go/SDK 모듈에 추가하여 체인별 컨트랙트에 제공 할 수 있습니다.

## 전제 조건

`x/wasm` 을 사용자 정의 앱에 통합하기 위한 전제 조건은 호환 가능한 Cosmos SDK 버전을 사용하고 실행되는 하드웨어에 대한 몇 가지 제한을 수용하는 것입니다.

wasmd | Cosmos SDK
:-: | :-:
v0.22 | v0.45.0
v0.21 | v0.42.x
v0.20 | v0.42.x
v0.19 | v0.42.x
v0.18 | v0.42.x
v0.17 | v0.42.x
v0.16 | v0.42.x
v0.15 | v0.41.x
v0.14 | v0.40.x
v0.13 | v0.40.0-rc3
v0.12 | v0.40.0-rc3
v0.11 | v0.39.1
v0.10 | v0.39.1
v0.9 | v0.38.3
v0.8 | v0.38.3
v0.7 | v0.38.3

현재는 Intel/AMD64 CPU와 OSX 또는 Linux만 지원합니다. Linux의 경우 표준 빌드 명령은 `glibc` 시스템(Ubuntu, Debian, CentOS 등)에서 작동합니다. 알파인과 같은 `muslc` 기반 시스템용으로 컴파일하려면 정적 라이브러리 wasmvm을 로컬에서 컴파일하고 `muslc` 빌드 태그와 함께 go를 컴파일해야 합니다. 아니면 알파인 시스템에서 정적 이동 바이너리를 빌드하는 [Dockerfile](./Dockerfile) 을 사용해야 합니다.

이 제한은 [`wasmvm`](https://github.com/CosmWasm/wasmvm)에서 wasm 코드를 실행하는 데 사용하는 Rust dll에서 비롯됩니다. [ARM 지원](https://github.com/CosmWasm/wasmvm/issues/53) 추가 및 [Windows 지원](https://github.com/CosmWasm/wasmvm/issues/28) 추가에 대한 미해결 문제가 있습니다. 그러나 이러한 문제는 직접 해결하지 않는다면 로드맵에서 우선순위가 높지 않으므로 현재는 제한 사항을 고려해야 합니다.

## 빠른 시작

CosmWasm을 테스트해보는 가장 간단한 방법은 바로 `wasmd` 를 실행하고 사용자 정의 컨트랙트 작성, 업로드 및 사용하는 데 집중하는 것입니다. 이런 방식을 사용하면 해볼 수 있는 것도 많고, 많이 배울 수도 있습니다.

위 설명처럼 하기 위해 커스텀 Cosmos SDK 앱을 사용하고 싶다면 *가장 추천하는 방법은* 간단히 `wasmd`를 포크하는 것 입니다. 아래 설명하는 방법 중 하나를 시도해 보세요.

## wasmd 통합

### 외부 모듈로서 통합

`wasmd` 를 사용하는 가장 간단한 방법은 `x/wasm` 을 가져와서 `app.go` 에 연결하는 것입니다. 이렇게 하면 전체 모듈과 같이 실행되는 사용자 지정 모듈에 접근할 수 있습니다. (현재는 CosmWasm 컨트랙트는 `bank` 및 `staking` 에만 접근할 수 있습니다... 아래에서 [사용자 정의](#Adding-Custom-Hooks) 에 대해 자세히 설명합니다.)

이를 위한 요구 사항은 Cosmos SDK에서 표준 SDK 모듈을 가져와서 `app.go` 에서 활성화해야 한다는 것입니다. 이 방법은 [`wasmd/app/app.go`](https://github.com/CosmWasm/wasmd/blob/master/app/app.go#) 에서 확인할 수 있습니다( `wasm` 이 있는 줄만 검색하면 됩니다).

또한 `wasmd` 는 블록의 TX 위치를 컨텍스트에 추가하고 이를 컨트랙트에 전달하는 커스텀 `ante handler` 와 함께 제공됩니다. 이 기능을 지원하려면 <a><code>app/ante.go</code></a> 에서와 같이 `ante handler chain` 에 custom ante handler를 추가해야 합니다.

### 앱에 복사하여 통합

그러나 때로는 `x/wasm` 을 앱에 복사해야 합니다. 이것은 제한된 경우에 해야 하며 업그레이드가 더 어려워지므로 가능하면 위의 방법을 따르는 것이 좋습니다. 앱에서 일부 주요 SDK 모듈을 비활성화한 경우(예: 스테이킹이 아닌 PoA를 사용하고 이러한 콜백 및 기능 지원을 비활성화 함), 혹은 Cosmos SDK에서 코어 `x/*` 모듈을 어플리케이션에 복사하고 커스터마이즈한 경우에 이 방법이 필요합니다.

두 경우 모두 가장 좋은 방법은 최신 릴리스의 `x/wasm` 모듈을 애플리케이션으로 복사하는 것입니다. 여기서 우리의 목표는 복사한 모듈에서 **최소한의 변경**만 하고 오히려 별도의 모듈에서 사용자 정의를 추가하는 것입니다. 이는 향후 모든 `wasmd` 릴리스에서 업스트림에서 `x/wasm` 을 복사하고 사용자 정의 기능을 추가해야 하기 때문에 가능한 간단해야 합니다.

예를 들어 표준 SDK 라이브러리를 포크한 경우 imports를 변경하기만 하면 됩니다(예: `github.com/cosmos/cosmos-sdk/x/bank` 에서 `github.com/YOUR/APP/x/bank` 로). 그리고 다른 API로 인해 컴파일러 오류가 있는 경우 호출을 수정합니다(통화에 Int가 아닌 Decimals를 사용한 경우).

이 작업이 끝나면 모든 사용자 지정 논리와 함께 응용 프로그램에서 표준 CosmWasm 컨트랙트를 실행할 수 있어야 합니다.

## 사용자 정의 훅 추가

위 통합 방법이 잘 작동하고 제공하는 유연성에 만족하고 나면 사용자 지정 SDK 모듈과의 더 긴밀한 통합 방법을 원할 수 있습니다. 예를 들면 이런 상황입니다. "내 네이티브 토큰의 본딩 커브가 있는 사용자 지정 토큰을 갖는 것은 확실히 좋지만 내가 Go 모듈로 작성한 교환 기능으로 이를 거래하고 싶습니다. 또는 토큰을 교환할 때 선택지를 추가하고 싶습니다."

이를 위해서는 더 깊이 파고들어 CosmWasm 또는 `wasmd` 를 포크하지 않고 이 기능을 추가할 수 있는 방법을 확인해야 합니다.

### 네이티브 코드에서 컨트랙트 호출

아마도 이 부분이 가장 쉬울 것입니다. 기본 교환(exchange) 모듈이 CosmWasm 모듈로 작동하는 토큰을 호출하려고 한다고 가정해 보겠습니다. `wasm.Keeper` 를 `exchange.Keeper` 에 전달해야 합니다. 메시지를 보내는 형식을 알고 있고 컨트랙트를 쿼리하는 형식(각 컨트랙트에서 json 스키마로 내보냄)을 알고 있으며, 지원되는 토큰 컨트랙트 주소들을 구성하는 방법이 있는 경우 교환 코드는 자금을 이동시키기 위해 적절한 형식의 메시지와 함께 간단히 `wasm.Keeper.Execute` 를 호출하거나 `wasm.Keeper.SmartQuery` 를 사용하여 잔액을 확인할 수 있습니다.

[`x/wasm/keeper`](https://github.com/CosmWasm/wasmd/tree/master/x/wasm/keeper) 의 단위 테스트를 보면 꽤 간단합니다.

### 컨트랙트 인터페이스 확장

컨트랙트가 기본 모듈에 접근할 수 있도록 하려면 첫 번째 단계로 사용하려는 메시지 및 쿼리 집합을 정의한 다음 `CosmosMsg::Custom` 및 `QueryRequest::Custom` variants로 추가해야 합니다. 예시로 [Terra의 바인딩](https://github.com/CosmWasm/terra-contracts/tree/master/packages/bindings) 를 확인할 수 있습니다.

이러한 바인딩은 [많은 API를 사용하는 간단한 접점](https://github.com/CosmWasm/terra-contracts/tree/master/contracts/maker)을 만드는데 사용합니다. 세부 사항에 대해 너무 걱정하지 않아도 됩니다. 쓸모 있긴 하지만, 주로 체인에 업로드하고 네이티브 Cosmos SDK 모듈과의 통합 테스트에 사용될 것입니다. 일단 간단한 기능들이 완성되면 점점 더 복잡한 컨트랙트를 추가하면 좋습니다.

 컨트랙트를 단위 테스트할 때 네이티브 모듈의 기능에 대한 모의 객체를 제공할 수 있도록 `mocks` 패키지를 추가하고 싶을 수 있습니다(예를 들면 컨트랙트가 쿼리할 때 변환 비율에 대한 정적 데이터 제공). [Terra 계약에 대한 모의 객체(mocks)](https://github.com/CosmWasm/terra-contracts/tree/master/packages/mocks) 예제를 볼 수 있습니다.

이 세 단계가 제공하는 것은 기본적으로 CosmWasm 컨트랙트 SDK에 대한 체인에 특화된 확장입니다. 모든 CosmWasm 컨트랙트 라이브러리(바인딩 및 모의 객체)를 가져올 수 있으며 표준 CosmWasm 인터페이스를 사용하는 것처럼 쉽게 사용자 지정 체인에 특화된 확장을 쉽게 사용할 수 있습니다. 남은 것은 실제로 원하는 대로 동작하도록 체인에 연결하는 것입니다.

지원되지 않는 체인에서 계약을 실행하는 것을 막기 위해서 `bindings` 라이브러리에 `requires_XYZ` 지시문을 포함하고 싶을 수 있습니다(여기서 XYZ는 자신의 프로젝트 이름입니다). 이는 `XYZ` 확장에 대한 지원을 명시적으로 선언한 블록체인 앱만 컨트랙트를 업로드 할 수 있으며, 실행 중에 치명적인 기능을 확인하는 것이 아니라 업로드 중에 에러 메세지를 받을 수 있게합니다. 당신의 <code>bindings</code> 라이브러리를 가져오는 모든 컨트랙트에 요구 사항을 추가하려면 바인딩 라이브러리에 <a>이와 같은 줄을 추가하기</a> 만 하면 됩니다.

### SDK 호출

설명하기 전에 주의사항으로, `x/wasm`을 복사했다면, <strong data-md-type="double_emphasis">아래 변경을 `x/wasm`에 적용하면 안됩니다</strong> .

새 모듈을 추가할 때, 예를 들어 `x/contracts`을 보면, 이 모듈에는 CosmWasm 컨트랙트와 당신의 네이티브 모듈 간의 사용자 지정 바인딩이 포함됩니다. 그리고 사용할 수 있는 두 개의 진입점이 있습니다. 첫 번째는 사용자 정의 쿼리를 처리할 수 있는 [`CustomQuerier`](https://github.com/CosmWasm/wasmd/blob/v0.8.0-rc1/x/wasm/internal/keeper/query_plugins.go#L35) 입니다. 두 번째는 [`CustomEncoder`](https://github.com/CosmWasm/wasmd/blob/v0.8.0-rc1/x/wasm/internal/keeper/handler_plugin.go#L30)로서 `CosmosMsg::Custom(YourMessage)` 타입을 `[]sdk.Msg` 로 변환할 수 있습니다.

이들에 대한 스텁을 작성하는 것은 꽤 간단합니다. `reflect_test.go` 파일을 보면 동작하는 것을 볼 수 있습니다. 특히 여기에서는 [`CustomQuerier` 를 정의](https://github.com/CosmWasm/wasmd/blob/v0.8.0-rc1/x/wasm/internal/keeper/reflect_test.go#L355-L385) 하고 여기에서는 [`CustomHandler` 를 정의합니다](https://github.com/CosmWasm/wasmd/blob/v0.8.0-rc1/x/wasm/internal/keeper/reflect_test.go#L303-L353) . 이 코드는 Rust의 사용자 정의 유형에서 직렬화된 raw 바이트에서 `json.RawMessage` 를 가져와 Go 구조체로 파싱합니다. 그런 다음 이러한 go 구조체를 가져와서 사용자 지정 SDK 모듈에 맞게 적절하게 변환합니다.

클로저를 통해 `Keeper` 를 전달하는 것을 포함한 중요한 경우 `staking` 모듈을 빌드하는 방법을 보고 싶다면, 구현을 볼 수 있습니다. 여기에서 우리는 [스테이킹 메시지를 인코딩합니다](https://github.com/CosmWasm/wasmd/blob/v0.8.0-rc1/x/wasm/internal/keeper/handler_plugin.go#L114-L192) . 철회는 2개의 메시지를 반환하며, 이는 필요한 경우 기본 메시지로 번역하는 데 사용할 수 있는 옵션입니다. [스테이킹 쿼리](https://github.com/CosmWasm/wasmd/blob/v0.8.0-rc1/x/wasm/internal/keeper/query_plugins.go#L109-L172)를 처리할 때 `Keeper in the closure` 가져오고 컨트랙트에서 기본 `Keeper` 인터페이스로 사용자 지정 `QueryRequest` 를 전달한 다음 응답을 인코딩합니다. Rust 컨트랙트에서 적절한 파싱을 위해 반환 유형을 정의할 때, JSON 필드의 이름을 올바르게 지정하고 Rust가 `Option<T>` 를 예상하는 경우 `omitempty` 키워드를 사용해야 합니다. 또한 Rust `enum` 에 해당하는 모든 필드에 대해 `omitempty` 및 포인터를 사용하기 때문에 정확히 하나의 필드로 직렬화됩니다.

### 다 같이 연결하기

모듈에 대한 사용자 정의 콜백을 작성하고 테스트한 후에는 애플리케이션에서 활성화해야 합니다. 첫 번째 단계는 사용자 지정 SDK로 컴파일된 컨트랙트로 통합 테스트를 작성하여 제대로 작동하는지 확인한 다음 `app.go` 에 설정합니다.

테스트 케이스의 경우 사용자 정의 이름을 포함하도록 확인하는 [지원기능을 정의](https://github.com/CosmWasm/wasmd/blob/ade03a1d39a9b8882e9a1ce80572d39d57bb9bc3/x/wasm/internal/keeper/reflect_test.go#L52) 해야 합니다(위의 `requires_XYZ`를 의미). 그런 다음 `TestInput` 을 생성할 때 [사용자 지정 인코더와 쿼리자를 전달할](https://github.com/CosmWasm/wasmd/blob/ade03a1d39a9b8882e9a1ce80572d39d57bb9bc3/x/wasm/internal/keeper/reflect_test.go#L52) 수 있습니다. 컴파일된 컨트랙트로 몇 가지 테스트를 실행하고 대부분의 인터페이스를 이상적으로 실행하여 컨트랙트와 SDK 간의 모든 파싱이 제대로 구현되었는지 확인해야합니다.

테스트하고 결과에 만족하면 `app.go` 에 연결할 수 있습니다. 적절한 <code>supportedFeatures</code> 기능을 갖도록 <a>기본 `NewKeeper` 생성자를 편집하고</a> 'NewKeeper'에 대한 마지막 두 인자로 `CustomEncoder` 및 `CustomQuerier` 를 전달해야 합니다. 이제 체인을 컴파일하고 사용자 정의 컨트랙트를 업로드할 수 있습니다.
