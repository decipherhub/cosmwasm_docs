"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5829],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),m=p(n),d=o,f=m["".concat(c,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(f,s(s({ref:t},l),{},{components:n})):r.createElement(f,s({ref:t},l))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var p=2;p<a;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3804:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return l},default:function(){return m}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),s=["components"],i={sidebar_position:6},c="Events",p={unversionedId:"smart-contracts/components/events",id:"smart-contracts/components/events",isDocsHomePage:!1,title:"Events",description:"Most entry point functions return a type of Result.",source:"@site/docs/04-smart-contracts/02-components/06-events.md",sourceDirName:"04-smart-contracts/02-components",slug:"/smart-contracts/components/events",permalink:"/fr/docs/1.0/smart-contracts/components/events",editUrl:"https://github.com/InterWasm/docs/edit/main/docs/04-smart-contracts/02-components/06-events.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"docsSidebar",previous:{title:"Query",permalink:"/fr/docs/1.0/smart-contracts/components/query"},next:{title:"Math",permalink:"/fr/docs/1.0/smart-contracts/components/math"}},l=[],u={toc:l};function m(e){var t=e.components,n=(0,o.Z)(e,s);return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"events"},"Events"),(0,a.kt)("p",null,"Most entry point functions return a type of ",(0,a.kt)("inlineCode",{parentName:"p"},"Result<Response, ContractError>"),"."),(0,a.kt)("p",null,"Within this, ",(0,a.kt)("inlineCode",{parentName:"p"},"Response")," is a wrapper around ",(0,a.kt)("a",{parentName:"p",href:"https://docs.cosmos.network/v0.42/core/events.html"},"Events")," in the Cosmos\nSDK."),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"Response")," type should be returned as the successful result of a contract entry point (i.e. ",(0,a.kt)("inlineCode",{parentName:"p"},"instantiate"),"\nor ",(0,a.kt)("inlineCode",{parentName:"p"},"execute"),"). You can declare it as mutable and add to it in the function body, but a more common pattern is to\nconstruct it at the end and return it, if all computation has succeeded. In the examples that follow, it is wrapped\nby ",(0,a.kt)("inlineCode",{parentName:"p"},"Ok")," as it is being returned as part of a function that is returning the ",(0,a.kt)("inlineCode",{parentName:"p"},"Result")," type, with ",(0,a.kt)("inlineCode",{parentName:"p"},"Response")," representing\nthe ",(0,a.kt)("inlineCode",{parentName:"p"},"Right")," or success branch."),(0,a.kt)("p",null,"The exception to this is ",(0,a.kt)("inlineCode",{parentName:"p"},"query"),", which will return ",(0,a.kt)("inlineCode",{parentName:"p"},"StdResult<Binary>")," due to the Cosmos SDK interface."),(0,a.kt)("p",null,"The source for Response\ncan ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/cosmwasm/blob/main/packages/std/src/results/response.rs#L65"},"help to understand it better"),"\n."),(0,a.kt)("p",null,"The most simple usage of ",(0,a.kt)("inlineCode",{parentName:"p"},"Response")," is as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"Ok(Response::default ())\n")),(0,a.kt)("p",null,"This is common\nin ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/cw-plus/blob/main/contracts/cw20-base/src/contract.rs#L151"},"instantiate functions"),",\nwhere no message is returned to the client."),(0,a.kt)("p",null,"However, in most ",(0,a.kt)("inlineCode",{parentName:"p"},"execute")," handling cases, a ",(0,a.kt)("inlineCode",{parentName:"p"},"Response")," should be returned:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},'let res = Response::new()\n.add_attribute("action", "transfer")\n.add_attribute("from", info.sender)\n.add_attribute("to", recipient)\n.add_attribute("amount", amount);\nOk(res)\n')),(0,a.kt)("p",null,"There's a bit more going on here, so let's unpack it. You can find the\nsource ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/cw-plus/blob/main/contracts/cw20-base/src/contract.rs#L239"},"here"),"."),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"A new ",(0,a.kt)("inlineCode",{parentName:"li"},"Response")," is created"),(0,a.kt)("li",{parentName:"ol"},"Several key/value pairs are added"),(0,a.kt)("li",{parentName:"ol"},"This is returned wrapped in a ",(0,a.kt)("inlineCode",{parentName:"li"},"Result")," type using ",(0,a.kt)("inlineCode",{parentName:"li"},"Ok"))),(0,a.kt)("p",null,"If you're calling your contract via the command-line interface (CLI) you will see them logged as part of the ",(0,a.kt)("inlineCode",{parentName:"p"},'"raw_log"'),"\nresponse, alongside other SDK events."),(0,a.kt)("p",null,"Instead of just adding attributes, ",(0,a.kt)("inlineCode",{parentName:"p"},".add_event")," can be used to add an unwrapped event."),(0,a.kt)("p",null,"These events can be interacted with by other clients or contracts."))}m.isMDXComponent=!0}}]);