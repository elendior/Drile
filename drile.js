const sliders = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".btn_left");
const btnRight = document.querySelector(".btn_right");


let activeSlide = 0;

function setActiveSlide(){
    sliders.forEach(function (slide){
      slide.classList.remove("active");
      sliders[activeSlide].classList.add('active');
    })
}

let interval = setInterval(function (){
    if (activeSlide >= sliders.length-1) {
        activeSlide =0;
        setActiveSlide()
    } else {
        activeSlide ++;
        setActiveSlide()
    }
}, 1500)

btnRight.addEventListener("click", function (){
    clearInterval(interval)
    activeSlide ++;
    if (activeSlide > sliders.length-1){
        activeSlide = 0;
    }
    setActiveSlide()
})
btnLeft.addEventListener("click", function (){
    clearInterval(interval)
    activeSlide --;
    if (activeSlide < 0){
        activeSlide = sliders.length - 1;
    }
    setActiveSlide()
})

// sliders.addEventListener('hover', function (){
//     clearInterval(interval)
//     return activeSlide
// })

//-------------------------------------------------------------------------------------------------

const burger = document.querySelector('.burger');
const burgerClose = document.querySelector('.burger_close');
const nav = document.querySelector('.header_nav');


burger.addEventListener('click', function (){
    nav.classList.add('active')
})
burgerClose.addEventListener('click', function (){
    nav.classList.remove('active')
})








