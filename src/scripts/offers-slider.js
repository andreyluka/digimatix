;(function () {
   const sliderTabs = Array.from(document.querySelectorAll('.slider__tab')),
      sliderContainers = Array.from(document.querySelectorAll('.slider__container')),
      sliderBtns = document.querySelector('.slider__btns');

   let sliderСontainer,
      sliderList,
      sliderItems,
      sliderDots,
      sliderItemWidth,
      lastIndex,
      currentIndex = 0,
      step = 0;

   sliderFilling();
   generateDots();

   sliderTabs.forEach(tab => {
      tab.addEventListener('click', function (e) {
         const index = sliderTabs.indexOf(e.target);
         sliderContainers.forEach(el => el.classList.remove('slider__container--active'));
         sliderContainers[index].classList.add('slider__container--active');
         
         sliderTabs.forEach(el => el.classList.remove('slider__tab--active'));
         e.target.classList.add('slider__tab--active');

         sliderDots.innerHTML = '';
         
         sliderFilling();
         generateDots();
      });
   });

   sliderBtns.addEventListener('click', function (e) {
      if (e.target.classList.contains('slider__button-right')) {
         currentIndex++;
      } else if (e.target.classList.contains('slider__button-left')) {
         currentIndex--;
      }

      if (currentIndex < 0) currentIndex = lastIndex;
      if (currentIndex > lastIndex) currentIndex = 0;

      step = currentIndex * sliderItemWidth;
      sliderList.style.transform = `translateX(-${step}%)`;

      coloringDots(currentIndex);
   });
   
   function sliderFilling() {
      sliderСontainer = document.querySelector('.slider__container--active');
      sliderList = sliderСontainer.querySelector('.slider__list');
      sliderItems = sliderList.querySelectorAll('.slider__item');
      sliderDots = sliderСontainer.querySelector('.slider__dots');

      sliderItemWidth = parseFloat(window.getComputedStyle(sliderList).gridAutoColumns);
      let limiter = Math.floor(100 / sliderItemWidth) + 1;
      lastIndex = sliderItems.length - limiter;
   }

   function generateDots() {
      for (let i = 0; i < (lastIndex + 1); i++) {
         const sliderDot = document.createElement('li');
         sliderDot.className = "slider__dot";
         sliderDots.append(sliderDot);

         sliderDots.firstElementChild.classList.add('slider__dot--active');
      }
   }

   function coloringDots(index) {
      [].forEach.call(sliderDots.children, el => {
         if (el.classList.contains('slider__dot--active')) el.classList.remove('slider__dot--active');
      });

      sliderDots.children[index].classList.add('slider__dot--active');
   }

})()