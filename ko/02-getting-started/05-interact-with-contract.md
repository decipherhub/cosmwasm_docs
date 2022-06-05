---
sidebar_position: '5'
---

# 업로드 및 상호 작용

실행 파일이 준비되었습니다. 이제 wasm action을 볼 것입니다. [Go CLI](https://github.com/urfave/cli) 또는 [Node Console](#node-console)을 사용하셔도 좋습니다.

## Go CLI {#go-cli}

우리는 이전 장에서 실행 가능한 wasm 실행 파일을 생성했습니다. 이 장에서는 블록체인에 코드를 업로드합니다. 이 작업을 완료하면 바이트코드를 다운로드하여 확인할 수 있습니다.

```shell
# 이제 많은 코드를 가지고 있습니다
wasmd query wasm list-code $NODE

# 바이트 코드를 체인 상에 저장할 것입니다
# wasm 크기 때문에 가스비가 많이 듭니다... 하지만 auto-zipping은 가스비를 1.8M에서 600k 정도까지 줄여줍니다
# 결과에서 코드를 확인할 수 있습니다
RES=$(wasmd tx wasm store artifacts/cw_nameservice.wasm --from wallet $TXFLAG -y --output json -b block)

# 또한 이런 방식으로 코드를 얻을 수 있습니다
CODE_ID=$(echo $RES | jq -r '.logs[0].events[-1].attributes[0].value')

# 아직 컨트랙트가 없으므로
wasmd query wasm list-contract-by-code $CODE_ID $NODE --output json

# 체인으로부터 wasm을 다운로드하여 다른점이 있는지 확인할 수도 있습니다.
wasmd query wasm code $CODE_ID $NODE download.wasm
diff artifacts/cw_nameservice.wasm download.wasm
```

### 계약 인스턴스화 {#instantiating-the-contract}

이제 wasm 컨트랙트의 인스턴스를 생성할 수 있습니다. 여기에서 먼저 컨트랙트를 인스턴스화하고 이에 대한 쿼리 작업을 수행합니다.

```shell
# 컨트랙트 인스턴스화 및 확인
INIT='{"purchase_price":{"amount":"100","denom":"upebble"},"transfer_price":{"amount":"999","denom":"upebble"}}'
wasmd tx wasm instantiate $CODE_ID "$INIT" \
    --from wallet --label "awesome name service" $TXFLAG -y

# 컨트랙트 상태(및 계정 잔액)를 확인합니다.
wasmd query wasm list-contract-by-code $CODE_ID $NODE --output json
CONTRACT=$(wasmd query wasm list-contract-by-code $CODE_ID $NODE --output json | jq -r '.contracts[-1]')
echo $CONTRACT

# 우리는 이 컨트랙트를 50000usponge로 봐야 합니다.
wasmd query wasm contract $CONTRACT $NODE
wasmd query bank balances $CONTRACT $NODE

# 전체 컨트랙트 상태를 덤핑할 수 있습니다.
wasmd query wasm contract-state all $CONTRACT $NODE

# 키 "config"에 길이를 나타내는 2바이트 접두어를 붙인 점에 유의하십시오.
# echo -n config | xxd -ps
# 636f6e666967를 반환
# 따라서 우리는 키 0006636f6e666967을 가지고 있습니다.

# 하나의 키를 직접 쿼리할 수도 있습니다.
wasmd query wasm contract-state raw $CONTRACT 0006636f6e666967 $NODE --hex

# 키는 16진수로 인코딩되고 val은 base64로 인코딩됩니다.
# 반환된 데이터를 보려면(ascii라고 가정) 다음과 같이 시도합니다.
# (많은 경우에 반환된 바이너리 데이터는 ASCII 형식이 아니므로 인코딩)
wasmd query wasm contract-state all $CONTRACT $NODE --output "json" | jq -r '.models[0].key' | xxd -r -ps
wasmd query wasm contract-state all $CONTRACT $NODE --output "json" | jq -r '.models[0].value' | base64 -d

# 또는 "스마트 쿼리"를 시도하여 계약에 대해 실행
wasmd query wasm contract-state smart $CONTRACT '{}' $NODE
# (유효한 QueryMsg를 구현하지 않았기 때문에 구문 분석 오류가 다시 나타납니다.)
```

컨트랙트가 인스턴스화되면 이름을 등록하고 대가를 지불하고 이전해 봅시다.

```shell
# 잘못된 사람이 있으면 실행이 실패합니다.
REGISTER='{"register":{"name":"fred"}}'
wasmd tx wasm execute $CONTRACT "$REGISTER" \
    --amount 100upebble \
    --from wallet $TXFLAG -y

# 이름 레코드 쿼리
NAME_QUERY='{"resolve_record": {"name": "fred"}}'
wasmd query wasm contract-state smart $CONTRACT "$NAME_QUERY" $NODE --output json
# {"data":{"address":"wasm1pze5wsf0dg0fa4ysnttugn0m22ssf3t4a9yz3h"}}

# 이름 레코드를 구매하고 wallet2로 전송("to" 주소를 이전 단계에서 생성한 wallet2로 변경)
TRANSFER='{"transfer":{"name":"fred","to":"wasm15522nrwtvsf7mt2vhehhwuw9qpsxw2mghqzu50"}}'
wasmd tx wasm execute $CONTRACT "$TRANSFER" \
    --amount 999upebble \
    --from wallet $TXFLAG -y
```

새 소유자 주소를 보려면 레코드를 쿼리하십시오.

```shell
NAME_QUERY='{"resolve_record": {"name": "fred"}}'
wasmd query wasm contract-state smart $CONTRACT "$NAME_QUERY" $NODE --output json
# {"data":{"address":"wasm15522nrwtvsf7mt2vhehhwuw9qpsxw2mghqzu50"}}
```
