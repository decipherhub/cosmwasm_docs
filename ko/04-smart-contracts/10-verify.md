---
sidebar_position: '10'
---

# 스마트 컨트랙트 검증하기

스마트 컨트랙트의 검증은 올바른 컨트랙트를 실행하고 있는지 확인할 수 있는 중요한 과정입니다. 스마트 컨트랙트의 검증은 체인상에서 진행됩니다.

실제 사례들을 살펴보도록 하겠습니다. 체인상에 작동하는 컨트랙트가 하나 있으며, 이 컨트랙트의 코드 이름과 버전을 확인하고 싶다고 가정해보겠습니다.

## 코드를 살펴보기

살펴보고자 하는 컨트랙트의 주소는`juno1unclk8rny4s8he4v2j826rattnc7qhmhwlv3wm9qlc2gamhad0usxl7jnd` 이며 juno uni testing 네트워크에 존재합니다.

[CW2 Spec](cw-plus/cw2/spec)은 상태로 저장될 컨트랙트의 정보를 결정합니다. 컨트랙트의 정보는 아래의 커맨드를 통해 쿼리할 수 있습니다.

```shell
junod query wasm contract-state raw juno1unclk8rny4s8he4v2j826rattnc7qhmhwlv3wm9qlc2gamhad0usxl7jnd 636F6E74726163745F696E666F --node $RPC --output json | jq  -r .data | base64 -d | jq
{
  "contract": "crates.io:cw20-base",
  "version": "0.10.3"
}
```

위 쿼리의 결과로 이 컨트랙트가 cw20-base 이며 `0.10.3` 버전임을 알 수 있습니다.

해시가 필요하므로 코드 ID가 필요합니다. 코드 ID를 확인할 수 있는 방법은 다음과 같습니다.

```shell
junod query wasm contract juno1unclk8rny4s8he4v2j826rattnc7qhmhwlv3wm9qlc2gamhad0usxl7jnd  --node $RPC --output json  | jq
{
  "address": "juno1unclk8rny4s8he4v2j826rattnc7qhmhwlv3wm9qlc2gamhad0usxl7jnd",
  "contract_info": {
    "code_id": "122",
    "creator": "juno1d3axtckm7f777vlu5v8dy8dsd6fefhhnmsrrps",
    "admin": "",
    "label": "Hidden",
    "created": null,
    "ibc_port_id": "",
    "extension": null
  }
}
```

훌륭합니다. 위 쿼리를 통해 code_id, creator address, admin 그리고 label 의 정보까지 알게 되었습니다.

위 정보들을 통해 실제로 입력할 코드는 다음과 같습니다.

```shell
junod query wasm code 122 122_code.wasm --node $RPC
Downloading wasm code to 122_code.wasm
```

해시를 알아내는 법은 다음과 같습니다.

```shell
sha256sum 122_code.wasm
46bd624fff7f11967aac6ddaecf29201d1897be5216335ccddb659be5b524c52  122_code.wasm
```

위를 통해 알게된 해시는`46bd624fff7f11967aac6ddaecf29201d1897be5216335ccddb659be5b524c52` 입니다.

## 실제 코드로 확인하기

코드의 제공자가 게시한 경우 레포지토리에서 해시를 찾을 수 있습니다. cw-plus 스마트 컨트랙트의 해시는 [cw-plus](https://github.com/CosmWasm/cw-plus/releases) 에서 스마트 컨트랙트 코드와 함께 확인할 수 있습니다.

`checksums.txt`에서 해시값을 확인할 수 있습니다.

한가지 예시를 들어보겠습니다.

```
fe34cfff1cbc24594740164abb953f87735afcdecbe8cf79a70310e36fc13aa0  cw1155_base.wasm
de49426e9deed6acf23d5e930a81241697b77b18131c9aea5c3ca800c028459e  cw1_subkeys.wasm
c424b66e7f289cef69e1408ec18732e034b0604e4b22bfcca7546cc9d57875e3  cw1_whitelist.wasm
e462d44a086a936c681f3b3389d50b8404ce2152c8f0fb32b257064576210c03  cw1_whitelist_ng.wasm
0b2e5d5dc895f8f49f833b076a919774bb5b0d25bf72819e9a1cbdf70f9bf79b  cw20_atomic_swap.wasm
6c1fa5872e1db821ee207b5043d679ad1f57c40032d2fd01834cd04d0f3dbafb  cw20_base.wasm
f00759aa9a221efeb58b61a1a1d4cc4281cdce39d71ac4d8d78d234f03b3b0eb  cw20_bonding.wasm
b6041789cc227472c801763c3fab57a81005fb0c30cf986185aba5e0b429d2e6  cw20_escrow.wasm
91b35168d761de9b0372668dd8fa8491f2c8faedf95da602647f4bade7cb9f57  cw20_ics20.wasm
d408a2195df29379b14c11277f785b5d3f57b71886b0f72e0c90b4e84c2baa4a  cw20_merkle_airdrop.wasm
934ba53242e158910a2528eb6c6b82deb95fe866bbc32a8c9afa7b97cfcb9af4  cw20_staking.wasm
ac1f2327f3c80f897110f0fca0369c7022586e109f856016aef91f3cd1f417c1  cw3_fixed_multisig.wasm
785340c9eff28e0faeb77df8cca0fafee6b93a1fa033d41bda4074cd97600ec1  cw3_flex_multisig.wasm
87b3ad1dee979afc70e5c0f19e8510d9dcc8372c8ef49fc1da76725cad706975  cw4_group.wasm
4651e90405917897f48d929198278f238ec182ac018c414ee22f2a007a052c1e  cw4_stake.wasm
```

### 혼자 컴파일해보기

`0.10.3`와 같은 마이너 릴리스 버전은 깃허브에서 코드 해시가 제공되어 있지 않을 수도 있습니다.

직접 만들어 봅시다.

[rust-optimizer](https://github.com/CosmWasm/rust-optimizer)의 사용은 효율적이고 사이즈가 작은 코드를 만드는 것에 더해, 비교할 수 있는 결정적인 결과를 만들어 내기 때문이기도 합니다. 위의 예시에서 확인한 해시들은 전부 rust-optimizer의 결과값입니다.

```shell
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.12.4
```

해시는 `./artifacts/checksums.txt`에 저장됩니다.

:::warning Apple M1 chip에서 더욱 빠르게 작동하는 [rust-optimizer-arm64](https://hub.docker.com/r/cosmwasm/rust-optimizer-arm64) docker builder image가 있습니다. Arm 이미지는 Mac M1 기기에서의 개발과 테스트의 용이함을 위한 릴리스입니다. 네이티브 Arm 버전은 Intel 버전과는 다른 wasm artifacts 를 만들어냅니다. 릴리스와 배포 목적이라면, 반드시 Intel optimizer에서 만들어낸 컨트랙트만을 사용해야 합니다. :::

위에서 찾은 해시값과 결과로 도출한 값을 비교할 수 있습니다.

```shell
cat ./artifacts/checksums.txt | grep cw20_base.wasm
46bd624fff7f11967aac6ddaecf29201d1897be5216335ccddb659be5b524c52  cw20_base.wasm
```

```shell
diff  <(echo "46bd624fff7f11967aac6ddaecf29201d1897be5216335ccddb659be5b524c52" ) <(echo "46bd624fff7f11967aac6ddaecf29201d1897be5216335ccddb659be5b524c52")
```

해시값이 동일한 것을 확인했으니 컨트랙트 verify가 끝이 났습니다.

## 결론

위의 자료를 통해 verification에 대한 명확한 개념을 잡을 수 있습니다. 위의 과정은 CosmJS를 비롯한 다른 언어에서도 쉽게 구현할 수 있습니다.
