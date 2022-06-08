---
sidebar_position: '7'
---

# Math

cosmwasm 에서 사용하는 math 함수는 표준 rust를 기반으로 하지만 u128, u64 및 소수에 대한 helper 함수가 제공됩니다.

## Uint128

Uint128은 JSON 인코딩/디코딩을 위해 문자열을 사용하는 얇은 wrapper 입니다. 그렇기 때문에 u128의 전체 범위는 JSON numbers를 float으로 바꾸는 JavaScript나 jq 같은 클라이언트에서 쓰일 수 있습니다.

파일에 포함됨 : `use cosmwasm_std::Uint128;`

이것의 인스턴스를 만들기 위해 `from` 을, 값을 얻기위해 `u128` 을 사용합니다.

`Uint128(number)`

`Uint128::new(number)`

`Uint128::from(number u128/u64/u32/u16/u8)`

`Uint128::try_from("34567")`

`Uint128::zero()`

### checked

모든 checked math 함수는 Unit128 변수와 함께 동작합니다: checked_add, checked_sub, checked_mul, checked_div, checked_div_euclid, checked_rem

### saturating

모든 saturating math 함수로 Unit128 변수와 함께 동작합니다: saturating_add, saturating_sub, saturating_mul, saturating_pow

### wrapping

모든 wrapping math 함수는 Unit128 변수와 함께 동작합니다: wrapping_add, wrapping_sub, wrapping_mul, wrapping_pow

## Uint64

Uint64은 JSON 인코딩/디코딩을 위해 문자열을 사용하는 얇은 wrapper 입니다. 그렇기 때문에 u64의 전체 범위는 JSON numbers를 float으로 바꾸는 JavaScript나 jq 같은 클라이언트에서 쓰일 수 있습니다.

파일에 포함: `use cosmwasm_std::Uint64;`

이것의 인스턴스를 만들기 위해 `from` 를, 값을 얻기 위해 `u64` 를 사용합니다.:

`Uint64(number)`

`Uint64::new(number)`

`Uint64::from(number u64/u32/u16/u8)`

`Uint64::try_from("34567")`

`Uint64::zero()`

### checked

모든 checked math 함수는 Uint64 변수와 함께 동작합니다: checked_add, checked_sub, checked_mul, checked_div, checked_div_euclid, checked_rem

### saturating

모든 saturating math 함수는 Uint64 변수와 함께 동작합니다: saturating_add, saturating_sub, saturating_mul, saturating_pow

### wrapping

모든 wrapping math 함수는 Uint64 변수와 함께 동작합니다: wrapping_add, wrapping_sub, wrapping_mul, wrapping_pow

## Decimal

고정 소수점 십진수 값 18자리, 즉 Decimal(1_000_000_000_000_000_000) == 1.0 표현할 수 있는 가장 큰 값은 340282366920938463463.37460743145682입니다.

파일에 포함: `use cosmwasm_std::Decimal;`

`Decimal::from_str("1234.567")`

`Decimal::one()`

`Decimal::zero()`

`Decimal::percent(50)`

`Decimal::permille(125)`

`Decimal::from_ratio(1u128, 1u128)`
