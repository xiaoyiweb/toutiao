(self["webpackChunktoutiao_lianxi"]=self["webpackChunktoutiao_lianxi"]||[]).push([[332],{7332:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return L}});var s=function(){var t=this,n=t._self._c;return n("div",{staticClass:"home"},[n("van-nav-bar",{scopedSlots:t._u([{key:"left",fn:function(){return[n("van-image",{attrs:{width:"100",src:e(6949),fit:"contain"}})]},proxy:!0},{key:"right",fn:function(){return[n("van-button",{on:{click:function(n){return t.$router.push("/home/search")}}},[n("van-icon",{staticClass:"myicon",attrs:{name:"search"}}),t._v(" 搜索 ")],1)]},proxy:!0}])}),n("van-tabs",{model:{value:t.active,callback:function(n){t.active=n},expression:"active"}},[t._l(t.UserChannelList,(function(t,e){return n("van-tab",{key:e,attrs:{title:t.name}},[n("news-list",{attrs:{channel_id:t.id}})],1)})),n("van-icon",{staticClass:"channelIcon",attrs:{name:"wap-nav"},on:{click:function(n){t.channelShow=!0}}})],2),n("van-action-sheet",{attrs:{title:"频道管理"},model:{value:t.channelShow,callback:function(n){t.channelShow=n},expression:"channelShow"}},[n("channel",{attrs:{channelsList:t.UserChannelList},model:{value:t.active,callback:function(n){t.active=n},expression:"active"}})],1)],1)},i=[],a=e(2746),o=function(){var t=this,n=t._self._c;return n("div",{ref:"newsList",staticClass:"newsList"},[n("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(n){t.refreshing=n},expression:"refreshing"}},[n("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(n){t.loading=n},expression:"loading"}},t._l(t.newsList,(function(e,s){return n("van-cell",{key:s,attrs:{title:e.title},on:{click:function(n){return t.toDetail(e.art_id)}},scopedSlots:t._u([{key:"label",fn:function(){return[0!==e.cover.type?n("van-grid",{attrs:{border:!1,"column-num":3}},t._l(e.cover.images,(function(t,e){return n("van-grid-item",{key:e},[n("van-image",{attrs:{src:t}})],1)})),1):t._e(),n("div",{staticClass:"detail"},[n("span",[t._v(t._s(e.aut_name))]),n("span",[t._v(t._s(e.comm_count)+"评论")]),n("span",[t._v(t._s(t._f("formatTime")(e.pubdate)))]),n("van-icon",{staticClass:"myicon",attrs:{name:"cross"}})],1)]},proxy:!0}],null,!0)})})),1)],1)],1)},r=[],l={props:["channel_id"],data(){return{timestamp:Date.now(),newsList:[],loading:!1,finished:!1,refreshing:!1,scrollTop:""}},mounted(){this.$refs.newsList.onscroll=()=>{this.scrollTop=this.$refs.newsList.scrollTop}},activated(){this.$refs.newsList.scrollTop=this.scrollTop},methods:{async onLoad(){this.refreshing&&(this.newsList=[],this.refreshing=!1,this.timestamp=Date.now());const t=await(0,a.uT)({channel_id:this.channel_id,timestamp:this.timestamp});this.newsList=[...this.newsList,...t.data.data.results],this.timestamp=t.data.data.pre_timestamp,this.loading=!1,this.timestamp||(this.finished=!0)},onRefresh(){this.finished=!1,this.loading=!0,setTimeout((()=>{this.onLoad()}),300)},toDetail(t){this.$router.push(`/home/detail?id=${t}`)}}},c=l,u=e(1001),h=(0,u.Z)(c,o,r,!1,null,null,null),d=h.exports,f=function(){var t=this,n=t._self._c;return n("div",{staticClass:"channel"},[n("div",{staticClass:"mychannel"},[n("div",{staticClass:"head"},[n("span",[t._v("我的频道")]),n("van-button",{attrs:{type:"danger",plain:"",size:"mini"},on:{click:function(n){t.showCross=!t.showCross}}},[t._v(" "+t._s(t.showCross?"取消":"编辑")+" ")])],1),n("van-grid",t._l(t.channelsList,(function(e,s){return n("van-grid-item",{key:s,scopedSlots:t._u([{key:"text",fn:function(){return[n("span",{class:{active:t.value===s},on:{click:function(n){return t.input(s)}}},[t._v(t._s(e.name))]),n("van-icon",{directives:[{name:"show",rawName:"v-show",value:t.showCross&&s,expression:"showCross && index"}],staticClass:"mycross",attrs:{name:"cross"},on:{click:function(n){return n.stopPropagation(),t.delChannels(s,e.id)}}})]},proxy:!0}],null,!0)})})),1)],1),t._m(0),n("van-grid",t._l(t.selectChannels,(function(e,s){return n("van-grid-item",{key:s,attrs:{text:e.name},on:{click:function(n){return t.addChannels(e)}}})})),1)],1)},v=[function(){var t=this,n=t._self._c;return n("div",{staticClass:"mychannel"},[n("div",{staticClass:"head"},[n("span",{staticClass:"name"},[t._v("可选频道")])])])}],p=(e(6699),e(1836)),m={props:["channelsList","value"],data(){return{showCross:!1,allChannelsList:[]}},methods:{input(t){this.$emit("input",t)},delChannels(t,n){this.channelsList.splice(t,1),this.value>t&&this.$emit("input",this.value-1);const e=this.$store.state.token.token;e?(0,a.ud)(n):(0,p.QC)(this.channelsList),this.$toast.success("删除频道成功")},addChannels(t){this.channelsList.push(t);const n=this.$store.state.token.token;n?(0,a.lq)({channels:[{id:t.id,seq:this.channelsList.length+1}]}):(0,p.QC)(this.channelsList),this.$toast.success("新增频道成功")}},computed:{selectChannels(){const t=this.channelsList.map((t=>t.id));return this.allChannelsList.filter((n=>!t.includes(n.id)))}},async created(){const t=await(0,a.Of)();this.allChannelsList=t.data.data.channels}},w=m,_=(0,u.Z)(w,f,v,!1,null,null,null),C=_.exports,g={components:{NewsList:d,channel:C},data(){return{UserChannelList:"",channelShow:!1,active:""}},methods:{async getUserChannel(){const t=await(0,a.U5)();this.UserChannelList=t.data.data.channels}},created(){const t=this.$store.state.token.token,n=(0,p.mr)();t||!n?this.getUserChannel():this.UserChannelList=n}},y=g,k=(0,u.Z)(y,s,i,!1,null,null,null),L=k.exports},1223:function(t,n,e){var s=e(5112),i=e(30),a=e(3070).f,o=s("unscopables"),r=Array.prototype;void 0==r[o]&&a(r,o,{configurable:!0,value:i(null)}),t.exports=function(t){r[o][t]=!0}},1003:function(t,n,e){var s=e(5005);t.exports=s("document","documentElement")},30:function(t,n,e){var s,i=e(9670),a=e(6048),o=e(748),r=e(3501),l=e(1003),c=e(317),u=e(6200),h=">",d="<",f="prototype",v="script",p=u("IE_PROTO"),m=function(){},w=function(t){return d+v+h+t+d+"/"+v+h},_=function(t){t.write(w("")),t.close();var n=t.parentWindow.Object;return t=null,n},C=function(){var t,n=c("iframe"),e="java"+v+":";return n.style.display="none",l.appendChild(n),n.src=String(e),t=n.contentWindow.document,t.open(),t.write(w("document.F=Object")),t.close(),t.F},g=function(){try{s=new ActiveXObject("htmlfile")}catch(n){}g="undefined"!=typeof document?document.domain&&s?_(s):C():_(s);var t=o.length;while(t--)delete g[f][o[t]];return g()};r[p]=!0,t.exports=Object.create||function(t,n){var e;return null!==t?(m[f]=i(t),e=new m,m[f]=null,e[p]=t):e=g(),void 0===n?e:a.f(e,n)}},6048:function(t,n,e){var s=e(9781),i=e(3353),a=e(3070),o=e(9670),r=e(5656),l=e(1956);n.f=s&&!i?Object.defineProperties:function(t,n){o(t);var e,s=r(n),i=l(n),c=i.length,u=0;while(c>u)a.f(t,e=i[u++],s[e]);return t}},1956:function(t,n,e){var s=e(6324),i=e(748);t.exports=Object.keys||function(t){return s(t,i)}},6699:function(t,n,e){"use strict";var s=e(2109),i=e(1318).includes,a=e(7293),o=e(1223),r=a((function(){return!Array(1).includes()}));s({target:"Array",proto:!0,forced:r},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),o("includes")},6949:function(t,n,e){"use strict";t.exports=e.p+"img/logo.d0d391a4.png"}}]);