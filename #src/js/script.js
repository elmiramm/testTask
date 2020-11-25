; (function () {
  let body = document.querySelector('body');

  window.addEventListener('load', function () {

    const windowInnerHeight = window.innerHeight;

    let arrowUp = document.querySelector('.fa-up-arrow');
    let scrollTop = window.pageYOffset;
    let heightOfArrowUp = arrowUp.getBoundingClientRect().top + scrollTop;

    console.log(windowInnerHeight);
    console.log(heightOfArrowUp);

    let displayNoneOrNot = arrowUp.classList.contains('display--none');

    if (displayNoneOrNot) {
      if (windowInnerHeight >= heightOfArrowUp) {
        arrowUp.classList.remove('display--none');
      }
    } else {
      if (windowInnerHeight >= heightOfArrowUp) {
        arrowUp.classList.add('display--none');
      }
    }
  })

  window.addEventListener('resize', function () {

    const windowInnerHeight = window.innerHeight;

    let arrowUp = document.querySelector('.fa-up-arrow');
    let scrollTop = window.pageYOffset;
    let heightOfArrowUp = arrowUp.getBoundingClientRect().top + scrollTop;

    console.log(windowInnerHeight);
    console.log(heightOfArrowUp);

    let displayNoneOrNot = arrowUp.classList.contains('display--none');

    if (displayNoneOrNot) {
      if (windowInnerHeight >= heightOfArrowUp) {
        arrowUp.classList.remove('display--none');
      }
    } else {
      if (windowInnerHeight >= heightOfArrowUp) {
        arrowUp.classList.add('display--none');
      }
    }
  })

  var scroll = function (target) {
    var targetTop = target.getBoundingClientRect().top;
    var scrollTop = window.pageYOffset;
    var targetOffsetTop = targetTop + scrollTop;

    window.scrollTo(0, targetOffsetTop,
      {
        behavior: 'smooth'
      }
    );
  }

  body.addEventListener('click', function (e) {
    var target = e.target;
    var scrollToItemClass = target.getAttribute('data-scroll-to');

    if (scrollToItemClass === null) {
      return null;
    }

    e.preventDefault();

    var scrollToItem = document.querySelector('.' + scrollToItemClass);

    if (scrollToItem) {
      scroll(scrollToItem);

    }
  })
})();