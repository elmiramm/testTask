; (function () {
  let body = document.querySelector('body');
  let arrowUp = document.querySelector('.up-btn');

  // функция удаляет/добавляет класс visibility-hidden элементу arrowUp в зависимости от дальности элемента arrowUp от начала страницы
  function isVisibilityHidden() {

    let windowInnerHeight = window.innerHeight || document.documentElement.scrollTop;
    let scrollTop = window.pageYOffset;
    let scrollBottom = windowInnerHeight + scrollTop;
    let heightOfArrowUp = arrowUp.getBoundingClientRect().top + scrollTop;
    let isdisplayNone = arrowUp.classList.contains('visibility-hidden');

    if (scrollTop === 0 && heightOfArrowUp <= scrollBottom && isdisplayNone === false) {
      arrowUp.classList.add('visibility-hidden');
    }
    else if (scrollTop === 0 && heightOfArrowUp >= scrollBottom && isdisplayNone === true) {
      arrowUp.classList.remove('visibility-hidden');
    }
    else if (scrollTop !== 0 && heightOfArrowUp <= scrollBottom && isdisplayNone === true) {
      arrowUp.classList.remove('visibility-hidden');
    }
  }
  // isVisibilityHidden ____END_____

  // функция скролит страницу на начало при клике на target (arrowUp)
  let scroll = function (target) {
    let targetTop = target.getBoundingClientRect().top;
    let scrollTop = window.pageYOffset;
    let targetOffsetTop = targetTop + scrollTop;

    window.scrollTo(0, targetOffsetTop,
      {
        behavior: 'smooth'
      }
    );
  }
  // scroll ____END_____


  window.addEventListener('load', isVisibilityHidden);
  window.addEventListener('resize', isVisibilityHidden);
  window.addEventListener('scroll', isVisibilityHidden);

  body.addEventListener('click', function (e) {
    let target = e.target;
    let scrollToItemClass = target.getAttribute('data-scroll-to');

    if (scrollToItemClass === null) {
      return null;
    }

    e.preventDefault();

    let scrollToItem = document.querySelector('.' + scrollToItemClass);

    if (scrollToItem) {
      scroll(scrollToItem);

    }
  })
})();