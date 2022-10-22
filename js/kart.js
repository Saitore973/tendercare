
let products = [
	{
		name: 'old sheen',
		tag: 'oldsheen',
		price: 450,
		inCart:0
	},

	{
		name: 'pomade',
		tag: 'pomade',
		price: 150,
		inCart:0
	},

	{
		name: 'old sheen',
		tag: 'oldsheen',
		price: 450,
		inCart:0
	},

	{
		name: 'old sheen',
		tag: 'oldsheen',
		price: 450,
		inCart:0
	},

	{
		name: 'old sheen',
		tag: 'oldsheen',
		price: 450,
		inCart:0
	}
]

let carts = document.querySelectorAll('.product_fav');
for (let i = 0; i <carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
		totalCost(products[i]);
	})
}

function onLoadCartNumbers() {
	let productNumbers= localStorage.getItem('cartNumbers');
	if (productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

function cartNumbers (product) {
	console.log('product is', product)
	let productNumbers = localStorage.getItem('cartNumbers');
	
	productNumbers= parseInt(productNumbers);
	if (productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers+1);
		document.querySelector('.cart span').textContent= productNumbers+1;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart span').textContent=1;
	}
	
	setItems(product);

}

function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	
	if (cartItems !=null) {
		if (cartItems[product.tag] == undefined) {
			cartItems= {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else {
		product.inCart = 1;
		cartItems={
			[product.tag]: product
		}
	}

	
	
	localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	console.log('my cart cost is', cartCost);

	if (cartCost !=null){
		cartCost = parseInt(cartCost);
		localStorage.setItem('totalCost', cartCost+product.price);
	} else{
		localStorage.setItem('totalCost', product.price);
	}
}

function displayCart(){
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".product-container");

	console.log(cartItems);

	if(cartItems && productContainer){
		productContainer.innerHTML="";
		Objectvalues(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class="product">
			<ion-icon name="trash-outline"></ion-icon>
			<img src="images/${item.tag}.jpg> 
			<span>${item.name}</span>
			</div>
			
			`
			

		}
			)

	}
}
onLoadCartNumbers();
displayCart();