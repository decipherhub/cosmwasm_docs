"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4518],{3905:function(e,n,o){o.d(n,{Zo:function(){return l},kt:function(){return u}});var t=o(7294);function r(e,n,o){return n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}function a(e,n){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),o.push.apply(o,t)}return o}function s(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?a(Object(o),!0).forEach((function(n){r(e,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))}))}return e}function i(e,n){if(null==e)return{};var o,t,r=function(e,n){if(null==e)return{};var o,t,r={},a=Object.keys(e);for(t=0;t<a.length;t++)o=a[t],n.indexOf(o)>=0||(r[o]=e[o]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)o=a[t],n.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var c=t.createContext({}),p=function(e){var n=t.useContext(c),o=n;return e&&(o="function"==typeof e?e(n):s(s({},n),e)),o},l=function(e){var n=p(e.components);return t.createElement(c.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},d=t.forwardRef((function(e,n){var o=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),d=p(o),u=r,g=d["".concat(c,".").concat(u)]||d[u]||m[u]||a;return o?t.createElement(g,s(s({ref:n},l),{},{components:o})):t.createElement(g,s({ref:n},l))}));function u(e,n){var o=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=o.length,s=new Array(a);s[0]=d;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var p=2;p<a;p++)s[p]=o[p];return t.createElement.apply(null,s)}return t.createElement.apply(null,o)}d.displayName="MDXCreateElement"},9132:function(e,n,o){o.r(n),o.d(n,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return l},default:function(){return d}});var t=o(7462),r=o(3366),a=(o(7294),o(3905)),s=["components"],i={sidebar_position:12},c="Code Pinning",p={unversionedId:"smart-contracts/components/code-pinning",id:"smart-contracts/components/code-pinning",title:"Code Pinning",description:"Code Pinning mechanism allows codes to be pinned to the memory. This way code does not have to be loaded to memory on",source:"@site/docs/04-smart-contracts/02-components/12-code-pinning.md",sourceDirName:"04-smart-contracts/02-components",slug:"/smart-contracts/components/code-pinning",permalink:"/fr/docs/1.0/smart-contracts/components/code-pinning",editUrl:"https://github.com/InterWasm/docs/edit/main/docs/04-smart-contracts/02-components/12-code-pinning.md",tags:[],version:"current",sidebarPosition:12,frontMatter:{sidebar_position:12},sidebar:"docsSidebar",previous:{title:"Migration",permalink:"/fr/docs/1.0/smart-contracts/components/migration"},next:{title:"Verifying Smart Contracts",permalink:"/fr/docs/1.0/smart-contracts/verify"}},l=[{value:"Proposal",id:"proposal",children:[{value:"<em>PinCodesProposal</em>",id:"pincodesproposal",children:[],level:3},{value:"<em>UnpinCodesProposal</em>",id:"unpincodesproposal",children:[],level:3}],level:2}],m={toc:l};function d(e){var n=e.components,o=(0,r.Z)(e,s);return(0,a.kt)("wrapper",(0,t.Z)({},m,o,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"code-pinning"},"Code Pinning"),(0,a.kt)("p",null,"Code Pinning mechanism allows codes to be pinned to the memory. This way code does not have to be loaded to memory on\neach execution thus makes ~x40 performance(this is an estimation, has to be benchmarked)."),(0,a.kt)("p",null,"Code pinning is done through native chain governance."),(0,a.kt)("h2",{id:"proposal"},"Proposal"),(0,a.kt)("h3",{id:"pincodesproposal"},(0,a.kt)("em",{parentName:"h3"},"PinCodesProposal")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-gogoproto"},'// PinCodesProposal gov proposal content type to pin a set of code ids in the\n// wasmvm cache.\nmessage PinCodesProposal {\n  // Title is a short summary\n  string title = 1 [ (gogoproto.moretags) = "yaml:\\"title\\"" ];\n  // Description is a human readable text\n  string description = 2 [ (gogoproto.moretags) = "yaml:\\"description\\"" ];\n  // CodeIDs references the new WASM codes\n  repeated uint64 code_ids = 3 [\n    (gogoproto.customname) = "CodeIDs",\n    (gogoproto.moretags) = "yaml:\\"code_ids\\""\n  ];\n}\n')),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/wasmd/blob/v0.23.0/proto/cosmwasm/wasm/v1/proposal.proto#L126-L136"},(0,a.kt)("em",{parentName:"a"},"reference"))),(0,a.kt)("p",null,"You can create the proposal using client:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'wasmd tx gov submit-proposal pin-codes 1 --from wallet --title "Pin code 1" --description "Pin code 1 plss"\n')),(0,a.kt)("h3",{id:"unpincodesproposal"},(0,a.kt)("em",{parentName:"h3"},"UnpinCodesProposal")),(0,a.kt)("p",null,"You can unpin codes:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-gogoproto"},'// UnpinCodesProposal gov proposal content type to unpin a set of code ids in\n// the wasmvm cache.\nmessage UnpinCodesProposal {\n  // Title is a short summary\n  string title = 1 [ (gogoproto.moretags) = "yaml:\\"title\\"" ];\n  // Description is a human readable text\n  string description = 2 [ (gogoproto.moretags) = "yaml:\\"description\\"" ];\n  // CodeIDs references the WASM codes\n  repeated uint64 code_ids = 3 [\n    (gogoproto.customname) = "CodeIDs",\n    (gogoproto.moretags) = "yaml:\\"code_ids\\""\n  ];\n}\n')),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/CosmWasm/wasmd/blob/v0.23.0/proto/cosmwasm/wasm/v1/proposal.proto#L138-L150"},(0,a.kt)("em",{parentName:"a"},"reference"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},' wasmd tx gov submit-proposal unpin-codes 1 --title "Unpin code 1" --description "Unpin code 1 plss" --from wallet\n')))}d.isMDXComponent=!0}}]);