"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5895],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return p}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),u=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(i.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),m=u(n),p=r,w=m["".concat(i,".").concat(p)]||m[p]||l[p]||o;return n?a.createElement(w,s(s({ref:t},d),{},{components:n})):a.createElement(w,s({ref:t},d))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=m;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,s[1]=c;for(var u=2;u<o;u++)s[u]=n[u];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6501:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return i},metadata:function(){return u},toc:function(){return d},default:function(){return m}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),s=["components"],c={sidebar_position:5},i="Uploading and Interacting",u={unversionedId:"getting-started/interact-with-contract",id:"version-0.16/getting-started/interact-with-contract",isDocsHomePage:!1,title:"Uploading and Interacting",description:"We have the binary ready. Now it is time to see some wasm action. You can use Go CLI or",source:"@site/docs_versioned_docs/version-0.16/02-getting-started/05-interact-with-contract.md",sourceDirName:"02-getting-started",slug:"/getting-started/interact-with-contract",permalink:"/docs/0.16/getting-started/interact-with-contract",editUrl:"https://github.com/InterWasm/docs/edit/main/docs_versioned_docs/version-0.16/02-getting-started/05-interact-with-contract.md",tags:[],version:"0.16",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"version-0.16/docsSidebar",previous:{title:"Downloading and Compiling Contract",permalink:"/docs/0.16/getting-started/compile-contract"},next:{title:"Next Steps",permalink:"/docs/0.16/getting-started/next-steps"}},d=[{value:"Go CLI",id:"go-cli",children:[{value:"Instantiating the Contract",id:"instantiating-the-contract",children:[],level:3}],level:2}],l={toc:d};function m(e){var t=e.components,n=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"uploading-and-interacting"},"Uploading and Interacting"),(0,o.kt)("p",null,"We have the binary ready. Now it is time to see some wasm action. You can use ",(0,o.kt)("a",{parentName:"p",href:"#go-cli"},"Go CLI")," or\n",(0,o.kt)("a",{parentName:"p",href:"#node-console"},"Node Console")," as you wish."),(0,o.kt)("h2",{id:"go-cli"},"Go CLI"),(0,o.kt)("p",null,"We generated a wasm binary executable in the previous chapter. Let's upload the code to the blockchain. Once that is\ncomplete, you can download the bytecode to verify it."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"# see how many codes we have now\nwasmd query wasm list-code $NODE\n\n# now we store the bytecode on chain\n# gas is huge due to wasm size... but auto-zipping reduced this from 1.8M to around 600k\n# you can see the code in the result\nRES=$(wasmd tx wasm store artifacts/cw_nameservice.wasm --from wallet $TXFLAG -y)\n\n# you can also get the code this way\nCODE_ID=$(echo $RES | jq -r '.logs[0].events[-1].attributes[0].value')\n\n# no contracts yet, this should return an empty list\nwasmd query wasm list-contract-by-code $CODE_ID $NODE --output json\n\n# you can also download the wasm from the chain and check that the diff between them is empty\nwasmd query wasm code $CODE_ID $NODE download.wasm\ndiff artifacts/cw_nameservice.wasm download.wasm\n")),(0,o.kt)("h3",{id:"instantiating-the-contract"},"Instantiating the Contract"),(0,o.kt)("p",null,"We can now create an instance of this wasm contract. Here we first instentiate the contract and make some query operations on it."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'# instantiate contract and verify\nINIT=\'{"purchase_price":{"amount":"100","denom":"upebble"},"transfer_price":{"amount":"999","denom":"upebble"}}\'\nwasmd tx wasm instantiate $CODE_ID "$INIT" \\\n    --from wallet --label "awesome name service" $TXFLAG -y\n\n# check the contract state (and account balance)\nwasmd query wasm list-contract-by-code $CODE_ID $NODE --output json\nCONTRACT=$(wasmd query wasm list-contract-by-code $CODE_ID $NODE --output json | jq -r \'.contracts[-1]\')\necho $CONTRACT\n\n# we should see this contract with 50000usponge\nwasmd query wasm contract $CONTRACT $NODE\nwasmd query bank balances $CONTRACT $NODE\n\n# you can dump entire contract state\nwasmd query wasm contract-state all $CONTRACT $NODE\n\n# Note that keys are hex encoded, and val is base64 encoded.\n# To view the returned data (assuming it is ascii), try something like:\n# (Note that in many cases the binary data returned is non in ascii format, thus the encoding)\nwasmd query wasm contract-state all $CONTRACT $NODE --output "json" | jq -r \'.models[0].key\' | xxd -r -ps\nwasmd query wasm contract-state all $CONTRACT $NODE --output "json" | jq -r \'.models[0].value\' | base64 -d\n\n# or try a "smart query", executing against the contract\nwasmd query wasm contract-state smart $CONTRACT \'{}\' $NODE\n# (since we didn\'t implement any valid QueryMsg, we just get a parse error back)\n')),(0,o.kt)("p",null,"Once contract instantiated, let's register a name and transfer it with paying its price."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'# execute fails if wrong person\nREGISTER=\'{"register":{"name":"fred"}}\'\nwasmd tx wasm execute $CONTRACT "$REGISTER" \\\n    --amount 100upebble \\\n    --from wallet $TXFLAG -y\n\n# query name record\nNAME_QUERY=\'{"resolve_record": {"name": "fred"}}\'\nwasmd query wasm contract-state smart $CONTRACT "$NAME_QUERY" $NODE --output json\n# {"data":{"address":"wasm1av9uhya7ltnusvunyqay3xcv9x0nyc872cheu5"}}\n\n# buy and transfer name record to wallet2\nTRANSFER=\'{"transfer":{"name":"fred","to":"wasm1um2e88neq8sxzuuem5ztt9d0em033rpr5ps9tv"}}\'\nwasmd tx wasm execute $CONTRACT "$TRANSFER" \\\n    --amount 999upebble \\\n    --from wallet $TXFLAG -y\n')),(0,o.kt)("p",null,"Query record to see the new owner address:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'NAME_QUERY=\'{"resolve_record": {"name": "fred"}}\'\nwasmd query wasm contract-state smart $CONTRACT "$NAME_QUERY" $NODE --output json\n# {"data":{"address":"wasm1um2e88neq8sxzuuem5ztt9d0em033rpr5ps9tv"}}\n')))}m.isMDXComponent=!0}}]);