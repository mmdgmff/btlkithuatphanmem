document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/product-data.json')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            itemCart = 0;
            if (window.localStorage.getItem('itemCart') != null) {
                itemCart = Number(window.localStorage.getItem('itemCart'));
            }
            document.getElementById('item-cart-id').innerText = itemCart;
            const searchParams = new URLSearchParams(window.location.search);
            let check = searchParams.has('category');
            let check1 = searchParams.has('sort');
            let check2 = searchParams.has('keyword');
            let category = 'all';
            let sort = 'all';
            let keyword = 'all';
            if (check) {
                category = searchParams.get('category');
            }
            if (check1) {
                sort = searchParams.get('sort');
                document.getElementById(sort).classList.add('active');
            }
            if (check2) {
                keyword = searchParams.get('keyword').toLowerCase();
            }
            if (sort != 'all') {
                let values = sort.split('-');
                if (values[0] == 'name') {
                    data.sort(function (a, b) {
                        return a.productTitle.localeCompare(b.productTitle);
                    })
                }
                else if (values[0] == 'price' && values[1] == 'asc') {
                    data.sort(function (a, b) {
                        return a.productPrice - b.productPrice;
                    })
                }
                else if (values[0] == 'price' && values[1] == 'desc') {
                    data.sort(function (a, b) {
                        return b.productPrice - a.productPrice;
                    })
                }
            }
            let data1 = []
            if (keyword != 'all') {
                // console.log(data[0].productTitle.toLowerCase().includes(keyword));
                for (let i = 0; i < data.length; i++) {
                    if (data[i].productTitle.toLowerCase().includes(keyword) == true) {
                        data1.push(data[i])
                    }
                }
                data = data1.slice();
                // console.log(data);
            }
            renderData(data, category);

        })
        .catch(error => console.error('Error fetching data:', error));
});

function uRLSearchParams(key1, value1) {
    const searchParams = new URLSearchParams(window.location.search);
    let href = '/filter.html';
    let first = false;
    let check = searchParams.get(key1);
    if(check == null){
        searchParams.append(key1,value1);
    }
    else{
        searchParams.set(key1,value1);
    }
    for (const [key, value] of searchParams.entries()) {
        if (first == false) {
            href += `?${key}=${value}`;
            first = true;
        }
        else {
            href += `&${key}=${value}`;
        }
    }
    window.location.href = href;
    
}

function searchItem() {
    let item = document.getElementById('keyword11-id').value;
    uRLSearchParams('keyword', item);
    // window.location.href = '/filter.html?keyword=' + item;
}

function renderData(data, category) {
    const bookList = document.getElementById('book-list-id');
    if (data == null || data == undefined) return;
    data.forEach(book => {
        const html = ` <div class="product-item item-slider swiper-slide">
                            <div class="inner-image">
                                <div class="product-status"></div>
                                <div class="ratio-custome"><a onclick='getDetailView(${book.id})'
                                        title="${book.productTitle}"><img
                                            class="img-fluid"
                                            src="${book.productImage}"
                                            alt="${book.productTitle}"></a>
                                </div>
                                <div class="product-action"><a onclick='addtoCart(${book.id})'
                                        class="btn-product-action" title="Thêm giỏ hàng"><i
                                            class="fa-solid fa-cart-shopping"></i></a><a
                                        class="btn-product-action" onclick='getDetailView(${book.id})' title="Xem nhanh"><i
                                            class="fa fa-search-plus"></i></a></div>
                            </div>
                            <div class="inner-content text-center">
                                <div class="product-title"><a onclick='getDetailView(${book.id})'>${book.productTitle}</a></div>
                                <div class="price"><span class="price-amount">${book.productPrice}<span
                                            class="currency-symbol">đ</span></span></div>
                            </div>
                        </div>`;
        if (category == 'all') {
            const bookCardM = document.createElement('div');
            bookCardM.className = 'col-lg-3 col-md-6 col-6';
            bookCardM.innerHTML = html;
            bookList.appendChild(bookCardM);
        }
        else if (book.category == category) {
            const bookCardM = document.createElement('div');
            bookCardM.className = 'col-lg-3 col-md-6 col-6';
            bookCardM.innerHTML = html;
            bookList.appendChild(bookCardM);
        }
    });
}

function getDetailView(id) {
    window.localStorage.setItem('book-id', id);
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

function filterCategory(categoryDir) {
    uRLSearchParams('category', categoryDir);
}

function sortList(sortDir) {
    uRLSearchParams('sort', sortDir);
    // const searchParams = new URLSearchParams(window.location.search);
    // let check = searchParams.has('category');
    // if (check) {
    //     window.location.href = "/filter.html?category=" + searchParams.get('category') + '&sort=' + sortDir;
    // }
    // else {
    //     window.location.href = "/filter.html?sort=" + sortDir;
    // }

}