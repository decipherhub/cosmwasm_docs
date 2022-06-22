---
sidebar_position: '5'
---

# dApp 개발

앞서 설명한 유틸리티를 사용하기 위해 템플릿에서 밸런스 체커 dApp을 생성하겠습니다.

## 템플릿 커스터마이징 {#customize-template}

애플리케이션을 만들기 위해, `package.json`의 `name`이나 `README.md`을 자유롭게 수정해도 됩니다.

또한 `routes/Login/index.tsx` 파일을 아래와 같이 수정해주세요.

```jsx
import {Login as LoginDesign} from "@cosmicdapp/design";
import React from "react";
import {config} from "../../../config";
import {pathBalance} from "../../paths";
import cosmWasmLogo from "./assets/cosmWasmLogo.svg";

export function Login(): JSX.Element {
  return (
    <LoginDesign
      pathAfterLogin={pathBalance}
      appName="Balance checker"
      appLogo={cosmWasmLogo}
      config={config}
    />
  );
}

```

## Balance route 추가하기 {#add-balance-route}

### Balance path {#balance-path}

`paths.ts`파일에 아래와 같이 작성해주세요.

```typescript
export const pathBalance = "/balance";
```

### React component {#react-component}

`routes/` 안에 `Balance` 디렉토리를 아래와 같이 추가해주세요.

- `index.tsx`

```jsx
import {PageLayout, YourAccount} from "@cosmicdapp/design";
import {useError} from "@cosmicdapp/logic";
import {Typography} from "antd";
import React, {useState} from "react";
import {FormCheckBalance} from "./components/FormCheckBalance";
import {TokenList} from "./components/TokenList";
import {ErrorText, MainStack} from "./style";

const {Title} = Typography;

export function Balance(): JSX.Element {
  const {error} = useError();
  const [contractAddress, setContractAddress] = useState();

  return (
    <PageLayout>
      <MainStack>
        <Title>Balance</Title>
        <YourAccount hideTitle hideBalance/>
        <FormCheckBalance setContractAddress={setContractAddress}/>
        {error && <ErrorText>{error}</ErrorText>}
        <TokenList contractAddress={contractAddress}/>
      </MainStack>
    </PageLayout>
  );
}
```

- `style.ts`

```typescript
import {Stack} from "@cosmicdapp/design";
import {Typography} from "antd";
import styled from "styled-components";

const {Text} = Typography;

export const MainStack = styled(Stack)`
  & > * {
    --gap: var(--s4);
  }

  h1 {
    margin: 0;
  }

  .ant-form {
    margin-top: var(--gap);
  }
`;

export const ErrorText = styled(Text)`
  color: var(--color-red);
`;
```

`@cosmicdapp/logic`에서 `useError` hook을 사용하고 `@cosmicdapp/design`에서 `Stack` , `PageLayout`,  `YourAccount` component를 사용하므로 매우 익숙할 것입니다.

`index.tsx`에서 component의 레이아웃은 `style.ts`에서 정의한 Styled Components인 `MainStack`, `ErrorText`와 아직 정의하지 않은 `FormCheckBalance` 및`TokenList` component를 사용합니다.

작동하는 논리를 소개하겠습니다. `FormCheckBalance`에 입력된 컨트랙트 주소가 없는 경우 `TokenList` component는 유저의 네이티브 토큰 잔고를 보여줍니다. 입력된 컨트랙트 주소가 있는 경우 CW20의 잔고를 보여주고 만약 컨트랙트를 찾을 수 없다면 에러를 보여줍니다.

### ProtectedSwitch 추가하기 {#add-to-protectedswitch}

`App/index.tsx`의 `ProtectedSwitch`는 아래와 같이 작성합니다.

```jsx
<ProtectedSwitch authPath={pathLogin}>
  <Route exact path={pathBalance} component={Balance}/>
</ProtectedSwitch>
```

이 dapp에서 트랜잭션은 만들지 않기 때문에<br>`OperationResult`의 route와 component를 모두 지우는 것을 주목해 주세요.

## FormCheckBalance component 추가하기 {#add-formcheckbalance-component}

### Search component 추가하기 {#add-search-component}

주소를 입력하기 위해, 커스터마이징한 `Search` component를 사용합니다. 이 방법은 임시방편으로 보일 수 있으나,  `formik`과 `antd`과의 상호작용은 잘 수행하며, `formik-antd`에서 영감을 받았습니다. (하지만 지금은 찾을 수 없습니다.)

`App/forms/Search.tsx`

```jsx
// Search form이 form-antd에 없으므로 https://github.com/jannikbuschke/formik-antd/blob/master/src/input/index.tsx를 통해 확인해주세요.
import {Input as BaseInput} from "antd";
import {InputProps as BaseInputProps, SearchProps as BaseSearchProps} from "antd/lib/input";
import {FieldProps} from "formik";
import {Field} from "formik-antd";
import * as React from "react";
import Search from "antd/lib/input/Search";

interface
FormikFieldProps
{
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate ? : (value: any) => undefined | string | Promise < any >;
  fast ? : boolean;
}

type
InputProps = FormikFieldProps & BaseInputProps;

interface
InputType
extends
React.ForwardRefExoticComponent <
FormikFieldProps & BaseInputProps & React.RefAttributes < BaseInput >
> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  Search: React.ForwardRefExoticComponent < FormikFieldProps & BaseSearchProps & React.RefAttributes < Search >>;
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef((
  {name, validate, fast, onChange: $onChange, onBlur: $onBlur, ...restProps}: InputProps,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  ref: React.Ref<Search>,
) => (
  <Field name={name} validate={validate} fast={fast}>
    {({field: {value, onChange, onBlur}}: FieldProps) => (
      <BaseInput
        ref={ref}
        name={name}
        value={value}
        onChange={(event) => {
          onChange(event);
          $onChange && $onChange(event);
        }}
        onBlur={(event) => {
          onBlur(event);
          $onBlur && $onBlur(event);
        }}
        {...restProps}
      />
    )}
  </Field>
));

const TypedInput = (Input
as
unknown
)
as
InputType;
type
SearchProps = FormikFieldProps & BaseSearchProps;

// eslint-disable-next-line react/display-name
TypedInput.Search = React.forwardRef(
  (
    {name, validate, fast, onChange: $onChange, onBlur: $onBlur, ...restProps}: SearchProps,
    ref: React.Ref<BaseInput>,
  ) => (
    <Field name={name} validate={validate} fast={fast}>
      {({field: {value, onChange, onBlur}}: FieldProps) => (
        <BaseInput.Search
          ref={ref}
          name={name}
          value={value}
          onChange={(event) => {
            onChange(event);
            $onChange && $onChange(event);
          }}
          onBlur={(event) => {
            onBlur(event);
            $onBlur && $onBlur(event);
          }}
          {...restProps}
        />
      )}
    </Field>
  ),
);

export default TypedInput.Search;
```

### contract address 검증 스키마 추가하기 {#add-contract-address-validation-schema}

`FormCheckBalance`를 만들기 위해 우리가 사용하는 `formik` 패키지는 `yup`과 잘 맞습니다. 이를 이용하면 컨트랙트 주소의 유효성을 검사하는 스키마를 만들 수 있습니다.

`App/forms/validationSchemas.ts`

```typescript
import * as Yup from "yup";
import {config} from "../../config";

const regexStartsWithPrefix = new RegExp(`^${config.addressPrefix}`);

const addressShape = {
  address: Yup.string()
    .matches(regexStartsWithPrefix, `"${config.addressPrefix}" prefix required`)
    .length(39 + config.addressPrefix.length, "Address invalid"),
};

export const searchValidationSchema = Yup.object().shape(addressShape);
```

### FormCheckBalance 구현 {#formcheckbalance-implementation}

`routes/Balance/components/FormCheckBalance.tsx` 파일은 아래와 같습니다.

```jsx
import {Formik} from "formik";
import {Form, FormItem} from "formik-antd";
import React from "react";
import Search from "../../../forms/Search";
import {searchValidationSchema} from "../../../forms/validationSchemas";

interface
FormCheckBalanceProps
{
  readonly
  setContractAddress: (value: React.SetStateAction<string>) => void;
}

export function FormCheckBalance({setContractAddress}: FormCheckBalanceProps): JSX.Element {
  return (
    <Formik
      initialValues={{address: ""}}
      validationSchema={searchValidationSchema}
      onSubmit={(values) => {
        setContractAddress(values.address);
      }}
    >
      {(formikProps) => (
        <Form>
          <FormItem name="address">
            <Search
              name="address"
              placeholder="Enter contract address"
              enterButton
              onSearch={formikProps.submitForm}
            />
          </FormItem>
        </Form>
      )}
    </Formik>
  );
}
```

이전에 정의한 주소 유효성 검증 스키마를 사용하고 `Balance` route의 state를 수정하는 `setContractAddress`를 매개변수로 가집니다.

## TokenList component 추가하기 {#add-tokenlist-component}

`FormCheckBalance`를 이용하는 `TokenList`를 구현하기만 하면 됩니다.

이 component는 아래와 같이 구현합니다.

1. 컨트랙트 주소가 있는지 확인하기

- 없다면, `useAccount` hook을 이용해서 네이티브 잔고 불러오기
- 있다면, CW20 컨트랙트에서 decimal과 잔고 불러오기
- 주소에 해당하는 컨트랙트가 없으면, 에러 보여주기

1. 잔고 보여주기

- CW20 또는 네이티브 토큰의 잔고에 대해 사용자 친화적인 포맷을 얻기 위해 로컬 `getCoinToDisplay()` 유틸리티 사용하기
- 데이터를 불러오는데 기다리는 시간동안 정보를 보여주는 것을 피하도록 조건부 랜더링을 위해 `showTokens` 플래그 사용하기

`TokenList`의 구현 코드는 아래와 같습니다.

`routes/Balance/components/TokenList/index.tsx`

```jsx
import {CW20, nativeCoinToDisplay, useAccount, useError, useSdk} from "@cosmicdapp/logic";
import {Coin, coins} from "@cosmjs/launchpad";
import {Decimal} from "@cosmjs/math";
import {Divider, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {config} from "../../../../../config";
import {TokenItem, TokenStack} from "./style";

const {Text} = Typography;

interface
TokenListProps
{
  readonly
  contractAddress: string;
}

export function TokenList({contractAddress}: TokenListProps): JSX.Element {
  const {setError, clearError} = useError();
  const {getClient} = useSdk();
  const {account} = useAccount();

  const [balance, setBalance] = useState < readonly
  Coin[] > ([]);
  const [decimals, setDecimals] = useState < number > ();

  useEffect(() => {
    if (!contractAddress) {
      setBalance(account.balance);
      setDecimals(undefined);
      clearError();
      return;
    }

    const client = getClient();

    (async function updateBalance() {
      try {
        const contract = await client.getContract(contractAddress);
        const cw20Contract = CW20(client).use(contract.address);
        const [{symbol: denom, decimals}, balance] = await Promise.all([
          cw20Contract.tokenInfo(),
          cw20Contract.balance(),
        ]);
        const amount = parseInt(balance, 10);

        setBalance(coins(amount, denom));
        setDecimals(decimals);
        clearError();
      } catch {
        setError("No contract found in that address");
        setBalance([]);
        setDecimals(undefined);
      }
    })();
  }, [account.balance, getClient, contractAddress, clearError, setError]);

  function getCoinToDisplay(coin: Coin): Coin {
    if (contractAddress && decimals) {
      const amountFromDecimal = Decimal.fromAtomics(coin.amount, decimals).toString();
      return {denom: coin.denom, amount: amountFromDecimal};
    }

    return nativeCoinToDisplay(coin, config.coinMap);
  }

  const isCw20Token = contractAddress && decimals !== undefined;
  const isNativeToken = !contractAddress && decimals === undefined;
  const showTokens = isCw20Token || isNativeToken;

  return (
    showTokens && (
      <TokenStack>
        {balance.map((token, index) => {
          const {denom, amount} = getCoinToDisplay(token);

          return (
            <React.Fragment key={token.denom}>
              {index > 0 && <Divider/>}
              <TokenItem>
                <Text>{denom}</Text>
                <Text>{amount !== "0" ? amount : "No tokens"}</Text>
              </TokenItem>
            </React.Fragment>
          );
        })}
      </TokenStack>
    )
  );
}
```

`routes/Balance/components/TokenList/style.ts`

```jsx
import {Stack} from "@cosmicdapp/design";
import styled from "styled-components";

export const TokenStack = styled(Stack)`
  & > * {
    --gap: 0;
  }
`;

export const TokenItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  span {
    font-family: var(--ff-iceland);
    font-size: var(--s2);
  }

  span + span {
    font-weight: bolder;
    font-family: var(--ff-montserrat);
    font-size: var(--s1);
  }
`;
```

## 끝 {#finished}

이제 네이티브 잔고 및 아무 CW20 컨트랙트의 잔고를 조회할 수 있습니다. 가장 중요한 것은 CosmJS 기반 dApp을 개발하는 방법을 알게 되었다는 점입니다.
