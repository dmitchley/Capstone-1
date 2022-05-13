 // empty array the products will be pushed to
 let productsInCart = JSON.parse(localStorage.getItem('Shopping Cart'));
 if (!productsInCart) {
     productsInCart = [];
 }
 // append to elements
 const parentElement = document.getElementById("contentz");
 const totalPrice = document.getElementById("pricer");
 const products = document.querySelectorAll('.product-under');



 // calculate total price and include vat

 const countTheSumPrice = function () {

     let sum = 0;
     productsInCart.forEach(product => {

         sum += product.price;

     });

     let vat = sum * 14 / 100;

     return sum + vat;
 }



 // append each product item to shopping cart used on page - checkout.html and has controls to change QTY of items

 const updateShoppingCartHTML = function () {
     localStorage.setItem('Shopping Cart', JSON.stringify(productsInCart));
     // if the cart has a product inside it will display in the shopping cart 
     if (productsInCart.length > 0) {
         let result = productsInCart.map(product => {
             return `
            <tr>
            <td class="w-25">
              <img src="${product.image}" class="img-fluid img-thumbnail" alt="Sheep">
              <button class="button-hide">Hide Image</button>
            </td>
            <td>${product.name}</td>
            <td>R ${product.price}</td>
            <td>
            
            </td>
            <td> </td>
            <td>
            
            <button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>

                            <td> <button class="btn btn-danger delete-item" data-id=${product.id}>Delete</button> </td>
              
            </td>
          </tr>
            `
         });


         parentElement.innerHTML = result.join('');
         totalPrice.innerHTML = 'R' + countTheSumPrice().toFixed();



     }
     // empty shopping cart displays this text
     else {

         totalPrice.innerHTML = "";
         parentElement.innerHTML = "<h4>Your Cart is empty</h4>";
     }
 }


 // jquery hide product image on cart


 $(document).ready(function () {
     $(".button-hide").click(function () {
         $(".img-thumbnail").hide();
         $(".button-hide").hide();
     });
 });


 // jquery add dropdown menu

 $(document).ready(function () {

     $(".dropdown-menu").append(`
    
                            <li><a class="dropdown-item text-light" href="#">Running Shoes</a></li>
                            <li><a class="dropdown-item text-light" href="#">Dress Shoes</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item text-light" href="#">Sneakers</a></li>

    `);

 });


 // jquery animated effect
 $(document).ready(function () {

     $("#Check-out").click(function () {
         $("#animated-logo").toggle("slow", function () {
             $("#animated-logo").animate({
                 top: "+=20px",
                 left: "+=50px",
                 width: "+=50px",
                 height: "+=50px"
             });
         });
     });


 });


 // jquery chained effect

 $(document).ready(function () {
     $("#Check-out").click(function () {
         $("#reference-number").css("color", "red").slideUp(2000).slideDown(2000);
     });
 });





 // append each product item to cart used on page - shipping.html,discount.html  

 function CartHTML() {
     localStorage.setItem('Shopping Cart', JSON.stringify(productsInCart));
     // if the cart has a product inside it will display in the shopping cart 
     if (productsInCart.length > 0) {
         let result = productsInCart.map(product => {
             return `
             <tr>
                              <th scope="col"></th>
                              <th scope="col">Product</th>
                              <th scope="col">Price</th>
                              <th scope="col">QTY</th>
                             
                           
                            </tr>
            <tr>
            <td class="w-25">
              <img src="${product.image}" class="img-fluid img-thumbnail" alt="Sheep">
            </td>
            <td>${product.name}</td>
            <td>R ${product.price}</td>
            <td>
            <span class="countOfProduct">${product.count}</span>
            </td>
            <td> </td>
            <td>
            
            </td>
          </tr>
             `;
         });


         parentElement.innerHTML = result.join('');
         totalPrice.innerHTML = 'R' + countTheSumPrice().toFixed();



     }

     // empty shopping cart displays this text
     else {

         totalPrice.innerHTML = "";
         parentElement.innerHTML = "<h4>Your Cart is empty</h4>";
     }
 }




 // each product has in the html an data-product-id="5" element that helps count the products inside the cart
 function updateProductsInCart(product) {
     // cycles through each product. Calculates total more than one of each kind gets added
     for (let i = 0; i < productsInCart.length; i++) {
         if (productsInCart[i].id == product.id) {
             productsInCart[i].count += 1;
             productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;


             return;
         }

     }
     productsInCart.push(product);
 }

 // onclick each element is taken from the html and appended to the object. The forEach loop helps to loop though each specific item
 products.forEach(product => {
     product.addEventListener('click', (e) => {
         if (e.target.classList.contains('addToCart')) {
             const productID = e.target.dataset.productId;
             const productName = product.querySelector('.productName').innerHTML;
             const productPrice = product.querySelector('.priceValue').innerHTML;
             const productImage = product.querySelector('img').src;
             // create object
             let productToCart = {
                 name: productName,
                 image: productImage,
                 id: productID,
                 count: 1,
                 price: +productPrice,
                 basePrice: +productPrice,

             }
             updateProductsInCart(productToCart);
             updateShoppingCartHTML();
             alert("Your total including Vat is R " + countTheSumPrice().toFixed())
         }
     });
 });

 let checkout_area = document.getElementById('checkout-area');

 // function that listens for the adding of the shipping method, delete item and adding multiple of the same type of item

 checkout_area.addEventListener('click', (e) => { // Last
     const deleteButton = e.target.classList.contains('delete-item');
     const isPlusButton = e.target.classList.contains('button-plus');
     const isMinusButton = e.target.classList.contains('button-minus');

     // add R2000 plus vat for next day delivery
     let nextdayDelivery = e.target.classList.contains('day-btn');

     if (nextdayDelivery) {
         for (let i = 0; i < productsInCart.length; i++) {
             if (nextdayDelivery) {
                 productsInCart[i].price = productsInCart[i].price + 2000;
                 alert(`Next Day Shipping Added your total is now R ${countTheSumPrice().toFixed()}`)
             }

         }

         CartHTML();
     }

     // add R500 plus vat for one or two day delivery
     let oneortwodayShipping = e.target.classList.contains('onetotwoday-btn');

     if (oneortwodayShipping) {
         for (let i = 0; i < productsInCart.length; i++) {
             if (oneortwodayShipping) {
                 productsInCart[i].price = productsInCart[i].price + 500;
                 alert(`Next Day Shipping Added your total is now R ${countTheSumPrice().toFixed()}`)
             }

         }

         CartHTML();
     }



     // delete, add or minus of each type

     if (deleteButton || isPlusButton || isMinusButton) {
         for (let i = 0; i < productsInCart.length; i++) {

             if (productsInCart[i].id == e.target.dataset.id) {

                 if (deleteButton) {
                     productsInCart.splice(i, 1);
                 }
                 if (isPlusButton) {
                     productsInCart[i].count += 1
                 } else if (isMinusButton) {
                     productsInCart[i].count -= 1
                 }
                 productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

             }
             if (productsInCart[i].count <= 0) {
                 productsInCart.splice(i, 1);
             }
         }
         updateShoppingCartHTML();
     }
 });

 updateShoppingCartHTML();














 // this adds a discount on the page discount.html


 let discount_area = document.getElementById('discount-area');

 discount_area.addEventListener('click', (e) => {

     let discount = document.getElementById('discount-btn');

     // password for discount
     const password = "123";

     // discount form value
     const discount_form = document.getElementById('discount_form').value;

     if (discount_form === password) {

         if (discount || deleteButton) {
             for (let i = 0; i < productsInCart.length; i++) {
                 if (discount) {
                     productsInCart[i].price = productsInCart[i].price - 300;
                 }

             }
         } else {
             alert('Discount Code is Incorrect!')
         }

         CartHTML();
     }



 });

 CartHTML();






 // generate a reference number on checkout
 const checkout = document.getElementById("Check-out");

 checkout.addEventListener("click", myFunction);

 let places = document.getElementById('reference-number');

 function myFunction() {

     places.innerHTML = `Order was successful and your total is R ${countTheSumPrice().toFixed()} <br> Your reference number is ${Math.random()}`;

 }