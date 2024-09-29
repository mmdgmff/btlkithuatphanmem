let detail_id = 0;
document.addEventListener('DOMContentLoaded', () => {
	fetch('./data/product-data.json')
		.then(response => response.json())
		.then(data => {
            detail_id = window.localStorage.getItem('book-id');
            if(detail_id == null) window.location.href = '/';
            document.getElementById('item-cart-id').innerText = Number(window.localStorage.getItem('itemCart'));
            detail = data.find(el => el.id == Number(detail_id));
            document.getElementById('detail-title-id').innerText = detail.productTitle;
            document.getElementById('detail-des-id').innerText = detail.productDescription;
            document.getElementById('detail-des-2-id').innerText = detail.productDescription;
            document.getElementById('detail-price-id').innerText = detail.productPrice + ' đ';
            document.getElementById('detail-img-id').setAttribute('src',detail.productImage);
		})
		.catch(error => console.error('Error fetching data:', error));
});

function minusQuantity(){
	let quantity = document.getElementById(`quantity-id`).value;
	if (Number(quantity) > 1){
		document.getElementById(`quantity-id`).value = Number(quantity) - 1;
	}
	
}

function getTotalPriceSum(){
	let items = document.querySelectorAll('.total-price-item');
	let totalPriceSum = 0;
	// console.log(items);
	items.forEach(el =>{
		console.log(el.innerText);
		totalPriceSum += Number(el.innerText);
	});
	document.getElementById('total-price-sum-id').innerText = totalPriceSum;
}

function changeQuantity(item){
	let quantity = item.value;
	if(isNaN(Number(quantity)) || Number(quantity) < 1){
		item.value = 1;
	}
}

function searchItem(){
    let item = document.getElementById('keyword11-id').value;
    window.location.href = '/filter.html?keyword=' + item;
}

function addQuantity(){
	let quantity = document.getElementById(`quantity-id`).value;
	document.getElementById(`quantity-id`).value = Number(quantity) + 1;
}

function addtoCart() {
    itemCart = 0;
    alert('Đã thêm vào giỏ hàng thành công!');
    let quantity = document.getElementById(`quantity-id`).value;
    if (window.localStorage.getItem('itemCart') != null) {
        itemCart = Number(window.localStorage.getItem('itemCart'));
    }

    if (window.localStorage.getItem(detail_id) == null) {
        window.localStorage.setItem(detail_id, Number(quantity));
        window.localStorage.setItem('itemCart', itemCart + 1)
    }
    else {
        item = Number(window.localStorage.getItem(detail_id));
        window.localStorage.setItem(detail_id, item + Number(quantity));
    }
    document.getElementById('item-cart-id').innerText = Number(window.localStorage.getItem('itemCart'));
}
