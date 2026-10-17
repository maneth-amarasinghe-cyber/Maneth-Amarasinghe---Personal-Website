// Mobile menu
const btn=document.querySelector(".menu-btn"),nav=document.getElementById("nav");
btn.addEventListener("click",()=>{const o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",o);btn.setAttribute("aria-label",o?"Close menu":"Open menu")});
// Footer year
document.getElementById("year").textContent=new Date().getFullYear();
// Copy email
const copy=document.getElementById("copy");
if(copy)copy.addEventListener("click",async()=>{const m=document.getElementById("copy-msg");
try{await navigator.clipboard.writeText(copy.dataset.email);m.textContent="Email copied to clipboard ✅"}catch(e){m.textContent="Copy failed. Please copy it manually: "+copy.dataset.email}});
// Certificate search + category filter
const q=document.getElementById("q");
if(q){let cat="all";const cards=[...document.querySelectorAll(".cert")],groups=[...document.querySelectorAll(".cgroup")];
const run=()=>{const t=q.value.trim().toLowerCase();let n=0;
cards.forEach(c=>{const ok=(cat==="all"||c.dataset.cat===cat)&&c.textContent.toLowerCase().includes(t);c.hidden=!ok;if(ok)n++});
groups.forEach(g=>g.hidden=!g.querySelector(".cert:not([hidden])"));document.getElementById("empty").hidden=n>0};
q.addEventListener("input",run);
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{cat=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));run()}))}
