(function(t){function e(e){for(var r,o,a=e[0],u=e[1],c=e[2],h=0,p=[];h<a.length;h++)o=a[h],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&p.push(i[o][0]),i[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);l&&l(e);while(p.length)p.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,a=1;a<n.length;a++){var u=n[a];0!==i[u]&&(r=!1)}r&&(s.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},i={app:0},s=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/doble9/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var l=u;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"07a7":function(t,e,n){},3107:function(t,e,n){},5387:function(t,e,n){"use strict";var r=n("a30d"),i=n.n(r);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Game",{attrs:{players:4,quantity:10}})],1)},s=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"game",on:{dblclick:t.changeTurn}},[n("Board",{staticClass:"board-area",attrs:{moves:t.board,start:t.start},on:{click:t.play}}),t._l(t.stack,(function(e,r){return n("Player",{key:r,class:e.class,attrs:{pieces:e.pieces,position:e.position,visible:"bottom"===e.position||t.gameOver,name:e.name,id:e.id,turn:t.turn===e.id||t.gameOver},on:{click:t.prePlay}})}))],2)},a=[],u=(n("c740"),n("c975"),n("13d5"),n("a434"),n("a9e3"),n("53ca")),c=n("b85c"),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"board"},t._l(t.board(),(function(e,r){return n("Piece",{key:r,style:e.style,attrs:{number:e.number,corner:e.corner,angle:e.angle,visible:e.visible,ghost:e.ghost},on:{click:function(n){return t.$emit("click",e,r)}}})})),1)},h=[],p=(n("99af"),n("fb6a"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tile",style:t.style,on:{click:t.click,mouseenter:t.mouseEnter,mouseleave:t.mouseLeave}},[t.visible?n("div",{class:t.className(t.sideA)},t._l(t.sideA,(function(t){return n("span",{key:t,staticClass:"tile-dot"})})),0):t._e(),t.visible?n("span",{staticClass:"tile-divider"}):t._e(),t.visible?n("div",{class:t.className(t.sideB)},t._l(t.sideB,(function(t){return n("span",{key:t,staticClass:"tile-dot"})})),0):t._e()])}),f=[];function d(t){return parseInt(t)}function m(t){return Math.round(10*(t-parseInt(t)))}function b(t){return d(t)===m(t)}function v(t,e){return d(t)===d(e)&&m(t)===m(e)||d(t)===m(e)&&m(t)===d(e)}function y(t,e,n){var r,i=e[0],s=e[e.length-1],o=[],a=Object(c["a"])(t);try{for(a.s();!(r=a.n()).done;){var u=r.value,l=d(u),h=m(u),p=b(u);d(i.number)===h&&o.push({position:"left",number:u}),d(i.number)!==l||p||o.push({position:"left",number:h+l/10}),m(s.number)===h&&o.push({position:"right",number:h+l/10}),m(s.number)!==l||p||o.push({position:"right",number:u})}}catch(f){a.e(f)}finally{a.f()}return 0===n?(o.sort((function(){return Math.random()-.5})),o.pop()):1===n&&(o.sort((function(t,e){return d(t.number)+m(t.number)>d(e.number)+m(e.number)?1:-1})),o.pop())}var g={data:function(){return{hover:!1}},props:{number:{type:Number,default:9.9},angle:{type:Number,default:null},visible:{type:Boolean,default:!0},ghost:{type:Boolean,default:!1},animate:{type:Boolean,default:!1}},computed:{sideA:function(){return d(this.number)},sideB:function(){return m(this.number)},style:function(){var t=null!==this.angle?this.angle:-90,e=4,n=Math.round(Math.sin(t*(Math.PI/180))*e,2),r=Math.round(Math.cos(t*(Math.PI/180))*e,2),i="";return this.animate&&this.visible&&this.hover&&!this.ghost&&(i="translateY(-10px)"),{transform:"rotate(".concat(t,"deg) scale(0.8) ").concat(i),boxShadow:"".concat(n,"px ").concat(r,"px 4px 1px rgba(65, 49, 43, 0.5), ").concat(n,"px ").concat(r,"px 0px 0px rgba(65, 49, 43, 0.5)"),opacity:this.ghost&&!this.hover?.35:1,transition:this.animate?"all 0.3s":"none"}}},methods:{click:function(){this.$emit("click",this.number)},className:function(t){return"tile-number tile-number--"+t},mouseEnter:function(){this.hover=!0},mouseLeave:function(){this.hover=!1}}},k=g,P=(n("d826"),n("2877")),x=Object(P["a"])(k,p,f,!1,null,null,null),O=x.exports,w={components:{Piece:O},props:{start:Number,moves:{type:Array,default:function(){return[]}}},methods:{createTiles:function(t,e,n,r,i){var s,o=[],a=e,u=11,l=r,h=0,p=0,f=!1,d=!1,m=-1===i&&b(this.moves[n].number),v=!1,y=!1,g=0,k=15,P=Object(c["a"])(t);try{for(P.s();!(s=P.n()).done;){var x=s.value;d=b(x.number),f=!d&&!m&&!y&&g>k,1===l&&y||(a+=1===l&&m&&!v||-1===l&&(d||f||y)?2*l:4*l),d&&y&&(a-=l),f&&!d&&(u+=i),f||d&&!y?(h=2,p=0):(h=4,p=90*l*i*-1,v=d);var O={angle:p,corner:f,number:x.number,player:x.player,ghost:x.ghost,visible:!0,style:"grid-row: ".concat(u,"; grid-column: ").concat(a," / span ").concat(h)};-1===i?o.unshift(O):(O.visible=!(!d&&n>0&&n<this.moves.length-1&&this.moves[n].number===x.number&&this.moves.length>2),o.push(O)),f?(l*=-1,u+=3*i,g=0,k=30):g+=h,m=d,y=f}}catch(w){P.e(w)}finally{P.f()}return o},board:function(){var t=this;if(0===this.moves.length)return[];var e=this.moves.findIndex((function(e){return e.number===t.start})),n=this.moves.slice(0,e).reverse(),r=this.moves.slice(e),i=this.createTiles(n,26,e,-1,-1),s=this.createTiles(r,22,e,1,1),o=[];return Array.prototype.push.apply(o,i),Array.prototype.push.apply(o,s),o}}},C=w,T=(n("d6b4"),Object(P["a"])(C,l,h,!1,null,"9d0a5b84",null)),_=T.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"player"},[n("div",{staticClass:"pieces",style:t.style},t._l(t.pieces,(function(e,r){return n("Piece",{key:r,attrs:{visible:t.visible,number:e,angle:t.isLateralPosition?90:0,animate:"bottom"===t.position,ghost:!t.turn},on:{click:function(n){return t.$emit("click",t.id,e)}}})})),1)])},S=[],M={components:{Piece:O},props:{id:Number,name:String,visible:{type:Boolean,default:!1},turn:{type:Boolean,default:!0},position:{type:String,default:null,validator:function(t){return-1!==["top","left","right","bottom"].indexOf(t)}},pieces:{type:Array,default:function(){return[]}}},computed:{isLateralPosition:function(){return"left"===this.position||"right"===this.position},style:function(){return this.isLateralPosition?{gridTemplateColumns:"112px",gridTemplateRows:"repeat(".concat(this.pieces.length,", 56px)")}:{gridTemplateColumns:"repeat(".concat(this.pieces.length,", 56px)"),gridTemplateRows:"112px"}}},methods:{pass:function(){alert("No llevo :(")}}},I=M,B=(n("5387"),Object(P["a"])(I,j,S,!1,null,"606143e6",null)),N=B.exports,G={components:{Board:_,Player:N},data:function(){return{stack:[],board:[],turn:null,start:null,winner:null,move:null,ghost:null,gameOver:!1}},props:{players:{type:Number,default:2,validator:function(t){return!(t<2||t>4)}},quantity:{type:Number,default:10}},methods:{changeTurn:function(){var t=this;this.ghost||(this.turn===this.stack.length-1?this.turn=0:++this.turn,"bottom"!==this.stack[this.turn].position&&setTimeout((function(){var e=y(t.stack[t.turn].pieces,t.board,1);if(e){if(t.doPlay(t.turn,e.number,e.position))return}else if(t.checkDraw())return alert("Se trancó el juego!"),t.gameOver=!0,void t.showWinner();setTimeout((function(){t.changeTurn()}),1e3)}),1e3))},changeTurnBack:function(){0===this.turn?this.turn=this.stack.length-1:--this.turn},showWinner:function(){var t,e=[],n=Object(c["a"])(this.stack);try{for(n.s();!(t=n.n()).done;){var r=t.value;e.push({id:r.id,total:r.pieces.reduce((function(t,e){return t+d(e)+m(e)}),0)})}}catch(o){n.e(o)}finally{n.f()}e.sort((function(t,e){return t.total>e.total?-1:1}));var i=e.pop(),s=e.pop();i.total===s.total?alert("Empate a "+i.total+" puntos!"):alert("Ganó Jugador "+(i.id+1)+" con "+i.total+" puntos!")},checkDraw:function(){var t,e=Object(c["a"])(this.stack);try{for(e.s();!(t=e.n()).done;){var n=t.value;if(y(n.pieces,this.board,0))return!1}}catch(r){e.e(r)}finally{e.f()}return!0},play:function(t,e){var n=t.player,r=t.number,i=t.ghost;if((0===e||e===this.board.length-1)&&(this.board.splice(e,1),i)){if(this.removeGhost(),this.doPlay(n,r,0===e?"left":"right"))return;this.changeTurn()}},removeGhost:function(){var t;while(-1!==(t=this.board.findIndex((function(t){return t.ghost}))))this.board.splice(t,1);this.ghost=null},prePlay:function(t,e){if(!(null!==this.ghost&&"bottom"!==this.stack[t].position||this.turn!==t||this.gameOver)&&(this.removeGhost(),!this.checkWinner()&&-1===this.board.indexOf(e))){var n=this.stack[t].pieces.indexOf(e);if(-1!==n)return 0===this.board.length?(this.start=e,this.board.push({number:e,player:t}),this.stack[t].pieces.splice(n,1),void this.changeTurn()):void(this.addGhost(t,e)&&(this.ghost=t))}},doPlay:function(t,e,n){"left"===n?this.board.unshift({player:t,number:e,ghost:!1}):this.board.push({player:t,number:e,ghost:!1});var r=this.stack[t].pieces.findIndex((function(t){return v(t,e)}));return this.stack[t].pieces.splice(r,1),this.checkWinner()},addGhost:function(t,e){var n=this.board[0],r=this.board[this.board.length-1],i=d(e),s=m(e),o=b(e),a=!0,u=!1;return(d(n.number)!==s||(this.board.unshift({player:t,number:e,ghost:a}),u=!0,a))&&(d(n.number)!==i||o||(this.board.unshift({player:t,number:s+i/10,ghost:a}),u=!0,a))&&(m(r.number)!==s||(this.board.push({player:t,number:s+i/10,ghost:a}),u=!0,a))?(m(r.number)!==i||o||(this.board.push({player:t,number:e,ghost:a}),u=!0),u):u},reset:function(){for(var t=[],e=0;e<=9;++e)for(var n=e;n<=9;++n)t.push(e+n/10);t.sort((function(){return Math.random()-.5}));var r=["top"];2===this.players?r.push("bottom"):3===this.players?(r.push("left"),r.push("bottom")):4===this.players&&(r.push("left"),r.push("bottom"),r.push("right")),this.stack=[];for(var i=0;i<this.players;++i){for(var s={id:i,class:"player-".concat(r[i],"-area"),position:r[i],name:"Player"+(i+1),pieces:[]},o=1;o<=this.quantity;++o)s.pieces.push(t.pop());this.stack.push(s),"bottom"===s.position&&(this.turn=i)}},checkWinner:function(){var t=this,e=function(e){if(0===t.stack[e].pieces.length)return t.winner=e,t.gameOver=!0,setTimeout((function(){alert("Ganó Jugador "+(parseInt(e)+1))}),100),{v:!0}};for(var n in this.stack){var r=e(n);if("object"===Object(u["a"])(r))return r.v}return this.winner=null,!1},sideA:function(t){return parseInt(t)},sideB:function(t){return Math.round(10*(t-parseInt(t)))}},created:function(){this.reset()}},q=G,A=(n("c706"),Object(P["a"])(q,o,a,!1,null,"0da8618c",null)),E=A.exports,$={components:{Game:E}},W=$,L=(n("c796"),Object(P["a"])(W,i,s,!1,null,null,null)),J=L.exports,D=n("2f62"),Q=(n("7db0"),n("d81d"),n("2909")),R=[{id:1,title:"iPad 4 Mini",price:500.01,inventory:2},{id:2,title:"H&M T-Shirt White",price:10.99,inventory:10},{id:3,title:"Charli XCX - Sucker CD",price:19.99,inventory:5}],X={getProducts:function(t){setTimeout((function(){return t(R)}),100)},buyProducts:function(t,e,n){setTimeout((function(){Math.random()>.5||navigator.webdriver?e():n()}),100)}},H=function(){return{items:[],checkoutStatus:null}},Y={cartProducts:function(t,e,n){return t.items.map((function(t){var e=t.id,r=t.quantity,i=n.products.all.find((function(t){return t.id===e}));return{title:i.title,price:i.price,quantity:r}}))},cartTotalPrice:function(t,e){return e.cartProducts.reduce((function(t,e){return t+e.price*e.quantity}),0)}},z={checkout:function(t,e){var n=t.commit,r=t.state,i=Object(Q["a"])(r.items);n("setCheckoutStatus",null),n("setCartItems",{items:[]}),X.buyProducts(e,(function(){return n("setCheckoutStatus","successful")}),(function(){n("setCheckoutStatus","failed"),n("setCartItems",{items:i})}))},addProductToCart:function(t,e){var n=t.state,r=t.commit;if(r("setCheckoutStatus",null),e.inventory>0){var i=n.items.find((function(t){return t.id===e.id}));i?r("incrementItemQuantity",i):r("pushProductToCart",{id:e.id}),r("products/decrementProductInventory",{id:e.id},{root:!0})}}},F={pushProductToCart:function(t,e){var n=e.id;t.items.push({id:n,quantity:1})},incrementItemQuantity:function(t,e){var n=e.id,r=t.items.find((function(t){return t.id===n}));r.quantity++},setCartItems:function(t,e){var n=e.items;t.items=n},setCheckoutStatus:function(t,e){t.checkoutStatus=e}},K={namespaced:!0,state:H,getters:Y,actions:z,mutations:F};r["a"].use(D["a"]);var U=!1,V=new D["a"].Store({modules:{cart:K},strict:U});new r["a"]({el:"#app",store:V,render:function(t){return t(J)}})},"5af0":function(t,e,n){},a30d:function(t,e,n){},b52c:function(t,e,n){},c706:function(t,e,n){"use strict";var r=n("5af0"),i=n.n(r);i.a},c796:function(t,e,n){"use strict";var r=n("07a7"),i=n.n(r);i.a},d6b4:function(t,e,n){"use strict";var r=n("3107"),i=n.n(r);i.a},d826:function(t,e,n){"use strict";var r=n("b52c"),i=n.n(r);i.a}});
//# sourceMappingURL=app.e2c464ba.js.map