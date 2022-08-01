---
id: intro
slug: /
sidebar_position: '1'
---

# 소개

_이 문서는 서울대학교 블록체인 학회 디사이퍼(Decipher) Comswasm 문서 한글화 팀에서_ [_Cosmwasm 공식 문서_](https://docs.cosmwasm.com/docs/1.0/)_의 2022.05.24일자 내용을 기반으로 번역한 문서입니다. 문서의 내용 중 일부가 Outdated 되거나 현재 시점의 원본 문서에서 누락된 내용이 있을 수 있습니다._

## 들어가며  <a href="#how-to-use-cosmwasm" id="how-to-use-cosmwasm"></a>

CosmWasm은 코스모스 생태계를 위해 구축된 새로운 스마트 컨트랙트 플랫폼입니다. 아직 들어보지 못했다면 [이 소개를 확인하세요](https://blog.cosmos.network/announcing-the-launch-of-cosmwasm-cc426ab88e12). 이 문서의 목적은 CosmWasm을 사용해 보거나 제품에 사용하려는 개발자를 위해 상세한 정보를 제공하는 것입니다. 특히 Cosmos SDK 경험이 있는 Go 개발자와 블록체인 플랫폼을 찾고 있는 Rust 개발자를 대상으로 합니다.

## CosmWasm 사용법 <a href="#how-to-use-cosmwasm" id="how-to-use-cosmwasm"></a>

CosmWasm은 Cosmos SDK에 플러그인할 수 있는 모듈로 작성되었습니다. 따라서 Cosmos SDK를 사용하여 블록체인을 구축하고 있는 사람은 누구나 기존 로직을 조정하지 않고도 쉽고 빠르게 CosmWasm 스마트 컨트랙트 기능을 체인에 추가할 수 있습니다. 우리는 또한 `wasmd` 라고 하는 `gaiad` 바이너리에 합쳐진 CosmWasm의 샘플 바이너리를 제공하므로 Cosmos Hub와 동일한 보안 모델과 문서화되고 테스트된 도구를 사용하여 새로운 스마트 컨트랙트 지원이 가능한 블록체인을 즉시 시작할 수 있습니다.

컨트랙트를 호스팅하고 앱에서 사용하려면 실행 중인 블록체인이 필요합니다. 테스트넷에 [연결](02-getting-started/03-setting-env.md#setting-up-environment) 하거나 [로컬 "dev net"을 설정하는](02-getting-started/03-setting-env.md#run-local-node-optional) 방법은 이후 섹션에서 설명합니다. 그리고 쉽게 데모를 실행하고 다른 사람들과 컨트랙트 공유하기 위해 모든 개발자가 간단히 컨트랙트를 업로드할 수 있는 호스팅 테스트넷을 곧 출시할 계획입니다.

## 섹션 <a href="#sections" id="sections"></a>

* [시작하기](02-getting-started/01-intro.md) 에서는 실습 교육을 제공합니다. 로컬 블록체인에서 스마트 컨트랙트 수정, 배포 및 실행하는 과정을 손쉽게 안내합니다. 너무 힘든 코딩 작업 없이 시스템의 모든 측면을 살펴보고 익히기에 이상적입니다.
* [Architecture](03-architecture/01-multichain.md) 는 CosmWasm의 high-level 설계 및 03-아키텍처의 많은 부분을 설명합니다. 시스템 설계를 시작하기 전에 시스템의 멘탈 모델과 기능을 이해하는 것이 좋습니다. 먼저 코드를 사용해보고 싶다면 지금은 이 섹션을 건너뛰고 나중에 디자인에 대해 생각할 준비가 되면 다시 올 수 있습니다.
* **Learn** 은 단계별 설명, 코드 스니펫, 스크립트 등을 통해 기초부터 프로덕션 레벨까지 스마트 컨트랙트를 개발하는 방법을 보여줍니다.
  * [Dev Academy](https://docs.cosmwasm.com/dev-academy/intro) 는 CosmWasm 스마트 컨트랙트 및 클라이언트를 위해 구성된 학습 콘텐츠를 제공합니다.
* [워크샵](https://docs.cosmwasm.com/tutorials/videos-workshops) 에는 다양한 이벤트 및 조직에서 우리 팀이 기록한 CosmWasm 기술 스택에 대한 훌륭한 데모 모음과 구두 설명이 있습니다.
* [Plus](https://docs.cosmwasm.com/cw-plus/0.9.0/overview) 는 프로덕션 레벨의 최첨단 CosmWasm 스마트 컨트랙트를 위한 것입니다.

## 더 공부해 보기 <a href="#further-studies" id="further-studies"></a>

코드를 자세히 살펴보고 자신의 컨트랙트 작성을 시작할 수 있습니다.

* 포크 및 실험을 위한 [예시 컨트랙트 모음](https://github.com/CosmWasm/cw-examples)
* [core contract libs](https://docs.rs/cosmwasm-std/0.14.0/cosmwasm\_std/)을 위한 Rustdoc
* [storage helpers](https://docs.rs/cosmwasm-storage/0.14.0/cosmwasm\_storage/)을 위한 Rustdoc

우리 기술 스택의 다양한 구성 요소와 우리의 목적에 대해 설명하는 [높은 수준의 아티클이 미디엄](https://medium.com/confio)에 많이 있습니다.

CosmWasm을 프로덕션 수준으로 개발하기 위해 대부분의 개발 작업에 자금을 지원한 [Interchain Foundation](https://interchain.io/) 에 감사드립니다.
