---
sidebar_position: '12'
---

# Code Pinning

**Code Pinning** 메커니즘을 사용하면 코드를 메모리에 고정할 수 있습니다.

이렇게 하면 코드를 실행할 때마다 메모리에 로드할 필요가 없으므로 **~x40 성능 향상을** 얻을 수 있습니다.

이것은 추정치이며 벤치마킹이 필요합니다.

코드 피닝은 기본 체인 거버넌스를 통해 실행됩니다.

## Proposal

### *PinCodesProposal*

```gogoproto
// wasmvm cache에 일련의 code id를 고정하기 위한
// PinCodesProposal 가버넌스 프로포절 구성 양식
message PinCodesProposal {
  // Title은 짧은 요약입니다
  string title = 1 [ (gogoproto.moretags) = "yaml:\"title\"" ];
  // Description은 human readable 한 text 형식입니다
  string description = 2 [ (gogoproto.moretags) = "yaml:\"description\"" ];
  // CodeIDs는 새 WASM 코드를 참조합니다
  repeated uint64 code_ids = 3 [
    (gogoproto.customname) = "CodeIDs",
    (gogoproto.moretags) = "yaml:\"code_ids\""
  ];
}
```

[*reference*](https://github.com/CosmWasm/wasmd/blob/v0.23.0/proto/cosmwasm/wasm/v1/proposal.proto#L126-L136)

클라이언트를 통해 프로포절을 생성할 수 있습니다.

```shell
wasmd tx gov submit-proposal pin-codes 1 --from wallet --title "Pin code 1" --description "Pin code 1 plss"
```

### *UnpinCodesProposal*

코드 고정 해제하기:

```gogoproto
// wasmvm cache에 일련의 code id를 고정 해제하기 위한
// UnpinCodesProposal 가버넌스 프로포절 구성 양식
message UnpinCodesProposal {
  // Title은 짧은 요약입니다
  string title = 1 [ (gogoproto.moretags) = "yaml:\"title\"" ];
  // Description은 human readable 한 text 형식입니다
  string description = 2 [ (gogoproto.moretags) = "yaml:\"description\"" ];
  // CodeIDs는 새 WASM 코드를 참조합니다
  repeated uint64 code_ids = 3 [
    (gogoproto.customname) = "CodeIDs",
    (gogoproto.moretags) = "yaml:\"code_ids\""
  ];
}
```

[*reference*](https://github.com/CosmWasm/wasmd/blob/v0.23.0/proto/cosmwasm/wasm/v1/proposal.proto#L138-L150)

```shell
 wasmd tx gov submit-proposal unpin-codes 1 --title "Unpin code 1" --description "Unpin code 1 plss" --from wallet
```
