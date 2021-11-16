"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[129],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=p(n),m=a,f=d["".concat(c,".").concat(m)]||d[m]||l[m]||s;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var p=2;p<s;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6184:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return u},default:function(){return d}});var r=n(7462),a=n(3366),s=(n(7294),n(3905)),o=["components"],i={sidebar_position:2},c="CW4 Group",p={unversionedId:"cw4/cw4-group-spec",id:"cw4/cw4-group-spec",isDocsHomePage:!1,title:"CW4 Group",description:"cw4-group source",source:"@site/cw-plus/cw4/cw4-group-spec.md",sourceDirName:"cw4",slug:"/cw4/cw4-group-spec",permalink:"/fr/cw-plus/0.9.0/cw4/cw4-group-spec",editUrl:"https://github.com/InterWasm/docs/edit/main/cw-plus/cw4/cw4-group-spec.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"cwPlus",previous:{title:"CW4 Spec: Group Members",permalink:"/fr/cw-plus/0.9.0/cw4/spec"},next:{title:"CW4 Stake",permalink:"/fr/cw-plus/0.9.0/cw4/cw4-stake-spec"}},u=[{value:"Init",id:"init",children:[],level:2},{value:"Messages",id:"messages",children:[],level:2}],l={toc:u};function d(e){var t=e.components,n=(0,a.Z)(e,o);return(0,s.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"cw4-group"},"CW4 Group"),(0,s.kt)("p",null,"cw4-group source\ncode: ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/cw-plus/tree/master/contracts/cw4-group"},"https://github.com/CosmWasm/cw-plus/tree/master/contracts/cw4-group")),(0,s.kt)("p",null,"This is a basic implementation of the ",(0,s.kt)("a",{parentName:"p",href:"/fr/cw-plus/0.9.0/cw4/spec"},"cw4 spec"),". It fulfills all elements of the spec, including the raw query\nlookups, and it designed to be used as a backing storage for\n",(0,s.kt)("a",{parentName:"p",href:"/fr/cw-plus/0.9.0/cw3/spec"},"cw3 compliant contracts"),"."),(0,s.kt)("p",null,"It stores a set of members along with an admin, and allows the admin to update the state. Raw queries (intended for\ncross-contract queries)\ncan check a given member address and the total weight. Smart queries (designed for client API) can do the same, and also\nquery the admin address as well as paginate over all members."),(0,s.kt)("h2",{id:"init"},"Init"),(0,s.kt)("p",null,"To create it, you must pass in a list of members, as well as an optional\n",(0,s.kt)("inlineCode",{parentName:"p"},"admin"),", if you wish it to be mutable."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct InitMsg {\n  pub admin: Option<HumanAddr>,\n  pub members: Vec<Member>,\n}\n\npub struct Member {\n  pub addr: HumanAddr,\n  pub weight: u64,\n}\n")),(0,s.kt)("p",null,"Members are defined by an address and a weight. This is transformed and stored under their ",(0,s.kt)("inlineCode",{parentName:"p"},"CanonicalAddr"),", in a format\ndefined in\n",(0,s.kt)("a",{parentName:"p",href:"/fr/cw-plus/0.9.0/cw4/spec#raw"},"cw4 raw queries"),"."),(0,s.kt)("p",null,"Note that 0 ",(0,s.kt)("em",{parentName:"p"},"is an allowed weight"),". This doesn't give any voting rights, but it does define this address is part of the\ngroup. This could be used in e.g. a KYC whitelist to say they are allowed, but cannot participate in decision-making."),(0,s.kt)("h2",{id:"messages"},"Messages"),(0,s.kt)("p",null,"Basic update messages, queries, and hooks are defined by the\n",(0,s.kt)("a",{parentName:"p",href:"/fr/cw-plus/0.9.0/cw4/spec"},"cw4 spec"),". Please refer to it for more info."),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"cw4-group")," adds one message to control the group membership:"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"UpdateMembers{add, remove}")," - takes a membership diff and adds/updates the members, as well as removing any provided\naddresses. If an address is on both lists, it will be removed. If it appears multiple times in ",(0,s.kt)("inlineCode",{parentName:"p"},"add"),", only the last\noccurrence will be used."))}d.isMDXComponent=!0}}]);