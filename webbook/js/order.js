document.addEventListener('DOMContentLoaded', () => {
	fetch('./data/product-data.json')
		.then(response => response.json())
		.then(data => {
			// console.log(data);
			document.getElementById('item-cart-id').innerText = Number(window.localStorage.getItem('itemCart'));
			let itemCart1 = window.localStorage.getItem('itemCart');
			if(itemCart1 == null) itemCart1 = 0;
			document.getElementById('total-quantity-id').innerText = ' (' + itemCart1 + ' Sản phẩm) ';
			const cartList = document.getElementById('cart-list-id');
			const length = window.localStorage.length;
			let totalPriceSum = 0;
			for (let i = 0; i < length; i++) {
				const key = Number(window.localStorage.key(i));
				if (!isNaN(key) && key != null && key != undefined) {
					// console.log(key);
					const item = data.find(el => el.id == key);
					const quantity = window.localStorage.getItem(String(key));
					const totalPrice = item.productPrice * quantity;
					totalPriceSum += totalPrice;
					// console.log(quantity);
					// console.log(item);
					const html = `<th scope="row">
					<div class="row mx-n2">
						<div class="col-lg-2 col-3 px-2">
							<div class="rounded overflow-hidden ratio-1-1"><a
							onclick='getDetailView(${item.id})'><img class="img-fluid"
										src="${item.productImage}"
										alt="${item.productTitle}"></a></div>
						</div>
						<div class="col-lg-10 col-9 px-2">
							<div class="flex-column d-flex"><a onclick='getDetailView(${item.id})'>
									<div class="name-cart"> ${item.productTitle} </div>
								</a>
								<div class="remove-cart mt-2"><a onclick="deleteItem(${item.id})"
										class="font-weight-normal color-highlight">Xóa</a></div>
							</div>
						</div>
					</div>
				</th>
				<td data-title="Giá"><span>${item.productPrice}</span><span class="currency-symbol">đ</span></td>
				<td data-title="Số lượng" class="item-quantity">
					<div class="product-quantity " style=" left:33%";>
						<span class="btn-quantity quantity-subtract" onclick='minusQuantity(${item.id},${item.productPrice})'>
							<i class="fas fa-minus"></i>
						</span>
						<input  onchange='changeQuantity(this,${item.productPrice},${item.id})' id='quantity-${item.id}-id' value="${quantity}" class="text-center number-input" type="text" maxlength="3">
							<span class="btn-quantity quantity-add">
								<i class="fas fa-plus" onclick='addQuantity(${item.id},${item.productPrice})'></i>
							</span>
					</div>
				</td>
				<td class="text-right" data-title="Tiền"><span class='total-price-item' id='total-price-${item.id}-id'
						>${totalPrice}</span><span
						class="currency-symbol">đ</span></td>`;
					const bookCard = document.createElement('tr');
					bookCard.className = 'cart-item border-bottom';
					bookCard.innerHTML = html;
					cartList.appendChild(bookCard);

				}
				// it = data.find(el => el.id = key);

			}
			document.getElementById('total-price-sum-id').innerText = totalPriceSum;
		})
		.catch(error => console.error('Error fetching data:', error));
});

function searchItem(){
	console.log('abcc');
    let item = document.getElementById('keyword11-id').value;
    window.location.href = '/filter.html?keyword=' + item;
}

function deleteItem(id){
	window.localStorage.removeItem(id);
	let cartItem = window.localStorage.getItem('itemCart');
	window.localStorage.setItem('itemCart',Number(cartItem) - 1);
	alert("Đã loại bỏ sản phảm khỏi giỏ hàng!");
	window.location.reload();
}

function getDetailView(id){
    window.localStorage.setItem('book-id',id);
    window.location.href = '/detail.html';
}

function minusQuantity(id,price){
	let quantity = document.getElementById(`quantity-${id}-id`).value;
	if (Number(quantity) > 1){
		document.getElementById(`quantity-${id}-id`).value = Number(quantity) - 1;
		document.getElementById(`total-price-${id}-id`).innerText = price * (Number(quantity) - 1);
		getTotalPriceSum();
		window.localStorage.setItem(id,(Number(quantity) - 1));
	}
	else{
		deleteItem(id);
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

function changeQuantity(item,price,id){
	let quantity = item.value;
	if(isNaN(Number(quantity))){
		item.value = 1;
	}
	else if(Number(quantity) < 1)  item.value = 1;
	document.getElementById(`total-price-${id}-id`).innerText = price * Number(item.value);
	getTotalPriceSum();
	window.localStorage.setItem(id,item.value);
}

function addQuantity(id,price){
	let quantity = document.getElementById(`quantity-${id}-id`).value;
	document.getElementById(`quantity-${id}-id`).value = Number(quantity) + 1;
	document.getElementById(`total-price-${id}-id`).innerText = price * (Number(quantity) + 1);
	getTotalPriceSum();
	window.localStorage.setItem(id,Number(quantity) + 1);
}