(function(){
"use strict";
// Mobile menu
var btn=document.querySelector(".menu-btn"),nav=document.getElementById("nav");
function setMenu(open){
  if(!btn||!nav)return;
  nav.classList.toggle("open",open);
  btn.setAttribute("aria-expanded",String(open));
  btn.setAttribute("aria-label",open?"Close menu":"Open menu");
}
if(btn&&nav){
  btn.addEventListener("click",function(){setMenu(!nav.classList.contains("open"))});
  nav.addEventListener("click",function(e){if(e.target.closest("a"))setMenu(false)});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")setMenu(false)});
  window.addEventListener("resize",function(){if(window.innerWidth>820)setMenu(false)});
}

// Footer year
var yr=document.getElementById("year");
if(yr)yr.textContent=new Date().getFullYear();

// Copy email (works on old browsers and non-HTTPS too)
var copy=document.getElementById("copy");
function fallbackCopy(text){
  var t=document.createElement("textarea");
  t.value=text;t.setAttribute("readonly","");
  t.style.cssText="position:fixed;top:0;left:0;opacity:0;font-size:16px";
  document.body.appendChild(t);t.select();t.setSelectionRange(0,text.length);
  var ok=false;try{ok=document.execCommand("copy")}catch(e){}
  document.body.removeChild(t);return ok;
}
if(copy){
  copy.addEventListener("click",function(){
    var m=document.getElementById("copy-msg"),text=copy.dataset.email;
    function done(ok){if(m)m.textContent=ok?"Email copied to clipboard.":"Copy failed. Please copy it manually: "+text}
    if(navigator.clipboard&&window.isSecureContext){
      navigator.clipboard.writeText(text).then(function(){done(true)},function(){done(fallbackCopy(text))});
    }else{done(fallbackCopy(text))}
  });
}

// Project cards: keep the border highlight on the card you clicked
var projs=Array.prototype.slice.call(document.querySelectorAll(".card, .feature, .jbox, .steps li"));
if(projs.length){
  projs.forEach(function(p){p.addEventListener("click",function(){
    projs.forEach(function(x){x.classList.toggle("selected",x===p)});
  })});
  document.addEventListener("click",function(e){
    if(!e.target.closest(".card, .feature, .jbox, .steps li"))projs.forEach(function(x){x.classList.remove("selected")});
  });
}

// Home hero: portrait tilts toward the cursor, status pill and buttons drift toward it
var hero=document.querySelector(".hero");
if(hero&&window.matchMedia&&matchMedia("(hover:hover) and (pointer:fine)").matches&&!matchMedia("(prefers-reduced-motion:reduce)").matches){
  var portrait=hero.querySelector(".portrait"),pimg=portrait?portrait.querySelector("img"):null,
      mags=Array.prototype.slice.call(hero.querySelectorAll(".status,.btn,.social-btn")).map(function(el){return{el:el,x:0,y:0,tx:0,ty:0}}),
      mouse={x:0,y:0,on:false},tilt={rx:0,ry:0,px:0,py:0,trx:0,try_:0,tpx:0,tpy:0},raf=0;
  var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
  var tick=function(){
    var busy=false,rect,cx,cy,nx,ny;
    if(portrait){
      if(mouse.on){
        rect=portrait.getBoundingClientRect();cx=rect.left+rect.width/2;cy=rect.top+rect.height/2;
        nx=clamp((mouse.x-cx)/380,-1,1);ny=clamp((mouse.y-cy)/380,-1,1);
        tilt.try_=nx*9;tilt.trx=-ny*9;tilt.tpx=nx*-10;tilt.tpy=ny*-10;
      }else{tilt.try_=tilt.trx=tilt.tpx=tilt.tpy=0}
      tilt.ry+=(tilt.try_-tilt.ry)*.12;tilt.rx+=(tilt.trx-tilt.rx)*.12;
      tilt.px+=(tilt.tpx-tilt.px)*.12;tilt.py+=(tilt.tpy-tilt.py)*.12;
      portrait.style.transform="perspective(900px) rotateX("+tilt.rx.toFixed(2)+"deg) rotateY("+tilt.ry.toFixed(2)+"deg)";
      if(pimg)pimg.style.transform="translate("+tilt.px.toFixed(1)+"px,"+tilt.py.toFixed(1)+"px) scale(1.08)";
      if(Math.abs(tilt.ry-tilt.try_)>.02||Math.abs(tilt.rx-tilt.trx)>.02)busy=true;
    }
    mags.forEach(function(m){
      var r=m.el.getBoundingClientRect(),bx=r.left+r.width/2-m.x,by=r.top+r.height/2-m.y;
      if(mouse.on){
        var dx=mouse.x-bx,dy=mouse.y-by,d=Math.sqrt(dx*dx+dy*dy),reach=Math.max(r.width,r.height)/2+70;
        if(d<reach){m.tx=clamp(dx*.28,-9,9);m.ty=clamp(dy*.28,-9,9)}else{m.tx=0;m.ty=0}
      }else{m.tx=0;m.ty=0}
      m.x+=(m.tx-m.x)*.2;m.y+=(m.ty-m.y)*.2;
      m.el.style.transform=(Math.abs(m.x)<.05&&Math.abs(m.y)<.05&&!m.tx&&!m.ty)?"":"translate("+m.x.toFixed(1)+"px,"+m.y.toFixed(1)+"px)";
      if(Math.abs(m.x-m.tx)>.05||Math.abs(m.y-m.ty)>.05)busy=true;
    });
    raf=(busy||mouse.on)?requestAnimationFrame(tick):0;
  };
  var kick=function(){if(!raf)raf=requestAnimationFrame(tick)};
  hero.addEventListener("pointermove",function(e){mouse.x=e.clientX;mouse.y=e.clientY;mouse.on=true;kick()});
  hero.addEventListener("pointerleave",function(){mouse.on=false;kick()});
}

// Certificate search + category filter
var q=document.getElementById("q");
if(q){
  var cat="all",
      cards=Array.prototype.slice.call(document.querySelectorAll(".cert")),
      groups=Array.prototype.slice.call(document.querySelectorAll(".cgroup")),
      filters=Array.prototype.slice.call(document.querySelectorAll(".filter")),
      empty=document.getElementById("empty");
  var run=function(){
    var t=q.value.trim().toLowerCase(),n=0;
    cards.forEach(function(c){
      var ok=(cat==="all"||c.dataset.cat===cat)&&c.textContent.toLowerCase().indexOf(t)>-1;
      c.hidden=!ok;if(ok)n++;
    });
    groups.forEach(function(g){g.hidden=!g.querySelector(".cert:not([hidden])")});
    if(empty)empty.hidden=n>0;
  };
  q.addEventListener("input",run);
  filters.forEach(function(b){b.addEventListener("click",function(){
    cat=b.dataset.filter;
    filters.forEach(function(x){x.classList.toggle("active",x===b)});
    run();
  })});
}
})();
