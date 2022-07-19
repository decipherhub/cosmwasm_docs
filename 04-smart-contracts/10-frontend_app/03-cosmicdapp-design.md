---
sidebar_position: '3'
---

# Cosmic dApp design

[`CosmWasm/dApps [Design]`](https://github.com/CosmWasm/dApps/tree/master/packages/design) 패키지는 두가지 리소스 _theme_과 _components_를 제공합니다. Theme은 dApp의 시각적 일관성을 위한 전역 스타일을 제공합니다. Components는 레이아웃 기본 요소와 내부 논리로 재사용이 가능한 React Components를 제공합니다.

이 패키지에서 밸런스 체커 dApp이 사용하는 몇가지 리소스를 아래에서 살펴보겠습니다.

## Theme <a href="#theme" id="theme"></a>

dApp에 시각적 일관성을 부여하기 위해 export된 `GlobalStyle`을 사용합니다. 이 React component에는 CSS 재설정, 간격, 색상, 글꼴 CSS 사용자 지정 속성 및 일부 Ant Design 클래스에 대한 오버라이드가 포함되어 있습니다. 아래의 `GlobalStyle` 코드를 보면 대략적으로 알 수 있습니다.

```jsx
export function GlobalStyle(): JSX.Element {
  return (
    <>
      <GlobalReset/>
      <GlobalSpacing/>
      <GlobalColors/>
      <GlobalFonts/>
      <GlobalAntOverride/>
    </>
  );
}
```

## Components <a href="#components" id="components"></a>

### Layout primitives <a href="#layout-primitives" id="layout-primitives"></a>

이 리소스는 [Every Layout](https://every-layout.dev) 책을 참고한 몇가지 기본요소를 제공합니다.

#### Stack <a href="#stack" id="stack"></a>

이 React component는 하위 component를 간격 설정이 가능한 스택으로 표현합니다.

#### PageLayout <a href="#pagelayout" id="pagelayout"></a>

이 React component는 모든 view의 wrapper로 사용됩니다. 페이지의 최대 너비를 설정하고 스택으로 되어 있는 하위 component들을 중앙으로 배치합니다.

### Components with logic <a href="#components-with-logic" id="components-with-logic"></a>

#### Login <a href="#login" id="login"></a>

밸런스 체커의 첫 뷰입니다. 로컬 스토리지 burner 지갑, ledger 지갑, Keplr 지갑 등 세가지 로그인 방식을 제공합니다.

#### YourAccount <a href="#youraccount" id="youraccount"></a>

주소를 클립보드로 복사할 수 있고 선택적으로 현재의 네이티브 토큰의 잔고를 보여주는 component입니다.
