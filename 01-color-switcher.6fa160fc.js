!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body"),o=null,a=!1;function c(n){n?(t.disabled=!1,e.disabled=!0):(t.disabled=!0,e.disabled=!1)}t.addEventListener("click",(function(){(function(){if(a)return;a=!0,o=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})(),c(!1)})),e.addEventListener("click",(function(){c(!0),a=!1,clearInterval(o)}))}();
//# sourceMappingURL=01-color-switcher.6fa160fc.js.map
