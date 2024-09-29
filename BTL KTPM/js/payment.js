document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/product-data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('item-cart-id').innerText = Number(window.localStorage.getItem('itemCart'));
            const length = window.localStorage.length;
            const paymentList = document.getElementById('payment-list-id');
            let totalPriceSum = 0;
            for (let i = 0; i < length; i++) {
                const key = Number(window.localStorage.key(i));
                if (!isNaN(key)) {
                    // console.log(key);
                    const item = data.find(el => el.id == key);
                    const quantity = window.localStorage.getItem(String(key));
                    const totalPrice = item.productPrice * quantity;
                    totalPriceSum += totalPrice;
                    // console.log(quantity);
                    // console.log(item);
                    const html = `<div class="col-2 px-2">
                    <div class="ratio-1-1">
                        <a onclick='getDetailView(${item.id})'>
                            <img class="img-fluid object-contain"
                                src="${item.productImage}"
                                alt="${item.productTitle}" />
                        </a>
                    </div>
                </div>
                <div class="col-10 px-2">
                    <div class="top-name-right">
                        <div class="name-element font-weight-bold">
                            <a class="color-main" onclick='getDetailView(${item.id})'>
                            ${item.productTitle}
                            </a>
                        </div>
                        <div>
                            Số lượng:
                            <span>
                                ${quantity}
                            </span>
                        </div>
                        <div class="price-quantity">
                            <span class="price-amount">
                                ${totalPrice}
                                <span class="currency-symbol">
                                    đ
                                </span>
                            </span>
                        </div>
                    </div>
                </div>`;
                    const bookCard = document.createElement('div');
                    bookCard.className = 'row mx-n2 mb-4';
                    bookCard.innerHTML = html;
                    paymentList.appendChild(bookCard);

                }
                document.getElementById('total-price-sum-id').innerText = totalPriceSum + ' đ';
                document.getElementById('total-pr-id').innerText = totalPriceSum + 25000 + ' đ';
                // it = data.find(el => el.id = key);

            }
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

function paymentInvoice(){
    alert('Thanh toán thành công !')
    window.localStorage.clear();
    window.location.href = '/';
}