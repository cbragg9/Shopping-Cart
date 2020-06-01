$(function () {

    // Retrieves all products in the database and stores them in a product array to use the product info later
    let productArray = [];
    getProducts();
    function getProducts() {
        $.get("/api/products", function(data) {
            for (let i = 0; i < data.length; i++) {
                data[i].cartQuantity = 0;
            }
            productArray = data;
        });
    }

    // Retrieves all products in the local storage cart or if storage is empty, sets the cart to be an empty array
    let cart = [];
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        checkButtons();
    } else {
        cart = [];
    }

    // For products in the cart, change the buttons so the user can't add to cart again
    function checkButtons() {
        for (var i = 0; i < cart.length; i++) {
            let target = $(`#add-${cart[i].id}`)
            changeButton(target);
        }
    }

    // Renders the HTML for all the products in the locally stored cart 
    function renderCartHTML() {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            $("#append-products-here").empty();
            for (let i = 0; i < cart.length; i++) {
                let newProductHTML = 
                `<div class="col-4 mb-2">
                    <img src=${cart[i].image} class="cart-image">
                </div>
                <div class="col-6">
                    <p>${cart[i].name}</p>
                    <p>${cart[i].price}</p>
                    <p>Remove</p>
                </div>
                <div class="col-2 text-center">
                    <i class="fas fa-chevron-up"></i>
                    <p id="${cart[i].id}-quantity">1</p>
                    <i class="fas fa-chevron-down"></i>
                </div>`
        
                $("#append-products-here").append(newProductHTML);
            }
        }
    }

    // Adds the product to the cart if it hasn't been added yet
    $(".add-button").on("click", function(event) {
        const productId = $(this).attr("data-id");
        if ($(this).attr("class") == "add-button") {
            addToCart(productId);
        }
        changeButton(event.target);
    })

    // Changes "Add to Cart" to "In Cart"
    function changeButton(target) {
        let parentDiv = $(target).parent();
        parentDiv.removeClass("add-button-textbox");
        parentDiv.addClass("in-cart-textbox");
        $(target).text("In Cart");
        $(target).removeClass("add-button");
    }

    // Push product to shopping cart array when clicked, save to local storage
    function addToCart(id) {
        for (var i = 0; i < productArray.length; i++) {
            if (productArray[i].id == id) {
                var product = productArray[i];
                product.cartQuantity = 1;
            }
            
        }
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    
    // Display Modal
    $(".fa-shopping-cart").on("click", function(event) {
        renderCartHTML();
        $('#cart-modal').modal("show");
    })

});


