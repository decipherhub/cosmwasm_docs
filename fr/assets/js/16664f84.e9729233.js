"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5174],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return k}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),k=a,c=d["".concat(s,".").concat(k)]||d[k]||m[k]||i;return n?r.createElement(c,o(o({ref:t},u),{},{components:n})):r.createElement(c,o({ref:t},u))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5855:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return u},default:function(){return d}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:1},s="How CW Key Value Storage Works?",p={unversionedId:"storage/key-value-store",id:"storage/key-value-store",isDocsHomePage:!1,title:"How CW Key Value Storage Works?",description:"Cosmos-SDK storage as mentioned is a KV store. Each value saved under a key. The storage structured with Tree",source:"@site/tutorials/storage/key-value-store.md",sourceDirName:"storage",slug:"/storage/key-value-store",permalink:"/fr/tutorials/storage/key-value-store",editUrl:"https://github.com/InterWasm/docs/edit/main/tutorials/storage/key-value-store.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorials",previous:{title:"Introduction",permalink:"/fr/tutorials/name-service/intro"},next:{title:"Indexes",permalink:"/fr/tutorials/storage/indexes"}},u=[],m={toc:u};function d(e){var t=e.components,l=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},m,l,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"how-cw-key-value-storage-works"},"How CW Key Value Storage Works?"),(0,i.kt)("p",null,"Cosmos-SDK storage as mentioned is a KV store. Each value saved under a key. The storage structured with Tree\nmodeling. Specifically ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/cosmos/iavl"},"cosmos/iavl")," tree structure."),(0,i.kt)("p",null,"Here is an explanation of how key value storage work:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"https://en.wikipedia.org/wiki/AVL_tree#/media/File:AVL-tree-wBalance_K.svg",src:n(8805).Z}),"\n",(0,i.kt)("em",{parentName:"p"},"This is a very simplified explanation for just wrapping heads around KV store iterators.")),(0,i.kt)("p",null,"Letter inside circles are keys, and each key corresponds to a value."),(0,i.kt)("p",null,"Let's assume these are the saved key value pairs:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"J")," -> value1"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"JF")," -> value2"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"JPV")," -> value3"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"JPVA")," -> value4"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"JPVD")," -> value5"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"JPVX")," -> value6")),(0,i.kt)("p",null,"Retrieving single value with a known key is a cheap operation O(1). how to iterate over keys then?\nIteration can be done via prefixes."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"J")," key, prefixes: ",(0,i.kt)("inlineCode",{parentName:"li"},"J")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"JF")," key, prefixes: ",(0,i.kt)("inlineCode",{parentName:"li"},"J"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"JF")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"JPV")," key, prefixes: ",(0,i.kt)("inlineCode",{parentName:"li"},"J"),",",(0,i.kt)("inlineCode",{parentName:"li"},"JP"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"JPV")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"JPVA")," key, prefixes: ",(0,i.kt)("inlineCode",{parentName:"li"},"J"),",",(0,i.kt)("inlineCode",{parentName:"li"},"JP"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"JPV"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"JPVA")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"JPVD")," key, prefixes: ",(0,i.kt)("inlineCode",{parentName:"li"},"J"),",",(0,i.kt)("inlineCode",{parentName:"li"},"JP"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"JPV"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"JPVD")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"JPVX")," key, prefixes: ",(0,i.kt)("inlineCode",{parentName:"li"},"J"),",",(0,i.kt)("inlineCode",{parentName:"li"},"JP"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"JPV"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"JPVX"))),(0,i.kt)("p",null,"range(",(0,i.kt)("inlineCode",{parentName:"p"},"J"),") returns all keys because all have ",(0,i.kt)("inlineCode",{parentName:"p"},"J")," as prefix\nrange(",(0,i.kt)("inlineCode",{parentName:"p"},"JF"),") returns only ",(0,i.kt)("inlineCode",{parentName:"p"},"JF")),(0,i.kt)("p",null,"This is where it gets interesting:\nrange(",(0,i.kt)("inlineCode",{parentName:"p"},"JPV"),") returns ",(0,i.kt)("inlineCode",{parentName:"p"},"JPV"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"JPVA"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"JPVD"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"JPVX")," in order\nAs you can see ",(0,i.kt)("inlineCode",{parentName:"p"},"J")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"JF")," is not returned, because values after ",(0,i.kt)("inlineCode",{parentName:"p"},"JPV")," is requested."),(0,i.kt)("p",null,"But why ",(0,i.kt)("inlineCode",{parentName:"p"},"JPVA")," returned?"),(0,i.kt)("p",null,"Keys saved to storage as fixed length. The representation of ",(0,i.kt)("inlineCode",{parentName:"p"},"JPVA")," in storage is (assuming keys are 8 chars)\n",(0,i.kt)("inlineCode",{parentName:"p"},"JPVA0000"),". Range request translates to in the background: iterate from ",(0,i.kt)("inlineCode",{parentName:"p"},"JPV00000")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"JPVFFFFF"),". ",(0,i.kt)("inlineCode",{parentName:"p"},"JPVA")," and others\nare falls into this range. Also range query can be run in reverse."),(0,i.kt)("p",null,"These are the only two functionalities there are: get single value, iterate."),(0,i.kt)("p",null,"Most of the time complex relations between data structures must be established, but all we have this limited key value\nstorage."),(0,i.kt)("p",null,"This is done by building ",(0,i.kt)("a",{parentName:"p",href:"/fr/tutorials/storage/indexes"},"indexes"),"."))}d.isMDXComponent=!0},8805:function(e,t,n){t.Z=n.p+"assets/images/AVL-tree-wBalance_K.svg-41d7e180632848d879a70f16ea93281b.png"}}]);