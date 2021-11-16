"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1609],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return h}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=a.createContext({}),l=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,c=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),p=l(n),h=o,d=p["".concat(c,".").concat(h)]||p[h]||u[h]||r;return n?a.createElement(d,i(i({ref:t},m),{},{components:n})):a.createElement(d,i({ref:t},m))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=p;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<r;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},2839:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return m},default:function(){return p}});var a=n(7462),o=n(3366),r=(n(7294),n(3905)),i=["components"],s={sidebar_position:1},c="What are Multi-Chain Contracts?",l={unversionedId:"architecture/multichain",id:"architecture/multichain",isDocsHomePage:!1,title:"What are Multi-Chain Contracts?",description:"CosmWasm is designed and built from the ground-up to be a multi-chain solution for smart contracts. As it comes from the",source:"@site/docs/03-architecture/01-multichain.md",sourceDirName:"03-architecture",slug:"/architecture/multichain",permalink:"/fr/docs/1.0/architecture/multichain",editUrl:"https://github.com/InterWasm/docs/edit/main/docs/03-architecture/01-multichain.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Next Steps",permalink:"/fr/docs/1.0/getting-started/next-steps"},next:{title:"Actor Model",permalink:"/fr/docs/1.0/architecture/actor"}},m=[{value:"Different Chain, Same Contract",id:"different-chain-same-contract",children:[],level:2},{value:"Inter Blockchain Contracts",id:"inter-blockchain-contracts",children:[],level:2},{value:"Easy to Integrate",id:"easy-to-integrate",children:[],level:2},{value:"Platform to Build On",id:"platform-to-build-on",children:[],level:2}],u={toc:m};function p(e){var t=e.components,n=(0,o.Z)(e,i);return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"what-are-multi-chain-contracts"},"What are Multi-Chain Contracts?"),(0,r.kt)("p",null,"CosmWasm is designed and built from the ground-up to be a multi-chain solution for smart contracts. As it comes from the\nCosmos ecosystem, it is designed for networks of blockchains, rather than siloed chains. But what exactly do we mean by\nmulti-chain?"),(0,r.kt)("h2",{id:"different-chain-same-contract"},"Different Chain, Same Contract"),(0,r.kt)("p",null,"Since we make little requirements of the host application, it is easy for any Cosmos SDK app to embed the ",(0,r.kt)("inlineCode",{parentName:"p"},"wasm")," module\nand customize the permissioning or fees as they wish. All code is designed to be agnostic to the details of the\nunderlying chain, so just by writing a CosmWasm contract, you will soon be able to run on different chains on the Cosmos\necosystem."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://regen.network"},"Regen Network")," plans to include CosmWasm support at launch. A number of other chains are adding\nthis support."),(0,r.kt)("h2",{id:"inter-blockchain-contracts"},"Inter Blockchain Contracts"),(0,r.kt)("p",null,"If you have heard anything about Cosmos, it is most likely\nabout ",(0,r.kt)("a",{parentName:"p",href:"https://ibcprotocol.org/"},"Inter-Blockchain Communication"),". The power\nof ",(0,r.kt)("a",{parentName:"p",href:"https://tendermint.com"},"Tendermint BFT consensus")," and\ntheir ",(0,r.kt)("a",{parentName:"p",href:"https://blog.cosmos.network/what-does-the-launch-of-cosmos-mean-for-the-blockchain-ecosystem-952e14f67d0d"},"novel bonded proof of stake algorithm"),"\nare the foundation for a revolutionary protocol to allow trustless message passing semantics between blockchains. No\nmiddleman, no timing issue, full security."),(0,r.kt)("p",null,"The potential means code on one chain can execute a transaction on another chain. But the code must be designed around a\nmessage-passing idiom. CosmWasm fully embraces the ",(0,r.kt)("a",{parentName:"p",href:"./actor"},"actor model")," and lends itself to IBC use. Messages are\nfire-and-forget, rather than awaiting a promise and worrying about race conditions and reentrancy attacks. As IBC\nstabilizes, we will be adding first class support for IBC primitives into\nthe ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/cosmwasm"},"CosmWasm")," libraries, as well as\nthe ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/wasmd/tree/master/x/wasm"},"Cosmos SDK module")," that hosts it."),(0,r.kt)("h2",{id:"easy-to-integrate"},"Easy to Integrate"),(0,r.kt)("p",null,"Another design goal of CosmWasm was to be more of a library than a framework. This means it has a small surface area of\nrequired APIs and you can opt-in to most of the code. It is there to make life easy for you, but you can easily build it\nyour own way as well."),(0,r.kt)("p",null,"This has two big benefits:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"It makes it easier to add support for multiple languages to write contracts in. So we can add support\nfor say, ",(0,r.kt)("a",{parentName:"p",href:"https://www.assemblyscript.org"},"AssemblyScript")," or ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/golang/go"},"Go"),", for those who\nprefer not to write in Rust.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Since it makes limited demands of the host system, it can be embedded in other frameworks,\nnot just the Cosmos SDK. The core runtime logic ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/cosmwasm/tree/main/packages/vm"},(0,r.kt)("inlineCode",{parentName:"a"},"cosmwasm-vm")),"\nis in Rust, and ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/wasmvm"},(0,r.kt)("inlineCode",{parentName:"a"},"wasmvm"))," provides a generic Go binding to it. As Go and\nRust are two of the most popular languages to write blockchains, this opens the door for many integrations. Of course,\nunless your chain is running on top of ",(0,r.kt)("a",{parentName:"p",href:"https://tendermint.com"},"Tendermint")," or potentially another BFT Instant Finality\nConsensus algorithm like ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/mosaicnetworks/babble"},"Babble"),", the contracts will not be able to interact via IBC."))),(0,r.kt)("h2",{id:"platform-to-build-on"},"Platform to Build On"),(0,r.kt)("p",null,"CosmWasm doesn't want to lock you to one blockchain, or even one programming language. It is designed to be adaptable to\nmany environments, and ",(0,r.kt)("em",{parentName:"p"},"connect")," blockchains. This makes it a solid platform to build on. Even if one chain doesn't pan\nout well, all your smart contracts and dApps can quickly be transferred to another chain. Or if your app grows quickly,\nyou can launch your own chain to deploy the next version of the contracts, and transfer all existing tokens to your new\nchain via IBC. The possibilities are only limited by your imagination."))}p.isMDXComponent=!0}}]);