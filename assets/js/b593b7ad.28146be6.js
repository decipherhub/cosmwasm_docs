"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6289],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(n),m=o,g=d["".concat(c,".").concat(m)]||d[m]||u[m]||i;return n?r.createElement(g,a(a({ref:t},p),{},{components:n})):r.createElement(g,a({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2887:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return p},default:function(){return d}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],s={sidebar_position:4},c="Downloading and Compiling Contract",l={unversionedId:"getting-started/compile-contract",id:"version-0.16/getting-started/compile-contract",isDocsHomePage:!1,title:"Downloading and Compiling Contract",description:"In this section, we will download a sample contract, and compile to it to a wasm binary executable.",source:"@site/docs_versioned_docs/version-0.16/02-getting-started/04-compile-contract.md",sourceDirName:"02-getting-started",slug:"/getting-started/compile-contract",permalink:"/docs/0.16/getting-started/compile-contract",editUrl:"https://github.com/InterWasm/docs/edit/main/docs_versioned_docs/version-0.16/02-getting-started/04-compile-contract.md",tags:[],version:"0.16",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"version-0.16/docsSidebar",previous:{title:"Setting Up Environment",permalink:"/docs/0.16/getting-started/setting-env"},next:{title:"Uploading and Interacting",permalink:"/docs/0.16/getting-started/interact-with-contract"}},p=[{value:"Compiling and Testing Contract",id:"compiling-and-testing-contract",children:[],level:2},{value:"Unit Tests",id:"unit-tests",children:[],level:2},{value:"Optimized Compilation",id:"optimized-compilation",children:[],level:2}],u={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"downloading-and-compiling-contract"},"Downloading and Compiling Contract"),(0,i.kt)("p",null,"In this section, we will download a sample contract, and compile to it to a wasm binary executable."),(0,i.kt)("p",null,"Please first review the ",(0,i.kt)("a",{parentName:"p",href:"/docs/0.16/getting-started/setting-env"},"client setup instructions"),", and configure a client before proceeding. Either\nthe Node.js REPL or Go CLI will work."),(0,i.kt)("h2",{id:"compiling-and-testing-contract"},"Compiling and Testing Contract"),(0,i.kt)("p",null,"Let's download the repo in which we collect\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/cw-examples"},(0,i.kt)("inlineCode",{parentName:"a"},"cw-examples"))," and try out an existing simple name service contract where\nmimics a name service marketplace. Also this tutorials is the defacto cosmos-sdk entrance tutorial. First, clone the\nrepo and try to build the wasm bundle:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# get the code\ngit clone https://github.com/InterWasm/cw-contracts\ncd cw-contracts\ngit fetch --tags\ngit checkout nameservice-0.11.0\ncd contracts/nameservice\n\n# compile the wasm contract with stable toolchain\nrustup default stable\ncargo wasm\n")),(0,i.kt)("p",null,"After this compiles, it should produce a file in\n",(0,i.kt)("inlineCode",{parentName:"p"},"target/wasm32-unknown-unknown/release/cw_nameservice.wasm"),". A quick ",(0,i.kt)("inlineCode",{parentName:"p"},"ls -lh")," should show around 1.7MB. This is a\nrelease build, but not stripped of all unneeded code. To produce a much smaller version, you can run this which tells\nthe compiler to strip all unused code out:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"RUSTFLAGS='-C link-arg=-s' cargo wasm\n")),(0,i.kt)("p",null,"This produces a file about 162kB. We use this and another optimizer in the next ",(0,i.kt)("a",{parentName:"p",href:"#optimized-compilation"},"last section"),"\nto produce the final product uploaded to the blockchain. You don't need to worry about running this yourself (unless you\nare curious), but you should have an idea of the final size of your contract this way."),(0,i.kt)("h2",{id:"unit-tests"},"Unit Tests"),(0,i.kt)("p",null,"Let's try running the unit tests:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"RUST_BACKTRACE=1 cargo unit-test\n")),(0,i.kt)("p",null,"After some compilation steps, you should see:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},"running 5 tests\ntest contract::tests::cannot_initialize_expired ... ok\ntest contract::tests::proper_initialization ... ok\ntest contract::tests::init_and_query ... ok\ntest contract::tests::handle_refund ... ok\ntest contract::tests::handle_approve ... ok\n\ntest result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"RUST_BACKTRACE=1")," will provide you with full stack traces on any error, which is super useful. This only works for unit\ntests (which test native rust code, not the compiled wasm). Also, if you want to know where ",(0,i.kt)("inlineCode",{parentName:"p"},"cargo wasm"),"\nand ",(0,i.kt)("inlineCode",{parentName:"p"},"cargo unit-test")," come from, they are just aliases defined in ",(0,i.kt)("inlineCode",{parentName:"p"},".cargo/config"),". Take a look there to understand the\ncargo flags better."),(0,i.kt)("h2",{id:"optimized-compilation"},"Optimized Compilation"),(0,i.kt)("p",null,"To reduce gas costs, the binary size should be as small as possible. This will result in a less costly deployment, and\nlower fees on every interaction. Luckily, there is tooling to help with this. You can ",(0,i.kt)("strong",{parentName:"p"},"optimize production code")," using\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/rust-optimizer"},"cosmwasm/rust-optimizer"),". ",(0,i.kt)("strong",{parentName:"p"},"rust-optimizer")," produces reproducible builds\nof cosmwasm smart contracts. This means third parties can verify the contract is actually the claimed code."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'docker run --rm -v "$(pwd)":/code \\\n  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \\\n  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \\\n  cosmwasm/rust-optimizer:0.11.3\n')),(0,i.kt)("p",null,"Binary will be at ",(0,i.kt)("inlineCode",{parentName:"p"},"artifacts")," and its size will be ",(0,i.kt)("inlineCode",{parentName:"p"},"137k"),"."))}d.isMDXComponent=!0}}]);