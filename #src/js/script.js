; (function () {
  let body = document.querySelector('body');
  let arrowUp = document.querySelector('.up-btn');

  let closestItemByClass = function (item, className) {
    let node = item;
    while (node) {
      if (node.classList.contains(className)) {
        return node;
      }
      node = node.parentElement;
    }
    return null;
  }

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


  window.addEventListener('load', isVisibilityHidden);
  window.addEventListener('resize', isVisibilityHidden);
  window.addEventListener('scroll', isVisibilityHidden);

  document.addEventListener('mousedown', e => e.preventDefault())

  body.addEventListener('click', function (e) {
    let target = e.target;
    let scrollToItemClass = target.getAttribute('data-scroll-to');
    let arrowDownButton = closestItemByClass(target, 'sorting__icon');
    let likeButton = closestItemByClass(target, 'like-btn');

    console.log(likeButton);

    if (scrollToItemClass !== null) {
      e.preventDefault();

      let scrollToItem = document.querySelector('.' + scrollToItemClass);

      if (scrollToItem) {
        scroll(scrollToItem);
      }
    }
    if (arrowDownButton) {
      let parentBlockSortingByItem = closestItemByClass(target, 'sorting__by-item');

      let chooseList = parentBlockSortingByItem.querySelector('.sorting__choose-box');

      chooseList.classList.toggle('visibility-hidden');
    }
    if (likeButton) {
      likeButton.classList.toggle('like-btn--is-active');
    }


  })
})();