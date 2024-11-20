"use strict";

/* 
function propagateEventsIntoAllItemMenu() {
  const elms = document.querySelectorAll(".item-menu");

  console.log(elms);

  elms.forEach(function (elm) {
    elm.addEventListener("click", (e) => {
      console.log(e);
      e.preventDefault();
      removeAllActiveClassIntoMenuLi();
      removeAllActiveClassIntoMenuLiA();
          
          console.log(elm.parentNode);
          console.log(elm.parentElement);
          elm.classList.add("active");
    
          try {
            elm.parentNode.classList.add("active");
          } catch (e) {
            console.log(e);
          }  
       });
  });
}


function removeAllActiveClassIntoMenuLi() {
  const elms = document.querySelectorAll(".menu-item-julaw");
  console.log("Removendo classe active  li ", elms);
  elms.forEach(function (elm) {
    console.log("Elementos com lis ", elm);
    elm.classList.remove("active");
  });
}
function removeAllActiveClassIntoMenuLiA() {
  const elms = document.querySelectorAll(".item-menu");
  console.log("Removendo classe active A ", elms);
  elms.forEach(function (elm) {
    console.log("Elementos com lis ", elm);
    elm.classList.remove("active");
  });
}

setTimeout(() => propagateEventsIntoAllItemMenu(), 2000);
 */