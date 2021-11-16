"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2932],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=u(n),m=r,g=d["".concat(l,".").concat(m)]||d[m]||p[m]||s;return n?a.createElement(g,i(i({ref:t},c),{},{components:n})):a.createElement(g,i({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,i=new Array(s);i[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var u=2;u<s;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},540:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return l},metadata:function(){return u},toc:function(){return c},default:function(){return d}});var a=n(7462),r=n(3366),s=(n(7294),n(3905)),i=["components"],o={sidebar_position:1},l="Anatomie d'un contrat intelligent",u={unversionedId:"develop-smart-contract/intro",id:"develop-smart-contract/intro",isDocsHomePage:!1,title:"Anatomie d'un contrat intelligent",description:"Un contrat intelligent peut \xeatre consid\xe9r\xe9 comme une instance d'un objet singleton dont l'\xe9tat interne est conserv\xe9 sur la blockchain . Les utilisateurs peuvent d\xe9clencher des changements d'\xe9tat en lui envoyant des messages JSON, et les utilisateurs peuvent \xe9galement interroger son \xe9tat en envoyant \xe0 une requ\xeate format\xe9e comme un message JSON.",source:"@site/i18n/fr/docusaurus-plugin-content-docs-dev-academy/current/develop-smart-contract/01-intro.md",sourceDirName:"develop-smart-contract",slug:"/develop-smart-contract/intro",permalink:"/fr/dev-academy/develop-smart-contract/intro",editUrl:"https://crowdin.com/project/cosmwasm-docs/fr",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"devAcademy",previous:{title:"Conseils",permalink:"/fr/dev-academy/capture-the-flag/hints"},next:{title:"D\xe9velopper le contrat",permalink:"/fr/dev-academy/develop-smart-contract/develop"}},c=[{value:"Commencez par un mod\xe8le",id:"commencez-par-un-mod\xe8le",children:[],level:2},{value:"\xc9tat du contrat",id:"\xe9tat-du-contrat",children:[],level:2},{value:"InstantiateMsg",id:"instantiatemsg",children:[{value:"Exemple",id:"exemple",children:[],level:3},{value:"D\xe9finition du message",id:"d\xe9finition-du-message",children:[],level:3},{value:"Logique",id:"logique",children:[],level:3}],level:2},{value:"ExecuteMsg",id:"executemsg",children:[{value:"Exemple",id:"exemple-1",children:[{value:"Increment",id:"increment",children:[],level:4},{value:"Reset",id:"reset",children:[],level:4}],level:3},{value:"D\xe9finition du message",id:"d\xe9finition-du-message-1",children:[],level:3},{value:"Logique",id:"logique-1",children:[],level:3}],level:2},{value:"QueryMsg",id:"querymsg",children:[{value:"Exemple",id:"exemple-2",children:[{value:"Balance",id:"balance",children:[],level:4}],level:3},{value:"D\xe9finition du message",id:"d\xe9finition-du-message-2",children:[],level:3},{value:"Logique",id:"logique-2",children:[],level:3}],level:2},{value:"\xc9laboration du contrat",id:"\xe9laboration-du-contrat",children:[{value:"Optimiser votre construction",id:"optimiser-votre-construction",children:[],level:3}],level:2}],p={toc:c};function d(e){var t=e.components,n=(0,r.Z)(e,i);return(0,s.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"anatomie-dun-contrat-intelligent"},"Anatomie d'un contrat intelligent"),(0,s.kt)("p",null,"Un contrat intelligent peut \xeatre consid\xe9r\xe9 comme une instance d'un objet singleton dont l'\xe9tat interne est conserv\xe9 sur la blockchain . Les utilisateurs peuvent d\xe9clencher des changements d'\xe9tat en lui envoyant des messages JSON, et les utilisateurs peuvent \xe9galement interroger son \xe9tat en envoyant \xe0 une requ\xeate format\xe9e comme un message JSON."),(0,s.kt)("p",null,"En tant que r\xe9dacteur de contrat intelligent, votre travail consiste \xe0 d\xe9finir 3 fonctions qui d\xe9finissent l'interface de votre contrat intelligent :"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"instantiate()"),": un constructeur qui est appel\xe9 pendant l'instanciation du contrat pour fournir l'\xe9tat initial"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"execute()"),": est appel\xe9 lorsqu'un utilisateur veut invoquer une m\xe9thode sur le smart contract"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"query()"),": est appel\xe9 lorsqu'un utilisateur veut obtenir des donn\xe9es d'un contrat intelligent.")),(0,s.kt)("p",null,"Dans cette section, nous allons d\xe9finir nos messages attendus et leur mise en \u0153uvre."),(0,s.kt)("h2",{id:"commencez-par-un-mod\xe8le"},"Commencez par un mod\xe8le"),(0,s.kt)("p",null,"Dans votre r\xe9pertoire de travail, vous voudrez utiliser ",(0,s.kt)("inlineCode",{parentName:"p"},"cargo-generate")," pour d\xe9marrer votre contrat intelligent avec la structure du dossier et les options de construction recommand\xe9es :"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"# install cargo-generate\ncargo install cargo-generate --features vendored-openssl\ncargo generate --git https://github.com/CosmWasm/cosmwasm-template.git --name my-first-contract\ncd my-first-contract\n")),(0,s.kt)("p",null,"Cela vous aidera \xe0 d\xe9marrer en fournissant le mod\xe8le de base et la structure d'un contrat intelligent. ",(0,s.kt)("inlineCode",{parentName:"p"},"Vous trouverez dans le fichier\nsrc/lib.rs")," que les points d'entr\xe9e standard de CosmWasm ",(0,s.kt)("inlineCode",{parentName:"p"},"instantiate()"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"execute()"),", et ",(0,s.kt)("inlineCode",{parentName:"p"},"query()")," sont correctement expos\xe9s et connect\xe9s."),(0,s.kt)("h2",{id:"\xe9tat-du-contrat"},"\xc9tat du contrat"),(0,s.kt)("p",null,"Le mod\xe8le de d\xe9part a l'\xe9tat de base suivant :"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"une structure singleton ",(0,s.kt)("inlineCode",{parentName:"li"},"\xc9tat")," contenant :",(0,s.kt)("ul",{parentName:"li"},(0,s.kt)("li",{parentName:"ul"},"un nombre entier de 32 bits ``"),(0,s.kt)("li",{parentName:"ul"},"une adresse ",(0,s.kt)("inlineCode",{parentName:"li"},"propri\xe9taire"))))),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},"// src/state.rs\nuse schemars::JsonSchema ;\nuse serde: :{Deserialize, Serialize};\n\nuse cosmwasm_std: :{CanonicalAddr, Storage};\nuse cosmwasm_storage::{singleton, singleton_read, ReadonlySingleton, Singleton} ;\n\n#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]\npub struct State {\n  pub count : i32,\n  pub owner : Addr,\n}\n")),(0,s.kt)("p",null,"Les contrats intelligents ont la possibilit\xe9 de conserver un \xe9tat persistant gr\xe2ce au syst\xe8me natif LevelDB, un magasin cl\xe9-valeur bas\xe9 sur des octets . Ainsi, toute donn\xe9e que vous souhaitez conserver doit se voir attribuer une cl\xe9 unique \xe0 partir de laquelle les donn\xe9es peuvent \xeatre index\xe9es et r\xe9cup\xe9r\xe9es ult\xe9rieurement \xe0 l'adresse ."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},'// src/state.rs\npub const STATE : Item<State> = Item::new("state") ;\n')),(0,s.kt)("p",null,"Dans l'exemple ci-dessus, la cl\xe9 ",(0,s.kt)("inlineCode",{parentName:"p"},'"state"')," est utilis\xe9e comme pr\xe9fixe."),(0,s.kt)("p",null,"Les donn\xe9es ne peuvent \xeatre conserv\xe9es que sous forme d'octets bruts, de sorte que toute notion de structure ou de type de donn\xe9es doit \xeatre exprim\xe9e sous la forme d'une paire de fonctions de s\xe9rialisation et de d\xe9s\xe9rialisation . Par exemple, les objets doivent \xeatre stock\xe9s sous forme d'octets. Vous devez donc fournir \xe0 la fois la fonction qui code l'objet en octets pour l'enregistrer sur la blockchain, et la fonction qui d\xe9code les octets en types de donn\xe9es que votre logique de contrat peut comprendre. Le choix de la repr\xe9sentation des octets vous appartient, pour autant que fournisse une correspondance propre et bidirectionnelle."),(0,s.kt)("p",null,"Heureusement, l'\xe9quipe CosmWasm a fourni des crates utilitaires tels que ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/cosmwasm/tree/main/packages/storage"},"cosmwasm_storage"),', qui fournit des abstractions de haut niveau pratiques pour les conteneurs de donn\xe9es tels qu\'un "singleton" et un "bucket", qui fournissent automatiquement la s\xe9rialisation et la d\xe9s\xe9rialisation pour les types couramment utilis\xe9s tels que les structs et les nombres Rust.'),(0,s.kt)("p",null,"Remarquez comment la structure ",(0,s.kt)("inlineCode",{parentName:"p"},"State")," contient \xe0 la fois ",(0,s.kt)("inlineCode",{parentName:"p"},"count")," et ",(0,s.kt)("inlineCode",{parentName:"p"},"owner"),". En outre, l'attribut ",(0,s.kt)("inlineCode",{parentName:"p"},"derive")," est appliqu\xe9 pour auto-impl\xe9menter certains traits utiles :"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Serialize"),": fournit la s\xe9rialisation"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Deserialize"),": fournit une d\xe9s\xe9rialisation"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Clone"),": rend notre structure copiable"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"Debug"),": permet d'imprimer notre structure sur une cha\xeene de caract\xe8res."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"PartialEq"),": nous donne une comparaison d'\xe9galit\xe9"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"JsonSchema"),": g\xe9n\xe8re automatiquement un sch\xe9ma JSON pour nous")),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"Addr")," qui repr\xe9sente une adresse Bech32 lisible par l'homme, pr\xe9fix\xe9e par ",(0,s.kt)("inlineCode",{parentName:"p"},"wasm..."),"."),(0,s.kt)("h2",{id:"instantiatemsg"},"InstantiateMsg"),(0,s.kt)("p",null,"Le ",(0,s.kt)("inlineCode",{parentName:"p"},"InstantiateMsg")," est fourni lorsqu'un utilisateur cr\xe9e un contrat sur la blockchain par le biais d'un ",(0,s.kt)("inlineCode",{parentName:"p"},"MsgInstantiateContract"),". Ce site fournit au contrat sa configuration ainsi que son \xe9tat initial."),(0,s.kt)("p",null,"Sur le CosmWasm, le t\xe9l\xe9chargement du code d'un contrat et l'instanciation d'un contrat sont consid\xe9r\xe9s comme des \xe9v\xe9nements distincts , contrairement \xe0 Ethereum. Il s'agit de permettre \xe0 un petit ensemble d'arch\xe9types de contrats valid\xe9s d'exister en tant que instances multiples partageant le m\xeame code de base mais configur\xe9es avec des param\xe8tres diff\xe9rents (imaginez un ERC20 canonique, et plusieurs jetons qui utilisent son code)."),(0,s.kt)("h3",{id:"exemple"},"Exemple"),(0,s.kt)("p",null,"Pour notre contrat, nous attendons du cr\xe9ateur du contrat qu'il fournisse l'\xe9tat initial dans un message JSON :"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "count" : 100\n}\n')),(0,s.kt)("h3",{id:"d\xe9finition-du-message"},"D\xe9finition du message"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},"// src/msg.rs\n\nuse schemars::JsonSchema;\nuse serde::{Deserialize, Serialize};\n\n#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]\npub struct InstantiateMsg {\n  pub count: i32,\n}\n\n")),(0,s.kt)("h3",{id:"logique"},"Logique"),(0,s.kt)("p",null,"Nous d\xe9finissons ici notre premier point d'entr\xe9e, la fonction ",(0,s.kt)("inlineCode",{parentName:"p"},"instantiate()"),", o\xf9 le contrat est instanci\xe9 et re\xe7oit son message ",(0,s.kt)("inlineCode",{parentName:"p"},"InstantiateMsg"),". Nous extrayons le compte du message et \xe9tablissons notre \xe9tat initial, o\xf9 :"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"compte")," se voit attribuer le compte du message"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"propri\xe9taire")," est attribu\xe9 \xe0 l'exp\xe9diteur du MsgInstantiateContract ``")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},'// src/contract.rs\n#[cfg_attr(not(feature = "library"), entry_point)]\npub fn instantiate(\n  deps : DepsMut,\n  _env : Env,\n  info : MessageInfo,\n  msg : InstantiateMsg,\n) -> Result<Response, ContractError> {\n  let state = State {\n    count : msg.count,\n    owner : info.sender.clone(),\n  } ;\n  set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)? ;\n  STATE.save(deps.storage, &state)? ;\n\n  Ok(Response::new()\n    .add_attribute("method", "instantiate")\n    .add_attribute("owner", info.sender)\n    .add_attribute("count", msg.count.to_string()))\n}\n')),(0,s.kt)("h2",{id:"executemsg"},"ExecuteMsg"),(0,s.kt)("p",null,"Le fichier ",(0,s.kt)("inlineCode",{parentName:"p"},"ExecuteMsg")," est un message JSON transmis \xe0 la fonction ",(0,s.kt)("inlineCode",{parentName:"p"},"execute()")," par l'interm\xe9diaire d'un contrat ",(0,s.kt)("inlineCode",{parentName:"p"},"MsgExecuteContract"),". Contrairement au message ",(0,s.kt)("inlineCode",{parentName:"p"},"InstantiateMsg"),", le message ",(0,s.kt)("inlineCode",{parentName:"p"},"ExecuteMsg")," peut exister sous plusieurs types de messages diff\xe9rents, afin de tenir compte des diff\xe9rents types de fonctions qu'un contrat intelligent peut exposer \xe0 un utilisateur. La fonction ",(0,s.kt)("inlineCode",{parentName:"p"}," execute()")," d\xe9multiplexe ces diff\xe9rents types de messages vers sa logique de traitement des messages appropri\xe9e."),(0,s.kt)("h3",{id:"exemple-1"},"Exemple"),(0,s.kt)("h4",{id:"increment"},"Increment"),(0,s.kt)("p",null,"Tout utilisateur peut incr\xe9menter le compte actuel par 1."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "increment": {}\n}\n')),(0,s.kt)("h4",{id:"reset"},"Reset"),(0,s.kt)("p",null,"Seul le propri\xe9taire peut remettre le compte \xe0 un nombre sp\xe9cifique."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "reset" : {\n    "count" : 5\n  }\n}\n')),(0,s.kt)("h3",{id:"d\xe9finition-du-message-1"},"D\xe9finition du message"),(0,s.kt)("p",null,"Comme pour notre ",(0,s.kt)("inlineCode",{parentName:"p"},"ExecuteMsg"),", nous utiliserons un enum `",(0,s.kt)("inlineCode",{parentName:"p"},"pour multiplexer les diff\xe9rents types de messages que notre contrat peut comprendre . L'attribut"),"serde",(0,s.kt)("inlineCode",{parentName:"p"},"r\xe9\xe9crit nos cl\xe9s d'attribut en majuscules et en minuscules, de sorte que nous aurons"),"increment",(0,s.kt)("inlineCode",{parentName:"p"},"et"),"reset",(0,s.kt)("inlineCode",{parentName:"p"},"au lieu de"),"increment",(0,s.kt)("inlineCode",{parentName:"p"},"et"),"reset` lors de la s\xe9rialisation et de la d\xe9s\xe9rialisation \xe0 travers JSON."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},'// src/msg.rs\n#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]\n#[serde(rename_all = "snake_case")]\npub enum ExecuteMsg {\n  Increment {},\n  Reset { count: i32 },\n}\n')),(0,s.kt)("h3",{id:"logique-1"},"Logique"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},'// src/contract.rs\n#[cfg_attr(not(feature = "library"), entry_point)]\npub fn execute(\n  deps : DepsMut,\n  _env : Env,\n  info : MessageInfo,\n  msg : ExecuteMsg,\n) -> Result<Response, ContractError> {\n  match msg {\n    ExecuteMsg::Increment {} => try_increment(deps),\n    ExecuteMsg::Reset { count } => try_reset(deps, info, count),\n  }\n}\n')),(0,s.kt)("p",null,"Il s'agit de notre m\xe9thode ",(0,s.kt)("inlineCode",{parentName:"p"},"execute()")," , qui utilise la correspondance de motifs de Rust pour acheminer le message re\xe7u ",(0,s.kt)("inlineCode",{parentName:"p"},"ExecuteMsg")," vers la logique de traitement appropri\xe9e , en envoyant un appel ",(0,s.kt)("inlineCode",{parentName:"p"},"try_increment()")," ou ",(0,s.kt)("inlineCode",{parentName:"p"},"try_reset()")," en fonction du message re\xe7u."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},'pub fn try_increment(deps : DepsMut) -> Result<Response, ContractError> {\n  STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {\n    state.count = 1 ;\n    Ok(state)\n  })? ;\n\n  Ok(Response::new().add_attribute("method", "try_increment"))\n}\n')),(0,s.kt)("p",null,"Il est assez simple de suivre la logique de ",(0,s.kt)("inlineCode",{parentName:"p"},"try_increment()"),". Nous acqu\xe9rons une r\xe9f\xe9rence mutable au stockage pour mettre \xe0 jour l'\xe9l\xe9ment situ\xe9 \xe0 la cl\xe9 ",(0,s.kt)("inlineCode",{parentName:"p"},'"state"'),", rendue accessible par la fonction de commodit\xe9 ",(0,s.kt)("inlineCode",{parentName:"p"},"STATE")," d\xe9finie dans le fichier ",(0,s.kt)("inlineCode",{parentName:"p"},"src/state.rs"),". Nous mettons ensuite \xe0 jour le compte de l'\xe9tat actuel en renvoyant un r\xe9sultat ",(0,s.kt)("inlineCode",{parentName:"p"},"Ok")," avec le nouvel \xe9tat. Enfin, nous terminons l'ex\xe9cution du contrat avec un accus\xe9 de r\xe9ception en renvoyant un r\xe9sultat ",(0,s.kt)("inlineCode",{parentName:"p"},"Ok")," avec la r\xe9ponse par d\xe9faut ``."),(0,s.kt)("p",null,"Dans cet exemple, la r\xe9ponse par d\xe9faut ",(0,s.kt)("inlineCode",{parentName:"p"},"Response")," est utilis\xe9e pour des raisons de simplicit\xe9. Toutefois, la r\xe9ponse `` peut \xeatre cr\xe9\xe9e manuellement pour fournir les informations suivantes :"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"messages"),": une liste de messages. C'est l\xe0 que les contrats intelligents ex\xe9cutent d'autres contrats intelligents ou utilisent des modules natifs."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"attributs"),": une liste de paires cl\xe9-valeur pour d\xe9finir les \xe9v\xe9nements SDK \xe9mis qui peuvent \xeatre souscrits par les clients et analys\xe9s par le bloc."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"\xe9v\xe9nements"),": \xe9v\xe9nements suppl\xe9mentaires, personnalis\xe9s et distincts de l'\xe9v\xe9nement principal ",(0,s.kt)("inlineCode",{parentName:"li"},"wasm")," . Le type sera pr\xe9c\xe9d\xe9 de ",(0,s.kt)("inlineCode",{parentName:"li"},"wasm-")," . Explorateurs et applications pour signaler les \xe9v\xe9nements importants ou les changements d'\xe9tat survenus pendant l'ex\xe9cution."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"donn\xe9es"),": donn\xe9es suppl\xe9mentaires que le contrat renvoie au client.")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},'// src/contract.rs\npub fn try_reset(deps : DepsMut, info : MessageInfo, count : i32) -> Result<Response, ContractError> {\n  STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {\n    if info.sender != state.owner {\n      return Err(ContractError::Unauthorized {}) ;\n    } }\n    state.count = count ;\n    Ok(state)\n  })? ;\n  Ok(Response::new().add_attribute("method", "reset"))\n}\n')),(0,s.kt)("p",null,"La logique de la r\xe9initialisation est tr\xe8s similaire \xe0 celle de l'incr\xe9mentation, sauf que cette fois, nous v\xe9rifions d'abord que l'exp\xe9diteur du message est autoris\xe9 \xe0 invoquer la fonction de r\xe9initialisation."),(0,s.kt)("h2",{id:"querymsg"},"QueryMsg"),(0,s.kt)("h3",{id:"exemple-2"},"Exemple"),(0,s.kt)("p",null,"Le contrat type ne prend en charge qu'un seul type de ",(0,s.kt)("inlineCode",{parentName:"p"},"QueryMsg"),":"),(0,s.kt)("h4",{id:"balance"},"Balance"),(0,s.kt)("p",null,"La demande :"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "get_count": {}\n}\n')),(0,s.kt)("p",null,"Qui devrait revenir :"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "count" : 5\n}\n')),(0,s.kt)("h3",{id:"d\xe9finition-du-message-2"},"D\xe9finition du message"),(0,s.kt)("p",null,"Pour prendre en charge les requ\xeates sur notre contrat de donn\xe9es, nous devons d\xe9finir \xe0 la fois un format ",(0,s.kt)("inlineCode",{parentName:"p"},"QueryMsg")," (qui repr\xe9sente les requ\xeates ), et fournir la structure du r\xe9sultat de la requ\xeate -- ",(0,s.kt)("inlineCode",{parentName:"p"},"CountResponse")," dans ce cas. Nous devons le faire parce que ",(0,s.kt)("inlineCode",{parentName:"p"},"query()")," va renvoyer des informations \xe0 l'utilisateur par le biais de JSON dans une structure et nous devons faire conna\xeetre la forme de notre r\xe9ponse ."),(0,s.kt)("p",null,"Ajoutez ce qui suit \xe0 votre ",(0,s.kt)("inlineCode",{parentName:"p"},"src/msg.rs"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},'// src/msg.rs\n#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]\n#[serde(rename_all = "snake_case")]\npub enum QueryMsg {\n  // GetCount renvoie le compte actuel sous la forme d\'un nombre encod\xe9 en json\n  GetCount {},\n}\n\n// Nous d\xe9finissons une structure personnalis\xe9e pour chaque r\xe9ponse \xe0 une requ\xeate\n#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]\npub struct CountResponse {\n  pub count : i32,\n}\n')),(0,s.kt)("h3",{id:"logique-2"},"Logique"),(0,s.kt)("p",null,"La logique de ",(0,s.kt)("inlineCode",{parentName:"p"},"query()")," devrait \xeatre similaire \xe0 celle de ",(0,s.kt)("inlineCode",{parentName:"p"},"execute()"),", sauf que, puisque ",(0,s.kt)("inlineCode",{parentName:"p"},"query()")," est appel\xe9 sans que l'utilisateur final n'effectue de transaction, nous omettons l'argument ",(0,s.kt)("inlineCode",{parentName:"p"},"env")," car il n'y a pas d'information."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},'// src/contract.rs\n#[cfg_attr(not(feature = "library"), entry_point)]\npub fn query(deps : Deps, _env : Env, msg : QueryMsg) -> StdResult<Binary> {\n  match msg {\n    QueryMsg::GetCount {} => to_binary(&query_count(deps) ?),\n  }\n}\n\nfn query_count(deps : Deps) -> StdResult<CountResponse> {\n  let state = STATE.load(deps.storage)? ;\n  Ok(CountResponse { count: state.count })\n}\n')),(0,s.kt)("h2",{id:"\xe9laboration-du-contrat"},"\xc9laboration du contrat"),(0,s.kt)("p",null,"Pour construire votre contrat, ex\xe9cutez la commande suivante. Cela permettra de v\xe9rifier l'existence d'\xe9ventuelles erreurs pr\xe9liminaires avant d'optimiser."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"cargo wasm\n")),(0,s.kt)("h3",{id:"optimiser-votre-construction"},"Optimiser votre construction"),(0,s.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"NOTE Vous devez avoir install\xe9 ",(0,s.kt)("a",{parentName:"h5",href:"https://www.docker.com"},"Docker")," pour ex\xe9cuter cette commande. :::")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"Vous devrez vous assurer que le binaire WASM de sortie est aussi petit que possible afin de minimiser les frais et de rester sous la limite de taille de pour la blockchain. Ex\xe9cutez la commande suivante dans le r\xe9pertoire racine du dossier du projet de votre contrat intelligent Rust ."),(0,s.kt)("pre",{parentName:"div"},(0,s.kt)("code",{parentName:"pre",className:"language-sh"},'docker run --rm -v "$(pwd)":/code \\\n  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \\\n  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \\\n  cosmwasm/rust-optimizer:0.12.0\n')),(0,s.kt)("p",{parentName:"div"},"Il en r\xe9sultera une construction optimis\xe9e de ",(0,s.kt)("inlineCode",{parentName:"p"},"artifacts/my_first_contract.wasm")," dans votre r\xe9pertoire de travail."),(0,s.kt)("p",{parentName:"div"},"(Facultatif) Ajoutez la commande ci-dessus dans ",(0,s.kt)("inlineCode",{parentName:"p"},"Cargo.toml")," pour un acc\xe8s rapide."),(0,s.kt)("p",{parentName:"div"},"Cela permet d'ex\xe9cuter des commandes de script personnalis\xe9es de mani\xe8re similaire \xe0 ",(0,s.kt)("inlineCode",{parentName:"p"},"package.json")," dans l'\xe9cosyst\xe8me Node."),(0,s.kt)("p",{parentName:"div"},"Installer ",(0,s.kt)("inlineCode",{parentName:"p"},"cargo-run-script")),(0,s.kt)("pre",{parentName:"div"},(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"cargo install cargo-run-script\n")),(0,s.kt)("p",{parentName:"div"},"Ajouter le script dans ",(0,s.kt)("inlineCode",{parentName:"p"},"Cargo.toml")),(0,s.kt)("pre",{parentName:"div"},(0,s.kt)("code",{parentName:"pre",className:"language-toml"},'[package.metadata.scripts]\noptimize = "" "docker run --rm -v "$(pwd)":/code \\\n  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \\\n  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \\\n  cosmwasm/rust-optimizer:0.12.0\n"""\n')),(0,s.kt)("p",{parentName:"div"},"Ex\xe9cutez la commande :"),(0,s.kt)("pre",{parentName:"div"},(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"cargo run-script optimize\n")),(0,s.kt)("h2",{parentName:"div",id:"sch\xe9mas"},"Sch\xe9mas"),(0,s.kt)("p",{parentName:"div"},"Afin d'utiliser la g\xe9n\xe9ration automatique de sch\xe9mas JSON, nous devons enregistrer chacune des structures de donn\xe9es pour lesquelles nous avons besoin de sch\xe9mas ."),(0,s.kt)("pre",{parentName:"div"},(0,s.kt)("code",{parentName:"pre",className:"language-rust"},'// examples/schema.rs\n\nuse std ::env::current_dir ;\nuse std ::fs::create_dir_all ;\n\nuse cosmwasm_schema: :{export_schema, remove_schemas, schema_for};\n\nuse my_first_contract ::msg::{CountResponse, ExecuteMsg, InstantiateMsg, QueryMsg} ;\nuse my_first_contract ::state::State ;\n\nfn main() {\n  let mut out_dir = current_dir().unwrap() ;\n  out_dir.push("schema") ;\n  create_dir_all(&out_dir).unwrap() ;\n  remove_schemas(&out_dir).unwrap() ;\n\n  export_schema(&schema_for !(InstantiateMsg), &out_dir) ;\n  export_schema(&schema_for !(ExecuteMsg), &out_dir) ;\n  export_schema(&schema_for !(QueryMsg), &out_dir) ;\n  export_schema(&schema_for !(State), &out_dir) ;\n  export_schema(&schema_for !(CountResponse), &out_dir) ;\n}\n')),(0,s.kt)("p",{parentName:"div"},"Vous pouvez ensuite construire les sch\xe9mas avec :"),(0,s.kt)("pre",{parentName:"div"},(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"cargo schema\n")),(0,s.kt)("p",{parentName:"div"},"Vos sch\xe9mas nouvellement g\xe9n\xe9r\xe9s devraient \xeatre visibles dans votre r\xe9pertoire ",(0,s.kt)("inlineCode",{parentName:"p"},"schema/")," . Voici un exemple de ",(0,s.kt)("inlineCode",{parentName:"p"},"schema/query_msg.json"),"."),(0,s.kt)("pre",{parentName:"div"},(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "$schema" : "http://json-schema.org/draft-07/schema#",\n  " title " : "QueryMsg",\n  "anyOf" : [\n    {\n      "type" : "object",\n      "required" : [\n        "get_count"\n      ],\n      "properties" : {\n        "get_count" : {\n          "type" : "object"\n        }\n      },\n      "additionalProperties" : false\n    }\n  ]\n}\n')),(0,s.kt)("p",{parentName:"div"},"Vous pouvez utiliser un outil en ligne tel que ",(0,s.kt)("a",{parentName:"p",href:"https://www.jsonschemavalidator.net/"},"JSON Schema Validator")," pour tester votre entr\xe9e par rapport au sch\xe9ma JSON g\xe9n\xe9r\xe9."))))}d.isMDXComponent=!0}}]);