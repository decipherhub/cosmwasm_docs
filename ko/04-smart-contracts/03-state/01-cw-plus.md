---
sidebar_position: '1'
---

# cw-storage-plus

:::정보 CosmWasm을 위한 향상된 스토리지 엔진 :::

**알림**

여러 운영레벨 품질의 컨트랙트에서 많이 사용되고 개선되었습니다. 계획된 API 중단이 하나 있었지만, 코드는 안정적이고 강력합니다. 자유롭게 여러분의 컨트랙트에서 사용하십시오.

## 사용 개요(Using Overview)

`cosmwasm_std::Storage` 위에 생산적인 추상화를 제공하기 위해 두 가지 주요 클래스를 소개합니다. 그것들은 하나의 데이터베이스 키 유형이 지정된 래퍼(wrapper)인 `Item`이며, raw bytes를 처리하지 않고 상호작용 하기 위한 몇 가지 기능을 제공합니다. 단순한( `&[u8]` ) 또는 복합(예: `(&[u8], &[u8])` ) 키로 인덱싱되고, 하나의 접두사 하에 특별한 유형의 여러 객체를 저장할 수 있는 `Map`도 처리하지 않아도 됩니다.

이것들은 `Singleton` 및 `Bucket`을 사용하는 `cosmwasm_storage`의 컨셉과 일치하지만, 개발자가 조금 적게 타이핑하고 컨트랙트에서 가스 사용량을 줄이기 위해 재설계된 API를 가지고 있다는 차이가 있습니다.

## 아이템(Item)

[`Item`](./src/item.rs) 의 사용법은 매우 간단합니다. 적절한 유형과 다른 항목에서 사용하지 않는 데이터베이스 키를 제공하기만 하면 됩니다. 그런 다음 이러한 데이터와 상호 작용할 수 있는 멋진 인터페이스를 제공합니다.

`Singleton`을 사용할때 가장 크게 바뀐 부분은 더 이상 `Storage`를 내부에 저장하지 않는다는 것입니다. 즉, 객체의 변수를 읽고 및 쓸 필요가 없습니다. 또한 `const fn`을 사용하여 `Item` 을 생성하여 매번 생성해야 하는 함수가 아닌 전역(global) 컴파일 상수로 정의할 수 있어 타이핑을 줄이고 가스비도 절약할 수 있습니다.

사용례:

```rust
#[derive(Serialize, Deserialize, PartialEq, Debug)]
struct Config {
    pub owner: String,
    pub max_tokens: i32,
}

// 2개의 함수가 있는 Singleton이 아닌 const constructor임에 주의
const CONFIG: Item<Config> = Item::new("config");

fn demo() -> StdResult<()> {
    let mut store = MockStorage::new();

    // may_load 가 Option<T>를 리턴하고, 데이터가 누락되면 None을 리턴합니다
    // load는 T를 리턴하고, 데이터가 누락되면 Err(StdError::NotFound{})
    let empty = CONFIG.may_load(&store)?;
    assert_eq!(None, empty);
    let cfg = Config {
        owner: "admin".to_string(),
        max_tokens: 1234,
    };
    CONFIG.save(&mut store, &cfg)?;
    let loaded = CONFIG.load(&store)?;
    assert_eq!(cfg, loaded);

    // 클로저로 item을 업데이트합니다 (읽기/쓰기 포함)
    // 새로 저장된 값을 리턴합니다
    let output = CONFIG.update(&mut store, |mut c| -> StdResult<_> {
        c.max_tokens *= 2;
        Ok(c)
    })?;
    assert_eq!(2468, output.max_tokens);

    // 업데이트에 오류가 발생할 수 있고 아무것도 저장되지 않습니다
    let failed = CONFIG.update(&mut store, |_| -> StdResult<_> {
        Err(StdError::generic_err("failure mode"))
    });
    assert!(failed.is_err());

    // 불러온 데이터는 저장된 첫번째 업데이트가 저장되었음을 보여줍니다
    let loaded = CONFIG.load(&store)?;
    let expected = Config {
        owner: "admin".to_string(),
        max_tokens: 2468,
    };
    assert_eq!(expected, loaded);

    // 데이터를 지울수도 있습니다
    CONFIG.remove(&mut store);
    let empty = CONFIG.may_load(&store)?;
    assert_eq!(None, empty);

    Ok(())
}
```

## 맵(Map)

[`Map`](./src/item.rs) 사용법은 조금 더 복잡하지만, 그래도 명확합니다. 입력된 값으로 키-값 조회를 허용하는 스토리지의`BTreeMap`으로 상상할 수 있습니다. 또한 단순한 바이너리 키( `&[u8]` )뿐만 아니라 결합된 튜플(tuples)도 지원합니다. 이를 통해 허용량(allowances)을 복합 키로 저장할 수 있습니다. 예) `(owner, spender)`로 잔액을 조회하기

직접 조회하는 방법 외에도 이더리움에서 찾을 수 없는 강력한 기능인 '반복(iteration)'이 있습니다. `Map`에 있는 모든 항목을 나열할 수도 일부만 나열할 수도 있습니다. 저희는 마지막 쿼리가 종료된 지점부터 시작하여 낮은 가스 비용으로 이러한 항목에 대한 페이지 매김(pagination)도 효율적으로 허용합니다. 이를 위해서는 `cw-storage-plus` 에서 `iterator` 기능을 활성화해야 합니다( `cosmwasm-std`에서도 기본적으로 자동 활성화됩니다)

`Bucket`의 가장 큰 변경사항은 더 이상 `Storage` 를 내부에 저장하지 않는다는 것입니다. 즉, 객체의 변수를 읽고 및 쓸 필요가 없으며 한 가지 유형만 필요로합니다. 또한, `const fn` 을 사용하여 `Bucket` 을 생성하며 매번 생성해야 하는 함수가 아닌 전역 컴파일 상수로 정의할 수 있으므로 타이핑 횟수와 가스비를 절약할 수 있습니다. 추가로, 복합 인덱스(튜플)는 더욱 편해졌고 의도를 표현할 수 있게 되었으며 범위(range) 인터페이스가 개선되었습니다.

다음은 일반(단순)키의 예입니다.

```rust
#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
struct Data {
    pub name: String,
    pub age: i32,
}

const PEOPLE: Map<&str, Data> = Map::new("people");

fn demo() -> StdResult<()> {
    let mut store = MockStorage::new();
    let data = Data {
        name: "John".to_string(),
        age: 32,
    };

    // 여분의 키 인수들로 저장하고 불러오기
    let empty = PEOPLE.may_load(&store, "john")?;
    assert_eq!(None, empty);
    PEOPLE.save(&mut store, "john", &data)?;
    let loaded = PEOPLE.load(&store, "john")?;
    assert_eq!(data, loaded);

    // 다른 키가 없음
    let missing = PEOPLE.may_load(&store, "jack")?;
    assert_eq!(None, missing);

    // 새로운 혹은 기존의 키를 업데이트하는 함수
    let birthday = |d: Option<Data>| -> StdResult<Data> {
        match d {
            Some(one) => Ok(Data {
                name: one.name,
                age: one.age + 1,
            }),
            None => Ok(Data {
                name: "Newborn".to_string(),
                age: 0,
            }),
        }
    };

    let old_john = PEOPLE.update(&mut store, "john", birthday)?;
    assert_eq!(33, old_john.age);
    assert_eq!("John", old_john.name.as_str());

    let new_jack = PEOPLE.update(&mut store, "jack", birthday)?;
    assert_eq!(0, new_jack.age);
    assert_eq!("Newborn", new_jack.name.as_str());

    // 업데이트는 저장소도 업데이트함
    assert_eq!(old_john, PEOPLE.load(&store, "john")?);
    assert_eq!(new_jack, PEOPLE.load(&store, "jack")?);

    // 제거하기
    PEOPLE.remove(&mut store, "john");
    let empty = PEOPLE.may_load(&store, "john")?;
    assert_eq!(None, empty);

    Ok(())
}
```

### 키 유형(Key types)

`Map` 키는 `PrimaryKey` 특성을 구현하는 모든 것이 될 수 있습니다. `PrimaryKey` 의 일련의 구현이 이미 제공되었습니다( `packages/storage-plus/src/keys.rs` 참조).

- `impl<'a> PrimaryKey<'a> for &'a [u8]`
- `impl<'a> PrimaryKey<'a> for &'a str`
- `impl<'a> PrimaryKey<'a> for Vec<u8>`
- `impl<'a> PrimaryKey<'a> for String`
- `impl<'a> PrimaryKey<'a> for Addr`
- `impl<'a> PrimaryKey<'a> for &'a Addr`
- `impl<'a, T: PrimaryKey<'a> + Prefixer<'a>, U: PrimaryKey<'a>> PrimaryKey<'a> for (T, U)`
- `impl<'a, T: PrimaryKey<'a> + Prefixer<'a>, U: PrimaryKey<'a> + Prefixer<'a>, V: PrimaryKey<'a>> PrimaryKey<'a> for (T, U, V)`
- `impl<'a, T: Endian + Clone> PrimaryKey<'a> for IntKey<T>`

즉, 바이트 및 문자열 슬라이스, 바이트 벡터 및 문자열을 키로 편리하게 사용할 수 있습니다. 또한 주소 및 주소 참조, 쌍(pair) 및 삼중쌍(triples), 정수 유형과 같은 일부 다른 유형도 사용할 수 있습니다.

만약 키가 주소를 나타낸다면, 저장소의 키에 `String` 또는 문자열 슬라이스 대신 `&Addr`을 사용하는 것이 좋습니다. 메시지를 통해 전달된 모든 주소에 대해 `addr_validate`로 주소 타당성 검사를 수행하여 적합한 주소인지 확인해야합니다. `deps.api`에 있는 `pub fn addr_validate(&self, &str) -> Addr`가 주소 타당성 검사에 사용될 수 있고, 리턴된 `Addr` 은 `Map` 또는 유사한 구조의 키로 편리하게 사용할 수 있습니다.

### 복합 키(Composite Keys)

여러 items를 키로 사용하려는 경우가 있습니다. 예를 들어, 계정 소유자 및 지출자를 기준으로 허용량(allowances)를 저장하는 경우를 생각해보면 됩니다. 호출하기 전에 수동으로 연결을 시도할 수 있지만, 중복연결이 발생할 수 있으며 로우레벨이기도 합니다. 또한 명시적으로 키를 분리하여 "한 명의 소유자에 대한 모든 허용량(allowances) 표시"(복합 키의 첫 번째 부분)와 같이 접두사를 통해 범위 쿼리를 수행을 쉽게할 수 있습니다. 여러분이 좋아하는 데이터베이스를 떠올려보세요.

복합 키와 함께 사용하는 방법은 다음과 같습니다. 튜플을 키라고 정의하고 위에서 바이트 슬라이스를 사용한 모든 곳에서 사용하면 됩니다.

```rust
// 기본 키를 위한 튜플(tuple)을 기억하십시오. 저희는 하나의 슬라이스 혹은 두세개의 튜플을 지원합니다
// 더 긴 튜플을 추가하는 것은 쉽지만 필요하진 않습니다
const ALLOWANCE: Map<(&str, &str), u64> = Map::new("allow");

fn demo() -> StdResult<()> {
    let mut store = MockStorage::new();

    // 복합 키 저장하고 불러오기
    let empty = ALLOWANCE.may_load(&store, ("owner", "spender"))?;
    assert_eq!(None, empty);
    ALLOWANCE.save(&mut store, ("owner", "spender"), &777)?;
    let loaded = ALLOWANCE.load(&store, ("owner", "spender"))?;
    assert_eq!(777, loaded);

    // 다른 키로는 나타나지 않습니다(concat이 같아도)
    let different = ALLOWANCE.may_load(&store, ("owners", "pender")).unwrap();
    assert_eq!(None, different);

    // 단순한 업데이트
    ALLOWANCE.update(&mut store, ("owner", "spender"), |v| {
        Ok(v.unwrap_or_default() + 222)
    })?;
    let loaded = ALLOWANCE.load(&store, ("owner", "spender"))?;
    assert_eq!(999, loaded);

    Ok(())
}
```

### 경로(Path)

키에 액세스할 때 `Map`에서 `Path`를 만듭니다. `PEOPLE.load(&store, b"jack") == PEOPLE.key(b"jack").load()` . `Map.key()` 는 이 키까지의 계산된 경로를 재사용하여 `Item`과 동일한 인터페이스를 가진 `Path`를 리턴합니다.

간단한 키의 경우, 여러 호출에 동일한 키를 사용하면 타이핑 횟수와 가스비 사용량이 약간 줄어듭니다. 그러나 `(b"owner", b"spender")` 와 같은 복합 키의 경우 타이핑 횟수가 **훨씬** 적습니다. 그리고 키를 두 번 이상 사용하는 모든 경우에 복합 키를 적극 권장합니다.

```rust
#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
struct Data {
    pub name: String,
    pub age: i32,
}

const PEOPLE: Map<&str, Data> = Map::new("people");
const ALLOWANCE: Map<(&str, &str), u64> = Map::new("allow");

fn demo() -> StdResult<()> {
    let mut store = MockStorage::new();
    let data = Data {
        name: "John".to_string(),
        age: 32,
    };

    // 아래는 한번 사용할 경로를 만듦
    let john = PEOPLE.key("john");

    // 위의 Item과 같이 이것을 사용하십시오
    let empty = john.may_load(&store)?;
    assert_eq!(None, empty);
    john.save(&mut store, &data)?;
    let loaded = john.load(&store)?;
    assert_eq!(data, loaded);
    john.remove(&mut store);
    let empty = john.may_load(&store)?;
    assert_eq!(None, empty);

    // 복합 키와 같습니다. key()에서 두 파트 모두 사용하십시오
    // 위의 예보다 얼마나 더 간단한지 주목하십시오
    let allow = ALLOWANCE.key(("owner", "spender"));
    allow.save(&mut store, &1234)?;
    let loaded = allow.load(&store)?;
    assert_eq!(1234, loaded);
    allow.update(&mut store, |x| Ok(x.unwrap_or_default() * 2))?;
    let loaded = allow.load(&store)?;
    assert_eq!(2468, loaded);

    Ok(())
}
```

### 접두사(Prefix)

맵에서 특정 item 하나를 가져오는 것 외에도 맵(또는 맵의 서브집합)을 반복할 수 있습니다. 이를 통해 "모든 토큰 표시"와 같은 질문에 답할 수 있으며, 페이지 매김(pagination) 또는 사용자 지정 범위를 쉽게 허용할 수 있는 좋은 `Bound`s를 제공합니다.

일반적인 형식은 `map.prefix(k)` 를 호출하여 `Prefix` 를 얻는 것입니다. 여기서 `k` 는 일반 키의 item보다 item이 하나 더 적습니다. `map.key()`가 `(&[u8], &[u8])`을 취했다면, `map.prefix()`는 `&[u8]`를 취합니다. `map.key()` 가 `&[u8]` 을 취하면, `map.prefix()` 가 `()` ) 을 취합니다. 접두사 공간이 있으면 `range(store, min, max, order)`를 사용하여 모든 항목을 반복할 수 있습니다. `Order::Ascending` 또는 `Order::Descending` 을 지원합니다. `min` 은 하한값이고 `max`은 상한값입니다.

```rust
#[derive(Copy, Clone, Debug)]
pub enum Bound {
    Inclusive(Vec<u8>),
    Exclusive(Vec<u8>),
    None,
}
```

`min` 및 `max`의 경계인 경우 이 접두사의 모든 item들을 리턴합니다. `.take(n)` 을 사용하여 결과를 `n`개 item으로 제한하고 페이지 매김을 시작할 수 있습니다. `min` bound를 `Bound::Exclusive(last_value)`로 설정할 수도 있습니다(마지막 값 *이후* 의 모든 항목에 대해 반복을 시작하기 위해). `take`와 결합하면 쉽게 페이지 매김할 수 있습니다. 완벽한 일치를 포함하고 싶을 때 `Bound::Inclusive(x)`를 사용할 수도 있습니다. API를 더 잘 이해하려면 다음 예를 읽으십시오.

```rust
#[derive(Serialize, Deserialize, PartialEq, Debug, Clone)]
struct Data {
    pub name: String,
    pub age: i32,
}

const PEOPLE: Map<&str, Data> = Map::new("people");
const ALLOWANCE: Map<(&str, &str), u64> = Map::new("allow");

fn demo() -> StdResult<()> {
    let mut store = MockStorage::new();

    // 두 키를 저장하고 불러오기
    let data = Data { name: "John".to_string(), age: 32 };
    PEOPLE.save(&mut store, "john", &data)?;
    let data2 = Data { name: "Jim".to_string(), age: 44 };
    PEOPLE.save(&mut store, "jim", &data2)?;

    // 모두 반복하기
    let all: StdResult<Vec<_>> = PEOPLE
        .range(&store, Bound::None, Bound::None, Order::Ascending)
        .collect();
    assert_eq!(
        all?,
        vec![("jim".to_vec(), data2), ("john".to_vec(), data.clone())]
    );

    // 또는 jim 이후를 보여주기
    let all: StdResult<Vec<_>> = PEOPLE
        .range(
            &store,
            Bound::Exclusive("jim"),
            Bound::None,
            Order::Ascending,
        )
        .collect();
    assert_eq!(all?, vec![("john".to_vec(), data)]);

    // 세개의 키를 저장하고 불러오기, 하나는 오너가 다름
    ALLOWANCE.save(&mut store, ("owner", "spender"), &1000)?;
    ALLOWANCE.save(&mut store, ("owner", "spender2"), &3000)?;
    ALLOWANCE.save(&mut store, ("owner2", "spender"), &5000)?;

    // 한 키로 모두 get 하기
    let all: StdResult<Vec<_>> = ALLOWANCE
        .prefix("owner")
        .range(&store, Bound::None, Bound::None, Order::Ascending)
        .collect();
    assert_eq!(
        all?,
        vec![("spender".to_vec(), 1000), ("spender2".to_vec(), 3000)]
    );

    // 또는 두 item 사이의 범위(반대도)
    let all: StdResult<Vec<_>> = ALLOWANCE
        .prefix("owner")
        .range(
            &store,
            Bound::Exclusive("spender1"),
            Bound::Inclusive("spender2"),
            Order::Descending,
        )
        .collect();
    assert_eq!(all?, vec![("spender2".to_vec(), 3000)]);

    Ok(())
}
```

## 인덱스 맵(IndexedMap)

원래 `cw721-base` 컨트랙트에서 가져온 `IndexedMap` 정의 및 사용의 한 예를 살펴보겠습니다.

### 정의

```rust
pub struct TokenIndexes<'a> {
  pub owner: MultiIndex<'a, Addr, TokenInfo>,
}

impl<'a> IndexList<TokenInfo> for TokenIndexes<'a> {
  fn get_indexes(&'_ self) -> Box<dyn Iterator<Item = &'_ dyn Index<TokenInfo>> + '_> {
    let v: Vec<&dyn Index<TokenInfo>> = vec![&self.owner];
    Box::new(v.into_iter())
  }
}

pub fn tokens<'a>() -> IndexedMap<'a, &'a str, TokenInfo, TokenIndexes<'a>> {
  let indexes = TokenIndexes {
    owner: MultiIndex::new(
      |d: &TokenInfo| d.owner.clone(),
      "tokens",
      "tokens__owner",
    ),
  };
  IndexedMap::new("tokens", indexes)
}
```

이 부분에 대해 논의해 보겠습니다.

```rust
pub struct TokenIndexes<'a> {
  pub owner: MultiIndex<'a, Addr, TokenInfo, String>,
}
```

다음은 인덱스 정의입니다. 여기에는 `owner` 라는 인덱스가 하나만 있습니다. `TokenIndexes` 구조체의 퍼블릭 멤버로 인덱스가 더 있을 수 있습니다.

`owner` 인덱스가 `MultiIndex` 임을 확인했습니다. 다중 인덱스(Multi-index)는 반복되는 값을 키로 가질 수 있습니다. 기본 키는 내부적으로 다중 인덱스 키의 마지막 요소로 사용되어 반복되는 인덱스 값을 명확하게 합니다. 이름에서 알 수 있듯이 소유자별 토큰에 대한 인덱스입니다. 소유자가 여러 토큰을 가질 수 있다는 점을 감안할 때 주어진 소유자가 가진 모든 토큰을 나열/반복할 수 있으려면 `MultiIndex` 가 필요합니다.

`TokenInfo` 데이터는 원래 `token_id` (문자열 값)에 의해 저장됩니다. 토큰 생성 코드에서 이를 확인할 수 있습니다.

```rust
    tokens().update(deps.storage, &msg.token_id, |old| match old {
        Some(_) => Err(ContractError::Claimed {}),
        None => Ok(token),
    })?;
```

(참고로 이것은 이미 존재하는 토큰을 덮어쓰는 것을 피하기 위해 `save` 대신 `update` 를 사용하고 있습니다.)

`token_id` 가 문자열 값인 경우 `MultiIndex` 정의의 마지막 인수로 `String` 을 지정합니다. 그렇게 하면 기본 키의 역직렬화가 올바른 유형(소유된 문자열)으로 수행됩니다.

그런 다음 이 `TokenInfo` 데이터는 토큰 `owner` ( `Addr` )에 의해 인덱싱됩니다. 그렇게되면 소유자가 보유한 모든 토큰을 나열할 수 있습니다. 이것이 `owner` 인덱스 키가 `Addr`인 이유입니다.

여기서 다른 중요한 점은 키(및 복합 키의 경우 해당 구성 요소)가 `PrimaryKey` 특성을 구현해야 한다는 것입니다. `Addr` 이 `PrimaryKey` 를 구현하는 것을 볼 수 있습니다.

```rust
impl<'a> PrimaryKey<'a> for Addr {
  type Prefix = ();
  type SubPrefix = ();
  type Suffix = Self;
  type SuperSuffix = Self;

  fn key(&self) -> Vec<Key> {
    // 이것은 간단하므로 더 접두사를 추가할 필요가 없습니다
    vec![Key::Ref(self.as_bytes())]
  }
}
```

---

이제 나머지 코드를 살펴보고 모든 것이 어떻게 작동하는지 확인할 수 있습니다.

```rust
impl<'a> IndexList<TokenInfo> for TokenIndexes<'a> {
    fn get_indexes(&'_ self) -> Box<dyn Iterator<Item = &'_ dyn Index<TokenInfo>> + '_> {
        let v: Vec<&dyn Index<TokenInfo>> = vec![&self.owner];
        Box::new(v.into_iter())
    }
}
```

이것은 `TokenIndexes` 에 대한 `IndexList` 특성을 구현합니다. 참고: 이 코드는 표준형식으로 쓰이며 내부에 필요합니다. 이것을 맞춤화하려고 하지 마십시오. 그냥 모든 인덱스의 목록을 반환하기만 하면 됩니다. 이 특성을 구현하는 것은 두 가지 목적을 제공합니다(실제로는 하나이고 동일함). 즉, `get_indexes` 를 통해 인덱스를 쿼리할 수 있도록 하고, `TokenIndexes` 를 `IndexList`로 처리할 수 있도록 합니다. 아래와 같이: code5}IndexedMap에 매개변수로 전달될 수 있습니다.

```rust
pub fn tokens<'a>() -> IndexedMap<'a, &'a str, TokenInfo, TokenIndexes<'a>> {
    let indexes = TokenIndexes {
        owner: MultiIndex::new(
            |d: &TokenInfo| d.owner.clone(),
            "tokens",
            "tokens__owner",
        ),
    };
    IndexedMap::new("tokens", indexes)
}
```

여기서 `tokens()` 는 `IndexedMap` 구성을 단순화하는 도우미 함수입니다. 먼저 인덱스(들)가 생성되고, 그 다음 `IndexedMap` 이 생성되어 리턴됩니다.

인덱스를 생성하는 동안 인덱스별로 인덱스 함수를 제공해야 합니다.

```rust
        owner: MultiIndex::new(|d: &TokenInfo| d.owner.clone(),
```

인덱스는 원래 맵의 값을 가져오고 여기에서 인덱스 키를 생성합니다. 물론 이를 위해서는 인덱스 키에 필요한 요소가 값에 있어야 합니다. 인덱스 함수 외에도 pk의 네임스페이스와 새 인덱스에 대한 네임스페이스도 제공해야 합니다.

---

그런 다음 `IndexedMap` 을 만들고 리턴합니다.

```rust
    IndexedMap::new("tokens", indexes)
```

물론 여기서 pk의 네임스페이스는 인덱스 생성 중에 사용된 네임스페이스와 일치해야 합니다. 그리고 두 번째 인수로 `TokenIndexes` ( `IndexList` 유형 매개변수로)를 전달합니다. 이러한 방식으로 정의된 인덱스를 사용하여 pk에 대한 기본 `Map` 을 연결합니다.

따라서 `IndexedMap` (및 다른 `Indexed*` 유형)은 원래의 `Map` 데이터에 대한 인덱스를 생성하기 위해 여러 인덱스 함수와 네임스페이스를 제공하는 `Map`의 래퍼(wrapper)/확장(extension)입니다. 또한 값 저장/업데이트/제거 중에 이러한 인덱스 함수 호출을 구현하므로, 이런 과정을 신경쓰지 않고 인덱싱된 데이터만 사용하면 됩니다.

### 용법(Usage)

`owner` 가 매개변수로 전달된 `String` 값이고 `start_after` 및 `limit` 이 선택적으로 페이지 매김(pagination) 범위를 정의하는 사용 예:

이것은 위의 `Map` 섹션에서 설명한 `prefix()` 를 사용합니다.

```rust
    let limit = limit.unwrap_or(DEFAULT_LIMIT).min(MAX_LIMIT) as usize;
    let start = start_after.map(Bound::exclusive);
    let owner_addr = deps.api.addr_validate(&owner)?;

    let res: Result<Vec<_>, _> = tokens()
        .idx
        .owner
        .prefix(owner_addr)
        .range(deps.storage, start, None, Order::Ascending)
        .take(limit)
        .collect();
    let tokens = res?;
```

이제 `tokens` 에는 주어진 `owner` 에 대한 `(token_id, TokenInfo)` 쌍이 포함됩니다. pk 값은 `prefix` + `range` 의 경우 `Vec<u8>` 이지만, `prefix_de` + `range_de` 를 사용하여 적절한 유형으로 역직렬화됩니다. (선택 사항) pk 역직렬화 유형(이 경우 `String`)이 `MultiIndex` 정의에 지정된 경우를 생각하시면 됩니다(아래 #Index 키 역직렬화 참조).

유사하지만 `keys()` 메서드를 사용하여 `token_id` 만 반환하는 또 다른 예:

```rust
    let pks: Vec<_> = tokens()
        .idx
        .owner
        .prefix(owner_addr)
        .keys(
            deps.storage,
            start,
            None,
            Order::Ascending,
        )
        .take(limit)
        .collect();
```

이제 `pks` 에는 주어진 `owner` 에 대한 `token_id` 값(원시 `Vec<u8>` 으로)이 포함됩니다. 다시, 다음 섹션에서 자세히 설명하는 것처럼, `prefix_de` + `range_de` 를 사용하여 역직렬화된 키를 대신 얻을 수 있습니다.

### 인덱스 키 역직렬화(index keys deserialization)

`UniqueIndex` 및 `MultiIndex` 의 경우 기본 키를 역직렬화하려면 기본 키( `PK` ) 유형을 지정해야 합니다. 이 일반 유형은 기본 키에 대해 역직렬화/데이터가 제공되지 않음을 의미하는 `()` 기본값과 함께 제공됩니다. 이것은 현재 `UniqueIndex` / `MultiIndex` 구현(impls)을 위한 하위 호환성을 위한 것입니다. 또한 기본 키가 필요하지 않고 역직렬화된 값에만 관심이 있는 경우에 유용할 수 있습니다.
