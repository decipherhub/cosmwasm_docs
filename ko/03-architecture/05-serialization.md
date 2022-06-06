---
title: 직렬화
sidebar_position: '5'
---

# 직렬화 형식

잘 설계된 보안 외에 CosmWasm을 개발하는 원동력 중 하나는 훌륭한 개발자 UX를 가진 것이었습니다 . 블록체인으로 전송된 메시지를 검사 및 디버깅하고, 복잡한 라이브러리 없이 결과를 파싱하는 기능이 핵심입니다. 또한 메소드 호출을 위해 커스텀 스키마나 ABI를 다운로드를 할 필요가 없습니다.

## JSON {#json}

모든 곳에 JSON을 사용하는 것은 흔한 방법입니다. JSON은 자기 설명이 가능하고, 사람이 읽을 수 있으며, 모든 곳에서 API로 사용될 수 있습니다. 다만 몇 가지 단점들이 있는데, 2^53 이상의 수는 문자열로만 처리를 해야하고, base64 인코딩 바이너리와 문자열 간 뚜렷한 구별이 없으며, 하드 코딩된 스키마가 없습니다. 우리는 지원되는 API를 검사하고 클라이언트 측에서 메시지를 자동 검사할 때 사용할 수 있는 [JSON 스키마](https://json-schema.org/) 디스크립터를 [컨트랙트의 퍼블릭 API](https://github.com/CosmWasm/cw-examples/tree/main/contracts/escrow/schema)을 위해 자동 생성합니다.

이를 사용해서 개발과 디버깅을 할 때 피드백은 긍정적이었고, 이를 통해 우리는 개발자 UX에 충분히 만족할 수 있었습니다. 생산성에 메시지 크기나 자유 형식의 스키마가 문제가 될 지 얘기하는 것은 아직 이릅니다. 다만 컨트랙트가 자신의 메세지에 대한 파싱 로직을 정의하고, 프레임워크가 강제하지 않는 것을 참고하세요. 우리는 json에 [`cosmwasm::serde`](https://github.com/CosmWasm/serde-json-wasm) 와 [`cw-template`](https://github.com/CosmWasm/cw-template)을 통해 지원을 해주고 있지만, 어느 누구나 클라이언트의 형식에 대한 지원을 해주면 바꿔 사용할 수 있습니다.

이는 클라이언트 개발을 지원하기 위해 일관성을 유지하게 할 뿐만 아니라 컨트랙트간 호출도 도움이 될 것입니다.

## Protobuf {#protobuf}

Protobuf는 잘 알려져있고 널리 지원되는 바이너리 포맷입니다. JSON보다 더 엄격한 스키마 보장과 더 압축된 포맷을 제공합니다. Protocol Buffers와 GRPC지원은 Cosmos SDK v0.39.0 업그레이드에서 추가되었습니다..

## Cap'n Proto {#capn-proto}

[Cap'n Proto](https://capnproto.org/)는 매우 마른 인코딩 포맷으로 제로 카피 읽기를 지원하고 파싱이 필요가 없습니다. 이는 추가적으로 [CosmWasm에서 사용할 수 있도록 제안](https://github.com/CosmWasm/cosmwasm/issues/78)되었습니다. 이는 효율성이나 엄격한 스키마를 원하는 컨트랙트를 위한 포맷이나 내부 데이터 구조(`Params`)을 인코딩하는데 사용될 수 있습니다.

## 크레딧 {#credits}

모든 메세지에 대해 보편적이고 사람이 읽을 수 있는 형식을 주장한 [Jehan Tremback](https://github.com/jtremback)에게 감사를 표합니다.
