(this.webpackJsonpspotlight_react=this.webpackJsonpspotlight_react||[]).push([[0],{12:function(t,i,e){},13:function(t,i,e){},16:function(t,i,e){"use strict";e.r(i);var h=e(0),a=e.n(h),s=e(6),n=e.n(s),r=(e(12),e(13),e.p+"static/media/donut.b4874661.png"),c=e.p+"static/media/pizza.9df49508.png",o=e.p+"static/media/banana.d9bea2a3.png",p=e(3),d=e(4),u=.2,w=function(){function t(i){Object(p.a)(this,t),this.canvas=void 0,this.image=void 0,this.itemWidth=void 0,this.wrapX0=void 0,this.wrapY0=void 0,this.wrapWidth=void 0,this.wrapHeight=void 0,this.context=void 0,this.t=void 0,this.x=void 0,this.y=void 0,this.width_px=void 0,this.height_px=void 0,this.wrapWidth_px=void 0,this.wrapHeight_px=void 0,this.wrapX0_px=void 0,this.wrapY0_px=void 0,this.image=i.image,this.itemWidth=i.itemWidth,this.wrapX0=i.wrapX0,this.wrapY0=i.wrapY0,this.wrapWidth=i.wrapWidth,this.wrapHeight=i.wrapHeight,this.canvas=i.canvas,this.context=i.canvas.getContext("2d"),this.t=0,this.width_px=0,this.height_px=0,this.wrapHeight_px=0,this.wrapWidth_px=0,this.wrapX0_px=0,this.wrapY0_px=0,this.calculatePx(),this.x=this.getX(this.t),this.y=this.getY(this.t)}return Object(d.a)(t,[{key:"calculatePx",value:function(){this.wrapX0_px=this.canvas.width*this.wrapX0/100,this.wrapY0_px=this.canvas.height*this.wrapY0/100,this.wrapHeight_px=this.wrapHeight/100*this.canvas.height,this.wrapWidth_px=this.wrapWidth/100*this.canvas.width,this.width_px=this.itemWidth/100*this.canvas.width,this.height_px=this.itemWidth/this.image.width*this.image.height/100*this.canvas.width,this.height_px>this.wrapHeight_px&&(this.height_px=this.wrapHeight_px,this.width_px=this.wrapHeight_px*this.image.width/this.image.height)}},{key:"getX",value:function(t){return(this.wrapWidth_px-this.width_px)/2*(Math.cos(t)+1)+this.wrapX0_px}},{key:"getY",value:function(t){return(this.wrapHeight_px-this.height_px)/2*(Math.sin(t)+1)+this.wrapY0_px}},{key:"incrementTime",value:function(){this.t+=.008333333333333333}},{key:"move",value:function(){this.incrementTime(),this.calculatePx(),this.x=this.getX(this.t),this.y=this.getY(this.t)}},{key:"renderSpotlight",value:function(){if(this.context){var t=this.x+this.width_px/2,i=this.y+this.height_px/2,e=Math.min(this.width_px,this.height_px)/2,h=this.context.createRadialGradient(t+e*u*Math.cos(2*this.t),i+e*u*Math.sin(2*this.t),e,t+e*u*Math.cos(2*this.t),i+e*u*Math.sin(2*this.t),0);h.addColorStop(0,"#111111"),h.addColorStop(0,"#111111"),h.addColorStop(1,"transparent"),this.context.fillStyle=h,this.context.fillRect(this.x-1,this.y-1,Math.ceil(this.width_px)+1,Math.ceil(this.height_px)+1)}}},{key:"render",value:function(){this.context&&(this.context.save(),this.context.drawImage(this.image,this.x,this.y,this.width_px,this.height_px),this.renderSpotlight(),this.context.restore(),this.move())}}]),t}(),v=function(){function t(i){var e=this;Object(p.a)(this,t),this.canvas=void 0,this.items=void 0,this.context=void 0,this.requestAnimation=void 0,this.render=function(t){e.context&&(e.context.clearRect(0,0,e.canvas.width,e.canvas.height),e.items.forEach((function(t){return t.render()})),e.requestAnimation=requestAnimationFrame(e.render))},this.canvas=i.canvas,this.items=[],this.context=i.canvas.getContext("2d"),this.requestAnimation=0,this.setCanvasSize(),window.addEventListener("resize",(function(){return e.setCanvasSize()}))}return Object(d.a)(t,[{key:"addItem",value:function(t){this.items.push(new w(t))}},{key:"start",value:function(){this.requestAnimation=requestAnimationFrame(this.render)}},{key:"destroy",value:function(){cancelAnimationFrame(this.requestAnimation)}},{key:"setCanvasSize",value:function(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}}]),t}(),g=e(5),x=e.n(g),m=e(7),f=function(t){return new Promise((function(i,e){var h=new Image;h.src=t,h.onload=function(){return i(h)},h.onerror=function(t){return e(t)}}))},l=function(){var t=Object(m.a)(x.a.mark((function t(i){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i&&0!==i.length){t.next=2;break}return t.abrupt("return",[]);case 2:return t.abrupt("return",Promise.all(i.map(f)));case 3:case"end":return t.stop()}}),t)})));return function(i){return t.apply(this,arguments)}}(),_=e(1),y=function(t){var i=t.images,e=Object(h.useRef)(null);return Object(h.useEffect)((function(){if(e.current){var t=new v({canvas:e.current});return l(i).then((function(i){t.addItem({canvas:t.canvas,image:i[0],itemWidth:20,wrapX0:10,wrapY0:10,wrapWidth:30,wrapHeight:30}),t.addItem({canvas:t.canvas,image:i[1],itemWidth:35,wrapX0:45,wrapY0:5,wrapWidth:40,wrapHeight:60}),t.addItem({canvas:t.canvas,image:i[0],itemWidth:5,wrapX0:90,wrapY0:20,wrapWidth:10,wrapHeight:30}),t.addItem({canvas:t.canvas,image:i[2],itemWidth:35,wrapX0:0,wrapY0:65,wrapWidth:50,wrapHeight:35}),t.start()})),function(){return t.destroy()}}}),[i]),Object(_.jsx)("canvas",{ref:e})};var W=function(){return Object(_.jsx)(y,{images:[r,c,o]})},b=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,17)).then((function(i){var e=i.getCLS,h=i.getFID,a=i.getFCP,s=i.getLCP,n=i.getTTFB;e(t),h(t),a(t),s(t),n(t)}))};n.a.render(Object(_.jsx)(a.a.StrictMode,{children:Object(_.jsx)(W,{})}),document.getElementById("root")),b()}},[[16,1,2]]]);
//# sourceMappingURL=main.e549a56b.chunk.js.map