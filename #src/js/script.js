; (function () {
  let body = document.querySelector('body');

  window.addEventListener('load', isVisuallyHidden);
  window.addEventListener('resize', isVisuallyHidden);
  window.addEventListener('scroll', isVisuallyHidden);

  let arrowUp = document.querySelector('.fa-up-arrow');

  function isVisuallyHidden() {

    let windowInnerHeight = window.innerHeight || document.documentElement.scrollTop;
    let scrollTop = window.pageYOffset;
    let scrollBottom = windowInnerHeight + scrollTop;

    let heightOfArrowUp = arrowUp.getBoundingClientRect().top + scrollTop;

    let isdisplayNone = arrowUp.classList.contains('display--none');

    
    if (scrollTop === 0 && heightOfArrowUp <= scrollBottom && isdisplayNone === false) {
      arrowUp.classList.add('display--none');
    }
    else if (scrollTop === 0 && heightOfArrowUp >= scrollBottom && isdisplayNone === true) {
      arrowUp.classList.remove('display--none');
    }
    else if (scrollTop !== 0 && heightOfArrowUp <= scrollBottom && isdisplayNone === true) {
      arrowUp.classList.remove('display--none');
    }
  }

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