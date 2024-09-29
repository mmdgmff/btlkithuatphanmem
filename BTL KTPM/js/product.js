document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/product-data.json')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            itemCart = 0;
            if (window.localStorage.getItem('itemCart') != null) {
                itemCart = Number(window.localStorage.getItem('itemCart'));
            }
            document.getElementById('item-cart-id').innerText = itemCart;
            const bookList = document.getElementById('book-list');
            const bookList1 = document.getElementById('swiper-wrapper-list-id');
            data.forEach(book => {
                const html = `
            <div class="product-item swiper-slide">
                <div class="row">
                    <div class="col-4">
                        <div class="inner-image">
                            <div class="ratio-custome"><a onclick='getDetailView(${book.id})'
                                    title="${book.productTitle}"><img
                                        class="img-fluid"
                                        src="${book.productImage}"
                                        alt="${book.productTitle}"></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="inner-content">
                            <div class="product-title"><a onclick='getDetailView(${book.id})'>${book.productTitle}</a></div>
                            <div class="price"><span class="price-amount">${book.productPrice}<span
                                        class="currency-symbol">đ</span></span></div>
                            </div>
                        </div>
                    </div>
                </div>`;
                const bookCard = document.createElement('div');
                bookCard.className = 'col-sm-4 col-12';
                bookCard.innerHTML = html;
                bookList.appendChild(bookCard);

                const html1 = `<div class="product-item item-slider swiper-slide">
            <div class="inner-image">
                <div class="product-status"></div>
                <div class="ratio-custome"><a onclick='getDetailView(${book.id})'
                        title="${book.productTitle}"><img nh-lazy="image"
                            class="img-fluid"
                            src="${book.productImage}"
                            alt="${book.productTitle}"></a>
                </div>
                <div class="product-action"><a class="btn-product-action"><i onclick='addtoCart(${book.id})'
                            class="fa-solid fa-cart-shopping"></i></a><a
                        nh-btn-action="quick-view" data-product-id="47"
                        class="btn-product-action" onclick='getDetailView(${book.id})'
                        title="Xem nhanh"><i class="fa fa-search-plus"></i></a></div>
            </div>
            <div class="inner-content text-center">
                <div class="product-title"><a onclick='getDetailView(${book.id})'>${book.productTitle}</a></div>
                <div class="price"><span class="price-amount">${book.productPrice}<span
                            class="currency-symbol">đ</span></span></div>
            </div>`;
                if(book.category == 0){
                    const bookCardM1 = document.createElement('div');
                    bookCardM1.innerHTML = html1;
                    bookList1.appendChild(bookCardM1);
                }
            });
            $('.multiple-items-1').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 5,
                autoplay: true,
                slidesToScroll: 3,
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});


function searchItem(){
    let item = document.getElementById('keyword11-id').value;
    window.location.href = '/filter.html?keyword=' + item;
}

function getDetailView(id){
    window.localStorage.setItem('book-id',id);
    window.location.href = '/detail.html';
}

function addtoCart(id) {
    alert('Đã thêm vào giỏ hàng thành công!');
    itemCart = 0;
    if (window.localStorage.getItem('itemCart') != null) {
        itemCart = Number(window.localStorage.getItem('itemCart'));
    }

    if (window.localStorage.getItem(id) == null) {
        window.localStorage.setItem(id, 1);
        window.localStorage.setItem('itemCart', itemCart + 1)
    }
    else {
        item = Number(window.localStorage.getItem(id));
        window.localStorage.setItem(id, item + 1);
    }
    document.getElementById('item-cart-id').innerText = Number(window.localStorage.getItem('itemCart'));
}