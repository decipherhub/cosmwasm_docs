---
title: Names and Addresses
sidebar_position: '3'
---

# 이름과 주소

대부분의 블록체인은 공개 키의 해시를 통해 외부 액터들을 식별하기 위한 주소를 사용하며, 새롭게 출시되는 블록체인들은 이를 확장하여 고유한 주소가 있는 온체인 "스마트 컨트랙트"도 식별합니다. 체인에서 주소는 일반적으로 해싱 함수에서 파생되는 20바이트 또는 32바이트 길이의 간결하고 변경할 수 없는 이진 형식을 사용합니다. 클라이언트에 사람이 읽을 수 있도록 보여지는 다양한 형식의 이진 주소 표현이 있습니다. 예를 들어, [Bech32](https://en.bitcoin.it/wiki/Bech32) `bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9` , hex `0x8617E340B3D01FA5F11F306F4090FD50E238070D` 또는 [checksumned hex](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md) `0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed` , 그리고 [large integers](https://research.kudelskisecurity.com/2018/01/16/blockchains-how-to-steal-millions-in-264-operations/) `3040783849904107057L`가 있습니다.

## Addr {#addr}

Cosmos SDK의 주소는 20자 길이의 문자열이며 Bech32의 체인 접두사, Bech32의 체크섬 및 체크섬된 16진수(EIP55)와 같은 보안 검사를 포함합니다. CosmWasm은 Cosmos SDK의 확장이므로 동일한 주소 규칙을 따릅니다. 지갑, 스마트 계약, 모듈에는 사전 정의된 접두사인 식별자 주소를 가지고 있습니다. 예를 들어 gaia용 `cosmos1...`, CosmWasm 테스트넷용 `wasm1...`과 같은 형식으로 표현됩니다.

컨트랙트에 주소를 전달하려면 문자열로 전달한 다음 **Addr**에 대한 입력의 유효성을 검사합니다. [Addr](https://github.com/CosmWasm/cosmwasm/blob/v0.14.0/packages/std/src/addresses.rs#L31) 은 주소에 대한 문자열 유효성 검사와 같은 유용한 도우미 기능을 제공하는 기능으로, 일반 문자열에 대한 wrapper입니다.

## 옵션: Canonical Addresses {#optional-canonical-addresses}

드물지만 주소 형식이 바뀌는 경우에 대비한 또 다른 주소 표현이 있습니다.

예를 들어 Bitcoin은 SegWit과 함께 [Base58 에서 Bech32 인코딩으로 이동](https://en.bitcoin.it/wiki/BIP_0173) 했으며 Rise 역시 v2 업그레이드에서 [Lisk 형식에서 Bech32로 이동](https://medium.com/rise-vision/introducing-rise-v2-521a58e1e9de#41d5)하고 있습니다.

즉, `message.signer` 가 트랜잭션에 서명하는 문자열 주소이자 이를 사용하여 계정 잔액을 조회하는 유일한 문자열 주소일 경우, 이 인코딩이 변경되면 계정에 액세스할 수 없게 됩니다. 내부 작업을 위한 안정적인 식별자가 반드시 필요합니다.

이를 위해 *Canonical Address* 를 정의합니다. 이는 안정적이고 고유합니다. 즉, 하나의 주어진 계정에 대해 하나의 표준 주소만 존재합니다(체인의 생과 같이합니다). 우리는 잠재적으로 여러 문자열 주소로 변환될 수 있는 *Canonical Address* 형식을 정의합니다. 이는 어떠한 변경 없이 상호 전환될 수 있습니다.

우리는 *Canonical Address* 를 블록체인에서 내부적으로 사용되는 이진 표현으로 정의합니다. 이는 네이티브 토큰이 인덱싱되는 기준이며 따라서 계정의 수명동안 절대 변경되어서는 안됩니다. 이것은 모든 **저장소 조회** 에 사용할 수 있는 표현입니다(주소의 일부를 저장소의 키로 사용하는 경우).

## 이름 짓기 {#naming}

점점 [사람이](https://app.ens.domains/about) [읽을 수 있는](https://docs.blockstack.org/core/naming/introduction.html) [이름](https://iov.one) 이 블록체인과 [이를 넘어서](https://hackernoon.com/everything-you-didnt-know-about-the-handshake-naming-system-how-this-blockchain-project-will-483464309f33)까지 매우 중요해 지고 있습니다.

한때 우리는 CosmWasm에 이름을 만들고 메시지의 모든 곳에서 사용하는 것을 우선적으로 고려했습니다. 하지만 계정은 처음 초기화할 때까지 이름을 가질 수 없고, 영구적으로 안정적인 *주소* 가 필요하다는 것을 깨닫고 이를 고려하지 않게 되었습니다. 그럼에도 우리는 여전히 이름이 블록체인에서 중요하게 사용되기를 바랍니다. 이를 위해 이름은 순수 함수에 대한 호출이 아닌, 컨트랙트 쿼리(저장소 액세스 포함)를 필요로 하는 또 다른 형식의 *주소* 로 간주할 수 있습니다.

이를 위한 형식과 인터페이스는 여전히 논의 중이며 우리는 [네임 서비스의 튜토리얼 버전을](/tutorials/name-service/intro) 작업 중입니다. <code>:</code> 로 시작하는 모든 <em>주소</em> 가 네임 서비스를 통해 조회하는 이름라는 것에 모두가 동의한다고 상상해 보세요. 그리고 내장된 블록체인 확인 기능으로 직접 이름에 대한 주소를 확인할 수 있다고 상상해 보세요. 그러면 에스크로를 위한 트랜잭션을 생성할 때 `{"arbiter": "cosmos1qqp837a4kvtgplm6uqhdge0zzu6efqgujllfst"}` 또는 `{"arbiter": ":alice"}`와 같은 형식을 사용할 수 있으며, 클라이언트 뿐만 아니라 컨트랙트 내부에서도 이름에 대해 확인할 수 있게 됩니다. 물론 네임 서비스에 대한 표준 쿼리 형식이 필요하며, 컨트랙트 호출은 이름을 확인할 Canonical 네임 서비스 컨트랙트 주소를 어떻게든 알아야 합니다. 이러한 이유로 이 기능은 아직 논의 중입니다.

### DIDs {#dids}

*참고: 이 기능이 완전히 구현되기까지는 상당한 시간이 걸릴 것입니다. 여러분 코드 디자인에 영감을 주는 역할을 합니다.*

네임 서비스 문제에 대한 솔루션을 고민하면서 *Human Names*로 무엇이 가능할지에 대해 계속 상상해 봅시다. 참조를 사용하여 사용자 주소를 확인할 수 있을 뿐만 아니라 컨트랙트에도 적용이 가능합니다. 아마도 우리는 이름이 아닌 *고유하게 등록된 토큰 티커* 로 "ERC20" 토큰 컨트랙트에 메시지를 보낼 수 있을 것입니다. 우리는 곧 이름의 범위나 맥락을 구별하는 어떤 방법을 사용해야 할 것입니다. 여기서 [Decentralized Identifier(DIDs)](https://www.w3.org/TR/did-core/) 가 역할을 하게 될 것입니다. 최종 클라이언트 또는 스마트 컨트랙트 "Actor"가 사용할 수 있는 다음 메시지 형식을 상상해 보십시오.

```json
{
  "destination": "did:token:XRN",
  "msg": {
    "transfer": {
      "from": "did:account:alice",
      "to": "did:account:bob",
      "amount": "13.56"
    }
  }
}
```

이는 클라이언트 영역에서 해결하는 스펙이 아닌 블록체인에서 사용되는 실제 교환 형식일 것입니다. 따라서 스마트 컨트랙트는 실행 과정에서 위와 같은 메시지를 전달할 수도 있을 것입니다. 이 아이디어가 마음에 드시나요? 남길 코멘트가 있나요? [여러분의 생각을 github에 남겨 주세요](https://github.com/CosmWasm/cosmwasm/issues/80) .
