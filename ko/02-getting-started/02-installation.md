---
sidebar_position: '2'
---

# 설치

이 섹션에서는 Cosmos SDK 기반 체인에서 스마트 컨트랙트를 개발, 배포하고 이를 즐길 수 있도록 여러분의 머신을 설정해볼 것입니다.

## Go {#go}

[공식 문서](https://github.com/golang/go/wiki#working-with-go)를 따라 golang을 설치할 수 있습니다. 최신 버전의 wasmd은 v1.17+가 필요합니다.

## Rust {#rust}

Rust로 작업한 적이 없다면 우선 몇 가지 도구를 설치해야 합니다. 일반적인 접근 방식은 `rustup` 을 사용하여 의존성을 유지하고 나중에 사용하게 될 `cargo` 및 `rustc` 의 다양한 버전 업데이트를 처리하는 것입니다.

### Linux와 Mac에서 Rust 설치하기 {#installing-rust-in-linux-and-mac}

먼저 [Rustup을 설치합니다](https://rustup.rs/) . 설치가 완료되면 wasm32의 대상이 있는지 확인하십시오.

```shell
rustup default stable
cargo version
# 만약 버전이 1.55.0+ 이하라면, 업데이트 하십시오
rustup update stable

rustup target list --installed
rustup target add wasm32-unknown-unknown
```

### Windows 10에서 Rust 설치하기 {#installing-rust-in-windows-10}

먼저 <a>Rustup.rs</a> 또는 [rust-lang.org](https://rustup.rs/) 에서 <code>rustup-init.exe</code> 를 다운로드하여 실행합니다.

실행한 경우 <a class="_active_edit_href" href="https://visualstudio.microsoft.com/visual-cpp-build-tools/">https://visualstudio.microsoft.com/visual-cpp-build-tools/</a>에서 Visual C++ Build Tools 2019를 수동으로 다운로드하여 설치합니다. "Windows 10 SDK" 및 "English language pack"이 선택되어 있는지 확인합니다.

`rustup-init.exe` 설치를 계속하여 진행합니다.

선택 사항:

- [gvim](https://www.vim.org/download.php#pc)을 다운로드하여 설치하고 환경 변수를 수정하여 &lt;gvim 폴더&gt;를 PATH에 추가합니다.
- [Windows용 git을](https://git-scm.com/download/win) 다운로드하여 설치합니다. 환경 변수를 수정하여 &lt;git 폴더&gt;\bin을 PATH에 추가합니다.
- 개발자 모드(설정 -&gt; 업데이트 및 보안: 개발자용)를 켜고 장치 검색을 활성화하면 ssh(<a class="_active_edit_href" href="https://www.ctrl.blog/entry/how-to-win10-ssh-service.html#section-mssshserv-enable">https://www.ctrl.blog/entry/how-to-win10-ssh-service.html#section-mssshserv-enable</a>)를 통해 Windows 10 서버에 접근할 수 있습니다.

wasm32 대상 설치:

```shell
rustup default stable
cargo version
# 만약 버전이 1.55.0+ 이하라면, 업데이트 하십시오
rustup update stable

rustup target list --installed
rustup target add wasm32-unknown-unknown
```

Rust를 처음 접하는 분들을 위해 `stable` 채널에서 안정적인 릴리스가 6주마다  나옵니다. `nightly` 채널은 최신 버전이며 (테스트용) 버전이 한두 개일 뿐만 아니라 API가 변경될 수 있는 일부 불안정한 기능을 추가로 허용합니다. `wasm` 을 컴파일하려면 `stable` 을 사용하고 싶을 것입니다. `nightly` 를 사용하여 gas 계량 등의 단일 패스 컴파일러에 필요한 `wasmd` 용 런타임을 컴파일합니다.

## wasmd {#wasmd}

`wasmd` 는 CosmWasm 플랫폼의 백본입니다. 이는 wasm 스마트 컨트랙트가 활성화된 Cosmos zone을 구현한 것입니다.

아래 코드는 `cosmos/gaia` 저장소를 베이스로 분기된 후 x/wasm가 추가되고 많은 gaia 관련 파일을 정리됐습니다. 그러나 wasmd 바이너리는 x/wasm 모듈의 추가를 제외하고는 gaiad처럼 작동해야 합니다.

`make` 소프트웨어가 OS에 설치되어 있지 않은 경우 [여기](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows)에 설치하십시오.

```shell
git clone https://github.com/CosmWasm/wasmd.git
cd wasmd
git checkout v0.23.0
make install

# 설치 여부를 확인하십시오
wasmd version
```

:::info 이 과정에 문제가 있으면 `PATH` 를 확인하십시오. `make install` 은 `wasmd` 를 `$HOME/go/bin` 에 복사합니다. 일반적으로 소스에서 Go 코드를 빌드하는 경우`PATH` 에도 설정되어 있는지 확인하십시오. :::

## Cosmos SDK에 대한 추가 정보 {#further-information-on-the-cosmos-sdk}

이것들은 [Cosmos SDK](https://github.com/cosmos/cosmos-sdk) 의 모든 안정적인 기능을 활용하는 블록체인의 인스턴스를 나타냅니다. 따라서 `wasmd` 는 모두 동일한 기능을 가지고 있습니다(WASM 스마트 컨트랙트 포함). 이러한 기능을 사용하는 방법에 대해 자세히 알아보려면 [Gaia 문서](https://github.com/cosmos/gaia/tree/main/docs/hub-tutorials) 를 참조하세요. 일반적으로 Cosmos SDK를 시작하는 방법에 대해 자세히 알아보려면 응용 프로그램 별 블록체인을 위한 사용자 지정 모듈을 빌드하는 방법을 보여주는 [자습서](https://tutorials.cosmos.network/) 시리즈를 살펴보세요.

## IDE 설정 {#setting-up-your-ide}

경험을 통해 우리를 안내할 좋은 IDE가 필요합니다. 특히 Rust를 막 시작할 때 구문을 배우는 데 도움이 되는 플러그인을 적극 권장합니다. 권장드리는 두 가지 무료 편집기 환경이 있습니다.  둘 중 더 익숙한 환경을 선택하세요.

VSCode( [다운로드 링크](https://code.visualstudio.com/download) )를 사용하는 경우 Rust 플러그인을 추가하기만 하면 됩니다. 이것은 RLS(Rust Language Server)를 가장 잘 지원하는 환경이며 저장된 모든 코드의 타입을 검사할 때 Rust 컴파일러를 사용합니다. 이렇게 하면 실제 컴파일러와 동일한 오류 메시지가 표시되고 코드 행을 따라 강조 표시되지만 응답하는 데 약간 느릴 수 있습니다(컴파일러를 실행하기 때문에). 특히 VSCode에 익숙한 경우 가장 좋은 옵션입니다.

[VSCode용 RLS](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust)

다른 옵션은 Intellij IDEA Community Edition( [다운로드 링크](https://www.jetbrains.com/idea/download/) )과 Rust 플러그인을 사용하는 것입니다. 인라인 언어 기능을 빠르게 지원합니다. 특히 (중첩된) 제네릭으로 작업할 때 매우 유용할 수 있도록 추론된 유형의 변수를 보여줍니다. 대부분의 구문 오류를 매우 빠르게 포착하지만 전부는 아닙니다. 이것은 때때로 오류를 찾기 위해 직접 컴파일 실패를 확인해야 한다는 것을 의미합니다. 다른 Intellij 제품(예: Goland)을 사용하는 경우 다음을 사용하십시오.

[Intellij용 RUST](https://intellij-rust.github.io/)

더 많은 편집기가 있으며 일부는 최소한 구문 강조 표시와 같이 다양한 수준의 Rust 지원을 제공하지만 다른 편집기(예: Sublime, Emacs, Vim)를 선호하지 않고 Rust를 처음 사용한다면 한 위의 두 가지 중 하나를 사용하는 것이 좋습니다. 언어에 익숙해지면 언제든지 다른 편집기를 사용자 정의대로 사용할 수 있습니다.
