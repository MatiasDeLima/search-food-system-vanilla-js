// ======  scroll header ====== //
const scrollHeader = () => {
    const header = document.getElementById('header');

    this.scrollY >= 50 ? header.classList.add('scroll-header')
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader);

// ======  API Foods Fetch ====== //
const searchButton = document.getElementById('search-button');
const productList = document.getElementById('product-result');
const productModal = document.querySelector('.product__modal');
const modalClose = document.getElementById('modal-close');

searchButton.addEventListener('click', getProductList);
productList.addEventListener('click', getProductModal);
modalClose.addEventListener('click', () => {
    productModal.classList.remove('show-modal');
})

function getProductList() {
    let searchInputText = document.getElementById('search-input').value.trim();
    // console.log(searchIputText.length);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let html = "";
        if(data.meals) {
            data.meals.forEach(meal => {
                html += `
                    <article class="product__card" data-id = "${meal.idMeal}">
                        <img src="${meal.strMealThumb}" alt="card image" class="product__card-img" />
                        <div class="product__card-data">
                            <h4 class="product__card-name">${meal.strMeal}</h4>
                            <p class="product__card-category">Restaurant Food</p>
                            <button type="button" class="add-cart-btn">
                                View More<i class="ri-arrow-right-line"></i>
                            </button>
                        </div>
                    </article>
                `;
            });
            productList.classList.remove('not-found');
        } else {
            html = 'Enter a meal valid!';
            productList.classList.add('not-found');
        }

        productList.innerHTML = html;
    });
}

function getProductModal(e) {
    e.preventDefault();
    // console.log(e.target);
    if(e.target.classList.contains('add-cart-btn')) {
        let productItem = e.target.parentElement.parentElement;
        // console.log(productItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${productItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealProductModal(data.meals))/*){
            console.log(data);
        })*/
    }
}

function mealProductModal(meal) {
    // console.log(meal);
    meal = meal[0];

    let = html = `
        <div class="product__modal-close" id="modal-close">
            <i class="ri-close-line"></i>
        </div>

        <div class="product__modal-content">
            <h2 class="modal__content-title">
                ${meal.strMeal}
            </h2>

            <p class="modal__content-category">
                ${meal.strCategory}
            </p>

            <p class="modal__content-description">
                ${meal.strInstructions}
            </p>
        </div>

        <div class="modal__content-img">
            <img src="${meal.strMealThumb}" alt="modal image">
        </div>

        <button class="modal__button">
            Add to bag <i class="ri-shopping-bag-line"></i>
        </button>
    `;
    productModal.innerHTML = html;
    productModal.classList.add('show-modal');
}