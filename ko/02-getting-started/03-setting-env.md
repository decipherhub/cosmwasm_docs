---
sidebar_position: '3'
---

# 환경 설정

컨트랙트를 실행해 볼 수 있는 환경이 필요할 것입니다. 자체 로컬 노드를 구동하거나 기존 네트워크에 연결할 수도 있습니다. 편리한 테스트를 위해서 테스트넷으로 cliffnet을 사용할 수 있습니다. 이를 사용해 여러분의 컨트랙트를 배포하고 실행해 볼 수 있습니다.

테스트넷이 현재 동작하고 있는지를 확인하기 위해 아래 URL들에 접속 가능한 상태인지 확인하세요.

- [https://rpc.cliffnet.cosmwasm.com/status](https://rpc.cliffnet.cosmwasm.com/status)
- [https://faucet.cliffnet.cosmwasm.com/status](https://faucet.cliffnet.cosmwasm.com/status)
- [https://lcd.cliffnet.cosmwasm.com/node_info](https://lcd.cliffnet.cosmwasm.com/node_info)

우리는 두가지의 네이티브 토큰을 설정했습니다. - 검증자가 되기 위한 토큰 `ROCK` (`urock`)과 수수료 지불을 위한 토큰 `PEBBLE` (`upebble`). 사용 가능한 프런트 엔드는 다음과 같습니다:

- Big Dipper Block Explorer: [https://block-explorer.cliffnet.cosmwasm.com](https://block-explorer.cliffnet.cosmwasm.com)

이 블록 탐색기를 사용하면 트랜잭션, 주소, 검증자, 컨트랙트들을 확인할 수 있습니다. 우리의 rpc/lcd 서버를 사용해 자유롭게 배포하면 리스팅해 드리겠습니다.

이 네트워크와 상호 작용 하기 위해 Go 클라이언트인 `wasmd` 또는 Node REPL을 사용할 수 있습니다. JSON을 다루는 것이 Shell/Go 클라이언트에서 직관적이지 않기 때문에 Node REPL이 컨트랙트 작업에 권장됩니다.

## Go CLI 설치하기 {#setup-go-cli}

`wasmd` 실행 환경을 구성하고, 테스트넷을 바라보게끔 설정하고, 지갑을 만들고 faucet을 통해 토큰을 요청합니다:

먼저 shell에서 **cliffnet** 네트워크 설정을 소스합니다.

```shell
source <(curl -sSL https://raw.githubusercontent.com/CosmWasm/testnets/master/cliffnet-1/defaults.env)
```

클라이언트를 설정합니다:

```shell
# 테르트를 위한 지갑 추가
wasmd keys add wallet

wasmd keys add wallet2
```

:::정보

위의 명령을 실행하면 wasmd는 해당 지갑과 관련된 모든 정보를 YAML(.yml) 형식으로 표시합니다.

```
- name: wallet
  type: local
  address: wasm1evvnsrte3rdghy506vu4c87x0s5wx0hpppqdd6
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A2aKoMPLbUnXkN2zJF/q4lIH/34ybelQSRTg3d9Js86T"}'
  mnemonic: ""


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

table shell potato spike paddle very asthma raise glare noodle vibrant chuckle indicate spell perfect craft step net radio yellow minor deal blur hybrid
```

:::

상호작용을 위해서는 주소에 약간의 토큰이 필요합니다. 만약 로컬 노드를 사용하는 중이라면 이 단계는 건너 뛰어도 좋습니다. faucet을 통해 토큰을 요청하세요:

```shell
JSON=$(jq -n --arg addr $(wasmd keys show -a wallet) '{"denom":"upebble","address":$addr}') && curl -X POST --header "Content-Type: application/json" --data "$JSON" https://faucet.cliffnet.cosmwasm.com/credit
JSON=$(jq -n --arg addr $(wasmd keys show -a wallet2) '{"denom":"upebble","address":$addr}') && curl -X POST --header "Content-Type: application/json" --data "$JSON" https://faucet.cliffnet.cosmwasm.com/credit
```

## wasmd 파라미터 설정하기 {#export-wasmd-parameters}

클라이언트로 wasmd를 사용하는 경우 아래와같이 환경변수를 설정하는 것이 좋습니다. 그렇지 않으면 실행하는 모든 명령 마다 노드, 체인 ID 및 가스 가격 상세 정보를 정의해야 합니다. 이 튜토리얼에서는 다음과 같은 변수를 사용할 것입니다. 계속 진행하기 전에 아래와 같이 환경변수를 설정하세요.

```bash
# bash
export NODE="--node $RPC"
export TXFLAG="${NODE} --chain-id ${CHAIN_ID} --gas-prices 0.025upebble --gas auto --gas-adjustment 1.3"

# zsh
export NODE=(--node $RPC)
export TXFLAG=($NODE --chain-id $CHAIN_ID --gas-prices 0.025upebble --gas auto --gas-adjustment 1.3)
```

위 명령어 중 하나라도 실패한다면 여러분의 shell 환경이 다르기 때문입니다. 명령어가 성공적으로 실행 되었다면 다음을 실행하세요:

```bash
wasmd query bank total $NODE
```

표준 CLI 도구 외에도 Node.js와 최신 브라우저를 지원하는 유연한 TypeScript 라이브러리인 [CosmJS](https://github.com/CosmWasm/cosmjs) 도 제공합니다. 이를 사용해 쿼리 및 트랜잭션 제출을 처리할 수 있습니다. 이 라이브러리와 함께 우리는 강력한 Node 콘솔인 [@cosmjs/cli](https://www.npmjs.com/package/@cosmjs/cli) 를 만들었습니다. `await` 를 지원하고 유용한 오류 메시지들에 대한 유형 검사를 수행하며 여러 CosmJS 유틸리티를 미리 로드합니다. 여러분이 Node 콘솔에 익숙하다면 CLI 도구보다 쉽고 강력하다는 것을 확인할 수 있을 것입니다.

REPL 사용하기:

```js
// 계정 생성 혹은 불러오기
const mnemonic = loadOrCreateMnemonic('fred.key')
mnemonicToAddress(mnemonic)

const {address, client} = await connect(mnemonic, {})
address

client.getAccount()
// 만약 비어있다면 - 이는 Cosmwasm에서만 동작합니다.
hitFaucet(defaultFaucetUrl, address, 'PEBBLE')
client.getAccount()
```
