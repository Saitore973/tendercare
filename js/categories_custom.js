/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Isotope
5. Init Price Slider
6. Init Products Height


******************************/

console.log('heeetttyy');

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var menuActive = false;
	var menu = $('.menu');
	var burger = $('.burger_container');

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initIsotope();
	initPriceSlider();
	initProductsHeight();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 100)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var menu = $('.menu');
			if($('.burger_container').length)
			{
				burger.on('click', function()
				{
					if(menuActive)
					{
						closeMenu();
					}
					else
					{
						openMenu();

						$(document).one('click', function cls(e)
						{
							if($(e.target).hasClass('menu_mm'))
							{
								$(document).one('click', cls);
							}
							else
							{
								closeMenu();
							}
						});
					}
				});
			}
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

	/* 

	4. Init Isotope

	*/

	function initIsotope()
	{
		var sortingButtons = $('.product_sorting_btn');
		var sortNums = $('.num_sorting_btn');

		if($('.product_grid').length)
		{
			var grid = $('.product_grid').isotope({
				itemSelector: '.product',
				layoutMode: 'fitRows',
	            getSortData:
	            {
	            	price: function(itemElement)
	            	{
	            		var priceEle = $(itemElement).find('.product_price').text().replace( '$', '' );
	            		return parseFloat(priceEle);
	            	},
	            	name: '.product_name',
	            	stars: function(itemElement)
	            	{
	            		var starsEle = $(itemElement).find('.rating');
	            		var stars = starsEle.attr("data-rating");
	            		return stars;
	            	}
	            },
	            animationOptions:
	            {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	        });
	        
	        // Sort based on the value from the sorting_type dropdown
	        sortingButtons.each(function()
	        {
	        	$(this).on('click', function()
	        	{
	        		var parent = $(this).parent().parent().find('.sorting_text');
		        		parent.text($(this).text());
		        		var option = $(this).attr('data-isotope-option');
		        		option = JSON.parse( option );
	    				grid.isotope( option );
	        	});
	        });

	        // Change view to Box
	        if($('.box_view').length)
	        {
	        	var box = $('.box_view');
	        	box.on('click', function()
	        	{
	        		if(window.innerWidth > 767)
	        		{
	        			$('.item').addClass('box');
		        		var option = '{ "sortBy": "original-order" }';
		        		option = JSON.parse(option);
						grid.isotope(option);
	        		}	
	        	});
	        }

	        // Change view to List
	        if($('.detail_view').length)
	        {
	        	var detail = $('.detail_view');
	        	detail.on('click', function()
	        	{
	        		if(window.innerWidth > 767)
	        		{
	        			$('.item').removeClass('box');
		        		var option = '{ "sortBy": "original-order" }';
		        		option = JSON.parse(option);
		        		grid.isotope(option);
		        		setTimeout(function()
		        		{
		        			grid.isotope(option);
		        		},500);
	        		}
	        	});
	        }

	         // Show only a selected number of items
	        sortNums.each(function()
	        {
	        	$(this).on('click', function()
	        	{
	        		var numSortingText = $(this).text();
					var numFilter = ':nth-child(-n+' + numSortingText + ')';
	        		$('.num_sorting_text').text($(this).text());
    				$('.product_grid').isotope({filter: numFilter });
	        	});
	        });	
		}
	}

	/* 

	5. Init Price Slider

	*/

    function initPriceSlider()
    {
    	if($("#slider-range").length)
    	{
    		$("#slider-range").slider(
			{
				range: true,
				min: 20,
				max: 199,
				values: [ 20, 199 ],
				slide: function( event, ui )
				{
					$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
				}
			});
				
			$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
			$('.filter_price').on('mouseup', function()
			{
				$('.product_grid').isotope({
		            filter: function()
		            {
		            	var priceRange = $('#amount').val();
			        	var priceMin = parseFloat(priceRange.split('-')[0].replace('$', ''));
			        	var priceMax = parseFloat(priceRange.split('-')[1].replace('$', ''));
			        	var itemPrice = $(this).find('.product_price').clone().children().remove().end().text().replace( '$', '' );

			        	return (itemPrice > priceMin) && (itemPrice < priceMax);
		            },
		            animationOptions: {
		                duration: 750,
		                easing: 'linear',
		                queue: false
		            }
		        });
			});
    	}	
    }

    /* 

	6. Init Products Height

	*/

	function initProductsHeight()
	{
		if($('.sidebar_left').length)
		{
			var sidebarH = $('.sidebar_left').outerHeight(true) + 309;
			$('.products').css('min-height', sidebarH);
		}
	}
});

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
	cartItems= JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");

	console.log(cartItems);
	if (cartItems && productContainer){
		productContainer.innerHTML = '';
		Object.values(cartItems).map (item => {
			productContainer.innerHTML += `
			<div class="product">
			😂
			<img src="./images/${item.tag}.jpg"/>
			<span>${item.name}</span>
			</div>
			<div class="price">${item.price}</div>
			

			`
		});
		
	}
}


onLoadCartNumbers();
displayCart();
