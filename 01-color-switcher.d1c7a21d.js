!function(){var e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),n=document.querySelector("body"),d=null,a=!1;t.disabled=!0,e.addEventListener("click",(function(){(function(){if(a)return;a=!0,d=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})(),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(function(){e.disabled=!1,t.disabled=!0,a=!1,clearInterval(d)}))}();
//# sourceMappingURL=01-color-switcher.d1c7a21d.js.map