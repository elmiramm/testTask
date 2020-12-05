; (function () {
  let body = document.querySelector('body');
  let catalogProducts = body.querySelector('.catalog__products');
  let allItems = catalogProducts.querySelectorAll('.products__item');
  let arrNoneSorted = [];
  const lastItem = allItems.length;
  let arrowUp = body.querySelector('.up-btn');
  let lastIndex = 6;

  function removeChildren(item) {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  }

  function updateChildren(item, children) {
    removeChildren(item);
    for (var i = 0; i < children.length; i += 1) {
      item.appendChild(children[i]);
    }
  }


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

  function sortingBy(dataAttr, noneSortedArray) {

    let min = minMax(noneSortedArray, dataAttr)[0];
    let arr = [];
    let arrSorted = [];

    for (let i = 0; i < noneSortedArray.length; i++) {
      let current = noneSortedArray[i];
      let currentDataAttr = current.getAttribute(dataAttr);
      let currentAttrNumber = Number(currentDataAttr);
      if (currentAttrNumber === min) {
        arrSorted.push(current);
      } else {
        arr.push(current);
      }
    }

    while (arr.length !== 0) {
      min = minMax(arr, dataAttr)[0];
      for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        let currentDataAttr = current.getAttribute(dataAttr);
        let currentAttrNumber = Number(currentDataAttr);
        if (currentAttrNumber === min) {
          arrSorted.push(current);
          arr.splice(i, 1);
          i = -1;
        }
      }
    }

    return arrSorted;
  }

  function sortingByDescending(dataAttr, noneSortedArray) {
    let arrSorted = sortingBy(dataAttr, noneSortedArray).reverse();
    updateChildren(catalogProducts, arrSorted);
  }

  function sortingByAscending(dataAttr, noneSortedArray) {
    let arrSorted = sortingBy(dataAttr, noneSortedArray);
    updateChildren(catalogProducts, arrSorted);
  }

  function isRadioButtonStatus() {
    let priceAscending = document.getElementById('price__ascending');
    let priceDescending = document.getElementById('price__descending');
    let ageAscending = document.getElementById('age__ascending');
    let ageDescending = document.getElementById('age__descending');

    if (priceAscending.checked) {
      sortingByAscending('data-price', arrNoneSorted);
    }
    if (priceDescending.checked) {
      sortingByDescending('data-price', arrNoneSorted);
    }
    if (ageAscending.checked) {
      sortingByAscending('data-age', arrNoneSorted);
    }
    if (ageDescending.checked) {
      sortingByDescending('data-age', arrNoneSorted);
    }
  }

  function closestItemByClass(item, className) {
    let node = item;
    while (node) {
      if (node.classList.contains(className)) {
        return node;
      }
      node = node.parentElement;
    }
    return null;
  }

  function cleanVisuallyHidden() {
    for (let i = 0; i < lastItem; i++) {
      if (allItems[i].classList.contains('visibility-hidden')) {
        allItems[i].classList.remove('visibility-hidden');
      }
    }
  }

  function countOfProductItemsOnPage() {
    cleanVisuallyHidden();
    if (lastItem > lastIndex) {
      for (let i = lastIndex; i < lastItem; i++) {
        allItems[i].classList.add('visibility-hidden');
      }
      for (let i = 0; i < lastIndex; i++) {
        arrNoneSorted[i] = allItems[i];
      }
      isRadioButtonStatus();
    }
  }

  function insertAttribute() {
    for (let i = 0; i < lastItem; i++) {
      let current = allItems[i];
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

  function scroll(target) {
    let targetTop = target.getBoundingClientRect().top;
    let scrollTop = window.pageYOffset;
    let targetOffsetTop = targetTop + scrollTop;

    window.scrollTo(0, targetOffsetTop,
      {
        behavior: 'smooth'
      }
    );
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

  function isDisabledButtons() {
    let productsBtn = catalogProducts.querySelectorAll('.products__btn');
    for (let i = 0; i < productsBtn.length; i++) {
      let current = productsBtn[i];
      if (current.classList.contains('is-disabled')) {
        current.textContent = 'Продан';
      }
    }
  }

  document.addEventListener('mousedown', function (e) {
    let target = e.target;
    let mailInput = closestItemByClass(target, 'mail-input');
    console.log(mailInput);
    if (mailInput === null) {
      e.preventDefault();
    }
  });

  window.addEventListener('load', function () {

    isDisabledButtons();
    isVisibilityHidden();
    insertAttribute();
    countOfProductItemsOnPage();
  })

  window.addEventListener('resize', isVisibilityHidden);
  window.addEventListener('scroll', isVisibilityHidden);

  body.addEventListener('click', function (e) {
    let target = e.target;
    let scrollToItemClass = target.getAttribute('data-scroll-to');
    let showMoreButton = closestItemByClass(target, 'more-items__btn');
    let arrowDownButton = closestItemByClass(target, 'sorting__icon');
    let likeButton = closestItemByClass(target, 'like-btn');
    let btn = closestItemByClass(target, 'sorting__by-btn');
    let burger = closestItemByClass(target, 'header__burger');


    if (scrollToItemClass !== null) {
      e.preventDefault();
      let scrollToItem = document.querySelector('.' + scrollToItemClass);
      if (scrollToItem) {
        scroll(scrollToItem);
      }
    }
    if (showMoreButton) {
      e.preventDefault();
      lastIndex = lastIndex + 20;
      countOfProductItemsOnPage();
      if (lastItem < lastIndex) {
        showMoreButton.textContent = 'Вы пpосмотрели всех котэ';
        showMoreButton.disabled = true;
        for (let i = 0; i < lastItem; i++) {
          arrNoneSorted[i] = allItems[i];
        }
        isRadioButtonStatus();
      }
    }
    if (arrowDownButton) {
      e.preventDefault();
      let parentBlockSortingByItem = closestItemByClass(target, 'sorting__by-item');
      let chooseList = parentBlockSortingByItem.querySelector('.sorting__choose-box');
      chooseList.classList.toggle('visibility-hidden');
    }
    if (likeButton) {
      e.preventDefault();
      likeButton.classList.toggle('like-btn--is-active');
    }
    if (btn) {
      e.preventDefault();
      let radioInput = btn.querySelector('.radio__input');
      radioInput.checked = true;
      isRadioButtonStatus();
    }
    if (burger) {
      let burgerDependentElementsNav = body.querySelector('.header__nav');
      let burgerDependentElementsContacts = body.querySelector('.header__contacts');

      burgerDependentElementsContacts.classList.toggle('header__burger--is-active');
      burgerDependentElementsNav.classList.toggle('header__burger--is-active');


    }
  })

})();