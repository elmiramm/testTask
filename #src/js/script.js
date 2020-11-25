// переход на начало страницы по клику на стрелку вверх

; (function () {
  var body = document.querySelector('body');

  var scroll = function (target) {
    var targetTop = target.getBoundingClientRect().top;
    var scrollTop = window.pageYOffset;
    var targetOffsetTop = targetTop + scrollTop;

    window.scrollTo(0, targetOffsetTop);
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