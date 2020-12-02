; (function () {
  let body = document.querySelector('body');
  let arrowUp = document.querySelector('.up-btn');

  let catalogProducts = document.querySelector('.catalog__products');

  function minMax(arr, dataAttr) {
    let min;
    let max;

    for (let i = 0; i < arr.length; i++) {
      let current = arr[i];
      let currentDataAttr = current.getAttribute(dataAttr);
      let dataAttrNumber = Number(currentDataAttr);
      if (i === 0) {
        min = dataAttrNumber;
        max = dataAttrNumber;
      }
      if (min > dataAttrNumber) {
        min = dataAttrNumber;
      }
      if (max < dataAttrNumber) {
        max = dataAttrNumber;
      }
    }

    return [min, max];
  }

  let removeChildren = function (item) {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  }
  let updateChildren = function (item, children) {
    removeChildren(item);
    for (var i = 0; i < children.length; i += 1) {
      item.appendChild(children[i]);
    }
  }

  function sortingBy(dataAttr) {
    let productItems = body.querySelectorAll('.products__item');

    let arrSorted = [];
    let arrNoneSorted = [];

    let min = minMax(productItems, dataAttr)[0];


    for (let i = 0; i < productItems.length; i++) {
      let current = productItems[i];

      let currentDataAttr = current.getAttribute(dataAttr);
      let currentAttrNumber = Number(currentDataAttr);

      if (currentAttrNumber === min) {
        arrSorted.push(current);
      } else {
        arrNoneSorted.push(current);
      }
    }

    while (arrNoneSorted.length !== 0) {
      min = minMax(arrNoneSorted, dataAttr)[0];

      for (let i = 0; i < arrNoneSorted.length; i++) {
        let current = arrNoneSorted[i];
        let currentDataAttr = current.getAttribute(dataAttr);
        let currentAttrNumber = Number(currentDataAttr);

        if (currentAttrNumber === min) {
          arrSorted.push(current);
          arrNoneSorted.splice(i, 1);
          i = -1;
        }
      }
    }

    return arrSorted;
  }

  function sortingByDescending(dataAttr) {
    let arrSorted = sortingBy(dataAttr).reverse();

    updateChildren(catalogProducts, arrSorted);
  }

  function sortingByAscending(dataAttr) {
    let arrSorted = sortingBy(dataAttr);

    updateChildren(catalogProducts, arrSorted);
  }

  function insertAttribute() {
    let productItems = body.querySelectorAll('.products__item');

    for (let i = 0; i < productItems.length; i++) {
      let current = productItems[i];

      let year = current.querySelector('.count__number-year').textContent;
      if (year.length !== 0) {
        year = Number(year) * 12;
      }
      else {
        year = Number(year);
      }

      let month = current.querySelector('.count__number-month').textContent;
      if (month.length === 0) {
        month = 0;
      }
      else {
        month = Number(month);
      }

      let ageInMonth = Number(year) + Number(month);

      let priceString = current.querySelector('.product__prise-number').textContent;
      let price = priceString.split(' ').join('');

      current.setAttribute('data-age', ageInMonth);
      current.setAttribute('data-price', price);
    }
  }

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


  window.addEventListener('load', function () {

    isVisibilityHidden();
    insertAttribute();

    let catalog = document.querySelector('.catalog__products');

    let productsBtn = catalog.querySelectorAll('.products__btn');

    for (let i = 0; i < productsBtn.length; i++) {
      let current = productsBtn[i];

      if (current.classList.contains('is-disabled')) {
        current.textContent = 'Продан';
      }
    }

  });

  window.addEventListener('resize', isVisibilityHidden);
  window.addEventListener('scroll', isVisibilityHidden);
  document.addEventListener('mousedown', e => e.preventDefault())
  body.addEventListener('click', function (e) {
    let target = e.target;

    let scrollToItemClass = target.getAttribute('data-scroll-to');
    let arrowDownButton = closestItemByClass(target, 'sorting__icon');
    let likeButton = closestItemByClass(target, 'like-btn');


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

      let isVisHidden = chooseList.classList.contains('visibility-hidden');

      if (isVisHidden === false) {

        chooseList.addEventListener('click', function () {
          let priceAscending = document.getElementById('price__ascending');
          let priceDescending = document.getElementById('price__descending');
          let ageAscending = document.getElementById('age__ascending');
          let ageDescending = document.getElementById('age__descending');

          if (priceAscending.checked) {
            sortingByAscending('data-price');
          }
          if (priceDescending.checked) {
            sortingByDescending('data-price');
          }
          if (ageAscending.checked) {
            sortingByAscending('data-age');
          }
          if (ageDescending.checked) {
            sortingByDescending('data-age');
          }
        })
      }
    }

    if (likeButton) {
      likeButton.classList.toggle('like-btn--is-active');
    }

  })
})();