"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7368],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(n),d=o,h=m["".concat(l,".").concat(d)]||m[d]||p[d]||a;return n?r.createElement(h,i(i({ref:t},u),{},{components:n})):r.createElement(h,i({ref:t},u))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7318:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return m}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],s={title:"Introduction"},l="Introduction",c={unversionedId:"name-service/intro",id:"name-service/intro",isDocsHomePage:!1,title:"Introduction",description:"The Cosmos SDK has a good standard tutorial,",source:"@site/tutorials/name-service/intro.md",sourceDirName:"name-service",slug:"/name-service/intro",permalink:"/tutorials/name-service/intro",editUrl:"https://github.com/InterWasm/docs/edit/main/tutorials/name-service/intro.md",tags:[],version:"current",frontMatter:{title:"Introduction"},sidebar:"tutorials",previous:{title:"Smart Contracts Over Governance",permalink:"/tutorials/governance"},next:{title:"How CW Key Value Storage Works?",permalink:"/tutorials/storage/key-value-store"}},u=[{value:"Goal",id:"goal",children:[],level:2}],p={toc:u};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"introduction"},"Introduction"),(0,a.kt)("p",null,"The Cosmos SDK has ",(0,a.kt)("a",{parentName:"p",href:"https://tutorials.cosmos.network/nameservice/tutorial/00-intro.html"},"a good standard tutorial"),",\nwhich builds out a sample name service application. To provide a nice transition for existing SDK developers, we will\ndemonstrate implementing the same application using CosmWasm. This is a useful tutorial to demonstrate basic concepts\nand applying the skills that you learned in the introduction. We will also be producing another tutorial for deploying\nand using an ERC20 contract, which may be more familiar to those coming from an Ethereum background."),(0,a.kt)("h2",{id:"goal"},"Goal"),(0,a.kt)("p",null,"As in the ",(0,a.kt)("a",{parentName:"p",href:"https://tutorials.cosmos.network/nameservice/tutorial/00-intro.html"},"original tutorial"),", you will build a\nfunctional application running on ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/"},"Cosmos SDK"),". In this case we will\nuse ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/cosmwasm"},(0,a.kt)("inlineCode",{parentName:"a"},"cosmwasm"))," to deploy a rust contract rather than develop a native go module.\nIn the process, learn the basic concepts and structures of CosmWasm. The example will showcase how quickly and easily\ncustomize a ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/wasmd"},"default Cosmos SDK application")," using CosmWasm smart contracts."),(0,a.kt)("p",null,"By the end of this tutorial you will have a functional ",(0,a.kt)("inlineCode",{parentName:"p"},"nameservice")," application, a mapping of strings to other\nstrings (",(0,a.kt)("inlineCode",{parentName:"p"},"map[string]string"),"). This is similar to ",(0,a.kt)("a",{parentName:"p",href:"https://namecoin.org/"},"Namecoin"),", ",(0,a.kt)("a",{parentName:"p",href:"https://ens.domains/"},"ENS"),"\n, ",(0,a.kt)("a",{parentName:"p",href:"https://iov.one"},"IOV"),", or ",(0,a.kt)("a",{parentName:"p",href:"https://handshake.org/"},"Handshake"),", which all model the traditional DNS\nsystems (",(0,a.kt)("inlineCode",{parentName:"p"},"map[domain]zonefile"),"). Users will be able to buy unused names, or sell/trade their name."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Coming Soon")))}m.isMDXComponent=!0}}]);