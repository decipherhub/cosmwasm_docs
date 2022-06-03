---
sidebar_position: '9'
---

# 배포

컴파일이 끝나면 `cd` 명령어를 통해 `artifacts` 으로 디렉토리를 변경해줍니다. `ls` 명령어를 통해 컨트랙트를 구성하는 이진 파일들을 확인 할 수 있습니다.

아래의 예제에서 `<your-contract>`를 이전에 컴파일한 이진 파일의 이름으로 변경해주어야 합니다.

## CLI 를 통해 저장하기

`wasmd` 명령어를 통해 블록체인상에 기록할 수 있습니다:

```sh
wasmd tx wasm store <your-contract>.wasm  --from <your-key> --chain-id <chain-id> --gas auto
```

컨트랙트에 해당하는 code id 를 확인해야 합니다. `code_id` 값의 JSON결과값을 통해 code id를 알 수 있습니다. 만약 shell 변수로 저장하는걸 선호한다면, 위의 업로드 과정이 아니라 아래의 명령어를 통해 진행할 수 있습니다:

```sh
cd artifacts
RES=$(wasmd tx wasm store <your-contract>.wasm  --from <your-key> --chain-id=<chain-id> --gas auto -y)
CODE_ID=$(echo $RES | jq -r '.logs[0].events[0].attributes[-1].value')
```

위 명령어를 통해 앞으로의 세션동안 컨트랙트를 다룰 때에`$CODE_ID` 커맨드를 사용할 수 있습니다.
